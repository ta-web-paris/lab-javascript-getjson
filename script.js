var questions;
var curQuestion;
var levels = [
  'level01.json',
  'level02.json',
  'level03.json'
];

$(document).ready(function() {
  loadLevel(levels[0]);
  for (var i = 0; i < levels.length; i++) {
    $('.levels').append('<div class="button" data="'+levels[i]+'">'+levels[i]+'</div>');
  }
  $('.levels .button').click(function() {
    loadLevel($(this).attr('data'));
  })
})

function loadLevel(jsonFilename) {
  console.log("loadLevel", jsonFilename)
  $.getJSON('data/'+jsonFilename, function(data) {
    console.log(data)
    questions = data;
    displayRandomQuestion();
  });
}

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

function displayAnswer() {
  $('.capital').text(curQuestion.capital);
  $('.next-step').text("Next question");
  $('.next-step').off();
  $('.next-step').click(function() {
    displayRandomQuestion();
  })
}

