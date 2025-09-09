"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Heart, Plus, TrendingUp, Calendar, Users, Clock } from "lucide-react"
import Link from "next/link"
import { EmotionalCheckIn } from "@/components/emotional-check-in"
import { HealthyUsageReminder } from "@/components/healthy-usage-reminder"
import { MoodMusicPlayer } from "@/components/mood-music-player"
import { useState, useEffect } from "react"

export default function DashboardPage() {
  const [currentMood, setCurrentMood] = useState<string>("happy")
  const [userData, setUserData] = useState<{ firstName: string; lastName: string } | null>(null)

  useEffect(() => {
    // Listen for mood changes from emotional check-in
    const handleMoodChange = (event: CustomEvent) => {
      console.log("[v0] Mood changed to:", event.detail.mood)
      setCurrentMood(event.detail.mood)
    }

    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      const parsed = JSON.parse(storedUserData)
      setUserData({ firstName: parsed.firstName, lastName: parsed.lastName })
    }

    window.addEventListener("moodChanged", handleMoodChange as EventListener)
    return () => window.removeEventListener("moodChanged", handleMoodChange as EventListener)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-primary" />
            <h1 className="text-xl font-semibold text-foreground">MindfulSpace</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              Welcome back, {userData ? userData.firstName : "User"}
            </span>
            <Button variant="outline" size="sm" asChild>
              <Link href="/settings">Settings</Link>
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Usage Reminder */}
            <HealthyUsageReminder />

            {/* Daily Check-in */}
            <section>
              <h2 className="text-2xl font-semibold text-foreground mb-6">How are you feeling today?</h2>
              <EmotionalCheckIn />
            </section>

            {/* Recent Activity */}
            <section>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-semibold text-foreground">Your Recent Journey</h3>
                <Button variant="outline" size="sm" asChild>
                  <Link href="/journal">View All</Link>
                </Button>
              </div>
              <div className="space-y-4">
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-primary mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">Yesterday, 2:30 PM</p>
                        <p className="text-foreground mt-1">
                          Feeling grateful for small moments of peace today. The morning walk really helped clear my
                          mind.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">Grateful</span>
                          <span className="text-xs bg-secondary/10 text-secondary-foreground px-2 py-1 rounded-full">
                            Peaceful
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-6">
                    <div className="flex items-start gap-4">
                      <div className="w-3 h-3 rounded-full bg-destructive/60 mt-2"></div>
                      <div className="flex-1">
                        <p className="text-sm text-muted-foreground">2 days ago, 6:45 PM</p>
                        <p className="text-foreground mt-1">
                          Had a challenging day at work. Feeling overwhelmed but trying to remember this too shall pass.
                        </p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-xs bg-destructive/10 text-destructive px-2 py-1 rounded-full">
                            Overwhelmed
                          </span>
                          <span className="text-xs bg-muted text-muted-foreground px-2 py-1 rounded-full">Hopeful</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <MoodMusicPlayer currentMood={currentMood} />

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/journal/voice">
                    <Plus className="h-4 w-4 mr-2" />
                    Voice Journal
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/connect">
                    <Users className="h-4 w-4 mr-2" />
                    Find Support
                  </Link>
                </Button>
                <Button className="w-full justify-start bg-transparent" variant="outline" asChild>
                  <Link href="/resources">
                    <Heart className="h-4 w-4 mr-2" />
                    Crisis Resources
                  </Link>
                </Button>
              </CardContent>
            </Card>

            {/* Mood Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Your Progress
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">This week</span>
                      <span className="text-foreground">6 check-ins</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div className="bg-primary h-2 rounded-full" style={{ width: "85%" }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Positive days</span>
                      <span className="text-primary">4 out of 6</span>
                    </div>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href="/insights">
                      <Calendar className="h-4 w-4 mr-2" />
                      View Insights
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Digital Wellbeing */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Digital Wellbeing
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Today's usage</span>
                    <span className="text-sm font-medium">45 minutes</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Sessions</span>
                    <span className="text-sm font-medium">3</span>
                  </div>
                  <Button variant="outline" size="sm" className="w-full bg-transparent" asChild>
                    <Link href="/insights">
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Usage Insights
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Supportive Message */}
            <Card className="border-primary/20 bg-primary/5">
              <CardContent className="pt-6">
                <p className="text-sm text-center text-muted-foreground">
                  "Every small step forward is progress. You're doing better than you think."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
