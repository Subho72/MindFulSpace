"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Heart } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SignInPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields")
      setIsLoading(false)
      return
    }

    try {
      // Simulate authentication (replace with actual auth logic)
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // For demo purposes, accept any email/password combination
      console.log("[v0] Sign in attempt:", { email })

      const existingUser = localStorage.getItem("mindful_user")
      if (existingUser) {
        const userData = JSON.parse(existingUser)
        userData.signedIn = true
        localStorage.setItem("mindful_user", JSON.stringify(userData))
        console.log("[v0] User session restored with emergency contacts")
      } else {
        // Create basic user session if no signup data exists
        localStorage.setItem(
          "mindful_user",
          JSON.stringify({
            email,
            signedIn: true,
            firstName: "User",
            emergencyContacts: [],
          }),
        )
        console.log("[v0] New user session created")
      }

      // Redirect to dashboard on successful sign in
      router.push("/dashboard")
    } catch (err) {
      setError("Sign in failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
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
            <CardTitle>Welcome Back</CardTitle>
            <CardDescription>Sign in to continue your journey of emotional wellbeing</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <form onSubmit={handleSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {error && <div className="text-sm text-destructive text-center">{error}</div>}

              <Button type="submit" className="w-full" size="lg" disabled={isLoading}>
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="text-center text-sm">
              <Link href="/auth/forgot-password" className="text-primary hover:underline">
                Forgot your password?
              </Link>
            </div>
            <div className="text-center text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/auth/signup" className="text-primary hover:underline">
                Sign up here
              </Link>
            </div>
          </CardContent>
        </Card>

        {/* Crisis Support Notice */}
        <Card className="mt-6 border-primary/20 bg-primary/5">
          <CardContent className="pt-6">
            <p className="text-sm text-center text-muted-foreground">
              In crisis? Call 988 (Suicide & Crisis Lifeline) or text "HELLO" to 741741 (Crisis Text Line)
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
