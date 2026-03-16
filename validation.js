// Validates form data on the server side before processing.
export function validateForm(data) {
  console.log("Server side validation happens here");
  console.log(data);


const errors = [];

// Validate first name
  if (data.fname.trim() == "") {
    errors.push("First name is required.");
    
  }

  console.log(errors);

  // Validates last name 
  if (data.lname.trim() == "") {
    errors.push("Last name is required");
  }

// Validates meet options
const validMeet = ['group-meets', 'linkeldn meet', 'other-meet'];
if (!validMeet.includes(data.meet)) {
    errors.push("Please select an option");
  }

if (data.mailingList === 'on' && !['html', 'text'].includes(data.format)) {
  errors.push("Please select an email format");
}

  return {
    isValid: errors.length === 0,
    errors
  };
}

