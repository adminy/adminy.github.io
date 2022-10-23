import { appendElement, $, decrypt, hash } from './utils.js'
const state = { quiz: [], answers: [], name: '' }
const loadQuestion = () => {
	const { question, pick, answers } = state.quiz[state.answers.length]
	$('.title').innerHTML = question
	appendElement($('.subtitle'), 'div', {
		class: 'control',
		children: answers.map(answer => ({
			div: {
				child: {
					label: {
						class: 'radio',
						text: answer.value,
						child: {
							input: {
								type: pick ? 'checkbox' : 'radio',
								name: 'answer',
								value: answer.i,
								...(answer.disabled ? { disabled: 'disabled' } : {})
							}
						},
						...(answer.disabled ? { disabled: 'disabled' } : {}),
						...(answer.hidden ? { display: 'none' } : {})
					}
				}
			}
		})),
		onkeyup: e => e.keyCode === 13 && quizAnswer()
	})
}

const tryQuiz = () => {
	state.name = $('input[type="text"]').value || ''
	const secret = $('input[type="password"]')
	state.secret = secret.value
	fetch('quiz/' + hash(secret.value)).then(res => res.text()).then(encryptedContents => {
		try {
			state.quiz = JSON.parse(decrypt(secret.value, encryptedContents)).map((question, i) => ({ ...question, i, answers: question.answers.map((a, i) => ({ ...a, i })).sort(() => Math.random() - 0.5) })).sort(() => Math.random() - 0.5)
			state.answers = []
			$('.subtitle').innerHTML = ''
			$('.button').onclick = quizAnswer
			loadQuestion()
		} catch (e) {
			secret.value = ''
		}
	})
}

const auth = () => {
	appendElement($('.subtitle'), 'div', {
		children: [
			{ input: { placeholder: 'Your name is ...', class: 'input is-success is-large', type: 'text', autocomplete: 'off', ...(state.name ? { value: state.name } : {}) } },
			{ br: {} }, { br: {} }, { br: {} },
			{ input: { placeholder: 'Enter Test Key Here ...', class: 'input is-danger is-large', type: 'password', autocomplete: 'off' } }
		]
	})
	$('.is-danger').addEventListener('keyup', e => e.keyCode === 13 && tryQuiz())
}

const quizAnswer = () => {
	const button = $('.button')
	button.classList.add('is-loading')
	const B = [...document.querySelectorAll('input[name="answer"]')]
		.filter(input => input.checked)
		.map(input => parseInt(input.value))
		.sort((a, b) => b - a)

	const index = state.answers.length
	state.answers.push({ i: state.answers[index].i, B })

	$('.subtitle').innerHTML = ''
	$('.progress').value = parseInt(((index + 1) / state.quiz.length) * 100)
	const isFinished = state.answers.length === state.quiz.length
	!isFinished && loadQuestion()
	button.classList.remove('is-loading')
	if (isFinished) {
		const answers = state.answers.map(({ B }, index) => {
			const A = Array(state.quiz[index].answers.length)
				.fill(0).map((_, i) => i)
				.reverse()
				.slice(0, state.quiz[index].pick || 1)
			// score = (A ∩ B) / (A ∪ B)
			return A.filter(x => B.includes(x)).length / new Set([...A, ...B]).size
		})
		const percent = (answers.reduce((a, b) => a + b, 0) / state.quiz.length) * 100
		$('.title').innerHTML = 'You did ' + (percent === 100 ? '💯 . . . 👏🥇🏆🎉' : percent + '% 😜 ')
		$('.subtitle').innerHTML = '<br>Thank you <strong>' + state.name + '</strong> for completing this Test!'
		button.innerText = 'Try Another Quiz'
		window.post('ask', state.secret + ':' + state.name, state.answers.map(answer => answer.join(',')).join(' '))
		state.secret = ''
		button.onclick = () => {
			$('.subtitle').innerHTML = ''
			$('.title').innerHTML = ''
			$('.progress').value = 0
			button.innerText = 'Answer'
			auth()
			button.onclick = tryQuiz
		}
	}
}

auth()

$('.button').onclick = tryQuiz
