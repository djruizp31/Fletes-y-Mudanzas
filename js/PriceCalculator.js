const apiKey = "305cef8240f248a0a0d4a166ffc29826";

async function getCoordinates(postalCode) {
const response = await fetch(
    `https://api.opencagedata.com/geocode/v1/json?q=${postalCode}&key=${apiKey}&countrycode=mx`
);
const data = await response.json();
return data.results[0].geometry; 
}
  
async function calculateDistance(postalCode1, postalCode2) {
const coords1 = await getCoordinates(postalCode1);
const coords2 = await getCoordinates(postalCode2);

const haversine = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radio de la Tierra en km
    const toRad = angle => (angle * Math.PI) / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
};

return haversine(coords1.lat, coords1.lng, coords2.lat, coords2.lng).toFixed(2);
}



    
const nextStepButton = document.getElementById("nextStepButton");
const backStepButton = document.getElementById("backStepButton");

const steps = document.querySelectorAll(".step")

const postalInputs = document.querySelectorAll(".postalInput");
const measureInputs = document.querySelectorAll(".measureInput");

const dataTexts = document.querySelectorAll(".dataText");

var currentStep = 0;
const maxStep = steps.length;

var data = {
    postalCode1: 0,
    postalCode2: 0,
    
    lengthCm:0,
    widthCm:0,
    heightCm:0,
    
    weightKg: 0,

    distance: 0,

    gasPrice: 25,
    weigthFee: 5,
    fixedFee: 100,

    finalPrice: 0,
};

backStepButton.addEventListener("click", ()=>{
    if(currentStep > 0){
        currentStep--
        updateForm();
    }
    if(currentStep == 0){
        backStepButton.classList.add("d-none")
    }
})

nextStepButton.addEventListener("click", () => {
    currentStep++
    console.log(currentStep)
    switch(currentStep){
        case 0:
            backStepButton.classList.add("d-none");
            break
        case 1:
            backStepButton.classList.remove("d-none")
            if(postalInputs[0].value && postalInputs[1].value){
                updatePostalCodes();
            }else{
                console.log("Postal codes not registered")
                alert("Postal codes not registered")
                currentStep--
                backStepButton.classList.add("d-none");
            }
            break
        case 2:
            if(measureInputs[0].value && measureInputs[1].value && measureInputs[2].value){
                updateMeasures();
            }else{
                console.log("Measures not registered")
                alert("Measures not registered")
                currentStep--
                backStepButton.classList.add("d-none");
            }
            updateSummaryData();
            break
        case 3:
            priceCalc();
            nextStepButton.classList.add("d-none");
            backStepButton.classList.add("d-none");
            break
    }
    
    
})

function updateForm(){
    
    if(currentStep <= maxStep){
        steps.forEach((step, index) => {
            if(currentStep == (index)){
                step.classList.remove("d-none")
            }else{
                step.classList.add("d-none")
            }
            
        });
        console.log("Form updated")
    }
    if(currentStep == 2){
        nextStepButton.textContent = "Calcular"
    }
    else{
        nextStepButton.textContent = "Siguiente"
    }
}
function updatePostalCodes(){
    data.postalCode1 = postalInputs[0].value
    data.postalCode2 = postalInputs[1].value
    updateForm();
}
function updateMeasures(){
    data.lengthCm = measureInputs[0].value
    data.widthCm = measureInputs[1].value
    data.heightCm = measureInputs[2].value
    data.weightKg = measureInputs[3].value
    updateForm();
}

function updateSummaryData(){
    const values = Object.values(data);
    console.log("Summary data updated")
    console.log(dataTexts);
    dataTexts.forEach((text, index)=>{
        text.textContent = values[index] + text.textContent;
    })
}

function updatePrice(){
    const text = document.getElementById("priceText");
    text.value = data.finalPrice + "$";
    updateForm();
}

async function priceCalc(){
    data.distance = await calculateDistance(data.postalCode1, data.postalCode2);
    var volumetricWeigth = Math.ceil((data.lengthCm*data.widthCm*data.heightCm)/5000);

    var gasPriceCalc = ((data.distance * data.gasPrice) /8);


    if(volumetricWeigth >= data.weightKg){
        data.weigthjKg = volumetricWeigth;
    }
    var weigthPrice = data.weightKg * data.weigthFee;
    console.log(data)
    data.finalPrice = parseFloat(gasPriceCalc + weigthPrice + data.fixedFee);
    updatePrice();
}




