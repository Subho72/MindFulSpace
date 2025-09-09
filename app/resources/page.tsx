"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Heart,
  ArrowLeft,
  Phone,
  MessageSquare,
  Globe,
  MapPin,
  Clock,
  AlertTriangle,
  Shield,
  Users,
} from "lucide-react"
import Link from "next/link"
import { CrisisHotlines } from "@/components/crisis-hotlines"
import { CopingStrategies } from "@/components/coping-strategies"
import { useEffect, useState } from "react"

interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

interface UserData {
  firstName: string
  lastName: string
  emergencyContacts: EmergencyContact[]
}

export default function ResourcesPage() {
  const [userData, setUserData] = useState<UserData | null>(null)
  const [activeTab, setActiveTab] = useState("emergency")

  useEffect(() => {
    const storedUser = localStorage.getItem("mindful_user")
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser)
        setUserData(user)
        console.log("[v0] Loaded user emergency contacts:", user.emergencyContacts)
      } catch (error) {
        console.error("[v0] Error loading user data:", error)
      }
    }
  }, [])

  const handleTabChange = (value: string) => {
    console.log("[v0] Tab changed to:", value)
    setActiveTab(value)
  }

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
              <Shield className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Crisis Support</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">MindfulSpace</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        <Tabs value={activeTab} onValueChange={handleTabChange} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="emergency" onClick={() => console.log("[v0] Emergency tab clicked")}>
              Emergency
            </TabsTrigger>
            <TabsTrigger value="hotlines" onClick={() => console.log("[v0] Hotlines tab clicked")}>
              Hotlines
            </TabsTrigger>
            <TabsTrigger value="coping" onClick={() => console.log("[v0] Coping tab clicked")}>
              Coping
            </TabsTrigger>
            <TabsTrigger value="professional" onClick={() => console.log("[v0] Professional tab clicked")}>
              Professional
            </TabsTrigger>
            <TabsTrigger value="safety" onClick={() => console.log("[v0] Safety Plan tab clicked")}>
              Safety Plan
            </TabsTrigger>
            <TabsTrigger value="guidelines" onClick={() => console.log("[v0] Safety Guidelines tab clicked")}>
              Safety Guidelines
            </TabsTrigger>
            <TabsTrigger value="communities" onClick={() => console.log("[v0] Support Communities tab clicked")}>
              Support Communities
            </TabsTrigger>
          </TabsList>

          <TabsContent value="emergency" className="space-y-8">
            {/* Emergency Banner */}
            <Card className="border-destructive/50 bg-destructive/5">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <AlertTriangle className="h-8 w-8 text-destructive mt-1" />
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold text-foreground mb-2">In Immediate Crisis?</h2>
                    <p className="text-muted-foreground mb-4">
                      If you're having thoughts of suicide or self-harm, please reach out for immediate help. You are
                      not alone, and support is available 24/7.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <Button size="lg" variant="destructive" asChild>
                        <a href="tel:988">
                          <Phone className="h-4 w-4 mr-2" />
                          Call 988 - Crisis Lifeline
                        </a>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <a href="sms:741741">
                          <MessageSquare className="h-4 w-4 mr-2" />
                          Text HOME to 741741
                        </a>
                      </Button>
                      <Button size="lg" variant="outline" asChild>
                        <a href="tel:911">Emergency Services: 911</a>
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {userData?.emergencyContacts && userData.emergencyContacts.length > 0 && (
              <Card className="border-primary/50 bg-primary/5">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-primary" />
                    Your Emergency Contacts
                  </CardTitle>
                  <CardDescription>
                    People you trust who can provide immediate support during difficult times
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {userData.emergencyContacts.map((contact, index) => (
                      <Card key={index} className="bg-card">
                        <CardContent className="pt-4">
                          <div className="text-center space-y-2">
                            <h4 className="font-semibold text-foreground">{contact.name}</h4>
                            <p className="text-sm text-muted-foreground">{contact.relationship}</p>
                            <Button
                              className="w-full"
                              size="sm"
                              asChild
                              onClick={() => console.log("[v0] Emergency contact called:", contact.name)}
                            >
                              <a href={`tel:${contact.phone}`}>
                                <Phone className="h-3 w-3 mr-2" />
                                {contact.phone}
                              </a>
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                  <p className="text-xs text-muted-foreground mt-4 text-center">
                    These contacts were added when you created your account. You can update them in your profile
                    settings.
                  </p>
                </CardContent>
              </Card>
            )}

            {/* Quick Access */}
            <section>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Immediate Support</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <Phone className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">Crisis Hotlines</CardTitle>
                    <CardDescription>24/7 phone support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      View Numbers
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <MessageSquare className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">Crisis Chat</CardTitle>
                    <CardDescription>Text-based support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      Start Chat
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <MapPin className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">Find Help Nearby</CardTitle>
                    <CardDescription>Local resources</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline">
                      Search Location
                    </Button>
                  </CardContent>
                </Card>

                <Card className="hover:shadow-md transition-shadow cursor-pointer">
                  <CardHeader className="text-center">
                    <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                    <CardTitle className="text-lg">Support Groups</CardTitle>
                    <CardDescription>Peer support</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full bg-transparent" variant="outline" asChild>
                      <Link href="/connect">Find Groups</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </section>
          </TabsContent>

          <TabsContent value="hotlines">
            <CrisisHotlines />
          </TabsContent>

          <TabsContent value="coping">
            <CopingStrategies />
          </TabsContent>

          <TabsContent value="professional" className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Professional Support</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    Find a Therapist
                  </CardTitle>
                  <CardDescription>Connect with licensed mental health professionals</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">Psychology Today</p>
                        <p className="text-sm text-muted-foreground">Find therapists in your area</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.psychologytoday.com" target="_blank" rel="noopener noreferrer">
                          Visit
                        </a>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">BetterHelp</p>
                        <p className="text-sm text-muted-foreground">Online therapy platform</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://www.betterhelp.com" target="_blank" rel="noopener noreferrer">
                          Visit
                        </a>
                      </Button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <p className="font-medium">SAMHSA Treatment Locator</p>
                        <p className="text-sm text-muted-foreground">Government resource finder</p>
                      </div>
                      <Button variant="outline" size="sm" asChild>
                        <a href="https://findtreatment.samhsa.gov" target="_blank" rel="noopener noreferrer">
                          Visit
                        </a>
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Emergency Services
                  </CardTitle>
                  <CardDescription>When to seek immediate help</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Go to Emergency Room if:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• You have a specific suicide plan</li>
                        <li>• You're actively self-harming</li>
                        <li>• You're experiencing psychosis</li>
                        <li>• You feel completely out of control</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">Call 911 if:</h4>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        <li>• Someone is in immediate danger</li>
                        <li>• Medical emergency alongside mental health crisis</li>
                        <li>• Unable to ensure safety</li>
                      </ul>
                    </div>
                    <Button className="w-full" variant="destructive" asChild>
                      <a href="tel:911">
                        <Phone className="h-4 w-4 mr-2" />
                        Call Emergency Services
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="safety" className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground mb-6">Safety Planning</h3>
            <Card>
              <CardHeader>
                <CardTitle>Create Your Safety Plan</CardTitle>
                <CardDescription>
                  A safety plan helps you recognize warning signs and know what to do during a crisis
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">1. Warning Signs</h4>
                      <p className="text-sm text-muted-foreground">
                        Identify thoughts, feelings, or situations that might lead to a crisis
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">2. Coping Strategies</h4>
                      <p className="text-sm text-muted-foreground">
                        List activities that help you feel better when you're alone
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">3. Support People</h4>
                      <p className="text-sm text-muted-foreground">
                        Friends, family, or professionals you can contact for support
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium text-foreground mb-2">4. Professional Contacts</h4>
                      <p className="text-sm text-muted-foreground">
                        Therapist, doctor, or crisis services contact information
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">5. Safe Environment</h4>
                      <p className="text-sm text-muted-foreground">
                        Remove or secure items that could be used for self-harm
                      </p>
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground mb-2">6. Reasons to Live</h4>
                      <p className="text-sm text-muted-foreground">
                        Personal motivations and things that give your life meaning
                      </p>
                    </div>
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button>Create My Safety Plan</Button>
                  <Button variant="outline" asChild>
                    <a href="https://suicidesafetyplan.com" target="_blank" rel="noopener noreferrer">
                      Learn More
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="guidelines" className="space-y-6">
            {console.log("[v0] Safety Guidelines content rendered")}
            <h3 className="text-2xl font-semibold text-foreground mb-6">Safety Guidelines</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Shield className="h-5 w-5" />
                    Digital Safety
                  </CardTitle>
                  <CardDescription>Protecting yourself online and in the app</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-1">Privacy Protection</h4>
                      <p className="text-sm text-muted-foreground">
                        Never share personal information like full name, address, or financial details with other users
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-1">Report Concerns</h4>
                      <p className="text-sm text-muted-foreground">
                        Report any inappropriate behavior, harassment, or concerning messages immediately
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-1">Healthy Boundaries</h4>
                      <p className="text-sm text-muted-foreground">
                        Set limits on app usage and take breaks when needed to maintain mental wellness
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5" />
                    Crisis Safety
                  </CardTitle>
                  <CardDescription>What to do in emergency situations</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-1">Immediate Danger</h4>
                      <p className="text-sm text-muted-foreground">
                        If you or someone else is in immediate danger, call emergency services (911) right away
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-1">Suicidal Thoughts</h4>
                      <p className="text-sm text-muted-foreground">
                        Contact crisis hotlines immediately - they're available 24/7 and completely confidential
                      </p>
                    </div>
                    <div className="p-3 border rounded-lg">
                      <h4 className="font-medium mb-1">Supporting Others</h4>
                      <p className="text-sm text-muted-foreground">
                        Listen without judgment, encourage professional help, and don't try to be a therapist
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="communities" className="space-y-6">
            {console.log("[v0] Support Communities content rendered")}
            <h3 className="text-2xl font-semibold text-foreground mb-6">Support Communities</h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5" />
                    Depression Support
                  </CardTitle>
                  <CardDescription>Connect with others who understand depression</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    A safe space to share experiences and coping strategies
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>1,247 members</span>
                    <span>Active daily</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/connect">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5" />
                    Anxiety Relief
                  </CardTitle>
                  <CardDescription>Support for anxiety and panic disorders</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Share techniques and find comfort in shared experiences
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>892 members</span>
                    <span>Active daily</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/connect">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    General Wellness
                  </CardTitle>
                  <CardDescription>Overall mental health and wellness support</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Discuss self-care, mindfulness, and healthy habits
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>2,156 members</span>
                    <span>Active daily</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/connect">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Crisis Survivors
                  </CardTitle>
                  <CardDescription>Support for those who've overcome crisis</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">Share recovery stories and hope with others</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>543 members</span>
                    <span>Moderated</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/connect">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Daily Check-ins
                  </CardTitle>
                  <CardDescription>Daily motivation and accountability</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Start each day with positive support and encouragement
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>1,789 members</span>
                    <span>Very active</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href="/connect">Join Community</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5" />
                    Local Support
                  </CardTitle>
                  <CardDescription>Find support groups in your area</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with local in-person support groups and events
                  </p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span>Location-based</span>
                    <span>Verified groups</span>
                  </div>
                  <Button className="w-full bg-transparent" variant="outline">
                    Find Near Me
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
