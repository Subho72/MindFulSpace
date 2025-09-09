"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Heart, ArrowLeft, MessageCircle, Send, MoreHorizontal, Shield } from "lucide-react"
import Link from "next/link"

interface Message {
  id: number
  sender: string
  content: string
  timestamp: string
  isOwn: boolean
}

const generateInteractiveResponse = (userMessage: string, conversationHistory: Message[]) => {
  const message = userMessage.toLowerCase()
  const responses = []

  // Analyze message content for different response types
  if (message.includes("thank") || message.includes("grateful")) {
    responses.push(
      "You're so welcome! It means a lot to know I could help.",
      "I'm grateful for our connection too. We're in this together! 💙",
      "Your gratitude really brightens my day. Thank you for sharing that with me.",
    )
  } else if (message.includes("sad") || message.includes("down") || message.includes("depressed")) {
    responses.push(
      "I hear you, and I want you to know that your feelings are completely valid. You're not alone in this.",
      "Those feelings are so heavy to carry. I'm here with you, and I believe in your strength to get through this.",
      "Thank you for trusting me with how you're feeling. Would it help to talk about what's been weighing on you?",
    )
  } else if (message.includes("anxious") || message.includes("worried") || message.includes("nervous")) {
    responses.push(
      "Anxiety can feel so overwhelming. I've been there too. What helps me is remembering that this feeling will pass.",
      "I understand that worried feeling. Sometimes it helps me to focus on just the next small step. What feels manageable for you right now?",
      "Your anxiety is real and valid. I'm here to listen without judgment. You're braver than you know for reaching out.",
    )
  } else if (message.includes("better") || message.includes("good") || message.includes("happy")) {
    responses.push(
      "I'm so happy to hear you're feeling better! That gives me hope too. What's been helping you?",
      "Your positive energy is contagious! It's wonderful to see you in a good space. 😊",
      "This is so encouraging to hear! I love seeing you thrive. Keep celebrating these moments.",
    )
  } else if (message.includes("help") || message.includes("advice") || message.includes("what should")) {
    responses.push(
      "I wish I had all the answers, but I can share what's worked for me. What specific area would be most helpful to explore?",
      "You're so wise to reach out for support. From my experience, sometimes the smallest steps make the biggest difference.",
      "I don't have perfect solutions, but I have a listening ear and genuine care for you. What feels most important right now?",
    )
  } else if (message.includes("sorry") || message.includes("apologize")) {
    responses.push(
      "Please don't apologize for sharing your authentic self with me. That's exactly what this space is for.",
      "No need to be sorry! Your honesty and vulnerability make our connection stronger.",
      "You never need to apologize for being human. I appreciate you trusting me with your real feelings.",
    )
  } else if (message.includes("how are") || message.includes("how have you")) {
    responses.push(
      "Thank you for asking! I've been reflecting a lot lately on gratitude and small joys. How about you?",
      "I'm doing well, taking things one day at a time. Your friendship has been such a bright spot. How are you holding up?",
      "Some days are easier than others, but connecting with people like you always lifts my spirits. What's been on your mind?",
    )
  } else if (message.includes("name") || message.includes("who are")) {
    responses.push(
      "I'm Sarah! I love connecting with people who understand the journey of mental wellness. What should I call you?",
      "I'm Sarah, and I'm really glad we matched! I feel like we have so much in common already.",
      "Sarah here! I've been looking forward to getting to know you better. What would you like to share about yourself?",
    )
  } else {
    // Default varied responses for general messages
    responses.push(
      "I really appreciate you sharing that with me. It takes courage to be so open.",
      "Thank you for trusting me with your thoughts. I feel honored to be part of your support network.",
      "Your perspective means so much to me. I love how thoughtful and genuine you are.",
      "I'm so glad we connected. Conversations like this remind me why community matters so much.",
      "You have such a beautiful way of expressing yourself. Thank you for being so authentic with me.",
      "I feel like I understand you a little better now. Thank you for letting me into your world.",
    )
  }

  // Add contextual responses based on conversation history
  const recentMessages = conversationHistory.slice(-3)
  const hasBeenSupportive = recentMessages.some(
    (msg) => !msg.isOwn && (msg.content.includes("here for you") || msg.content.includes("understand")),
  )

  if (hasBeenSupportive && Math.random() > 0.7) {
    responses.push(
      "I hope you know how much your openness means to me. You're helping me feel less alone too.",
      "Conversations like ours give me so much hope. Thank you for being such a genuine person.",
    )
  }

  return responses[Math.floor(Math.random() * responses.length)]
}

