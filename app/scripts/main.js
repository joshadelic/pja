/**
 * parses any RSS/XML feed through Google and returns JSON data
 * source: http://stackoverflow.com/a/6271906/477958
 */
var parseRSS = function(url, container) {
    $.ajax({
        url: document.location.protocol + '//ajax.googleapis.com/ajax/services/feed/load?v=1.0&num=5&callback=?&q=' + encodeURIComponent(url),
        dataType: 'json',
        success: function(data) {
            //console.log(data.responseData.feed);
            $(container).html('<div class="panel panel-default"><h2>' + data.responseData.feed.title + '</h2><p>' + data.responseData.feed.description + '</p></div>');

            $.each(data.responseData.feed.entries, function(key, val) {
                if (key === 0) {
                    var that = '<h3><a href="' + val.link + '" target="_blank">' + val.title + '</a></h3><p>' + val.contentSnippet + '</p>';
                    $(container).append(that);

                } else {
                    that = '<div class="list-group-item"><a href="' + val.link + '" target="_blank">' + val.title + '</a></div>';
                    $(container).append(that);
                }
            });
        }
    });
};

$(document).ready(function() {

    // Carousel
    $('.carousel-thumb-nav > li > a').click(function() {

        var item = Number($(this).attr('href').substring(1));

        $('#feed-carousel').carousel(item - 1);
        $('.carousel-thumb-nav .active').removeClass('active');
        $(this).parent().addClass('active');

        return false;
    });

    $('#feed-carousel').on('slid.bs.carousel', function() {

        $('.carousel-thumb-nav .active').removeClass('active');

        var i = $('#feed-carousel .item.active').index();

        $('.carousel-thumb-nav li:eq(' + i + ')').addClass('active');
    });

    parseRSS('http://feeds.mashable.com/Mashable', '#mashable');
    parseRSS('http://feeds2.feedburner.com/ProgrammableWeb', '#ProgrammableWeb');
    parseRSS('http://feeds.theonion.com/theonion/daily', '#onion');
    parseRSS('http://blog.boston-baby-photos.com/feed/', '#boston-baby-photos');
    parseRSS('http://partofthecourse.tumblr.com/rss', '#evanmcd');
    parseRSS('http://feeds.feedburner.com/readwriteweb', '#readwriteweb');
    parseRSS('http://processwire.com/talk/rss/forums/1-processwire-forum-latest-posts/', '#processwire');

});
