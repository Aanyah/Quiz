var questions = [
    {
        title: "Commonly used data types DO NOT include:",
        choices: ["strings", "booleans", "alerts", "numbers"],
        answer: "alerts"
    },
    {
        title: "The condition in an if / else statement is enclosed within ____.",
        choices: ["quotes", "curly brackets", "parentheses", "square brackets"],
        answer: "parentheses"
    },
    {
        title: "Arrays in Javascript can be used to store ____.",
        choices: ["numbers and strings", "other arrays", "booleans", "all of the above"],
        answer: "all of the above"
    },
    {
        title: "String values must be enclosed within ____ when being assigned to variables.",
        choices: ["commas", "curly brackets", "quotes", "parenthesis"],
        answer: "quotes"
    },
    {
        title: "A very useful tool for used during development and debugging for printing content to the debugger is:",
        choices: ["Javascript", "terminal / bash", "for loops", "console log"],
        answer: "console log"
    },

];
var score = 0;
var qIndex = 0;

var time = document.querySelector("#time");
var begin = document.querySelector("#start-btn");
var questionsEl = document.querySelector("#questionsEl");
var wrapper = document.querySelector("#wrapper");

var secLeft = 25;
var holdInt = 0;
var penalty = 5;
var create = document.createElement("ul");

//timer setup/start quiz
begin.addEventListener("click", function () {
    if (holdInt === 0) {
        holdInt = setInterval(function () {
            secLeft--;
            time.textContent = "Time: " + secLeft;

            if (secLeft <= 0) {
                clearInterval(holdInt);
                end();
                time.textContent = "Time's up! 😵";
            }
        }, 1000);
    }
    showQ(qIndex);
});

//question setup
function showQ(questionIndex) {
    // Clears existing data 
    questionsEl.innerHTML = "";
    create.innerHTML = "";
   
    for (var i = 0; i < questions.length; i++) {
        var userQuestion = questions[qIndex].title;
        var userChoices = questions[qIndex].choices;
        questionsEl.textContent = userQuestion;
    }
    userChoices.forEach(function (newItem) {
        var listItem = document.createElement("button");
        listItem.textContent = newItem;
        questionsEl.appendChild(create);
        create.appendChild(listItem);
        listItem.addEventListener("click", (compare));
    })
}
//compare choices with answer
function compare(event) {
    var element = event.target;

    if (element.matches("button")) {

        var createDiv = document.createElement("div");
        createDiv.setAttribute("id", "createDiv");
        // Correct condition 
        if (element.textContent == questions[qIndex].answer) {
            score++;
            createDiv.textContent = "Correct! ✅"; 
        } else {
            secLeft = secLeft - penalty;
            createDiv.textContent = "InCorrect! ❌"
        }
    }
    // which question user on
    qIndex++;

    if (qIndex >= questions.length) {
        end();
        createDiv.textContent = "End of quiz!" + " " + "You got  " + score + "/" + questions.length + " Correct!";
    } else {
        showQ(qIndex);
    }

    questionsEl.appendChild(createDiv);

}
// last page
function end() {
    questionsEl.innerHTML = "";
    time.innerHTML = "";

    // Heading:
    var createH1 = document.createElement("h1");
    createH1.setAttribute("id", "createH1");
    createH1.textContent = "End of QUIZ!"

    questionsEl.appendChild(createH1);

    // Paragraph
    var createP = document.createElement("p");
    createP.setAttribute("id", "createP");

    questionsEl.appendChild(createP);

    // time remaining and replaces it with score
    if (secLeft >= 0) {
        var timeRemaining = secLeft;
        var createP2 = document.createElement("p");
        clearInterval(holdInt);
        createP.textContent = "Final Score: " + timeRemaining;

        questionsEl.appendChild(createP2);
    }    
    // label
    var createLabel = document.createElement("label");
    createLabel.setAttribute("id", "createLabel");
    createLabel.textContent = "Enter your initials: ";

    questionsEl.appendChild(createLabel);

    // input
    var createInput = document.createElement("input");
    createInput.setAttribute("type", "text");
    createInput.setAttribute("id", "initials");
    createInput.textContent = "";

    questionsEl.appendChild(createInput);

    // submit
    var createSubmit = document.createElement("button");
    createSubmit.setAttribute("type", "submit");
    createSubmit.setAttribute("id", "submit");
    createSubmit.textContent = "Submit";

    questionsEl.appendChild(createSubmit);

    //  local storage for initials and score
    createSubmit.addEventListener("click", function () {
        var initials = createInput.value;

        if (initials === null) {

            console.log("No value entered!");

        } else {
            var finalScore = {
                initials: initials,
                score: timeRemaining
            }
            if (secLeft === 0) {
                finalScore= {
                    initials: initials,
                    score: 0,
                }
            }
            console.log(finalScore);
            var allScores = localStorage.getItem("allScores");
            if (allScores === null) {
                allScores = [];
            } else {
                allScores = JSON.parse(allScores);
            }
            allScores.push(finalScore);
            var newScore = JSON.stringify(allScores);
            localStorage.setItem("allScores", newScore);
            // highscore link
            window.location.replace("./highscore.html");
        }
    });

}