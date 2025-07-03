import { formatDate } from "@/app/lib/utils";
import { Match } from "@/app/types/tournament";
import { Badge } from "../Badge";
import { useRef } from "react";
import { MatchTeamCard } from "../MatchTeamCard";

interface MatchCardProps {
  match: Match;
}

export default function MatchCard({ match }: MatchCardProps) {
  const dateContainerRef = useRef<HTMLParagraphElement>(null);

  const getScores = (teamNumber: 1 | 2) => {
    const prefix = teamNumber === 1 ? "teamOne" : "teamTwo";
    return [
      match[`${prefix}Game1Score` as keyof Match] as number | null,
      match[`${prefix}Game2Score` as keyof Match] as number | null,
      match[`${prefix}Game3Score` as keyof Match] as number | null,
      match[`${prefix}Game4Score` as keyof Match] as number | null,
      match[`${prefix}Game5Score` as keyof Match] as number | null,
    ].filter((score) => score !== null);
  };

  const isTheFinalMatch = () => {
    return match.bracketType === "gold";
  };

  const isTheThirdPlaceMatch = () => {
    return match.bracketType === "bronze";
  };

  const isTheWinnerOfMatch = (teamNumber: 1 | 2) => {
    return match.winner === teamNumber;
  };

  const isTheWinnerOfTournament = (teamNumber: 1 | 2) => {
    return isTheFinalMatch() && isTheWinnerOfMatch(teamNumber);
  };

  const isTheSecondPlace = (teamNumber: 1 | 2) => {
    return isTheFinalMatch() && !isTheWinnerOfMatch(teamNumber);
  };

  const isTheThirdPlace = (teamNumber: 1 | 2) => {
    return match.bracketType === "bronze" && isTheWinnerOfMatch(teamNumber);
  };

  const getColorClass = (teamNumber: 1 | 2) => {
    if (isTheWinnerOfTournament(teamNumber)) return "bg-gold";
    if (isTheSecondPlace(teamNumber)) return "bg-silver/70";
    if (isTheThirdPlace(teamNumber)) return "bg-bronze/70";
    return "";
  };

  return (
    <div>
      {isTheFinalMatch() && (
        <Badge>
          <p
            className={`bg-gold rounded-full px-2 py-1 text-black/80 uppercase`}
          >
            Gold Match
          </p>
        </Badge>
      )}
      {isTheThirdPlaceMatch() && (
        <Badge>
          <p
            className={`bg-bronze/70 rounded-full px-2 py-1 text-black/80 uppercase`}
          >
            Bronze Match
          </p>
        </Badge>
      )}
      <div className="max-h-[125px] min-w-[300px] rounded-lg border border-gray-200 bg-white shadow-md">
        <div data-match-id={match.uuid} className="flex">
          <div className="flex w-6 items-center justify-center border-r border-gray-200 font-semibold">
            <p className="text-xs">{match.matchNumber}</p>
          </div>
          <div className="flex flex-1 flex-col">
            {/* Team 1 */}
            <MatchTeamCard
              teamPlayerOne={match.teamOnePlayerOne}
              teamPlayerTwo={match.teamOnePlayerTwo}
              teamScores={getScores(1)}
              isTheWinnerOfMatch={isTheWinnerOfMatch(1)}
              colorClass={getColorClass(1)}
            />
            <hr className="h-[2px] border-none bg-slate-300" />
            {/* Team 2 */}
            <MatchTeamCard
              teamPlayerOne={match.teamTwoPlayerOne}
              teamPlayerTwo={match.teamTwoPlayerTwo}
              teamScores={getScores(2)}
              isTheWinnerOfMatch={isTheWinnerOfMatch(2)}
              colorClass={getColorClass(2)}
            />
          </div>
        </div>
        <p
          ref={dateContainerRef}
          className="border-t border-gray-200 px-2 py-1 text-xs text-gray-600"
        >
          {formatDate(match.plannedStartDate)}
        </p>
      </div>
    </div>
  );
}
