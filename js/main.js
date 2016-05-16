/*global $, console*/
/*jslint plusplus: true */

function Hits(pathParameter) {
    "use strict";
    var arrLinks,
        path = pathParameter,
        readLinks = $.getJSON(path, function (data) {
            arrLinks = data;
        });
    this.getLinks = function () {
        readLinks.complete(function () {
            console.log(arrLinks);
        });
    };

    this.setPathUrls = function (pathParameter) {
        path = pathParameter;
    };

    /**
     *Method listlinks(), populate list of links in layout
     **/
    this.listLinks = function () {
        readLinks.complete(function () {
            var i, a, span, li;
            for (i = 0; i < 5; i++) {
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

function UrlMinify() {
    "use strict";

    /**
     *Method of copy stating of input[type=text]
     **/
    function copyToClipboard() {
        console.log("aqui no copy");
        var $temp = $("<input>");
        $("body").append($temp);
        $temp.val($("input[type=text]").val()).select();
        document.execCommand("copy");
        $temp.remove();
    }

    this.minifyUrl = function (url) {
        $("input[type=button]").click(function () {
            if ($("input[type=button]").val() === "ENCURTAR") {
                $.getJSON("http://is.gd/create.php?callback=?", {
                    url: $("input[type=text]").val(),
                    format: "json"
                }).done(function (data) {
                    $("input[type=text]").val(data.shorturl);
                    $("input[type=button]").val("COPIAR");
                });
            } else {
                console.log($("input[type=button]").val());
                var cop = $("input[type=text]").val();
                copyToClipboard();
                $("input[type=button]").val("ENCURTAR");
                $("input[type=text]").val("");
            }
        });
    };
}

/**
 *Global scope to application;
 **/
$(document).ready(function () {
    "use strict";
    var hits = new Hits("https://raw.githubusercontent.com/chaordic/frontend-intern-challenge/master/Assets/urls.json");
    hits.setHits();
    hits.listLinks();
    var urlMin = new UrlMinify();
    urlMin.minifyUrl("https://www.google.com.br");
});