# GIFLicious!

## An application for fetching and displaying GIFs from the [GIPHY API](https://developers.giphy.com/), created for the UA Coding Bootcamp.

### Files:

* `index.html` contains the application's HTML content
* `assets`
  * `images`
    * `header-bkgd.png` is used as a banner
    * `giflicious.ico` is the page's favicon
  * `style`
    * `web-fonts` contains the project's web-fonts
      * `cherryswash-regular-webfont.woff`
      * `LAKESHOR-webfont.woff`
    * `reset.css` contains css resets
    * `style.css` contains all other styles
  * `app.js` contains the app's core functionality

### Application:

The GIFLicious application is written in JavaScript using the JQuery library.

**Line 2**: The gif section title is initially hidden.
**Lines 5-8**: Three global varialbes are defined:
  * `topics` contains an array topics initially available.
  * `key` holds my API key. Although the key is publically available in this repo, I want to get in the practice of seperating the key from the rest of the query.
  * `offset` holds an offset to ensure requests for more gifs don't pull duplicates.
**Line 11**: The `localCount` variable is pulled from local storage. If it hasn't been defined, the assignment short-circuits to 0.
**Lines 13-17**: If there's nothing in local storage for this application, the Favorites section is hidden. If favorites have been saved, they're loaded with `loadLocalFaves`.
**Lines 21-116**: 4 functions are defined:
  * `storageAvailable(type)` is taken from [MDN Web Docs](https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API). It checks whether localStorage is available and returns either `true` or an error.
  * `loadLocalFaves()` displays all favorited gifs currently saved in local storage.
  * `makeButtons(arr)` takes an array and returns a div containing a button for each string in the array.
  * `makeGifs(gifData)` expects an array of data from a GIPHY API response. It creates a gif div for each entry in the array, and appends each to a box, then returns the box.
**Line 119**: The `button-box` div is filled by calling `makeButtons` on `topics`.
**Lines 122-128**: An event listener is added to the `topic-submit` button which will add the new topic to `topics` and remake the `button-box` div.
**Lines 131-160**: An event listener is added to the `gif-button` button which calls the GIPHY API then displays the returned data with `makeGifs` and (removes then) creates a button to request more gifs.
**Lines 163-169**: An event listener is added to each gif `img` allowing users to toggle gif animations.
**Lines 172-185**: An event listener is added to the `fave-button` button allowing users to add gifs to the `fave-box`. If local storage is available, favorited gifs will also have their div's HTML content saved in local storage.
**Lines 188-192**: An event listener is added to the `clear-faves` button to clear out the `fave-box` and local storage.

## TODO
* ~~Sometimes, clicking 'fave' adds the wrong gif when multiple topics have loaded.~~
* ~~Add local storage thing~~
* ~~Re-comment and write-up documentation~~
* Clean stylesheet
