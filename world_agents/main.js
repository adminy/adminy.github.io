function startSimulation () {
	if (!AB.inited) {
		AB.step = 1
		AB.world.newRun()
	
		ABWorld.render()
		AB.inited = true;
	}
	
	createTimer();
	AB.running = true
}

function createTimer () {
	AB.timer = setTimeout(() => {
		nextStep();
		createTimer();
	}, AB.clockTick);
}

function nextStep () {
	if (AB.runReady) {
		if (AB.endCondition()) {
			clearTimeout(AB.timer)
			AB.running = false
		} else {
			AB.world.update()
			// const state = AB.world.getState()
			// const action = AB.mind.getAction(state)
			// AB.world.takeAction(action)
			ABWorld.render()
			AB.step++
		}
	}
}

function pauseSimulation () {
	clearTimeout(AB.timer)
	AB.running = false
}

const controlButtons = {
	/** @type {Element} */
	play: null,
	playClick () {
		startSimulation();
		controlButtons.play.style.display = 'none';
		controlButtons.step.style.display = 'none';
		controlButtons.pause.style.display = 'block';
	},

	/** @type {Element} */
	pause: null,
	pauseClick () {
		pauseSimulation();
		controlButtons.pause.style.display = 'none';
		controlButtons.play.style.display = 'block';
		controlButtons.step.style.display = 'block';
	},

	/** @type {Element} */
	step: null,
	stepClick () {
		nextStep();
	},

	/** @type {Element} */
	info: null,
	infoClick () {
		document.getElementById('info-block').classList.toggle('active');
	},

	/** @type {Element} */
	settings: null,
	settingsClick () {
		document.getElementById('settings-block').classList.toggle('active');
	}
};

for (const $btn of document.querySelectorAll('#control-buttons > .btn-icon')) {
	const { action } = $btn.dataset;
	controlButtons[action] = $btn;
	$btn.addEventListener('click', controlButtons[action + 'Click'].bind(controlButtons));
}

// Start scene after page load
if (localStorage.getItem('autostart') == 'true') {
	controlButtons.playClick();
}

/*
 * Settings section
 */
function updateSettingsCounter ($input) {
	const $counter = $input.previousElementSibling.querySelector('span');
	$counter.innerText = $input.value;
}

document.getElementById('settings-block').addEventListener('submit', e => {
	e.preventDefault();
	
	let recreate = false;
	const form = new FormData(e.currentTarget);
	AB.clockTick = parseInt(form.get('period'));

	const worldSize = parseInt(form.get('world-size'));
	if (worldSize != AB.world.gridSize) {
		AB.world.gridSize = worldSize;
		recreate = true;
	}

	const agents = parseInt(form.get('agents'));
	if (agents != AB.world.totalAgents) {
		AB.world.totalAgents = agents;
		recreate = true;
	}

	if (recreate) {
		clearTimeout(AB.timer);
		AB.inited = false;
		controlButtons.playClick();
	}
});

for (const $input of document.querySelectorAll('#settings-block input[name]')) {
	switch ($input.getAttribute('name')) {
		case 'period':
			$input.value = AB.clockTick;
			break;
		case 'world-size':
			$input.value = AB.world.gridSize;
			break;
		case 'agents':
			$input.value = AB.world.totalAgents;
			break;
	}

	updateSettingsCounter($input);
	$input.addEventListener('input', () => {
		updateSettingsCounter($input);
	});
}
