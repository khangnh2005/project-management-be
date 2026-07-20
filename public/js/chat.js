// CLIENT_SEND_MESSAGE
const formSendData = document.querySelector(".chat .inner-form")
if(formSendData){
    formSendData.addEventListener("submit" ,(e)=>{
        e.preventDefault();
        const content = e.target.elements.content.value
        if(content){
            socket.emit("CLIENT_SEND_MESSAGE", content)
            e.target.elements.content.value = ""
            socket.emit("CLIENT_SEND_TYPING", "hide");
        }
    })
}
// CLIENT_SEND_MESSAGE

//SERVER_RETURN_MESSAGE
socket.on("SERVER_RETURN_MESSAGE" , async (data) =>{
    const myId = document.querySelector("[my-id]").getAttribute("my-id");
    const body = document.querySelector(".chat .inner-body")
    const boxTyping = document.querySelector(".chat .inner-list-typing")
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

    body.insertBefore(div , boxTyping)
    body.scrollTop = body.scrollHeight
}) 
//SERVER_RETURN_MESSAGE

//Show Typing
let typingTimer;
const showTyping = () => {
    //Typing
    clearTimeout(typingTimer);
    socket.emit("CLIENT_SEND_TYPING", "show");
    
    typingTimer = setTimeout(() => {
        socket.emit("CLIENT_SEND_TYPING", "hide");
    }, 4000);
}
//Show Typing end

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
    const input = document.querySelector('.chat .inner-form input[name="content"]')
    emojiPicker.addEventListener('emoji-click', (event) => {
        if(input){
            input.value += event.detail.unicode
            input.focus()
            showTyping();

        }
        
    })
  }
}

//Typing - show/hide

const inputChat = document.querySelector('.chat .inner-form input[name="content"]');
if (inputChat) {
    inputChat.addEventListener("keyup", () => {
      showTyping();
    });
}
//Typing - show/hide

//Emoji-picker


//SERVER_RETURN_TYPING
const elementListTyping = document.querySelector(".chat .inner-list-typing");

if (elementListTyping) {
    socket.on("SERVER_RETURN_TYPING", (data) => {
        const existBox  = elementListTyping.querySelector(`[user-id="${data.userId}"]`)

        if (data.type == "show") {
            if(!existBox){
                const boxTyping = document.createElement("div");
                boxTyping.classList.add("box-typing");
                boxTyping.setAttribute("user-id", data.userId);

                boxTyping.innerHTML = `
                    <div class="inner-name">${data.fullName}</div>
                    <div class="inner-dots">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                `;

                elementListTyping.appendChild(boxTyping);
            }
            // Scroll xuống khi có typing
            const bodyChatScroll = document.querySelector(".chat .inner-body");
            if(bodyChatScroll){
                bodyChatScroll.scrollTop = bodyChatScroll.scrollHeight;
            }
        } else if (data.type == "hide") {
            if(existBox){
                existBox.remove();
            }
            // Scroll xuống khi hết typing
            const bodyChatScroll = document.querySelector(".chat .inner-body");
            if(bodyChatScroll){
                bodyChatScroll.scrollTop = bodyChatScroll.scrollHeight;
            }
        }
    });
}
//SERVER_RETURN_TYPING

