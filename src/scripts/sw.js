import "regenerator-runtime";
import cacheHelper from "./utils/cache-helper";


const assetsToCache = [
    "./",
    "./icons/icon-72x72.png",
    "./icons/icon-96x96.png",
    "./icons/icon-128x128.png",
    "./icons/icon-144x144.png",
    "./icons/icon-152x152.png",
    "./icons/icon-192x192.png",
    "./icons/icon-384x384.png",
    "./icons/icon-512x512.png",
    "./images/heros/hero-image_2.jpg",
    "./images/heros/hero-image_2-small.jpg",
    "./images/heros/hero-image_2-large.jpg",
    "./Daffa_Habibullah--PP.jpg",
    "./index.html",
    "./app.bundle.js",
    "./app.webmanifest",
    "./sw.bundle.js",
];


self.addEventListener("install", (event) => {
    event.waitUntil(cacheHelper.cachingAppShell([...assetsToCache]));
});

self.addEventListener("activate", (event) => {
    event.waitUntil(cacheHelper.deleteOldCache());
});

self.addEventListener("fetch", (event) => {
    event.respondWith(cacheHelper.revalidateCache(event.request));
});
