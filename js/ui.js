/*
Eve Panzarino (jhankins)
2.8 - Working With Multiple APIs

ui.js  --  everything that touches the page (the "view").

This is the UI Module It builds the chat bubbles with createElement (the
"create HTML elements through JavaScript" requirement) and swaps the interface
between its empty / loading / loaded / error states.
*/

// Grab the elements once. main.js only talks to the page through this module.
const image = document.querySelector(".loveInterest");
const dateStatus = document.querySelector(".dateStatus");
const chat = document.querySelector(".messageContainer");

//The date image (API 1)

// EMPTY / LOADING state
export function showDateLoading() {
    image.classList.add("hidden");
    image.removeAttribute("src");
    dateStatus.textContent = "Finding your date...";
}

// LOADED state: show the image and credit the artist.
export function showDate(date) {
    image.src = date.imageUrl;
    image.alt = "Your " + date.category;
    image.classList.remove("hidden");
    dateStatus.textContent = "art by " + (date.artist || "unknown");
}

// ERROR state: no image, explain what went wrong.
export function showDateError(message) {
    image.classList.add("hidden");
    image.removeAttribute("src");
    dateStatus.textContent = message;
}

//The chat (API 2)
// Build one chat bubble element from a message object. Created in JavaScript.
function createMessageElement(message) {
    const p = document.createElement("p");
    p.classList.add("chat-message");
    p.classList.add(message.from === "you" ? "from-you" : "from-date");

    if (message.from === "date" && message.author) {
        // The quote, then a small line crediting its author.
        const quote = document.createElement("span");
        quote.classList.add("quote-text");
        quote.textContent = "“" + message.text + "”";

        const author = document.createElement("span");
        author.classList.add("quote-author");
        author.textContent = "— " + message.author;

        p.appendChild(quote);
        p.appendChild(author);

        // A second credit line built from API 1's response (the date's category
        // + portrait artist), making the API 1 -> API 2 dependency visible.
        if (message.dateArtist) {
            const dateMeta = document.createElement("span");
            dateMeta.classList.add("quote-author");
            dateMeta.textContent = "your " + message.category + " · art by " + message.dateArtist;
            p.appendChild(dateMeta);
        }
    } else {
        p.textContent = message.text;
    }
    return p;
}

// Redraw the whole conversation from the messages array.
// With no messages we show an empty-state bubble instead.
export function renderChat(messages) {
    chat.innerHTML = "";

    if (!messages || messages.length === 0) {
        const empty = document.createElement("p");
        empty.classList.add("chat-message", "empty-state");
        empty.textContent = "Your date hasn't said anything yet.";
        chat.appendChild(empty);
        return;
    }

    messages.forEach(function (message) {
        chat.appendChild(createMessageElement(message));
    });

    // Keep the newest message in view.
    chat.scrollTop = chat.scrollHeight;
}
