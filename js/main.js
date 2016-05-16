/*global $, console*/
/*jslint plusplus: true */
function Main() {
    "use strict";
    var arrLinks,
        readLinks = $.getJSON("https://raw.githubusercontent.com/chaordic/frontend-intern-challenge/master/Assets/urls.json", function (data) {
            arrLinks = data;
        });
    this.getLinks = function () {
        readLinks.complete(function () {
            console.log(arrLinks);
        });
    };

    /**
     *Method listlinks(), populate list of links in layout
     **/
    this.listLinks = function () {
        readLinks.complete(function () {
            var i;
            for (i = 0; i < 5; i++) {
                var a, span, li;
                a = $("<a></a>").text(arrLinks[i].shortUrl);
                a.attr("href", arrLinks[i].url);
                a.attr("target", "blank");
                span = $("<span></span>").text(arrLinks[i].hits);
                li = $("<li></li>");
                li.addClass("link");
                li.append(a);
                li.append(span);
                $(".top-five ul").append(li);
            }
        });
    };

    /**
     *Method setHits(), sum the first five hits and set on element with name class of .number
     **/
    this.setHits = function () {
        readLinks.complete(function () {
            /*jslint plusplus: true */
            var i, hits = 0;
            for (i = 0; i < 5; i++) {
                hits = hits + arrLinks[i].hits;
            }
            $(".hits .number").text(hits);
        });
    };
}

/**
 *Global scope to application;
 **/
$(document).ready(function () {
    "use strict";
    var d = new Main();
    d.setHits();
    d.listLinks();
});