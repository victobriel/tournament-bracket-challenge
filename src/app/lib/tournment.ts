import { Match } from "../types/tournament";

export function resolveParticipantNames(matches: Match[]): Match[] {
  const sortedMatches = [...matches].sort(
    (a, b) => a.roundNumber - b.roundNumber,
  );

  const matchByUuid = new Map<string, Match>();
  sortedMatches.forEach((match) => {
    matchByUuid.set(match.uuid, match);
  });

  const resolvedMatches: Match[] = [];

  for (const match of sortedMatches) {
    const resolvedMatch = { ...match };

    // Resolver Team One
    if (match.teamOnePlayerOne.startsWith("Winner of Match")) {
      const matchNumber = parseInt(
        match.teamOnePlayerOne.match(/\d+/)?.[0] || "0",
      );
      const sourceMatch =
        resolvedMatches.find((m) => m.matchNumber === matchNumber) ||
        matches.find((m) => m.matchNumber === matchNumber);

      if (sourceMatch && sourceMatch.winner !== null) {
        const winnerPlayers =
          sourceMatch.winner === 1
            ? {
                playerOne: sourceMatch.teamOnePlayerOne,
                playerTwo: sourceMatch.teamOnePlayerTwo,
              }
            : {
                playerOne: sourceMatch.teamTwoPlayerOne,
                playerTwo: sourceMatch.teamTwoPlayerTwo,
              };

        resolvedMatch.teamOnePlayerOne = winnerPlayers.playerOne;
        resolvedMatch.teamOnePlayerTwo = winnerPlayers.playerTwo;
      }
    } else if (match.teamOnePlayerOne.includes("Loser of Semi")) {
      const semiNumber = match.teamOnePlayerOne.includes("Semi 1") ? 1 : 2;
      const semiMatch = resolvedMatches.find(
        (m) =>
          m.roundTitle === "Semi Finals" &&
          (semiNumber === 1 ? m.matchNumber === 13 : m.matchNumber === 14),
      );

      if (semiMatch && semiMatch.winner !== null) {
        const loserPlayers =
          semiMatch.winner === 1
            ? {
                playerOne: semiMatch.teamTwoPlayerOne,
                playerTwo: semiMatch.teamTwoPlayerTwo,
              }
            : {
                playerOne: semiMatch.teamOnePlayerOne,
                playerTwo: semiMatch.teamOnePlayerTwo,
              };

        resolvedMatch.teamOnePlayerOne = loserPlayers.playerOne;
        resolvedMatch.teamOnePlayerTwo = loserPlayers.playerTwo;
      }
    }

    // Resolver Team Two
    if (match.teamTwoPlayerOne.startsWith("Winner of Match")) {
      const matchNumber = parseInt(
        match.teamTwoPlayerOne.match(/\d+/)?.[0] || "0",
      );
      const sourceMatch =
        resolvedMatches.find((m) => m.matchNumber === matchNumber) ||
        matches.find((m) => m.matchNumber === matchNumber);

      if (sourceMatch && sourceMatch.winner !== null) {
        const winnerPlayers =
          sourceMatch.winner === 1
            ? {
                playerOne: sourceMatch.teamOnePlayerOne,
                playerTwo: sourceMatch.teamOnePlayerTwo,
              }
            : {
                playerOne: sourceMatch.teamTwoPlayerOne,
                playerTwo: sourceMatch.teamTwoPlayerTwo,
              };

        resolvedMatch.teamTwoPlayerOne = winnerPlayers.playerOne;
        resolvedMatch.teamTwoPlayerTwo = winnerPlayers.playerTwo;
      }
    } else if (match.teamTwoPlayerOne.includes("Loser of Semi")) {
      // Para bronze final - pegar perdedor da semifinal
      const semiNumber = match.teamTwoPlayerOne.includes("Semi 1") ? 1 : 2;
      const semiMatch = resolvedMatches.find(
        (m) =>
          m.roundTitle === "Semi Finals" &&
          (semiNumber === 1 ? m.matchNumber === 13 : m.matchNumber === 14),
      );

      if (semiMatch && semiMatch.winner !== null) {
        const loserPlayers =
          semiMatch.winner === 1
            ? {
                playerOne: semiMatch.teamTwoPlayerOne,
                playerTwo: semiMatch.teamTwoPlayerTwo,
              }
            : {
                playerOne: semiMatch.teamOnePlayerOne,
                playerTwo: semiMatch.teamOnePlayerTwo,
              };

        resolvedMatch.teamTwoPlayerOne = loserPlayers.playerOne;
        resolvedMatch.teamTwoPlayerTwo = loserPlayers.playerTwo;
      }
    }

    resolvedMatches.push(resolvedMatch);
  }

  return resolvedMatches;
}
