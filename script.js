// Write your JavaScript code here!

/* This block of code shows how to format the HTML once you fetch some planetary JSON!
<h2>Mission Destination</h2>
<ol>
   <li>Name: ${}</li>
   <li>Diameter: ${}</li>
   <li>Star: ${}</li>
   <li>Distance from Earth: ${}</li>
   <li>Number of Moons: ${}</li>
</ol>
<img src="${}">
*/

function getRandomNum(max) {
    return Math.floor(Math.random() * Math.floor(max));
}

window.addEventListener("load", function() {

    //Loading JSON to create missionTarget div.
    fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
        response.json().then(function(json) {
            const missionTarget = document.getElementById("missionTarget");
            let randomNum = getRandomNum(json.length);
            missionTarget.innerHTML = `
          <h2>Mission Destination</h2>
          <ol>
            <li>Name: ${json[randomNum].name}</li>
            <li>Diameter: ${json[randomNum].diameter}</li>
            <li>Star: ${json[randomNum].star}</li>
            <li>Distance from Earth: ${json[randomNum].distance}</li>
            <li>Number of Moons: ${json[randomNum].moons}</li>
          </ol>
          <img src="${json[randomNum].image}">`
        });
    })

    let form = document.getElementById("launchForm")
    form.addEventListener("submit", function(event) {
        let pilotNameInput = document.querySelector("input[name=pilotName]");
        let copilotNameInput = document.querySelector("input[name=copilotName]");
        let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
        let cargoMassInput = document.querySelector("input[name=cargoMass]");
        const faultyItems = document.getElementById("faultyItems");
        const launchStatus = document.getElementById("launchStatus");

        // Regular expression for lowercase and uppercase letters and spaces.
        const regExLetters = /^[a-zA-Z\s]*$/;

        // Validation for empty fields.
        if (pilotNameInput.value.trim() === "" || copilotNameInput.value.trim() === "" || fuelLevelInput.value.trim() === "" || cargoMassInput.value.trim() === "") {
            alert("All fields are required!");
            event.preventDefault();
        }

        // Validation for non-letter name fields.
        if (!regExLetters.test(pilotNameInput.value) || !regExLetters.test(copilotNameInput.value)) {
            alert("Names can only include letters and spaces.");

        }

        // Alternative way to validate if name fields are strings.
        //   if (!isNaN(pilotNameInput.value) || !isNaN(copilotNameInput.value)) {
        //       alert("Names cannot be a number.");
        //       event.preventDefault();
        //   }

        // Validation for non-number fuel level and cargo mass fields.
        if (isNaN(fuelLevelInput.value) || isNaN(cargoMassInput.value)) {
            alert("Fuel level and cargo mass must be numbers!");
            event.preventDefault();
        }

        // Update pilot and copilot names in list elements.
        document.getElementById("pilotStatus").innerHTML = `Pilot ${pilotNameInput.value} Ready.`
        document.getElementById("copilotStatus").innerHTML = `Pilot ${copilotNameInput.value} Ready.`

        // Update launchStatus if all criteria is met and prevent page from reloading.
        if (fuelLevelInput.value > 10000 && cargoMassInput.value < 10000) {
            launchStatus.innerHTML = `Shuttle is ready for launch.`
            launchStatus.style.color = "green"
            event.preventDefault();
        }

        // Status update if fuel is too low.
        if (fuelLevelInput.value < 10000) {
            faultyItems.style.visibility = "visible";
            document.getElementById("fuelStatus").innerHTML = `Fuel level too low for launch.`
            launchStatus.innerHTML = `Shuttle not ready for launch.`
            launchStatus.style.color = "red"
            event.preventDefault();
        } else {
            document.getElementById("fuelStatus").innerHTML = `Fuel level high enough for launch.`
        }

        // Status update if cargo mass is too high.
        if (cargoMassInput.value > 10000) {
            faultyItems.style.visibility = "visible";
            document.getElementById("cargoStatus").innerHTML = `Cargo mass is too high for launch.`
            launchStatus.innerHTML = `Shuttle not ready for launch.`
            launchStatus.style.color = "red"
            event.preventDefault();
        } else {
            document.getElementById("cargoStatus").innerHTML = `Cargo mass low enough for launch.`

        }
    });
});