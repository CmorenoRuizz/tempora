import { formatTime } from "@/utils/formatters";

type LastUpdateInfoProps = {
  lastUpdated: Date | null;
};

export default function LastUpdateInfo({ lastUpdated }: LastUpdateInfoProps) {
  if (!lastUpdated) return null;

  return (
    <p className="text-sm text-gray-300">
      Última actualización: {formatTime(lastUpdated)}
    </p>
  );
}
