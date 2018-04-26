import hoverPerspectiveAnimation from './hoverPerspectiveAnimation'

const initialAnimation = function() {
	const cardContent = ['#firstCard h1', '#firstCard h2', '#firstCard p', '#firstCard h3', '#firstCard a', '#firstCard button', '#firstCard svg', '.card-shadow']
	TweenMax.set(cardContent, { autoAlpha: 0, x: -10 })
	TweenMax.set('#firstCard .card-cta', { rotationX: '-170deg', autoAlpha: 0, transformOrigin: 'top' })
	TweenMax.set('#firstCard .card-leftHalf', { rotationY: '-170deg', autoAlpha: 0, transformOrigin: 'right' })
	TweenMax.set('#firstCard', {x: '-25%', y: '-50vh', autoAlpha: 0, transformOrigin: 'center'}) 
	TweenMax.set('.card', { autoAlpha: 0, y: -10 })
	TweenMax.to('.card', 1.2, { delay: .3, autoAlpha: 1, y: 0 }, 0.3)

	TweenMax.to('#firstCard', .6, { delay: .3, x: '-25%', y: '0vh', autoAlpha: 1, onComplete: function(){
			TweenMax.to('#firstCard', .5, { x: '0%', y: '0vh', scaleX: 1, autoAlpha: 1,  onComplete: function(){
				flipCardVertical();
			} })
		} 
	})

	function flipCardVertical() {
		
		TweenMax.to('#firstCard .card-cta', .6, {
			rotationX: '0deg', autoAlpha: 1, onComplete: function(){
				flipCardHorizontal();
				document.querySelectorAll('.card-holder')[0].insertAdjacentHTML('afterbegin', `
				<div class="screen-reader-only" aria-live="rude">
					Hey there! There is currently an animation playing of a card folding out while revealing its contents. This may take a second so please wait one second before you navigate.
				</div>
				`)
			}
		})

	}
	function flipCardHorizontal() {
		TweenMax.to('#firstCard .card-leftHalf', .6, {
			rotationY: '0deg', autoAlpha: 1, onComplete: function(){
				// hoverPerspectiveAnimation()
				flipCardShowContent();
			}
		})
	}
	function flipCardShowContent() {
		TweenMax.staggerTo(cardContent, .9, {
			 autoAlpha: 1, 
			 x: 0,
			 onComplete: function(){
				hoverPerspectiveAnimation();
				TweenMax.to('.card-shadow', .3, {autoAlpha: 1});
				 if (document.querySelectorAll('#firstCard')[0]){
					 document.querySelectorAll('#firstCard')[0].setAttribute('aria-busy', 'false')
				 }
			}
		}, 0.2)
	}
}

export default initialAnimation;

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
