import type { SoundAsset } from "@/lib/soundcn/sound-types"

/**
 * The banner's sweep sound, from the SND02 piano pack. Served from `public/`
 * rather than inlined: at three seconds it would add a quarter of a megabyte
 * of base64 to the home page bundle, and it is decorative enough to fetch
 * lazily on first use.
 */
export const celebrationSound: SoundAsset = {
  name: "celebration",
  src: "/sounds/celebration.wav",
  duration: 3.002,
  format: "wav",
  license: "Unknown",
  author: "SND02 piano pack",
}
