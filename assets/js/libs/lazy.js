var lazyLoad = {
    timeoutImg: 0,
    timeoutIframe: 0,
    timeoutBg: 0,

    replaceImageAttr: function (el) {
        if (el.length > 0) {
            el.each(function () {
                $(this)
                    .attr("src", $(this).attr("data-src"))
                    .removeClass("__ll-img");
            });
        }
    },

    load: function (blocks, offset, callback) {
        var scrollTop = window.pageYOffset;

        blocks.each(function () {
            var el = $(this);

            if (el.offset().top - offset < window.innerHeight + scrollTop) {
                callback(el);
            }
        });
    },

    img: function (offset) {
        var images = $(".__ll-img");

        if (images.length > 0) {
            if (lazyLoad.timeoutImg) {
                clearTimeout(lazyLoad.timeoutImg);
            }

            lazyLoad.timeoutImg = setTimeout(
                lazyLoad.load(images, offset, function (img) {
                    var i = new Image();
                    img.removeClass("__ll-img");

                    i.onload = function () {
                        img.attr("src", img.attr("data-src"));
                    };

                    i.src = img.data("src");
                }),
                30
            );
        }
    },

    bg: function (offset) {
        var images = $(".__ll-bg");

        if (images.length > 0) {
            if (lazyLoad.timeoutBg) {
                clearTimeout(lazyLoad.timeoutBg);
            }

            var w = $(document).width();

            lazyLoad.timeoutBg = setTimeout(
                lazyLoad.load(images, offset, function (img) {
                    var src = img.attr("data-bg");

                    if (
                        w <= 767 &&
                        img.attr("data-bg-mb") &&
                        img.attr("data-bg-mb") !== ""
                    ) {
                        src = img.attr("data-bg-mb");
                    }

                    if (
                        w > 290 &&
                        w <= 550 &&
                        img.attr("data-bg-sm") &&
                        img.attr("data-bg-sm") !== ""
                    ) {
                        src = img.attr("data-bg-sm");
                    }
                    img.css({ "background-image": src }).removeClass("__ll-bg");
                }),
                30
            );
        }
    },

    iframe: function (offset) {
        var items = $(".__ll-iframe");

        if (items.length > 0) {
            if (lazyLoad.timeoutIframe) {
                clearTimeout(lazyLoad.timeoutIframe);
            }

            lazyLoad.timeoutIframe = setTimeout(
                lazyLoad.load(items, offset, function (item) {
                    item.attr("src", item.attr("data-src")).removeClass(
                        "__ll-iframe"
                    );
                }),
                30
            );
        }
    },
};
