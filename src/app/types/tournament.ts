export interface Tournament {
  id: string;
  name: string;
  description: string;
  matches: Match[];
}

export interface Match {
  uuid: string;
  matchNumber: number;
  roundNumber: number;
  roundTitle: string;
  teamOnePlayerOne: string;
  teamOnePlayerTwo: string;
  teamTwoPlayerOne: string;
  teamTwoPlayerTwo: string;
  teamOneGame1Score: number | null;
  teamOneGame2Score: number | null;
  teamOneGame3Score: number | null;
  teamOneGame4Score: number | null;
  teamOneGame5Score: number | null;
  teamTwoGame1Score: number | null;
  teamTwoGame2Score: number | null;
  teamTwoGame3Score: number | null;
  teamTwoGame4Score: number | null;
  teamTwoGame5Score: number | null;
  winnerGoesTo: string | null;
  loserGoesTo: string | null;
  isBackdraw: boolean;
  bracketType: "gold" | "bronze" | null;
  winner: 1 | 2 | null;
  plannedStartDate: string;
}
