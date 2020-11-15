"use strict";
//Global variables
var meetingCode;
var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

//After page load, display middle pop-up form
$(document).ready(function () {
    document.getElementById('ac-wrapper').style.display = "block";
});

//Submit button hides/clears away pop-up form
document.getElementById("formBtn").addEventListener("click", function (event) {
    meetingCode = document.getElementById("meetingCode").value;
    connection.invoke("AddToGroup", meetingCode).catch(function (err) { //add to a common group (unique code for the whiteboard)
        return console.error(err.toString());
    });
    document.getElementById('ac-wrapper').style.display = "none";
});

var count = 0;
//Create a card to display user's content
connection.on("ReceiveMessage", function (user, message) {
    var id = "draggable" + count;
    count++;
    var card = document.createElement("div");
    card.className = "card col-3";
    card.id = id;
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    var cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.textContent = user;
    var cardText = document.createElement("p");
    cardText.textContent = message;
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    document.getElementById("messagesList").appendChild(card);
    dragElement(document.getElementById(card.id));
});

//Update position of moved div
connection.on("ReceiveNewPosition", function (divID, pos1, pos2) {
    //set the element's new position:
    console.log(divID, pos1, pos2);
    var elmnt = document.getElementById(divID);
    elmnt.style.top = (pos2) + "px";
    elmnt.style.left = (pos1) + "px";
});

//Connection is established
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false; //enable the sendButton
}).catch(function (err) {
    return console.error(err.toString());
});


//SendButton is clicked
document.getElementById("sendButton").addEventListener("click", function (event) {
    modal.style.display = "none";
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage",meetingCode, user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("createCard");

// Get the send message button
var createMsg = document.getElementById("sendButton");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
btn.onclick = function () {
    modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

//Function for draggable div
function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.className += " draggable" //important for it to be dragged accurately
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        //get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        //call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        //calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        //set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        //stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;

        //Send the position of the moved div to other users in the same group
        connection.invoke("SendPosition",meetingCode, elmnt.id, elmnt.offsetLeft - pos1, elmnt.offsetTop - pos2).catch(function (err) {
            return console.error(err.toString());
        });
    }
}