window.addEventListener("scroll", () => {

const cards = document.querySelectorAll(".card");

cards.forEach(card => {

const top = card.getBoundingClientRect().top;

if(top < window.innerHeight - 100){
card.classList.add("show");
}

});

});