const fullName = document.getElementById("fullName");
const email = document.getElementById("email");
const address = document.getElementById("address");
const contactNumber = document.getElementById("contact");
const selectSocialMedia = document.getElementById("socialMedia");
const dateOfBirth = document.getElementById("dateOfBirth");
const socialMediaProfile = document.getElementById("socialMediaProfile");
const findUsDescription = document.getElementById("findUsDescription");
const country = document.getElementById("country");
const selectGender = document.getElementById("selectGender");
const programCategory = document.getElementById("programCategory");
const programName = document.getElementById("programName");
const dateYouWantStart = document.getElementById("dateYouWantStart");
const durationYouWant = document.getElementById("durationYouWant");
const coveringLetter = document.getElementById("coveringLetter");
const yourExpections = document.getElementById("yourExpections");
const cvResume = document.getElementById("cvResume");
const submit = document.getElementById("submit");

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

// check social media
const validSocialMedia = () => {
  let flag;
  if (selectSocialMedia.value == "") {
    selectSocialMedia.style.border = "2px solid red";
    flag = false;
  } else {
    selectSocialMedia.style.border = "2px solid green";
    flag = true;
  }
  return flag;
};

// check date of birth
const validDateOfBirth = () => {
  let flag;
  if (dateOfBirth.value == "") {
    dateOfBirth.style.border = "2px solid red";
    flag = false;
  } else {
    dateOfBirth.style.border = "2px solid green";
    flag = true;
  }
  return flag;
};

// check social media account
const validSocialMediaProfile = () => {
  let flag;
  const profile = (socialMediaProfile.value + "").toLowerCase();
  const check1 = profile === "";
  if (!check1) {
    socialMediaProfile.style.border = "2px solid green";
    flag = true;
  } else {
    socialMediaProfile.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check find Us Description
const validFindUsDescription = () => {
  let flag;
  const description = (findUsDescription.value + "").toLowerCase();
  const check1 = description === "";
  if (!check1) {
    findUsDescription.style.border = "2px solid green";
    flag = true;
  } else {
    findUsDescription.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check country
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

// check gender
const validGender = () => {
  let flag;
  if (selectGender.value == "") {
    selectGender.style.border = "2px solid red";
    flag = false;
  } else {
    selectGender.style.border = "2px solid green";
    flag = true;
  }
  return flag;
};

// check program category
const validProgramCategory = () => {
  let flag;
  if (programCategory.value == "") {
    programCategory.style.border = "2px solid red";
    flag = false;
  } else {
    programCategory.style.border = "2px solid green";
    flag = true;
  }
  return flag;
};

// check program name
const validProgramName = () => {
  let flag;
  const name = (programName.value + "").toLowerCase();
  var format = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
  const check0 = format.test(name);
  const check1 = name === "";
  const check2 = /\d/.test(name);
  const check3 = name.length >= 2;
  if (!check0 && !check1 && !check2 && check3) {
    programName.style.border = "2px solid green";
    flag = true;
  } else {
    programName.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check date You Want Start
const validDateYouWantStart = () => {
  let flag;
  if (dateYouWantStart.value == "") {
    dateYouWantStart.style.border = "2px solid red";
    flag = false;
  } else {
    dateYouWantStart.style.border = "2px solid green";
    flag = true;
  }
  return flag;
};

// check duration You Want
const validDurationYouWant = () => {
  let flag;
  const duration = durationYouWant.value + "";
  if (duration == "") {
    durationYouWant.style.border = "2px solid red";
    flag = false;
  } else {
    durationYouWant.style.border = "2px solid green";
    flag = true;
  }
  return flag;
};

// check covering Letter
const validCoveringLetter = () => {
  let flag;
  const msg = (coveringLetter.value + "").toLowerCase();
  if (msg.length > 3 && msg.length < 200) {
    coveringLetter.style.border = "2px solid green";
    flag = true;
  } else {
    coveringLetter.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check covering Letter
const validYourExpections = () => {
  let flag;
  const msg = (yourExpections.value + "").toLowerCase();
  if (msg.length > 3 && msg.length < 200) {
    yourExpections.style.border = "2px solid green";
    flag = true;
  } else {
    yourExpections.style.border = "2px solid red";
    flag = false;
  }
  return flag;
};

// check cvResume
const validCvResume = () => {
  let flag;
  let check = cvResume.value + "";
  if (check == "") {
    cvResume.style.border = "2px solid red";
    flag = false;
  } else {
    cvResume.style.border = "2px solid green";
    flag = true;
  }
  return flag;
};

submit.addEventListener("click", (e) => {
  let name = validName();
  let email = validEmail();
  let address = validAddress();
  let contact = validContact();
  let socialMedia = validSocialMedia();
  let dateOfBirth = validDateOfBirth();
  let socialMediaProfile = validSocialMediaProfile();
  let findUsDescription = validFindUsDescription();
  let country = validCountry();
  let gender = validGender();
  let programCategory = validProgramCategory();
  let programName = validProgramName();
  let dateYouWantStart = validDateYouWantStart();
  let durationYouWant = validDurationYouWant();
  let coveringLetter = validCoveringLetter();
  let yourExpections = validYourExpections();
  let cvResume = validCvResume();
  if (
    name &&
    email &&
    address &&
    contact &&
    socialMedia &&
    dateOfBirth &&
    socialMediaProfile &&
    findUsDescription &&
    country &&
    gender &&
    programCategory &&
    programName &&
    dateYouWantStart &&
    durationYouWant &&
    coveringLetter &&
    yourExpections &&
    cvResume
  ) {
    alert("You Form has been submitted successfully");
  } else {
    alert(`Invalid Form Submit`);
    e.preventDefault();
  }
});