export default function MessagesPage() {
  const [newMessage, setNewMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [selectedConversationId, setSelectedConversationId] = useState(1)
  const [messageHistories, setMessageHistories] = useState<Record<number, Message[]>>({
    1: [
      {
        id: 1,
        sender: "Sarah M.",
        content: "Hi! I saw we have similar experiences with anxiety. How has your journey been lately?",
        timestamp: "10:30 AM",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content:
          "Hi Sarah! It's been up and down, but I'm trying to stay positive. Your profile mentioned mindfulness - has that helped you?",
        timestamp: "10:35 AM",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Sarah M.",
        content:
          "Daily meditation has been a game-changer. Even just 5 minutes helps me center myself. Do you have any practices that work for you?",
        timestamp: "10:40 AM",
        isOwn: false,
      },
      {
        id: 4,
        sender: "You",
        content: "I've been trying journaling, both written and voice notes. It helps me process my thoughts better.",
        timestamp: "10:45 AM",
        isOwn: true,
      },
      {
        id: 5,
        sender: "Sarah M.",
        content: "Thank you for sharing that. I really relate to what you're going through.",
        timestamp: "10:50 AM",
        isOwn: false,
      },
    ],
    2: [
      {
        id: 1,
        sender: "Alex K.",
        content:
          "Hey! I noticed we both enjoy reading. Have you found any books that helped with your mental health journey?",
        timestamp: "Yesterday",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content: "Yes! 'The Anxiety and Worry Workbook' was really helpful. What about you?",
        timestamp: "Yesterday",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Alex K.",
        content: "That book recommendation was perfect! I'm already feeling more hopeful.",
        timestamp: "1 hour ago",
        isOwn: false,
      },
    ],
    3: [
      {
        id: 1,
        sender: "Jordan L.",
        content: "Hi there! I saw you mentioned art therapy in your profile. I've been curious about trying it myself.",
        timestamp: "Yesterday",
        isOwn: false,
      },
      {
        id: 2,
        sender: "You",
        content:
          "It's been amazing for me! There's something so freeing about expressing emotions through colors and shapes.",
        timestamp: "Yesterday",
        isOwn: true,
      },
      {
        id: 3,
        sender: "Jordan L.",
        content: "Would love to hear more about your art therapy experience.",
        timestamp: "Yesterday",
        isOwn: false,
      },
    ],
  })

  const conversations = [
    {
      id: 1,
      name: "Sarah M.",
      lastMessage: "Thank you for sharing that. I really relate to what you're going through.",
      timestamp: "2 min ago",
      unread: 2,
      isOnline: true,
    },
    {
      id: 2,
      name: "Alex K.",
      lastMessage: "That book recommendation was perfect! I'm already feeling more hopeful.",
      timestamp: "1 hour ago",
      unread: 0,
      isOnline: false,
    },
    {
      id: 3,
      name: "Jordan L.",
      lastMessage: "Would love to hear more about your art therapy experience.",
      timestamp: "Yesterday",
      unread: 1,
      isOnline: true,
    },
  ]

  const currentChat = conversations.find((conv) => conv.id === selectedConversationId) || conversations[0]
  const messages = messageHistories[selectedConversationId] || []

  const handleConversationSelect = (conversationId: number) => {
    console.log("[v0] Switching to conversation with:", conversations.find((c) => c.id === conversationId)?.name)
    setSelectedConversationId(conversationId)
  }

  const handleSendMessage = async () => {
    if (!newMessage.trim() || isLoading) return

    setIsLoading(true)
    console.log("[v0] Sending message to", currentChat.name, ":", newMessage)

    const currentMessages = messageHistories[selectedConversationId] || []
    const newMessageObj: Message = {
      id: currentMessages.length + 1,
      sender: "You",
      content: newMessage.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      isOwn: true,
    }

    setMessageHistories((prev) => ({
      ...prev,
      [selectedConversationId]: [...currentMessages, newMessageObj],
    }))

    const messageToRespond = newMessage.trim()
    setNewMessage("")

    setTimeout(() => {
      setIsLoading(false)
      console.log("[v0] Message sent successfully to", currentChat.name)

      setTimeout(() => {
        const responseContent = generateInteractiveResponse(messageToRespond, currentMessages)

        const responseMessage: Message = {
          id: currentMessages.length + 2,
          sender: currentChat.name,
          content: responseContent,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          isOwn: false,
        }

        setMessageHistories((prev) => ({
          ...prev,
          [selectedConversationId]: [...prev[selectedConversationId], responseMessage],
        }))
        console.log("[v0] Received response from", currentChat.name)
      }, 2000)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/connect">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Connect
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <MessageCircle className="h-6 w-6 text-primary" />
              <h1 className="text-xl font-semibold text-foreground">Messages</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Heart className="h-5 w-5 text-primary" />
            <span className="text-sm text-muted-foreground">MindfulSpace</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 max-w-6xl h-[calc(100vh-120px)]">
        <div className="grid lg:grid-cols-4 gap-6 h-full">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <Card className="h-full">
              <CardHeader>
                <CardTitle className="text-lg">Conversations</CardTitle>
                <CardDescription>Your supportive connections</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {conversations.map((conv) => (
                  <div
                    key={conv.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      conv.id === selectedConversationId ? "bg-primary/10 border-primary" : "hover:bg-muted/50"
                    }`}
                    onClick={() => handleConversationSelect(conv.id)}
                  >
                    <div className="flex items-start justify-between mb-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{conv.name}</span>
                        <div
                          className={`w-2 h-2 rounded-full ${conv.isOnline ? "bg-primary" : "bg-muted-foreground"}`}
                        ></div>
                      </div>
                      {conv.unread > 0 && (
                        <Badge variant="destructive" className="text-xs h-5 w-5 p-0 flex items-center justify-center">
                          {conv.unread}
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-2 mb-1">{conv.lastMessage}</p>
                    <span className="text-xs text-muted-foreground">{conv.timestamp}</span>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <Card className="h-full flex flex-col">
              {/* Chat Header */}
              <CardHeader className="border-b">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div>
                      <CardTitle className="text-lg">{currentChat.name}</CardTitle>
                      <CardDescription className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-primary"></div>
                        Online now
                      </CardDescription>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="sm">
                      <Shield className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>

              {/* Messages */}
              <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div key={message.id} className={`flex ${message.isOwn ? "justify-end" : "justify-start"}`}>
                    <div className={`max-w-[70%] ${message.isOwn ? "order-2" : "order-1"}`}>
                      <div
                        className={`p-3 rounded-lg ${
                          message.isOwn ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
                        }`}
                      >
                        <p className="text-sm">{message.content}</p>
                      </div>
                      <p className={`text-xs text-muted-foreground mt-1 ${message.isOwn ? "text-right" : "text-left"}`}>
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                {isLoading && (
                  <div className="flex justify-end">
                    <div className="max-w-[70%]">
                      <div className="bg-primary/50 text-primary-foreground p-3 rounded-lg">
                        <p className="text-sm">Sending...</p>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>

              {/* Message Input */}
              <div className="border-t p-4">
                <div className="flex gap-2">
                  <Input
                    placeholder="Type a supportive message..."
                    className="flex-1"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    disabled={isLoading}
                  />
                  <Button size="sm" onClick={handleSendMessage} disabled={!newMessage.trim() || isLoading}>
                    <Send className="h-4 w-4" />
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground mt-2 text-center">
                  Remember to be kind and supportive. All messages are monitored for safety.
                </p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
