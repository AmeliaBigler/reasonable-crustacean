// Wrap all code that interacts with the DOM in a call to jQuery to ensure that
// the code isn't run until the browser has finished rendering all the elements
// in the html.
$(function () {
  var today = dayjs();
  // TODO: Add a listener for click events on the save button. This code should
  // use the id in the containing time-block as a key to save the user input in
  // local storage. HINT: What does `this` reference in the click listener
  // function? How can DOM traversal be used to get the "hour-x" id of the
  // time-block containing the button that was clicked? How might the id be
  // useful when saving the description in local storage?
  var saveButton = $(".saveBtn")

  saveButton.on('click', function(){
    console.log($(this).siblings('.description')[0].value); //test
    console.log($(this).parent()[0].id); //test
    var event = {
      event: $(this).siblings('.description')[0].value,
      location: $(this).parent()[0].id,
    };

    localStorage.setItem("event", JSON.stringify(event));
    renderEvent();
  })

  // Code to apply the past, present, or future class to each time-block by comparing the id to the current hour.
  var currentHour = today.format('H');

  // object containing children of hours div
  var hours = $('#hours').children();

  hours.each(function(index, element){ 
    if ((parseInt(currentHour) - 8) > index) {
      $(element).addClass('past')
    } 
    else if ((parseInt(currentHour) - 8) === index) {
      $(element).addClass('present')
    }
    else {
      $(element).addClass('future')
    };
  })

  // TODO: Add code to get any user input that was saved in localStorage and set
  // the values of the corresponding textarea elements. HINT: How can the id
  // attribute of each time-block be used to do this?
  function renderEvent(){
    var savedEvent = JSON.parse(localStorage.getItem("event"))
    // if (savedEvent !== null) {
    //   $("savedEvent.location.descrition").textContent = savedEvent.event
    // }
    console.log(savedEvent);
  }

  // Display the current date in the header of the page.
  $("#currentDay").text(today.format("MMM D, YYYY"));
});
