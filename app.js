$(function() {

    // Define contstructors
    var Question = function(question, property) {
        this.question = question;
        this.property = property;
    };

    var Pantry = function(name) {
        this.name = name;
        this.contents = {};
    }

    // Add ingredients to the pantry, create type if needed
    Pantry.prototype.addIngredient = function(ingredient) {
            if (this.contents[ingredient.type]) {
                this.contents[ingredient.type].push(ingredient.name);
            } else {
                this.contents[ingredient.type] = [ingredient.name];
            }
        }
        // get ingredients from the pantry in order to make drink/food
    Pantry.prototype.getIngredient = function(property) {
        var numIngredients = this.contents[property].length
        var random = Math.floor(Math.random() * numIngredients);
        console.log(random)
        return this.contents[property][random];
    }

    var Ingredient = function(name, type) {
        this.name = name;
        this.type = type;
    }

    var Customer = function(name) {
        this.name = name;
        this.preferences = [];
        this.favorite = {};
    }

    var Worker = function(name, questions, customers) {
        this.name = name;
        this.questions = [];
        this.customers = {};
    }

    var Drink = function (name, ingredients){
        this.name = name;
        this.ingredients = ingredients;
    }

    var Bartender = function(name) {
        this.name = name;
        this.questions = [];
    }

    Bartender.prototype = Object.create(Worker.prototype);
    Bartender.prototype.constructor = Bartender;

    Bartender.prototype.addQuestion = function(question) {
        this.questions.push(question);
    }



    Bartender.prototype.makeDrink = function(preferences){
      var ingredients = []

        for (var i = 0; i < guest.preferences.length; i++) {
            ingredients.push(pantry.getIngredient(guest.preferences[i]));
        }
        // var name = ryan.nameDrink();
        //var drink = new Drink(name, ingredients);
        // this.customers[guest.name] = drink;
        // key is name, value is drink favorite
    }

    // create a new pantry + bartender
    var pantry = new Pantry();
    var ryan = new Bartender("Ryan");

    // define available ingredients
    pantry.addIngredient(new Ingredient('glug of rum', 'strong'));
    pantry.addIngredient(new Ingredient('slug of whisky', 'strong'));
    pantry.addIngredient(new Ingredient('splash of gin', 'strong'));

    pantry.addIngredient(new Ingredient('olive on a stick', 'salty'));
    pantry.addIngredient(new Ingredient('salt-dusted rim', 'salty'));
    pantry.addIngredient(new Ingredient('rasher of bacon', 'salty'));

    pantry.addIngredient(new Ingredient('shake of bitters', 'bitter'));
    pantry.addIngredient(new Ingredient('splash of tonic', 'bitter'));
    pantry.addIngredient(new Ingredient('twist of lemon peel', 'bitter'));

    pantry.addIngredient(new Ingredient('sugar cube', 'sweet'));
    pantry.addIngredient(new Ingredient('spoonful of honey', 'sweet'));
    pantry.addIngredient(new Ingredient('splash of cola', 'sweet'));

    pantry.addIngredient(new Ingredient('slice of orange', 'fruity'));
    pantry.addIngredient(new Ingredient('dash of cassis', 'fruity'));
    pantry.addIngredient(new Ingredient('cherry on top', 'fruity'));

    // define bartender questions
    ryan.addQuestion(new Question("Do ye like yer drinks strong?", "strong"));
    ryan.addQuestion(new Question("Do ye like it with a salty tang?", "salty"));
    ryan.addQuestion(new Question("Are ye a lubber who likes it bitter?", "bitter"));
    ryan.addQuestion(new Question("Would ye like a bit of sweetness with yer poision?", "sweet"));
    ryan.addQuestion(new Question("Are ye one for a fruity finish?", "fruity"));

    var drinkAdj = ["port", "blimey", "thunder", "dead man", "shark bait", "sea legs", "yellow jack"];
    var drinkNouns = ["landlubber", "grog", "crow's nest", "cog", "booty", "sea dog", "scurvy dog", "fathom"];

    console.log(pantry)
    console.log(ryan.questions)

    function random (max) {
      return Math.floor(Math.random() * max);
    };

    // ask user for name when order drink is clicked
    $('.order-drink').click(function() {
        // tell it to grab the bartender
        $('.intro').addClass("hidden");
        $('.enter-name').removeClass("hidden");
    });

    // capture name on input and display drink questions
    $(document).on('submit', '#form-name', function(event) {
        event.preventDefault();
        var customerName = $('#customer-name').val();
        $('.enter-name').addClass('hidden');
        // check if the user has been here before --> serve regular drink
        // var drink = ryan.greetCustomer(customerName)
        // if () {
            //display drinks
            askQuestions();
        // } else {
            // askQuestions();
        // }
        console.log(customerName);
    });

    var count = 0;
    var guest = new Customer("Bill", "", []);

    // ask questions about drink type
    function askQuestions() {
        $(".questions-form").empty();
        if (count < ryan.questions.length) {
            var displayQuestion = "<label for='userpref'>" + ryan.questions[count].question + "</label>";
            var answer = "<select id='userpref'><option value='yes'>Aye!</option><option value='no'>Nay</option></select>";
            var nextQuestion = "<br><button id='nextQuestion' type='button' class='btn btn-success'>Next</button>";
            $(".questions-form").append(displayQuestion, answer, nextQuestion);
        } else {
            var submitOrder = "<button type='submit' class='btn btn-order' id='submitOrder'>Make drink</button>";
            $(".questions-form").append(submitOrder);
        }
    };

    $(document).on("click", "#nextQuestion", function() {
        if ($("#userpref").val() === "yes") {
            guest.preferences.push(ryan.questions[count].property);
        }
        count++;
        askQuestions();
    });

    $(document).on('click', '#submitOrder', function(event) {
        event.preventDefault();
        if (guest.preferences.length === 0) {
            alert("We don't serve water");
        } else {
            // assign preferences with that customer
            var drink = ryan.makeDrink(guest.preferences)
            // guest.preferences == this.preferences
            // bartender should make drink
            nameDrink();


        }
    });

    function nameDrink() {
          var adjectiveIndex = random(drinkAdj.length);
          var nounIndex = random(drinkNouns.length);
          var drinkName = drinkAdj[adjectiveIndex] + " " + drinkNouns[nounIndex];
          return drinkName;
      };

    function displayResults(drink, ingredients){
        $(".results").append("<h3>" + drink + "</h3>");
        $(".results").append("<h5>" + ingredients + "</h5>");
     }

}); // end of doc ready
