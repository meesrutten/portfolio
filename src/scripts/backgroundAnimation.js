const backgroundAnimation = function () {
	/*
	* Creates a background with 5 rectangles that rotate, 
	* scale and change in color intensity
	*/
	const polygonBackground = document.querySelector('.background');

	// if (polygonBackground.querySelectorAll('svg')[0]){
	// 	polygonBackground.querySelectorAll('svg')[0].remove()
	// }

	polygonBackground.innerHTML =  generatePolygonBackground()

	function generatePolygonBackground() {
		const WIDTH = window.innerWidth;
		const HEIGHT = window.innerHeight;
		const halfWidth = WIDTH / 2;
		const halfHeight = HEIGHT / 2;
		const rectWidth = WIDTH * .5;
		const rectHeight = HEIGHT * .5;
		return `
				<svg id="polygonHolder" viewBox="0 0 ${WIDTH} ${HEIGHT}" preserveAspectRatio="xMinYMin meet" xmlns="http://www.w3.org/2000/svg" role="presentation">
					<rect x="${-halfWidth / 2}" y="0" width="${rectWidth}" height="${rectHeight}" role="presentation"/>
					<rect x="${halfWidth}" y="0" width="${rectWidth}" height="${rectHeight}" role="presentation"/>
					<rect x="${-halfHeight / 2}" y="${-halfWidth / 2}" width="${rectWidth}" height="${rectHeight}" role="presentation"/>
					<rect x="${halfHeight * 2}" y="${-halfHeight / 2}" width="${rectWidth}" height="${rectHeight}" role="presentation"/>
				</svg>
		`
	}
				// 	<rect x="${halfHeight * 2}" y="${halfHeight * 2}" width="${rectWidth}" height="${rectHeight}"/>

	let allPolygons = document.querySelectorAll('.background #polygonHolder rect');

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
	let start = null;
	let step = 0;
	const animationTime = 12 //24
	
	// for (let i = 0; i < allPolygons.length; i++) {
	// 	allPolygons[i].style = `
	// 		opacity: ${getRandomArbitrary(0.05, 0.08).toFixed(2)};
	// 		transform: rotate(${Math.round(getRandomArbitrary(15, 80))}deg) scale(${getRandomArbitrary(.75, 1.2).toFixed(2)});
	// 		`
	// }
	for (let i = 0; i < allPolygons.length; i++) {
		allPolygons[i].style = `
			transform: rotate(${Math.round(getRandomArbitrary(15, 80))}deg) scale(${getRandomArbitrary(.75, 1.2).toFixed(2)});
			`
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

	window.addEventListener('resize', () => {
		polygonBackground.querySelector('#polygonHolder').remove();
		polygonBackground.insertAdjacentHTML('beforeend', generatePolygonBackground())
	 	allPolygons = document.querySelectorAll('.background #polygonHolder rect');

		setTimeout( () => {
			for (let i = 0; i < allPolygons.length; i++) {
				allPolygons[i].style = `
			transform: rotate(${Math.round(getRandomArbitrary(15, 80))}deg) scale(${getRandomArbitrary(.75, 1.2).toFixed(2)});
			`
			}
		}, 100)
	})

}

export default backgroundAnimation;