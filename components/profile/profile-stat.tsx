import { cn } from "@/lib/utils";
import { type } from "os";
import ImageWithFallback from "../ImageWithNoSource";

type MedalType = "gold" | "silver" | "bronze";

interface Props {
  count?: number;
  isFirst?: boolean;
  medalType?: MedalType;
}

const medalImages: Record<MedalType, string> = {
  gold: "/icons/gold-medal.svg",
  silver: "/icons/silver-medal.svg",
  bronze: "/icons/bronze-medal.svg",
};

const ProfileStat = ({ medalType, count = 0, isFirst }: Props) => {
  // 👇 first card (questions/answers)
  if (isFirst) {
    return (
      <div className="dark:border-dark-300 background-light800_darkgradient border-light-700 shadow-light100_dark100 flex items-center justify-around rounded-lg border px-5 py-4 shadow">
        <div className="flex flex-col font-medium">
          150
          <span className="paragraph-regular">Questions</span>
        </div>
        <div className="flex flex-col font-medium">
          140
          <span className="paragraph-regular">Answers</span>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "dark:border-dark-300 background-light800_darkgradient border-light-700 shadow-light100_dark100 flex items-center justify-center gap-3.5 rounded-lg border px-5 py-4 shadow md:justify-start",
        isFirst && "flex justify-around"
      )}
    >
      <ImageWithFallback
        src={medalType ? medalImages[medalType] : undefined}
        alt={`${type} medal`}
        width={40}
        height={40}
      />
      <div className="flex flex-col items-start">
        <span className="text-lg font-semibold">{count}</span>
        <span className="paragraph-regular capitalize">{medalType} badges</span>
      </div>
    </div>
  );
};

export default ProfileStat;
