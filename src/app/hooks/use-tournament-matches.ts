import { Match, Tournament } from "../types/tournament";
import { useTournamentResolveNames } from "./use-tournament-resolve-names";

export const useTournamentMatches = (tournament: Tournament) => {
  const matches = tournament.matches || [];
  const resolvedMatches = useTournamentResolveNames(matches);

  const organizeMatchesByRound = () => {
    return resolvedMatches.reduce(
      (acc, match) => {
        const roundNumber = match.roundNumber;
        if (!acc[roundNumber]) {
          acc[roundNumber] = [];
        }
        acc[roundNumber].push(match);
        return acc;
      },
      {} as Record<number, Match[]>,
    );
  };

  return {
    matches: resolvedMatches,
    organizeMatchesByRound,
  };
};
