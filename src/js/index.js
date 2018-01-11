import 'materialize-css/js/global';
import 'materialize-css/js/cash';
import 'materialize-css/js/parallax';
import 'materialize-css/js/anime.min';
import 'materialize-css/js/scrollspy';
import 'materialize-css/js/sidenav';

const aboutElement = document.getElementById('about');
new M.ScrollSpy(aboutElement);

const sidenav = document.querySelector('.sidenav');
new M.Sidenav(sidenav);

const parallaxes = document.querySelectorAll('.parallax');

Array.from(parallaxes).forEach((p) => new M.Parallax(p));

