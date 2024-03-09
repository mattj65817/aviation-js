import {freeze} from "immer";
import _ from "lodash";
import {isChase, isGuideCondition, isSolve} from "./chase-around-types";
import {ChaseAroundContext} from "./ChaseAroundContext";
import {Contour} from "./Contour";
import {Guide} from "./Guide";
import {Scale} from "./Scale";

import type {Path} from "@mattj65817/util-js";
import type {
    Chase,
    ChaseAroundCalcJson,
    ChaseAroundResult,
    GuideSpec,
    Solve,
    Step,
    WpdProjectJson
} from "./chase-around-types";
import type {Calculator, UnitRange} from "../performance-types";


/**
 * {@link ChaseAroundCalculator} makes performance calculations based on an aviation chase-around chart.
 */
export class ChaseAroundCalculator implements Calculator {
    private constructor(
        private readonly steps: Step[],
        private readonly guides: Record<string, Guide>,
        private readonly scales: Record<string, Scale>,
        public readonly inputs: Record<string, UnitRange>,
        public readonly outputs: Record<string, UnitRange>
    ) {
    }

    /**
     * Calculate output(s) from a given set of input(s).
     *
     * @param inputs the input variables.
     */
    calculate(inputs: Record<string, number>) {
        const missingInputs = _.difference(_.keys(this.inputs), _.keys(inputs));
        if (!_.isEmpty(missingInputs)) {
            throw Error(`Missing input variable(s): ${missingInputs.sort().join(", ")}`);
        }
        const result = _.reduce(this.steps, (context, step) => {
            if (isChase(step)) {
                return this.doChase(context, step);
            } else if (isSolve(step)) {
                return this.doSolve(context, step);
            }
            throw Error("Unsupported step.");
        }, ChaseAroundContext.create(inputs));
        const {outputs} = result;
        const missingOutputs = _.difference(_.keys(outputs), _.keys(this.outputs));
        if (!_.isEmpty(missingOutputs)) {
            throw Error(`Missing output variable(s): ${missingOutputs.sort().join(", ")}`);
        }
        return freeze<ChaseAroundResult>(_.cloneDeep({
            solution: _.map(result.solution, "path"),
            scales: _.map(result.scales, "path"),
            inputs,
            outputs,
        }), true);
    }

    /**
     * Evaluate a {@link Chase} step.
     *
     * @param context the current context.
     * @param step the step to evaluate.
     * @private
     */
    private doChase(context: ChaseAroundContext, step: Chase) {
        const {chase, until} = step;
        const contour = this.resolveContour(context, chase);
        if (null == until) {
            return context.chase(step, contour, []);
        } else {
            context = context.resolve(contour);
            const along = this.resolveContour(context, chase);
            const limit = this.resolveContour(context, until);
            return context.chase(step, along.split(limit)[0], [limit.split(along)[0]]);
        }
    }

    /**
     * Evaluate a {@link Solve} step.
     *
     * @param context the current context.
     * @param step the step to evaluate.
     * @private
     */
    private doSolve(context: ChaseAroundContext, step: Solve) {
        const {solve} = step;
        context = context.resolve(this.resolveContour(context, solve));
        return context.solve(this.scales[solve]);
    }

    private resolveContour(context: ChaseAroundContext, guide: GuideSpec) {
        let name: string;
        if (!isGuideCondition(guide)) {
            name = guide;
        } else {
            const {inputs} = context;
            const matches = _.flatMap(_.entries(guide), ([expr, guide]) => {
                const func = new Function("inputs", `with (inputs) { return !!(${expr}); }`);
                try {
                    if (func(inputs)) {
                        return [guide];
                    }
                } catch (ex) {
                    if (!(ex instanceof ReferenceError)) {
                        throw ex;
                    }
                }
                return [];
            });
            if (1 !== matches.length) {
                throw Error("Expected exactly one matching guide expression.");
            }
            name = matches[0];
        }
        const {guides, scales} = this;
        if (name in guides) {
            return guides[name].through(context.position);
        }
        if (!(name in scales)) {
            throw Error(`Guide or scale not found: ${name}`);
        }
        const scale = scales[name];
        return scale.at(context.inputs[scale.variable]);
    }

