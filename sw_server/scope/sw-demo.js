var FILES = [
 '/scope/img.jpg',
];

var CACHENAME = 'my-cache';
var startTime;

self.addEventListener('activate', event => {
  console.log('active event in service worker');
  event.waitUntil(async function() {
    // Feature-detect
    if (self.registration.navigationPreload) {
      // Enable navigation preloads!
      await self.registration.navigationPreload.enable();
    }
  }());
});

function sendResult(diff) {
  postmsg(diff);
};

self.addEventListener('install', function(event) {
  console.log('install event in service worker');
  event.waitUntil(caches.open(CACHENAME).then(function(cache) {
	startTime = new Date();
    return cache.addAll(FILES).then(r => {
  	  let timeDiff = new Date().getTime() - startTime.getTime();
	    setTimeout(() => {
		    console.log('time diff:', timeDiff);
		    sendResult({result: timeDiff});
	    }, 1000);
      console.log('cache addALl ok');
      return r;
    }).catch( e => {
      console.log('cache addall failed:');
      console.log(e);
    });
  }));
});

function postmsg(msg) {
  clients.matchAll({includeUncontrolled: true}).then((allClients) => {
    for (client of allClients) {
	  client.postMessage(msg);
    }
  });
}

addEventListener('fetch', event => {
  event.respondWith(async function() {
    // Respond from the cache if we can
    const cachedResponse = await caches.match(event.request);
    if (cachedResponse) {
      return cachedResponse; 
    }

    // Else, use the preloaded response, if it's there
    const response = await event.preloadResponse;
    if (response) {
      return response; 
    }
    return fetch(event.request);
  }());
});
