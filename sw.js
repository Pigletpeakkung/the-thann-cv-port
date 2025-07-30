// Service Worker for Pegearts Portfolio PWA
const CACHE_NAME = 'pegearts-pwa-v1.2.0';
const urlsToCache = [
  '/',
  '/index.html',
  '/site.webmanifest',
  '/offline.html',
  // Icons
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  // External CDN resources (cache for offline)
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css',
  'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css',
  'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600;800&display=swap',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js',
  'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js',
  'https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js',
  'https://unpkg.com/aos@2.3.1/dist/aos.js',
  'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.js',
  'https://unpkg.com/typed.js@2.1.0/dist/typed.umd.js',
  'https://cdnjs.cloudflare.com/ajax/libs/vanilla-tilt/1.8.1/vanilla-tilt.min.js'
];

// Install event - cache resources
self.addEventListener('install', event => {
  console.log('🚀 SW: Installing...');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('📦 SW: Caching app shell');
        return cache.addAll(urlsToCache);
      })
      .catch(error => {
        console.error('❌ SW: Install failed:', error);
      })
  );
  self.skipWaiting(); // Activate immediately
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  console.log('✅ SW: Activating...');
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ SW: Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  self.clients.claim(); // Take control of all pages
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;

  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        if (response) {
          console.log('📦 SW: Serving from cache:', event.request.url);
          return response;
        }
        
        // Clone the request for fetch
        const fetchRequest = event.request.clone();
        
        return fetch(fetchRequest).then(response => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response;
          }
          
          // Clone response for cache
          const responseToCache = response.clone();
          
          // Add to cache for future use
          caches.open(CACHE_NAME)
            .then(cache => {
              cache.put(event.request, responseToCache);
            });
          
          return response;
        }).catch(error => {
          console.log('🌐 SW: Fetch failed, serving offline page:', error);
          
          // Serve offline page for HTML requests
          if (event.request.destination === 'document') {
            return caches.match('/offline.html');
          }
          
          // For other assets, return a basic response or cached version
          return new Response('Offline - Resource not available', {
            status: 503,
            statusText: 'Service Unavailable'
          });
        });
      })
  );
});

// Background sync for form submissions (optional)
self.addEventListener('sync', event => {
  if (event.tag === 'contact-form') {
    console.log('🔄 SW: Background sync - contact form');
    event.waitUntil(submitPendingForms());
  }
});

// Push notifications (optional)
self.addEventListener('push', event => {
  if (!event.data) return;
  
  const options = {
    body: event.data.text(),
    icon: '/icons/icon-192x192.png',
    badge: '/icons/icon-96x96.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View Portfolio',
        icon: '/icons/icon-96x96.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/icons/icon-96x96.png'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Pegearts Portfolio', options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', event => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Helper function for background sync
async function submitPendingForms() {
  // Implementation for offline form submission
  console.log('Submitting pending forms...');
}

// Update notification
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});
