(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

var _initialAnimation = require('./initialAnimation');

var _initialAnimation2 = _interopRequireDefault(_initialAnimation);

var _backgroundAnimation = require('./backgroundAnimation');

var _backgroundAnimation2 = _interopRequireDefault(_backgroundAnimation);

require('./cardAnimation');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import servicehandler from './sw-handler';

// backgroundAnimation();
// initialAnimation()

// import hoverPerspectiveAnimation from './hoverPerspectiveAnimation';
var links = document.querySelectorAll('a');
links.forEach(function (link) {
	if (link.textContent === '') {
		link.style = "display: none;";
	}
});
// 	localStorage.setItem('visited', true);
// }

// if (document.querySelectorAll('#black_stripe')[0]) {
// 	detailPageAnimation();
// }

// hoverPerspectiveAnimation();

},{"./backgroundAnimation":2,"./cardAnimation":3,"./initialAnimation":6}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
var backgroundAnimation = function backgroundAnimation() {
	/*
 * Creates a background with 5 rectangles that rotate, 
 * scale and change in color intensity
 */
	var polygonBackground = document.querySelector('.background');

	// if (polygonBackground.querySelectorAll('svg')[0]){
	// 	polygonBackground.querySelectorAll('svg')[0].remove()
	// }

	polygonBackground.innerHTML = generatePolygonBackground();

	function generatePolygonBackground() {
		var WIDTH = window.innerWidth;
		var HEIGHT = window.innerHeight;
		var halfWidth = WIDTH / 2;
		var halfHeight = HEIGHT / 2;
		var rectWidth = WIDTH * .5;
		var rectHeight = HEIGHT * .5;
		return '\n\t\t\t\t<svg id="polygonHolder" viewBox="0 0 ' + WIDTH + ' ' + HEIGHT + '" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg" role="presentation">\n\t\t\t\t\t<rect x="' + -halfWidth / 2 + '" y="0" width="' + rectWidth + '" height="' + rectHeight + '" role="presentation"/>\n\t\t\t\t\t<rect x="' + halfWidth + '" y="0" width="' + rectWidth + '" height="' + rectHeight + '" role="presentation"/>\n\t\t\t\t\t<rect x="' + -halfHeight / 2 + '" y="' + -halfWidth / 2 + '" width="' + rectWidth + '" height="' + rectHeight + '" role="presentation"/>\n\t\t\t\t\t<rect x="' + halfHeight * 2 + '" y="' + -halfHeight / 2 + '" width="' + rectWidth + '" height="' + rectHeight + '" role="presentation"/>\n\t\t\t\t</svg>\n\t\t';
	}
	// 	<rect x="${halfHeight * 2}" y="${halfHeight * 2}" width="${rectWidth}" height="${rectHeight}"/>

	var allPolygons = document.querySelectorAll('.background #polygonHolder rect');

	/**
  * Returns a random number between min and max
  * 
  * @param {Number} min 
  * @param {Number} max 
  * @returns {Number}
  */
	function getRandomArbitrary(min, max) {
		return Math.random() * (max - min) + min;
	}

	/**
  * Animate DOM elements to a new rotation and scale.
  * 
  * @param {Number} timestamp 
  */
	var start = null;
	var step = 0;
	var animationTime = 12; //24

	// for (let i = 0; i < allPolygons.length; i++) {
	// 	allPolygons[i].style = `
	// 		opacity: ${getRandomArbitrary(0.05, 0.08).toFixed(2)};
	// 		transform: rotate(${Math.round(getRandomArbitrary(15, 80))}deg) scale(${getRandomArbitrary(.75, 1.2).toFixed(2)});
	// 		`
	// }
	for (var i = 0; i < allPolygons.length; i++) {
		allPolygons[i].style = '\n\t\t\ttransform: rotate(' + Math.round(getRandomArbitrary(15, 80)) + 'deg) scale(' + getRandomArbitrary(.75, 1.2).toFixed(2) + ');\n\t\t\t';
	}

	// for (let i = 0; i < allPolygons.length; i++) {
	// 	TweenMax.to(allPolygons[i], animationTime, {
	// 		rotation: `${(45 + Math.round(getRandomArbitrary(-80, 80)))}deg`,
	// 		scale: getRandomArbitrary(.75, 1.2).toFixed(2),
	// 		transformOrigin: 'center',
	// 		repeat: -1,
	// 		yoyo: true
	// 	})
	// }
	// function animatePolygonBackground(timestamp) {
	// 	if (!start) start = timestamp;
	// 	var progress = timestamp - start;
	// 	if (progress > step * animationTime) {
	// 		for (let i = 0; i < allPolygons.length; i++) {
	// 			allPolygons[i].style = `
	// 				transition-duration: ${animationTime}ms;
	// 				opacity: ${getRandomArbitrary(0.05, 0.08).toFixed(2)};
	// 				transform: rotate(${Math.round(getRandomArbitrary(15, 80))}deg) scale(${getRandomArbitrary(.75, 1.2).toFixed(2)});
	// 				`
	// 		}
	// 		step++
	// 	}

	// 	window.requestAnimationFrame(animatePolygonBackground)
	// }

	// window.requestAnimationFrame(animatePolygonBackground)
	/**
  * Remove the background and re-add
  * 
  * @param {element} polygonBackground
  */

	window.addEventListener('resize', function () {
		polygonBackground.querySelector('#polygonHolder').remove();
		polygonBackground.insertAdjacentHTML('beforeend', generatePolygonBackground());
		allPolygons = document.querySelectorAll('.background #polygonHolder rect');

		setTimeout(function () {
			for (var _i = 0; _i < allPolygons.length; _i++) {
				allPolygons[_i].style = '\n\t\t\ttransform: rotate(' + Math.round(getRandomArbitrary(15, 80)) + 'deg) scale(' + getRandomArbitrary(.75, 1.2).toFixed(2) + ');\n\t\t\t';
			}
		}, 100);
	});
};

