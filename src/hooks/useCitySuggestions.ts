import { useState, useEffect, useCallback } from 'react';
import type { CityData } from '@/types';

interface UseCitySuggestionsReturn {
  query: string;
  setQuery: (query: string) => void;
  suggestions: CityData[];
  loading: boolean;
  error: string | null;
}

const DEBOUNCE_DELAY = 300;
const API_KEY = process.env.NEXT_PUBLIC_OPENWEATHER_API_KEY;

export function useCitySuggestions(): UseCitySuggestionsReturn {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<CityData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCitySuggestions = useCallback(async (searchQuery: string) => {
    if (!searchQuery.trim() || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${encodeURIComponent(searchQuery)}&limit=5&appid=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error('Error al buscar ciudades');
      }

      const data: CityData[] = await response.json();
      setSuggestions(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  // Debounce effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      fetchCitySuggestions(query);
    }, DEBOUNCE_DELAY);

    return () => clearTimeout(timeoutId);
  }, [query, fetchCitySuggestions]);

  return {
    query,
    setQuery,
    suggestions,
    loading,
    error,
  };
}
