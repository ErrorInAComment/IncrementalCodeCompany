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
    cookie : {
        days : 30,      // The amount of days the cookie is saved
        indexes : {
            lines : 'lines'
        }
    },
    linesPerClick : 1   // The amount of lines written per click
};

/**
 * ========================================
 * Global variables
 * ========================================
 */

var lines; // The amount of lines of code

/**
 * ========================================
 * Elements
 * ========================================
 */

var elLines         = document.getElementById('lines');

var elWriteCode     = document.getElementById('write-code');

/**
 * ========================================
 * Functions
 * ========================================
 */

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
 * ========================================
 * Callbacks
 * ========================================
 */

/**
 * Add lines when the user "writes"
 */
function WriteCodeOnClick()
{
    // Add lines
    setLines(lines + config.linesPerClick);
}

/**
 * ========================================
 * Init code
 * ========================================
 */

// Retrieve lines from cookie or set to 0.
setLines((CookieHelper.get(config.cookie.indexes.lines) || 0));

// Setup write code callback
elWriteCode.onclick = WriteCodeOnClick;