exports.default = backgroundAnimation;

},{}],3:[function(require,module,exports){
'use strict';

var _initialAnimation = require('./initialAnimation');

var _initialAnimation2 = _interopRequireDefault(_initialAnimation);

var _backgroundAnimation = require('./backgroundAnimation');

var _backgroundAnimation2 = _interopRequireDefault(_backgroundAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener("DOMContentLoaded", function () {

	function setPageTransitions() {
		var lastElementClicked = void 0;
		var animationStatus = 'forward';
		var windowWidth = document.querySelector('.background').getBoundingClientRect().width;
		var windowHeight = document.querySelector('.background').getBoundingClientRect().height;

		function findAncestor(el, cls) {
			while ((el = el.parentElement) && !el.classList.contains(cls)) {}
			return el;
		}

		var tlFoldCard = new TimelineMax({
			paused: true
		});

		tlFoldCard.to('.card-shadow', .3, { autoAlpha: 0 }).to('.card-leftHalf', .6, { rotationY: '-170deg', autoAlpha: 0, transformStyle: 'preserve-3d', transformOrigin: 'right' }).to(['.card-info p', '.card-info h1', '.card-info h2', '.card-info h3', '.card-info ul'], .3, { autoAlpha: 0 }).to('.card-cta', .6, { rotationX: '-179deg', autoAlpha: 0, transformStyle: 'preserve-3d', transformOrigin: 'top' }).to('.card-info', .6, { x: '-50%' }).to('.background-sizer', .4, { scale: 1, width: windowWidth + 'px', height: windowHeight * 1.2 + 'px', x: '-' + windowWidth / 2 + 'px', y: '-' + windowHeight / 2 + 'px', transformOrigin: 'center' });

		var Homepage = Barba.BaseView.extend({
			namespace: 'homepage',
			onEnter: function onEnter() {
				(0, _initialAnimation2.default)();
				if (typeof Storage !== 'undefined') {
					// Apply set scroll position from the scrollToProject function
					var lastYPos = +localStorage.getItem('scrollYPos');
					if (lastYPos) {
						window.scrollTo(0, lastYPos);
					}
				}
			},
			onEnterCompleted: function onEnterCompleted() {
				// The Transition has just finished.
				(0, _backgroundAnimation2.default)();
			},
			onLeave: function onLeave() {
				console.log('leaving homepage');
				// A new Transition toward a new page has just started.
				if (typeof Storage !== 'undefined') {
					// Set scroll position
					var lastYPos = +localStorage.getItem('scrollYPos');
					localStorage.setItem('scrollYPos', window.scrollY);
				}
				tlFoldCard.play();
				// tlFoldCard.eventCallback('onComplete', setState);
				// function setState(){
				// 	Barba.BaseTransition.done()
				// }
			},
			onLeaveCompleted: function onLeaveCompleted() {
				// The Container has just been removed from the DOM.
			}
		});
		var Article = Barba.BaseView.extend({
			namespace: 'article',
			onEnter: function onEnter() {
				console.log('on enter article');
				// TweenMax.to('.background-sizer', .3, { autoAlpha: 0 })
				tlFoldCard.play();
				// tlFoldCard.eventCallback('onComplete', setState);
				// function setState() {
				// 	Barba.BaseTransition.done()
				// }
			},
			onEnterCompleted: function onEnterCompleted() {
				// The Transition has just finished.
				// setTimeout(backgroundAnimation, 50)
				window.scrollTo(0, 0);
				(0, _backgroundAnimation2.default)();
				TweenMax.to('.article-animation-top', .5, { delay: .3, y: '-100%' });
				TweenMax.to('.article-animation-bottom', .5, { delay: .3, y: '100%', onComplete: function onComplete() {
						TweenMax.set(['.article-animation-bottom', '.article-animation-top'], { autoAlpha: 0 });
					} });
				TweenMax.set(['header h1', 'header p', 'header + img', 'header +figcaption'], { autoAlpha: 0, y: -5 });
				TweenMax.staggerTo(['header h1', 'header p', 'header + img', 'header +figcaption'], 1.2, { delay: .3, autoAlpha: 1, y: 0 }, 0.3);
			},
			onLeave: function onLeave() {
				// A new Transition toward a new page has just started.
				console.log('leaving article');
				console.log('increasing timescale');
				// tlFoldCard.reverse();				
			},
			onLeaveCompleted: function onLeaveCompleted() {
				console.log('onleave complete');
			}
		});

		// Don't forget to init the view!
		Homepage.init();
		Article.init();

		Barba.Pjax.init();
		Barba.Prefetch.init();

		Barba.Dispatcher.on('linkClicked', function (el) {
			lastElementClicked = el;
		});

		var ExpandTransition = Barba.BaseTransition.extend({
			start: function start() {
				this.clickedCard = lastElementClicked;

				Promise.all([this.newContainerLoading, this.flipCard()]).then(this.showNewPage.bind(this));
			},

			flipCard: function flipCard() {
				var deferred = Barba.Utils.deferred();
				transitionCard();

				function transitionCard(event) {
					tlFoldCard.play();
					tlFoldCard.eventCallback('onComplete', setState);
					function setState() {
						deferred.resolve();
					}
				}
				return deferred.promise;
			},

			showNewPage: function showNewPage() {
				this.oldContainer.style.visibility = 'hidden';
				this.newContainer.style.visibility = 'visible';
				this.done();
				// reloadJS();
			}
		});

		var BackTransition = Barba.BaseTransition.extend({
			// start: function () {
			// 	this.newContainerLoading.then(this.unflipCard.bind(this));
			// },
			start: function start() {
				this.newContainerLoading.then(this.unflipCard.bind(this));
				// Promise
				// 	.all([this.newContainerLoading, this.unflipCard.bind(this)])
				// 	.then(this.unflipCard.bind(this));
			},

			unflipCard: function unflipCard() {
				// this.oldContainer.remove();
				this.newContainer.style.visibility = 'visible';
				this.done();
				// tlFoldCard.reverse();
				// tlFoldCard.eventCallback('onComplete', setState);
				// function setState() {
				// 	console.log('back navigation is done');
				// 	// reloadJS();
				// 	// console.log(document.querySelector(`#${Barba.HistoryManager.prevStatus().url.split('/').pop()}`));
				// 	// document.querySelector(`#${Barba.HistoryManager.prevStatus().url.split('/').pop()}`).scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
				// 	this.done();
				// }
				// backgroundAnimation();
				// initialAnimation();

				// var _this = this;

				// this.oldContainer.style.zIndex = '10';
				// this.newContainer.style.visibility = 'visible';

				// var href = Barba.HistoryManager.prevStatus().url.split('/').pop();
				// var destThumb = this.newContainer.querySelector('a[href="' + href + '"]');
				// var destThumbPosition = destThumb.getBoundingClientRect();
				// var fullImage = this.oldContainer.querySelector('.full');

				// TweenLite.to(this.oldContainer.querySelector('.back'), 0.2, { opacity: 0 });

				// TweenLite.to(fullImage, 0.3, {
				// 	top: destThumbPosition.top,
				// 	height: destThumb.clientHeight,
				// 	onComplete: function () {
				// 		_this.done();
				// 	}
				// });
			}
		});

		Barba.Pjax.getTransition = function () {
			var transitionObj = ExpandTransition;
			if (Barba.HistoryManager.prevStatus().namespace === 'article') {
				transitionObj = BackTransition;
				console.log('prev is article');
			}

			return transitionObj;
		};
	}
	// Barba.Dispatcher.on('newPageReady', function (currentStatus, oldStatus, container) {
	// 	console.log('newpageready', currentStatus, oldStatus);
	// 	setPageTransitions();
	// });
	setPageTransitions();

	function reloadJS() {
		(0, _initialAnimation2.default)();
		(0, _backgroundAnimation2.default)();
		setPageTransitions();
	}
});

// const cardContent = ['#firstCard h1', '#firstCard h2', '#firstCard p', '#firstCard a', '#firstCard button', '.card-shadow']
// TweenMax.set(cardContent, { autoAlpha: 0 })
// TweenMax.set('#firstCard .card-cta', { rotationX: '-170deg', autoAlpha: 0, transformOrigin: 'top' })
// TweenMax.set('#firstCard .card-leftHalf', { rotationY: '-170deg', autoAlpha: 0, transformOrigin: 'right' })
// TweenMax.set('#firstCard', { x: '-25%', y: '-50vh', autoAlpha: 0, transformOrigin: 'center' })

// TweenMax.to('#firstCard', .6, {
// 	delay: .3, x: '-25%', y: '0vh', autoAlpha: 1, onComplete: function () {
// 		TweenMax.to('#firstCard', .5, {
// 			x: '0%', y: '0vh', scaleX: 1, autoAlpha: 1, onComplete: function () {
// 				flipCardVertical();
// 			}
// 		})
// 	}
// })

// function flipCardVertical() {

// 	TweenMax.to('#firstCard .card-cta', .6, {
// 		rotationX: '0deg', autoAlpha: 1, onComplete: function () {
// 			flipCardHorizontal()
// 		}
// 	})

// }
// function flipCardHorizontal() {
// 	TweenMax.to('#firstCard .card-leftHalf', .6, {
// 		rotationY: '0deg', autoAlpha: 1, onComplete: function () {
// 			// hoverPerspectiveAnimation()
// 			flipCardShowContent();
// 		}
// 	})
// }
// function flipCardShowContent() {
// 	TweenMax.staggerTo(cardContent, .6, {
// 		autoAlpha: 1, onComplete: function () {
// 			hoverPerspectiveAnimation();
// 			TweenMax.to('.card-shadow', .3, { autoAlpha: 1 })
// 		}
// 	}, 0.3)
// }

},{"./backgroundAnimation":2,"./initialAnimation":6}],4:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});
function hoverPerspectiveAnimation() {
	if (window.matchMedia("(min-width: 48rem)").matches) {
		var addHoverPerspectiveAnimation = function addHoverPerspectiveAnimation(el) {
			el.addEventListener('click', function (e) {
				var rect = el.getBoundingClientRect(),
				    x = e.clientX - rect.left,
				    y = e.clientY - rect.top,
				    hit = { x: x, y: y, radius: 1, autoAlpha: 1 };

				TweenMax.to(hit, 0.5, { radius: 200, autoAlpha: 0, ease: Power1.easeOut });
			});

			el.addEventListener('mousemove', function (e) {
				var rect = el.getBoundingClientRect(),
				    x = e.clientX - rect.left,
				    y = e.clientY - rect.top,
				    rx = -(y / rect.height) + 0.5,
				    ry = x / rect.width - 0.5,
				    rMax = 1;

				TweenMax.to(el, 0.1, { rotationX: rx * rMax, rotationY: ry * rMax });
			});

			el.addEventListener('mouseout', function () {
				if (mouseOutTween) mouseOutTween.kill();
				mouseOutTween = TweenMax.to(el, 0.25, { delay: 0.25, rotationX: 0, rotationY: 0 });
			});
		};
		// cards.forEach((el) => {
		// 	// el.style = "filter:url('#drop-shadow');"

		// 	el.addEventListener('click', function (e) {
		// 		let rect = el.getBoundingClientRect(),
		// 			x = e.clientX - rect.left,
		// 			y = e.clientY - rect.top,
		// 			hit = { x: x, y: y, radius: 1, autoAlpha: 1 };

		// 		TweenMax.to(hit, 0.5, { radius: 200, autoAlpha: 0, ease: Power1.easeOut });

		// 	});

		// 	el.addEventListener('mousemove', function (e) {
		// 		let rect = el.getBoundingClientRect(),
		// 			x = e.clientX - rect.left,
		// 			y = e.clientY - rect.top,
		// 			rx = -(y / rect.height) + 0.5,
		// 			ry = (x / rect.width) - 0.5,
		// 			rMax = 1;

		// 		TweenMax.to(el, 0.1, { rotationX: rx * rMax, rotationY: ry * rMax });
		// 	});

		// 	el.addEventListener('mouseout', function () {
		// 		if (mouseOutTween) mouseOutTween.kill();
		// 		mouseOutTween = TweenMax.to(el, 0.25, { delay: 0.25, rotationX: 0, rotationY: 0 });
		// 	});

		// });

		// window.addEventListener("deviceorientation", handleOrientation, true);

		// /**
		//  *  x: Represents the axis from West to East
		//  *	y: Represents the axis from South to North
		//  *	z: Represents the axis perpendicular to the ground
		//  * @param {*} e 
		//  */
		// function handleOrientation(e) {
		// 	let absolute = e.absolute;
		// 	let alpha = e.alpha;
		// 	let beta = e.beta; // X, In degree in the range [-180,180]
		// 	let gamma = e.gamma;// Y, In degree in the range [-90,90]
		// 	// console.log(alpha, beta, gamma);
		// 	cards.forEach( (el) => {
		// 		let rect = el.getBoundingClientRect(),
		// 			x = beta - rect.left,
		// 			y = gamma - rect.top,
		// 			rx = -(y / rect.height) + 0.5,
		// 			ry = (x / rect.width) - 0.5,
		// 			rMax = 3;
		// 		console.log(rx * rMax, ry * rMax);
		// 		TweenMax.to(el, 0.1, { rotationX: `${rx * rMax}deg`, rotationY: `${ry * rMax}deg` });
		// 		// elem.style.transform =
		// 		// 	"rotateY(" + (-e.gamma) + "deg)" +
		// 		// 	"rotateX(" + e.beta + "deg) " +
		// 		// 	"rotateZ(" + - (e.alpha - 180) + "deg) ";
		// 		// });
		// 	// TweenMax.to(el, 0.1, { rotationY: `${-gamma}deg`, rotationX: `${-beta}deg`, rotationZ: `-${alpha - 180}deg`})

		// 	})
		// }


		// TweenLite.set(".card", { perspective: 800, transformStyle: "preserve-3d" });

		var intersectionCallback = function intersectionCallback(entries) {
			// entries.forEach(function (entry) {
			// 	console.log(box, entry.intersectionRatio);
			// 	if (entry.intersectionRatio > 0) {
			// 		TweenLite.to(".card", { rotationY: 10, rotationX: 10 });
			// 	}
			// });
			entries.forEach(function (entry) {
				var box = entry.target;
				// console.log(box);
				// if (entry.intersectionRatio > 0) {
				// 	TweenMax.to(box, .6, { autoAlpha: 1 })
				// }
				// else {
				// 	TweenMax.set(box, { autoAlpha: 0})
				// }
				if (entry.intersectionRatio > prevRatio && entry.intersectionRatio < .9) {
					// console.log('in view', entry.intersectionRatio);
					TweenMax.to(box, .3, { rotationX: entry.intersectionRatio * 4 + "deg", ease: Power1.easeOut /*, rotationX: `${-entry.intersectionRatio * 10}deg` */ });
					// box.style = `transform: rotateX(${ (-entry.intersectionRatio * 15).toFixed(2) }deg) rotateY(${ (entry.intersectionRatio * 15).toFixed(2) }deg)`
				} else {
					// console.log('out of view', entry.intersectionRatio);
					TweenMax.to(box, .3, { rotationX: -entry.intersectionRatio * 4 + "deg", ease: Power1.easeOut /*, rotationX: `${entry.intersectionRatio * 10}deg`} */ });
					// box.style = `transform: rotateY(${(-entry.intersectionRatio * 15).toFixed(2)}deg) rotateX(${(entry.intersectionRatio * 15).toFixed(2)}deg)`
				}
				if (entry.intersectionRatio >= .9) {
					TweenMax.to(box, 1, {
						rotationY: 0,
						rotationX: 0,
						ease: Power1.easeOut,
						onComplete: function onComplete() {
							addHoverPerspectiveAnimation(box);
						}
					});
					// box.style = `transform: rotateX(0deg) rotateY(0deg)`
				}
				prevRatio = entry.intersectionRatio;
			});
		};
		// function handleIntersect(entries, observer) {
		// 	entries.forEach(function (entry) {
		// 		if (entry.intersectionRatio > prevRatio) {
		// 			entry.target.style.backgroundColor = increasingColor.replace("ratio", entry.intersectionRatio);
		// 		} else {
		// 			entry.target.style.backgroundColor = decreasingColor.replace("ratio", entry.intersectionRatio);
		// 		}

		// 		prevRatio = entry.intersectionRatio;
		// 	});
		// }

		/* the viewport is at least 400 pixels wide */

		var cards = document.querySelectorAll('.card');

		var mouseOutTween = void 0; // set on mouse-out

		TweenMax.set(cards, { transformPerspective: 800, transformStyle: "preserve-3d" });

		var observerOptions = {
			root: null,
			rootMargin: "0px",
			threshold: [0.0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0]
		};

		var observer = new IntersectionObserver(intersectionCallback, observerOptions);

		cards.forEach(function (card) {
			observer.observe(card);
			// TweenMax.set(card, { delay: .6, rotationY: 15, rotationX: 15 })
		});

		var prevRatio = 0.0;
	} else {
		/* the viewport is less than 400 pixels wide */
		console.log('smaller than 40rem');
	}
}
exports.default = hoverPerspectiveAnimation;

