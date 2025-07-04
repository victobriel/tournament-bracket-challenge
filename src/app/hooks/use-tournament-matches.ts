import { resolveParticipantNames } from "../lib/tournment";
import { Match, Tournament } from "../types/tournament";

export const useTournamentMatches = (tournament: Tournament) => {
  const matches = tournament.matches || [];
  const resolvedMatches = resolveParticipantNames(matches);

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
