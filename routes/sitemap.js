const express = require('express')
const router = express.Router()

const js2xmlparser = require('js2xmlparser')
const moment = require('moment')

/**
 * It generates a standard sitemap.xml for SEO purposes
 */
router.get("/", function(req, res, next) {
    try {
        //our records to index
        const records = getRecordsFromDataSource();
        const collection = [];
        let today = moment();
        today = today.format("YYYY-MM-DD");
        //add site root url
        const rootUrl = {};
        rootUrl.loc = "https://bankstour.com/";
        rootUrl.lastmod = today;
        rootUrl.changefreq = "daily";
        rootUrl.priority = "1.0";
        // rootUrl["image:image"] = {
        //     "image:loc": "s://banksua.herokuapp.com/default-image.jpg",
        //     "image:caption":
        //         "javaniceday.com. Software development blog. Java, Node JS, Salesforce among other technologies",
        // };
        collection.push(rootUrl);

        //add recipes urls
        for (let i = 0; i < records.length; i++) {
            const url = {};
            url.loc = records[i].url;
            url.lastmod = records[i].updated_at;
            // url["image:image"] = {
            //     "image:loc": records[i].featured_image_url,
            //     "image:caption": records[i].description,
            // };

            collection.push(url);
        }
        const col = {
            "@": {
                xmlns: "http://www.sitemaps.org/schemas/sitemap/0.9",
                "xmlns:image": "http://www.google.com/schemas/sitemap-image/1.1",
            },
            url: collection,
        };
        const xml = js2xmlparser.parse("urlset", col);
        res.set("Content-Type", "text/xml");
        res.status(200);
        res.send(xml);
    } catch (e) {
        next(e);
    }
});

/**
 * @return a collection to index (typically we'll get these records from our database)
 */
function getRecordsFromDataSource() {
    //these records will have our own structure, we return as they are and later we convert them to the xml standard format
    //so let's just define two records hard-coded

    const record1 = {
        url: "https://bankstour.com/banks",
        description: "Перелік банків України",
        // featured_image_url: "https://banksua.herokuapp.com/B.jpeg",
        updated_at: "2020-12-01",
    };
    return [record1];
}

module.exports = router