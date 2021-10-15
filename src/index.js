class Card{
  constructor(name, image){
    this.name = name;
    this.image = image;
  }
};

const grid = document.querySelector(".grid");
const scores = document.querySelector("#result");
const moveselem = document.querySelector("#moves");
const info = document.querySelector("#info");
const wrapperelem = document.querySelector(".wrapper");
const winelem = document.querySelector(".win");
const button = document.querySelector(".start")
let cardsChoosen = [];
let cardsChoosenId = [];
let cardsWon = [];
let moves = 0;

const cardArray = [
  new Card("angular", "<i class=\"fab fa-angular\"></i>"),
  new Card("js", "<i class=\"fab fa-js-square\"></i>"),
  new Card("vuejs", "<i class=\"fab fa-vuejs\"></i>"),
  new Card("react", "<i class=\"fab fa-react\"></i>"),
  new Card("nodejs", "<i class=\"fab fa-node-js\"></i>"),
  new Card("docker", "<i class=\"fab fa-docker\"></i>"),
  new Card("angular", "<i class=\"fab fa-angular\"></i>"),
  new Card("js", "<i class=\"fab fa-js-square\"></i>"),
  new Card("vuejs", "<i class=\"fab fa-vuejs\"></i>"),
  new Card("react", "<i class=\"fab fa-react\"></i>"),
  new Card("nodejs", "<i class=\"fab fa-node-js\"></i>"),
  new Card("docker", "<i class=\"fab fa-docker\"></i>")
];

function FlipCard(){
  let cardId = this.getAttribute("data-id");
  if (cardsChoosenId.length<2 && !cardsChoosenId.includes(cardId)){
    cardsChoosen.push(cardArray[cardId].name);
    cardsChoosenId.push(cardId);
    this.innerHTML = cardArray[cardId].image;
    if (cardsChoosenId.length === 2){
      setTimeout(checkForMatch, 800);
    }
  }
}

function checkForMatch(){
  let cards = document.querySelectorAll(".card-holder");
  const optionOneId = cardsChoosenId[0];
  const optionTwoId = cardsChoosenId[1];
  
  if(cardsChoosen[0] === cardsChoosen[1]){
    moves += 1;
    cards[optionOneId].style.backgroundColor = "#ffd500";
    cards[optionOneId].innerHTML = "";
    cards[optionTwoId].style.backgroundColor = "#ffd500";
    cards[optionTwoId].innerHTML = "";
    cards[optionOneId].removeEventListener("click", FlipCard)
    cards[optionTwoId].removeEventListener("click", FlipCard)
    cardsWon.push(cardsChoosen)
    scores.innerHTML = cardsWon.length;
    displayText("You have found matching pair");
  } else{
    moves += 1;
    cards[optionOneId].style.backgroundColor = "#00296b";
    cards[optionOneId].innerHTML = "";
    cards[optionTwoId].style.backgroundColor = "#00296b";
    cards[optionTwoId].innerHTML = "";
    displayText("You have not found matching pair");
  }
  if(cardsWon.length === 6){
    wrapperelem.style.display = "none";
    winelem.style.display = "block";
    button.style.display = "block";
    button.style.margin = "0 auto";
    cards = [];
  }
  moveselem.innerHTML = moves;
  cardsChoosen = [];
  cardsChoosenId = [];
}

function displayText(message){
  info.innerHTML = message;
}

function CreateBoard(){
  cardsChoosen = [];
  cardsChoosenId = [];
  cardsWon = [];
  grid.innerHTML = "";
  moves = 0;
  moveselem.innerHTML = 0;
  scores.innerHTML = 0;
  wrapperelem.style.display = "flex";
  button.style.display = "none";
  winelem.style.display = "none";
  cardArray.sort(() => 0.5 - (Math.random()));
  
  for (let i = 0; i < cardArray.length; i++){
    const card = document.createElement("div");
    card.classList.add("card-holder");
    card.style.backgroundColor = "#00296b"
    card.setAttribute("data-id", i);
    card.addEventListener("click", FlipCard)
    grid.appendChild(card);
  }
}

button.addEventListener("click", CreateBoard);