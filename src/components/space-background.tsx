import { useEffect, useRef } from "react"

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  speed: number
  twinkleSpeed: number
  twinkleOffset: number
}

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  alpha: number
  color: string
}

interface Meteor {
  x: number
  y: number
  vx: number
  vy: number
  len: number
  alpha: number
  life: number
  maxLife: number
  active: boolean
}

export function SpaceBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const rafRef = useRef<number>()
  const starsRef = useRef<Star[]>([])
  const particlesRef = useRef<Particle[]>([])
  const meteorsRef = useRef<Meteor[]>([])
  const mouseRef = useRef({ x: 0, y: 0 })
  const timeRef = useRef(0)
  const nextMeteorRef = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initStars()
    }

    const initStars = () => {
      const count = Math.floor((canvas.width * canvas.height) / 3000)
      starsRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.2,
        alpha: Math.random() * 0.6 + 0.3,
        speed: Math.random() * 0.015 + 0.005,
        twinkleSpeed: Math.random() * 0.02 + 0.005,
        twinkleOffset: Math.random() * Math.PI * 2,
      }))

      particlesRef.current = Array.from({ length: 18 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 90 + 40,
        alpha: Math.random() * 0.06 + 0.02,
        color: Math.random() > 0.5 ? "59,130,246" : Math.random() > 0.5 ? "139,92,246" : "220,38,38",
      }))
    }

    resize()
    window.addEventListener("resize", resize)

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY }
    }
    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    const draw = () => {
      timeRef.current += 1
      const t = timeRef.current

      // Фон — глубокий космос
      ctx.fillStyle = "hsl(222, 47%, 4%)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Туманности / облака
      for (const p of particlesRef.current) {
        p.x += p.vx + (mouseRef.current.x - canvas.width / 2) * 0.00005
        p.y += p.vy + (mouseRef.current.y - canvas.height / 2) * 0.00005

        if (p.x < -p.r) p.x = canvas.width + p.r
        if (p.x > canvas.width + p.r) p.x = -p.r
        if (p.y < -p.r) p.y = canvas.height + p.r
        if (p.y > canvas.height + p.r) p.y = -p.r

        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r)
        grad.addColorStop(0, `rgba(${p.color}, ${p.alpha})`)
        grad.addColorStop(1, `rgba(${p.color}, 0)`)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }

      // Млечный путь — полоса
      const mwGrad = ctx.createLinearGradient(0, canvas.height * 0.2, canvas.width, canvas.height * 0.8)
      mwGrad.addColorStop(0, "rgba(59,130,246,0)")
      mwGrad.addColorStop(0.3, "rgba(100,160,255,0.04)")
      mwGrad.addColorStop(0.5, "rgba(180,200,255,0.07)")
      mwGrad.addColorStop(0.7, "rgba(100,160,255,0.04)")
      mwGrad.addColorStop(1, "rgba(59,130,246,0)")
      ctx.fillStyle = mwGrad
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Звёзды
      for (const s of starsRef.current) {
        const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset)
        const a = s.alpha + twinkle * 0.25

        // Параллакс от мыши
        const px = s.x + (mouseRef.current.x - canvas.width / 2) * s.speed * -0.3
        const py = s.y + (mouseRef.current.y - canvas.height / 2) * s.speed * -0.3

        // Свечение для больших звёзд
        if (s.r > 1.2) {
          const sg = ctx.createRadialGradient(px, py, 0, px, py, s.r * 4)
          sg.addColorStop(0, `rgba(200, 220, 255, ${a * 0.4})`)
          sg.addColorStop(1, "rgba(200,220,255,0)")
          ctx.beginPath()
          ctx.arc(px, py, s.r * 4, 0, Math.PI * 2)
          ctx.fillStyle = sg
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(px, py, s.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(220, 235, 255, ${Math.max(0.1, Math.min(1, a))})` 
        ctx.fill()
      }

      // Редкие яркие звёзды с лучами
      if (t % 3 === 0) {
        const bright = starsRef.current.filter((s) => s.r > 1.3).slice(0, 8)
        for (const s of bright) {
          const px = s.x + (mouseRef.current.x - canvas.width / 2) * s.speed * -0.3
          const py = s.y + (mouseRef.current.y - canvas.height / 2) * s.speed * -0.3
          const twinkle = Math.sin(t * s.twinkleSpeed + s.twinkleOffset)
          const a = (s.alpha + twinkle * 0.3) * 0.6
          const len = s.r * 8

          ctx.save()
          ctx.globalAlpha = a
          ctx.strokeStyle = "rgba(220,235,255,0.6)"
          ctx.lineWidth = 0.5
          for (let angle = 0; angle < Math.PI * 2; angle += Math.PI / 2) {
            ctx.beginPath()
            ctx.moveTo(px, py)
            ctx.lineTo(px + Math.cos(angle) * len, py + Math.sin(angle) * len)
            ctx.stroke()
          }
          ctx.restore()
        }
      }

      // Создаём новые метеоры случайно
      if (t >= nextMeteorRef.current) {
        const angle = (Math.random() * 30 + 20) * (Math.PI / 180) // 20–50° к горизонту
        const speed = Math.random() * 8 + 6
        const len = Math.random() * 120 + 60
        meteorsRef.current.push({
          x: Math.random() * canvas.width * 0.8,
          y: Math.random() * canvas.height * 0.4,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          len,
          alpha: Math.random() * 0.6 + 0.4,
          life: 0,
          maxLife: Math.floor(len / speed) + 10,
          active: true,
        })
        // Следующий метеор через 1.5–4 сек (90–240 кадров при 60fps)
        nextMeteorRef.current = t + Math.floor(Math.random() * 150 + 90)
      }

      // Отрисовываем метеоры
      meteorsRef.current = meteorsRef.current.filter((m) => m.active)
      for (const m of meteorsRef.current) {
        m.life++
        if (m.life >= m.maxLife) { m.active = false; continue }

        const progress = m.life / m.maxLife
        const fade = progress < 0.1 ? progress / 0.1 : 1 - (progress - 0.1) / 0.9
        const curAlpha = m.alpha * fade

        const headX = m.x + m.vx * m.life
        const headY = m.y + m.vy * m.life
        const tailX = headX - Math.cos(Math.atan2(m.vy, m.vx)) * m.len * Math.min(progress * 3, 1)
        const tailY = headY - Math.sin(Math.atan2(m.vy, m.vx)) * m.len * Math.min(progress * 3, 1)

        const grad = ctx.createLinearGradient(tailX, tailY, headX, headY)
        grad.addColorStop(0, `rgba(200, 225, 255, 0)`)
        grad.addColorStop(0.6, `rgba(200, 225, 255, ${curAlpha * 0.4})`)
        grad.addColorStop(1, `rgba(255, 255, 255, ${curAlpha})`)

        ctx.save()
        ctx.beginPath()
        ctx.moveTo(tailX, tailY)
        ctx.lineTo(headX, headY)
        ctx.strokeStyle = grad
        ctx.lineWidth = 1.5
        ctx.lineCap = "round"
        ctx.stroke()

        // Яркая точка головы
        const hg = ctx.createRadialGradient(headX, headY, 0, headX, headY, 4)
        hg.addColorStop(0, `rgba(255,255,255,${curAlpha})`)
        hg.addColorStop(1, "rgba(255,255,255,0)")
        ctx.beginPath()
        ctx.arc(headX, headY, 4, 0, Math.PI * 2)
        ctx.fillStyle = hg
        ctx.fill()
        ctx.restore()
      }

      rafRef.current = requestAnimationFrame(draw)
    }

    rafRef.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener("resize", resize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0"
      style={{ display: "block" }}
    />
  )
}