/*
========================================
MOONLIT PORTFOLIO - SERVICE WORKER
========================================
*/

const CACHE_NAME = 'moonlit-portfolio-v1.2.0';
const STATIC_CACHE = `${CACHE_NAME}-static`;
const DYNAMIC_CACHE = `${CACHE_NAME}-dynamic`;
const IMAGE_CACHE = `${CACHE_NAME}-images`;

// Files to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  
  // CSS Files
  '/src/styles/main.css',
  '/src/styles/variables.css',
  '/src/styles/components/hero.css',
  '/src/styles/components/navigation.css',
  
  // JavaScript Files
  '/src/scripts/main.js',
  '/src/scripts/app.js',
  '/src/scripts/components/navigation.js',
  '/src/scripts/components/hero.js',
  '/src/scripts/utilities/dom.js',
  
  // Fonts
  '/assets/fonts/inter-variable.woff2',
  '/assets/fonts/inter-regular.woff2',
  '/assets/fonts/inter-medium.woff2',
  '/assets/fonts/inter-bold.woff2',
  
  // Essential Images
  '/assets/images/icons/icon-192x192.png',
  '/assets/images/icons/icon-512x512.png',
  '/assets/images/hero/moon.svg',
  
  // Data Files
  '/data/projects.json',
  '/data/skills.json',
  
  // Fallback Pages
  '/offline.html'
];

// Images that can be cached dynamically
const IMAGE_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.svg', '.gif'];

// API endpoints that should be cached
const API_CACHE_PATTERNS = [
  /\/data\//,
  /\/api\//
];

/*
========================================
SERVICE WORKER EVENTS
========================================
*/

// Install Event - Cache Static Assets
self.addEventListener('install', (event) => {
  console.log('🔧 Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => {
        console.log('📦 Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('✅ Service Worker: Static assets cached successfully');
        // Skip waiting to activate immediately
        return self.skipWaiting();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Failed to cache static assets:', error);
      })
  );
});

// Activate Event - Clean Up Old Caches
self.addEventListener('activate', (event) => {
  console.log('🚀 Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((name) => {
              // Remove old versions of our caches
              return name.startsWith('moonlit-portfolio-') && 
                     name !== STATIC_CACHE && 
                     name !== DYNAMIC_CACHE && 
                     name !== IMAGE_CACHE;
            })
            .map((name) => {
              console.log(`🗑️ Service Worker: Deleting old cache: ${name}`);
              return caches.delete(name);
            })
        );
      })
      .then(() => {
        console.log('✅ Service Worker: Cache cleanup complete');
        // Take control of all pages immediately
        return self.clients.claim();
      })
      .catch((error) => {
        console.error('❌ Service Worker: Cache cleanup failed:', error);
      })
  );
});

// Fetch Event - Network Strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests and chrome-extension requests
  if (request.method !== 'GET' || url.protocol === 'chrome-extension:') {
    return;
  }
  
  // Handle different types of requests with appropriate strategies
  if (isStaticAsset(request)) {
    event.respondWith(cacheFirstStrategy(request, STATIC_CACHE));
  } else if (isImage(request)) {
    event.respondWith(cacheFirstStrategy(request, IMAGE_CACHE));
  } else if (isAPIRequest(request)) {
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
  } else if (isNavigationRequest(request)) {
    event.respondWith(navigationStrategy(request));
  } else {
    event.respondWith(networkFirstStrategy(request, DYNAMIC_CACHE));
  }
});

// Background Sync for Contact Form
self.addEventListener('sync', (event) => {
  if (event.tag === 'contact-form-sync') {
    console.log('🔄 Service Worker: Syncing contact form submissions');
    event.waitUntil(syncContactFormSubmissions());
  }
});

// Push Notifications (if implemented)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/assets/images/icons/icon-192x192.png',
      badge: '/assets/images/icons/icon-72x72.png',
      tag: data.tag || 'default',
      requireInteraction: true,
      actions: data.actions || []
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Notification Click Handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'view') {
    event.waitUntil(
      clients.openWindow(event.notification.data.url || '/')
    );
  }
});

/*
========================================
CACHING STRATEGIES
========================================
*/

