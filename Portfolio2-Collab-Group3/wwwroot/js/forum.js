// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal
var btn = document.getElementById("createThread");

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

var count = 0;
//SendButton is clicked
document.getElementById("sendButton").addEventListener("click", function (event) {
    modal.style.display = "none";
    var user = document.getElementById("userInput").value;
    var message = document.getElementById("messageInput").value;
    var id = user + count;
    count++;
    //var cardTop = document.createElement("div");
    //cardTop.className = "card-columns";
    var card = document.createElement("div");
    card.className = "card-columns card";
    card.id = id;
    var cardBody = document.createElement("div");
    cardBody.className = "card-body";
    var cardTitle = document.createElement("h4");
    cardTitle.className = "card-title";
    cardTitle.textContent = user;
    var cardText = document.createElement("p");
    cardText.className = "card-text";
    cardText.textContent = message;
    cardBody.appendChild(cardTitle);
    cardBody.appendChild(cardText);
    card.appendChild(cardBody);
    //cardTop.appendChild(card);
    document.getElementById("threadList").appendChild(card);

    event.preventDefault();
});
