const CACHE_NAME = "fitness-plan-pixel-v4";
const ASSETS = [
  "./",
  "index.html",
  "manifest.webmanifest",
  "icon-180.png",
  "icon-192.png",
  "icon-512.png",
  "assets/mascot.png",
  "assets/warmup.png",
  "assets/training.png",
  "assets/stretch.png",
  "assets/heart.png",
  "assets/home-icon.png",
  "assets/calendar-icon.png",
  "assets/plan-icon.png",
  "assets/meal-icon.png",
  "assets/food-breakfast.png",
  "assets/food-lunch.png",
  "assets/food-dinner.png",
  "assets/food-bowl.png",
  "assets/dumbbell.png"
];

self.addEventListener("install", event => {
  event.waitUntil(caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS)));
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => Promise.all(keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))))
  );
  self.clients.claim();
});

self.addEventListener("fetch", event => {
  if (event.request.method !== "GET") return;
  event.respondWith(caches.match(event.request).then(cached => cached || fetch(event.request)));
});
