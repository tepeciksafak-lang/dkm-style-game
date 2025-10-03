import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import penaltyKick from "@/assets/penalty-kick.jpg";

interface LeaderboardEntry {
  id: number;
  Username: string;
  Punkte: string;
  created_at: string;
  Rundenr: string;
}

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [playerRank, setPlayerRank] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  
  const playerName = searchParams.get('player');

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      const { data, error } = await supabase
        .from('leaderboard_view')
        .select('*');

      if (error) {
        console.error('Error fetching leaderboard:', error);
        return;
      }

      setLeaderboard(data || []);
      
      // Find player's rank if playerName is provided
      if (playerName && data) {
        const playerIndex = data.findIndex(entry => entry.Username === playerName);
        if (playerIndex !== -1) {
          setPlayerRank(playerIndex + 1);
        }
      }
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRankIcon = (position: number) => {
    switch (position) {
      case 1:
        return <Trophy className="w-6 h-6 text-yellow-500" />;
      case 2:
        return <Medal className="w-6 h-6 text-gray-400" />;
      case 3:
        return <Award className="w-6 h-6 text-amber-600" />;
      default:
        return <span className="w-6 h-6 flex items-center justify-center text-lg font-bold text-muted-foreground">#{position}</span>;
    }
  };

  const getRankBadgeVariant = (position: number) => {
    switch (position) {
      case 1:
        return "default";
      case 2:
        return "secondary";
      case 3:
        return "outline";
      default:
        return "outline";
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Lade Leaderboard...</p>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero Section with Background - Full Width */}
      <section 
        className="relative py-20 px-4 mb-8 bg-cover bg-center"
        style={{ backgroundImage: `url(${penaltyKick})` }}
      >
        {/* Overlay for better text readability */}
        <div className="absolute inset-0 bg-black/60"></div>
        
        <div className="relative z-10 text-center">
          <h1 className="font-encode font-black text-4xl md:text-5xl text-white mb-4">
            Leaderboard
          </h1>
          <p className="font-encode text-xl text-white/90 max-w-2xl mx-auto mb-2">
            Die erste Quiz-Challenge ist eröffnet.
          </p>
          <p className="font-encode text-lg text-white/90 max-w-2xl mx-auto">
            Werden Sie der erste Supermakler der DKM!
          </p>
        </div>
      </section>

      <main className="container mx-auto px-4 py-8">

        {/* Player's Rank Highlight */}
        {playerName && playerRank && (
          <Card className="mb-8 border-primary bg-primary/5">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4">
                <User className="w-6 h-6 text-primary" />
                <span className="text-lg font-semibold">
                  {playerName}, du bist auf Platz {playerRank}!
                </span>
                {getRankIcon(playerRank)}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Top 7 Leaderboard */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle className="text-2xl text-center">Top 30 Makler</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Noch keine Teilnehmer vorhanden.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.slice(0, 30).map((entry, index) => {
                  const position = index + 1;
                  const isCurrentPlayer = playerName === entry.Username;
                  
                  return (
                    <div
                      key={entry.id}
                      className={`flex items-center justify-between p-4 rounded-lg border transition-colors ${
                        isCurrentPlayer ? 'bg-primary/10 border-primary' : 'bg-muted/50'
                      }`}
                    >
                      <div className="flex items-center gap-4">
                        {getRankIcon(position)}
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="font-semibold text-lg">
                              {entry.Username}
                            </span>
                            {isCurrentPlayer && (
                              <Badge variant="default" className="text-xs">Du</Badge>
                            )}
                          </div>
                          <span className="text-sm text-muted-foreground">
                            {new Date(entry.created_at).toLocaleDateString('de-DE')}
                          </span>
                        </div>
                      </div>
                      
                      <div className="text-right">
                        <Badge variant={getRankBadgeVariant(position)} className="text-lg px-3 py-1">
                          {entry.Punkte} Punkte
                        </Badge>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </main>

      {/* CTA with Full Width Background */}
      <div 
        className="relative py-32 px-8 text-center bg-cover bg-center"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url(${penaltyKick})`
        }}
      >
        <div className="relative z-10">
          <h3 className="font-encode font-black text-4xl text-white mb-6">
            Bereit für die Challenge?
          </h3>
          <p className="font-encode text-xl text-white mb-12 max-w-2xl mx-auto">
            Werde der erste Supermakler der DKM!
          </p>
          <Button 
            onClick={() => window.location.href = "/#register"}
            variant="dkm"
            size="lg"
            className="text-xl px-16 py-8"
          >
            Anpfiff
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Leaderboard;