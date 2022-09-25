// https://api.nasa.gov/
// This program is inspired by the .gov website "APOD"
// My version will expand on this project by adding buttons
// Button 1: Daily Picture
// Button 2: Random Picture
// Button 3: Date Selected Picture
// 

// Adding the API        
var nasaApiKey = "x8HXASqo7aFvIXOyyhkLYdjuuBCBOUbSjoQluicq"

var baseUrl = `https://api.nasa.gov/planetary/apod?api_key=x8HXASqo7aFvIXOyyhkLYdjuuBCBOUbSjoQluicq&date=`


// Functions

function spaceDateImg(decision) {

  var theDate = ''


  if (decision == 'userInput') {
    // check user input error? invalid date before 6/16/1995
    // console.log(document.querySelector('input'))
    var userDate = document.querySelector('input').value
    // EX: userDate = "2022-05-07" 
    // We want to split it up, so that we can plug into new Date() obj 
    // to compare to another Date() obj l8r
    // .substring treats the string as if it were an array w/ a char position
    var yyyy = parseInt(userDate.substring(0, 4));
    var mm = parseInt(userDate.substring(5, 7));
    var dd = parseInt(userDate.substring(8, 10));
    // Date() requires Jan 0 
    // console.log(yyyy);
    var inputDate = new Date(yyyy, mm - 1, dd);
    earliestDate = new Date(1995, 5, 16)

    // if input date < earliest date alert user to put in valid date
    // stop everything
    // shout out to codegrepper.com
    if (inputDate < earliestDate) {
      alert('Please use date after June 15, 1995!')
      return;
    }

    // declare date after making the check
    theDate = document.querySelector('input').value
  }

  else if (decision == 'random') {
    // declare random  (Jan starts 0 - June 5)
    // google is my friend

    earliestDate = new Date(1995, 5, 16)
    today = new Date()

    // randomDate is still a date object because it's conversing with new Date()
    // codegrepper.com
    randomDate = new Date(earliestDate.getTime() + Math.random() * (today.getTime() - earliestDate.getTime()))
    //and now you can do getMonth, getFullYear, getDate
    theDate = randomDate.getFullYear() + '-' + (randomDate.getMonth() + 1) + '-' + randomDate.getDate();

    // console.log(theDate);
  }

  else if (decision == 'today') {
    // declare today  

    today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //As January is 0.
    var yyyy = today.getFullYear();
    theDate = yyyy + "-" + mm + "-" + dd;

  }

  // once the date is declared then we can add it to the URL
  // for use in the fetch
  var datebaseUrl = baseUrl + theDate

  // console.log(baseUrl);
  // https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch

  fetch(datebaseUrl)
    .then(res => res.json())
    .then(data => {

      var imgTitle = data.title
      var spaceImg = data.hdurl
      var spaceDesc = data.explanation
      var copyrightData = data.copyright

      // Get all the parts and display them here: 
      document.getElementById("details").style.display = "block";

      // document.getElementById('copyrightInfo').innerHTML = copyrightData
      document.getElementById('titleInfo').innerHTML = imgTitle
      document.getElementById('spaceImg').src = spaceImg
      document.getElementById('descInfo').innerHTML = spaceDesc
      document.getElementById('dateInfo').innerHTML = theDate

      console.log(copyrightData);
    })

}

