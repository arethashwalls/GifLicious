$(document).ready(function () {

    $('.gif-title').hide();

    //An array of all possible topics:
    var topics = ['noodles', 'taco', 'burger', 'sushi', 'fondue', 'chocolate', 'steak',
        'ice cream', 'bagel', 'dumplings']
    var key = 'YO1V30OsrDmHaofembwPUeRHKrS1WYDB';
    var offset = 0;

    var localCount = (localStorage.getItem('localCount') || 0);
    console.log(localCount);
    if (localCount === 0) { 
        $('.fave-box').hide();
    } else {
        loadLocalFaves();
    }

    //storageAvailable testing function from MDN
    //[https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API]
    function storageAvailable(type) {
        try {
            var storage = window[type],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch (e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    }

    function loadLocalFaves() {
        $('.fave-box').show();
        $('.all-faves').empty();
        for (let i = 0; i < localCount; i++) {
            $('.all-faves').append(
                $('<div>').html(localStorage.getItem('gifDiv-' + i)).addClass('gif-div')
            );
        }
        $('.fave-box .fave-button').remove();
    }

    //makeButtons returns a div filled with a button for each topic in topics:
    function makeButtons(arr) {
        var $buttonDiv = $('<div>');
        for (let i = 0; i < arr.length; i++) {
            $buttonDiv.append(
                $('<button>').text(arr[i]).addClass('gif-button').attr('data-topic', arr[i])
            );
        }
        return $buttonDiv;
    }

    //makeGifs returns a div filled with still gifs and an appropriate caption from GIPHY's data:
    function makeGifs(gifData) {
        //Create a new div to hold all the contents:
        var $gifsBox = $('<div>');
        //For each item in the data array:
        for (let i = 0; i < gifData.length; i++) {
            //Create a new for that item with an ID for tracking it:
            var $gifDiv = $('<div>').attr({
                'class': 'gif-div',
                'id': 'gif-div-' + (offset + i)
            });
            //Add the still image, include a link to the animated image:
            $gifDiv.append($('<img>').attr({
                'class': 'gif',
                'src': gifData[i].images.original_still.url,
                'data-still-src': gifData[i].images.original_still.url,
                'data-animate-src': gifData[i].images.original.url
            }),
                //Add a caption with the title and rating:
                '<h3>' + gifData[i].title + '</h3>' +
                '<p><strong>Rating:</strong> ' + gifData[i].rating.toUpperCase() + '</p>'
            );
            //Add a link to the creator's profile, if that gif lists a creator:
            if (gifData[i].hasOwnProperty('user')) {
                $gifDiv.append(
                    '<p><strong>Creator:</strong> <a href="' +
                    gifData[i].user.profile_url + '" target="_blank">' +
                    gifData[i].user.username + '</a></p>'
                );
            }
            //Add a favorite button with a reference to the div's ID:
            $gifDiv.append($('<button>').text('Delicious!').attr({
                'class': 'fave-button',
                'data-target': 'gif-div-' + (offset + i)
            }))
            $gifsBox.append($gifDiv);
        }
        return $gifsBox;
    }

    //Call makeButtons with the initial topics array:
    $('.button-box').html(makeButtons(topics).html());

    //The topic-submit button lets users add new topics and remakes the button-box accordingly:
    $('#topic-submit').on('click', function (e) {
        e.preventDefault();
        topics.push(
            $('#topic-input').val().trim().toLowerCase()
        );
        $('.button-box').html(makeButtons(topics).html());
    });

    //Clicking a button calls for ten gifs from GIPHY and adds them to the gif box:
    $('.container').on('click', '.gif-button', function () {
        var $that = $(this);
        $('.gif-title').show();
        //For every button but the more-button, clear the existing GIFs and reset offset:
        if ($that.attr('id') !== 'more-button') {
            $('.gif-box').empty();
            offset = 0;
        }
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?api_key=' + key +
                '&q=' + $that.attr('data-topic') + '&limit=10&offset=' + offset,
            method: 'GET'
        }).then(function (response) {
            //Append the 10 new gifs with makeGIFs:
            $('.gif-box').append(makeGifs(response.data).html());
            //Increment offset by 10:
            offset += 10;
            //Remove the current more-button:
            $('#more-button').remove();
            //And create a new one at the end of the list:
            $('.gif-box').append(
                $('<button>').text('Still hungry!').attr({
                    'class': 'gif-button',
                    'id': 'more-button',
                    'data-topic': $that.attr('data-topic')
                })
            );

        });
    });

    //Clicking on a gif toggles its animation:
    $('.container').on('click', '.gif', function () {
        if ($(this).attr('src') === $(this).attr('data-still-src')) {
            $(this).attr('src', $(this).attr('data-animate-src'));
        } else {
            $(this).attr('src', $(this).attr('data-still-src'));
        }
    });

    


    //Clicking the favorite button will add that gif and it's caption to the favorites section:
    $('.gif-box').on('click', '.fave-button', function () {
        let $thisGifDiv = $('#' + $(this).attr('data-target'));
        if (storageAvailable('localStorage')) {
            localStorage.setItem('gifDiv-' + localCount, $thisGifDiv.html());
            localCount++;
            localStorage.setItem('localCount', localCount);
            loadLocalFaves();
        } else {
            $('.fave-box').show();
            $thisGifDiv.clone().removeAttr('id').appendTo('.all-faves');
            $('.fave-box .fave-button').remove();
        }
    });

    $('#clear-faves').on('click', function(){
        localStorage.clear();
        localCount = 0;
        $('.fave-box').hide();
        console.log(localStorage)
    })

});