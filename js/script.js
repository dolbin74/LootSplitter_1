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
    // Inputs, create object, push to array, re-render list

    // Clear previous error
    lootError.textContent = "";

    // Read values
    const name = lootNameInput.value.trim();
    const value = parseFloat(lootValueInput.value);

    // Validation
    if (name === "") {
        lootError.textContent = "Loot name cannot be empty.";
        return;
    }

    if (isNaN(value)) {
        lootError.textContent = "Loot value must be a number.";
        return;
    }

    if (value < 0) {
        lootError.textContent = "Loot value cannot be negative.";
        return;
    }

    // Create loot object
    const lootObject = {
        name: name,
        value: value
    };

    // Push into array
    lootItems.push(lootObject);

    // Clear inputs
    lootNameInput.value = "";
    lootValueInput.value = "";

    // Re-render list
    renderLoot();
}

function renderLoot() {
    // Loop through lootItems, build <li> list, calculate running total

    // If no loot, show message
    if (lootItems.length === 0) {
        lootListElement.innerHTML = "";
        runningTotalElement.textContent = "Total Loot: $0.00";
        return;
    }

    // Build list HTML
    let listHTML = "";
    let total = 0;

    // Required: traditional for loop
    for (let i = 0; i < lootItems.length; i++) {
        const item = lootItems[i];
        listHTML += `<li>${item.name} - $${item.value.toFixed(2)}</li>`;
        total += item.value;
    }

    // Update DOM
    lootListElement.innerHTML = listHTML;
    runningTotalElement.textContent = `Total Loot: $${total.toFixed(2)}`;
}


function splitLoot() {
    // Input/validate party size, calculate split, update results

    // Clear previous error
    splitError.textContent = "";

    // Read party size
    const partySize = parseInt(partySizeInput.value);

    // Validate party size
    if (isNaN(partySize) || partySize < 1) {
        splitError.textContent = "Party size must be 1 or greater.";
        return;
    }

    // Validate loot exists
    if (lootItems.length === 0) {
        splitError.textContent = "No loot has been added yet.";
        return;
    }

    // Calculate total using a loop
    let total = 0;
    for (let i = 0; i < lootItems.length; i++) {
        total += lootItems[i].value;
    }

    // Calculate split
    const perPerson = total / partySize;

    // Update DOM
    finalTotalElement.textContent = `Total Loot: $${total.toFixed(2)}`;
    perMemberElement.textContent = `Loot Per Party Member: $${perPerson.toFixed(2)}`;
}


// ---------------------------------------------
// Event Listeners
// ---------------------------------------------

document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);
