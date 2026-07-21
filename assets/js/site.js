/* Brandon Starkweather — shared site behavior for themed pages.
   Safe on any page: only acts on elements that exist. */
(function(){
  document.documentElement.classList.add('js');
  var reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  // current year
  document.querySelectorAll('[data-year]').forEach(function(el){ el.textContent = new Date().getFullYear(); });

  // mobile nav toggle (themed .site-nav pages)
  var toggle = document.querySelector('.nav-toggle');
  var links = document.querySelector('.site-nav .links');
  if(toggle && links){
    toggle.addEventListener('click', function(){
      var open = links.classList.toggle('open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    links.querySelectorAll('a').forEach(function(a){ a.addEventListener('click', function(){ links.classList.remove('open'); }); });
  }

  // reveal-on-scroll
  var revEls = document.querySelectorAll('.reveal');
  if(revEls.length){
    if(reduce || !('IntersectionObserver' in window)){
      revEls.forEach(function(el){ el.classList.add('in'); });
    } else {
      var ro = new IntersectionObserver(function(entries){
        entries.forEach(function(en){ if(en.isIntersecting){ en.target.classList.add('in'); ro.unobserve(en.target); } });
      }, {threshold:.12, rootMargin:'0px 0px -8% 0px'});
      revEls.forEach(function(el){ ro.observe(el); });
      setTimeout(function(){ revEls.forEach(function(el){ el.classList.add('in'); }); }, 4000); // failsafe
    }
  }
})();
