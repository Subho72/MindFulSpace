"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, Plus, X } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

interface EmergencyContact {
  name: string
  phone: string
  relationship: string
}

export default function SignUpPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    bio: "",
  })

  const [emergencyContacts, setEmergencyContacts] = useState<EmergencyContact[]>([
    { name: "", phone: "", relationship: "" },
  ])

  const addEmergencyContact = () => {
    if (emergencyContacts.length < 3) {
      setEmergencyContacts([...emergencyContacts, { name: "", phone: "", relationship: "" }])
    }
  }

  const removeEmergencyContact = (index: number) => {
    if (emergencyContacts.length > 1) {
      setEmergencyContacts(emergencyContacts.filter((_, i) => i !== index))
    }
  }

  const updateEmergencyContact = (index: number, field: keyof EmergencyContact, value: string) => {
    const updated = emergencyContacts.map((contact, i) => (i === index ? { ...contact, [field]: value } : contact))
    setEmergencyContacts(updated)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    console.log("[v0] Signup attempt:", {
      ...formData,
      emergencyContacts: emergencyContacts.filter((c) => c.name && c.phone),
    })

    // Simulate signup process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    // Store user data in localStorage for demo
    localStorage.setItem(
      "mindful_user",
      JSON.stringify({
        ...formData,
        emergencyContacts: emergencyContacts.filter((c) => c.name && c.phone),
        signedIn: true,
      }),
    )

    console.log("[v0] Signup successful, redirecting to dashboard")
    router.push("/dashboard")
    setIsLoading(false)
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-2xl font-semibold text-foreground">
            <Heart className="h-8 w-8 text-primary" />
            MindfulSpace
          </Link>
        </div>

        <Card>
          <CardHeader className="text-center">
            <CardTitle>Join MindfulSpace</CardTitle>
            <CardDescription>Create your account to start your journey toward emotional wellbeing</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    placeholder="John"
                    required
                    value={formData.firstName}
                    onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    placeholder="Doe"
                    required
                    value={formData.lastName}
                    onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <Label className="text-sm font-medium">Emergency Contacts</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addEmergencyContact}
                    disabled={emergencyContacts.length >= 3}
                    className="h-8 px-2"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">
                  Add trusted contacts who can support you during difficult times
                </p>

                {emergencyContacts.map((contact, index) => (
                  <Card key={index} className="p-3 bg-muted/30">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <Label className="text-xs">Contact {index + 1}</Label>
                        {emergencyContacts.length > 1 && (
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeEmergencyContact(index)}
                            className="h-6 w-6 p-0"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Input
                          placeholder="Name"
                          value={contact.name}
                          onChange={(e) => updateEmergencyContact(index, "name", e.target.value)}
                          className="text-sm"
                        />
                        <Input
                          placeholder="Relationship"
                          value={contact.relationship}
                          onChange={(e) => updateEmergencyContact(index, "relationship", e.target.value)}
                          className="text-sm"
                        />
                      </div>
                      <Input
                        placeholder="Phone number"
                        type="tel"
                        value={contact.phone}
                        onChange={(e) => updateEmergencyContact(index, "phone", e.target.value)}
                        className="text-sm"
                      />
                    </div>
                  </Card>
                ))}
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Tell us about yourself (optional)</Label>
                <Textarea
                  id="bio"
                  placeholder="Share what brings you here and what you hope to find..."
                  className="resize-none"
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <Button className="w-full" size="lg" type="submit" disabled={isLoading}>
                {isLoading ? "Creating Account..." : "Create Account"}
              </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-4">
              Already have an account?{" "}
              <Link href="/auth/signin" className="text-primary hover:underline">
                Sign in here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Privacy Notice */}
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-xs text-center text-muted-foreground">
              Your privacy and safety are our top priorities. All data is encrypted and we never share personal
              information.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
