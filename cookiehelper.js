/*
 * JavaScript Cookie Helper
 *
 * Written by ErrorInAComment
 * Released under the MIT license
 */

class CookieHelper
{
    /**
     * Set a cookie
     *
     * @param name Name of the cookie
     * @param value Value of the cookie
     * @param days How many days before the cookie expires
     */
    static set(name, value, days)
    {
        // Create date for expiry
        let date = new Date(Date.now() + days * 24 * 60 * 60 * 1000);

        // Create the cookie
        document.cookie = name + '=' + value + '; ' + 'expires=' + date.toUTCString() + '; ' + 'path=/';
    }

    /**
     * Get the value of a cookie
     *
     * @param name The name of the cookie to retrieve
     * @returns {*} Returns either the value or null if the cookie isn't set
     */
    static get(name)
    {
        // The beginning to be looking for
        let lookFor = name + '=';

        // Get an array of all cookies
        let cookies = document.cookie.split(';');

        // Loop through the cookies
        for(let i = 0; i < cookies.length; i++)
        {
            // Get the cookie from the array
            let c = cookies[i];

            // Remove whitespace
            while(c.charAt(0) == ' ')
            {
                c = c.substr(1);
            }

            // Check whether the beginning matches
            if(c.substr(0, lookFor.length) == lookFor)
            {
                // Return the end (value)
                return c.substr(lookFor.length, c.length);
            }
        }

        // No match was found, return null
        return null;
    }

    /**
     * Delete a cookie by overwriting it with an empty value and an old expiry date
     *
     * @param name Name of the cookie
     */
    static delete(name)
    {
        // Overwrite the cookie with empty value, and old expiry date
        document.cookie = name + '=; expires=' + new Date(0).toUTCString() + '; path=/';
    }
}