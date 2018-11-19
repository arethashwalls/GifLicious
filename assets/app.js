$(document).ready(function () {

    var topics = ['noodles', 'taco', 'burger', 'sushi', 'fondue', 'chocolate', 'steak',
        'ice cream', 'bagel', 'dumplings']
    var key = 'YO1V30OsrDmHaofembwPUeRHKrS1WYDB';

    function makeButtons(arr) {
        var $buttonDiv = $('<div>');
        for(let i = 0; i < arr.length; i++) {
            $buttonDiv.append( 
                $('<button>').text(arr[i]).addClass('gif-button').attr('data-topic', arr[i])
            );
        }
        return $buttonDiv;
    }

    $('.button-box').html(makeButtons(topics).html());

    $('.button-box').on('click', '.gif-button', function() {
        $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + $(this).attr('data-topic') + '&limit=10',
            method: 'GET'
        }).then(function(response) {
            $('.gif-box').empty();
            console.log(response)
            for(let i = 0; i < response.data.length; i++){
                let thisGif = response.data[i];
                var $gifDiv = $('<div>').addClass('gif-div');
                $gifDiv.append($('<img>').attr({
                    'class' : 'gif',
                    'src' : thisGif.images.original_still.url,
                    'data-still-src' : thisGif.images.original_still.url,
                    'data-animate-src' : thisGif.images.original.url
                }));
                $gifDiv.append(
                    '<h3>' + response.data[i].title + '</h3>' + 
                    '<p><strong>Rating:</strong> ' + thisGif.rating.toUpperCase() + '</p>'
                );
                if(thisGif.hasOwnProperty('user')){
                    $gifDiv.append('<p><strong>Creator:</strong> <a href="' + thisGif.user.profile_url + '" target="_blank">' + thisGif.user.username + '</a></p>');
                }
                $gifDiv.appendTo($('.gif-box'))
            }
        });
    });

    $('.gif-box').on('click', '.gif', function() {
        if($(this).attr('src') === $(this).attr('data-still-src')) {
            $(this).attr('src', $(this).attr('data-animate-src'));
        } else {
            $(this).attr('src', $(this).attr('data-still-src'));
        }
    });

    $('#topic-submit').on('click', function(e){
        e.preventDefault();
        topics.push(
            $('#topic-input').val().trim().toLowerCase()
        );
        $('.button-box').html(makeButtons(topics).html());
    });

});