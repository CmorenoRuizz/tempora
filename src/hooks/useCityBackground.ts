import { useState, useEffect, useRef } from "react";

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
  const [imageKey, setImageKey] = useState<string>(''); // Para forzar transiciones
  const loadingImageRef = useRef<HTMLImageElement | null>(null);
  // Función para precargar imagen
  const preloadImage = (url: string): Promise<string> => {
    return new Promise((resolve, reject) => {
      // Validar URL antes de intentar cargar
      if (!url || url === "null" || url === "undefined" || !url.startsWith('https://')) {
        reject(new Error(`URL inválida: ${url}`));
        return;
      }

      console.log("🔄 Precargando imagen:", url);
      
      const img = new Image();
      loadingImageRef.current = img;
      
      img.onload = () => {
        console.log("✅ Imagen precargada:", url);
        resolve(url);
      };
      
      img.onerror = () => {
        console.warn("❌ Error cargando imagen:", url);
        reject(new Error(`Error al cargar imagen: ${url}`));
      };
      
      img.src = url;
    });
  };
  useEffect(() => {
    if (!cityName || typeof cityName !== 'string' || cityName.trim() === '') {
      setImageUrl(null);
      setImageKey('');
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

        const data: PixabayResponse = await response.json();

        if (data.hits && data.hits.length > 0) {
          // Seleccionar una imagen aleatoria entre los primeros 5 resultados
          const randomIndex = Math.floor(Math.random() * data.hits.length);
          const selectedImage = data.hits[randomIndex];
          
          // Usar largeImageURL como solicitado
          const imageUrl = selectedImage.largeImageURL;
          
          if (imageUrl && imageUrl.startsWith('https://')) {
            // Precargar la imagen antes de aplicarla
            try {
              await preloadImage(imageUrl);
              // Solo actualizar el estado si la imagen se cargó correctamente
              setImageUrl(imageUrl);
              setImageKey(`${cityName}-${Date.now()}`); // Key único para transiciones
              console.log(`🏷️ Tags: ${selectedImage.tags}`);
            } catch (preloadError) {
              console.warn(`⚠️ No se pudo precargar la imagen para ${cityName}:`, preloadError);
              // No cambiar imageUrl si la precarga falla, mantener la anterior
            }
          } else {
            console.warn(`⚠️ URL de imagen inválida para ${cityName}:`, imageUrl);
          }
        } else {
          console.log(`⚠️ No se encontraron imágenes para ${cityName}`);
          // No limpiar imageUrl inmediatamente, mantener la imagen anterior
        }
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Error desconocido";
        setError(errorMessage);
        console.error(`❌ Error al obtener imagen de fondo para ${cityName}:`, errorMessage);
        // No limpiar imageUrl en caso de error, mantener la imagen anterior
      } finally {
        setLoading(false);
      }
    };

    fetchCityBackground();

    // Cleanup: cancelar imagen en carga si el componente se desmonta o cambia la ciudad
    return () => {
      if (loadingImageRef.current) {
        loadingImageRef.current.onload = null;
        loadingImageRef.current.onerror = null;
        loadingImageRef.current = null;
      }
    };
  }, [cityName]);

  return { imageUrl, loading, error, imageKey };
}
