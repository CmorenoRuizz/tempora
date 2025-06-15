import { getButtonText, getButtonStyles } from "@/utils/formatters";

type RefreshButtonProps = {
  isCooldownActive: boolean;
  timeRemaining: string;
  onRefresh: () => void;
};

export default function RefreshButton({ 
  isCooldownActive, 
  timeRemaining, 
  onRefresh 
}: RefreshButtonProps) {
  return (
    <button
      onClick={onRefresh}
      disabled={isCooldownActive}
      className={getButtonStyles(isCooldownActive)}
    >
      {getButtonText(isCooldownActive, timeRemaining)}
    </button>
  );
}
