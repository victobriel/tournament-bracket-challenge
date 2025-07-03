import { resolveParticipantNames } from "../lib/tournment";
import { Match } from "../types/tournament";

export const useTournamentResolveNames = (matches: Match[]) => {
  if (!matches) {
    return [];
  }

  return resolveParticipantNames(matches);
};
