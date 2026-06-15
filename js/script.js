/* ---------------------------------------------------------
   Dungeon Loot Splitter - script.js
   Author: David Anna
   Course: DEV109
   Assignment: Dungeon Loot Splitter - Phase 1
   ----------------------------------------------------------
   SUBMISSION COMMENTS (BONUS FEATURES IMPLEMENTED):

   BONUS #1 — Auto-Recalculate Split:
   After each successful loot addition, the app automatically
   recalculates the loot split IF the party size is valid.
   This makes the interface more dynamic and modern.

   BONUS #2 — Guild Tax System:
   If the total loot exceeds 100 gold, a 10% guild tax is
   automatically applied before splitting the loot. The tax
   amount is displayed to the user.

   ----------------------------------------------------------
   With these bonus features, the original required features 
   remain unchanged and fully functional.
   --------------------------------------------------------- */


// ---------------------------------------------------------
// Core Data
// ---------------------------------------------------------

// Array to store loot items as objects
let lootItems = [];


// ---------------------------------------------------------
// DOM Elements
// ---------------------------------------------------------

const partySizeInput = document.getElementById("partySize");
const lootNameInput = document.getElementById("lootName");
const lootValueInput = document.getElementById("lootValue");

const lootListElement = document.getElementById("lootList");
const runningTotalElement = document.getElementById("runningTotal");

const finalTotalElement = document.getElementById("finalTotal");
const perMemberElement = document.getElementById("perMember");

const partyError = document.getElementById("partyError");
const lootError = document.getElementById("lootError");
const splitError = document.getElementById("splitError");


// ---------------------------------------------------------
// addLoot() - Add loot item, validate, push to array
// ---------------------------------------------------------

function addLoot() {

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

    // -----------------------------------------------------
    // BONUS FEATURE #1 — Auto-Recalculate Split
    // -----------------------------------------------------
    if (partySizeInput.value && parseInt(partySizeInput.value) >= 1) {
        splitLoot();
    }
}



// ---------------------------------------------------------
// renderLoot() - Loop through array, build list, calc total
// ---------------------------------------------------------

function renderLoot() {

    if (lootItems.length === 0) {
        lootListElement.innerHTML = "";
        runningTotalElement.textContent = "Total Loot: $0.00";
        return;
    }

    let listHTML = "";
    let total = 0;

    // Required traditional for loop
    for (let i = 0; i < lootItems.length; i++) {
        const item = lootItems[i];
        listHTML += `<li>${item.name} - $${item.value.toFixed(2)}</li>`;
        total += item.value;
    }

    lootListElement.innerHTML = listHTML;
    runningTotalElement.textContent = `Total Loot: $${total.toFixed(2)}`;
}



// ---------------------------------------------------------
// splitLoot() - Validate, calculate total, apply tax, split
// ---------------------------------------------------------

function splitLoot() {

    splitError.textContent = "";

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

    // Calculate total using loop
    let total = 0;
    for (let i = 0; i < lootItems.length; i++) {
        total += lootItems[i].value;
    }

    // -----------------------------------------------------
    // BONUS FEATURE #2 — Guild Tax (10% if total > 100)
    // -----------------------------------------------------
    let tax = 0;
    if (total > 100) {
        tax = total * 0.10;
        total -= tax;
        splitError.textContent = `Guild Tax Applied: $${tax.toFixed(2)}`;
    } else {
        splitError.textContent = "";
    }

    // Calculate split
    const perPerson = total / partySize;

    // Update DOM
    finalTotalElement.textContent = `Total Loot (after tax): $${total.toFixed(2)}`;
    perMemberElement.textContent = `Loot Per Party Member: $${perPerson.toFixed(2)}`;
}



// ---------------------------------------------------------
// Event Listeners
// ---------------------------------------------------------

document.getElementById("addLootBtn").addEventListener("click", addLoot);
document.getElementById("splitLootBtn").addEventListener("click", splitLoot);
