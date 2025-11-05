import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Trophy, Medal, Award } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import winnerImage1 from "@/assets/winner-1-martin-zwara.jpg";
import winnerImage2 from "@/assets/winner-2-thomas-saar.jpg";
import winnerImage3 from "@/assets/winner-3-marco-reinholz.jpg";
import heroBackground from "@/assets/trophy-celebration.jpg";

// Umschalter: true = Siegerboard anzeigen, false = Leaderboard anzeigen
const SHOW_SIEGERBOARD = true;

const Leaderboard = () => {
  // Leaderboard State (für dynamisches Leaderboard aus der Datenbank)
  const [leaderboardData, setLeaderboardData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [playerRank, setPlayerRank] = useState<number | null>(null);
  const [searchParams] = useSearchParams();
  const playerName = searchParams.get("player");
  // Siegerboard Gewinner (statisch)
  const winners = [
    {
      rank: 1,
      name: "Martin Zwara",
      image: winnerImage1,
      icon: Trophy,
      iconColor: "text-yellow-500",
      badgeVariant: "default" as const,
      badgeText: "Gold-Medaille",
      scale: "md:scale-110"
    },
    {
      rank: 2,
      name: "Thomas Saar",
      image: winnerImage2,
      icon: Medal,
      iconColor: "text-gray-400",
      badgeVariant: "secondary" as const,
      badgeText: "Silber-Medaille",
      scale: ""
    },
    {
      rank: 3,
      name: "Marco Reinholz",
      image: winnerImage3,
      icon: Award,
      iconColor: "text-amber-700",
      badgeVariant: "outline" as const,
      badgeText: "Bronze-Medaille",
      scale: ""
    }
  ];

  // Leaderboard Daten aus Datenbank abrufen
  useEffect(() => {
    if (!SHOW_SIEGERBOARD) {
      fetchLeaderboard();
    }
  }, [playerName]);

  const fetchLeaderboard = async () => {
    try {
      setIsLoading(true);
      
      const { data, error } = await supabase
        .from('leaderboard_view')
        .select('*')
        .order('Gesamtscore', { ascending: false })
        .limit(25);

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
        {SHOW_SIEGERBOARD ? (
          <SiegerboardContent winners={winners} />
        ) : (
          <LeaderboardContent 
            data={leaderboardData} 
            isLoading={isLoading}
            playerRank={playerRank}
            playerName={playerName}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

// Siegerboard Komponente
const SiegerboardContent = ({ winners }: { winners: any[] }) => {
  const podiumOrder = [winners[1], winners[0], winners[2]];

  return (
    <>
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
            Siegerboard
          </h1>
        <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
          Gewinner der DKM Sales Challenge
        </p>
        </div>
      </section>

      {/* Hinweis zur Ehrung */}
      <div className="text-center mt-12 mb-8 px-4">
        <p className="text-muted-foreground italic">
          Die finale Auswertung fand am Mittwoch, den 29.10.2025 um 12:45 Uhr statt. Um 13:00 Uhr findet die Ehrung der Supermakler in der Speaker's Corner statt.
        </p>
      </div>

      {/* Winners Podium */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-end">
          {podiumOrder.map((winner) => (
            <Card 
              key={winner.rank} 
              className={`relative transition-all hover:shadow-xl ${winner.scale} ${
                winner.rank === 1 ? 'md:mt-0 order-1' : 
                winner.rank === 2 ? 'md:mt-8 order-2 md:order-1' : 
                'md:mt-8 order-3'
              }`}
            >
              <div className="absolute -top-4 right-4 z-10">
                <Badge variant={winner.badgeVariant} className="text-lg px-4 py-1 shadow-lg">
                  {winner.rank}. Platz
                </Badge>
              </div>
              
              <CardContent className="pt-10 pb-8 px-6 text-center">
                <div className="flex flex-col items-center gap-4">
                  {/* Avatar with Image */}
                  <Avatar className={`${winner.rank === 1 ? 'w-32 h-32' : 'w-28 h-28'} border-4 ${
                    winner.rank === 1 ? 'border-yellow-500' : 
                    winner.rank === 2 ? 'border-gray-400' : 
                    'border-amber-700'
                  }`}>
                    <AvatarImage src={winner.image} alt={winner.name} className="object-cover" />
                    <AvatarFallback className="text-2xl">
                      {winner.name.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>

                  {/* Medal Icon */}
                  <winner.icon className={`w-12 h-12 ${winner.iconColor}`} />

                  {/* Name */}
                  <h3 className={`font-bold ${winner.rank === 1 ? 'text-2xl' : 'text-xl'}`}>
                    {winner.name}
                  </h3>

                  {/* Medal Badge */}
                  <Badge variant={winner.badgeVariant} className="px-4 py-1">
                    {winner.badgeText}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Congratulations Message */}
        <div className="text-center mt-16 mb-8">
          <h2 className="text-3xl font-bold mb-4">
            Herzlichen Glückwunsch!
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Wir gratulieren allen Gewinnern der DKM Sales Match Challenge zu ihren herausragenden Leistungen!
          </p>
        </div>
      </section>
    </>
  );
};

// Leaderboard Komponente (dynamisch aus Datenbank)
const LeaderboardContent = ({ 
  data, 
  isLoading, 
  playerRank,
  playerName 
}: { 
  data: any[]; 
  isLoading: boolean;
  playerRank: number | null;
  playerName: string | null;
}) => {
  return (
    <>
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
            Leaderboard
          </h1>
          <p className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto">
            Die aktuellen Top-Makler der DKM Sales Match Challenge
          </p>
        </div>
      </section>

      {/* Player Rank Display */}
      {playerRank && playerName && (
        <div className="text-center mt-8 px-4">
          <p className="text-lg font-semibold">
            {playerName} ist auf Platz {playerRank}!
          </p>
        </div>
      )}

      {/* Leaderboard Table */}
      <section className="container mx-auto px-4 py-12 max-w-6xl">
        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Lade Leaderboard...</p>
          </div>
        ) : (
          <Card>
            <CardContent className="p-6">
              <h2 className="text-2xl font-bold mb-6">Top 25 Spieler</h2>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-16">Rang</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Runde</TableHead>
                    <TableHead>Punkte</TableHead>
                    <TableHead>Gesamtscore</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.map((player, index) => (
                    <TableRow 
                      key={player.id || index}
                      className={playerName?.toLowerCase() === player.Username?.toLowerCase() ? 'bg-primary/10' : ''}
                    >
                      <TableCell className="font-bold">{index + 1}</TableCell>
                      <TableCell className="font-medium">{player.Username || 'N/A'}</TableCell>
                      <TableCell>{player.Rundenr || 'N/A'}</TableCell>
                      <TableCell>{player.Punkte || '0'}</TableCell>
                      <TableCell className="font-bold">{player.Gesamtscore || '0'}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </section>
    </>
  );
};

export default Leaderboard;
