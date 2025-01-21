//getting all required elements
const startBtn = document.querySelector('.start-button');
const infoBox = document.querySelector('#info-box');
const exitBtn = document.querySelector('.quit');
const counBtn = document.querySelector('.restar');
const quizBox = document.querySelector('#quiz-box');
const timeCount = document.querySelector('.seconds');
const timeLine = document.querySelector('.timer-line');
const timeOff = document.querySelector('.time-text');


startBtn.addEventListener('click', () => {
    infoBox.classList.remove("remove");
})
exitBtn.addEventListener('click', () => {
    infoBox.classList.add('remove');
})
counBtn.addEventListener('click', () => {
    quizBox.classList.remove("remove");
    showQuestions(0);
    queCounter(1);
    startTime(timeValue);
    startTimeLine(0);
})

var questionCount = 0;
let questionNumber = 1;
let counter;
let timeValue = 20;
let width = 0;
let userScore = 0;
timeOff.textContent = 'Time Off';
const nextBtn = document.querySelector('#btn-next');
const resultBox = document.querySelector('#result-box');
const restartQuiz = resultBox.querySelector('.buttons .restar');

nextBtn.addEventListener('click', () => {
    if (questionCount < questions.length - 1) {
        questionCount++;
        questionNumber++;
        showQuestions(questionCount);
        queCounter(questionNumber);
        clearInterval(counter);
        startTime(timeValue);
        clearInterval(counterLine);
        startTimeLine(width);
        nextBtn.style.display = 'none';
        timeOff.textContent = 'Time Left'
    } else {
        startTime(timeValue);
        startTimeLine(width);
        showResultBox();
    }
})
restartQuiz.addEventListener('click', () => {
    infoBox.classList.add('remove');
    document.querySelector('.result-box').style.display = 'none';
    questionCount = 0;
    questionNumber = 1;
    timeValue = 20;
    width = 0;
    userScore = 0;
    clearInterval(counter);
    clearInterval(counterLine);

})

//gett question
function showQuestions(index) {
    let question = '<span>' + questions[index].number + '. ' + questions[index].question + '</span>';
    let options = '<div  class=" option">' + questions[index].options[0] + '</span></div>'
        + '<div  class=" option">' + questions[index].options[1] + '</span></div>'
        + '<div  class=" option">' + questions[index].options[2] + '</span></div>'
        + '<div  class=" option">' + questions[index].options[3] + '</span></div>';
    const quizText = document.querySelector('#quiz-text').innerHTML = question;
    const option_list = document.querySelector('#option-list').innerHTML = options;
    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++) {
        option[i].setAttribute("onClick", "optionSelected(this)");
    }
}

let crosIcon = '<div class="icon cros"><i class="fas fa-times "></i></div>';
let thickIcon = '<div class="icon tick"><i class="fas fa-check"></i></div>'

function optionSelected(answear) {
    clearInterval(counter);
    clearInterval(counterLine);
    let allOptionList = document.querySelector('#option-list').children;
    let userAns = answear.textContent;
    let corretAns = questions[questionCount].answear;
    if (userAns === corretAns) {
        userScore++;
        answear.classList.add("correct");
        answear.insertAdjacentHTML('beforeend', thickIcon);
    }
    else {
        answear.classList.add("incorrect");
        answear.insertAdjacentHTML('beforeend', crosIcon);

        for (let i = 0; i < allOptionList.length; i++) {
            if (allOptionList[i].textContent == corretAns) {
                allOptionList[i].setAttribute('class', 'option correct');
                allOptionList[i].insertAdjacentHTML('beforeend', thickIcon);
            }
        }
    }

    for (let i = 0; i < allOptionList.length; i++) {
        allOptionList[i].classList.add('disabled');
    }
    nextBtn.style.display = 'block';

}
function showResultBox() {
    quizBox.classList.add('remove');
    infoBox.classList.add('remove');
    document.querySelector('.result-box').style.display = 'block';
    document.querySelector('#score').innerHTML = userScore;
}

function queCounter(index) {
    let numbersOfQuestionstag = '<span><p>' + index + '</p>Of<p>' + questions.length + '</p>Question</span>'
    const numbersOfQuestions = document.querySelector('#total-quiz').innerHTML = numbersOfQuestionstag;
}

function startTime(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time;
        time--;

        if (time < 0) {
            clearInterval(counter);
            timeCount.textContent = '0';
            timeOff.textContent = 'Time Off'
            let allOptionList = document.querySelector('#option-list').children;
            let corretAns = questions[questionCount].answear;
            for (let i = 0; i < allOptionList.length; i++) {
                if (allOptionList[i].textContent == corretAns) {
                    allOptionList[i].setAttribute('class', 'option correct');
                    allOptionList[i].insertAdjacentHTML('beforeend', thickIcon);
                }
            }
            for (let i = 0; i < allOptionList.length; i++) {
                allOptionList[i].classList.add('disabled');
            }
            nextBtn.style.display = 'block';
        }
    }
}

function startTimeLine(time) {
    counterLine = setInterval(timer, 35);
    function timer() {
        time += 1;
        timeLine.style.width = time + 'px';
        if (time > 600) {
            clearInterval(counterLine);

        }
    }
}



