//install function for call back
//app shell cache
var cacheName = 'shivam-godown-mgmt-v-26';


var filesToCache = ['/',
'/fonts/fontawesome-webfont.woff2',
'/fonts/glyphicons-halflings-regular.woff2',
'/images/banner.jpg',
'/images/dad.jpg',
'/js/bigSlide.js',
'/js/bootstrap.min.js',
'/js/jquery.magnific-popup.js',
'/js/jquery.nicescroll.js',
'/js/modernizr.custom.js',
'/js/scripts.js',
'/js/jquery-2.1.4.min.js',
'/main.html',
'/add_new_product.html',
'/css/blog.css',
'/css/bootstrap.min.css',
'/css/font-awesome.min.css',
'/css/single.css',
'/css/style.css',
'/js/ext_db/babel.min.js',
'/js/ext_db/pouchdb.min.js',
'/js/Shivam_Main.js',
'/js/shivam_store.js'
];

//at the time of install event of service worker we cache all the important assets making the app offline
self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

//update the cache for this change the cache name

self.addEventListener('activate', function(e) {
  console.log('[ServiceWorker] Activate');
  e.waitUntil(
    caches.keys().then(function(keyList) {
      return Promise.all(keyList.map(function(key) {
        if (key !== cacheName &&  key !== cacheData) {
          console.log('[ServiceWorker] Removing old cache', key);
          return caches.delete(key);
        }
      }));
    })
  );
  return self.clients.claim();
});


//now as we have cached the resources , let us serve the request from the web app with the cached assets !
//for doing this we add a fetch event for the service worker which checks for asset name in network request url in cached repository and returns the 
// file if found if not found then sends a actual network request!
self.addEventListener('fetch', function(e) {
  console.log('[ServiceWorker] Fetch', e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    }).catch(function() {
		console.log("not able to fetch:",e.request);
      //return caches.match('/my-blog/fallback.html');
    })
  );
});
