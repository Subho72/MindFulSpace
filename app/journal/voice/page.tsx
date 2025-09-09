import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Heart, ArrowLeft, Mic, Play, Trash2, Calendar } from "lucide-react"
import Link from "next/link"
import { VoiceRecorder } from "@/components/voice-recorder"

export default function VoiceJournalPage() {
  // Mock data for existing voice entries
  const voiceEntries = [
    {
      id: 1,
      date: "Today, 2:30 PM",
      duration: "2:45",
      mood: "Grateful",
      transcript: "Feeling really grateful today for the small moments of peace...",
    },
    {
      id: 2,
      date: "Yesterday, 8:15 PM",
      duration: "4:12",
      mood: "Reflective",
      transcript: "Had some challenging thoughts today but I'm working through them...",
    },
    {
      id: 3,
      date: "2 days ago, 6:00 AM",
      duration: "1:30",
      mood: "Hopeful",
      transcript: "Morning thoughts about new possibilities and fresh starts...",
    },
  ]

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/dashboard">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Mic className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Voice Journal</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">MindfulSpace</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <div className="space-y-8">
          {/* Voice Recorder */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Record Your Thoughts</h2>
            <VoiceRecorder />
          </section>

          {/* Previous Entries */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Your Voice Entries</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span>{voiceEntries.length} entries this week</span>
              </div>
            </div>

            <div className="space-y-4">
              {voiceEntries.map((entry) => (
                <Card key={entry.id} className="hover:shadow-md transition-shadow">
                  <CardContent className="pt-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                          <div className="flex items-center gap-2">
                            <Button size="sm" variant="outline" className="h-8 w-8 p-0 bg-transparent">
                              <Play className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium text-foreground">{entry.duration}</span>
                          </div>
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                            {entry.mood}
                          </span>
                          <span className="text-sm text-muted-foreground">{entry.date}</span>
                        </div>

                        <p className="text-muted-foreground text-sm leading-relaxed">{entry.transcript}</p>
                      </div>

                      <div className="flex items-center gap-2 ml-4">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 w-8 p-0 text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {voiceEntries.length === 0 && (
              <Card className="border-dashed">
                <CardContent className="pt-12 pb-12 text-center">
                  <Mic className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h4 className="text-lg font-medium text-foreground mb-2">No voice entries yet</h4>
                  <p className="text-muted-foreground mb-4">Start by recording your first voice journal entry above</p>
                </CardContent>
              </Card>
            )}
          </section>

          {/* Privacy Notice */}
          <Card className="border-primary/20 bg-primary/5">
            <CardContent className="pt-6">
              <div className="flex items-start gap-3">
                <Heart className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <h4 className="font-medium text-foreground mb-1">Your Privacy Matters</h4>
                  <p className="text-sm text-muted-foreground">
                    All voice recordings are encrypted and stored securely. Only you can access your entries, and you
                    can delete them at any time. We never share or analyze your personal recordings.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
