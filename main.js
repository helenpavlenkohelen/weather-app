async function goSearchWeather(city) {
	const resp = await fetch(
		`https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=ua&units=metric&appid=a105bd7450e44e75926ed96bf9beac5a`
	);

	if (resp.status == 404) {
		blockHidden.style.display = "none";
		error.style.display = "block";
	}

	const data = await resp.json();
	return data;
}

async function showWeather(block, city = null) {
	if (city == null) {
		city = block.querySelector(".weather__city-name").textContent;
	} else {
		block.querySelector(".city").textContent = city;
	}
	const data = await goSearchWeather(city);
	const temp = block.querySelector(".temp");
	console.log(temp);
	const wind = block.querySelector(".wind").firstElementChild;
	const humidity = block.querySelector(".humidity").firstElementChild;
	const icon = block.querySelector(".weather__icon");

	console.log(icon);

	temp.textContent = data.main.temp;
	console.log(temp);
	humidity.textContent = data.main.humidity + "%";
	wind.textContent = data.wind.speed + "m/s";

	if (data.weather[0].main == "Clear") {
		icon.className = "fa-solid fa-sun";
	} else if (data.weather[0].main == "Rain") {
		icon.className = "fa-solid fa-cloud-rain";
	} else if (data.weather[0].main == "Mist") {
		icon.className = "fa-solid fa-cloud-mist";
	} else if (data.weather[0].main == "Drizzle") {
		icon.className = "fa-solid fa-cloud-drizzle";
	}
}

const input = document.querySelector(".search__input");
const search = document.querySelector(".search");
const weatherMainBlock = document.querySelector(".weather-main");
const error = document.querySelector(".search-error");
const blockHidden = document.querySelector(".hidden");
const weatherBlocks = document.querySelectorAll(".container-weather__items");

search.onsubmit = async (e) => {
	e.preventDefault();
	showWeather(weatherMainBlock, input.value);
	input.value = "";
	blockHidden.style.display = "block";
	error.style.display = "none";
};

for (const block of weatherBlocks) {
	showWeather(block);
}
