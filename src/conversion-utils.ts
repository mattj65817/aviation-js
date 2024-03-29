import { freeze } from "immer";
import { AnyUnit } from "./aviation-types";

/**
 * Convert indicated altitude and altimeter setting (in-Hg) to pressure altitude.
 *
 * @param indicated indicated altitude.
 * @param altimeter altimeter setting in inches of mercury.
 */
export function indicatedToPressureAltitude(indicated: number, altimeter: number) {
    return indicated + 145442.2 * (1 - Math.pow(altimeter / 29.92, 0.190261));
}

/**
 * Convert a value from one unit to another.
 *
 * @param value the value to convert.
 * @param from the unit from which to convert.
 * @param to the unit to which to convert.
 */
export function convertUnits(value: number, from: AnyUnit, to: AnyUnit): number {
    if (from === to) {
        return value;
    }
    let conv = UNIT_CONVERSIONS[`${from}:${to}`];
    if (null != conv) {
        const [proportion, adjustment] = conv;
        let converted = value * proportion;
        if (null != adjustment) {
            converted += adjustment;
        }
        return converted;
    } else {
        conv = UNIT_CONVERSIONS[`${to}:${from}`];
        if (null != conv) {
            const [proportion, adjustment] = conv;
            let converted = value;
            if (null != adjustment) {
                converted -= adjustment;
            }
            return converted / proportion;
        }
    }
    throw Error(`No conversion: ${from} to ${to}`);
}

/**
 * Hash of unit conversion proportions and adjustments.
 */
type UnitConversions = Partial<{
    [key in `${AnyUnit}:${AnyUnit}`]: [
        proportion: number,
        adjustment?: number
    ];
}>;

/**
 * Simple proportion-based unit conversion table.
 */
const UNIT_CONVERSIONS = freeze<UnitConversions>({
    "degrees celsius:degrees fahrenheit": [9 / 5, 32],
    "feet:meters": [0.3048],
    "feet per minute:meters per second": [0.3048],
    "gallons:liters": [3.785412],
    "inch pounds:kilogram meters": [0.011521],
    "inches:meters": [0.0254],
    "inches aft of datum:meters aft of datum": [0.0254],
    "pounds:kilograms": [0.453592],
}, true);


/* kg/m -> in/lb */
/* kg/m * lb -> in */
