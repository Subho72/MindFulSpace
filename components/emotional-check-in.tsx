"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Smile, Meh, Frown, Heart, AlertTriangle } from "lucide-react"

const moodOptions = [
  {
    id: "great",
    label: "Great",
    icon: Smile,
    color: "bg-primary text-primary-foreground",
    description: "Feeling wonderful and energized",
    musicMood: "happy",
  },
  {
    id: "good",
    label: "Good",
    icon: Smile,
    color: "bg-secondary text-secondary-foreground",
    description: "Generally positive and content",
    musicMood: "happy",
  },
  {
    id: "okay",
    label: "Okay",
    icon: Meh,
    color: "bg-muted text-muted-foreground",
    description: "Neutral, getting by",
    musicMood: "happy",
  },
  {
    id: "struggling",
    label: "Struggling",
    icon: Frown,
    color: "bg-destructive/20 text-destructive",
    description: "Having a difficult time",
    musicMood: "sad",
  },
  {
    id: "crisis",
    label: "In Crisis",
    icon: AlertTriangle,
    color: "bg-destructive text-destructive-foreground",
    description: "Need immediate support",
    musicMood: "anxious",
  },
]

const emotionTags = [
  "Happy",
  "Grateful",
  "Peaceful",
  "Excited",
  "Hopeful",
  "Proud",
  "Anxious",
  "Sad",
  "Angry",
  "Frustrated",
  "Overwhelmed",
  "Lonely",
  "Confused",
  "Tired",
  "Stressed",
  "Worried",
  "Disappointed",
  "Hurt",
]

const getPersonalizedResponse = (mood: string, emotions: string[], thoughts: string) => {
  const hasPositiveEmotions = emotions.some((e) =>
    ["Happy", "Grateful", "Peaceful", "Excited", "Hopeful", "Proud"].includes(e),
  )
  const hasNegativeEmotions = emotions.some((e) =>
    ["Anxious", "Sad", "Angry", "Frustrated", "Overwhelmed", "Lonely"].includes(e),
  )

  switch (mood) {
    case "great":
      return {
        title: hasPositiveEmotions
          ? "Your positive energy is contagious! ✨"
          : "What a wonderful day you're having! 🌟",
        message:
          "It's beautiful to see you thriving. Keep embracing these moments of joy and share that light with others around you.",
      }
    case "good":
      return {
        title: "You're doing really well today! 😊",
        message:
          "There's something special about feeling content and at peace. Take a moment to appreciate this good feeling.",
      }
    case "okay":
      return {
        title: "Every day doesn't have to be perfect 💙",
        message: thoughts
          ? "Thanks for sharing what's on your mind. Sometimes just getting through the day is enough, and that's perfectly okay."
          : "You're managing well, and that takes strength. Be gentle with yourself today.",
      }
    case "struggling":
      if (hasNegativeEmotions) {
        const dominantEmotion = emotions.find((e) => ["Overwhelmed", "Anxious", "Sad", "Frustrated"].includes(e))
        return {
          title: `I hear that you're feeling ${dominantEmotion?.toLowerCase() || "overwhelmed"} 🤗`,
          message:
            "These feelings are temporary, even when they feel overwhelming. You've gotten through difficult days before, and you have the strength to get through this one too.",
        }
      }
      return {
        title: "I'm glad you reached out today 💜",
        message:
          "Struggling doesn't mean you're failing. It means you're human, and you're brave for acknowledging how you feel.",
      }
    case "crisis":
      return {
        title: "You are not alone in this moment 🆘",
        message:
          "Reaching out takes incredible courage. Your life has value, and there are people who want to help you through this.",
      }
    default:
      return {
        title: "Thank you for checking in with yourself 💚",
        message:
          "Self-awareness is the first step toward emotional wellbeing. You're taking care of yourself by being here.",
      }
  }
}

