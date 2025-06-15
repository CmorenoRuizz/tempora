import { useState, useEffect } from "react";

interface PixabayImage {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  tags: string;
}

interface PixabayResponse {
  hits: PixabayImage[];
  total: number;
  totalHits: number;
}

export function useCityBackground(cityName: string | undefined) {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    if (!cityName) {
      setImageUrl(null);
      return;
    }

    // TEMPORAL: Usar imagen de prueba para verificar que el fondo funciona
    if (cityName === "Madrid" || cityName === "Barcelona" || cityName === "Sevilla") {
      const testUrl = "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1920&q=80";
      setImageUrl(testUrl);
      console.log(`🧪 USANDO URL DE PRUEBA PARA ${cityName}: ${testUrl}`);
      return;
    }

    const fetchCityBackground = async () => {
      setLoading(true);
      setError(null);
      
      console.log(`🖼️ Buscando imagen de fondo para: ${cityName}`);

      try {
        const apiKey = process.env.NEXT_PUBLIC_PIXABAY_API_KEY;
        
        if (!apiKey) {
          throw new Error("API Key de Pixabay no configurada");
        }

        const params = new URLSearchParams({
          key: apiKey,
          q: cityName,
          image_type: "photo",
          orientation: "horizontal",
          category: "places",
          min_width: "1280",
          min_height: "720",
          safesearch: "true",
          order: "popular",
          per_page: "5"
        });

        const response = await fetch(`https://pixabay.com/api/?${params}`);
        
        if (!response.ok) {
          throw new Error(`Error en la respuesta: ${response.status}`);
        }

        const data: PixabayResponse = await response.json();        if (data.hits && data.hits.length > 0) {
          // Seleccionar una imagen aleatoria entre los primeros 5 resultados
          const randomIndex = Math.floor(Math.random() * data.hits.length);
          const selectedImage = data.hits[randomIndex];
          
          // Verificar que la URL sea válida
          const imageUrl = selectedImage.largeImageURL;
          
          if (imageUrl && imageUrl.startsWith('https://')) {
            setImageUrl(imageUrl);
            console.log(`✅ Imagen de fondo cargada para ${cityName}:`);
            console.log(`📸 URL: ${imageUrl}`);
            console.log(`🏷️ Tags: ${selectedImage.tags}`);
          } else {
            console.warn(`⚠️ URL de imagen inválida para ${cityName}:`, imageUrl);
            setImageUrl(null);
          }
        } else {
          console.log(`⚠️ No se encontraron imágenes para ${cityName}`);
          setImageUrl(null);
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        console.error(`❌ Error al cargar imagen de fondo para ${cityName}:`, errorMessage);
        setImageUrl(null);
      } finally {
        setLoading(false);
      }
    };

    fetchCityBackground();
  }, [cityName]);

  return { imageUrl, loading, error };
}
