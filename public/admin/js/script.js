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
    
    
    const inputFormControl = document.querySelector("input[name = 'ids']")
    

    formChangeMulti.addEventListener('submit' , (e)=>{
        // const checkBoxMulti = document.querySelector("[check-box-multi]")
        const inputChecked = document.querySelectorAll("input[name = 'id']:checked");
        e.preventDefault();
       

        if(inputChecked.length > 0 ){
            let ids = [];
            inputChecked.forEach(input =>{
                const id = input.value;
                ids.push(id)
                
            })
            
            e.target[1].value = ids.join(" , ");
        }
        else{
            alert("Vui lòng chọn ít nhất 1 bản ghi")
            return ;
        }

        formChangeMulti.submit();
    })
        

    
    
}
// end Form-change-Multi