const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const address = document.getElementById("address");
const contactNumber = document.getElementById("contact");
const country = document.getElementById("country");
const gender = document.querySelectorAll(".genderInput");
const message = document.getElementById("message");
const submitBtn = document.getElementById("submit");

// check gender
const validGender = () => {
  let flag;
  let genderM = gender[0].checked;
  let genderF = gender[1].checked;
  if (genderM || genderF) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
};

// check name:
const validName = () => {
  let flag;
  const name = (fullName.value + "").toLowerCase();
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const check0 = format.test(name);
  const check1 = name === "";
  const check2 = /\d/.test(name);
  const check3 = name.length >= 3;
  if (!check0 && !check1 && !check2 && check3) {
    fullName.style.border = "2px solid green";
    flag = true;
  } else {
    fullName.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check email
const validEmail = () => {
  const userEmail = (email.value + "").toLowerCase();
  const regx =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  let check = regx.test(userEmail);
  if (check) {
    email.style.border = "2px solid green";
    flag = true;
  } else {
    email.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check address
const validAddress = () => {
  let flag;
  const userAddress = (address.value + "").toLowerCase();
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const check0 = format.test(userAddress);
  const check1 = userAddress === "";
  const check2 = /\d/.test(userAddress);
  const check3 = userAddress.length >= 3;
  if (!check0 && !check1 && !check2 && check3) {
    address.style.border = "2px solid green";
    flag = true;
  } else {
    address.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check contact Number:
const validContact = () => {
  const contactNum = contactNumber.value + "";
  const regPhone = /^\d{10}$/;
  if (
    contactNum == "" ||
    !regPhone.test(contactNum) ||
    !contactNum.startsWith(9)
  ) {
    contactNumber.style.border = "2px solid red";
    flag = false;
  } else {
    contactNumber.style.border = "2px solid green";
    flag = true;
  }
  return flag;
};

// check country
const validCountry = () => {
  let flag;
  const userCountry = (country.value + "").toLowerCase();
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const check0 = format.test(userCountry);
  const check1 = userCountry === "";
  const check2 = /\d/.test(userCountry);
  const check3 = userCountry.length >= 3;
  if (!check0 && !check1 && !check2 && check3) {
    country.style.border = "2px solid green";
    flag = true;
  } else {
    country.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check message:
const validMessage = () => {
  let flag;
  const msg = (message.value + "").toLowerCase();
  if (msg.length < 100) {
    flag = true;
  } else {
    flag = false;
  }
  return flag;
};

submitBtn.addEventListener("click", (e) => {
  let name = validName();
  let email = validEmail();
  let address = validAddress();
  let contact = validContact();
  let country = validCountry();
  const gender = validGender();
  let message = validMessage();

  let collection = [];
  if (name == false) {
    collection.push("name");
  }
  if (email == false) {
    collection.push("email");
  }
  if (address == false) {
    collection.push("address");
  }
  if (contact == false) {
    collection.push("contact");
  }
  if (country == false) {
    collection.push("country");
  }
  if (gender == false) {
    collection.push("gender");
  }
  if (message == false) {
    collection.push("message");
  }
  let incorrectData = collection.join(", ");
  if (name && email && address && contact && country && gender && message) {
    // alert("You Form has been submitted successfully");
  } else {
    alert(`Invalid ${incorrectData}.`);
    e.preventDefault();
  }
});