    /**
     * Create a {@link ChaseAroundCalculator} from the raw contents of a chart definition file and its associated
     * WebPlotDigitizer project file.
     *
     * @param def the chart definition.
     * @param proj the WebPlotDigitizer project.
     */
    static create(def: ChaseAroundCalcJson, proj: WpdProjectJson) {

        /* Parse datasets from the WPD project file. */
        const datasets = _.transform(proj.datasetColl,
            (datasets, {name, data}) => {
                const guideMatch = GUIDE.exec(name);
                if (null != guideMatch) {
                    const [, guide, orderString] = guideMatch;
                    const order = parseFloat(orderString);
                    (datasets[guide] = datasets[guide] || []).push([order, _.map(data, "value")]);
                } else {
                    const scaleMatch = SCALE.exec(name);
                    if (null != scaleMatch) {
                        const [, scale, valueString] = scaleMatch;
                        const value = parseFloat(valueString);
                        (datasets[scale] = datasets[scale] || []).push([value, _.map(data, "value")]);
                    }
                }
            }, {} as Record<string, [number, Path][]>);

        /* Parse guides and scales from the chart definition file. */
        const guides = _.transform(_.entries(def.guides), (guides, [guide, {flow}]) => {
            if (!(guide in datasets)) {
                throw Error(`Guide dataset not found: ${guide}`);
            }
            const dataset = datasets[guide].sort(([v0], [v1]) => v0 - v1);
            const contours = _.transform(dataset,
                (acc, [order, path]) => {
                    acc.push([order, Contour.create(path, flow)]);
                }, [] as [number, Contour][]);
            guides[guide] = Guide.createGuide(guide, contours, flow);
        }, {} as Record<string, Guide>);
        const scales = _.transform(_.entries(def.scales), (scales, [scale, {flow, unit, variable}]) => {
            if (!(scale in datasets)) {
                throw Error(`Scale dataset not found: ${scale}`);
            }
            const dataset = datasets[scale].sort(([v0], [v1]) => v0 - v1);
            const contours = _.transform(dataset,
                (acc, [value, path]) => {
                    acc.push([value, Contour.create(path, flow)]);
                }, [] as [number, Contour][]);
            scales[scale] = Scale.createScale(scale, variable || scale, unit, contours, flow);
        }, {} as Record<string, Scale>);

        /* Determine inputs and outputs from steps and scales. */
        const {steps} = def;
        const solved = _.map(steps.filter(isSolve), "solve");
        const [inputs, outputs] = _.transform(scales,
            ([inputs, outputs], {range, unit, variable}) => {
                if (-1 !== solved.indexOf(variable)) {
                    outputs[variable] = {range, unit};
                } else {
                    inputs[variable] = {range, unit};
                }
            }, [{} as Record<string, UnitRange>, {} as Record<string, UnitRange>]);

        /* Add directional guides. */
        const [x, y] = _.unzip(_.flatMap(_.values(datasets), ([, [,path]]) => path));
        x.sort(_.subtract);
        y.sort(_.subtract);
        const xMin = x[0];
        const xMax = x[x.length - 1];
        const yMin = y[0];
        const yMax = y[y.length - 1];
        _.assign(guides, {
            down: Guide.createGuide("down", [
                [0, Contour.create([[xMin, yMin], [xMin, yMax]], "down")],
                [1, Contour.create([[xMax, yMin], [xMax, yMax]], "down")],
            ], "down"),
            left: Guide.createGuide("left", [
                [0, Contour.create([[xMax, yMin], [xMin, yMin]], "left")],
                [1, Contour.create([[xMax, yMax], [xMin, yMax]], "left")],
            ], "left"),
            right: Guide.createGuide("right", [
                [0, Contour.create([[xMin, yMin], [xMax, yMin]], "right")],
                [1, Contour.create([[xMin, yMax], [xMax, yMax]], "right")],
            ], "right"),
            up: Guide.createGuide("up", [
                [0, Contour.create([[xMin, yMax], [xMin, yMin]], "up")],
                [1, Contour.create([[xMax, yMax], [xMax, yMin]], "up")],
            ], "up"),
        });
        return freeze(new ChaseAroundCalculator(_.cloneDeep(steps), guides, scales, inputs, outputs), true);
    }
}

/**
 * Name pattern for a guide dataset.
 *
 * @private
 */
export const GUIDE = freeze(/^guide:([^=]+)@(0|(-?[1-9]\d*))$/, true);

/**
 * Name pattern for a guide dataset.
 *
 * @private
 */
export const SCALE = freeze(/^scale:([^=]+)=(0|(-?[1-9]\d*))$/, true);