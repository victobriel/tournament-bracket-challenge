import TournamentBracket from "./components/TournamentBracket";
import { getTournament } from "./hooks/use-tournament";

export default async function Home() {
  const tournament = await getTournament();

  return (
    <main className="min-h-screen bg-gray-50">
      <TournamentBracket tournament={tournament} />
    </main>
  );
}
