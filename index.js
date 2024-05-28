let timer;

// Constant For Timer 
let time = 0;
// Constant For Pairs Left
let pairsLeft;
// Constant For Total Pairs
let totalPairs;
//C Constant For user CLick Count
let clickCount = 0; 
let powerUpInterval;

const revealCards = () => {
  $(".card").addClass("flip");
  setTimeout(() => {
    $(".card").removeClass("flip");
  }, 2000);
}

const setup = () => {
  let firstCard = undefined;
  let secondCard = undefined;
  let difficulty = $("#difficulty").val();
  pairsLeft = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 6;
  totalPairs = pairsLeft; 
  $("#pairs_left").text(`Pairs left: ${pairsLeft}`);
  $("#total_pairs").text(`Total Pairs: ${totalPairs}`); 
  $("#matched_pairs").text(`Matched Pairs: ${totalPairs - pairsLeft}`); 
  $("#game_grid").empty(); 


  for (let i = 1; i <= pairsLeft * 2; i++) {
    let imgNum = Math.ceil(i / 2); // Pair images together
    let imgSrc = imgNum.toString().padStart(3, '0') + '.png'; // Convert to 001.png format
    let card = $(`<div class="card">
      <img id="img${i}" class="front_face" src="${imgSrc}" alt="">
      <img class="back_face" src="back.webp" alt="">
    </div>`);
    $("#game_grid").append(card);
  }

  // Shuffle The Cards, So They Aint The Same Everytime
  let cards = $("#game_grid").children();
  while (cards.length) {
    $("#game_grid").append(cards.splice(Math.floor(Math.random() * cards.length), 1)[0]);
  }

  $(".card").on(("click"), function () {
    clickCount++; 
    $("#click_count").text(`Total Clicks: ${clickCount}`); 

    if (!firstCard || !secondCard) {
      if (firstCard && firstCard.id === $(this).find(".front_face")[0].id) {
        return; 
      }
      $(this).toggleClass("flip");
    }

    if (!firstCard) {
      firstCard = $(this).find(".front_face")[0];
    } else if (!secondCard) {
      secondCard = $(this).find(".front_face")[0];
      console.log(firstCard, secondCard);
      if (firstCard.src == secondCard.src) {
        console.log("match");
        pairsLeft--;
        $("#pairs_left").text(`Pairs left: ${pairsLeft}`);
        $("#matched_pairs").text(`Matched Pairs: ${totalPairs - pairsLeft}`); 
        $(`#${firstCard.id}`).parent().off("click"); 
        $(`#${secondCard.id}`).parent().off("click"); 
        firstCard = undefined;
        secondCard = undefined;
        if (pairsLeft === 0) {
          setTimeout(() => {
            alert("Congratulations! You have won the match!");
          }, 1000);
        }
      } else {
        console.log("no match");
        setTimeout(() => {
          $(`#${firstCard.id}`).parent().toggleClass("flip");
          $(`#${secondCard.id}`).parent().toggleClass("flip");
          firstCard = undefined;
          secondCard = undefined;
        }, 1000);
      }
    }
  });

  $("#reset").on("click", function() {
    
    difficulty = $("#difficulty").val();
    pairsLeft = difficulty === "easy" ? 3 : difficulty === "medium" ? 4 : 6;
    totalPairs = pairsLeft; 
    time = 0;
    clickCount = 0;
    clearInterval(timer);
    clearInterval(powerUpInterval); 
    $("#pairs_left").text(`Pairs left: ${pairsLeft}`);
    $("#total_pairs").text(`Total Pairs: ${totalPairs}`);
    $("#matched_pairs").text(`Matched Pairs: ${totalPairs - pairsLeft}`); 
    $("#timer").text(`Time: ${time}s`);
    $("#click_count").text(`Total Clicks: ${clickCount}`); 
    setup();
  });

  $("#start").on("click", function() {
   
    clearInterval(timer); 
    clearInterval(powerUpInterval); 
    timer = setInterval(function() {
      time++;
      $("#timer").text(`Time: ${time}s`);
    }, 1000);
    powerUpInterval = setInterval(function() {
      alert("Power Up!!!!!!");
      revealCards();
    }, 60000); 
   
  });

 
}

$("#difficulty").on("change", setup); 

$(document).ready(setup);
