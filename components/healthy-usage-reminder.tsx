"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Clock, Pause, X, Leaf } from "lucide-react"

export function HealthyUsageReminder() {
  const [showReminder, setShowReminder] = useState(false)
  const [sessionTime, setSessionTime] = useState(0)

  useEffect(() => {
    // Simulate session tracking
    const interval = setInterval(() => {
      setSessionTime((prev) => {
        const newTime = prev + 1
        // Show reminder after 20 minutes of continuous use
        if (newTime === 20 && !showReminder) {
          setShowReminder(true)
        }
        return newTime
      })
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [showReminder])

  const handleTakeBreak = () => {
    setShowReminder(false)
    setSessionTime(0)
    // Here you could implement actual break functionality
    alert("Great choice! Take a few minutes to breathe and be present.")
  }

  const handleDismiss = () => {
    setShowReminder(false)
  }

  if (!showReminder) {
    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Leaf className="h-5 w-5 text-primary" />
              <div>
                <h4 className="font-medium text-foreground">Mindful Usage</h4>
                <p className="text-sm text-muted-foreground">
                  Current session: {sessionTime} minutes • Remember to take breaks and stay present
                </p>
              </div>
            </div>
            <Badge variant="outline" className="text-xs">
              <Clock className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-destructive/50 bg-destructive/5 animate-pulse">
      <CardContent className="pt-6">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <Pause className="h-6 w-6 text-destructive mt-0.5" />
            <div>
              <h4 className="font-medium text-foreground mb-1">Time for a Mindful Break</h4>
              <p className="text-sm text-muted-foreground mb-3">
                You've been using MindfulSpace for {sessionTime} minutes. Taking regular breaks helps maintain a healthy
                relationship with technology and supports your overall wellbeing.
              </p>
              <div className="flex gap-2">
                <Button size="sm" onClick={handleTakeBreak}>
                  Take a 5-Minute Break
                </Button>
                <Button size="sm" variant="outline" onClick={handleDismiss} className="bg-transparent">
                  Continue (Remind Later)
                </Button>
              </div>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={handleDismiss} className="h-8 w-8 p-0">
            <X className="h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
