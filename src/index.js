/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

// console.log('Happy hacking :)')
const idCity = '3441572'
const key = '24a2daea82cd2f605739444659d81ef8'
const url = `https://api.openweathermap.org/data/2.5/weather?id=${idCity}&appid=${key}`

window
    .fetch(url)
    .then((respuesta) => respuesta.json())
    .then((responseJson) => {
        const todosLosItems = []

        console.log(responseJson.main.temp);

        const ciudad = document.createElement('h2');
        ciudad.textContent = responseJson.name;
        const imagen = document.createElement('img');
        imagen.src = `http://openweathermap.org/img/wn/${responseJson.weather[0].icon}@2x.png`;
        const temperatura = document.createElement('h4')
        temperatura.textContent = responseJson.main.temp;

        const contenedor = document.createElement('div')

        contenedor.append(ciudad, imagen, temperatura)

        todosLosItems.push(contenedor)

        document.body.append(...todosLosItems)
    })
