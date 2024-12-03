import Departament from "../departament/departament-types";
import Hardware from "../hardware/hardware-types";

export interface PowerResponse {
    power: number,
    departament: Departament
};