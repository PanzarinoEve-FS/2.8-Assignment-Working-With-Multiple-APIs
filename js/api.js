/*
Eve Panzarino (jhankins)
2.8 - Working With Multiple APIs

api.js  --  the two API sources, as reusable functions.

  API 1: nekos.best        -> the date's portrait image      (no key needed)
  API 2: API Ninjas Quotes -> the date's "message" (a quote) (KEY required)

The two are Chained: the quote we ask for depends on the image we got back.
*/

import { API_NINJAS_KEY } from "./config.js";

/*
 API 1 - nekos.best (no key needed => no authentication)
*/
export function fetchDate(category) {
    return fetch("https://nekos.best/api/v2/" + category)
        .then(function (response) {
            if (!response.ok) {
                throw new Error("nekos.best request failed (" + response.status + ")");
            }
            return response.json();
        })
        .then(function (data) {
            const result = data.results[0];
            return {
                category: category,
                imageUrl: result.url,
                artist: result.artist_name,
                source: result.source_url
            };
        });
}

/*
 API 2 -- API Ninjas Quotes (needs the X-Api-Key header => authentication)

 This call is DEPENDENT on API 1: it takes the `date` object we got back from
 nekos.best and stamps the returned quote with that date's identity (its
 category + portrait artist). So API 2's result is built from API 1's response.
*/
export function fetchQuote(date) {
    return fetch("https://api.api-ninjas.com/v1/quotes", {
        headers: { "X-Api-Key": API_NINJAS_KEY }
    })
        .then(function (response) {
            if (!response.ok) {
                throw new Error("API Ninjas request failed (" + response.status + ")");
            }
            return response.json();
        })
        .then(function (data) {
            if (!data || data.length === 0) {
                throw new Error("API Ninjas returned no quote");
            }
            return {
                text: data[0].quote,
                author: data[0].author,
                // Carried over from API 1's response > the two are chained & dependent.
                category: date.category,
                dateArtist: date.artist
            };
        });
}
