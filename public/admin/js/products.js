// Change status
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
        
        formChangeStatus.action = action

        formChangeStatus.submit();
    })
})
}
// end change status


// Delete Item
const buttonDelete = document.querySelectorAll("[button-delete]");
console.log(buttonDelete)
if(buttonDelete.length > 0){
    const formDeleteItem = document.querySelector("#form-delete-item");
    const path = formDeleteItem.getAttribute("data-path")
    buttonDelete.forEach(button => {
        button.addEventListener('click' , ()=>{
            const isConfirm =  confirm("Bạn có chắc muốn xóa sản phẩm này không?");
            if(isConfirm){
                const id = button.getAttribute("data-id");
                const action = path + `/${id}?_method=DELETE`
                console.log(action);   
                formDeleteItem.action = action;
                formDeleteItem.submit();

            }
            else{
                alert("Xoa khong thanh cong")
            }
        })
    })
}
// end Delete Item
