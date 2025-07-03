import React, { useEffect, useState } from "react";
import { Tournament } from "@/app/types/tournament";
import { useTournamentMatches } from "@/app/hooks/use-tournament-matches";

interface BracketConnectorProps {
  tournament: Tournament;
  containerRef: React.RefObject<HTMLDivElement | null>;
  strokeColor?: string;
  strokeWidth?: number;
}

interface ConnectionLine {
  from: { x: number; y: number };
  to: { x: number; y: number };
  midPoint: { x: number; y: number };
}

export default function BracketConnector({
  tournament,
  containerRef,
  strokeColor = "#CBCFD6",
  strokeWidth = 2,
}: BracketConnectorProps) {
  const [connections, setConnections] = useState<ConnectionLine[]>([]);
  const [containerDimensions, setContainerDimensions] = useState({
    width: 0,
    height: 0,
  });
  const { matches, organizeMatchesByRound } = useTournamentMatches(tournament);

  useEffect(() => {
    const calculateConnections = () => {
      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      setContainerDimensions({
        width: container.scrollWidth,
        height: container.scrollHeight,
      });

      const newConnections: ConnectionLine[] = [];

      const matchesByRound = organizeMatchesByRound();

      const rounds = Object.keys(matchesByRound)
        .map(Number)
        .sort((a, b) => a - b);

      rounds.forEach((roundNumber) => {
        const currentRoundMatches = matchesByRound[roundNumber];

        currentRoundMatches.forEach((match) => {
          if (match.winnerGoesTo) {
            const nextMatch = matches.find(
              (m) => m.uuid === match.winnerGoesTo,
            );
            if (nextMatch) {
              const currentMatchEl = container.querySelector(
                `[data-match-id="${match.uuid}"]`,
              );
              const nextMatchEl = container.querySelector(
                `[data-match-id="${nextMatch.uuid}"]`,
              );

              if (currentMatchEl && nextMatchEl) {
                const currentRect = currentMatchEl.getBoundingClientRect();
                const nextRect = nextMatchEl.getBoundingClientRect();

                const currentX = currentRect.right - containerRect.left;
                const currentY =
                  currentRect.top + currentRect.height / 2 - containerRect.top;

                const nextX = nextRect.left - containerRect.left;
                const nextY =
                  nextRect.top + nextRect.height / 2 - containerRect.top;

                const midX = currentX + (nextX - currentX) / 2;

                newConnections.push({
                  from: { x: currentX, y: currentY },
                  to: { x: nextX, y: nextY },
                  midPoint: { x: midX, y: currentY },
                });
              }
            }
          }
        });
      });

      setConnections(newConnections);
    };

    const timer = setTimeout(calculateConnections, 100);

    window.addEventListener("resize", calculateConnections);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", calculateConnections);
    };
  }, [matches, containerRef, organizeMatchesByRound]);

  if (connections.length === 0) return null;

  return (
    <svg
      className="pointer-events-none absolute top-0 left-0"
      width={containerDimensions.width}
      height={containerDimensions.height}
      style={{ zIndex: 1 }}
    >
      {connections.map((connection, index) => (
        <g key={index}>
          {/* Horizontal line from current match to midpoint */}
          <line
            x1={connection.from.x}
            y1={connection.from.y}
            x2={connection.midPoint.x}
            y2={connection.midPoint.y}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Vertical line from midpoint to next match */}
          <line
            x1={connection.midPoint.x}
            y1={connection.midPoint.y}
            x2={connection.midPoint.x}
            y2={connection.to.y}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
          {/* Horizontal line from midpoint to next match */}
          <line
            x1={connection.midPoint.x}
            y1={connection.to.y}
            x2={connection.to.x}
            y2={connection.to.y}
            stroke={strokeColor}
            strokeWidth={strokeWidth}
          />
        </g>
      ))}
    </svg>
  );
}
