import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, Medal, Award, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LeaderboardEntry {
  id: number;
  Username: string;
  Punkte: string;
  created_at: string;
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
        .from('ok')
        .select('*')
        .order('Punkte', { ascending: false })
        .order('created_at', { ascending: true });

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
      
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
            🏆 Leaderboard
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Die besten Spieler der DKM Challenge
          </p>
        </div>

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
            <CardTitle className="text-2xl text-center">Top 7 Spieler</CardTitle>
          </CardHeader>
          <CardContent>
            {leaderboard.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Noch keine Teilnehmer vorhanden.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {leaderboard.slice(0, 7).map((entry, index) => {
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

        {/* Back to Home Button */}
        <div className="text-center">
          <Button 
            onClick={() => navigate('/')}
            size="lg"
            className="px-8"
          >
            Zurück zum Start
          </Button>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Leaderboard;