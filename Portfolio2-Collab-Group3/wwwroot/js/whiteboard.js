"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chathub").build();

//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

var count = 0;
var cards = [];
// Create a card to display user's content
connection.on("ReceiveMessage", function (user, message) {
    var id = "draggable" + count;
    count++;
    cards.push(id);
    var card = document.createElement("div");
    card.className = "card col-3"; //draggable
    card.id = id;
    //card.style.width = "18rem";
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

//Connection is established
connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    modal.style.display = "none";
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessage", user, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
    //var i;
    //console.log(cards);
    //for (i = 0; i < cards.length; i++) {
    //    if(cards[i] !== "")
    //        dragElement(document.getElementById(cards[i]));
    //}
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

function dragElement(elmnt) {
    var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
    elmnt.style.position = "absolute" //important for it to be dragged accurately
    elmnt.onmousedown = dragMouseDown;

    function dragMouseDown(e) {
        e = e || window.event;
        e.preventDefault();
        // get the mouse cursor position at startup:
        pos3 = e.clientX;
        pos4 = e.clientY;
        document.onmouseup = closeDragElement;
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag;
    }

    function elementDrag(e) {
        e = e || window.event;
        e.preventDefault();
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX;
        pos2 = pos4 - e.clientY;
        pos3 = e.clientX;
        pos4 = e.clientY;
        // set the element's new position:
        elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
        elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
    }

    function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null;
        document.onmousemove = null;
    }
}

//let selectedCard;
//HTMLDivElement.onclick = function (event) {
//    let target = event.target;

//    if (target.tagName != "card")
//        return;

//    console.log(target);
//    dragElement(target);
//};