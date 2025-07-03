import { cn } from "@/app/lib/utils";

interface MatchTeamCardProps {
  teamPlayerOne: string;
  teamPlayerTwo: string;
  teamScores: number[];
  isTheWinnerOfMatch: boolean;
  colorClass: string;
}

export function MatchTeamCard({
  teamPlayerOne,
  teamPlayerTwo,
  teamScores,
  isTheWinnerOfMatch,
  colorClass,
}: MatchTeamCardProps) {
  return (
    <div
      className={cn("flex h-12 items-center justify-between pl-1", colorClass)}
    >
      <div className="flex-1 py-1">
        <p className={cn("text-sm font-medium")}>{teamPlayerOne}</p>
        <p className={cn("text-sm font-medium")}>{teamPlayerTwo}</p>
      </div>
      <div className="flex h-full">
        {teamScores.map((score, index) => (
          <div
            key={`score-team-${index}`}
            className={cn(
              "flex w-6 items-center justify-center border-l border-slate-300 px-2 text-xs font-semibold",
              isTheWinnerOfMatch && "bg-green-100",
              colorClass,
            )}
          >
            <p>{score}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
