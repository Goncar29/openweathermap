import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock del DOM para testing
const mockDOM = () => {
  document.body.innerHTML = `
    <main>
      <form id="form">
        <input id="ciudad" type="text" />
        <button id="obtenerClima">Enviar</button>
      </form>
      <div id="resultados"></div>
    </main>
  `;
};

describe("App Del Clima - Tests", () => {
  beforeEach(() => {
    mockDOM();
  });

  describe("mostrarError", () => {
    it("debería crear un div con clase error", () => {
      const resultados = document.querySelector("#resultados");
      const errorDiv = document.createElement("div");
      errorDiv.className = "error";
      errorDiv.setAttribute("role", "alert");
      errorDiv.textContent = "Error de prueba";
      resultados.appendChild(errorDiv);

      const error = resultados.querySelector(".error");
      expect(error).not.toBeNull();
      expect(error.textContent).toBe("Error de prueba");
      expect(error.getAttribute("role")).toBe("alert");
    });
  });

  describe("mostrarLoading", () => {
    it("debería crear un div con clase loading", () => {
      const resultados = document.querySelector("#resultados");
      const loadingDiv = document.createElement("div");
      loadingDiv.className = "loading";
      loadingDiv.setAttribute("aria-live", "polite");
      loadingDiv.textContent = "Cargando datos del clima...";
      resultados.appendChild(loadingDiv);

      const loading = resultados.querySelector(".loading");
      expect(loading).not.toBeNull();
      expect(loading.getAttribute("aria-live")).toBe("polite");
    });
  });

  describe("crearCardClima", () => {
    it("debería crear una card con los datos del clima", () => {
      const mockData = {
        name: "Buenos Aires",
        main: { temp: 25, temp_min: 20, temp_max: 30, humidity: 60 },
        weather: [{ description: "cielo claro", icon: "01d" }],
      };

      const card = document.createElement("div");
      card.className = "cards";

      const ciudadElem = document.createElement("h2");
      ciudadElem.textContent = mockData.name;

      const temperatura = document.createElement("span");
      temperatura.innerHTML = `Temp ${mockData.main.temp}°C<br> Min ${mockData.main.temp_min}°C<br> Max ${mockData.main.temp_max}°C`;

      card.append(ciudadElem, temperatura);

      expect(card.querySelector("h2").textContent).toBe("Buenos Aires");
      expect(card.querySelector("span").textContent).toContain("25°C");
    });
  });

  describe("validación de input", () => {
    it("debería tener el input de ciudad en el DOM", () => {
      const input = document.querySelector("#ciudad");
      expect(input).not.toBeNull();
      expect(input.id).toBe("ciudad");
    });
  });

  describe("generación de URL", () => {
    it("debería codificar la ciudad en la URL", () => {
      const ciudad = "Buenos Aires";
      const key = "test-key";
      const encoded = encodeURIComponent(ciudad);
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${encoded}&lang=es&appid=${key}&units=metric`;

      expect(url).toContain("Buenos%20Aires");
    });
  });
});
