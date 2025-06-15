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
          className="w-full px-4 py-3 text-gray-900 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
          aria-label="Buscar ciudad"
          aria-expanded={isOpen}
          aria-autocomplete="list"
          aria-controls="city-suggestions"
          role="combobox"
        />
        
        {loading && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>      {isOpen && (
        <div id="city-suggestions" className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {error && (
            <div className="px-4 py-3 text-red-600 text-sm">
              {error}
            </div>
          )}
          
          {!error && suggestions.length === 0 && !loading && query.trim().length > 0 && (
            <div className="px-4 py-3 text-gray-500 text-sm">
              No se encontraron ciudades
            </div>
          )}
          
          {!error && suggestions.length > 0 && (
            <ul role="listbox" className="py-1">
              {suggestions.map((suggestion, index) => (                <li
                  key={`${suggestion.lat}-${suggestion.lon}-${index}`}
                  onClick={() => handleSuggestionClick(suggestion)}
                  className="px-4 py-3 hover:bg-blue-50 cursor-pointer text-gray-900 border-b border-gray-100 last:border-b-0 transition-colors duration-150"
                  role="option"
                  aria-selected={false}
                  tabIndex={0}
                >
                  <div className="font-medium">
                    {suggestion.name}
                  </div>
                  <div className="text-sm text-gray-600">
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
