"use client";
import { useRef } from "react";
import { Tournament } from "@/app/types/tournament";
import MatchCard from "../MatchCard";
import BracketConnector from "../BracketConnector";
import { useTournamentMatches } from "@/app/hooks/use-tournament-matches";

interface TournamentBracketProps {
  tournament: Tournament;
}

export default function TournamentBracket({
  tournament,
}: TournamentBracketProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { organizeMatchesByRound } = useTournamentMatches(tournament);
  const rounds = organizeMatchesByRound();
  const roundNumbers = Object.keys(rounds)
    .map(Number)
    .sort((a, b) => a - b);

  return (
    <div className="mx-auto max-w-fit px-2 pt-8">
      <header className="mb-4 text-center">
        <h1 className="text-2xl font-bold text-gray-900">{tournament.name}</h1>
        <p className="text-gray-600">{tournament.description}</p>
      </header>
      <div className="max-h-[calc(100vh-6.5rem)] overflow-auto rounded border border-gray-300 bg-white">
        <div
          ref={containerRef}
          className="relative flex space-x-6 p-1"
          style={{ minWidth: "max-content" }}
        >
          <BracketConnector
            tournament={tournament}
            containerRef={containerRef}
          />
          {roundNumbers.map((roundNumber) => (
            <div key={`round-${roundNumber}`}>
              <h2 className="text-md mb-2 bg-gray-300 py-1 text-center font-semibold">
                {rounds[roundNumber][0]?.roundTitle || `Round ${roundNumber}`}
              </h2>
              <div className="flex h-full flex-col justify-around space-y-4 bg-gray-50 px-2">
                {rounds[roundNumber].map((match) => (
                  <MatchCard key={match.uuid} match={match} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
