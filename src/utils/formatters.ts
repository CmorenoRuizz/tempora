export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('es-ES', { 
    hour: '2-digit', 
    minute: '2-digit' 
  });
};

export const getButtonText = (isCooldownActive: boolean, timeRemaining: string): string => {
  if (isCooldownActive && timeRemaining) {
    return `Renovar tiempo en ${timeRemaining}`;
  }
  return 'Actualizar clima ahora';
};

export const getButtonStyles = (isCooldownActive: boolean): string => {
  return `px-6 py-3 rounded-lg font-semibold text-white transition-all duration-200 ${
    isCooldownActive
      ? 'bg-red-600 cursor-not-allowed opacity-70'
      : 'bg-green-600 hover:bg-green-700 active:scale-95'
  }`;
};
