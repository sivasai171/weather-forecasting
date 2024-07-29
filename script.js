const apiKey = 'c45bb4eee02f9d4f7f1fdb6a0454b9da'; // Replace with a valid API key
const apiUrl = 'https://api.openweathermap.org/data/2.5/';

function fetchWeather() {
    const city = document.getElementById('city').value || 'Delhi';

    fetch(`${apiUrl}weather?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => {
            displayCurrentWeather(data);
            document.getElementById('currentWeather').scrollIntoView({ behavior: 'smooth' });
        })
        .catch(error => console.error('Error fetching current weather data:', error));

    fetch(`${apiUrl}forecast?q=${city}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayForecast(data))
        .catch(error => console.error('Error fetching forecast data:', error));
}

function displayCurrentWeather(data) {
    const weatherDiv = document.getElementById('currentWeather');
    const date = new Date(data.dt * 1000).toLocaleString();

    weatherDiv.innerHTML = `
        <h2>Current Weather in ${data.name}</h2>
        <p>${data.weather[0].description}</p>
        <p>Temperature: ${data.main.temp} °C</p>
        <p>Humidity: ${data.main.humidity} %</p>
        <p>Wind Speed: ${data.wind.speed} m/s</p>
        <p>Date and Time: ${date}</p>
    `;
}

function displayForecast(data) {
    const labels = [];
    const temps = [];
    const humidities = [];

    data.list.forEach(item => {
        const date = new Date(item.dt * 1000).toLocaleString();
        labels.push(date);
        temps.push(item.main.temp);
        humidities.push(item.main.humidity);
    });

    const ctx = document.getElementById('forecastChart').getContext('2d');
    new Chart(ctx, {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    label: 'Temperature (°C)',
                    data: temps,
                    borderColor: 'red',
                    fill: false
                },
                {
                    label: 'Humidity (%)',
                    data: humidities,
                    borderColor: 'blue',
                    fill: false
                }
            ]
        },
        options: {
            responsive: true,
            scales: {
                x: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Date and Time'
                    }
                },
                y: {
                    display: true,
                    title: {
                        display: true,
                        text: 'Value'
                    }
                }
            }
        }
    });
}
