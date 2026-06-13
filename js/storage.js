/*
Eve Panzarino (jhankins)
2.8 - Working With Multiple APIs

storage.js  --  localStorage module.

*/

// Keys we store everything under (one constant so the spelling can't drift).
let DATE_KEY = "nerdSim.date";       // the current date: image + credit info
let CHAT_KEY = "nerdSim.chat";       // the conversation: array of messages
let CATEGORY_KEY = "nerdSim.category"; // remembered preference: waifu or husbando

// Read a JSON value back out of localStorage (null if missing or unreadable).
function read(key) {
    let raw = localStorage.getItem(key);
    if (!raw) {
        return null;
    }
    try {
        return JSON.parse(raw);
    } catch (error) {
    
        return null;
    }
}

// Save any JSON-friendly value.
function write(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}

// Date (the love interest)
export function saveDate(date) {
    write(DATE_KEY, date);
}
export function loadDate() {
    return read(DATE_KEY);
}

// Chat (the conversation)
export function saveChat(messages) {
    write(CHAT_KEY, messages);
}
export function loadChat() {
    return read(CHAT_KEY) || [];
}

// Category preference (waifu / husbando) 
export function saveCategory(category) {
    write(CATEGORY_KEY, category);
}
export function loadCategory() {
    return read(CATEGORY_KEY) || "waifu";
}
