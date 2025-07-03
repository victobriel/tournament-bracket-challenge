import { Tournament } from "../types/tournament";

export async function getTournament(): Promise<Tournament> {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const res = await fetch(`${baseUrl}/api/tournament`, {
    cache: "no-cache",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch tournament data");
  }

  return await res.json();
}

export const useTournament = () => {
  const data = getTournament();

  if (!data) {
    throw new Error("No tournament data available");
  }

  return {
    tournament: data,
  };
};
