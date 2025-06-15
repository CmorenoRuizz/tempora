type LoadingStateProps = {
  loading: boolean;
  error: string | null;
};

export default function LoadingState({ loading, error }: LoadingStateProps) {
  if (loading) {
    return <p className="text-xl">Cargando clima por ubicación...</p>;
  }

  if (error) {
    return <p className="text-red-400 text-center">{error}</p>;
  }

  return null;
}
