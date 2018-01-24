/*
 * Incremental Code Company
 *
 * Made by ErrorInAComment
 * Released under the GNU General Public License v3.0
 */

/**
 * ========================================
 * Config
 * ========================================
 */

var config = {
    version : 'v0.2.1-alpha',
    cookie : {
        days : 30,      // The amount of days the cookie is saved
        indexes : {
            version : 'version',
            lines : 'lines',
            money : 'money',
            keyboard : 'keyboard'
        }
    }
};

/**
 * ========================================
 * Global variables
 * ========================================
 */

var lines; // The amount of lines of code

var money; // The amount of money

// The various upgrades and levels
var upgrades = {
    keyboard : null
};

/**
 * ========================================
 * Elements
 * ========================================
 */

var elMoney                 = document.getElementById('money');
var elLines                 = document.getElementById('lines');

var elWriteCode             = document.getElementById('write-code');
var elSellCode              = document.getElementById('sell-code');

var elUpgradeKeyboard       = document.getElementById('upgrade-keyboard');
var elUpgradeKeyboardCost   = document.getElementById('upgrade-keyboard-cost');

var elReset                 = document.getElementById('reset');

/**
 * ========================================
 * Functions
 * ========================================
 */

/**
 * Change the amount of money. Updates the HTML element and saves the amount in a cookie.
 *
 * @param m New amount of money
 */
function setMoney(m)
{
    // Parse to integer (In case m has been retrieved from a cookie)
    m = parseInt(m);

    // Update amount of money
    money = m;

    // Update the element showing the money
    elMoney.innerHTML = '$' + m + '.';

    // Save money in cookie
    CookieHelper.set(config.cookie.indexes.money, m, config.cookie.days);
}

/**
 * Change the amount of lines. Updates the HTML element and saves the amount in a cookie.
 *
 * @param l New amount of lines
 */
function setLines(l)
{
    // Parse to integer (In case s has been retrieved from a cookie)
    l = parseInt(l);

    // Update amount of lines
    lines = l;

    // Update the element showing the line count
    elLines.innerHTML = l + ' lines of code.';

    // Save lines in cookie
    CookieHelper.set(config.cookie.indexes.lines, l, config.cookie.days);
}

/**
 * Calculate the cost to upgrade the keyboard to a specified level
 * Cost formula: 10^level
 *
 * @param level Level to calculate the cost for
 * @returns {number} Cost
 */
function keyboardUpgradeCost(level)
{
    return Math.pow(10, level);
}

/**
 * Change the level of keyboard upgrades, save the level in a cookie and update the price shown in HTML
 *
 * @param level The new level
 */
function setKeyboardUpgrades(level)
{
    // Parse to int, in case the level was retrieved from a cookie
    level = parseInt(level);

    // Update upgrade level
    upgrades.keyboard = level;

    // Save upgrades in cookie
    CookieHelper.set(config.cookie.indexes.keyboard, level, config.cookie.days);

    // Update the price shown
    elUpgradeKeyboardCost.innerHTML = keyboardUpgradeCost(level + 1);
}

/**
 * Resets all progress
 */
function reset()
{
    // Reset lines of code
    setLines(0);

    // Reset money
    setMoney(0);

    // Reset upgrades
    setKeyboardUpgrades(1);
}

/**
 * ========================================
 * Callbacks
 * ========================================
 */

/**
 * Add lines when the user "writes"
 */
function writeCodeOnClick()
{
    // Add lines
    setLines(lines + upgrades.keyboard);
}

/**
 * Add money for the lines sold
 */
function sellCodeOnClick()
{
    // Add $2 per line of code
    setMoney(money + lines * 2);

    // Remove sold lines
    setLines(0);
}

/**
 * Upgrade the keyboard when the user clicks the upgrade button
 */
function upgradeKeyboardOnClick()
{
    // Calculate the cost of the upgrade
    let cost = keyboardUpgradeCost(upgrades.keyboard + 1);

    // Check the user can afford the upgrade
    if(money < cost)
        return;

    // Change upgrade level
    setKeyboardUpgrades(upgrades.keyboard + 1);

    // Pay for the upgrade
    setMoney(money - cost);
}

/**
 * Reset the game progress, when the user clicks the reset button in the menu
 */
function resetOnClick()
{
    if(!confirm("Do you really want to reset all your progress?"))
        return;

    reset();
}

/**
 * ========================================
 * Init code
 * ========================================
 */

// Reset progress, if there is a version mismatch
if(CookieHelper.get(config.cookie.indexes.version) != config.version)
{
    reset();
}

// Save version in cookie
CookieHelper.set(config.cookie.indexes.version, config.version, config.cookie.days);

// Retrieve lines from cookie or set to 0.
setLines((CookieHelper.get(config.cookie.indexes.lines) || 0));

// Retrieve money from cookie or set to 0.
setMoney((CookieHelper.get(config.cookie.indexes.money) || 0));

// Retrieve upgrades from cookies or set default value
setKeyboardUpgrades((CookieHelper.get(config.cookie.indexes.keyboard) || 1));

// Setup write code callback
elWriteCode.onclick = writeCodeOnClick;

// Setup sell code callback
elSellCode.onclick = sellCodeOnClick;

// Setup upgrade keyboard callback
elUpgradeKeyboard.onclick = upgradeKeyboardOnClick;

// Setup reset game callback
elReset.onclick = resetOnClick;

// Add greeting to console
console.log('%c At last! A real developer has finally come along!', 'font-weight: bold; color: #FFF; background: #000; padding: 2px');