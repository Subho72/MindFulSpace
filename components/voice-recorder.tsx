"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mic, Square, Play, Pause, RotateCcw, Save } from "lucide-react"

const moodOptions = [
  "Happy",
  "Grateful",
  "Peaceful",
  "Excited",
  "Hopeful",
  "Proud",
  "Anxious",
  "Sad",
  "Frustrated",
  "Overwhelmed",
  "Reflective",
  "Confused",
]

export function VoiceRecorder() {
  const [isRecording, setIsRecording] = useState(false)
  const [isPaused, setIsPaused] = useState(false)
  const [recordingTime, setRecordingTime] = useState(0)
  const [audioBlob, setAudioBlob] = useState<Blob | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [selectedMood, setSelectedMood] = useState("")
  const [notes, setNotes] = useState("")
  const [hasRecording, setHasRecording] = useState(false)

  const mediaRecorderRef = useRef<MediaRecorder | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder

      const chunks: BlobPart[] = []
      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data)
      }

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "audio/wav" })
        setAudioBlob(blob)
        setHasRecording(true)
        stream.getTracks().forEach((track) => track.stop())
      }

      mediaRecorder.start()
      setIsRecording(true)
      setRecordingTime(0)

      intervalRef.current = setInterval(() => {
        setRecordingTime((prev) => prev + 1)
      }, 1000)
    } catch (error) {
      console.error("Error accessing microphone:", error)
      alert("Unable to access microphone. Please check your permissions.")
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
      setIsPaused(false)
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }

  const pauseRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      if (isPaused) {
        mediaRecorderRef.current.resume()
        intervalRef.current = setInterval(() => {
          setRecordingTime((prev) => prev + 1)
        }, 1000)
      } else {
        mediaRecorderRef.current.pause()
        if (intervalRef.current) {
          clearInterval(intervalRef.current)
        }
      }
      setIsPaused(!isPaused)
    }
  }

  const playRecording = () => {
    if (audioBlob && !isPlaying) {
      const audioUrl = URL.createObjectURL(audioBlob)
      audioRef.current = new Audio(audioUrl)
      audioRef.current.play()
      setIsPlaying(true)

      audioRef.current.onended = () => {
        setIsPlaying(false)
        URL.revokeObjectURL(audioUrl)
      }
    } else if (audioRef.current && isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    }
  }

  const resetRecording = () => {
    setAudioBlob(null)
    setHasRecording(false)
    setRecordingTime(0)
    setIsPlaying(false)
    setSelectedMood("")
    setNotes("")
    if (audioRef.current) {
      audioRef.current.pause()
    }
  }

  const saveEntry = () => {
    if (!audioBlob) return

    // Here you would typically save to database
    console.log("Saving voice entry:", {
      audio: audioBlob,
      mood: selectedMood,
      notes: notes,
      duration: recordingTime,
    })

    alert("Voice entry saved successfully!")
    resetRecording()
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Voice Recording</CardTitle>
        <CardDescription>
          Express your thoughts and feelings through voice. Take your time and speak from the heart.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Recording Controls */}
        <div className="flex flex-col items-center space-y-4">
          <div className="text-center">
            <div className="text-3xl font-mono text-foreground mb-2">{formatTime(recordingTime)}</div>
            {isRecording && (
              <div className="flex items-center justify-center gap-2">
                <div className="w-2 h-2 bg-destructive rounded-full animate-pulse"></div>
                <span className="text-sm text-muted-foreground">{isPaused ? "Paused" : "Recording..."}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            {!isRecording && !hasRecording && (
              <Button onClick={startRecording} size="lg" className="h-16 w-16 rounded-full">
                <Mic className="h-6 w-6" />
              </Button>
            )}

            {isRecording && (
              <>
                <Button
                  onClick={pauseRecording}
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 rounded-full bg-transparent"
                >
                  {isPaused ? <Play className="h-5 w-5" /> : <Pause className="h-5 w-5" />}
                </Button>
                <Button onClick={stopRecording} variant="destructive" size="lg" className="h-16 w-16 rounded-full">
                  <Square className="h-6 w-6" />
                </Button>
              </>
            )}

            {hasRecording && (
              <>
                <Button
                  onClick={playRecording}
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 rounded-full bg-transparent"
                >
                  {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
                </Button>
                <Button
                  onClick={resetRecording}
                  variant="outline"
                  size="lg"
                  className="h-12 w-12 rounded-full bg-transparent"
                >
                  <RotateCcw className="h-5 w-5" />
                </Button>
              </>
            )}
          </div>
        </div>

        {/* Mood Selection */}
        {hasRecording && (
          <div>
            <h4 className="font-medium text-foreground mb-3">How were you feeling during this recording?</h4>
            <div className="flex flex-wrap gap-2">
              {moodOptions.map((mood) => (
                <Badge
                  key={mood}
                  variant={selectedMood === mood ? "default" : "outline"}
                  className="cursor-pointer hover:bg-primary/20"
                  onClick={() => setSelectedMood(mood)}
                >
                  {mood}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Additional Notes */}
        {hasRecording && (
          <div>
            <h4 className="font-medium text-foreground mb-3">Additional notes (optional)</h4>
            <Textarea
              placeholder="Add any written thoughts or context to accompany your voice recording..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="resize-none"
              rows={3}
            />
          </div>
        )}

        {/* Save Button */}
        {hasRecording && (
          <div className="flex justify-end">
            <Button onClick={saveEntry} size="lg" disabled={!selectedMood}>
              <Save className="h-4 w-4 mr-2" />
              Save Voice Entry
            </Button>
          </div>
        )}

        {/* Instructions */}
        {!isRecording && !hasRecording && (
          <div className="text-center text-sm text-muted-foreground space-y-2">
            <p>Click the microphone to start recording your thoughts</p>
            <p>Speak naturally and take as much time as you need</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
