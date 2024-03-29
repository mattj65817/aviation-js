import {ChaseAroundCalculator} from "./chase-around";

import type {CalculatorDef, Calculator} from ".";
import {LoadEnvelopeCalculator} from "./load-envelope";
import {LoadMomentCalculator} from "./load-moment/LoadMomentCalculator";

/**
 * Create a performance calculator from a definition object.
 *
 * @param def the performance calculator definition.
 */
export function createCalculator(def: CalculatorDef): Calculator {
    switch (def.kind) {
        case "chase around":
            return ChaseAroundCalculator.create(def.definition, def.project);
        case "load envelope":
            return LoadEnvelopeCalculator.create(def.definition, def.project);
        case "load moment":
            return LoadMomentCalculator.create(def.definition);
    }
}
