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

// Chuc nang huy yeu cau  
const listBtnCancelFriend = document.querySelectorAll("[btn-cancel-friend]")
if(listBtnCancelFriend.length > 0){
    listBtnCancelFriend.forEach(button => {
        button.addEventListener("click", ()=>{
            const userId = button.getAttribute("btn-cancel-friend");

            const boxUser = button.closest(".box-user");
            boxUser.classList.remove("add")
            socket.emit("CLIENT_CANCEL_FRIEND",userId)
        })
    })  
}
// Chuc nang huy yeu cau end 

// Chuc nang xoa loi moi ket ban 
const listBtnRejectFriend = document.querySelectorAll("[btn-reject-friend]")
if(listBtnRejectFriend.length >0){
    listBtnRejectFriend.forEach(button =>{
        
        button.addEventListener("click",()=>{
            const userId = button.getAttribute("btn-reject-friend")
            const boxUser = button.closest(".box-user")
            boxUser.classList.add("reject")
            socket.emit("CLIENT_REJECT_FRIEND",userId)
        })
        
    })
}
// Chuc nang xoa loi moi ket ban End


// Chuc nang chap nhan loi moi ket ban 
const listBtnAcceptFriend = document.querySelectorAll("[btn-accept-friend]")
if(listBtnAcceptFriend.length > 0){
    listBtnAcceptFriend.forEach(button => {
        button.addEventListener("click", ()=>{
            const userId = button.getAttribute("btn-accept-friend")
            const boxUser = button.closest(".box-user")
            boxUser.classList.add("accepted")

            socket.emit("CLIENT_ACCEPT_FRIEND" , userId)
        })
    })
}

//SERVER_RETURN_ACCEPT_FRIEND_LENGTH
const badgeUserAccept = document.querySelector("[badge-users-accept]")
if(badgeUserAccept){
    const userAcceptID = badgeUserAccept.getAttribute("badge-users-accept")
    socket.on("SERVER_RETURN_ACCEPT_FRIEND_LENGTH",data =>{
        
        if(data.userId == userAcceptID){
            badgeUserAccept.innerHTML = data.lengthAcceptFriend
        }  
    })
}

//SERVER_RETURN_ACCEPT_FRIEND_LENGTH END
const dataUsersAccept = document.querySelector("[data-users-accept]")
if(dataUsersAccept){
    socket.on("SERVER_RETURN_INFO_ACCEPT_FRIEND",(data) =>{
        const userAcceptID = dataUsersAccept.getAttribute("data-users-accept")
        if(data.userId == userAcceptID){
            //Ve ra giao dien
            const div = document.createElement("div")
            div.classList.add("col-6")
            div.innerHTML = `
                <div class="box-user">
                    <div class="inner-avatar">
                        <img src=${data.infoUser.avatar ? data.infoUser.avatar : "/images/avatar.png"} alt="Le Van A"></div> 
                        <div class="inner-info">
                        <div class="inner-name">${data.infoUser.fullName}</div>
                        <div class="inner-buttons">
                            <button class="btn btn-sm btn-primary mr-1" btn-accept-friend=${data.infoUser._id}>Chấp Nhận </button>
                            <button class="btn btn-sm btn-secondary mr-1" btn-reject-friend=${data.infoUser._id}>Từ Chối</button>
                            <button class="btn btn-sm btn-secondary mr-1" btn-deleted-friend="" disabled="">Đã Xóa</button>
                            <button class="btn btn-sm btn-secondary mr-1" btn-accepted-friend="" disabled="">Các bạn đã là bạn bè</button>
                        </div>
                    </div>
                </div>
            `
            dataUsersAccept.appendChild(div)

            //Chuc nang xoa loi moi
            const buttonReject = div.querySelector("[btn-reject-friend]")
            buttonReject.addEventListener("click",()=>{
                const userId = buttonReject.getAttribute("btn-reject-friend")
                const boxUser = buttonReject.closest(".box-user")
                boxUser.classList.add("reject")
                socket.emit("CLIENT_REJECT_FRIEND",userId)
            })
            //Chuc nang chap nhan loi moi
            const buttonAccept = div.querySelector("[btn-accept-friend]")
            buttonAccept.addEventListener("click", ()=>{
                const userId = buttonAccept.getAttribute("btn-accept-friend")
                const boxUser = buttonAccept.closest(".box-user")
                boxUser.classList.add("accepted")

                socket.emit("CLIENT_ACCEPT_FRIEND" , userId)
            })
        }  
    })
}




