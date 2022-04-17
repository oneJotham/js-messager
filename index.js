
let message;
let savedMessages = document.getElementById('msgHistory');

window.addEventListener("load", function(){
    const lastMessage = localStorage.getItem("message"); 
            
    if(lastMessage){
        document.getElementById("last-message").innerHTML = lastMessage;
    }
           
});

if (localStorage.getItem("previousMessages") === null) {
    messageHistory =[];

}
else{
    let previousMessages = localStorage.getItem("previousMessages").split(','); 
    messageHistory = previousMessages;   
}



function showLastMessage(){      
    newMessage = document.getElementById("msg").value;
    newMessage= newMessage.trimEnd();
    
    if(newMessage !== ''){
        //save message to local storage so that it persists after page reload
        localStorage.setItem("message", newMessage);

        /*push the message to an array containing previous messages. This allows us to read and display old messages. Also saved in local storage. At this point, we limit the number of previous messages stored in local storage*/
        if(messageHistory.length <5){
            messageHistory.push(newMessage);
            localStorage.setItem("previousMessages", messageHistory);
        }
        else{
            messageHistory.shift();
            messageHistory.push(newMessage);
            localStorage.setItem("previousMessages", messageHistory);
        }       
        document.getElementById("last-message").innerHTML = localStorage.getItem("message");
        document.getElementById('msg').value = '';
    }else{
        alert("Please enter a short message.");

    }  

}
let historyItems = "";

function showHistory(){
    historyItems= "";
    savedMessages.innerHTML= historyItems;
    if(messageHistory.length !== 0){
        historyItems = `
        <hr/>
        <h3>Here are the last 5 messages you have sent!</h3>
        <hr/>`;
        messageHistory.forEach(function (element, index) {
            
            historyItems+=`
            <div id ="msgItem">
            <span class="messageCounter">Message ${index+1} </span>
            <p class="historyItem"> ${messageHistory[index]}</p>
            <hr/>
            </div>
            `
            
        });

        savedMessages.innerHTML= historyItems;
    }
    else{
        historyItems = "You have no previous messages";
        savedMessages.innerHTML= historyItems;
        
    }

}