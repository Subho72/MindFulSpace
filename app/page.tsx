import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, MessageCircle, Mic, Users } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">MindfulSpace</h1>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" asChild>
              <Link href="/auth/signin">Sign In</Link>
            </Button>
            <Button asChild>
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center max-w-4xl">
          <h2 className="text-4xl font-bold text-foreground mb-6 text-balance">
            Your Safe Space for Emotional Wellbeing
          </h2>
          <p className="text-lg text-muted-foreground mb-8 text-pretty">
            Share your experiences, connect with understanding peers, and find support when you need it most.
            MindfulSpace is here to listen, support, and help you through both happy and difficult moments.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button size="lg" asChild>
              <Link href="/auth/signup">Start Your Journey</Link>
            </Button>
            <Button variant="outline" size="lg" asChild>
              <Link href="/about">Learn More</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h3 className="text-3xl font-bold text-center text-foreground mb-12">How MindfulSpace Supports You</h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Share & Connect</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Express your feelings and connect with others who understand your experiences
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Mic className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Voice Journaling</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Record your thoughts and emotions through voice notes for deeper self-reflection
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Peer Matching</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Find supportive connections with people who share similar experiences and perspectives
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
                <CardTitle>Crisis Support</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription>
                  Access immediate support resources and professional help when you need it most
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Safety Notice */}
      <section className="py-12 px-4">
        <div className="container mx-auto max-w-4xl">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="text-center text-primary">Your Safety Matters</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground">
                MindfulSpace is designed to support your wellbeing while preventing dependency. We encourage healthy
                usage patterns and provide professional resources when needed. If you're experiencing a crisis, please
                reach out to emergency services or crisis hotlines immediately.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card py-8 px-4">
        <div className="container mx-auto text-center">
          <p className="text-muted-foreground">
            © 2024 MindfulSpace. Supporting mental health with care and compassion.
          </p>
        </div>
      </footer>
    </div>
  )
}
