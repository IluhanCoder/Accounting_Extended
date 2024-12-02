export default function DropForm() {
    const form = document.querySelector("#form") as HTMLFormElement;
    if(form) form.reset();

    const buttons = document.querySelectorAll("#drop-selection-button") as NodeListOf<HTMLButtonElement>;
    buttons.forEach((button: HTMLButtonElement) => {
        button.click();
    })
}