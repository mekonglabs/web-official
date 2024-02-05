const particlesConfig = {
	autoPlay: true,
	// backgroundMask: {
	// 	composite: 'destination-out',
	// 	cover: {
	// 		color: {
	// 			value: ['#007bff', '#6610f2', '#6f42c1'],
	// 		},
	// 		opacity: 0.8,
	// 	},
	// 	enable: false,
	// },
	background: {
		color: {
			value: "#fff",
		},
		opacity: 0.8,
	},
	defaultThemes: {},
	delay: 0,
	fullScreen: {
		enable: false,
		zIndex: 1,
	},
	detectRetina: true,
	duration: 0,
	fpsLimit: 120,
	interactivity: {
		events: {
			onClick: {
				enable: true,
				mode: "push",
			},
			onHover: {
				enable: true,
				mode: "repulse",
			},
			resize: true,
		},
		modes: {
			push: {
				quantity: 4,
			},
			repulse: {
				distance: 200,
				duration: 0.4,
			},
		},
	},
	manualParticles: [],
	particles: {
		color: {
			value: ['#007bff', '#6610f2', '#6f42c1'],
		},
		links: {
			color: ['#007bff', '#6610f2', '#6f42c1'],
			distance: 150,
			enable: true,
			opacity: 0.5,
			width: 1,
		},
		move: {
			direction: "none",
			enable: true,
			outModes: {
				default: "bounce",
			},
			random: false,
			speed: 6,
			straight: false,
		},
		number: {
			density: {
				enable: true,
				area: 800,
			},
			value: 80,
		},
		opacity: {
			value: 0.5,
		},
		shape: {
			type: "circle",
		},
		size: {
			value: { min: 1, max: 5 },
		},
	},
	pauseOnBlur: true,
	pauseOnOutsideViewport: true,
	responsive: [],
	smooth: false,
	style: {},
	themes: [],
	zLayers: 100,
}

export default particlesConfig
