const user = "hrnykcW8sZyYRxFgT";
const service = "service_z3w6db8";
const template = "template_k5j7969";


(function(){
    emailjs.init(user);
})();

const contactForm = document.getElementById("ContactForm");
const destinationOption = document.getElementById("destination");
const originOption = document.getElementById("origin");

const locationOptions = {
    1: "Guadalajara",
    2: "Zapopan",
    3: "Tlaquepaque",
    4: "Tlajomulco de Zúñiga",
    5: "Tonalá",
    6: "El Salto",
}

contactForm.addEventListener("submit", function(event) {
  event.preventDefault(); 

  const formData = new FormData(contactForm);

  const destinationSelected = formData.get("destination");
  const originSelected = formData.get("origin");

  const destinationTranslated = locationOptions[destinationSelected];
  const originTranslated = locationOptions[originSelected];
  
  const dataToSend = {
    name: formData.get("name"),
    phone: formData.get("phone"),
    email: formData.get("email"),
    description:formData.get("description"),
    origin: originTranslated,
    destination: destinationTranslated
  }
  console.log(dataToSend);

  emailjs.send(service, template, dataToSend)
    .then(function() {
      alert("Correo enviado correctamente.");
    }, function(error) {
      alert("Hubo un error al enviar el correo: " + JSON.stringify(error));
    });
});


