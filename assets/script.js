function refreshTime() {
  const timeDisplay = document.getElementById("time");
  const dateString = new Date().toLocaleString();
  const formattedString = dateString.replace(", ", " - ");
  timeDisplay.textContent = formattedString;
}
setInterval(refreshTime, 1000);

const myModal = document.getElementById('myModal')
const myInput = document.getElementById('myInput')

myModal.addEventListener('shown.bs.modal', () => {
  myInput.focus()
})

// Declaring the variables
let lon;
let lat;
let temperature = document.querySelector(".temp");
let summary = document.querySelector(".summary");
let loc = document.querySelector(".location");
let icon = document.querySelector(".icon");
const kelvin = 273;

window.addEventListener("load", () => {
if (navigator.geolocation) {
	navigator.geolocation.getCurrentPosition((position) => {
	console.log(position);
	lon = position.coords.longitude;
	lat = position.coords.latitude;

	// API ID
	const api = "14b780f136771b55290b6cacd639b311";

	// API URL
	const base =
`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&` +
`lon=${lon}&appid=6d055e39ee237af35ca066f35474e9df`;

	// Calling the API
	fetch(base)
		.then((response) => {
		return response.json();
		})
		.then((data) => {
		console.log(data);
		temperature.textContent =
			Math.floor(data.main.temp - kelvin) + "°C";
		summary.textContent = data.weather[0].description;
		loc.textContent = data.name + "," + data.sys.country;
		let icon1 = data.weather[0].icon;
		icon.innerHTML =
			`<img src="icons/${icon1}.svg" style= 'height:10rem'/>`;
		});
	});
}
});
