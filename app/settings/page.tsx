"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Heart, ArrowLeft, User, Shield, Bell, Trash2 } from "lucide-react"
import Link from "next/link"

interface UserData {
  firstName: string
  lastName: string
  email: string
  bio: string
  emergencyContacts: Array<{
    name: string
    phone: string
    relationship: string
  }>
}

export default function SettingsPage() {
  const [userData, setUserData] = useState<UserData>({
    firstName: "",
    lastName: "",
    email: "",
    bio: "",
    emergencyContacts: [],
  })
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    // Load user data from localStorage
    const storedUserData = localStorage.getItem("userData")
    if (storedUserData) {
      const parsed = JSON.parse(storedUserData)
      setUserData(parsed)
    }
  }, [])

  const handleSave = () => {
    setIsLoading(true)
    console.log("[v0] Saving user settings:", userData)

    // Save to localStorage
    localStorage.setItem("userData", JSON.stringify(userData))

    setTimeout(() => {
      setIsLoading(false)
      console.log("[v0] Settings saved successfully")
    }, 1000)
  }

  const handleAddEmergencyContact = () => {
    setUserData((prev) => ({
      ...prev,
      emergencyContacts: [...prev.emergencyContacts, { name: "", phone: "", relationship: "" }],
    }))
  }

  const handleRemoveEmergencyContact = (index: number) => {
    setUserData((prev) => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.filter((_, i) => i !== index),
    }))
  }

  const handleEmergencyContactChange = (index: number, field: string, value: string) => {
    setUserData((prev) => ({
      ...prev,
      emergencyContacts: prev.emergencyContacts.map((contact, i) =>
        i === index ? { ...contact, [field]: value } : contact,
      ),
    }))
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
              <User className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Settings</h1>
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
          {/* Profile Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="h-5 w-5" />
                Profile Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="firstName">First Name</Label>
                  <Input
                    id="firstName"
                    value={userData.firstName}
                    onChange={(e) => setUserData((prev) => ({ ...prev, firstName: e.target.value }))}
                    placeholder="Enter your first name"
                  />
                </div>
                <div>
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input
                    id="lastName"
                    value={userData.lastName}
                    onChange={(e) => setUserData((prev) => ({ ...prev, lastName: e.target.value }))}
                    placeholder="Enter your last name"
                  />
                </div>
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={userData.email}
                  onChange={(e) => setUserData((prev) => ({ ...prev, email: e.target.value }))}
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <Label htmlFor="bio">Bio</Label>
                <Textarea
                  id="bio"
                  value={userData.bio}
                  onChange={(e) => setUserData((prev) => ({ ...prev, bio: e.target.value }))}
                  placeholder="Tell us a bit about yourself..."
                  rows={3}
                />
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contacts */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Emergency Contacts
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userData.emergencyContacts.map((contact, index) => (
                <div key={index} className="p-4 border rounded-lg space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium">Contact {index + 1}</h4>
                    <Button variant="ghost" size="sm" onClick={() => handleRemoveEmergencyContact(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="grid md:grid-cols-3 gap-3">
                    <div>
                      <Label>Name</Label>
                      <Input
                        value={contact.name}
                        onChange={(e) => handleEmergencyContactChange(index, "name", e.target.value)}
                        placeholder="Contact name"
                      />
                    </div>
                    <div>
                      <Label>Phone</Label>
                      <Input
                        value={contact.phone}
                        onChange={(e) => handleEmergencyContactChange(index, "phone", e.target.value)}
                        placeholder="Phone number"
                      />
                    </div>
                    <div>
                      <Label>Relationship</Label>
                      <Input
                        value={contact.relationship}
                        onChange={(e) => handleEmergencyContactChange(index, "relationship", e.target.value)}
                        placeholder="e.g., Mother, Friend"
                      />
                    </div>
                  </div>
                </div>
              ))}
              <Button variant="outline" onClick={handleAddEmergencyContact}>
                Add Emergency Contact
              </Button>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5" />
                Notifications
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Daily Check-in Reminders</p>
                  <p className="text-sm text-muted-foreground">Get gentle reminders to check in with yourself</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Usage Break Reminders</p>
                  <p className="text-sm text-muted-foreground">Healthy usage notifications</p>
                </div>
                <Button variant="outline" size="sm">
                  Enable
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? "Saving..." : "Save Changes"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
