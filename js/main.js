// testing js
console.log("Hello JS");

// VARIABLES DECLARATION/SELECTION

// REGISTRATION VARIABLES
let regDiv = document.querySelector(".register-div");
let regBtn = document.querySelector(".register-btn");
let gotoLogin = document.querySelector(".go-to-login span");
let userEmailReg = document.getElementById("userEmailReg");
let firstName = document.getElementById("fName");
let lastName = document.getElementById("lName");
let userName = document.getElementById("userNameReg");
let userPassReg = document.getElementById("userPassReg");
let userRePass = document.getElementById("rePass");

// LOGIN VARIABLES
let loginDiv = document.querySelector(".login-div");
let loginBtn = document.querySelector(".login-btn");
let gotoRegister = document.querySelector(".go-to-register span");
let userEmailLogin = document.getElementById("userEmailLogin");
let userPassLogin = document.getElementById("userPassLogin");

// POST LOGIN VARIABLES
let loggedInDiv = document.querySelector(".logged-in");
let welcomeUser = document.querySelector(".logged-in span");

// LOAD ALL REGISTERED USERS ONCE PAGE LOADS
window.onload = () => {
  // let storedEmails = JSON.parse(localStorage.getItem("storedEmails"));
  let storedEmails = JSON.parse(localStorage.getItem("storedEmails"));
  let storedDetails = JSON.parse(localStorage.getItem("storedDetails"));
  // let storedDetails = localStorage.getItem("storedDetails");
  console.log(storedEmails.constructor);
  console.log(storedDetails.constructor);

  for (let i = 0; i < storedEmails.length; i++) {
    usersId.push(storedEmails[i]);
    usersInfo.push(storedDetails[i]);
  }
};

// SWITCH BETWEEN LOGIN AND REGISTER SCREEN
gotoLogin.onclick = () => {
  regDiv.style.transform = "scale(0)";
  loginDiv.style.transform = "scale(1)";
};

gotoRegister.onclick = () => {
  loginDiv.style.transform = "scale(0)";
  regDiv.style.transform = "scale(1)";
};

// DETAILS OF REGISTERED USERS
const usersId = []; // "ilami@example.com"
const usersInfo = [];

class userDetails {
  constructor(email, fName, lName, username, password, dateOfBirth) {
    this.email = email;
    this.fName = fName;
    this.lName = lName;
    this.username = username;
    this.password = password;
    this.dateOfBirth = dateOfBirth;
  }
}

// REGISTERED BUTTON CLICKED TO REGISTER NEW USERS
regBtn.onclick = () => {
  if (
    userEmailReg.value == "" ||
    firstName.value == "" ||
    lastName.value == "" ||
    userName.value == "" ||
    userPassReg.value == "" ||
    userRePass.value == ""
  ) {
    alert("Some fields are empty!");
  } else {
    if (userPassReg.value != userRePass.value) {
      alert("Passwords do not match!");
    } else {
      if (usersId.includes(userEmailReg.value)) {
        alert("Email address already registered. Please login");
      } else {
        let newUser = new userDetails(
          userEmailReg.value,
          firstName.value,
          lastName.value,
          userName.value,
          userPassReg.value
        );
        usersInfo.push(newUser);
        usersId.push(newUser.email);
        // localStorage.setItem("storedEmails", usersId);
        // JSON.stringify(localStorage.setItem("storedEmails", usersId));
        localStorage.setItem("storedEmails", JSON.stringify(usersId));
        // localStorage.setItem("storedDetails", usersInfo);
        // JSON.stringify(localStorage.setItem("storedDetails", usersInfo));
        localStorage.setItem("storedDetails", JSON.stringify(usersInfo));
        alert("Regsitration Successful");
        ClearForm("reg");
        regDiv.style.transform = "scale(0)";
        loginDiv.style.transform = "scale(1)";
      }
      console.log(usersInfo);
      console.log(usersId);
    }
  }
};

// CLEAR OUT THE REGISTRATION FORM AFTER REGISTRATION SUCCESSFUL
let ClearForm = (form) => {
  if (form == "reg") {
    userEmailReg.value = "";
    firstName.value = "";
    lastName.value = "";
    userName.value = "";
    userPassReg.value = "";
    userRePass.value = "";
  } else {
    userEmailLogin.value == "";
    userPassLogin.value == "";
  }
};

loginBtn.onclick = () => {
  if (userEmailLogin.value == "" || userPassLogin.value == "") {
    alert("Some fields are empty!");
  } else {
    if (usersId.includes(userEmailLogin.value)) {
      let userIndex = usersId.indexOf(userEmailLogin.value);
      let correctPass = usersInfo[userIndex].password;
      console.log(userIndex);
      console.log(correctPass);
      if (userPassLogin.value == correctPass) {
        alert("Login Successful");
        ClearForm("login");
        loginDiv.style.transform = "scale(0)";
        welcomeUser.innerHTML = usersInfo[userIndex].fName;
        loggedInDiv.style.display = "flex";
      } else {
        alert("Incorrect Password");
      }
    } else {
      alert("This email is not registerd");
    }
  }
};
