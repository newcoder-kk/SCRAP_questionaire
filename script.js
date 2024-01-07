//selecting all required elements

const start_btn = document.querySelector(".start_btn button");
const info_box = document.querySelector(".info_box");
const exit_btn = info_box.querySelector(".buttons .quit");
const continue_btn = info_box.querySelector(".buttons .restart");
const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_list = document.querySelector(".option_list");
const time_line = document.querySelector("header .time_line");
const timeText = document.querySelector(".timer .time_left_txt");
const timeCount = document.querySelector(".timer .timer_sec");
const apiUrl = 'http://127.0.0.1:5000/predict_personality';
const formData = {};
let openScore = 0;
let openTotalScore = 0;
let conScore = 0;
let conTotalScore = 0;
let exScore = 0;
let exTotalScore = 0;
let agScore = 0;
let agTotalScore = 0;
let neuScore = 0;
let neuTotalScore = 0;


// Get the form container element
const formContainer = document.querySelector('.container');
const submitButton = formContainer.querySelector('.submit');

// Add event listener to the submit button
submitButton.addEventListener('click', function (event) {
    event.preventDefault(); // Prevent form submission

    const inputFields = formContainer.querySelectorAll('input, select');

    inputFields.forEach(function (field) {
        formData[field.name] = field.value;
    });

    console.log(formData);
    const formDataJSON = JSON.stringify(formData);
    localStorage.setItem('Registraion details', formDataJSON);
    formContainer.remove();
    info_box.classList.add("activeInfo");
});

// if exitQuiz button clicked
exit_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
}

// if continueQuiz button clicked
continue_btn.onclick = () => {
    info_box.classList.remove("activeInfo"); //hide info box
    quiz_box.classList.add("activeQuiz"); //show quiz box
    showQuetions(0); //calling showQestions function
    queCounter(1); //passing 1 parameter to queCounter
    startTimer(15); //calling startTimer function
    startTimerLine(0); //calling startTimerLine function
}

let timeValue = 15;
let que_count = 0;
let que_numb = 1;
let userScore = 0;
let counter;
let counterLine;
let widthValue = 0;

const restart_quiz = result_box.querySelector(".buttons .restart");
const quit_quiz = result_box.querySelector(".buttons .quit");

// if restartQuiz button clicked
restart_quiz.onclick = () => {
    quiz_box.classList.add("activeQuiz"); //show quiz box
    result_box.classList.remove("activeResult"); //hide result box
    timeValue = 15;
    que_count = 0;
    que_numb = 1;
    userScore = 0;
    widthValue = 0;
    showQuetions(que_count); //calling showQestions function
    queCounter(que_numb); //passing que_numb value to queCounter
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    startTimer(timeValue); //calling startTimer function
    startTimerLine(widthValue); //calling startTimerLine function
    timeText.textContent = "Time Left"; //change the text of timeText to Time Left
    next_btn.classList.remove("show"); //hide the next button
}

// if quitQuiz button clicked
quit_quiz.onclick = () => {
    window.location.reload(); //reload the current window
}

const next_btn = document.querySelector("footer .next_btn");
const bottom_ques_counter = document.querySelector("footer .total_que");

// if Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        startTimer(timeValue); //calling startTimer function
        startTimerLine(widthValue); //calling startTimerLine function
        timeText.textContent = "Time Left"; //change the timeText to Time Left
        next_btn.classList.remove("show"); //hide the next button
    } else {
        clearInterval(counter); //clear counter
        clearInterval(counterLine); //clear counterLine
        showResult(); //calling showResult function
    }
}

