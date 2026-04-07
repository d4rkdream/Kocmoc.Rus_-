import { useEffect, useRef } from "react"

export function CustomCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const posRef = useRef({ x: -200, y: -200 })
  const targetRef = useRef({ x: -200, y: -200 })
  const trailRef = useRef<{ x: number; y: number; alpha: number }[]>([])
  const rafRef = useRef<number>()

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      targetRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const TRAIL_LENGTH = 28

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      posRef.current.x = lerp(posRef.current.x, targetRef.current.x, 0.18)
      posRef.current.y = lerp(posRef.current.y, targetRef.current.y, 0.18)

      trailRef.current.unshift({ x: posRef.current.x, y: posRef.current.y, alpha: 1 })
      if (trailRef.current.length > TRAIL_LENGTH) trailRef.current.pop()

      // Хвост кометы
      for (let i = trailRef.current.length - 1; i >= 1; i--) {
        const p = trailRef.current[i]
        const pPrev = trailRef.current[i - 1]
        const t = 1 - i / TRAIL_LENGTH
        const alpha = t * 0.7
        const width = t * 5

        ctx.beginPath()
        ctx.moveTo(pPrev.x, pPrev.y)
        ctx.lineTo(p.x, p.y)
        ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`
        ctx.lineWidth = width
        ctx.lineCap = "round"
        ctx.lineJoin = "round"
        ctx.stroke()
      }

      // Свечение вокруг головы
      if (trailRef.current.length > 0) {
        const head = trailRef.current[0]

        const glow = ctx.createRadialGradient(head.x, head.y, 0, head.x, head.y, 14)
        glow.addColorStop(0, "rgba(180, 220, 255, 0.6)")
        glow.addColorStop(0.4, "rgba(120, 180, 255, 0.2)")
        glow.addColorStop(1, "rgba(80, 140, 255, 0)")
        ctx.beginPath()
        ctx.arc(head.x, head.y, 14, 0, Math.PI * 2)
        ctx.fillStyle = glow
        ctx.fill()

        // Ядро кометы
        ctx.beginPath()
        ctx.arc(head.x, head.y, 3.5, 0, Math.PI * 2)
        ctx.fillStyle = "rgba(255, 255, 255, 1)"
        ctx.shadowColor = "rgba(180, 220, 255, 0.9)"
        ctx.shadowBlur = 10
        ctx.fill()
        ctx.shadowBlur = 0
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("mousemove", handleMouseMove)
      window.removeEventListener("resize", resize)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-[9999]"
      style={{ mixBlendMode: "screen" }}
    />
  )
}
