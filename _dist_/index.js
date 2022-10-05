const idCity = '3441572'
const key = '24a2daea82cd2f605739444659d81ef8'
const url = `https://api.openweathermap.org/data/2.5/weather?id=${idCity}&appid=${key}`

const kelvin = 273.15
window
    .fetch(url)
    .then((respuesta) => respuesta.json())
    .then((responseJson) => {
        const todosLosItems = []

        console.log(responseJson.main.temp);

        const ciudad = document.createElement('h2');
        ciudad.textContent = responseJson.name;
        const imagen = document.createElement('img');
        imagen.src = `http://openweathermap.org/img/wn/${responseJson.weather[0].icon}@4x.png`;
        const temperatura = document.createElement('h5')
        const minTemp = document.createElement('h5')
        const maxTemp = document.createElement('h5')
        temperatura.textContent = `Temp ${(responseJson.main.temp - kelvin).toFixed(1)}°C`;
        minTemp.textContent = ` Min ${(responseJson.main.temp_min)}°C`;
        maxTemp.textContent = ` Max ${(responseJson.main.temp_max - kelvin).toFixed(1)}°C`;

        const temp = document.createElement('span')
        const contenedor = document.createElement('div')

        temp.append(temperatura, minTemp, maxTemp)
        contenedor.append(ciudad, imagen, temp)

        todosLosItems.push(contenedor)

        document.querySelector("body > main").append(...todosLosItems)
    })