// TweenMax.set('h2', { autoAlpha: 0, y: '-50%', scale: .5 })

// const animateVisible = function (guideHeader, ratio) {
// 	if (ratio > 0) {
// 		console.log(guideHeader.tagName, ratio)
// 		if (guideHeader.tagName === 'H2') {
// 			console.log('tag name is H2')
// 			TweenMax.to(guideHeader, 1, { autoAlpha: 1, y: '0%', scale: 1 })
// 		} else {
// 			TweenMax.to(guideHeader, 1, { autoAlpha: 1, y: '0%', scale: 1 })
// 		}
// 	} else {
// 		// NOT IN VIEW
// 		TweenMax.set(guideHeader, { autoAlpha: 0, y: '-50%', scale: .5 })
// 	}
// };

// // Setup the Intersection observer to watch the boxes we care about
// // and when they're in view fire the animation function 
// const guideHeaders = document.querySelectorAll('main section h2');
// const guideHeadersObserver = new IntersectionObserver((entries) => {
// 	return entries.forEach((e) => {
// 		animateVisible(e.target, e.intersectionRatio);
// 	});
// }, { threshold: 0.1 });

// for (const guideHeader of guideHeaders) {
// 	guideHeadersObserver.observe(guideHeader);
// 	// guideHeadersObserver.observe(guideHeader.closest('section'));
// }

},{}],5:[function(require,module,exports){
'use strict';

var _app = require('./app');

var _app2 = _interopRequireDefault(_app);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

},{"./app":1}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _hoverPerspectiveAnimation = require('./hoverPerspectiveAnimation');

var _hoverPerspectiveAnimation2 = _interopRequireDefault(_hoverPerspectiveAnimation);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var initialAnimation = function initialAnimation() {
	TweenMax.globalTimeScale(1.25);
	var cardContent = ['#firstCard h1', '#firstCard h2', '#firstCard p', '#firstCard h3', '#firstCard a', '#firstCard button', '#firstCard svg', '.card-shadow'];
	TweenMax.set(cardContent, { autoAlpha: 0, x: -10 });
	TweenMax.set('#firstCard .card-cta', { rotationX: '-170deg', autoAlpha: 0, transformOrigin: 'top' });
	TweenMax.set('#firstCard .card-leftHalf', { rotationY: '-170deg', autoAlpha: 0, transformOrigin: 'right' });
	TweenMax.set('#firstCard', { x: '-25%', y: '-50vh', autoAlpha: 0, transformOrigin: 'center' });
	TweenMax.set('.card', { autoAlpha: 0, y: -10 });
	TweenMax.to('.card', 1.2, { delay: .3, autoAlpha: 1, y: 0 }, 0.3);

	TweenMax.to('#firstCard', .6, { delay: .3, x: '-25%', y: '0vh', autoAlpha: 1, onComplete: function onComplete() {
			TweenMax.to('#firstCard', .5, { x: '0%', y: '0vh', scaleX: 1, autoAlpha: 1, onComplete: function onComplete() {
					flipCardVertical();
				} });
		}
	});

	function flipCardVertical() {

		TweenMax.to('#firstCard .card-cta', .6, {
			rotationX: '0deg', autoAlpha: 1, onComplete: function onComplete() {
				flipCardHorizontal();
				document.querySelectorAll('.card-holder')[0].insertAdjacentHTML('afterbegin', '\n\t\t\t\t<div class="screen-reader-only" aria-live="rude">\n\t\t\t\t\tHey there! There is currently an animation playing of a card folding out while revealing its contents. This may take a second so please wait one second before you navigate.\n\t\t\t\t</div>\n\t\t\t\t');
			}
		});
	}
	function flipCardHorizontal() {
		TweenMax.to('#firstCard .card-leftHalf', .6, {
			rotationY: '0deg', autoAlpha: 1, onComplete: function onComplete() {
				// hoverPerspectiveAnimation()
				flipCardShowContent();
			}
		});
	}
	function flipCardShowContent() {
		TweenMax.staggerTo(cardContent, .9, {
			autoAlpha: 1,
			x: 0,
			onComplete: function onComplete() {
				(0, _hoverPerspectiveAnimation2.default)();
				TweenMax.to('.card-shadow', .3, { autoAlpha: 1 });
				if (document.querySelectorAll('#firstCard')[0]) {
					document.querySelectorAll('#firstCard')[0].setAttribute('aria-busy', 'false');
				}
			}
		}, 0.2);
	}
};

exports.default = initialAnimation;

// const io = new IntersectionObserver(
// 	entries => {
// 		console.log(entries);
// 	},
// 	{
// 		/* Using default options. Details below */
// 	}
// );


// // Start observing an element
// io.observe(document.querySelector('[data-type="timeline"]'));

// 	// Stop observing an element
// 	// io.unobserve(element);

// 	// Disable entire IntersectionObserver
// 	// io.disconnect();

},{"./hoverPerspectiveAnimation":4}]},{},[5]);
