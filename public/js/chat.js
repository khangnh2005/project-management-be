// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form")
if(formSendData){
    formSendData.addEventListener("submit" ,(e)=>{
        e.preventDefault();
        const content = e.target.elements.content.value
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE", content)
            e.target.elements.content.value = ""
        }
    })
}
// CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE" , async (data) =>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body")

    const div = document.createElement("div")
    let htmlFullname = ""
    if(myId == data.userId){
        div.classList.add("inner-outgoing")
    }
    else{
         htmlFullname = `<div class ="inner-name">${data.fullName}</div>    `
        div.classList.add("inner-incoming")

    }
    div.innerHTML= `
        ${htmlFullname}           
        <div class ="inner-content">${data.content}</div>           
        
    `

    body.appendChild(div)
    body.scrollTop = body.scrollHeight
}) 
//SERVER_RETURN_MESSAGE

//Scroll to bottom
const bodyChat = document.querySelector(".chat .inner-body")
if(bodyChat){
    bodyChat.scrollTop = bodyChat.scrollHeight
}
//Scroll to bottom

//Emoji-picker
const buttonIcon = document.querySelector(".button-icon");
const tooltip = document.querySelector(".tooltip");

if (buttonIcon && tooltip) {
  // Show/Hide Popup
  buttonIcon.onclick = (e) => {
    // Không toggle nếu click vào tooltip hoặc emoji-picker
    if (tooltip.contains(e.target)) return;
    tooltip.classList.toggle("shown");
  };

  //insert icon to input
  const emojiPicker = document.querySelector('emoji-picker')
  if(emojiPicker){
      emojiPicker.addEventListener('emoji-click', (event) => {
          const input = document.querySelector('.chat .inner-form input[name="content"]')
          if(input){
              input.value += event.detail.unicode
              input.focus()
          }
      })
  }
}
//Emoji-picker
