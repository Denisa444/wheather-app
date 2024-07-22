const apiKey = '41de4b1c2f64a266039bdb00040b6faa';
const city = 'Iasi';
const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=metric&appid=${apiKey}`;

fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
        // Setare date pentru vremea curentă
        const currentWeather = data.list[0];
        document.querySelector('.location').textContent = data.city.name;
        document.querySelector('.temperature').textContent = `${Math.round(currentWeather.main.temp)}°C`;
        document.querySelector('.weather-description').textContent = currentWeather.weather[0].description;
        document.querySelector('.min-max').textContent = `Max: ${Math.round(currentWeather.main.temp_max)}° Min: ${Math.round(currentWeather.main.temp_min)}°`;

        // Informații adiționale
        document.querySelector('.additional-info p').textContent = `Condiții de cer ${currentWeather.weather[0].description}, care vor continua tot restul zilei. Rafalele de vânt sunt de până la ${currentWeather.wind.speed} km/h.`;

        // Setare date pentru prognoza pe zile
        const forecastContainer = document.querySelector('.forecast-container');
        const days = data.list.filter((_, index) => index % 8 === 0).slice(0, 7); // Preia prognoza pentru 7 zile
        days.forEach(day => {
            const dayElement = document.createElement('div');
            dayElement.className = 'day';
            const date = new Date(day.dt * 1000);
            dayElement.innerHTML = `
                <p>${date.toLocaleDateString('ro-RO', { weekday: 'long' })}</p>
                <p>${Math.round(day.main.temp_min)}°C / ${Math.round(day.main.temp_max)}°C</p>
            `;
            forecastContainer.appendChild(dayElement);
        });

        // Setare date pentru prognoza pe ore
        const hourlyForecastContainer = document.querySelector('.hourly-forecast-container');
        const hours = data.list.slice(0, 24); // Preia următoarele 24 ore
        hours.forEach(hour => {
            const hourElement = document.createElement('div');
            hourElement.className = 'hour';
            hourElement.innerHTML = `
                <p>${new Date(hour.dt * 1000).getHours()}:00</p>
                <p>${Math.round(hour.main.temp)}°C</p>
            `;
            hourlyForecastContainer.appendChild(hourElement);
        });
    })
    .catch(error => console.error('Error fetching the weather data:', error));
