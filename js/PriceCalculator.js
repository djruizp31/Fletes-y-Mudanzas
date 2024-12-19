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


(async () => {
    const postalCodeInput1 = document.getElementById("postalCode1");
    const postalCodeInput2 = document.getElementById("postalCode2");
    
    const nextStepButton = document.getElementById("nextStepButton");
    const calculateButton = document.getElementById("calculateButton");

    var currentStep = 0;
    var data = {
        postalCode1: 0,
        postalCode2: 0,
        distance: 0,

        length:0,
        height:0,
        width:0,

        weight: 0,

        gasPrice: 25,

    };
    
    nextStepButton.addEventListener("click", () => {
        currentStep++;
        
        switch(currentStep){
            case 1:
                data.postalCode1 = postalCodeInput1.value
                data.postalCode2 = postalCodeInput2.value
                break
        }
    })
    calculateButton.addEventListener("click", async() =>{
        data.distance = await calculateDistance(data.postalCode1, data.postalCode2);
        console.log(data.distance);
    })

})();

