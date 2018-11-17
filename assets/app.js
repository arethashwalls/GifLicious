var key = 'YO1V30OsrDmHaofembwPUeRHKrS1WYDB';
var topic = 'cat';
var queryUrl = 'https://api.giphy.com/v1/gifs/search?api_key=' + key + '&q=' + topic + '&limit=10';

var display = document.getElementById('display');


var xhr = new XMLHttpRequest();

xhr.onload = function () {
    if (xhr.status >= 200 && xhr.status < 300) {
        console.log('success!', xhr);
        var source = JSON.parse(xhr.response).data[0].images.original_still.url;
        display.innerHTML = '<img src="' + source + '" />';
        console.log(source);
    } else {
        console.log('The request failed!');
    }
}

xhr.open('GET', queryUrl);
xhr.send();




//document.getElementById('display').innerHTML('<img src=' + '>')