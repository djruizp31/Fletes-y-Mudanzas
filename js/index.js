
const contactButton = document.getElementById("contactBtn")

const startButton = document.getElementById("startButton")




contactButton.addEventListener('click', () => {
    const contactSection = document.getElementById("Contacto");

    contactSection.scrollIntoView();
});

let isVisible = false;
window.addEventListener("scroll", () => {
    const scrollPosition = window.scrollY;

    if (scrollPosition > 500 && !isVisible) {
        // Aparecer elemento
        startButton.classList.remove("fade-out");
        startButton.classList.add("fade-in");
        isVisible = true;
      } 
      else if (scrollPosition <= 500 && isVisible) {
        // Desaparecer elemento
        startButton.classList.remove("fade-in");
        startButton.classList.add("fade-out");
        isVisible = false;
      }
});
startButton.addEventListener('click', () =>{
    document.documentElement.scrollIntoView();
});