// Cache First Strategy - For static assets
async function cacheFirstStrategy(request, cacheName) {
  try {
    const cachedResponse = await caches.match(request);
    
    if (cachedResponse) {
      // Update cache in background
      updateCacheInBackground(request, cacheName);
      return cachedResponse;
    }
    
    // Not in cache, fetch from network
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.error('Cache First Strategy failed:', error);
    
    // Try to return cached version as fallback
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback if available
    if (isNavigationRequest(request)) {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Network First Strategy - For dynamic content
async function networkFirstStrategy(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    console.log('Network failed, trying cache:', request.url);
    
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback for navigation requests
    if (isNavigationRequest(request)) {
      return caches.match('/offline.html');
    }
    
    throw error;
  }
}

// Navigation Strategy - For HTML pages
async function navigationStrategy(request) {
  try {
    // Try network first for navigation requests
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(DYNAMIC_CACHE);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Try cached version
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return offline fallback
    return caches.match('/offline.html');
  }
}

// Update cache in background without blocking response
async function updateCacheInBackground(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse && networkResponse.status === 200) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
      console.log('🔄 Background cache update:', request.url);
    }
  } catch (error) {
    console.log('Background update failed:', error);
  }
}

/*
========================================
HELPER FUNCTIONS
========================================
*/

// Check if request is for a static asset
function isStaticAsset(request) {
  const url = new URL(request.url);
  return STATIC_ASSETS.includes(url.pathname) || 
         url.pathname.startsWith('/src/') ||
         url.pathname.startsWith('/assets/fonts/');
}

// Check if request is for an image
function isImage(request) {
  const url = new URL(request.url);
  return IMAGE_EXTENSIONS.some(ext => url.pathname.toLowerCase().includes(ext));
}

// Check if request is for API data
function isAPIRequest(request) {
  const url = new URL(request.url);
  return API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname));
}

// Check if request is a navigation request
function isNavigationRequest(request) {
  return request.mode === 'navigate' || 
         (request.method === 'GET' && request.headers.get('accept').includes('text/html'));
}

/*
========================================
BACKGROUND SYNC FUNCTIONS
========================================
*/

// Sync contact form submissions when back online
async function syncContactFormSubmissions() {
  try {
    const db = await openDB();
    const submissions = await getAllPendingSubmissions(db);
    
    for (const submission of submissions) {
      try {
        const response = await fetch('/api/contact', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(submission.data)
        });
        
        if (response.ok) {
          await deletePendingSubmission(db, submission.id);
          console.log('✅ Contact form submission synced');
        }
      } catch (error) {
        console.error('Failed to sync submission:', error);
      }
    }
  } catch (error) {
    console.error('Background sync failed:', error);
  }
}

// IndexedDB helpers for background sync
function openDB() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open('moonlit-portfolio', 1);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
    
    request.onupgradeneeded = (event) => {
      const db = event.target.result;
      if (!db.objectStoreNames.contains('contact-submissions')) {
        db.createObjectStore('contact-submissions', { 
          keyPath: 'id', 
          autoIncrement: true 
        });
      }
    };
  });
}

async function getAllPendingSubmissions(db) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['contact-submissions'], 'readonly');
    const store = transaction.objectStore('contact-submissions');
    const request = store.getAll();
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve(request.result);
  });
}

async function deletePendingSubmission(db, id) {
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(['contact-submissions'], 'readwrite');
    const store = transaction.objectStore('contact-submissions');
    const request = store.delete(id);
    
    request.onerror = () => reject(request.error);
    request.onsuccess = () => resolve();
  });
}

/*
========================================
PERIODIC BACKGROUND SYNC
========================================
*/

// Clean up old caches periodically
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'cache-cleanup') {
    event.waitUntil(performCacheCleanup());
  }
});

async function performCacheCleanup() {
  try {
    const cacheNames = await caches.keys();
    const now = Date.now();
    const maxAge = 7 * 24 * 60 * 60 * 1000; // 7 days
    
    for (const cacheName of cacheNames) {
      const cache = await caches.open(cacheName);
      const requests = await cache.keys();
      
      for (const request of requests) {
        const response = await cache.match(request);
        if (response) {
          const dateHeader = response.headers.get('date');
          if (dateHeader) {
            const responseDate = new Date(dateHeader).getTime();
            if (now - responseDate > maxAge) {
              await cache.delete(request);
              console.log(`🗑️ Cleaned up old cache entry: ${request.url}`);
            }
          }
        }
      }
    }
  } catch (error) {
    console.error('Cache cleanup failed:', error);
  }
}

console.log('🌙 Moonlit Portfolio Service Worker loaded successfully');
