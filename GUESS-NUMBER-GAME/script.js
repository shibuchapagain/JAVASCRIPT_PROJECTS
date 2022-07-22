let score = 20;
const reset = document.querySelector(".again");
reset.addEventListener("click", function () {
  document.querySelector(".guess").value = "";
  document.querySelector(".score").innerHTML = score;
  document.querySelector(".message").innerHTML = "start guessing!";
});
const secretNumber = Math.trunc(Math.random() * 20 + 1);
document.querySelector(".check").addEventListener("click", function () {
  const guess = Number(document.querySelector(".guess").value);
  if (!guess) {
    document.querySelector(".message").textContent = "No Number";
  } else if (guess == secretNumber) {
    document.querySelector(".message").textContent = "correct Number";
    document.querySelector("body").style.backgroundColor = "green";
  } else if (guess > secretNumber) {
    if (score > 0) {
      document.querySelector(".message").innerHTML = "too high";
      score--;
      document.querySelector(".score").innerHTML = score;
    } else {
      document.querySelector(".message").innerHTML = "You lost the game";
    }
  } else if (guess < secretNumber) {
    if (score > 0) {
      document.querySelector(".message").innerHTML = "too low";
      score--;
      document.querySelector(".score").innerHTML = score;
    } else {
      document.querySelector(".message").innerHTML = "You lost the game";
    }
  }
});
