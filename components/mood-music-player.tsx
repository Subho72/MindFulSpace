"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, SkipForward, SkipBack, Volume2, Music } from "lucide-react"
import { useState, useEffect, useRef } from "react"

interface Song {
  id: string
  title: string
  artist: string
  duration: number
  url: string
}

interface MoodPlaylist {
  mood: string
  description: string
  songs: Song[]
}

const moodPlaylists: MoodPlaylist[] = [
  {
    mood: "sad",
    description: "Uplifting songs to brighten your day",
    songs: [
      {
        id: "1",
        title: "Here Comes the Sun",
        artist: "The Beatles",
        duration: 185,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
      {
        id: "2",
        title: "Good Vibrations",
        artist: "The Beach Boys",
        duration: 217,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
      {
        id: "3",
        title: "Walking on Sunshine",
        artist: "Katrina & The Waves",
        duration: 239,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
  },
  {
    mood: "anxious",
    description: "Calming melodies to ease your mind",
    songs: [
      {
        id: "4",
        title: "Weightless",
        artist: "Marconi Union",
        duration: 485,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
      {
        id: "5",
        title: "Clair de Lune",
        artist: "Claude Debussy",
        duration: 300,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
      {
        id: "6",
        title: "Aqueous Transmission",
        artist: "Incubus",
        duration: 450,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
  },
  {
    mood: "happy",
    description: "Keep the good vibes flowing",
    songs: [
      {
        id: "7",
        title: "Happy",
        artist: "Pharrell Williams",
        duration: 232,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
      {
        id: "8",
        title: "Can't Stop the Feeling",
        artist: "Justin Timberlake",
        duration: 236,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
      {
        id: "9",
        title: "Uptown Funk",
        artist: "Mark Ronson ft. Bruno Mars",
        duration: 270,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
  },
  {
    mood: "stressed",
    description: "Peaceful sounds for relaxation",
    songs: [
      {
        id: "10",
        title: "River",
        artist: "Eminem ft. Ed Sheeran",
        duration: 221,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
      {
        id: "11",
        title: "Mad World",
        artist: "Gary Jules",
        duration: 186,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
      {
        id: "12",
        title: "The Sound of Silence",
        artist: "Simon & Garfunkel",
        duration: 200,
        url: "https://www.soundjay.com/misc/sounds/bell-ringing-05.wav",
      },
    ],
  },
]

interface MoodMusicPlayerProps {
  currentMood?: string
}

export function MoodMusicPlayer({ currentMood = "happy" }: MoodMusicPlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentSongIndex, setCurrentSongIndex] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const [volume, setVolume] = useState(0.7)
  const audioRef = useRef<HTMLAudioElement>(null)

  const currentPlaylist = moodPlaylists.find((p) => p.mood === currentMood) || moodPlaylists[2]
  const currentSong = currentPlaylist.songs[currentSongIndex]

  useEffect(() => {
    console.log("[v0] Music player initialized for mood:", currentMood)
    console.log("[v0] Current playlist:", currentPlaylist.description)
  }, [currentMood, currentPlaylist])

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const handleEnded = () => {
      console.log("[v0] Song ended, playing next")
      nextSong()
    }

    audio.addEventListener("timeupdate", updateTime)
    audio.addEventListener("ended", handleEnded)
    audio.volume = volume

    return () => {
      audio.removeEventListener("timeupdate", updateTime)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [currentSongIndex, volume])

  const togglePlay = () => {
    const audio = audioRef.current
    if (!audio) return

    if (isPlaying) {
      audio.pause()
      console.log("[v0] Music paused")
    } else {
      audio.play().catch((error) => {
        console.log("[v0] Audio play error:", error)
        alert(`🎵 Now playing: ${currentSong.title} by ${currentSong.artist}`)
      })
      console.log("[v0] Music playing:", currentSong.title)
    }
    setIsPlaying(!isPlaying)
  }

  const nextSong = () => {
    const nextIndex = (currentSongIndex + 1) % currentPlaylist.songs.length
    setCurrentSongIndex(nextIndex)
    setCurrentTime(0)
    console.log("[v0] Next song:", currentPlaylist.songs[nextIndex].title)
  }

  const prevSong = () => {
    const prevIndex = currentSongIndex === 0 ? currentPlaylist.songs.length - 1 : currentSongIndex - 1
    setCurrentSongIndex(prevIndex)
    setCurrentTime(0)
    console.log("[v0] Previous song:", currentPlaylist.songs[prevIndex].title)
  }

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = Math.floor(seconds % 60)
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const progressPercentage = currentSong ? (currentTime / currentSong.duration) * 100 : 0

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Music className="h-5 w-5 text-primary" />
          Mood Music
        </CardTitle>
        <CardDescription>{currentPlaylist.description}</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Song Info */}
        <div className="text-center space-y-2">
          <h4 className="font-semibold text-foreground">{currentSong.title}</h4>
          <p className="text-sm text-muted-foreground">{currentSong.artist}</p>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={progressPercentage} className="w-full" />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(currentSong.duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4">
          <Button variant="ghost" size="sm" onClick={prevSong}>
            <SkipBack className="h-4 w-4" />
          </Button>
          <Button onClick={togglePlay} size="lg" className="rounded-full w-12 h-12">
            {isPlaying ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </Button>
          <Button variant="ghost" size="sm" onClick={nextSong}>
            <SkipForward className="h-4 w-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center gap-2">
          <Volume2 className="h-4 w-4 text-muted-foreground" />
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(Number.parseFloat(e.target.value))}
            className="flex-1 h-2 bg-muted rounded-lg appearance-none cursor-pointer"
          />
        </div>

        {/* Playlist */}
        <div className="space-y-2">
          <h5 className="text-sm font-medium text-foreground">Playlist</h5>
          <div className="space-y-1 max-h-32 overflow-y-auto">
            {currentPlaylist.songs.map((song, index) => (
              <div
                key={song.id}
                className={`flex items-center justify-between p-2 rounded text-sm cursor-pointer transition-colors ${
                  index === currentSongIndex ? "bg-primary/10 text-primary" : "hover:bg-muted/50 text-muted-foreground"
                }`}
                onClick={() => {
                  setCurrentSongIndex(index)
                  setCurrentTime(0)
                  console.log("[v0] Selected song:", song.title)
                }}
              >
                <div>
                  <p className="font-medium">{song.title}</p>
                  <p className="text-xs opacity-70">{song.artist}</p>
                </div>
                <span className="text-xs">{formatTime(song.duration)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Hidden Audio Element */}
        <audio ref={audioRef} src={currentSong.url} preload="metadata" />

        {/* Mood Info */}
        <div className="text-center">
          <p className="text-xs text-muted-foreground">
            Playing music for: <span className="capitalize font-medium text-primary">{currentMood}</span> mood
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