export function EmotionalCheckIn() {
  const [selectedMood, setSelectedMood] = useState<string>("")
  const [selectedEmotions, setSelectedEmotions] = useState<string[]>([])
  const [thoughts, setThoughts] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleEmotionToggle = (emotion: string) => {
    setSelectedEmotions((prev) => (prev.includes(emotion) ? prev.filter((e) => e !== emotion) : [...prev, emotion]))
  }

  const handleSubmit = () => {
    if (!selectedMood) return

    const selectedMoodData = moodOptions.find((m) => m.id === selectedMood)

    if (selectedMoodData) {
      const moodChangeEvent = new CustomEvent("moodChanged", {
        detail: {
          mood: selectedMoodData.musicMood,
          originalMood: selectedMood,
          emotions: selectedEmotions,
        },
      })
      window.dispatchEvent(moodChangeEvent)
      console.log("[v0] Mood change event emitted:", selectedMoodData.musicMood)
    }

    // Here you would typically save to database
    setIsSubmitted(true)

    // Show crisis support if needed
    if (selectedMood === "crisis") {
      // Trigger crisis support modal/redirect
      alert("Crisis support resources will be shown immediately")
    }
  }

  if (isSubmitted) {
    const selectedMoodData = moodOptions.find((m) => m.id === selectedMood)
    const response = getPersonalizedResponse(selectedMood, selectedEmotions, thoughts)

    return (
      <Card className="border-primary/20 bg-primary/5">
        <CardContent className="pt-6 text-center">
          <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">{response.title}</h3>
          <p className="text-muted-foreground mb-4">{response.message}</p>

          {selectedEmotions.length > 0 && (
            <div className="mb-4">
              <p className="text-sm text-muted-foreground mb-2">You're experiencing:</p>
              <div className="flex flex-wrap gap-1 justify-center">
                {selectedEmotions.map((emotion) => (
                  <Badge key={emotion} variant="secondary" className="text-xs">
                    {emotion}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {selectedMood === "crisis" && (
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4 mb-4">
              <p className="text-destructive font-medium mb-2">Immediate Support Available</p>
              <p className="text-sm text-muted-foreground mb-3">
                You don't have to go through this alone. Professional help is available 24/7.
              </p>
              <Button variant="destructive" size="sm">
                Get Crisis Support Now
              </Button>
            </div>
          )}
          {selectedMood === "struggling" && (
            <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-4 mb-4">
              <p className="text-secondary-foreground font-medium mb-2">You're Not Alone</p>
              <p className="text-sm text-muted-foreground mb-3">
                Difficult times are temporary. Consider connecting with supportive peers or resources.
              </p>
              <Button variant="outline" size="sm">
                Find Support Community
              </Button>
            </div>
          )}
          <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 mb-4">
            <p className="text-sm text-muted-foreground">
              🎵 Playing{" "}
              {selectedMoodData?.musicMood === "sad"
                ? "uplifting"
                : selectedMoodData?.musicMood === "anxious"
                  ? "calming"
                  : "positive"}{" "}
              music to support your mood
            </p>
          </div>
          <Button variant="outline" onClick={() => setIsSubmitted(false)} className="mt-4">
            Check In Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Daily Emotional Check-In</CardTitle>
        <CardDescription>
          Take a moment to reflect on how you're feeling right now. Your emotions are valid and important.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Mood Selection */}
        <div>
          <h4 className="font-medium text-foreground mb-3">How would you describe your overall mood?</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {moodOptions.map((mood) => {
              const Icon = mood.icon
              return (
                <button
                  key={mood.id}
                  onClick={() => setSelectedMood(mood.id)}
                  className={`p-4 rounded-lg border-2 transition-all text-left ${
                    selectedMood === mood.id ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <Icon className="h-5 w-5" />
                    <span className="font-medium">{mood.label}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{mood.description}</p>
                </button>
              )
            })}
          </div>
        </div>

        {/* Emotion Tags */}
        {selectedMood && (
          <div>
            <h4 className="font-medium text-foreground mb-3">What specific emotions are you experiencing?</h4>
            <div className="flex flex-wrap gap-2">
              {emotionTags.map((emotion) => (
                <Badge
                  key={emotion}
                  variant={selectedEmotions.includes(emotion) ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => handleEmotionToggle(emotion)}
                >
                  {emotion}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Thoughts */}
        {selectedMood && (
          <div>
            <h4 className="font-medium text-foreground mb-3">What's on your mind? (Optional)</h4>
            <Textarea
              placeholder="Share your thoughts, experiences, or what led to these feelings..."
              value={thoughts}
              onChange={(e) => setThoughts(e.target.value)}
              className="resize-none"
              rows={4}
            />
          </div>
        )}

        {/* Submit */}
        {selectedMood && (
          <div className="flex justify-end">
            <Button onClick={handleSubmit} size="lg">
              Complete Check-In
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