// getting questions and options from array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");

    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = '<span>' + questions[index].numb + ". " + questions[index].question + '</span>';
    let option_tag;
    /*let option_tag = '<div class="option"><span>' + questions[index].options[0] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[1] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[2] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[3] + '</span></div>'
        + '<div class="option"><span>' + questions[index].options[4] + '</span></div>';*/
    for (i = 0; i < questions[index].options.length; i++) {
        option_tag += '<div class="option"><span>' + questions[index].options[i] + '</span></div>';
    }

    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");

    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
    clearInterval(counter); //clear counter
    clearInterval(counterLine); //clear counterLine
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    //if (userAns == correcAns) { //if user selected option is equal to array's correct answer
    userScore += 1; //upgrading score value with 1
    answer.classList.add("correct"); //adding green color to correct selected option
    answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
    console.log("Answered");
    console.log("Questions Answered= " + userScore);

    //update the user scores here

    //}
    /*else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        console.log("Wrong Answer");
 
        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                console.log("Auto selected correct answer.");
            }
        }
    }*/
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show");
    //show the next button if user selected any option
    if (questions[que_count].marking === 1) {
        if (questions[que_count].categories === "Openness") {
            openScore += questions[que_count].options.indexOf(userAns) + 1;
            openTotalScore += 5;
        }
        else if (questions[que_count].categories === "Conscientiousness") {
            conScore += questions[que_count].options.indexOf(userAns) + 1;
            conTotalScore += 5;
        }
        else if (questions[que_count].categories === "Extraversion") {
            exScore += questions[que_count].options.indexOf(userAns) + 1;
            exTotalScore += 5;
        }
        else if (questions[que_count].categories === "Agreeableness") {
            agScore += questions[que_count].options.indexOf(userAns) + 1;
            agTotalScore += 5;
        }
        else if (questions[que_count].categories === "Neuroticism") {
            neuScore += questions[que_count].options.indexOf(userAns) + 1;
            neuTotalScore += 5;
        }
    }
    else if (questions[que_count].marking === 0) {
        if (questions[que_count].categories === "Openness") {
            openScore += 5 - questions[que_count].options.indexOf(userAns) - 1;
            openTotalScore += 5;
        }
        else if (questions[que_count].categories === "Conscientiousness") {
            conScore += 5 - questions[que_count].options.indexOf(userAns) - 1;
            conTotalScore += 5;
        }
        else if (questions[que_count].categories === "Extraversion") {
            exScore += 5 - questions[que_count].options.indexOf(userAns) - 1;
            exTotalScore += 5;
        }
        else if (questions[que_count].categories === "Agreeableness") {
            agScore += 5 - questions[que_count].options.indexOf(userAns) - 1;
            agTotalScore += 5;
        }
        else if (questions[que_count].categories === "Neuroticism") {
            neuScore += 5 - questions[que_count].options.indexOf(userAns) - 1;
            neuTotalScore += 5;
        }
    }
}
// const apiKey = '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';
// const apiUrl = 'https://api.openai.com/v1/engines/davinci-codex/completions';

// async function getChatResponse(prompt) {
//     const response = await fetch(apiUrl, {
//         method: 'GET',
//         headers: {
//             'Content-Type': 'application/json',
//             'Authorization': `Bearer ${apiKey}`
//         }
//         // body: JSON.stringify({
//         //     prompt: prompt,
//         //     max_tokens: 100  // Adjust as per your requirement
//         // })
//     });

//     const data = await response.json();
//     return data.choices[0].text.trim();
//}
// getChatResponse("hello")
//     .then(response => console.log('ChatGPT response:', response))
//     .catch(error => console.error('Error:', error));
//      new comment line
//checking commit comment line

