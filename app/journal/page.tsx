import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, ArrowLeft, Mic, MessageSquare, Calendar, Filter } from "lucide-react"
import Link from "next/link"

export default function JournalPage() {
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
              <MessageSquare className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Journal</h1>
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
          {/* Quick Actions */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Create New Entry</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
                <Link href="/journal/voice">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <Mic className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle>Voice Journal</CardTitle>
                        <CardDescription>Record your thoughts and feelings</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Link>
              </Card>

              <Card className="hover:shadow-md transition-shadow cursor-pointer" asChild>
                <Link href="/journal/text">
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <MessageSquare className="h-8 w-8 text-primary" />
                      <div>
                        <CardTitle>Text Journal</CardTitle>
                        <CardDescription>Write down your experiences</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                </Link>
              </Card>
            </div>
          </section>

          {/* Journal History */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-semibold text-foreground">Your Journal History</h3>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-2" />
                  Filter
                </Button>
                <Button variant="outline" size="sm">
                  <Calendar className="h-4 w-4 mr-2" />
                  Calendar View
                </Button>
              </div>
            </div>

            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h4 className="text-lg font-medium text-foreground mb-2">Start Your Journal Journey</h4>
              <p className="text-muted-foreground mb-6">
                Begin documenting your thoughts and emotions to track your wellbeing over time
              </p>
              <div className="flex gap-3 justify-center">
                <Button asChild>
                  <Link href="/journal/voice">
                    <Mic className="h-4 w-4 mr-2" />
                    Voice Entry
                  </Link>
                </Button>
                <Button variant="outline" asChild>
                  <Link href="/journal/text">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Text Entry
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
