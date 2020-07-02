const STATIC_CACHE = "static-cache-v9";

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches
      .open(STATIC_CACHE)
      .then((cache) =>
        cache.addAll([
          "/",
          "/scripts/index.js",
          "/scripts/libs/TweenMax.min.js",
          "/scripts/libs/barba.min.js",
          "/scripts/libs/TimelineMax.min.js",
          "/images/mees.jpg",
          "/images/magic-lib.png",
          "/images/navvy.png",
          "/images/timeline-of-artists.png",
          "/images/globe.png",
          "/images/moe-open.png",
          "/images/GitHub-Mark-64px.png",
          "/styles/main.css",
        ])
      )
      .then(self.skipWaiting())
      .catch((e) => {
        console.log(e);
      })
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => toPageCache(event.request, response))
        .catch(() => fromPageCache(event.request))
    );
  } else {
    event.respondWith(
      fetch(event.request).catch(() => fromPageCache(event.request))
    );
  }
});

function fromPageCache(request) {
  return caches
    .open(STATIC_CACHE)
    .then((cache) => cache.match(request))
    .then((response) => (response ? response : Promise.reject()))
    .catch((e) => {
      console.log(e);
    });
}

function toPageCache(request, response) {
  const clone = response.clone();
  caches
    .open(STATIC_CACHE)
    .then((cache) => cache.put(request, clone))
    .catch((e) => {
      console.log(e);
    });

  return response;
}
