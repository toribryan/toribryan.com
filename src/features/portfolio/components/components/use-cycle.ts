import { useEffect, useState } from "react"

/** Steps through `0..count-1` every `ms` while `active`, starting over at 0. */
export function useCycle(count: number, ms: number, active: boolean) {
  const [step, setStep] = useState(0)
  useEffect(() => {
    if (!active) return
    const id = window.setInterval(() => setStep((s) => (s + 1) % count), ms)
    return () => {
      window.clearInterval(id)
      setStep(0)
    }
  }, [count, ms, active])
  return step
}
