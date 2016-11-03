$(function() {

Welcome();
function Welcome() {
  $('.btn_welcome').on('click', function(event){
    event.preventDefault();
    var CustomerName = $('#customer-name').val();
    console.log(CustomerName);
  $('.intro').remove();
  });
}

function CheckName(CustomerName) {

}

function Customers(name, drink, food) {
  this.name = name;
  this.drink = drink;
  this.food = food;
}

function Ingredient(name, type) {
  this.name = name;
  this.type = type;
}

function Pantry(name){
  this.name = name;
  this.contents = {
    strong: [],
    salty: [],
    bitter:[],
    sweet: [],
    fruit: []
  };
}

Pantry.prototype.addIngredient = function(ingredient) {
  if (!this.contents[ingredient.type]) {
    this.contents[ingredient.type] = [ingredient.name];
  } else {
    this.contents[ingredient.type].push(ingredient.name);
  }
}

//
// var Questions = [{
//   prompt: 'Do ye like yer drinks strong?',
//   key: 'strong',
//   answers: ['yes', 'no']
// },
// {
//   prompt: 'Do ye like it with a salty tang?',
//   key: 'salt',
//   answers: ['yes', 'no']
// },
// {
//   prompt: 'Are ye a lubber who likes it bitter?',
//   key: 'bitter',
//   answers: ['yes', 'no']
// },
// {
//   prompt: 'Would ye like a bit of sweetness with yer poison?',
//   key: 'sweet',
//   answers: ['yes', 'no']
// },
// {
//   prompt: 'Are ye one for a fruity finish?',
//   key: 'fruit',
//   answers: ['yes', 'no']
// }]
// var Worker = [{
//   name: 'Bartender'
// }]
//
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
// function askQuestion() {
//   for (BartenderAsks = 0; BartenderAsks < Questions.length; i++)
//     $('.questions').removeClass('hidden').append(Questions[BartenderAsks].prompt).append(Questions[BartenderAsks].answers);
//     // add one to questions counter
// }
// // function AskQuestions(){
// //     for(var i=0; i < BartenderAsks.length; i++)  {
// //     // push questions into the question array
// //     // // }
// // };



}); // end of doc ready
