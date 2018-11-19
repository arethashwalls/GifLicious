$(document).ready(function () {

    //An array of all 
    var topics = ['noodles', 'taco', 'burger', 'sushi', 'fondue', 'chocolate', 'steak',
        'ice cream', 'bagel', 'dumplings']
    var key = 'YO1V30OsrDmHaofembwPUeRHKrS1WYDB';
    var offset = 0;

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
        var $gifsBox = $('<div>');
        for (let i = 0; i < gifData.length; i++) {
            var $gifDiv = $('<div>').addClass('gif-div');
            $gifDiv.append($('<img>').attr({
                'class': 'gif',
                'src': gifData[i].images.original_still.url,
                'data-still-src': gifData[i].images.original_still.url,
                'data-animate-src': gifData[i].images.original.url
            }),
                '<h3>' + gifData[i].title + '</h3>' +
                '<p><strong>Rating:</strong> ' + gifData[i].rating.toUpperCase() + '</p>'
            );
            if (gifData[i].hasOwnProperty('user')) {
                $gifDiv.append(
                    '<p><strong>Creator:</strong> <a href="' +
                    gifData[i].user.profile_url + '" target="_blank">' +
                    gifData[i].user.username + '</a></p>'
                );
            }
            $gifsBox.append($gifDiv);
        }
        return $gifsBox;
    }

    //Call makeButtons with the initial topics array:
    $('.button-box').html(makeButtons(topics).html());

    //Clicking a button calls for ten gifs from GIPHY and adds them to the gif box:
    $('.container').on('click', '.gif-button', function () {
        var $that = $(this);
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?api_key=' + key +
                '&q=' + $that.attr('data-topic') + '&limit=10&offset=' + offset,
            method: 'GET'
        }).then(function (response) {
            if($that.attr('id') !== 'more-button') {
                $('.gif-box').empty();
            }
            $('.gif-box').append(makeGifs(response.data).html());
            offset += 10;
            $('.gif-box').append(
                $('<button>').text('Still hungry!').attr({
                    'class': 'gif-button',
                    'id' : 'more-button',
                    'data-topic': $that.attr('data-topic')
                })
            );
            
        });
    });

    //Clicking on a gif toggles its animation:
    $('.gif-box').on('click', '.gif', function () {
        if ($(this).attr('src') === $(this).attr('data-still-src')) {
            $(this).attr('src', $(this).attr('data-animate-src'));
        } else {
            $(this).attr('src', $(this).attr('data-still-src'));
        }
    });

    //The topic-submit button lets users add new topics and remakes the button-box accordingly:
    $('#topic-submit').on('click', function (e) {
        e.preventDefault();
        topics.push(
            $('#topic-input').val().trim().toLowerCase()
        );
        $('.button-box').html(makeButtons(topics).html());
    });

});