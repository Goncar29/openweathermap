import "./index.scss";

const obtenerClima = document.querySelector("#obtenerClima");
const ciudad = document.querySelector("#ciudad");
const resultados = document.querySelector("#resultados");
const key = import.meta.env.VITE_API_KEY;
const unidad = "metric";

const mostrarError = (mensaje) => {
  resultados.innerHTML = "";
  const errorDiv = document.createElement("div");
  errorDiv.className = "error";
  errorDiv.setAttribute("role", "alert");
  errorDiv.textContent = mensaje;
  resultados.appendChild(errorDiv);
};

const mostrarLoading = () => {
  resultados.innerHTML = "";
  const loadingDiv = document.createElement("div");
  loadingDiv.className = "loading";
  loadingDiv.setAttribute("aria-live", "polite");
  loadingDiv.textContent = "Cargando datos del clima...";
  resultados.appendChild(loadingDiv);
};

const crearCardClima = (data) => {
  const { name, main, weather } = data;

  const card = document.createElement("div");
  card.className = "cards";

  const ciudadElem = document.createElement("h2");
  ciudadElem.textContent = name;

  const iconCode = weather[0].icon;
  const imagen = document.createElement("img");
  imagen.src = `${import.meta.env.BASE_URL}weather-icons/${iconCode}.png`;
  imagen.alt = `Icono del clima: ${weather[0].description}`;
  imagen.onerror = () => {
    imagen.src = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;
  };

  const description = document.createElement("h4");
  description.textContent = weather[0].description;

  const humedad = document.createElement("h5");
  humedad.textContent = `Humedad ${main.humidity}%`;

  const temperatura = document.createElement("span");
  temperatura.innerHTML = `Temp ${main.temp}°C<br> Min ${main.temp_min}°C<br> Max ${main.temp_max}°C`;

  card.append(ciudadElem, imagen, description, humedad, temperatura);
  return card;
};

const obtenerClimaHandler = async (e) => {
  e.preventDefault();

  const ciudadValue = ciudad.value.trim();
  if (!ciudadValue) {
    mostrarError("Por favor, ingresa el nombre de una ciudad");
    return;
  }

  mostrarLoading();

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(ciudadValue)}&lang=es&appid=${key}&units=${unidad}`;

  try {
    const respuesta = await window.fetch(url);
    const data = await respuesta.json();

    resultados.innerHTML = "";

    if (!respuesta.ok) {
      if (data.cod === "404") {
        mostrarError(`No se encontró la ciudad "${ciudadValue}"`);
      } else if (data.cod === "401") {
        mostrarError("Error de API key. Contacta al administrador.");
      } else {
        mostrarError(data.message || "Error al obtener el clima");
      }
      return;
    }

    const card = crearCardClima(data);
    resultados.appendChild(card);
  } catch (error) {
    mostrarError("Error de conexión. Verifica tu conexión a internet.");
  }
};

obtenerClima.addEventListener("click", obtenerClimaHandler);
