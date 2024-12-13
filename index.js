const toggleButton = document.getElementById("themeButton");
const moonIcon = document.getElementById("MoonIcon");
const sunIcon = document.getElementById("SunIcon");

const themeText = document.querySelectorAll(".ThemeText");

const body = document.body;
var DarkTheme = true;

toggleButton.addEventListener('click', () => {
    // if(DarkTheme){
    //     body.classList.remove("bg-dark");
    //     body.classList.add("bg-light");

    //     moonIcon.classList.remove("d-none");
    //     sunIcon.classList.add("d-none");

    //     themeText.forEach(Text => {
    //         Text.classList.remove("text-light");
    //         Text.classList.add("text-dark");
    //     });

    //     DarkTheme = false;
    // }else{
    //     body.classList.remove("bg-light");
    //     body.classList.add("bg-dark");

    //     moonIcon.classList.add("d-none");
    //     sunIcon.classList.remove("d-none");

    //     themeText.forEach(Text => {
    //         Text.classList.remove("text-dark");
    //         Text.classList.add("text-light");
    //     });

    //     DarkTheme = true;
    // }  
    if(DarkTheme){
        document.documentElement.setAttribute("data-bs-theme", "light");
        moonIcon.classList.remove("d-none");
        sunIcon.classList.add("d-none");
        DarkTheme = false;
    }else{
        document.documentElement.setAttribute("data-bs-theme", "dark");
        moonIcon.classList.add("d-none");
        sunIcon.classList.remove("d-none");
        DarkTheme = true;
    };
    
});
