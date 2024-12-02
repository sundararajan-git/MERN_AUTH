
//-------------------------  VALID DATE FOR CUSTOMIZED -----------------------

export const validateForm = (form) => {
    try {

        let isValid = true;

        Array.from(form.elements).forEach(element => {

            if (element.required && !element.value) {

                isValid = false;
                element.classList.add("border-red-600");

                if (element.type === "file") {
                    const ele = document.getElementsByName(`${element.id}`)
                    ele[0].classList.add("border-red-600");

                }

            } else {
                element.classList.remove("border-red-600");
                if (element.type === "file") {
                    const ele = document.getElementsByName(`${element.id}`)
                    ele[0].classList.remove("border-red-600");
                }
            }
        });
        return isValid;
    } catch (err) {
        console.error(err);
    }
}
