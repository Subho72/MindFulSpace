import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Phone, MessageSquare } from "lucide-react"

const hotlines = [
  {
    name: "988 Suicide & Crisis Lifeline",
    phone: "988",
    description: "24/7 crisis support for anyone in emotional distress or suicidal crisis",
    features: ["24/7", "Free", "Confidential", "Multilingual"],
    type: "primary",
  },
  {
    name: "Crisis Text Line",
    phone: "741741",
    text: "HOME",
    description: "Text-based crisis support available 24/7",
    features: ["24/7", "Text-based", "Free", "Anonymous"],
    type: "text",
  },
  {
    name: "SAMHSA National Helpline",
    phone: "1-800-662-4357",
    description: "Treatment referral and information service for mental health and substance abuse",
    features: ["24/7", "Treatment referrals", "Free", "Confidential"],
    type: "referral",
  },
  {
    name: "National Domestic Violence Hotline",
    phone: "1-800-799-7233",
    description: "Support for domestic violence survivors and their loved ones",
    features: ["24/7", "Safety planning", "Free", "Confidential"],
    type: "specialized",
  },
  {
    name: "Trans Lifeline",
    phone: "877-565-8860",
    description: "Crisis support specifically for transgender people",
    features: ["Trans-operated", "Peer support", "Free", "Confidential"],
    type: "specialized",
  },
  {
    name: "LGBT National Hotline",
    phone: "1-888-843-4564",
    description: "Support for LGBTQ+ individuals and their families",
    features: ["Peer counseling", "Free", "Confidential", "LGBTQ+ focused"],
    type: "specialized",
  },
]

export function CrisisHotlines() {
  return (
    <div>
      <h3 className="text-2xl font-semibold text-foreground mb-6">Crisis Hotlines</h3>
      <div className="grid md:grid-cols-2 gap-4">
        {hotlines.map((hotline, index) => (
          <Card
            key={index}
            className={`hover:shadow-md transition-shadow ${
              hotline.type === "primary" ? "border-primary/50 bg-primary/5" : ""
            }`}
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg">{hotline.name}</CardTitle>
                  <CardDescription className="mt-1">{hotline.description}</CardDescription>
                </div>
                {hotline.type === "primary" && (
                  <Badge variant="destructive" className="text-xs">
                    Priority
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {hotline.features.map((feature, idx) => (
                  <Badge key={idx} variant="outline" className="text-xs">
                    {feature}
                  </Badge>
                ))}
              </div>

              <div className="flex gap-2">
                <Button className="flex-1" variant={hotline.type === "primary" ? "destructive" : "outline"} asChild>
                  <a href={`tel:${hotline.phone}`}>
                    <Phone className="h-4 w-4 mr-2" />
                    Call {hotline.phone}
                  </a>
                </Button>

                {hotline.text && (
                  <Button variant="outline" asChild>
                    <a href={`sms:${hotline.phone}`}>
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Text {hotline.text}
                    </a>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
