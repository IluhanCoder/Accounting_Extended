export default class HardwareError extends Error {
    status: number

    constructor(message, status) {
        super(message);
        this.status = status ?? 500;
    }

    static NoInstruction() {
        return new HardwareError("Інструкцій для цього обладнання не було знайдено", 400);
    }
}