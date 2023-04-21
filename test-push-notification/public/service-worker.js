this.addEventListener("install", (event) => {
    event.waitUntil(
      caches
        .open("v1")
        .then((cache) =>
          cache.addAll([
            "/",
            "/index.html",
            "/style.css",
            "/app.js",
            "/image-list.js",
            "/star-wars-logo.jpg",
            "/gallery/",
            "/gallery/bountyHunters.jpg",
            "/gallery/myLittleVader.jpg",
            "/gallery/snowTroopers.jpg",
          ])
        )
    );
  });
  
  globalScope.oninstall = (event) => {
    
  };


  globalScope.addEventListener("activate", (event) => {
    const cacheAllowlist = ["v2"];
  
    event.waitUntil(
      caches.forEach((cache, cacheName) => {
        if (!cacheAllowlist.includes(cacheName)) {
          return caches.delete(cacheName);
        }
      })
    );
  });
  
  globalScope.onactivate = (event) => {
    
  };

  // service-worker.js
addEventListener("message", (event) => {
    // event is an ExtendableMessageEvent object
    console.log(`The client sent me a message: ${event.data}`);
  
    event.source.postMessage("Hi client");
  });
  
  // service-worker.js
self.onmessage = (event) => {
    // event is an ExtendableMessageEvent object
    console.log(`The client sent me a message: ${event.data}`);
  
    event.source.postMessage("Hi client");
  };
  