async function showResult() {
    var currentTime = new Date();
    var respData;
    const inputData = {
        Gender: (formData.Gender === "Male" ? 1 : 2),
        Age: parseInt(formData.DOB.slice(0,4)) - currentTime.getFullYear(),
        openness: Math.round(openScore / openTotalScore * 10),
        neuroticism: Math.round(neuScore / neuTotalScore * 10),
        conscientiousness: Math.round(conScore / conTotalScore * 100),
        agreeableness: Math.round(agScore / agTotalScore * 10),
        extraversion: Math.round(exScore / exTotalScore * 10)
      };
      try {
        const response = await axios.post("http://127.0.0.1:5000/predict_personality", inputData);
        respData = response.data;
    
        console.log('Response:', data);
        // Use the 'data' variable as needed in the rest of your code
    
      } catch (error) {
        console.error('Error:', error);
        // Handle errors here
      }

    info_box.classList.remove("activeInfo"); //hide info box

    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    const scoreText = result_box.querySelector(".score_text");
    console.log("Openness scores " + openScore + " out of " + openTotalScore);
    console.log("Consientiousness scores " + conScore + " out of " + conTotalScore);
    console.log("Extrovertism scores " + exScore + " out of " + exTotalScore);
    console.log("Agreeableness scores " + agScore + " out of " + agTotalScore);
    console.log("Neurotism scores " + neuScore + " out of " + neuTotalScore);

    let scoreTag = "<span><p>Openness scores </p>: " + Math.round(openScore / openTotalScore * 100) + "%</span>" + "<span><p>Consientiousness scores </p>: " + Math.round(conScore / conTotalScore * 100) + "%</span>" +
        "<span><p>Extrovertism scores </p>: " + Math.round(exScore / exTotalScore * 100) + "%</span>" +
        "<span><p>Agreeableness scores </p>: " + Math.round(agScore / agTotalScore * 100) + "%</span>" +
        "<span><p>Neurotism scores </p>: " + Math.round(neuScore / neuTotalScore * 100) + "%</span>"+
        "<span><p>Our AI prediction</p>: " + respData.predicted_personality + " Person"
        + "</span>"
    scoreText.innerHTML = scoreTag;
    const scoreInfo = {};
    scoreInfo["Openness"] = openScore / openTotalScore;
    scoreInfo["Consientiousness"] = conScore / conTotalScore;
    scoreInfo["Extrovertism"] = exScore / exTotalScore;
    scoreInfo["Agreeableness"] = agScore / agTotalScore;
    scoreInfo["Neurotism"] = neuScore / neuTotalScore;

    const scoreInfoJSON = JSON.stringify(scoreInfo);
    localStorage.setItem("Scores", scoreInfoJSON);
    //const prompt = "give me a 100 words description of a person with Openness " + openScore + " out of " + openTotalScore + "Consientiousness scores " + conScore + " out of " + conTotalScore + "Extrovertism scores " + exScore + " out of " + exTotalScore + "Agreeableness scores " + agScore + " out of " + agTotalScore + "Neurotism scores " + neuScore + " out of " + neuTotalScore;

    /*if (userScore > 3) { // if user scored more than 3
        //creating a new span tag and passing the user score number and total question number
        let scoreTag = '<span>and congrats! , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;  //adding new span tag inside score_Text
    }
    else if (userScore > 1) { // if user scored more than 1
        let scoreTag = '<span>and nice , You got <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }
    else { // if user scored less than 1
        let scoreTag = '<span>and sorry , You got only <p>' + userScore + '</p> out of <p>' + questions.length + '</p></span>';
        scoreText.innerHTML = scoreTag;
    }*/
}

function startTimer(time) {
    counter = setInterval(timer, 1000);
    function timer() {
        timeCount.textContent = time; //changing the value of timeCount with time value
        time--; //decrement the time value
        if (time < 9) { //if timer is less than 9
            let addZero = timeCount.textContent;
            timeCount.textContent = "0" + addZero; //add a 0 before time value
        }
        if (time < 0) { //if timer is less than 0
            clearInterval(counter); //clear counter
            timeText.textContent = "Time Off"; //change the time text to time off
            const allOptions = option_list.children.length; //getting all option items
            let correcAns = questions[que_count].answer; //getting correct answer from array
            for (i = 0; i < allOptions; i++) {
                if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer
                    option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                    option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                    console.log("Time Off: Auto selected correct answer.");
                }
            }
            for (i = 0; i < allOptions; i++) {
                option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
            }
            next_btn.classList.add("show"); //show the next button if user selected any option
        }
    }
}

function startTimerLine(time) {
    counterLine = setInterval(timer, 29);
    function timer() {
        time += 1; //upgrading time value with 1
        time_line.style.width = time + "px"; //increasing width of time_line with px by time value
        if (time > 549) { //if time value is greater than 549
            clearInterval(counterLine); //clear counterLine
        }
    }
}

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = '<span><p>' + index + '</p> of <p>' + questions.length + '</p> Questions</span>';
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}
