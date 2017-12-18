import 'materialize-css/js/global';
import 'materialize-css/js/cash';
import 'materialize-css/js/parallax';

const parallaxes = document.querySelectorAll('.parallax');

Array.from(parallaxes).forEach((p) => new M.Parallax(p));
