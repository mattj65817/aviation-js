import {freeze} from "immer";
import _ from "lodash";

import type {AnyUnit} from "../aviation-types";

/**
 * All performance-related units.
 */
export type PerformanceUnit = PerformanceVariable["unit"];

/**
 * Performance variable and unit.
 */
export type PerformanceVariable =
    | Airspeed
    | Arm
    | BankAngle
    | CenterOfGravity
    | ClimbRate
    | Fuel
    | Moment
    | Oil
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
 * Arm unit.
 */
export type ArmUnit = Arm["unit"];

/**
 * Weight unit.
 */
export type WeightUnit = Weight["unit"];

/**
 * Type guard for {@link Airspeed}.
 *
 * @param val the value.
 */
export function isAirspeed(val: unknown): val is Airspeed {
    return isPerformanceVariableOf(val, AIRSPEED, AIRSPEED_UNIT);
}

/**
 * Type guard for {@link Arm}.
 *
 * @param val the value.
 */
export function isArm(val: unknown): val is Arm {
    return isPerformanceVariableOf(val, ARM, ARM_UNIT);
}

/**
 * Type guard for {@link ArmUnit}.
 *
 * @param val
 */
export function isArmUnit(val: unknown): val is ArmUnit {
    return _.isString(val) && ARM_UNIT.includes(val);
}

/**
 * Type guard for {@link BankAngle}.
 *
 * @param val the value.
 */
export function isBankAngle(val: unknown): val is BankAngle {
    return isPerformanceVariableOf(val, BANK_ANGLE, BANK_ANGLE_UNIT);
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
 * Type guard for {@link Fuel}.
 *
 * @param val the value.
 */
export function isFuel(val: unknown): val is Fuel {
    return isPerformanceVariableOf(val, FUEL, FUEL_UNIT);
}

/**
 * Type guard for {@link Moment}.
 *
 * @param val the value.
 */
export function isMoment(val: unknown): val is Moment {
    return isPerformanceVariableOf(val, MOMENT, MOMENT_UNIT);
}

/**
 * Type guard for {@link Oil}.
 *
 * @param val the value.
 */
export function isOil(val: unknown): val is Oil {
    return isPerformanceVariableOf(val, OIL, OIL_UNIT);
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
 * Type guard for {@link WeightUnit}.
 *
 * @param val
 */
export function isWeightUnit(val: unknown): val is WeightUnit {
    return _.isString(val) && WEIGHT_UNIT.includes(val);
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
 * Arm.
 */
interface Arm {
    variable: "arm";
    unit:
        | "inches aft of datum"
        | "meters aft of datum";
}

/**
 * Bank angle.
 */
interface BankAngle {
    variable: "bankAngle";
    unit: "degrees";
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
    variable: "climbRate";
    unit:
        | "feet per minute"
        | "meters per second";
}

/**
 * Fuel variable.
 */
interface Fuel {
    variable: "fuel";
    unit:
        | "gallons"
        | "liters"
        | "pounds 100ll"
        | "pounds g100ul"
        | "pounds jet a-1";
}

/**
 * Moment variable.
 */
interface Moment {
    variable: "moment";
    unit:
        | "inch pounds"
        | "kilogram meters";
}

/**
 * Oil variable.
 */
interface Oil {
    variable: "oil";
    unit:
        | "grams"
        | "pounds"
        | "quarts";
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
const AIRSPEED_UNIT: string[] = freeze<Airspeed["unit"][]>(["knots", "miles per hour"]);

/**
 * Bank angle variables.
 */
const BANK_ANGLE = freeze<BankAngle["variable"][]>(["bankAngle"]);

/**
 * Bank angle units.
 */
const BANK_ANGLE_UNIT: string[] = freeze<BankAngle["unit"][]>(["degrees"]);

/**
 * Arm variables.
 */
const ARM = freeze<Arm["variable"][]>(["arm"]);

/**
 * Arm units.
 */
const ARM_UNIT: string[] = freeze<Arm["unit"][]>(["inches aft of datum", "meters aft of datum"]);

/**
 * Center of gravity variables.
 */
const CENTER_OF_GRAVITY = freeze<CenterOfGravity["variable"][]>(["centerOfGravity"]);

/**
 * Center of gravity units.
 */
const CENTER_OF_GRAVITY_UNIT: string[] = freeze<CenterOfGravity["unit"][]>(["inches aft of datum"]);

/**
 * Climb rate variables.
 */
const CLIMB_RATE = freeze<ClimbRate["variable"][]>(["climbRate"]);

/**
 * Climb rate units.
 */
const CLIMB_RATE_UNIT: string[] = freeze<ClimbRate["unit"][]>(["feet per minute", "meters per second"]);

/**
 * Fuel variables.
 */
const FUEL = freeze<Fuel["variable"][]>(["fuel"]);

/**
 * Fuel units.
 */
const FUEL_UNIT: string[] = freeze<Fuel["unit"][]>([
    "gallons",
    "liters",
    "pounds 100ll",
    "pounds g100ul",
    "pounds jet a-1"
]);

/**
 * Moment variables.
 */
const MOMENT = freeze<Moment["variable"][]>(["moment"]);

/**
 * Moment units.
 */
const MOMENT_UNIT: string[] = freeze<Moment["unit"][]>(["inch pounds", "kilogram meters"]);

/**
 * Oil variables.
 */
const OIL = freeze<Oil["variable"][]>(["oil"]);

/**
 * Oil units.
 */
const OIL_UNIT: string[] = freeze<Oil["unit"][]>(["grams", "pounds", "quarts"]);

/**
 * Power variables.
 */
const POWER = freeze<Power["variable"][]>(["power"]);

/**
 * Power units.
 */
const POWER_UNIT: string[] = freeze<Power["unit"][]>(["percent"]);

/**
 * Weight variables.
 */
const WEIGHT = freeze<Weight["variable"][]>(["emptyWeight", "rampWeight", "weight"]);

/**
 * Weight units.
 */
const WEIGHT_UNIT: string[] = freeze<Weight["unit"][]>(["kilograms", "pounds"]);
