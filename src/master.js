///// dark mode and light mode /////

const modeBTN = document.getElementById("mode");
const modeSpan = document.getElementById("modeSpan");
const body = document.getElementById("body");
const main = document.querySelector("main");
const spans = document.querySelectorAll("span");
const refresh = document.getElementById("refresh");
const labels = document.querySelectorAll("label");
let darkModeCounter = 1;

let hour = new Date().getHours();
if (hour >= 18 || hour <= 6) {
  applyDark();
  darkModeCounter++;
}

modeBTN.addEventListener("click", () => {
  if (darkModeCounter % 2) {
    applyDark();
  } else {
    body.style.backgroundColor = "var(--light-main-color)";
    main.style.backgroundColor = "white";
    main.style.color = "black";
    spans[1].parentElement.style.border = "4px solid black";
    spans[1].parentElement.nextElementSibling.nextElementSibling.style.color =
      "black";
    refresh.style.color = "black";
    refresh.previousElementSibling.style.color = "black";
    refresh.previousElementSibling.style.border = "1px solid black";
    labels.forEach((label) => {
      label.style.color = "black";
    });
    for (let i = 0; i < spans.length; i++) {
      if (i == 0 || i == 2 || i == 4) {
        continue;
      } else {
        spans[i].style.color = "black";
      }
    }
    modeSpan.style.left = "2px";
  }
  darkModeCounter++;
});

function applyDark() {
  body.style.backgroundColor = "#002d2c";
  main.style.backgroundColor = "black";
  main.style.color = "white";
  spans[1].parentElement.style.border = "4px solid white";
  spans[1].parentElement.nextElementSibling.nextElementSibling.style.color =
    "white";
  refresh.style.color = "white";
  refresh.previousElementSibling.style.color = "white";
  refresh.previousElementSibling.style.border = "1px solid white";
  labels.forEach((label) => {
    label.style.color = "white";
  });
  for (let i = 0; i < spans.length; i++) {
    if (i == 0 || i == 2 || i == 4) {
      continue;
    } else {
      spans[i].style.color = "white";
    }
  }
  modeSpan.style.left = "27px";
}

///// get password length /////

const inpText = document.getElementById("length");
const inpRange = document.getElementById("range");
let len;

inpText.addEventListener("change", function (e) {
  len = e.target.value;
  inpRange.value = len;
  spans[11].style.width = len * 5 + "%";
  inpRange.nextElementSibling.value = inpRange.value;
  generate();
});
inpRange.addEventListener("change", function (e) {
  len = e.target.value;
  inpRange.value = len;
  inpText.value = len;
  spans[11].style.width = len * 5 + "%";
  generate();
});
inpRange.oninput = () => (inpRange.nextElementSibling.value = inpRange.value);

///// generate password /////

const lowercase = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
];
const uppercase = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0];
const symbols = [
  "~",
  "`",
  "!",
  "@",
  "#",
  "$",
  "%",
  "^",
  "&",
  "*",
  "(",
  ")",
  "_",
  "-",
  "+",
  "=",
  "{",
  "[",
  "}",
  "]",
  "|",
  '"',
  "'",
  ":",
  ";",
  "<",
  ",",
  ">",
  "?",
  "/",
  ".",
  ",",
  ";",
];

const arrs = [uppercase, lowercase, numbers, symbols];

const checkedArrs = [[], [], [], []];

const checkboxes = document.querySelectorAll("input[type=checkbox]");
const passPlace = document.getElementById("password");

checkboxes.forEach((element, i) => {
  element.addEventListener("change", () => {
    if (element.checked) {
      checkedArrs[i].push(arrs[i]);
    } else {
      checkedArrs[i].shift(arrs[i]);
    }
    generate();
  });
});

function generate() {
  const finalChars = [];
  let pass = "";
  checkedArrs.forEach((element) => {
    if (element.length != 0) {
      finalChars.push(element);
    }
  });
  for (let i = 0; i < len; i++) {
    let temp = finalChars[Math.floor(Math.random() * finalChars.length)];
    pass += temp[0][Math.floor(Math.random() * temp[0].length)];
    // console.log(Math.floor(Math.random() * temp[0].length));
  }
  passPlace.innerText = pass;
  strengthChecker(finalChars);
}

///// refresh button /////

refresh.addEventListener("click", () => {
  generate();
});

///// copy button /////

const copy = document.getElementById("copy");

copy.addEventListener("click", () => {
  navigator.clipboard.writeText(passPlace.innerText);
});

///// strength indicator /////

const strength = document.querySelector("#strength");
let hint = "";
let color = "";

const strengthChecker = (finalChars) => {
  if (finalChars.length == 1 || (len >= 1 && len <= 5)) {
    hint = "* Very Weak";
    color = "red";
  } else if (finalChars.length == 2 || (len >= 6 && len <= 10)) {
    hint = "* Weak";
    color = "orange";
  } else if (finalChars.length == 3 || (len >= 11 && len <= 15)) {
    hint = "* Good";
    color = "rgb(255, 208, 0)";
  } else if (finalChars.length == 4 || (len >= 16 && len <= 20)) {
    hint = "* Strong";
    color = "green";
  }
  strength.innerText = hint;
  strength.style.color = color;
};

// switch (finalChars.length) {
//   case 1:
//     hint = "* Very Weak";
//     color = "red";
//     break;
//   case 2:
//     hint = "* Weak";
//     color = "orange";
//     break;
//   case 3:
//     hint = "* Good";
//     color = "yellow";
//     break;
//   case 4:
//     hint = "* Strong";
//     color = "green";
//     break;
// }
