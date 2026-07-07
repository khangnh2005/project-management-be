

//Permissions
const tablePermissions = document.querySelector("[table-permissions]")

if(tablePermissions){
    let permissions = [];
    const updateButton = document.querySelector("[button-submit]");

    updateButton.addEventListener("click" , () =>{
        const rows = tablePermissions.querySelectorAll("[data-name]")
        rows.forEach(row =>{
            const name = row.getAttribute("data-name");
            const inputs = row.querySelectorAll("input");
            
            
            if(name == "id"){
                inputs.forEach(input =>{
                    const id = input.value
                    permissions.push({
                        id : id,
                        permissions : []
                    })  
                })  
                   
            }else{
                inputs.forEach((input,index) =>{
                    if(input.checked == true){
                        permissions[index].permissions.push(name);
                    }
                }) 
            }
                 
            
        })
        

        if(permissions.length >0){
            const formChangePermissions = document.querySelector("#form-change-permissions")
            const inputSend = formChangePermissions.querySelector("input[name='permissions']");
            inputSend.value = JSON.stringify(permissions)
            formChangePermissions.submit()

        }
    })
}
//Permissions

// Permisions data default

const data = document.querySelector("[data-records]");
if(data){
    const records= JSON.parse(data.getAttribute("data-records"));
    
    const tablePermissions = document.querySelector("[table-permissions]")
    records.forEach((record , index) =>{
       
        const permissions = record.permissions;
        permissions.forEach(permission => {
             const rows = tablePermissions.querySelector(`[data-name="${permission}"]`);
             const input = rows.querySelectorAll("input")[index];
             input.checked = true
        }) 
    })
}





