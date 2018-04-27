import initialAnimation from './initialAnimation';
import backgroundAnimation from './backgroundAnimation';

document.addEventListener("DOMContentLoaded", function () {

	function setPageTransitions(){
		let lastElementClicked;
		let animationStatus = 'forward'
		const windowWidth = document.querySelector('.background').getBoundingClientRect().width;
		const windowHeight = document.querySelector('.background').getBoundingClientRect().height;

		function findAncestor(el, cls) {
			while ((el = el.parentElement) && !el.classList.contains(cls));
			return el;
		}

		let tlFoldCard = new TimelineMax({
			paused: true
		});

		tlFoldCard
			.to('.card-shadow', .3, { autoAlpha: 0 })
			.to('.card-leftHalf', .6, { rotationY: '-170deg', autoAlpha: 0, transformStyle: 'preserve-3d', transformOrigin: 'right' })
			.to(['.card-info p', '.card-info h1', '.card-info h2', '.card-info h3', '.card-info ul'], .3, { autoAlpha: 0 })
			.to('.card-cta', .6, { rotationX: '-179deg', autoAlpha: 0, transformStyle: 'preserve-3d', transformOrigin: 'top' })
			.to('.card-info', .6, { x: '-50%' })
			.to('.background-sizer', .4, { scale: 1, width: `${windowWidth}px`, height: `${windowHeight * 1.2}px`, transformOrigin: 'center' })

		var Homepage = Barba.BaseView.extend({
			namespace: 'homepage',
			onEnter: function () {
				initialAnimation();
				if (typeof (Storage) !== 'undefined') {
					// Apply set scroll position from the scrollToProject function
					var lastYPos = +localStorage.getItem('scrollYPos');
					if (lastYPos) {
						window.scrollTo(0, lastYPos);
					}
				}
			},
			onEnterCompleted: function () {
				// The Transition has just finished.
				backgroundAnimation();
			},
			onLeave: function () {
				console.log('leaving homepage');
				// A new Transition toward a new page has just started.
				if (typeof (Storage) !== 'undefined') {
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
			onLeaveCompleted: function () {
				// The Container has just been removed from the DOM.
			}
		});
		var Article = Barba.BaseView.extend({
			namespace: 'article',
			onEnter: function () {
				console.log('on enter article');
				// TweenMax.to('.background-sizer', .3, { autoAlpha: 0 })
				tlFoldCard.play();
				// tlFoldCard.eventCallback('onComplete', setState);
				// function setState() {
				// 	Barba.BaseTransition.done()
				// }

			},
			onEnterCompleted: function () {
				// The Transition has just finished.
				// setTimeout(backgroundAnimation, 50)
				window.scrollTo(0, 0);
				backgroundAnimation();
				TweenMax.to('.article-animation-top', .7, { delay: .3, y: '-100%' });
				TweenMax.to('.article-animation-bottom', .7, { delay: .3, y: '100%', onComplete: function(){
					TweenMax.set(['.article-animation-bottom', '.article-animation-top'], {autoAlpha: 0})
				} });
				TweenMax.set(['header h1', 'header p', 'img', 'figcaption'], { autoAlpha: 0, y: -5 })
				TweenMax.staggerTo(['header h1', 'header p', 'img', 'figcaption'], 1.2, { delay: .4, autoAlpha: 1, y: 0 }, 0.5)
			},
			onLeave: function () {
				// A new Transition toward a new page has just started.
				console.log('leaving article');
				console.log('increasing timescale');
				// tlFoldCard.reverse();				
			},
			onLeaveCompleted: function () {
				console.log('onleave complete');
			}
		});

		// Don't forget to init the view!
		Homepage.init();
		Article.init()

		Barba.Pjax.init();
		Barba.Prefetch.init();

		Barba.Dispatcher.on('linkClicked', function (el) {
			lastElementClicked = el;
		});

		var ExpandTransition = Barba.BaseTransition.extend({
			start: function () {
				this.clickedCard = lastElementClicked;

				Promise
					.all([this.newContainerLoading, this.flipCard()])
					.then(this.showNewPage.bind(this));
			},

			flipCard: function () {
				var deferred = Barba.Utils.deferred();
				transitionCard();

				function transitionCard(event) {
					tlFoldCard.play();
					tlFoldCard.eventCallback('onComplete', setState);
					function setState(){
						deferred.resolve();
					}
				}
				return deferred.promise;
			},

			showNewPage: function () {
				this.oldContainer.style.visibility = 'hidden';
				this.newContainer.style.visibility = 'visible';
				this.done();
				// reloadJS();
			}
		});

		const BackTransition = Barba.BaseTransition.extend({
			// start: function () {
			// 	this.newContainerLoading.then(this.unflipCard.bind(this));
			// },
			start: function () {
				this.newContainerLoading.then(this.unflipCard.bind(this));
				// Promise
				// 	.all([this.newContainerLoading, this.unflipCard.bind(this)])
				// 	.then(this.unflipCard.bind(this));

			},

			unflipCard: function () {
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
		initialAnimation()
		backgroundAnimation();
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