import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Zap, Clock, Users, Brain, Activity } from "lucide-react"

const strategies = [
  {
    category: "Immediate Relief",
    icon: Zap,
    color: "text-destructive",
    techniques: [
      {
        name: "5-4-3-2-1 Grounding",
        description: "Name 5 things you see, 4 you can touch, 3 you hear, 2 you smell, 1 you taste",
        duration: "2-5 minutes",
      },
      {
        name: "Box Breathing",
        description: "Breathe in for 4, hold for 4, out for 4, hold for 4. Repeat.",
        duration: "3-10 minutes",
      },
      {
        name: "Cold Water",
        description: "Splash cold water on face or hold ice cubes to activate dive response",
        duration: "30 seconds",
      },
    ],
  },
  {
    category: "Mindfulness",
    icon: Brain,
    color: "text-primary",
    techniques: [
      {
        name: "Body Scan",
        description: "Focus attention on each part of your body from head to toe",
        duration: "10-20 minutes",
      },
      {
        name: "Mindful Walking",
        description: "Walk slowly and focus on each step and your surroundings",
        duration: "5-15 minutes",
      },
      {
        name: "Loving-Kindness Meditation",
        description: "Send kind thoughts to yourself and others",
        duration: "10-15 minutes",
      },
    ],
  },
  {
    category: "Physical Activity",
    icon: Activity,
    color: "text-secondary",
    techniques: [
      {
        name: "Progressive Muscle Relaxation",
        description: "Tense and release each muscle group in your body",
        duration: "10-15 minutes",
      },
      {
        name: "Gentle Exercise",
        description: "Light stretching, yoga, or a short walk",
        duration: "10-30 minutes",
      },
      {
        name: "Dancing",
        description: "Put on music and move your body freely",
        duration: "5-15 minutes",
      },
    ],
  },
  {
    category: "Connection",
    icon: Users,
    color: "text-accent",
    techniques: [
      {
        name: "Call a Friend",
        description: "Reach out to someone you trust for support",
        duration: "10-30 minutes",
      },
      {
        name: "Pet Therapy",
        description: "Spend time with a pet or watch animal videos",
        duration: "5-20 minutes",
      },
      {
        name: "Support Group",
        description: "Join an online or in-person support group",
        duration: "30-60 minutes",
      },
    ],
  },
]

export function CopingStrategies() {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-foreground mb-6">Coping Strategies</h3>
      <div className="grid md:grid-cols-2 gap-6">
        {strategies.map((category, index) => {
          const Icon = category.icon
          return (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon className={`h-5 w-5 ${category.color}`} />
                  {category.category}
                </CardTitle>
                <CardDescription>Techniques to help you feel better in the moment</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.techniques.map((technique, idx) => (
                  <div key={idx} className="p-3 border rounded-lg">
                    <div className="flex items-start justify-between mb-2">
                      <h4 className="font-medium text-foreground">{technique.name}</h4>
                      <Badge variant="outline" className="text-xs">
                        <Clock className="h-3 w-3 mr-1" />
                        {technique.duration}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">{technique.description}</p>
                  </div>
                ))}
                <Button variant="outline" className="w-full bg-transparent">
                  Try {category.category} Techniques
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
