/*
Eve Panzarino (jhankins)
2.8 - Working With Multiple APIs
6-12-2026

main.js  --  the entry point that wires the modules to the page.

  - Loaded as a module:  <script type="module" src="js/main.js">
  - Pulls its logic from the api / ui / storage modules.
  - All of the running code lives inside one IIFE (see the bottom).

Flow on first visit:
  fetchDate (API 1)  ->  .then  ->  fetchQuote (API 2)  ->  .then  -> render date + chat

On later visits the date + chat are read from localStorage and shown Without
calling the APIs again, which keeps our request count down.
*/

import { fetchDate, fetchQuote } from "./api.js";
import {
    showDateLoading, showDate, showDateError, renderChat
} from "./ui.js";
import {
    saveDate, loadDate, saveChat, loadChat, saveCategory, loadCategory
} from "./storage.js";

(function () {
    "use strict";

    //Page elements this file for events (complex / descendant + attribute selectors)
    let waifuBtn = document.querySelector(".Button-Grid > #waifu");
    let husbandoBtn = document.querySelector(".Button-Grid > #husbando");
    let nextDateBtn = document.querySelector(".imageContainer > #nextDate");
    let sendInput = document.querySelector(".sendRow input[type='text']");
    let sendButton = document.querySelector(".sendRow > #sendButton");
    
    let currentDate = null;   // the date object from API 1
    let messages = [];        // the conversation shown in the chat

    // Persist so refresh doesn't need the APIs again.
    function save() {
        saveDate(currentDate);
        saveChat(messages);
    }

    // Mark which toggle (waifu / husbando) is selected.
    function setActiveButton(category) {
        waifuBtn.classList.toggle("active", category === "waifu");
        husbandoBtn.classList.toggle("active", category === "husbando");
    }

    /*
     Get a brand new date. This is Chained.
    */
    function getNewDate(category) {
        showDateLoading();   // empty / loading state until the data is ready
        messages = [];
        renderChat(messages);
        setActiveButton(category);
        saveCategory(category);

        fetchDate(category) // API 1
            .then(function (date) {
                currentDate = date;
                return fetchQuote(date) // API 2 (chained after & dependent on API 1)
                    .then(function (quote) {
                        //only render if both succeeed.
                        showDate(date);
                        messages = [{
                            from: "date",
                            text: quote.text,
                            author: quote.author
                        }];
                        renderChat(messages);
                        save();
                    });
            })
            .catch(function (error) {
        
                console.log(error);
                showDateError("Couldn't load your date. Check your API key.");
            });
    }

    /*
     Send your message, then the date "replies" with another quote.
    */
    function sendMessage() {
        const text = sendInput.value.trim();
        if (!text || !currentDate) {
            return; 
        }

        messages.push({ from: "you", text: text });
        renderChat(messages);
        sendInput.value = "";
        save();

        fetchQuote(currentDate) // depends on the current date (from API 1)
            .then(function (quote) {
                messages.push({
                    from: "date",
                    text: quote.text,
                    author: quote.author
                });
                renderChat(messages);
                save();
            })
            .catch(function (error) {
                console.log(error);
                messages.push({
                    from: "date",
                    text: ".your date went quiet -- try again)"
                });
                renderChat(messages);
            });
    }

    //Events
    waifuBtn.addEventListener("click", function () { getNewDate("waifu"); });
    husbandoBtn.addEventListener("click", function () { getNewDate("husbando"); });
    nextDateBtn.addEventListener("click", function () {
        getNewDate(loadCategory());
    });
    sendButton.addEventListener("click", sendMessage);
    sendInput.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
            sendMessage();
        }
    });

    /* 
    Only reach out to the APIs when there is nothing cached in localstorage. 
    */
    function init() {
        const category = loadCategory();
        setActiveButton(category);

        const savedDate = loadDate();
        if (savedDate) {
            currentDate = savedDate;
            messages = loadChat();
            showDate(savedDate);
            renderChat(messages);
        } else {
            getNewDate(category);
        }
    }

    init();
})();
