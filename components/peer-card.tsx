"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { MessageCircle, Heart, MoreHorizontal, Flag, UserCheck } from "lucide-react"

interface Peer {
  id: number
  name: string
  age: number
  location: string
  commonInterests: string[]
  bio: string
  matchScore: number
  isOnline: boolean
  lastActive: string
}

interface PeerCardProps {
  peer: Peer
}

export function PeerCard({ peer }: PeerCardProps) {
  const [isConnected, setIsConnected] = useState(peer.id === 1) // Sarah is pre-connected
  const [connectionSent, setConnectionSent] = useState(false)
  const router = useRouter()

  const handleConnect = () => {
    if (!isConnected && !connectionSent) {
      setConnectionSent(true)
      console.log("[v0] Sending connection request to", peer.name)
      setTimeout(() => {
        setIsConnected(true)
        setConnectionSent(false)
        console.log("[v0] Connection accepted with", peer.name)
      }, 1000) // Reduced from 2000ms to 1000ms
    }
  }

  const handleMessage = () => {
    console.log("[v0] Opening messages with", peer.name)
    router.push(`/connect/messages?peer=${peer.id}&name=${encodeURIComponent(peer.name)}`)
  }

  const handleDirectMessage = () => {
    if (!isConnected) {
      // Auto-connect when trying to message
      setIsConnected(true)
      console.log("[v0] Auto-connecting with", peer.name, "for messaging")
    }
    handleMessage()
  }

  return (
    <Card className="hover:shadow-md transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{peer.name}</CardTitle>
              <div className={`w-2 h-2 rounded-full ${peer.isOnline ? "bg-primary" : "bg-muted-foreground"}`}></div>
            </div>
            <CardDescription>
              {peer.age} years old • {peer.location}
            </CardDescription>
            <div className="flex items-center gap-2 mt-2">
              <Badge variant="secondary" className="text-xs">
                {peer.matchScore}% match
              </Badge>
              <span className="text-xs text-muted-foreground">{peer.lastActive}</span>
            </div>
          </div>
          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground leading-relaxed">{peer.bio}</p>

        <div>
          <p className="text-xs font-medium text-foreground mb-2">Common interests:</p>
          <div className="flex flex-wrap gap-1">
            {peer.commonInterests.map((interest, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {interest}
              </Badge>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2 pt-2">
          {isConnected ? (
            <>
              <Button size="sm" className="flex-1" onClick={handleMessage}>
                <MessageCircle className="h-3 w-3 mr-2" />
                Message
              </Button>
              <Button variant="outline" size="sm">
                <UserCheck className="h-3 w-3" />
              </Button>
            </>
          ) : connectionSent ? (
            <>
              <Button size="sm" className="flex-1" disabled>
                Connecting...
              </Button>
              <Button variant="outline" size="sm" onClick={handleDirectMessage}>
                <MessageCircle className="h-3 w-3 mr-2" />
                Message
              </Button>
            </>
          ) : (
            <>
              <Button size="sm" onClick={handleConnect}>
                <Heart className="h-3 w-3 mr-2" />
                Connect
              </Button>
              <Button size="sm" onClick={handleDirectMessage}>
                <MessageCircle className="h-3 w-3 mr-2" />
                Message
              </Button>
            </>
          )}

          <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-destructive">
            <Flag className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
