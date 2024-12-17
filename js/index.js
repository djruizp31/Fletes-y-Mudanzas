const toggleButton = document.getElementById("themeButton");
const moonIcon = document.getElementById("MoonIcon");
const sunIcon = document.getElementById("SunIcon");
const themeColorButtons = document.querySelectorAll(".themeColorButton")

const contactButton = document.getElementById("contactBtn")

const startButton = document.getElementById("startButton")
var DarkTheme = true;

toggleButton.addEventListener('click', () => { 
    if(DarkTheme){
        document.documentElement.setAttribute("data-bs-theme", "light");
        moonIcon.classList.remove("d-none");
        sunIcon.classList.add("d-none");

        themeColorButtons.forEach(button => {
            button.classList.add("btn-light");
            button.classList.remove("btn-dark");
        });

        DarkTheme = false;
    }else{
        document.documentElement.setAttribute("data-bs-theme", "dark");
        moonIcon.classList.add("d-none");
        sunIcon.classList.remove("d-none");

        themeColorButtons.forEach(button => {
            button.classList.add("btn-dark");
            button.classList.remove("btn-light");
        });

        DarkTheme = true;
    };
    
});

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