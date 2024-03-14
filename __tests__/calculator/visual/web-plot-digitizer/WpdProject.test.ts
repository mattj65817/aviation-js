import { isWpdProject } from "../../../../src/calculator/visual/web-plot-digitizer/web-plot-digitizer-types";
import { Flows } from "../../../../src/calculator/visual/Flows";
import { WpdProject } from "../../../../src/calculator/visual/web-plot-digitizer";

import landingDistanceProjJson from "../chase-around/landing-distance.wpd.json";
import centerOfGravityRangeProjJson from "../weight-and-balance/center-of-gravity-range.wpd.json";

describe("WpdProject", () => {
    describe("create()", () => {
        it("parses [center-of-gravity-range.wpd.json] correctly", () => {
            if (!isWpdProject(centerOfGravityRangeProjJson)) {
                expect(true).toBe(false);
            } else {
                const proj = WpdProject.create(centerOfGravityRangeProjJson);
                expect(proj.areaNames).toStrictEqual([
                    "envelope",
                    "grossWeightIncreaseOnly",
                    "standardTankGrossWeightIncrease",
                    "standardTankOnly",
                    "utility",
                ]);
                expect(proj.guideNames).toStrictEqual([]);
                expect(proj.scaleNames).toStrictEqual(["weight"]);
                expect(proj.area("envelope")).toStrictEqual([
                    [516.5526139410188, 488.5150804289545],
                    [92.4849195710469, 488.51508042895443],
                    [92.48491957104557, 300.6246648793566],
                    [266.1618632707774, 93.45844504021457],
                    [516.5526139410179, 93.45844504021434],
                    [516.5526139410188, 488.5150804289545],
                ]);
                expect(proj.area("grossWeightIncreaseOnly")).toStrictEqual([
                    [428.54591152815016, 141.55060321715814],
                    [223.7161528150134, 141.55060321715817],
                    [266.16186327077736, 93.45844504021449],
                    [428.54591152815016, 93.45844504021444],
                    [428.54591152815016, 141.55060321715814],
                ]);
                expect(proj.area("standardTankGrossWeightIncrease")).toStrictEqual([
                    [516.5526139410188, 141.55060321715814],
                    [428.54591152815016, 141.55060321715817],
                    [428.54591152815016, 93.45844504021449],
                    [516.5526139410188, 93.45844504021447],
                    [516.5526139410188, 141.55060321715814],
                ]);
                expect(proj.area("standardTankOnly")).toStrictEqual([
                    [516.5526139410188, 488.5150804289544],
                    [428.54591152814993, 488.5150804289543],
                    [428.54591152815004, 141.5506032171582],
                    [516.5526139410188, 141.5506032171582],
                    [516.5526139410188, 488.5150804289544],
                ]);
                expect(proj.area("utility")).toStrictEqual([
                    [428.5459115281502, 488.5150804289544],
                    [92.48491957104551, 488.5150804289542],
                    [92.4849195710456, 300.62466487935666],
                    [428.5459115281501, 300.62466487935654],
                    [428.5459115281502, 488.5150804289544],
                ]);
                expect(proj.scale("weight", Flows.right)).toStrictEqual([
                    [750, [
                        [80.41320375335125, 519.4731903485255],
                        [561.5294906166217, 519.4731903485253],
                    ]],
                    [800, [
                        [80.41320375335123, 470.4075067024129],
                        [561.5294906166215, 470.40750670241266],
                    ]],
                    [850, [
                        [80.41320375335121, 423.48357908847186],
                        [561.5294906166207, 423.4835790884717],
                    ]],
                    [900, [
                        [80.41320375335121, 376.5596514745309],
                        [561.5294906166208, 376.55965147453065],
                    ]],
                    [950, [
                        [80.41320375335121, 329.44101876675603],
                        [561.5294906166208, 329.44101876675563],
                    ]],
                    [1000, [
                        [80.41320375335123, 282.51709115281506],
                        [561.5294906166198, 282.51709115281506],
                    ]],
                    [1050, [
                        [80.41320375335123, 235.593163538874],
                        [561.5294906166207, 235.59316353887408],
                    ]],
                    [1100, [
                        [80.4132037533512, 187.5010053619303],
                        [561.5294906166212, 187.5010053619303],
                    ]],
                    [1150, [
                        [80.4132037533512, 141.55060321715817],
                        [561.5294906166218, 141.55060321715825],
                    ]],
                    [1200, [
                        [80.41320375335124, 93.65315013404825],
                        [561.5294906166197, 93.65315013404827],
                    ]]],
                );
            }
        });
        it("parses [landing-distance.wpd.json] correctly", () => {
            if (!isWpdProject(landingDistanceProjJson)) {
                expect(true).toBe(false);
            } else {
                const proj = WpdProject.create(landingDistanceProjJson);
                expect(proj.areaNames).toStrictEqual([]);
                expect(proj.guideNames).toStrictEqual([
                    "obstacleHeightCorrection",
                    "weightCorrection",
                    "windComponentCorrection",
                ]);
                expect(proj.scaleNames).toStrictEqual([
                    "landingDistance",
                    "obstacleHeight",
                    "outsideAirTemperature",
                    "pressureAltitude",
                    "weight",
                    "windComponent",
                ]);
                expect(proj.guide("obstacleHeightCorrection", Flows.right)).toStrictEqual([
                    [
                        [928.3595717884131, 275.41939546599497],
                        [976.3217884130985, 471.265113350126],
                    ],
                    [
                        [928.3595717884133, 391.32808564231743],
                        [976.3217884130983, 526.8576826196477]],
                    [
                        [928.3595717884132, 425.4829974811083],
                        [976.3217884130985, 540.6649874055416],
                    ],
                    [
                        [928.3595717884133, 459.6379093198992],
                        [976.3217884130983, 555.1989924433253],
                    ],
                    [
                        [928.3595717884132, 512.323677581864],
                        [976.3217884130985, 582.8136020151134],
                    ],
                    [
                        [928.3595717884131, 537.7581863979851],
                        [976.3217884130985, 592.6240554156172],
                    ],
                    [
                        [928.3595717884131, 558.4691435768264],
                        [976.3217884130985, 602.0711586901762],
                    ],
                ]);
                expect(proj.guide("weightCorrection", Flows.right)).toStrictEqual([
                    [
                        [547.9319899244334, 254.34508816120908],
                        [643.8564231738035, 325.9250629722922],
                        [715.0730478589423, 369.1637279596977],
                    ],
                    [
                        [547.9319899244334, 291.77015113350126],
                        [643.8564231738037, 353.176322418136],
                        [715.0730478589421, 388.7846347607053],
                    ],
                    [
                        [547.9319899244333, 315.3879093198993],
                        [643.8564231738037, 373.5239294710328],
                        [715.0730478589422, 408.4055415617128],
                    ],
                    [
                        [547.9319899244334, 341.54911838790935],
                        [643.8564231738035, 393.1448362720403],
                        [715.0730478589423, 428.38979848866495],
                    ],
                    [
                        [547.9319899244333, 363.71347607052894],
                        [643.8564231738038, 408.7688916876574],
                        [715.0730478589423, 442.1971032745592],
                    ],
                    [
                        [547.9319899244334, 377.1574307304786],
                        [643.8564231738038, 424.02959697733],
                        [715.0730478589423, 456.36775818639865],
                    ],
                ]);
                expect(proj.guide("windComponentCorrection", Flows.right)).toStrictEqual([
                    [
                        [738.3274559193954, 276.1460957178841],
                        [822.2613350125946, 353.5396725440806],
                        [904.7418136020152, 426.2096977329973],
                    ],
                    [
                        [738.3274559193954, 305.5774559193955],
                        [822.2613350125945, 380.0642317380353],
                        [904.7418136020151, 448.01070528967256],
                    ],
                    [
                        [738.3274559193956, 327.74181360201516],
                        [822.2613350125945, 403.68198992443325],
                        [904.7418136020151, 463.99811083123427],
                    ],
                    [
                        [738.3274559193954, 352.8129722921915],
                        [822.2613350125947, 425.11964735516375],
                        [904.7418136020152, 484.345717884131],
                    ],
                    [
                        [738.3274559193954, 393.1448362720403],
                        [822.2613350125946, 456.7311083123426],
                        [904.7418136020151, 507.60012594458436],
                    ],
                    [
                        [738.3274559193954, 424.7562972292192],
                        [822.2613350125947, 483.9823677581864],
                        [904.7418136020152, 534.8513853904283],
                    ],
                    [
                        [738.3274559193956, 456.367758186398],
                        [822.2613350125946, 512.6870277078085],
                        [904.7418136020151, 557.0157430730478],
                    ],
                ]);
                expect(proj.scale("landingDistance", Flows.right)).toStrictEqual([
                    [100, [
                        [988.3123425692696, 602.4345088161209],
                        [1003.573047858943, 602.434508816121],
                    ]],
                    [200, [
                        [988.31234256927, 563.1926952141059],
                        [1003.5730478589422, 563.192695214106],
                    ]],
                    [300, [
                        [988.3123425692698, 523.9508816120909],
                        [1003.5730478589427, 523.9508816120907],
                    ]],
                    [400, [
                        [988.3123425692703, 483.9823677581864],
                        [1003.5730478589425, 483.9823677581864],
                    ]],
                    [500, [
                        [988.31234256927, 444.0138539042821],
                        [1003.5730478589427, 444.01385390428214],
                    ]],
                    [600, [
                        [988.3123425692702, 404.4086901763224],
                        [1003.5730478589422, 404.4086901763224],
                    ]],
                    [700, [
                        [988.3123425692698, 364.80352644836273],
                        [1003.5730478589425, 364.80352644836273],
                    ]],
                    [800, [
                        [988.3123425692698, 325.56171284634763],
                        [1003.5730478589423, 325.56171284634763],
                    ]],
                    [900, [
                        [988.3123425692698, 285.5931989924433],
                        [1003.573047858942, 285.5931989924433],
                    ]],
                    [1000, [
                        [988.3123425692698, 246.3513853904282],
                        [1003.5730478589425, 246.35138539042822],
                    ]],
                    [1100, [
                        [988.3123425692702, 206.3828715365239],
                        [1003.5730478589425, 206.3828715365239],
                    ]],
                    [1200, [
                        [988.3123425692698, 166.41435768261965],
                        [1003.5730478589425, 166.41435768261965],
                    ]],
                    [1300, [
                        [988.31234256927, 127.1725440806045],
                        [1003.5730478589425, 127.17254408060448],
                    ]],
                    [1400, [
                        [988.31234256927, 87.20403022670024],
                        [1003.5730478589422, 87.20403022670024],
                    ]],
                ]);
                expect(proj.scale("obstacleHeight", Flows.up)).toStrictEqual([
                    [0, [
                        [976.3217884130984, 627.5056675062981],
                        [976.3217884130985, 63.94962216624692],
                    ]],
                    [15, [
                        [928.3595717884132, 627.5056675062982],
                        [928.3595717884132, 63.94962216624693],
                    ]],
                ]);
                expect(proj.scale("outsideAirTemperature", Flows.up)).toStrictEqual([
                    [-20, [
                        [13.08060453400504, 627.5056675062979],
                        [13.08060453400504, 63.58627204030232],
                    ]],
                    [-10, [
                        [86.47732997481117, 627.5056675062983],
                        [86.47732997481071, 63.58627204030262],
                    ]],
                    [0, [
                        [159.14735516372795, 627.5056675062978],
                        [159.14735516372744, 63.58627204030232],
                    ]],
                    [10, [
                        [232.544080604534, 627.5056675062979],
                        [232.544080604534, 63.586272040302305],
                    ]],
                    [20, [
                        [305.21410579345087, 627.5056675062979],
                        [305.21410579345087, 63.586272040302305],
                    ]],
                    [30, [
                        [378.24748110831234, 627.5056675062978],
                        [378.24748110831234, 63.58627204030236],
                    ]],
                    [40, [
                        [451.2808564231738, 627.5056675062979],
                        [451.2808564231738, 63.58627204030233],
                    ]],
                    [50, [
                        [524.6775818639799, 627.5056675062979],
                        [524.67758186398, 63.58627204030229],
                    ]],
                ]);
                expect(proj.scale("pressureAltitude", Flows.right)).toStrictEqual([
                    [0, [
                        [13.08060453400504, 416.7625944584383],
                        [305.21410579345087, 383.6977329974811],
                        [524.6775818639794, 358.98992443324937],
                    ]],
                    [2000, [
                        [13.08060453400504, 401.50188916876573],
                        [159.14735516372798, 384.4244332493703],
                        [305.9408060453401, 364.0768261964736],
                        [413.492443324937, 353.9030226700252],
                        [524.6775818639799, 335.37216624685135],
                    ]],
                    [4000, [
                        [13.080604534005039, 387.33123425692696],
                        [160.6007556675063, 363.3501259445844],
                        [305.9408060453401, 345.1826196473552],
                        [524.67758186398, 314.2978589420655],
                    ]],
                    [6000, [
                        [13.08060453400504, 365.53022670025183],
                        [158.4206549118388, 342.2758186397985],
                        [305.21410579345087, 322.65491183879095],
                        [524.67758186398, 289.59005037783373],
                    ]],
                    [8000, [
                        [13.080604534005039, 345.54596977329976],
                        [159.51070528967253, 317.9313602015114],
                        [305.57745591939545, 295.4036523929471],
                        [414.58249370277076, 270.33249370277076],
                        [524.6775818639798, 240.17443324937025],
                    ]],
                    [10000, [
                        [13.080604534005037, 323.3816120906801],
                        [159.14735516372795, 297.9471032745592],
                        [232.544080604534, 284.13979848866495],
                        [378.6108312342569, 244.5346347607053],
                    ]],
                ]);
                expect(proj.scale("weight", Flows.up)).toStrictEqual([
                    [850, [
                        [715.0730478589422, 627.5056675062979],
                        [715.0730478589422, 63.949622166246876],
                    ]],
                    [900, [
                        [691.0919395465995, 627.5056675062976],
                        [691.0919395465995, 63.94962216624686],
                    ]],
                    [950, [
                        [666.7474811083123, 627.5056675062974],
                        [666.7474811083125, 63.949622166246854],
                    ]],
                    [1000, [
                        [643.4930730478591, 627.5056675062979],
                        [643.4930730478594, 63.94962216624686],
                    ]],
                    [1050, [
                        [619.5119647355165, 627.5056675062978],
                        [619.148614609572, 63.949622166246854],
                    ]],
                    [1100, [
                        [596.257556675063, 627.5056675062978],
                        [596.257556675063, 63.949622166246854],
                    ]],
                    [1150, [
                        [571.913098236776, 627.5056675062974],
                        [571.9130982367758, 63.949622166246854],
                    ]],
                    [1200, [
                        [547.9319899244334, 627.5056675062978],
                        [547.9319899244334, 63.949622166246876],
                    ]],
                ]);
                expect(proj.scale("windComponent", Flows.up)).toStrictEqual([
                    [0, [
                        [738.3274559193954, 627.5056675062976],
                        [738.3274559193954, 63.949622166246854],
                    ]],
                    [10, [
                        [821.5346347607054, 627.5056675062976],
                        [821.5346347607056, 63.94962216624685],
                    ]],
                    [20, [
                        [904.7418136020151, 627.5056675062976],
                        [904.7418136020151, 63.94962216624685],
                    ]],
                ]);
            }
        });
    });
});
