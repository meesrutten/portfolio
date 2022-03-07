import initialAnimation from './initialAnimation';
import backgroundAnimation from './backgroundAnimation';
import loadImagesOnIntersect from './imageLoader';

document.addEventListener("DOMContentLoaded", function () {

	function setPageTransitions(){
		let lastElementClicked;
		let animationStatus = 'forward'
		const windowWidth = document.querySelector('.background').getBoundingClientRect().width;
		const windowHeight = document.querySelector('.background').getBoundingClientRect().height;

		let tlFoldCard = new TimelineMax({
			paused: true
		});
		if (window.matchMedia("(min-width: 48rem)").matches) {
		//bigger than 48rem
			tlFoldCard
				.to('.card-shadow', .3, { autoAlpha: 0 })
				.to('.card-leftHalf', .6, { rotationY: '-170deg', autoAlpha: 0, transformStyle: 'preserve-3d', transformOrigin: 'right' })
				.to(['.card-info p', '.card-info h1', '.card-info h2', '.card-info h3', '.card-info ul'], .3, { autoAlpha: 0 })
				.to('.card-cta', .6, { delay: .1, rotationX: '-179deg', autoAlpha: 0, transformStyle: 'preserve-3d', transformOrigin: 'top' })
				.to('.card-info', .6, { x: '-50%' })
				.to('.background-sizer', .4, { scale: 1, width: `${windowWidth}px`, height: `${windowHeight * 1.2}px`, x: `-${windowWidth / 2}px`, y: `-${windowHeight / 2}px`, transformOrigin: 'center' })
		} else {
		//Smaller than ... 
		if(document.querySelectorAll('.background-sizer')[0]){
			const cardInfo = document.querySelectorAll('.background-sizer');
			cardInfo.forEach( (elem) => {
				const cardInfoTop = elem.parentElement.getBoundingClientRect().top;
				const cardInfoHeight = elem.parentElement.getBoundingClientRect().height;
				elem.parentElement.querySelector('.background-sizer').style = `top: ${cardInfoHeight / 2};`
			} )
		}
			TweenMax.set('.background-sizer', { scaleY: 0, width: `${windowWidth}px`})
			tlFoldCard
				.to('.card-shadow', .3, { autoAlpha: 0 })
				.to('.card-leftHalf', .6, { rotationY: '-170deg', autoAlpha: 0, transformStyle: 'preserve-3d', transformOrigin: 'right' })
				.to(['.card-info p', '.card-info h1', '.card-info h2', '.card-info h3', '.card-info ul'], .3, { autoAlpha: 0 })
				.to('.card-cta', .6, { delay: .1, rotationX: '-179deg', autoAlpha: 0, transformStyle: 'preserve-3d', transformOrigin: 'top' })
				.to('.card-info', .3, { scaleY: 0, transformOrigin: 'center' })
				.to(['.background-sizer', '.card-info'], .5, { scaleY: 5, transformOrigin: 'center' })
		}

		var Homepage = Barba.BaseView.extend({
			namespace: 'homepage',
			onEnter: function () {
				initialAnimation();
				loadImagesOnIntersect();
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
				// A new Transition toward a new page has just started.
				if (typeof (Storage) !== 'undefined') {
					// Set scroll position
					var lastYPos = +localStorage.getItem('scrollYPos');
					localStorage.setItem('scrollYPos', window.scrollY);
				}
			},
			onLeaveCompleted: function () {
			}
		});
		var Article = Barba.BaseView.extend({
			namespace: 'article',
			onEnter: function () {
			},
			onEnterCompleted: function () {
				// The Transition has just finished.
				window.scrollTo(0, 0);
				backgroundAnimation();
				TweenMax.to('.article-animation-top', .8, { delay: .3, y: '-100%' });
				TweenMax.to('.article-animation-bottom', .8, { delay: .3, y: '100%', onComplete: function(){
					TweenMax.set(['.article-animation-bottom', '.article-animation-top'], {autoAlpha: 0})
				} });
				TweenMax.set(['header h1', 'header p', 'img', 'figcaption'], { autoAlpha: 0, y: -5 })
				TweenMax.staggerTo(['header h1', 'header p', 'img', 'figcaption'], 1.2, { delay: .4, autoAlpha: 1, y: 0 }, 0.5)
			},
			onLeave: function () {
				// A new Transition toward a new page has just started.
			},
			onLeaveCompleted: function () {
			}
		});
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

					// tlFoldCard.play();
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
			}
		});

		const BackTransition = Barba.BaseTransition.extend({
			start: function () {
				this.newContainerLoading.then(this.unflipCard.bind(this));
			},

			unflipCard: function () {
				this.newContainer.style.visibility = 'visible';
				this.done();
			}
		});

		Barba.Pjax.getTransition = function () {
			var transitionObj = ExpandTransition;
			if (Barba.HistoryManager.prevStatus().namespace === 'article') {
				transitionObj = BackTransition;
			}

			return transitionObj;
		};

	}
	setPageTransitions();
});