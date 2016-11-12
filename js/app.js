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

    // Add ingredients to the pantry, create new type if needed
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

    var Worker = function(name) {
        this.name = name;
        this.customers = {};
    }
    Worker.prototype.addCustomer = function(customer) {
        this.customers[customer.name] = customer;
    };

    Worker.prototype.greetCustomer = function(customer) {
        if (this.customers[customer.name]) {
            console.log("found customer");
        } else {
            this.customers[customer.name] = customer;
        }
    };

    var Drink = function(name, ingredients) {
        this.name = name;
        this.ingredients = ingredients;
    }

    var Bartender = function(name) {
        Worker.call(this, name);
        this.questions = [];
    }

    Bartender.prototype = Object.create(Worker.prototype);
    Bartender.prototype.constructor = Bartender;

    Bartender.prototype.addQuestion = function(question) {
        this.questions.push(question);
    }

    Bartender.prototype.makeDrink = function(name, preferences) {
        var ingredients = []
        for (var i = 0; i < preferences.length; i++) {
            ingredients.push(pantry.getIngredient(preferences[i]));
        }
        console.log(ingredients);
        var drinkName = this.nameDrink();

        var drink = new Drink(drinkName, ingredients);
        console.log(this.customers);
        this.customers[name] = drink;
        console.log(drink)
        return drink;
    }

    Bartender.prototype.nameDrink = function(ingredients) {
        var adjectiveIndex = random(drinkAdj.length);
        var nounIndex = random(drinkNouns.length);
        var drinkName = drinkAdj[adjectiveIndex] + " " + drinkNouns[nounIndex];
        console.log(drinkName)
        return drinkName;
    };


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
    console.log(ryan)

    // Random number generator
    //function random(max) {
    //    return Math.floor(Math.random() * max);
    //};
    var random = max => Math.floor(Math.random() * max);



    // ask user for name when order drink is clicked
    $(document).on('click', '.order-drink', function(event) {
        $('.intro').addClass("hidden");
        $('.enter-name').removeClass("hidden");
        $('#customerName').val("");
    });

    // capture name on input and display drink questions
    $(document).on('submit', '#form-name', function(event) {
        event.preventDefault();
        let customerName = $('#customer-name').val();
        guest = new Customer(customerName);
        ryan.greetCustomer(guest);
        // if you know the customer, serve their drink
        // else askQuestions
        askQuestions();
        $('.enter-name').addClass('hidden');
        console.log(customerName);
    });
    var count = 0;
    var guest;

    // ask questions about drink type
    function askQuestions() {
        $(".questions-form").empty();
        if (count < ryan.questions.length) {
            let displayQuestion = "<label for='userpref'>" + ryan.questions[count].question + "</label>";
            let answer = "<br><select id='userpref'><option value='yes'>Aye! That sounds great.</option><option value='no'>Nay, none of that.</option></select>";
            let nextQuestion = "<br><button id='nextQuestion' type='button' class='btn btn-success'>Next</button>";
            $(".questions-form").append(displayQuestion, answer, nextQuestion);
        } else {
            var submitOrder = "<button type='submit' class='btn btn-order' id='submitOrder'>Make drink</button>";
            $(".questions-form").append(submitOrder);
        }
    };

    $(document).on("click", "#nextQuestion", function() {
        if ($("#userpref").val() === "yes") {
            guest.preferences.push(ryan.questions[count].property);
            console.log(guest.preferences);
        }
        count++;
        askQuestions();
    });

    $(document).on('click', '#submitOrder', function(event) {
        event.preventDefault();
        if (guest.preferences.length === 0) {
            alert("We don't serve water");
            $('.questions-form').addClass("hidden");
            $(".results").append("<button class='btn btn-order start-over'>Start Over</button>");
        } else {
            var drink = ryan.makeDrink(guest.name, guest.preferences)
            displayDrink(drink);
            $('.questions-form').addClass("hidden");
            $(".results").append("<button class='btn btn-order start-over'>Start Over</button>");
        }
    });

    function displayDrink(drink) {
        $(".results").append("<h3>Here is your: " + drink.name + "</h3>");
        $(".results").append("<h5>It contains: " + drink.ingredients.join(", ") + "</h5>");
    }

    $(document).on('click', '.start-over', function(event) {
        event.preventDefault();
        $(".results").empty();
        $(".questions-form").empty();
        $('.intro').removeClass("hidden");
        $('.questions-form').removeClass('hidden');
    });

}); // end of doc ready

// TODO
// don't provide questions if you know the customer, serve drinks
