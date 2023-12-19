const chatForm = document.getElementById('chat-form');
const chatMessages = document.querySelector('.chat-messages');



const socket = io();

// Message from Server
socket.on('message',message=>{
    console.log(message);
    outputMessage(message);

    // Scroll down
    chatMessages.scrollTop =  chatMessages.scrollHeight;

});


chatForm.addEventListener('submit',(e)=>{
    e.preventDefault();
    console.log(e.target.elements);
    
    // Get Message Text
    const msg = e.target.elements.msg.value;

    // console.log(msg);

    // Emmiting a message to the Server;
    socket.emit('chatMessage',msg);

});


// Output message to DOM:
function outputMessage(message)
{
    const div = document.createElement('div');
    div.classList.add('mesage');
    div.innerHTML = `<p class="meta">Brad <span>9:12pm</span></p>
    <p class="text">
       ${message}
    </p>`;

    document.querySelector('.chat-messages').appendChild(div);

}
