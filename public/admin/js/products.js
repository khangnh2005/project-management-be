console.log('Hello world')

const buttonsChangeStatus = document.querySelectorAll("[button-change-status]");
const formChangeStatus = document.querySelector("#form-change-status");
const path = formChangeStatus.getAttribute("data-path");
if (buttonsChangeStatus.length > 0) {
    buttonsChangeStatus.forEach(button => {
    button.addEventListener("click", () => {
        const statusCurrent = button.getAttribute("data-status");
        const id = button.getAttribute("data-id");
        
        console.log(id)
        let statusNew =  statusCurrent == "active" ? "inactive" : "active";
        console.log(statusNew);

        const action = path + `/${statusNew}/${id}?_method=PATCH`
        console.log(action);
        formChangeStatus.action = action

        formChangeStatus.submit();
    })
})
}
