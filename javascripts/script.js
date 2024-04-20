const btnStart = document.querySelector('.btn_start');
const popupQuizInfo = document.querySelector('.popup_info');
const btnExit = document.querySelector('.btn_exit');
const btnContinue = document.querySelector('.btn_continue');
const main = document.querySelector('.main');
const sectionQuiz = document.querySelector('.section_quiz');
const boxQuiz = document.querySelector('.box_quiz');
const boxResult = document.querySelector('.box_result');
const btnTryAgain = document.querySelector('.btn_tryAgain');
const btnGoHome = document.querySelector('.btn_goHome');

btnStart.onclick = () => 
{
    popupQuizInfo.classList.add('active');
    main.classList.add('active');
}

btnExit.onclick = () => 
{
    popupQuizInfo.classList.remove('active');
    main.classList.remove('active');
}

btnContinue.onclick = () => 
{
    sectionQuiz.classList.add('active');
    popupQuizInfo.classList.remove('active');
    main.classList.remove('active');
    boxQuiz.classList.add('active');

    showQuestions(0);
    counterQuestion(1);
    headerScore();
}

btnTryAgain.onclick = () => 
{
    boxQuiz.classList.add('active');
    boxResult.classList.remove('active');
    btnNext.classList.remove('active');

    countQuestions = 0;
    questionNo = 1;
    scoreUser = 0;
    showQuestions(countQuestions);
    counterQuestion(questionNo);

    headerScore();
}

btnGoHome.onclick = () => 
{
    sectionQuiz.classList.remove('active');
    boxResult.classList.remove('active');
    btnNext.classList.remove('active');

    countQuestions = 0;
    questionNo = 1;
    scoreUser = 0;
    showQuestions(countQuestions);
    counterQuestion(questionNo);
}

let countQuestions = 0;
let questionNo = 1;
let scoreUser = 0;

const btnNext = document.querySelector('.btn_next');

btnNext.onclick = () => {
    if(countQuestions < questions.length - 1) 
    {
        countQuestions++;
        showQuestions(countQuestions);

        questionNo++;
        counterQuestion(questionNo);

        btnNext.classList.remove('active');
    }

    else
    {
        showResultBox();
    }
}

const optionList = document.querySelector('.list_option');

// getting questions and options from array
function showQuestions(index)
{
    const textQuestion = document.querySelector('.text_question');
    textQuestion.textContent = `${questions[index].no}. ${questions[index].question}`;

    let optionTag = `<div class="option"><span>${questions[index].options[0]}</span></div>
                    <div class="option"><span>${questions[index].options[1]}</span></div> 
                    <div class="option"><span>${questions[index].options[2]}</span></div>
                    <div class="option"><span>${questions[index].options[3]}</span></div>`;

    optionList.innerHTML = optionTag;

    const option = document.querySelectorAll('.option');
    for (let i = 0; i < option.length; i++)
    {
        option[i].setAttribute('onclick', 'selectedOption(this)');
    }
}

function selectedOption(answer)
{
    let answerUser = answer.textContent;
    let answerCorrect = questions[countQuestions].answer;
    let optionsAll = optionList.children.length;

    /* console.log(answerCorrect)  */
    if (answerUser == answerCorrect) 
    {
        answer.classList.add('correct');
        scoreUser += 1;
        headerScore();
    } 
    
    else 
    {
        answer.classList.add('incorrect');

        // if users answer is incorrect// display correct answer
        for (let i = 0; i < optionsAll; i++)
        {
            if (optionList.children[i].textContent == answerCorrect)
            {
                optionList.children[i].setAttribute('class', 'option correct');
            }
        }
    } 

    // disable options once user selects answer
    for (let i = 0; i < optionsAll; i++)
    {
        optionList.children[i].classList.add('disabled');
    }

    btnNext.classList.add('active');
}

function counterQuestion(index)
{
    const totalQuestion = document.querySelector('.total_question');
    totalQuestion.textContent = `${index} of ${questions.length} Questions`;
}

function headerScore()
{
    const headerTextScore = document.querySelector('.header_score');
    headerTextScore.textContent = `Score: ${scoreUser} / ${questions.length}`;
}

function showResultBox()
{
    boxQuiz.classList.remove('active');
    boxResult.classList.add('active');

    const textScore = document.querySelector('.text_score');
    textScore.textContent = `Your score is ${scoreUser} out of ${questions.length}`;

    const progressCircular = document.querySelector('.progress_circular');
    const progressValue = document.querySelector('.progress_value');
    let progressStartValue = -1;
    let progressEndValue = (scoreUser / questions.length) * 100;
    let speed = 20;

    let progress = setInterval(() =>
    {
        progressStartValue++;

        progressValue.textContent = `${progressStartValue}%`;
        progressCircular.style.background = `conic-gradient(#98FB98 ${progressStartValue * 3.6}deg, rgba(255, 255, 255, .1) 0deg)`;

        if(progressStartValue == progressEndValue)
        {
            clearInterval(progress);
        }
    }, speed);
}