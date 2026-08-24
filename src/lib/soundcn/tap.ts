import type { SoundAsset } from "@/lib/soundcn/sound-types"

/**
 * The blip every collapsible plays as it opens and closes, from the SND01
 * pack. Short enough to sit under the panel animation rather than trail it.
 */
export const tapSound: SoundAsset = {
  name: "tap",
  dataUri:
    "data:audio/wav;base64,UklGRpoDAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YXYDAADx/yT/Hv38+f/1afGR7MbnaePG3zjd+NtF3Dfe7OFS51XuwPZOAK8KcxU6IIMq3jPiOxtCPEb7R55ECD97NzsusCM1GEEMQACV9L7p+9+71y3RjczyyXHJ8MplzpLTRdoq4u7qM/Sc/ccGXw8JF4MdlCIHJtYn4CdIJhcjgx6/GBMSyQo1A6n7dPTn7ULoveOI4LzeZ96G3wPixOWQ6jjwcvb5/IgD0gmOD48UjhhuGxQdZh18HE8aCBfLEs0NRQh2Apn8+/bL8U7to+n85mzl/OS55YLnUur67VTyKvdL/HcBeQYhCzEPkRISFaYWPxfXFn0VRRNIEKwMlghDBM3/evtl98PztvBa7sHsAewP7PXsmO7p8MnzHPe1+nT+KQK5BfUIyAsLDrUPtRDvEIgQaA/EDZQLBAkoBiADDQAP/T76vPeY9evzu/IV8vnxZPJQ87D0bvaD+Mj6Nv2u/xUCXARtBjIIpQmxClkLlgtoC9QK5QmhCBsHWwV+A4YBlf+t/en7UPrz+Nf3DfeL9mX2iPb89rX3s/jf+Tz7tPw8/sz/UwHEAhgEQQU4Bv8GgQfOB9YHpQc3B5YGyAXQBL8DkQJdASMA8P7P/cP81PsO+2z6+/m3+aH5vfkC+nL6Bvu6+4j8af1X/kv/PAAnAQMCywJ5Aw8EewTSBPsEAwXtBKwEVwTfA1EDswICAkoBkQDT/yD/dv7a/VL94PyE/EP8H/wQ/CP8SfyN/N/8TP29/Ub+y/5f/+j/eAD2AHIB3AE2AoQCtALZAuUC4ALCApsCWQIPAroBVQHzAIYAGwC1/1D/9f6k/lz+Kf75/eX91P3c/ez9EP43/nX+r/76/kP/kf/e/yoAcQCwAOsAGAFAAVgBaAFsAWQBUwE2ARQB5QC6AIEATgAXAN7/sf99/1z/Mv8f/wX/AP/8/gL/Dv8m/zf/Yf92/6T/wf/s/wkALgBGAGEAcwCBAIgAjACHAH4AdQBeAE8AOQAcAA4A6//h/8T/t/+q/53/mf+X/5P/oP+f/6//uP/I/9X/5f/x/wEACwAWAB0AIwAmACUAJgAfAB4AEgANAAQA+v/z/+n/4//b/9r/0v/U/9H/0v/X/9f/3P/h/+X/7P/t//T/9v/7//v//v/8/////P/8//n/+P/2//P/9P/v//D/7//t//H/7f/w//D/",
  duration: 0.01,
  format: "wav",
  license: "Unknown",
  author: "SND01 sine pack",
}
