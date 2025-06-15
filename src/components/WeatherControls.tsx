import RefreshButton from "./RefreshButton";
import LastUpdateInfo from "./LastUpdateInfo";

type WeatherControlsProps = {
  isCooldownActive: boolean;
  timeRemaining: string;
  lastUpdated: Date | null;
  onRefresh: () => void;
};

export default function WeatherControls({ 
  isCooldownActive, 
  timeRemaining, 
  lastUpdated, 
  onRefresh 
}: WeatherControlsProps) {
  return (
    <div className="flex flex-col items-center space-y-2 mt-6">
      <RefreshButton
        isCooldownActive={isCooldownActive}
        timeRemaining={timeRemaining}
        onRefresh={onRefresh}
      />
      <LastUpdateInfo lastUpdated={lastUpdated} />
    </div>
  );
}
