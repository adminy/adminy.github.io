const JSDOM = require('jsdom').JSDOM
const fs = require('fs')
const dom = new JSDOM(`
<div>
${fs.readFileSync('1.html').toString()}
${fs.readFileSync('2.html').toString()}
${fs.readFileSync('3.html').toString()}
${fs.readFileSync('4.html').toString()}
</div>
`)
const div = dom.window.document.body.firstChild
const questions = [...div.children].map(div => [...div.children]).flat()
const everything = []
for (const question of questions) {

	const [qn, av, q, a, e] = [...question.firstChild.children]
	// console.log(qn.innerHTML, av.innerHTML)
	const result = {
		question: q.innerHTML,
		answers: [],
		explanation: e.innerHTML
	}
	for (const o of [...a.children]) {
		const a = [...o.firstChild.children].slice(-1)[0].firstChild.firstChild
		result.answers.push({
			correct: o.firstChild.getAttribute('class').includes('mc-quiz-answer--correct'),
			answer: a.innerHTML
		})
	}
	everything.push(result)
}


console.log(JSON.stringify(everything))


