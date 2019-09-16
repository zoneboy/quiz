

//We select all elements here
const start = document.getElementById('start');
const quiz = document.getElementById('quiz');
const question = document.getElementById('question');
const qImg = document.getElementById('qImg');
const choiceA = document.getElementById('A');
const choiceB = document.getElementById('B');
const choiceC = document.getElementById('C');
const counter = document.getElementById('counter');
const timeGauge = document.getElementById('timeGauge');
const progress = document.getElementById('progress');
const scoreDiv = document.getElementById('scoreContainer');
// const scoreDiv = document.getElementById('mymodal');

//We create questions here. Array of objects
//The array will have the property and value
let questions = [//The checkanswer() function check if the option selected is equal to the value of correct property
	{
		question: "The bumps on a tiger tongue is called?",
		imgSrc: "img/tiger.jpg",
		choiceA: "Papillae",
		choiceB: "Spines",
		choiceC: "Razeiea",
		correct: "A"
	},
	{
		question: "The largest island is the world is?",
		imgSrc: "img/greenland.jpg",
		choiceA: "Iceland",
		choiceB: "Great Britain",
		choiceC: "Greenland",
		correct: "C"
	},
	{
		question: "What is the Chinese currency?",
		imgSrc: "img/currency.jpg",
		choiceA: "Yen",
		choiceB: "Yuan",
		choiceC: "Waua",
		correct: "B"
	},
	{
		question: "Aeroplane was invented by?",
		imgSrc: "img/plane.jpg",
		choiceA: "Orville brothers",
		choiceB: "Wright brothers",
		choiceC: "Aldrin",
		correct: "B"
	},
	{
		question: "What is the correct spelling?",
		imgSrc: "img/fridge.jpg",
		choiceA: "Refrigerator",
		choiceB: "Refridgerator",
		choiceC: "Refredgerator",
		correct: "A"
	}

];


// Create some variables
// questions is an array of 3 data. But you know that when we want to access the
// array index, it will be 2 because array starts from 0,1,2. So to replicate that,
// we will do questions.length - 1.
const lastQuestion = questions.length - 1;
//This is the present question the user is answering
// That is how we keep track of the running question
let runningQuestion = 0;

//render a question function

function renderQuestion() {//This is the same as let q = questions[0]; Remember you already said
	let q = questions[runningQuestion]; //runningQuestions should equal 0.
	

	// Now, you are setting the innerHTML of the question div to the question property of the array
	 question.innerHTML = "<p>" + q.question + "</p>"; //You are saying questions[0].question.
	 qImg.innerHTML = "<img src="+ q.imgSrc +">";// We set image src to the current image in the array
	 choiceA.innerHTML = q.choiceA; // We are saying the same here. ChoiceA div should equal
	 choiceB.innerHTML = q.choiceB; // q.choiceA which is the same as questions[0].choiceA. 
	 choiceC.innerHTML = q.choiceC; // The same goes for the rest.
}


//The function that shows the progress logo. Those circles
function renderProgress() {// A forloop. When qIndex is less than or equal to lastQuestion it should implement the below codes 
	for(let qIndex = 0; qIndex <= lastQuestion; qIndex++) { //lastQuestion is declared above as the questions.length.
		progress.innerHTML += "<div class='prog' id="+ qIndex +"></div>"; // x= x+y is same as x += y is the same as below
		// progress.innerHTML = progress.innerHTML + "<div class='prog' id="+ qIndex +"></div>";
		//Once the loop works, we add the prog div class to the progress div
	}	
}


//This is the counter render
let count = 0; // We set count to zero
const questionTime = 10; //10s is the time for each question
const gaugeWidth = 150; // This is the gauge width in pixels 150
const gaugeUnit = gaugeWidth / questionTime; // The gauge unit is 150/10 which is 15. It means the time will move at rate of 15units per second
let timer;//Timer interval
let score = 0;
function renderCounter() { 
	if(count <= questionTime){//We say if count(0) is less than or equal to questionTime(10).
		counter.innerHTML = count;//  We should add count(0) to the counter div
		timeGauge.style.width = count * gaugeUnit + "px"; // Then the timeGauge id width should be count 0 * gaugeUnit(15) plus px. 
		count++; // We then increment by 1.
	} else {
		count = 0; //if the question is greater than questionTime(10), turn count to zero
		answerIsWrong(); //This will change the progress bar(that circles) to red if user don't answer question and automatically move to next question
		if(runningQuestion < lastQuestion){ //This is the counter. We want it to automatically move to the next
		runningQuestion++; //question if the user did not choose any question and it will also record it as wrong.
		renderQuestion(); 
		} else {
			clearInterval(timer);// If the whole question has been answered, we clear interval. CLear the timer
			scoreRender();// We then display the score
		}
	} 
}

//We hide the start page and then render the question then we display the quiz since we already hide it
//Start quiz function //We called all the other functions in here on how they should behave after you click the start button.
function startQuiz() {
	start.style.display ="none";
	renderQuestion();
	quiz.style.display ="block"	
	renderProgress();
	renderCounter();
	timer = setInterval(renderCounter, 1000);// We set the interval to work at every 1seconds
	//The pixels up make the timeGauge colour move with the counter 1000ms = 1s
}

start.addEventListener('click', startQuiz);

function answerIsCorrect() {
	document.getElementById(runningQuestion).style.backgroundColor="#0f0";
}
function answerIsWrong() {
	document.getElementById(runningQuestion).style.backgroundColor="#f00";
}
//This is the function to get the correct answer
function checkAnswer(answer) {//We selected
	if (answer == questions[runningQuestion].correct){// We check if the answer is equal to the correct property in the array
		score++; // If it is equal, we add 1 to the score
		answerIsCorrect();// If answer is correct, we add a background color of green to the question progress
	} else {
		answerIsWrong();// If answer is wrong, we add a background color of red to the question progress
		
	} count = 0; //We set counter to zero after answering question
	if(runningQuestion < lastQuestion){ // If the running question is less than last question, it should display the next 
		runningQuestion++; // question. This is how we move to the next question after selecting our option.
		renderQuestion(); // Once we click on our chosen answer, we runningQuestion to increment by 1 and then renderQuestion.
	}  else { // If the whole question has been answered, we clear interval. CLear the timer
		clearInterval(timer); 
		scoreRender(); // We then render the score. Display the result.
	}
}

// This function redirects back to homepage
// It is different from window.location.href because it doesn't store the history of the url. Therefore you can't go back to the lastpage
function scoreClose() {
	window.location.replace("index.html");
}
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calculate the amount of question percent answered by the user
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // choose the image based on the scorePerCent
    let img = (scorePerCent >= 80) ? "img/5.png" :
              (scorePerCent >= 60) ? "img/4.png" :
              (scorePerCent >= 40) ? "img/3.png" :
              (scorePerCent >= 20) ? "img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    //The event listener for the result. It redirect to the homepage
    scoreDiv.addEventListener('click', scoreClose );
}






