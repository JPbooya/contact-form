const form = document.getElementById("contact-form");

/* checks for if checkbox is checked */
function myFunction() {
   
    var boxChecked = document.getElementById("mailing-list");
    var uncheckedBox = document.getElementById("email-format");

    if (boxChecked.checked) {
      uncheckedBox.style.display = "block";
    } else {
      uncheckedBox.style.display = "none";
    }
  }

form.addEventListener('submit', (event) => {
  event.preventDefault();
  let isValid = true;
  console.log("form is submitted");

  const firstName = document.getElementById("fname").value;
  const lastName = document.getElementById("lname").value;
  const meet = document.getElementById("meet").value
  const email = document.getElementById("ename").value;
  const mailingList = document.getElementById("mailing-list").checked;
  const linkedln = document.getElementById("liname").value;
  // regex 
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (firstName.trim() === '') {
    
     /* repeat this for other conditions */
    document.getElementById("err-fname").style.display = "inline";
    isValid = false;
  }

  if (lastName.trim() === '') {
    document.getElementById("err-lname").style.display = "inline";
    isValid = false;
  }
  
  if (meet === "none") {
    document.getElementById("err-meet").style.display = "inline";
    isValid = false;
  }

  if (mailingList === true && email.trim() ==='') {
    document.getElementById("err-mailing").style.display = "inline";
    isValid = false;
  }

  // checks if it has a value and does not pass the validation
  if (email.trim() && !regex.test(email)) {
    document.getElementById("err-mailing").style.display = "inline";
    isValid = false;
  }

  // checks if it has a value and if it does not start with https://linkedin.com/in/
  if (linkedln.trim() && !linkedln.startsWith("https://linkedin.com/in/")) {
    document.getElementById("err-linkedln").style.display = "inline";
    isValid = false;
  }

});