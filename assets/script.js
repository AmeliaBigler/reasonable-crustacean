// call to jQuery ensures that the code isn't run until the browser has finished rendering all html.
$(function () {
  var today = dayjs();

  var saveButton = $(".saveBtn")
  var clearButton = $(".clearBtn")
  var eventArray = [];
  // this if statement allows localStorage to persist upon window refresh:
  if (!localStorage.getItem('eventArray')){
    localStorage.setItem("eventArray", JSON.stringify(eventArray));
  }

  clearButton.on('click', function(){
    if (confirm("Do you want to clear all saved text?") === true) {
      var clearEventArray = [];
      localStorage.setItem("eventArray", JSON.stringify(clearEventArray));
      location.reload();
    }
  })

  saveButton.on('click', function(){
    var event = {
      event: $(this).siblings('.description')[0].value,
      location: $(this).parent()[0].id,
    };

    localStorage.setItem("event", JSON.stringify(event));

    renderEvent();
  })

  // apply past/present/future class to each time-block by comparing the id to the current hour.
  var currentHour = dayjs().format('H');

  // object containing children of hours div
  var hours = $('#hours').children();
  function setClass() {
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
  }
  setClass();

  // interval runs every 5 seconds
  setInterval(function(){
    var updateHour = dayjs().format('H');
    if (updateHour !== currentHour) {
      $("#hours").children().removeClass('past present future'); 
      currentHour = dayjs().format('H');
      setClass();
    }
    var updateDay = dayjs();
    if (updateDay.format('D') !== today.format('D')) {
      today = dayjs();
      $("#currentDay").text(today.format("MMM D, YYYY"));
    }
  }, 5000);

  // get user input that was saved in localStorage and set values of corresponding textarea elements. 
  function renderEvent(){
    var savedEvent = JSON.parse(localStorage.getItem("event"));
    var eventArray = JSON.parse(localStorage.getItem("eventArray"));

    if (savedEvent !== null) {
      eventArray.push(savedEvent);
      localStorage.setItem("eventArray", JSON.stringify(eventArray));
      localStorage.setItem("event", null);
    }
  
    if (eventArray !== null){
      var eventArray = JSON.parse(localStorage.getItem("eventArray"));
      for (var i = 0; i<eventArray.length; i++){
        $('#'+eventArray[i].location+'').children('.description')[0].value = eventArray[i].event;
      }
    } 

  }

  renderEvent();

  // display the current date in the header of the page.
  $("#currentDay").text(today.format("MMM D, YYYY"));
});
