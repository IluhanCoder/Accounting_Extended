import Hardware, { HardwareResponse } from "../hardware/hardware-types"

export default interface SoftwareCredentials {
    name: string,
    type: string,
    description: string,
    expirationDate: Date,
    licenseId: string | null,
    hardware: HardwareResponse | undefined
}

export interface SoftwareResponse {
    name: string,
    type: string,
    description: string,
    expirationDate: Date,
    licenseId: string | null,
    hardware: Hardware | null
}