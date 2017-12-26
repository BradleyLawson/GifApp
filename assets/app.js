//variables
var animalsArray = ["dog", "cat", "seal", "goldfish", "bird", "chicken", "pygmy goat", "rabbit", "hamster", "turtle", "pig", "frog", "ferret", "hedgehog", "panda", "ape","otter", "rooster"];

var buttonCounter = 0;
// When window loads buttons displayed
//$( document ).ready(function() {
	//loop through array to add buttons
    for(var i = 0; i < animalsArray.length; i++){
    //increasing buttonCounter to give every button specific id  
    buttonCounter++;
		// variable creating buttons
		var animalButtons = $('<button>');
		  // giving variable buttons a class and adding bootstrap classes
		  animalButtons.addClass('animalBtnClass btn btn-primary text-white')
	   	// adding text to buttons of names from animalsArray
	   	animalButtons.text(animalsArray[i]);
      animalButtons.attr("id", "animalButton-" + buttonCounter);
	   	animalButtons.attr("data-animal", animalsArray[i]);
      // appending preceeding to #animalButtons div (adding for view)
    	$('#animalButtons').append(animalButtons);
    }
// Input submit button click
$('#addAnimal').on("click", function(event) {
	// Prevents form from submitting
	event.preventDefault();
	// Capturing user input and storing it in a variable
  buttonCounter++;
	var newAnimal = $('#animal-input').val().trim();
	//console.log(newAnimal);
	// Adding userInput to animalsArray
	animalsArray.push(newAnimal);
  // create newAnimalButton for input animals
	var newAnimalButton = $('<button>');
	//adding class and text to button
    newAnimalButton.addClass('animalBtnClass btn btn-primary text-white').text(newAnimal);
    newAnimalButton.attr("id", "animalButton-" + buttonCounter);
    newAnimalButton.attr("data-animal", newAnimal);
	// adds new button from input to the DOM
  $('#animalButtons').append(newAnimalButton);

});//end of input submit button click function
  
// click event function calling to giphy API
  $(document).on("click", ".animalBtnClass", function() {
    
    $("#animals").empty();
    var animalText = $(this).attr("data-animal")
    // Storing our giphy API URL for a random animal image
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=SggjMfKqId1DSXG3wnUDSJIQDnOsGkBf&q=" + animalText + "&limit=10&offset=0&rating=G&lang=en";

      // AJAX GET request to queryURL
      $.ajax({
        url: queryURL,
        method: "GET"
      })

      // After the data from the AJAX request comes back
      .done(function(response) {
        
        console.log(response);
        // array of images from response
         var animalImageArray = response.data
        
        //loop to go through response array
        for ( var j = 0; j < animalImageArray.length; j++){

          // Saving the image url property
          var animalImage = $("<img>");
          animalImage.attr("alt", "animal image");
          animalImage.attr("src", animalImageArray[j].images.original_still.url);
          animalImage.attr("data-still", animalImageArray[j].images.original_still.url);
          animalImage.attr("data-animate", animalImageArray[j].images.original.url);
          animalImage.attr("data-state", "still");
          animalImage.addClass("gifPictures thumbnail");
          animalImage.css("width", "200px");
          animalImage.css("height", "150px");

          // Saving the rating
          var rating = $('<p>');
          rating.attr("data-source", animalImageArray[j].rating);
          rating.text("Rating: " + animalImageArray[j].rating);
          rating.css("font-weight", "bold");

          // Creating a Div to house img and rating
          var imageAndRatingDiv = $('<div>');
          imageAndRatingDiv.addClass("gifPictures col-md-3");


          // Appending the animalImage to the animals div
          imageAndRatingDiv.append(animalImage);
          imageAndRatingDiv.prepend(rating);

          // Appending img and rating to page
          $('#animals').append(imageAndRatingDiv);


        }// end of for loop

//beginning of click on gif event
  $(".gifPictures").on("click", function() {
      // variable that stores the state the picture is in (either still or animate)
      var state = $(this).attr("data-state");
      // if on click state is still change to animate and update state
      if (state == "still") {
        console.log(state);
        $(this).attr("src", $(this).data("animate"));
        $(this).attr("data-state", 'animate');
      // if on click state is animate change to still and update state  
      } else {
        $(this).attr("src", $(this).data("still"));
        $(this).attr("data-state", 'still');
      }
    });//end of gif click

  });//end of .done function
});// end of function calling giphy API
  
//});// end of document.ready
