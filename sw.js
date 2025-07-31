// Service Worker for Pegearts Portfolio
// Version 1.0.0

const CACHE_NAME = 'pegearts-v1.0.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/css/styles.css',
  '/js/main.js',
  '/favicon.ico',
  '/apple-touch-icon.png',
  '/favicon-32x32.png',
  '/favicon-16x16.png',
  '/images/og-image.jpg',
  '/images/twitter-image.jpg',
  '/images/profile-photo.jpg',
  // External resources
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://unpkg.com/aos@2.3.1/dist/aos.css',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
  'https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js',
  'https://cdn.jsdelivr.net/particles.js/2.0.0/particles.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.js'
];

// Install Service Worker
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching files');
        return cache.addAll(urlsToCache);
      })
      .then(() => {
        console.log('Service Worker: Installation complete');
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('Service Worker: Installation failed', error);
      })
  );
});

// Activate Service Worker
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('Service Worker: Deleting old cache', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('Service Worker: Activation complete');
      return self.clients.claim();
    })
  );
});

// Fetch Event - Cache First Strategy
self.addEventListener('fetch', (event) => {
  // Skip cross-origin requests that we don't want to cache
  if (!event.request.url.startsWith(self.location.origin) && 
      !event.request.url.startsWith('https://cdn.') &&
      !event.request.url.startsWith('https://cdnjs.') &&
      !event.request.url.startsWith('https://unpkg.') &&
      !event.request.url.startsWith('https://fonts.')) {
    return;
  }

  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        if (response) {
          console.log('Service Worker: Serving from cache', event.request.url);
          return response;
        }
        
        console.log('Service Worker: Fetching from network', event.request.url);
        return fetch(event.request)
          .then((response) => {
            if (!response || response.status !== 200 || response.type !== 'basic') {
              return response;
            }

            const responseToCache = response.clone();
            
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache);
              });

            return response;
          })
          .catch((error) => {
            console.error('Service Worker: Fetch failed', error);
            if (event.request.destination === 'document') {
              return caches.match('/offline.html');
            }
          });
      })
  );
});

// Background Sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

// Push Notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New update available!',
    icon: '/favicon-32x32.png',
    badge: '/favicon-16x16.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/favicon-16x16.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon-16x16.png'
      }
    ]
  };

  event.waitUntil(
    self.registration.showNotification('Pegearts Portfolio', options)
  );
});

// Notification Click
self.addEventListener('notificationclick', (event) => {
  console.log('Notification click received.');
  
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('https://pegearts.com')
    );
  }
});

async function syncContactForm() {
  try {
    const formData = await getStoredFormData();
    if (formData) {
      const response = await fetch
