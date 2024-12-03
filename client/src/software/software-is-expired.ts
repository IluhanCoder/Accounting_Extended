import SoftwareCredentials, { SoftwareResponse } from "./software-types";

export default function softwareIsExpired(software: SoftwareResponse | SoftwareCredentials): boolean {
    const currentDate = new Date();
    const convertedDate = new Date(software.expirationDate);
    return currentDate.getTime() > convertedDate.getTime();
}