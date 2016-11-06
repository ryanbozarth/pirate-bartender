$(function() {

var Question = function(question, property){
  this.question = question;
  this.property = property;
};

function Ingredient(name, type){
  this.type = type;
  this.name = name;
}

function Pantry(name){
  this.name = name;
  this.contents = {};
}

Pantry.prototype.addIngredient = function(ingredient){
  if (this.contents[ingredient.type]){
    this.contents[ingredient.type].push(ingredient.name);
  } else {
    this.contents[ingredient.type] = [ingredient.name];
  }
}

Pantry.prototype.getAllIngredients = function(type){
  return this.contents[type];
}

Pantry.prototype.getIngredient = function(type){
  var numIngredients = this.contents = this.contents[type].length;
  var random = Math.floor(Math.random() * numIngredients);
  return this.contents[type][random];
}

var Worker = function(name){
  this.name = name;
  this.questions = []
  this.customers = [];
}

Worker.prototype.who = function(){
    alert("My name is " + this.name);
}

Worker.prototype.greet = function(){
  var name = prompt("So, what's your name?");
  if(this.custoomers[name]){
    alert ("Welcome back " + name);
    alert("Here is your favorite" + this.customers[name].favorite)
  } else {
    var newCustomer = Customer(name);
    this.customers[name] == newCustomer;
  }
}

var Bartender = function (name){
  Worker.call(this.name);
  this.questions = []
}

Bartender.prototype = Object.create(Worker.prototype);
Bartender.prototype.constructor = Bartender;

Bartender.prototype.askQuestions = function(question){
  this.questions.push(question)
}
var bar = new Bartender('bar');
// var chef = new Chef('chef');
// var mypantry = new mypantry('pantry');

// Pantry.addIngredient(new Ingredient('sugar', 'sweet'));
// Pantry.addIngredient(new Ingredient('salt', 'salty'));
// Pantry.addIngredient(new Ingredient('agave', 'sweet'));

function addQuestion(question){
  this.questions.push(question)
}

var newQuestion = new Question('Do you like yer drinks strong?', 'strong')
addQuestion(newQuestion);
var newQuestion = new Question('Do ye like it with a salty tang?', 'salty')
addQuestion(newQuestion);
var newQuestion = new Question('Are ye a lubber who likes it bitter?', 'bitter')
addQuestion(newQuestion);
var newQuestion = new Question('Would ye like a bit of sweetness with yer poison?', 'sweet')
addQuestion(newQuestion);
var newQuestion = new Question('Are ye one for a fruity finish?', 'fruity')
addQuestion(newQuestion);


var Customer = function(name, drink){
  this.name = name;
  this.favorite = drink;
}

var Drink = function(name, ingredients){
  // array of the ingredients object
}

$('.order-drink').click(function(){
  worker = "bar";
  // can I use just Bartender above
  $('.intro').addClass("hidden");
  $('.enter-name').removeClass("hidden");
    // bar.asksQuestions();
});

nameForm();
function nameForm() {
  $('.btn_name').on('click', function(event){
    event.preventDefault();
    var customerName = $('#customer-name').val();
    console.log(customerName);
    if(customerName.length === 0){
      alert("Please enter a name!")
    };
    $('.enter-name').addClass('hidden');
    askQuestions();
  });
};
  // hide after name submitted

  function askQuestions(){
      var html = "";
      for (var i=0; i < this.questions.length; i++)  {
      html += this.questions[i].question;
      html += "<input type='checkbox' class='option' name='preference'";
      html += "value='" + this.questions[i].property + "'<br/><br/>";
      }
      html += "<input type='submit' class='btn btn-preferences' value='Submit Order'>";
      $('.questions-form').html(html);
      console.log(questions);
  };

// init();
// function init(){
//   BartenderAsks.push(Questions);
//   People.push(Worker);
//   console.log(Questions);
//   console.log(Worker);
// };
//
// start();
// function start(){
//   $('.start').click(function() {
//     $('.welcome').hide();
//     $('.start').hide();
//     askQuestion();
//   });
//
// };






}); // end of doc ready
