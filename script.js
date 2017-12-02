var levels = Object.keys(data); // = ["Level 01", "Level 02", "Level 03"] 
var questions; // Could be = [ {"capital": "Amsterdam", "country": "Netherlands"}, {"capital": "Athens", "country": "Greece"} ]
var curQuestion; // Could be = {"capital": "Amsterdam", "country": "Netherlands"}

$(document).ready(function() {
  loadLevel(levels[0]);
  for (var i = 0; i < levels.length; i++) {
    $('.levels').append('<div class="button" data="'+levels[i]+'">'+levels[i]+'</div>');
  }
  $('.levels .button').click(function() {
    console.log("Click", $(this).attr('data'))
    loadLevel($(this).attr('data'));
  })
})

// Takes into parameter a key (ex: "Level 01"), set questions to a list of questions
function loadLevel(level) {
  questions = data[level];
  displayRandomQuestion();
}

// Select a random "curQuestion" in "questions" and update the DOM to display it
function displayRandomQuestion() {
  if (questions.length === 0)
    return;
  curQuestion = questions[Math.floor(Math.random()*questions.length)];
  $('.country').text(curQuestion.country);
  $('.capital').text("");
  $('.next-step').text("Show Answer");
  $('.next-step').off();
  $('.next-step').click(function() {
    displayAnswer();
  })
}

// Change to DOM to display the answer that is in "curQuestion"
function displayAnswer() {
  $('.capital').text(curQuestion.capital);
  $('.next-step').text("Next question");
  $('.next-step').off();
  $('.next-step').click(function() {
    displayRandomQuestion();
  })
}

