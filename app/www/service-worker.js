if (location.host != 'localhost:8100') {
  var workbox = new Worker('workbox-sw.js');
  inciar()
} else {
  importScripts('workbox-sw.js');
  inciar()
}

function inciar() {

  workbox.setConfig({
    debug: false
  });
  workbox.core.setLogLevel(workbox.core.LOG_LEVELS.silent);

  workbox.core.setCacheNameDetails({
    prefix: 'GATE'
  });

  workbox.precaching.precacheAndRoute([
    './build/main.js',
    './build/main.css',
    "js/controllers/tutorialController.js",
    "js/controllers/asistenciaController.js",
    "js/controllers/ayudaController.js",
    "js/controllers/inicioController.js",
    "js/controllers/inscripcionController.js",
    "js/controllers/loginController.js",
    "js/controllers/miembroController.js",
    "js/controllers/usuarioController.js",
    "js/controllers/publicacionController.js",
    "js/controllers/reportesController.js",
    "js/controllers/seccionController.js",
    "js/controllers/sidemenuController.js"
  ]);

  workbox.routing.registerRoute(
    /\.(?:js|css)$/,
    workbox.strategies.staleWhileRevalidate(),
  ); 

  workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif)/,
    workbox.strategies.cacheFirst({
      cacheName: 'imagenes-cache',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
          maxAgeSeconds: 7 * 24 * 60 * 60,
        })
      ],
    })
  );

  workbox.routing.registerRoute(
    'https://use.fontawesome.com/releases/v5.0.0/js/all.js',
    workbox.strategies.staleWhileRevalidate(),
  );

  workbox.routing.registerRoute(
    new RegExp('https://fonts.(?:googleapis|gstatic).com/(.*)'),
    workbox.strategies.cacheFirst({
      cacheName: 'googleapis',
      plugins: [
        new workbox.expiration.Plugin({
          maxEntries: 30,
        }),
      ],
    }),
  );

  workbox.routing.registerRoute(
    /.*(?:googleapis|gstatic)\.com.*$/,
    workbox.strategies.staleWhileRevalidate(),
  );

  workbox.googleAnalytics.initialize();

}
