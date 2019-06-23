const CACHE_NAME = "mostdpage";
var urlsToCache = [
  "/",
  "/nav.html",
  "/index.html",
  "/manifest.json",
  "/css/materialize.min.css",
  "/img/android-chrome-192x192.png",
  "/img/android-chrome-512x512.png",
  "/img/mostdigital.png",
  "/img/sofyanthayf.jpg",
  "/js/materialize.min.js",
  "/js/nav.js",
  "/pages/home.html",
  "/pages/team.html",
  "/pages/contact.html"
  "/pages/labs.html"
  "/pages/class.html"
  "/pages/links.html"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});

self.addEventListener("fetch", function(event) {
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
