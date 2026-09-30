import './theme-toggle.js';
import './burger.js';

// load if elements exist on page
if (document.querySelector('.carousel')) import('./carousel.js');
if (document.querySelector('.work-list')) import('./parse-works.js');
