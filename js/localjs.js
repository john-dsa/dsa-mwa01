/* 
 js to populate item from json
 */
console.log("starting...");
//standard jquery ajax technique to load a json file
var json;
$(document).ready(function () {
    $.ajax({
        type: "GET",
        url: "mockdata.json",
        dataType: "json",
        success: jsonParser
    });
});
//loading json file and parsing..
function jsonParser(data) {
    //all the information into a bigass variable, unsorted
    json = data;

    json.sort(function (a, b) {
        //sort the bigass variable array
        var nameA = a.first_name.toLowerCase(), nameB = b.first_name.toLowerCase();
        if (nameA < nameB) //sort string ascending
            return -1;
        if (nameA > nameB)
            return 1;
        return 0; //default return value (no sorting)
    });
    
    $(json).each(function () {
        //now iterate thru each of the bigass items, create the list items and their pages
        watchers = $(this);
        //build the ul with the list items, 
        $("#movieList").append('<li><a href="#' + this.first_name + '" data-rel="dialog" data-transition="pop">' + this.first_name + " " + this.last_name + '</a></li>');

        //append list items built from the json items as virtual "pages"
        $("#pageBody").append(
                '<div data-role="page" id="' + this.first_name + '">' +
                    '<div data-role="header">' +
                        '<h6>' + this.first_name + " " + this.last_name + '</h6>' +
                    '</div>' +
                    '<div data-role="content">' +
                        '<p> I am currently watching: ' + this.fav_movie +
                        ' <br> from the IP ' + this.ip_address +
                        ' <br> You can get more details from me at <br>' + this.email + '</p>' +
                    '</div>' +
                    '<div data-role="footer">' +
                        '<a href="index.html" data-role="button" data-rel="close" data-theme="c">Back to list</a>' +
                    '</div>' +
                '</div>'
                );
        //initialise the dynamic "pages" - without this they do not appear.
        $.mobile.initializePage();
    });
    //refresh the listview
    $('#movieList').listview().listview('refresh');
}

