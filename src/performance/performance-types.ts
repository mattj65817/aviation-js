import {freeze} from "immer";
import _ from "lodash";
import {Dimensions} from "@mattj65817/util-js";
import {AnyUnit} from "../aviation-types";

/**
 * Metadata describing a performance chart and the location(s) from which it was loaded.
 */
export interface ChartMetadata {
    src: URL;
    image?: {
        src: URL;
        size: Dimensions;
    };
}

/**
 * All performance-related units.
 */
export type PerformanceUnit = PerformanceVariable["unit"];

/**
 * Performance variable and unit.
 */
export type PerformanceVariable =
    | Airspeed
    | CenterOfGravity
    | ClimbRate
    | Power
    | Weight;

/**
 * Unit and range of an input or output variable.
 */
export interface UnitRange {
    unit: AnyUnit;
    range: [number, number];
}

/**
 * Type guard for {@link Airspeed}.
 *
 * @param val the value.
 */
export function isAirspeed(val: unknown): val is Airspeed {
    return isPerformanceVariableOf(val, AIRSPEED, AIRSPEED_UNIT);
}

/**
 * Type guard for {@link CenterOfGravity}.
 *
 * @param val the value.
 */
export function isCenterOfGravity(val: unknown): val is CenterOfGravity {
    return isPerformanceVariableOf(val, CENTER_OF_GRAVITY, CENTER_OF_GRAVITY_UNIT);
}

/**
 * Type guard for {@link ClimbRate}.
 *
 * @param val the value.
 */
export function isClimbRate(val: unknown): val is ClimbRate {
    return isPerformanceVariableOf(val, CLIMB_RATE, CLIMB_RATE_UNIT);
}

/**
 * Type guard for {@link Power}.
 *
 * @param val the value.
 */
export function isPower(val: unknown): val is Power {
    return isPerformanceVariableOf(val, POWER, POWER_UNIT);
}

/**
 * Type guard for {@link Weight}.
 *
 * @param val the value.
 */
export function isWeight(val: unknown): val is Weight {
    return isPerformanceVariableOf(val, WEIGHT, WEIGHT_UNIT);
}

/**
 * Indicated airspeed.
 */
interface Airspeed {
    variable:
        | "calibratedAirspeed"
        | "indicatedAirspeed"
        | "trueAirspeed";
    unit:
        | "knots"
        | "miles per hour";
}

/**
 * Airspeed variable.
 */
interface CenterOfGravity {
    variable: "centerOfGravity";
    unit: "inches aft of datum";
}

/**
 * Airspeed variable.
 */
interface ClimbRate {
    variable: "climbRate",
    unit:
        | "feet per minute"
        | "meters per second";
}

/**
 * Airspeed variable.
 */
interface Power {
    variable: "power";
    unit: "percent";
}

/**
 * Airspeed variable.
 */
interface Weight {
    variable:
        | "emptyWeight"
        | "rampWeight"
        | "weight";
    unit:
        | "kilograms"
        | "pounds";
}

/**
 * Type guard for {@link PerformanceVariable}.
 *
 * @param val the value.
 * @param variables the variable names.
 * @param units the variable units.
 */
function isPerformanceVariableOf<V extends PerformanceVariable>(val: unknown, variables: string[], units: string[]): val is V {
    return _.isObject(val)
        && "variable" in val
        && "unit" in val
        && _.isString(val.variable)
        && _.isString(val.unit)
        && -1 !== variables.indexOf(val.variable)
        && -1 !== units.indexOf(val.unit);
}

/**
 * Airspeed variables.
 */
const AIRSPEED = freeze<Airspeed["variable"][]>(["calibratedAirspeed", "indicatedAirspeed", "trueAirspeed"]);

/**
 * Airspeed units.
 */
const AIRSPEED_UNIT = freeze<Airspeed["unit"][]>(["knots", "miles per hour"]);

/**
 * Center of gravity variables.
 */
const CENTER_OF_GRAVITY = freeze<CenterOfGravity["variable"][]>(["centerOfGravity"]);

/**
 * Center of gravity units.
 */
const CENTER_OF_GRAVITY_UNIT = freeze<CenterOfGravity["unit"][]>(["inches aft of datum"]);

/**
 * Climb rate variables.
 */
const CLIMB_RATE = freeze<ClimbRate["variable"][]>(["climbRate"]);

/**
 * Climb rate units.
 */
const CLIMB_RATE_UNIT = freeze<ClimbRate["unit"][]>(["feet per minute", "meters per second"]);

/**
 * Power variables.
 */
const POWER = freeze<Power["variable"][]>(["power"]);

/**
 * Power units.
 */
const POWER_UNIT = freeze<Power["unit"][]>(["percent"]);

/**
 * Weight variables.
 */
const WEIGHT = freeze<Weight["variable"][]>(["emptyWeight", "rampWeight", "weight"]);

/**
 * Weight units.
 */
const WEIGHT_UNIT = freeze<Weight["unit"][]>(["kilograms", "pounds"]);