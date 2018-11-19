$(document).ready(function () {

    var topics = ['noodles', 'taco', 'burger', 'sushi', 'fondue', 'chocolate', 'steak',
        'ice cream', 'bagel', 'dumplings']
    var key = 'YO1V30OsrDmHaofembwPUeRHKrS1WYDB';
    // var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + topic + '&limit=10';


    for (let i = 0; i < topics.length; i++) {
        //For each topic, create a button, give it the 'gif-button' class, and set the data-topic attribute:
        var $newButton = $('<button>').text(topics[i]).addClass('gif-button').attr('data-topic', topics[i]);
        // $('.button-box').append($newButton);
        $newButton.appendTo($('.button-box'))
    }

    $('.button-box').on('click', '.gif-button', function() {
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + $(this).attr('data-topic') + '&limit=10',
            method: 'GET'
        }).then(function(response) {
            $('.gif-box').empty();
            var $gifDiv = $('<div>').addClass('gif-div');
            for(let i = 0; i < response.data.length; i++){
                $gifDiv.append($('<img>').attr({
                    'src' : response.data[i].images.original_still.url,
                    'data-animate-src' : response.data[i].images.original.url
                }));
            }
            $gifDiv.appendTo($('.gif-box'))
        });
    });

});