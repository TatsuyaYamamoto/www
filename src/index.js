import 'materialize-css/js/global';
import 'materialize-css/js/cash';
import 'materialize-css/js/parallax';
import 'materialize-css/js/anime.min';
import 'materialize-css/js/scrollspy';

const aboutElement = document.getElementById('about');
new M.ScrollSpy(aboutElement);

const parallaxes = document.querySelectorAll('.parallax');

Array.from(parallaxes).forEach((p) => new M.Parallax(p));

