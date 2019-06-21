const CACHE_NAME = "firstpwa";
var urlsToCache = [
  "/",
  "/first-pwa",
  "/first-pwa/nav.html",
  "/first-pwa/index.html",
  "/first-pwa/pages/home.html",
  "/first-pwa/pages/about.html",
  "/first-pwa/pages/contact.html",
  "/first-pwa/css/materialize.min.css",
  "/first-pwa/js/materialize.min.js",
  "/first-pwa/js/nav.js"
];

self.addEventListener("install", function(event) {
  event.waitUntil(
    caches.open(CACHE_NAME).then(function(cache) {
      return cache.addAll(urlsToCache);
    })
  );
});
