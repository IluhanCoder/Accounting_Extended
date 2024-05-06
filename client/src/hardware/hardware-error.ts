export class HardwareFormError extends Error {
    static HasUndefined() {
        return new HardwareFormError("всі поля мають бути заповнені");
    }

    static HasEmptyStrings() {
        return new HardwareFormError("не можна лишати пусті поля");
    }
}