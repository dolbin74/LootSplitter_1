// ---------------------------------------------
// Dungeon Loot Splitter - Core Data
// ---------------------------------------------

// Array to store loot items as objects
let lootItems = [];

// ---------------------------------------------
// DOM Elements
// ---------------------------------------------

const partySizeInput = document.getElementById("partySize");
const lootNameInput = document.getElementById("lootName");
const lootValueInput = document.getElementById("lootValue");

const lootListElement = document.getElementById("lootList");
const runningTotalElement = document.getElementById("runningTotal");

const finalTotalElement = document.getElementById("finalTotal");
const perMemberElement = document.getElementById("perMember");

// Error message elements
const partyError = document.getElementById("partyError");
const lootError = document.getElementById("lootError");
const splitError = document.getElementById("splitError");

// ---------------------------------------------
// Function Declarations (empty for now)
// ---------------------------------------------

function addLoot() {
    // Will validate inputs, create object, push to array, re-render list
}

function renderLoot() {
    // Will loop through lootItems, build <li> list, calculate running total
}

function splitLoot() {
    // Will validate party size, calculate split, update results
}

// ---------------------------------------------
// Event Listeners
// ---------------------------------------------

document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);
