const CACHE_NAME = "mostdpage";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/article.html",
  "/manifest.json",
  "/css/materialize.min.css",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/js/api.js",
  "/pages/home.html",
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
  var base_url = "https://readerapi.codepolitan.com/";

  if (event.request.url.indexOf(base_url) > -1) {
    event.respondWith(
      caches
      .match(event.request, { cacheName: CACHE_NAME })
      .then(function(response) {
        if (response) {
          console.log("ServiceWorker: Gunakan aset dari cache: ", response.url);
          return response;
        }

        console.log(
          "ServiceWorker: Memuat aset dari server: ",
          event.request.url
        );
        return fetch(event.request);
      })
    );
  } else {
    event.respondWith(
        caches.match(event.request, { ignoreSearch: true }).then(function(response) {
            return response || fetch (event.request);
        })
    )
  }
});


self.addEventListener("activate", function(event) {
  event.waitUntil(
    caches.keys().then(function(cacheNames) {
      return Promise.all(
        cacheNames.map(function(cacheName) {
          if (cacheName != CACHE_NAME) {
            console.log("ServiceWorker: cache " + cacheName + " dihapus");
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
