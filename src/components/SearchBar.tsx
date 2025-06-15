"use client";

import { useState } from 'react';
import { useCitySuggestions } from '@/hooks/useCitySuggestions';
import type { CityData, CitySelection } from '@/types';

interface SearchBarProps {
  onCitySelect: (city: CitySelection) => void;
}

export default function SearchBar({ onCitySelect }: SearchBarProps) {
  const { query, setQuery, suggestions, loading, error } = useCitySuggestions();
  const [isOpen, setIsOpen] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setIsOpen(value.trim().length > 0);
  };

  const handleSuggestionClick = (suggestion: CityData) => {
    const cityName = suggestion.state 
      ? `${suggestion.name}, ${suggestion.state}, ${suggestion.country}`
      : `${suggestion.name}, ${suggestion.country}`;
    
    setQuery(cityName);
    setIsOpen(false);
    
    const citySelection: CitySelection = {
      lat: suggestion.lat,
      lon: suggestion.lon,
      name: cityName,
    };

    // Bonus: Console.log con la información de la ciudad seleccionada
    console.log('🏙️ Ciudad seleccionada:', {
      name: citySelection.name,
      coordinates: { lat: citySelection.lat, lon: citySelection.lon }
    });

    onCitySelect(citySelection);
  };

  const handleInputFocus = () => {
    if (query.trim().length > 0) {
      setIsOpen(true);
    }
  };

  const handleInputBlur = () => {
    // Pequeño delay para permitir el clic en las sugerencias
    setTimeout(() => setIsOpen(false), 200);
  };
  return (
    <div className="relative w-full max-w-md">
      <div className="relative">        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          onBlur={handleInputBlur}
          placeholder="Buscar ciudad..."
          className="w-full px-4 py-3 text-white placeholder-white/60 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl focus:ring-2 focus:ring-white/40 focus:border-white/40 outline-none transition-all duration-200"
          aria-label="Buscar ciudad"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="city-suggestions"
          role="combobox"
        />
        
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white/60"></div>
          </div>
        )}
      </div>      {isOpen && (
        <div id="city-suggestions" className="absolute z-10 w-full mt-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-lg max-h-60 overflow-y-auto">
          {error && (
            <div className="px-4 py-3 text-red-300 text-sm">
              {error}
            </div>
          )}
          
          {!error && suggestions.length === 0 && !loading && query.trim().length > 0 && (
            <div className="px-4 py-3 text-white/70 text-sm">
              No se encontraron ciudades
            </div>
          )}
          
          {!error && suggestions.length > 0 && (
            <ul role="listbox" className="py-1">
              {suggestions.map((suggestion, index) => (                <li
                  key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-white/10 cursor-pointer text-white border-b border-white/10 last:border-b-0 transition-colors duration-150 rounded-lg mx-1"
                  role="option"
                  aria-selected={false}
                  tabIndex={0}
                >
                  <div className="font-medium">
                    {suggestion.name}
                  </div>
                  <div className="text-sm text-white/70">
                    {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
