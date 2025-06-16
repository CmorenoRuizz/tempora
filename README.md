<div align="center">
  <img src="src/app/favicon.png" alt="Tempora Logo" width="120" height="120">
  <h1>Tempora</h1>
  <p>Una aplicación moderna del clima con fondos dinámicos y pronósticos detallados</p>
  
  ![Next.js](https://img.shields.io/badge/Next.js-15.3.3-black?style=flat-square&logo=next.js)
  ![React](https://img.shields.io/badge/React-19.0.0-blue?style=flat-square&logo=react)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38B2AC?style=flat-square&logo=tailwind-css)
</div>

<p align="center">
  <a href="https://tempora-weather.vercel.app/" target="_blank">
    <img src="https://img.shields.io/badge/Visitar%20despliegue%20online-Vercel-black?style=for-the-badge&logo=vercel" alt="Ver en Vercel">
  </a>
</p>

## 🌤️ Descripción

**Tempora** es una aplicación web moderna para consultar el clima que ofrece una experiencia visual inmersiva. Construida con Next.js 15 y React 19, la aplicación permite buscar el clima de cualquier ciudad del mundo y muestra información detallada con fondos dinámicos que cambian según la ubicación seleccionada.

### ✨ Características Principales

- 🔍 **Búsqueda inteligente**: Busca ciudades con autocompletado y sugerencias en tiempo real
- 🌡️ **Información completa**: Temperatura actual, sensación térmica, humedad, presión y velocidad del viento
- 📅 **Pronósticos detallados**: Pronóstico por horas y pronóstico extendido de 5 días
- 🖼️ **Fondos dinámicos**: Imágenes de fondo que cambian automáticamente según la ciudad seleccionada
- 📱 **Diseño responsivo**: Interfaz adaptable para dispositivos móviles y escritorio
- 🎨 **Glassmorphism UI**: Diseño moderno con efectos de vidrio y transparencias
- 🔄 **Actualizaciones automáticas**: Los datos del clima se actualizan cada 5 minutos

## 🛠️ Tecnologías Utilizadas

- **Frontend**: Next.js 15, React 19, TypeScript
- **Estilos**: Tailwind CSS 4
- **API**: OpenWeatherMap para datos del clima
- **Imágenes**: Pixabay para fondos dinámicos
- **Herramientas**: ESLint para linting de código

## 🚀 Instalación y Configuración

### Prerrequisitos

- Node.js 18+ 
- npm, yarn, pnpm o bun

### Pasos de instalación

1. **Clona el repositorio**
   ```bash
   git clone https://github.com/CmorenoRuizz/tempora.git
   cd tempora
   ```

2. **Instala las dependencias**
   ```bash
   npm install
   # o
   yarn install
   # o
   pnpm install
   ```

3. **Configura las variables de entorno**
   
   Crea un archivo `.env.local` en la raíz del proyecto:
   ```env
   NEXT_PUBLIC_OPENWEATHER_API_KEY=tu_api_key_de_openweathermap
   NEXT_PUBLIC_PIXABAY_API_KEY=tu_api_key_de_pixabay
   ```

   Para obtener las API keys:
   - **OpenWeatherMap**: Regístrate en [openweathermap.org](https://openweathermap.org/api)
   - **Pixabay**: Regístrate en [pixabay.com/api](https://pixabay.com/api/docs/)

4. **Ejecuta el servidor de desarrollo**
   ```bash
   npm run dev
   # o
   yarn dev
   # o
   pnpm dev
   ```

5. **Abre la aplicación**   
   Visita [http://localhost:3000](http://localhost:3000) en tu navegador

## 🏗️ Estructura del Proyecto

```
tempora/
├── src/
│   ├── app/                        # App Router de Next.js
│   │   ├── layout.tsx              # Layout principal
│   │   ├── page.tsx                # Página principal
│   │   └── globals.css             # Estilos globales
│   ├── components/                 # Componentes React
│   │   ├── WeatherCard.tsx         # Tarjeta del clima actual
│   │   ├── SearchBar.tsx           # Barra de búsqueda con autocompletado
│   │   ├── Background.tsx          # Componente de fondo dinámico
│   │   ├── ForecastSection.tsx     # Sección de pronósticos
│   │   ├── HourlyForecast.tsx      # Pronóstico por horas
│   │   └── DailyForecast.tsx       # Pronóstico de 5 días
│   ├── hooks/                      # Custom Hooks
│   │   ├── useWeather.ts           # Hook para datos del clima
│   │   ├── useCityBackground.ts    # Hook para fondos dinámicos
│   │   ├── useCitySuggestions.ts   # Hook para búsqueda de ciudades
│   │   └── useForecast.ts          # Hook para pronósticos
│   ├── lib/                        # Utilidades y funciones
│   │   └── fetchWeather.ts         # Funciones para la API del clima
│   └── types/                      # Definiciones de TypeScript
│       └── index.ts                # Tipos de datos
├── public/                         # Archivos estáticos
└── ...                             # Configuración del proyecto
```

## 📱 Funcionalidades Detalladas

### Búsqueda de Ciudades
- Autocompletado en tiempo real usando la API de OpenWeatherMap
- Soporte para búsqueda por nombre de ciudad, estado y país
- Validación y manejo de errores

### Datos del Clima
- Temperatura actual y sensación térmica
- Humedad, presión atmosférica y velocidad del viento
- Iconos del clima proporcionados por OpenWeatherMap
- Descripciones en español

### Pronósticos
- **Pronóstico por horas**: Próximas 24 horas con temperatura e iconos
- **Pronóstico extendido**: 5 días con temperaturas máximas y mínimas

### Fondos Dinámicos
- Imágenes de alta calidad de Pixabay
- Transiciones suaves entre fondos
- Precargar imágenes para mejor rendimiento
- Fallback a gradientes cuando no hay imágenes disponibles

## 🎨 Diseño y UX

- **Glassmorphism**: Efectos de vidrio con transparencias y desenfoque
- **Responsive Design**: Adaptable a móviles, tablets y escritorio
- **Grid Layout**: Sistema de rejilla CSS para organización del contenido
- **Transiciones**: Animaciones suaves para mejorar la experiencia

## 🔧 Scripts Disponibles

```bash
npm run dev     # Ejecuta el servidor de desarrollo
npm run build   # Construye la aplicación para producción
npm run start   # Ejecuta la aplicación en modo producción
npm run lint    # Ejecuta el linter de código
```

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Añadir nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request


## 🙏 Reconocimientos

- [OpenWeatherMap](https://openweathermap.org/) por la API del clima
- [Pixabay](https://pixabay.com/) por las imágenes de fondo
- [Next.js](https://nextjs.org/) por el framework
- [Tailwind CSS](https://tailwindcss.com/) por los estilos

---

<div align="center">
  <p>Hecho con ❤️ para proporcionar información del clima de forma elegante</p>
</div>
