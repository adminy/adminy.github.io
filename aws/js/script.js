const QUESTION_TIMEOUT = 2 * 60

const start_btn = document.querySelector('.start_btn button')
const info_box = document.querySelector('.info_box')
const exit_btn = info_box.querySelector('.buttons .quit')
const continue_btn = info_box.querySelector('.buttons .restart')
const quiz_box = document.querySelector('.quiz_box')
const result_box = document.querySelector('.result_box')
const option_list = document.querySelector('.option_list')
const time_line = document.querySelector('header .time_line')
const timeText = document.querySelector('.timer .time_left_txt')
const timeCount = document.querySelector('.timer .timer_sec')
const check_btn = document.querySelector('footer .check_btn')
const next_btn = document.querySelector('footer .next_btn')
const bottom_ques_counter = document.querySelector('footer .total_que')

document.querySelector('.title').innerText = 'Question Set: ' + questionSet


exit_btn.onclick = ()=>{
    info_box.classList.remove('activeInfo') 
}


continue_btn.onclick = ()=>{
    info_box.classList.remove('activeInfo') 
    quiz_box.classList.add('activeQuiz') 
    showQuetions(0) 
    queCounter(1) 
    startTimer(QUESTION_TIMEOUT) 
}


start_btn.onclick = ()=>{
    // info_box.classList.add('activeInfo') //show info box
    continue_btn.onclick()
}


let timeValue =  QUESTION_TIMEOUT
let que_count = 0
let que_numb = 1
let userScore = 0
let counter

const restart_quiz = result_box.querySelector('.buttons .restart')
const quit_quiz = result_box.querySelector('.buttons .quit')


restart_quiz.onclick = ()=>{
    quiz_box.classList.add('activeQuiz') 
    result_box.classList.remove('activeResult') 
    timeValue = QUESTION_TIMEOUT 
    que_count = 0
    que_numb = 1
    userScore = 0
    showQuetions(que_count) 
    queCounter(que_numb) 
    clearInterval(counter) 
    startTimer(timeValue) 
    timeText.textContent = 'Time Left' 
    next_btn.classList.remove('show') 
    check_btn.classList.remove('show') 
    document.querySelector('.explanation').innerHTML = ''

    
}


quit_quiz.onclick = () => {
    window.location.reload() 
}


next_btn.onclick = () => {
    document.querySelector('.explanation').innerHTML = ''
    clearInterval(counter)
    if(que_count < questions.length - 1) { 
        que_count++ 
        que_numb++ 
        showQuetions(que_count) 
        queCounter(que_numb) 
        startTimer(timeValue) 
        timeText.textContent = 'Time Left' 
        next_btn.classList.remove('show') 
        check_btn.classList.remove('show')
    }else{
        showResult() 
    }
}


function showQuetions(index){
    const que_text = document.querySelector('.que_text')
    
    let que_tag = '<span style="font-weight: 600">Question '+ (index + 1) + ". </span>" + questions[index].question
    let option_tag = questions[index].answers.map(({answer}, i) => '<div class="option" data-answer="'+i+'"><span>' + answer + '</span></div>').join('')
    que_text.innerHTML = que_tag
    option_list.innerHTML = option_tag
    
    const options = [...option_list.querySelectorAll('.option')]
    options.map(option => option.setAttribute('onclick', 'optionSelected(this)'))
}

let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>'
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>'


function optionSelected(answer){
    const answers = questions[que_count].answers
    const totalAnswers = answers.map(({correct}) => correct).reduce((a, b) => a + b, 0)
    answer.classList.toggle('selected')
    const allOptions = [...option_list.children]
    
    totalAnswers === 1 && allOptions.filter(option => option != answer).map(option => option.classList.remove('selected'))
    const selectedOptions = allOptions.map(option => option.classList.contains('selected') ? 1 : 0).reduce((a, b) => a + b, 0)

    totalAnswers < selectedOptions && answer.classList.toggle('selected')
    totalAnswers === selectedOptions && check_btn.classList.add('show')
}
check_btn.onclick = () => {
    check_btn.classList.remove('show')
    next_btn.classList.add('show')
    const options = [...option_list.children]
    clearInterval(counter)
    const answers = questions[que_count].answers
    const totalAnswers = answers.map(({correct}) => correct).reduce((a, b) => a + b, 0)
    let currentAnswers = 0
    for (const option of options) {
        option.removeAttribute('onclick')
        option.classList.add('disabled')
        const selected = option.classList.contains('selected')
        const {answer, correct} = answers[parseInt(option.getAttribute('data-answer'))]
        if (selected && correct) {
            currentAnswers++
            option.classList.add('correct')
            option.insertAdjacentHTML('beforeend', tickIconTag)
        } else if (selected) {
            option.classList.add('incorrect')
            option.insertAdjacentHTML('beforeend', crossIconTag)
        } else if (correct) {
            option.setAttribute('class', 'option correct-not-selected')
            option.insertAdjacentHTML('beforeend', tickIconTag)
        }
    }
    document.querySelector('.explanation').innerHTML = questions[que_count].explanation
    
    userScore += currentAnswers / totalAnswers
}

function showResult(){
    info_box.classList.remove('activeInfo') 
    quiz_box.classList.remove('activeQuiz') 
    result_box.classList.add('activeResult') 
    const scoreText = result_box.querySelector('.score_text')
    document.querySelector('.explanation').innerHTML = ''
    if (userScore > 3){ 
        
        let scoreTag = '<span>and congrats! 🎉, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag
    }
    else if(userScore > 57){ 
        let scoreTag = '<span>and nice 😎, You got <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag
    }
    else{ 
        let scoreTag = '<span>and sorry 😐, You got only <p>'+ userScore +'</p> out of <p>'+ questions.length +'</p></span>'
        scoreText.innerHTML = scoreTag
    }
}

function startTimer(time){
    counter = setInterval(() => {
        timeCount.textContent = time


        time_line.style.width = parseInt(((QUESTION_TIMEOUT - time) / QUESTION_TIMEOUT) * 80) + 'vw'
        if(--time < 0) {
            clearInterval(counter)
            timeText.textContent = 'Time Off'
            const options = [...option_list.querySelectorAll('.option')]
            options.map(option => option.removeAttribute('onclick'))
            check_btn.onclick()
        }
    }, 1000)
    
}

function queCounter(index){
    
    let totalQueCounTag = '<span><p>'+ index +'</p> of <p>'+ questions.length +'</p> Questions</span>'
    bottom_ques_counter.innerHTML = totalQueCounTag
}