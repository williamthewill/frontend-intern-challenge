function Main() {

    var arrLinks;

    readLinks = $.getJSON("../Assets/urls.json", function () {
            console.log("success");
        })
        .done(function (data) {
            arrLinks = data;
        })
        .fail(function () {
            console.log("error");
        })

    // Set another completion function for the request above
    this.getArrLinks = function () {
        readLinks.complete(function () {
            console.log(arrLinks);
        });
    }

    this.setHits = function () {
        readLinks.complete(function () {
            var hits = 0;
            for (i = 0; i < 5; i++) {
                console.log(arrLinks[i]);
                hits = hits + arrLinks[i].hits;
            }
            $(".number").text(hits);
        });
    }
    this.listLinks = function () {
        readLinks.complete(function () {
            for (i = 0; i < 5; i++) {
                var a = $("<a></a>").text(arrLinks[i].shortUrl);
                a.attr("href", arrLinks[i].url);
                a.attr("target", "blank");
                var span = $("<span></span>").text(arrLinks[i].hits);
                var li = $("<li></li>");
                li.addClass("link");
                li.append(a);
                li.append(span);
                $(".top-five ul").append(li);
            }
        });
    }
}

$(document).ready(function () {
    var d = new Main();
    d.setHits();
    d.listLinks();
});