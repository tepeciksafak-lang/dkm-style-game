import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trophy } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import heroBackground from "@/assets/trophy-celebration.jpg";

const InternalDashboard = () => {
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playerRank, setPlayerRank] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const playerName = searchParams.get("player");

  useEffect(() => {
    fetchLeaderboard();
  }, [playerName]);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('leaderboard_view')
        .select('*')
        .order('Gesamtscore', { ascending: false })
        .limit(50); // Extended view: Top 50 statt 25

      if (error) throw error;

      setLeaderboardData(data || []);

      // Find player rank if searching for specific player
      if (playerName && data) {
        const index = data.findIndex(
          (player: any) => player.Username?.toLowerCase() === playerName.toLowerCase()
        );
        if (index !== -1) {
          setPlayerRank(index + 1);
        }
      }
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative h-[40vh] min-h-[300px] flex items-center justify-center overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ backgroundImage: `url(${heroBackground})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-background"></div>
          </div>
          
          <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
            <Trophy className="w-16 h-16 mx-auto mb-4 text-yellow-500" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Internes Dashboard
            </h1>
            <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
              Live Leaderboard - Alle Daten (Top 50)
            </p>
          </div>
        </section>

        {/* Player Rank Display */}
        {playerName && playerRank && (
          <div className="container mx-auto px-4 py-6 max-w-6xl">
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 text-center">
              <p className="text-lg">
                <span className="font-semibold">{playerName}</span> ist aktuell auf Platz{" "}
                <span className="text-2xl font-bold text-primary">{playerRank}</span>
              </p>
            </div>
          </div>
        )}

        {/* Leaderboard Table */}
        <section className="container mx-auto px-4 py-12 max-w-6xl">
          <div className="rounded-lg border bg-card shadow-sm overflow-hidden">
            {isLoading ? (
              <div className="p-12 text-center">
                <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent motion-reduce:animate-[spin_1.5s_linear_infinite]" />
                <p className="mt-4 text-muted-foreground">Lade Daten...</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-20">Rang</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead className="text-center">Runde</TableHead>
                    <TableHead className="text-center">Punkte</TableHead>
                    <TableHead className="text-center font-semibold">Gesamtscore</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leaderboardData.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-12 text-muted-foreground">
                        Keine Daten verfügbar
                      </TableCell>
                    </TableRow>
                  ) : (
                    leaderboardData.map((player, index) => (
                      <TableRow 
                        key={player.id || index}
                        className={
                          playerName && player.Username?.toLowerCase() === playerName.toLowerCase()
                            ? "bg-primary/10 font-semibold"
                            : ""
                        }
                      >
                        <TableCell className="font-medium">
                          <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                            index === 0 ? 'bg-yellow-500 text-white' :
                            index === 1 ? 'bg-gray-400 text-white' :
                            index === 2 ? 'bg-amber-700 text-white' :
                            'bg-muted text-foreground'
                          }`}>
                            {index + 1}
                          </div>
                        </TableCell>
                        <TableCell className="font-medium">
                          {player.Username || '-'}
                        </TableCell>
                        <TableCell className="text-muted-foreground">
                          {player.Mailadresse || '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {player.Rundenr || '-'}
                        </TableCell>
                        <TableCell className="text-center">
                          {player.Punkte || '-'}
                        </TableCell>
                        <TableCell className="text-center font-semibold text-lg">
                          {player.Gesamtscore || '-'}
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            )}
          </div>

          {/* Data Info */}
          <div className="mt-6 text-center text-sm text-muted-foreground">
            <p>Zeigt die Top {leaderboardData.length} Spieler • Live-Daten aus der Datenbank</p>
            <p className="mt-1">
              Letztes Update: {new Date().toLocaleString('de-DE')}
            </p>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default InternalDashboard;
