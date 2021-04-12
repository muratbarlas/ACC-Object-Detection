var img;
var detector;
var guessing = false;
var myVid;
var objectResults = [];
var final_results;
var score = 0;
var totalGuesses = 0;
var success = false;


function preload(){
  detector = ml5.objectDetector("cocossd");
}

function setup() {
  
  createCanvas(1000, 800);
  myVid = createCapture(VIDEO, videoLoaded);

  guessButton = select('#guess');
  clearButton = select("#clear");
  guessButton.mousePressed(makeGuess);
  clearButton.mousePressed(clearScreen);


  input = createInput();
  input.position(750, 35);
  inputButton = createButton('submit');
  inputButton.position(input.x + input.width, 35);
  inputButton.mousePressed(updateScore);
  
  inputMissedObj =  createInput();
  inputMissedObj.position(750, 65);
  inputMissedButton = createButton('submit');
  inputMissedButton.position(input.x + input.width, 65);
  inputMissedButton.mousePressed(checkSuccess);
  

  /*
 sel = createSelect();
 sel.position(820, 65);
 sel.option(0);
 sel.option(1);
 sel.option(2);
 sel.option(3);
 sel.option(4);
 sel.option(5);
*/
 
}

function videoLoaded(){
  myVid.size(640, 480);
  myVid.hide();
  detector.detect(myVid, objectsIDed);
}

// callbacks on ml5 functions are error first
function objectsIDed(error, results){
  if(error){
    console.error(error);
  } else {
    // console.log(results);
    objectResults = results;
    // function calling itself is called a recursive function
    detector.detect(myVid, objectsIDed);
  }
}

function draw() {
  background(220);
  image(myVid,50,100);
  push()
  textSize(20);
  text("How many guesses did I get right?", 430, 30)
  text("How many objects were not detected at all?", 350, 60)
  
  text("Score: ", 0, 30)
  text("Total detections: ", 0, 50)
  text(score, 70, 30)
  text(totalGuesses, 150, 50)
  pop()

  if (guessing == true){
    for(var i=0; i<final_results.length; i++){
      var obj = final_results[i];
      // draw bounding box
      push()
      stroke(0,255,0);
      strokeWeight(5);
      noFill();
      rect(obj.x+100, obj.y+100, obj.width, obj.height);
      textSize(32);
      strokeWeight(2);
      text(obj.label, obj.x+100, obj.y+100);
      pop();
    }


  }

  if (success == true){
    //console.log("here");
    for (var i=0; i<20;i++)
      //textSize(20);
      text("🎉", random(50, 640), random(100, 480))
  }
  
}

function makeGuess(){
  guessing = true;
  final_results = objectResults;
  totalGuesses += final_results.length;
}

function clearScreen(){
  guessing = false;
  final_results = [];
  success = false;
}

function updateScore(){
  var num = input.value()
  score += parseInt(num);
  //totalGuesses += final_results.length;
}

function checkSuccess(){
  //console.log(parseInt(inputMissedObj.value()));
  //console.log(parseInt(inputMissedObj.value()));
  if ( parseInt(inputMissedObj.value()) == 0&& final_results.length == parseInt(input.value())){
    success = true;
  }
  
}
