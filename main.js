/* All answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/* All our options */
const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'), // номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); //количество всех вопросов

let indexOfQuestion, // индекс текущего вопроса
    indexOfPage = 0; // индекс страницы

const answersTracker = document.getElementById('answers-tracker'); // обертка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка далее

let score = 0; //итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), // количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //количество всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "начать викторину заново"

const questions = [
    {
        question: 'Какой используется оператор для присвоения значения переменной ?', 
        options: [
            'x',
            '=',
            '*',
            '-',
        ],
        rightAnswer: 1
    },
    {
        question: 'Как округляется число 3.14 до ближайшего целого числа?', 
        options: [
            'Math.round(3.14)',
            'round(3.14)',
            'rnd(3.14)',
            'Math.rnd(3.14)',
        ],
        rightAnswer: 0
    },
    {
        question: 'Как объявляется переменная JavaScript ?', 
        options: [
            'let Num',
            'l Num',
            'variable Num',
            '$Num',
        ],
        rightAnswer: 0
    },
    {
        question: 'После какого HTML тега нужно вставить JavaScript ?', 
        options: [
            '&ltjs&gt',
            '&ltscripting&gt',
            '&ltscript&gt',
            '&ltjavascript&gt',
        ],
        rightAnswer: 2
    },
    {
        question: ' Что вернет следующий код: Boolean (10> 9)', 
        options: [
            'false',
            '1',
            'NaN',
            'true',
        ],
        rightAnswer: 3
    },
    {
        question: ' Как можно вывести сообщение "Hello World!" с помощью JavaScript?', 
        options: [
            'alert(&#39;Hello World&#39;)',
            'msg(&#39;Hello World&#39;)',
            'alertBox(\&#39;Hello World&#39;)',
            'msgBox(\&#39;Hello World&#39;)',
        ],
        rightAnswer: 0
    },
    {
        question: ' Какое происходит событие, когда пользователь нажимает на элемент HTML?', 
        options: [
            'onchange',
            'onclick',
            'onmouseclick',
            'onmouseover',
        ],
        rightAnswer: 1
    },
    {
        question: ' Как сделать многострочный комментарий ?', 
        options: [
            '/* Это многострочный комментарий*/',
            '//Это многострочный комментарий//',
            '<Это многострочный комментарий>',
            '&lt!-- Это многострочный комментарий --&gt',
        ],
        rightAnswer: 0
    },
    {
        question: ' Как начать FOR цикл ?', 
        options: [
            'for i = 1 to 10',
            'for (i <= 10; i++)',
            'for (i = 0; i <= 10)',
            'for (i = 0; i <= 10; i++)',
        ],
        rightAnswer: 3
    },
    {
        question: ' Как начать цикл WHILE ?', 
        options: [
            'while i = 1 to 7',
            'while (i <= 7)',
            'while (i <= 7; i++)',
            'while (i=0; i <= 7; i--)',
        ],
        rightAnswer: 1
    }
];

numberOfAllQuestions.innerHTML = questions.length; //выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; //сам вопрос

    // мапим ответы
    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
    indexOfPage++; // увеличение индекса страницы
}

let completedAnswers = [] //массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDuplicate = false; // якорь для проверки одинаковых вопросов

    if(indexOfPage == questions.length) {
        quizOver()
    } else {
        if(completedAnswers.length > 0) {
            completedAnswers.forEach(item => {
                if(item == randomNumber) {
                    hitDuplicate = true; 
                }
            });
            if(hitDuplicate) {
                randomQuestion(); 
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if(completedAnswers.length == 0) {
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if(el.target.dataset.id == questions[indexOfQuestion].rightAnswer) {
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    } else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for(option of optionElements) {
    option.addEventListener('click', e => checkAnswer(e));
}


const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if(item.dataset.id == questions[indexOfQuestion].rightAnswer) {
            item.classList.add('correct');
        }
    })
}

//Удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
};

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if(!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариантов ответа');
    } else {
        randomQuestion();
        enableOptions();
    }
}

const quizOver= () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
}

const tryAgain = () => {
    window.location.reload();
};

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
});
