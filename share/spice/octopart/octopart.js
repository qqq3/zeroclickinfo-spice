(function (env) {
    "use strict";
    env.ddg_spice_octopart = function (api_result) {

        if(!api_result || !api_result.results || api_result.results.length === 0) {
            return Spice.failed('octopart');
        }

        var isMobile = $('.is-mobile').length;

        Spice.add({
            id: 'octopart',
            name: 'Parts',
            data: api_result.results,
            signal: 'high',
            meta: {
                itemType: 'Parts',
                sourceName: 'Octopart',
                sourceUrl : 'http://octopart.com/search?q=' + api_result.request.q
            },
            normalize: function(item) {

                item = item.item; // our item object is wrapped in an "item" property

                var img_url = item.images[0].url;

                return {
                    brand: item.manufacturer.name,
                    price: item.avg_price[1] + ' ' + item.avg_price[0].toFixed(2),
                    img: img_url,
                    img_m: img_url,
                    url: item.octopart_url,
                    title: DDG.strip_html(item.mpn).toUpperCase(),
                    heading: DDG.strip_html(item.mpn).toUpperCase(),
                    description: item.short_description,
                    datasheet: item.datasheets[0].url
                };
            },
            templates: {
                group: 'products',
                options: {
                    rating: false,
                    buy: Spice.octopart.buy
                },
                variants: {
                    detail: 'light'
                }
            },
            relevancy: {
                primary: [
                    { required: 'item.short_description' },
                    { required: 'item.detail_url' },
                    { required: 'item.datasheets' },
                    { required: 'item.images' },
                    { required: 'item.avg_price' },
                ],
            }
        });
    };
})(this);