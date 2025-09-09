import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Heart, ArrowLeft, Clock, TrendingUp, Calendar, Target, Pause, Sun, Moon, Activity } from "lucide-react"
import Link from "next/link"
import { UsageChart } from "@/components/usage-chart"
import { HealthyUsageReminder } from "@/components/healthy-usage-reminder"

export default function InsightsPage() {
  // Mock usage data
  const todayUsage = {
    totalTime: 45, // minutes
    sessions: 3,
    checkIns: 2,
    voiceEntries: 1,
    connections: 1,
    recommendedLimit: 60, // minutes per day
  }

  const weeklyData = [
    { day: "Mon", usage: 35, mood: 7 },
    { day: "Tue", usage: 52, mood: 6 },
    { day: "Wed", usage: 28, mood: 8 },
    { day: "Thu", usage: 45, mood: 7 },
    { day: "Fri", usage: 38, mood: 8 },
    { day: "Sat", usage: 25, mood: 9 },
    { day: "Sun", usage: 45, mood: 7 },
  ]

  const usagePercentage = (todayUsage.totalTime / todayUsage.recommendedLimit) * 100

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
              <TrendingUp className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Usage Insights</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">MindfulSpace</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="space-y-8">
          {/* Healthy Usage Reminder */}
          <HealthyUsageReminder />

          {/* Today's Usage */}
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-6">Today's Digital Wellbeing</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Total Time</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{todayUsage.totalTime}m</span>
                  </div>
                  <div className="mt-2">
                    <Progress value={usagePercentage} className="h-2" />
                    <p className="text-xs text-muted-foreground mt-1">
                      {Math.round(usagePercentage)}% of recommended daily limit
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Sessions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Activity className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{todayUsage.sessions}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Healthy range: 2-4 sessions</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Check-ins</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{todayUsage.checkIns}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Great self-awareness!</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium text-muted-foreground">Connections</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-primary" />
                    <span className="text-2xl font-bold text-foreground">{todayUsage.connections}</span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">Meaningful interactions</p>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Usage Trends */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">Weekly Trends</h3>
            <UsageChart data={weeklyData} />
          </section>

          {/* Usage Patterns */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">Usage Patterns</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Sun className="h-5 w-5 text-primary" />
                    Peak Usage Times
                  </CardTitle>
                  <CardDescription>When you're most active on MindfulSpace</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Morning (6-12 PM)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={30} className="w-20 h-2" />
                      <span className="text-sm font-medium">30%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Afternoon (12-6 PM)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={25} className="w-20 h-2" />
                      <span className="text-sm font-medium">25%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Evening (6-10 PM)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={35} className="w-20 h-2" />
                      <span className="text-sm font-medium">35%</span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Night (10 PM-6 AM)</span>
                    <div className="flex items-center gap-2">
                      <Progress value={10} className="w-20 h-2" />
                      <span className="text-sm font-medium">10%</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-primary" />
                    Weekly Summary
                  </CardTitle>
                  <CardDescription>Your digital wellbeing this week</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Average daily usage</span>
                    <span className="text-sm font-medium">38 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Days within healthy limit</span>
                    <Badge variant="secondary">6 out of 7</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Most productive day</span>
                    <span className="text-sm font-medium">Saturday</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Mood correlation</span>
                    <Badge variant="outline">Positive trend</Badge>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>

          {/* Recommendations */}
          <section>
            <h3 className="text-xl font-semibold text-foreground mb-6">Personalized Recommendations</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="border-primary/20 bg-primary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Pause className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Take Regular Breaks</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        You've been using the app for 25 minutes. Consider taking a 5-minute break to practice
                        mindfulness offline.
                      </p>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Set Break Reminder
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-secondary/20 bg-secondary/5">
                <CardContent className="pt-6">
                  <div className="flex items-start gap-3">
                    <Moon className="h-5 w-5 text-secondary-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium text-foreground mb-1">Evening Wind-down</h4>
                      <p className="text-sm text-muted-foreground mb-3">
                        Consider limiting app usage 1 hour before bedtime for better sleep quality.
                      </p>
                      <Button size="sm" variant="outline" className="bg-transparent">
                        Enable Sleep Mode
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
