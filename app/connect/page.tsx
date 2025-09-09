import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Heart, ArrowLeft, Users, MessageCircle, Shield, Search, Filter } from "lucide-react"
import Link from "next/link"
import { PeerCard } from "@/components/peer-card"

export default function ConnectPage() {
  // Mock data for peer suggestions
  const suggestedPeers = [
    {
      id: 1,
      name: "Sarah M.",
      age: 28,
      location: "Similar timezone",
      commonInterests: ["Anxiety support", "Mindfulness", "Creative writing"],
      bio: "Finding peace through daily meditation and journaling. Always here to listen.",
      matchScore: 92,
      isOnline: true,
      lastActive: "Active now",
    },
    {
      id: 2,
      name: "Alex K.",
      age: 34,
      location: "Your area",
      commonInterests: ["Depression support", "Exercise", "Reading"],
      bio: "Believer in small steps and celebrating tiny victories. Love discussing books.",
      matchScore: 87,
      isOnline: false,
      lastActive: "2 hours ago",
    },
    {
      id: 3,
      name: "Jordan L.",
      age: 25,
      location: "Similar timezone",
      commonInterests: ["LGBTQ+ support", "Art therapy", "Music"],
      bio: "Artist finding healing through creativity. Open to sharing experiences and support.",
      matchScore: 84,
      isOnline: true,
      lastActive: "Active now",
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
              <Users className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Find Support</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">MindfulSpace</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Search & Filters */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Find Your Community</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search interests..." className="pl-10" />
                </div>
                <Button variant="outline" className="w-full justify-start bg-transparent">
                  <Filter className="h-4 w-4 mr-2" />
                  Advanced Filters
                </Button>
              </CardContent>
            </Card>

            {/* Safety Guidelines */}
            <Card className="border-primary/20 bg-primary/5">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5 text-primary" />
                  Safety First
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm">
                <p className="text-muted-foreground">• Never share personal information</p>
                <p className="text-muted-foreground">• Report inappropriate behavior</p>
                <p className="text-muted-foreground">• Take breaks when needed</p>
                <p className="text-muted-foreground">• Trust your instincts</p>
                <Button variant="outline" size="sm" className="w-full mt-3 bg-transparent">
                  Safety Guidelines
                </Button>
              </CardContent>
            </Card>

            {/* My Connections */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">My Connections</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Active conversations</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Pending requests</span>
                    <span className="text-sm font-medium">1</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent">
                    <MessageCircle className="h-4 w-4 mr-2" />
                    View Messages
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3 space-y-8">
            {/* Introduction */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-4">Connect with Understanding Peers</h2>
              <p className="text-muted-foreground mb-6">
                Find supportive connections with people who share similar experiences and perspectives. All interactions
                are moderated to ensure a safe and supportive environment.
              </p>
            </section>

            {/* Suggested Matches */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Suggested for You</h3>
                <span className="text-sm text-muted-foreground">Based on your interests and experiences</span>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {suggestedPeers.map((peer) => (
                  <PeerCard key={peer.id} peer={peer} />
                ))}
              </div>
            </section>

            {/* Community Groups */}
            <section>
              <h3 className="text-xl font-semibold text-foreground mb-6">Support Communities</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">Anxiety Support Circle</CardTitle>
                    <CardDescription>147 members • Moderated</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      A safe space to share experiences and coping strategies for anxiety management.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          Daily check-ins
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Peer support
                        </Badge>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">Mindful Moments</CardTitle>
                    <CardDescription>89 members • Moderated</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Share mindfulness practices, meditation experiences, and peaceful moments.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          Meditation
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Wellness
                        </Badge>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">Creative Healing</CardTitle>
                    <CardDescription>62 members • Moderated</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Express yourself through art, writing, music, and other creative outlets.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          Art therapy
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Creative
                        </Badge>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader>
                    <CardTitle className="text-lg">Young Adults (18-25)</CardTitle>
                    <CardDescription>134 members • Moderated</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      Navigate young adulthood challenges with peers who understand your journey.
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          Life transitions
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Peer support
                        </Badge>
                      </div>
                      <Button size="sm">Join</Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  )
}
