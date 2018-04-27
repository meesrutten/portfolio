import initialAnimation from './initialAnimation';
// import hoverPerspectiveAnimation from './hoverPerspectiveAnimation';
import backgroundAnimation from './backgroundAnimation';
import './cardAnimation';
import servicehandler from './sw-handler';

// backgroundAnimation();
// initialAnimation()

const links = document.querySelectorAll('a');
links.forEach( (link) => {
	if (link.textContent === '') {
		link.style = "display: none;"
	}
})
// 	localStorage.setItem('visited', true);
// }

// if (document.querySelectorAll('#black_stripe')[0]) {
// 	detailPageAnimation();
// }

// hoverPerspectiveAnimation();

