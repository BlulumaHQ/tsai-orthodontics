// Google Analytics 4 — Tsai Orthodontics (property owned by the clinic).
// Loads only on the production domain so preview/concept hosts never send data.
export const GA_MEASUREMENT_ID = "G-Y4PPGM3F7G";
export const GA_PRODUCTION_HOSTS = ["tsaiorthodontics.ca", "www.tsaiorthodontics.ca"];

type Gtag = (...args: unknown[]) => void;

export function trackEvent(name: string, params: Record<string, string | number> = {}) {
  if (typeof window === "undefined") return;
  const gtag = (window as unknown as { gtag?: Gtag }).gtag;
  if (typeof gtag === "function") gtag("event", name, params);
}

// Inline bootstrap: gtag.js + delegated click tracking for phone and map links.
// Never sends form contents or any personal data.
export const gaBootstrapScript = `(function(){
  var hosts = ${JSON.stringify(GA_PRODUCTION_HOSTS)};
  if (hosts.indexOf(location.hostname) === -1) return;
  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}';
  document.head.appendChild(s);
  window.dataLayer = window.dataLayer || [];
  window.gtag = function(){ dataLayer.push(arguments); };
  gtag('js', new Date());
  gtag('config', '${GA_MEASUREMENT_ID}');
  document.addEventListener('click', function(e){
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var where = location.pathname;
    if (href.indexOf('tel:') === 0) {
      gtag('event', 'phone_call_click', { link_location: where });
    } else if (/google\\.[a-z.]+\\/maps|maps\\.app\\.goo\\.gl|goo\\.gl\\/maps/.test(href)) {
      gtag('event', 'directions_click', { link_location: where });
    }
  }, true);
})();`;
