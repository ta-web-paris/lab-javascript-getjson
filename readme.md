# Lab JavaScript | Manipulate data

## Introduction
Welcome on this sample project that use data separated in many files. 

**The project is quite simple : it's a quiz where you should give the capital of a country. The user can select a level of difficulties in the top of the screen.**

![](https://i.imgur.com/1P8184C.png)
![](https://i.imgur.com/ZDUWqB2.png)

## Explanation of the code
The project is split into multiple files:
- `index.html`: The HTML file
- `style.css`: The CSS
- `script.js`:  The JavaScript
- `data`: The folder with all the data 
  - `init.js`: The first file to include that will initiliaze the global variable `data` 
  - `level01.js`: The level 01 file
  - `level02.js`: The level 02 file
  - `level03.js`: The level 03 file

If you look on the `index.html` file, multiple JavaScript files included and the order is important:
```html
<script src="https://code.jquery.com/jquery-3.2.1.min.js" integrity="sha256-hwg4gsxgFZhOsEEamdOYGBf13FyQuiTwlAQgxVSNgt4=" crossorigin="anonymous"></script>
<script src="data/init.js"></script>
<script src="data/level01.js"></script>
<script src="data/level02.js"></script>
<script src="data/level03.js"></script>
<script src="script.js"></script>
```

All the files in the `data/` folder are here to create and construct a global variable `data` that is a object where each key is the name of the level and where each value is an array of questions. It looks like this:
```json
{
  "Level 01": [
    {"capital": "Amsterdam", "country": "Netherlands"},
    {"capital": "Athens", "country": "Greece"},
    ...
  ],
  "Level 02": [
    {"capital": "Andorra la Vella", "country": "Andorra"},
    {"capital": "Ankara", "country": "Turkey"},
    ...
  ],
  "Level 03": [
    {"capital": "Abu Dhabi", "country": "United Arab Emirates"},
    {"capital": "Abuja", "country": "Nigeria"},
    ...
  ]
}
```

Inside the `script.js` file, there is 3 other variables:
- `levels`: Represents the keys of `data`. It's equal to `["Level 01", "Level 02", "Level 03"]`
- `questions`: Reprensents the values of all questions in the current level. It could be `[ {"capital": "Amsterdam", "country": "Netherlands"}, {"capital": "Athens", "country": "Greece"} ]`
- `curQuestion`: Reprensents the current question. It could be `{"capital": "Amsterdam", "country": "Netherlands"}`


```js
// script.js

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
```


## Some tools to generate JSON
- Export Sheet Data: https://chrome.google.com/webstore/detail/export-sheet-data/bfdcopkbamihhchdnjghdknibmcnfplk?hl=en 
- JSON Generator: https://next.json-generator.com/