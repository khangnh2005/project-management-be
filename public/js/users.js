// Chuc nang gui yeu cau 
const listBtnAddFriend = document.querySelectorAll("[btn-add-friend]")
if(listBtnAddFriend.length > 0){
    listBtnAddFriend.forEach(button => {
        button.addEventListener("click", ()=>{
            const userId = button.getAttribute("btn-add-friend");
            
            const boxUser = button.closest(".box-user");
            boxUser.classList.add("add")
            
            socket.emit("CLIENT_ADD_FRIEND",userId)
        })
    })  
}
// Chuc nang gui yeu cau end 
