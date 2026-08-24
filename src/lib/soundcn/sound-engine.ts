import type { SoundAsset } from "@/lib/soundcn/sound-types"

let audioContext: AudioContext | null = null
const bufferCache = new Map<string, AudioBuffer>()

export function getAudioContext(): AudioContext {
  if (!audioContext) {
    audioContext = new AudioContext()
    resumeOnFirstGesture(audioContext)
  }
  return audioContext
}

/**
 * A context built outside a user gesture starts suspended, and anything
 * started on it while suspended waits in line to play the instant it resumes.
 * Resuming on the first gesture keeps that queue from arriving minutes later
 * as a pile of sounds nobody asked for.
 */
function resumeOnFirstGesture(ctx: AudioContext) {
  if (typeof window === "undefined" || ctx.state === "running") return

  const events = ["pointerdown", "keydown", "touchend"] as const
  const onGesture = () => {
    ctx
      .resume()
      .then(() => {
        if (ctx.state === "running") {
          for (const event of events) {
            window.removeEventListener(event, onGesture)
          }
        }
      })
      .catch(() => {
        // Still blocked. The next gesture gets another go.
      })
  }

  for (const event of events) {
    window.addEventListener(event, onGesture, { passive: true })
  }
}

/**
 * Whether a sound played right now would actually be heard. Sounds tied to a
 * click can ignore this — the click is the gesture that unblocks them — but a
 * sound triggered by movement alone should ask first.
 */
export function isAudioReady(): boolean {
  return audioContext?.state === "running"
}

/**
 * Where a sound's bytes live: the inlined data URI, or the file under
 * `public/` when the clip is too big to inline.
 */
export function soundSource(sound: SoundAsset): string {
  const source = sound.src ?? sound.dataUri
  if (!source) {
    throw new Error(
      `Sound "${sound.name}" has neither \`src\` nor \`dataUri\`.`
    )
  }
  return source
}

/** Accepts a data URI or a URL; decoded buffers are cached by source. */
export async function decodeAudioData(source: string): Promise<AudioBuffer> {
  const cached = bufferCache.get(source)
  if (cached) return cached

  const ctx = getAudioContext()
  const bytes = source.startsWith("data:")
    ? dataUriToBytes(source)
    : await (await fetch(source)).arrayBuffer()

  const audioBuffer = await ctx.decodeAudioData(
    bytes instanceof ArrayBuffer ? bytes : bytes.buffer.slice(0)
  )
  bufferCache.set(source, audioBuffer)
  return audioBuffer
}

function dataUriToBytes(dataUri: string) {
  const base64 = dataUri.split(",")[1]
  const binaryString = atob(base64)
  const bytes = new Uint8Array(binaryString.length)
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i)
  }
  return bytes
}

export interface PlaySoundOptions {
  volume?: number
  playbackRate?: number
  onEnd?: () => void
}

export interface SoundPlayback {
  stop: () => void
}

export async function playSound(
  sourceUrl: string,
  options: PlaySoundOptions = {}
): Promise<SoundPlayback> {
  const { volume = 1, playbackRate = 1, onEnd } = options
  const ctx = getAudioContext()
  if (ctx.state === "suspended") {
    await ctx.resume()
  }

  const buffer = await decodeAudioData(sourceUrl)
  const source = ctx.createBufferSource()
  const gain = ctx.createGain()

  source.buffer = buffer
  source.playbackRate.value = playbackRate
  gain.gain.value = volume

  source.connect(gain)
  gain.connect(ctx.destination)

  source.onended = () => {
    onEnd?.()
  }

  source.start(0)

  return {
    stop: () => {
      try {
        source.stop()
      } catch {
        // No-op if already stopped.
      }
    },
  }
}
