const imageDistortion = function (opts) {
	const vertex = `
        varying vec2 vUv;
        void main() {
          vUv = uv;
          gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
        }
    `;

	const fragment = `
        varying vec2 vUv;

        uniform sampler2D texture;
        uniform sampler2D texture2;
        uniform sampler2D disp;

        // uniform float time;
        // uniform float _rot;
        uniform float dispFactor;
        uniform float effectFactor;

        // vec2 rotate(vec2 v, float a) {
        //  float s = sin(a);
        //  float c = cos(a);
        //  mat2 m = mat2(c, -s, s, c);
        //  return m * v;
        // }

        void main() {

            vec2 uv = vUv;

            // uv -= 0.5;
            // vec2 rotUV = rotate(uv, _rot);
            // uv += 0.5;

            vec4 disp = texture2D(disp, uv);

            vec2 distortedPosition = vec2(uv.x + dispFactor * (disp.r*effectFactor), uv.y);
            vec2 distortedPosition2 = vec2(uv.x - (1.0 - dispFactor) * (disp.r*effectFactor), uv.y);

            vec4 _texture = texture2D(texture, distortedPosition);
            vec4 _texture2 = texture2D(texture2, distortedPosition2);

            vec4 finalTexture = mix(_texture, _texture2, dispFactor);

            gl_FragColor = finalTexture;
            // gl_FragColor = disp;
        }
    `;

	const parent = opts.parent || console.warn("no parent");
	const dispImage = opts.displacementImage || console.warn("displacement image missing");
	const image1 = opts.image1 || console.warn("first image missing");
	const image2 = opts.image2 || console.warn("second image missing");
	const intensity = opts.intensity || 1;
	const speedIn = opts.speedIn || 1.6;
	const speedOut = opts.speedOut || 1.2;
	const userHover = (opts.hover === undefined) ? true : opts.hover;
	const easing = opts.easing || Expo.easeOut;

	var scene = new THREE.Scene();
	var camera = new THREE.OrthographicCamera(
		parent.offsetWidth / -2,
		parent.offsetWidth / 2,
		parent.offsetHeight / 2,
		parent.offsetHeight / -2,
		1,
		1000
	);

	camera.position.z = 1;

	var renderer = new THREE.WebGLRenderer({
		antialias: false,
		// alpha: true
	});

	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setClearColor(0xffffff, 0.0);
	renderer.setSize(parent.offsetWidth, parent.offsetHeight);
	parent.appendChild(renderer.domElement);

	// var addToGPU = function(t) {
	//     renderer.setTexture2D(t, 0);
	// };

	var loader = new THREE.TextureLoader();
	loader.crossOrigin = "";
	var texture1 = loader.load(image1);
	var texture2 = loader.load(image2);

	var disp = loader.load(dispImage);
	disp.wrapS = disp.wrapT = THREE.RepeatWrapping;

	texture1.magFilter = texture2.magFilter = THREE.LinearFilter;
	texture1.minFilter = texture2.minFilter = THREE.LinearFilter;

	texture1.anisotropy = renderer.getMaxAnisotropy();
	texture2.anisotropy = renderer.getMaxAnisotropy();

	var mat = new THREE.ShaderMaterial({
		uniforms: {
			effectFactor: { type: "f", value: intensity },
			dispFactor: { type: "f", value: 0.0 },
			texture: { type: "t", value: texture1 },
			texture2: { type: "t", value: texture2 },
			disp: { type: "t", value: disp }
		},

		vertexShader: vertex,
		fragmentShader: fragment,
		transparent: true,
		opacity: 1.0
	});

	var geometry = new THREE.PlaneBufferGeometry(
		parent.offsetWidth,
		parent.offsetHeight,
		1
	);
	var object = new THREE.Mesh(geometry, mat);
	scene.add(object);

	var addEvents = function () {
		var evtIn = "mouseenter";
		var evtOut = "mouseleave";
		
		parent.addEventListener(evtIn, function (e) {
			TweenMax.to(mat.uniforms.dispFactor, speedIn, {
				value: 1,
				ease: easing
			});
		});

		parent.addEventListener(evtOut, function (e) {
			TweenMax.to(mat.uniforms.dispFactor, speedOut, {
				value: 0,
				ease: easing
			});
		});
	};

	if (userHover) {
		addEvents();
	}

	window.addEventListener("resize", function (e) {
		renderer.setSize(parent.offsetWidth, parent.offsetHeight);
	});


	this.next = function () {
		TweenMax.to(mat.uniforms.dispFactor, speedIn, {
			value: 1,
			ease: easing
		});
	}

	this.previous = function () {
		TweenMax.to(mat.uniforms.dispFactor, speedOut, {
			value: 0,
			ease: easing
		});
	};

	var animate = function () {
		requestAnimationFrame(animate);

		renderer.render(scene, camera);
	};
	animate();
};

export default imageDistortion;