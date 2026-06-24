const buttonStatus = document.querySelectorAll("[button-status]");

if (buttonStatus.length > 0) {
    let url = new URL(window.location.href)

    buttonStatus.forEach(button => {
        button.addEventListener("click", () => {
            const status = button.getAttribute("button-status");

            if (status) {
                url.searchParams.set("status", status)
            } else {
                url.searchParams.delete("status")
            }
            console.log(url.href);
            window.location.href = url.href
        })
    })
}

//Form Search 
const formSearch = document.querySelector("#form-search");
if(formSearch) {
    let url = new URL(window.location.href);
    formSearch.addEventListener("submit", (e) => {
        e.preventDefault();
        const keyword = e.target.elements.keyword.value;
        if (keyword) {
            url.searchParams.set("keyword", keyword)
        } else {
            url.searchParams.delete("keyword")
        }
        
        window.location.href = url.href;
    });
}

//Pagination
const buttonsPagination = document.querySelectorAll("[button-pagination]");
if(buttonsPagination) {
  buttonsPagination.forEach(button => {
    button.addEventListener("click", () => {
      const page = button.getAttribute("button-pagination");
      console.log(page);
    let url = new URL(window.location.href);
    if(page){
    url.searchParams.set("page", page);
    }
    else{
    url.searchParams.delete("page");
    }
    window.location.href = url.href;
    });
  });
}

//Check-box-multi
const checkBoxMulti = document.querySelector("[check-box-multi]")

if(checkBoxMulti){
    const inputCheckAll = document.querySelector("input[name = 'checkall']");
    const inputsID= document.querySelectorAll("input[name = 'id']")

    inputCheckAll.addEventListener('click' , () => {
        if(inputCheckAll.checked ){
            inputsID.forEach(input =>{
                input.checked = true
            } )
        }else {
            inputsID.forEach(input =>{
                input.checked = false
            } )
        }
        
    })
    inputsID.forEach(input =>{
        input.addEventListener('click' , () => {
            const countChecked = document.querySelectorAll("input[name = 'id']:checked").length;


            if(countChecked == inputsID.length){
                inputCheckAll.checked = true
            }
            else {
                inputCheckAll.checked = false
            }
        })
    })
    
}
// End Check-box-multi


// Form-change-Multi
const formChangeMulti = document.querySelector("[form-change-multi]")

if(formChangeMulti){    

    formChangeMulti.addEventListener('submit' , (e)=>{
        // const checkBoxMulti = document.querySelector("[check-box-multi]")
        const inputChecked = document.querySelectorAll("input[name = 'id']:checked");
        e.preventDefault();
       
        const typeChange = e.target.elements.type.value;

        if(typeChange == "delete"){
            const isConfirm = confirm("Bạn có chắc muốn xóa những sản phẩm này không")
            if(!isConfirm){
                return;
            }
        }
        if(inputChecked.length > 0 ){
            let ids = [];
            inputChecked.forEach(input =>{
                if(typeChange == "position"){
                    const id = input.value;
                    const position = input.closest("tr").querySelector("input[name = 'position']").value;
                    
                    ids.push(`${id}-${position}`)
                    console.log(ids);
                }   
                else{
                    const id = input.value;                   
                    ids.push(id)
                }
                
               
            })
            
            e.target[1].value = ids.join(" , ");
            formChangeMulti.submit();
        }
        else{
            alert("Vui lòng chọn ít nhất 1 bản ghi")
            return ;
        }

        
    })
        

    
    
}
// end Form-change-Multi


// Form Delete
const formDelete = document.querySelector("[form-delete]")
if(formDelete){
   formDelete.addEventListener('submit', (e)=>{
    e.preventDefault();
    console.log(e);
   })
}
// end Form Delete

//Show alert
const showAlert = document.querySelector("[show-alert]")

if(showAlert){
    const dataTime = parseInt(showAlert.getAttribute("data-time"));
    const closeAlert = showAlert.querySelector("[close-alert]")
    console.log(closeAlert);
    setTimeout(()=>{
        showAlert.classList.add("alert-hidden")
    },dataTime);
    closeAlert.addEventListener('click' ,()=>{
        
        showAlert.classList.add("d-none");
    })
}
//end Show alert

//Upload Image
const uploadImage = document.querySelector("[upload-image]")
if(uploadImage){
    const uploadImageInput = document.querySelector("[upload-image-input]")
    const uploadImagePreview = document.querySelector("[upload-image-preview]")
    const btnDeleteImage = document.querySelector(".btn-delete-image")
    uploadImageInput.addEventListener("change",(e)=>{
        const [file] = e.target.files;
        if(file){
            uploadImagePreview.src = URL.createObjectURL(file);

            btnDeleteImage.classList.remove('hidden');
        }
    })
    btnDeleteImage.addEventListener("click" ,()=>{
        uploadImageInput.value=""
        uploadImagePreview.src = ""
        btnDeleteImage.classList.add('hidden');
    })

}
// end Upload Image
