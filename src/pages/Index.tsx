import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import { SpaceBackground } from "@/components/space-background"
import { HistorySection } from "@/components/sections/work-section"
import { ProjectsSection } from "@/components/sections/services-section"
import { CareerSection } from "@/components/sections/about-section"
import { AchievementsSection } from "@/components/sections/contact-section"
import { NewsSection } from "@/components/sections/news-section"
import { InternshipsSection } from "@/components/sections/internships-section"
import { MagneticButton } from "@/components/magnetic-button"
import { useRef, useEffect, useState } from "react"
import Icon from "@/components/ui/icon"

function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 })

  useEffect(() => {
    const target = new Date("2025-09-01T00:00:00")
    const interval = setInterval(() => {
      const now = new Date()
      const diff = target.getTime() - now.getTime()
      if (diff <= 0) {
        clearInterval(interval)
        return
      }
      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  return (
    <div className="flex items-center gap-4 font-mono text-foreground/90">
      {[
        { v: timeLeft.days, l: "дней" },
        { v: timeLeft.hours, l: "часов" },
        { v: timeLeft.minutes, l: "минут" },
        { v: timeLeft.seconds, l: "секунд" },
      ].map(({ v, l }, i) => (
        <div key={i} className="flex flex-col items-center">
          <span className="text-3xl font-light tabular-nums md:text-5xl">
            {String(v).padStart(2, "0")}
          </span>
          <span className="text-xs text-foreground/50 uppercase tracking-widest">{l}</span>
        </div>
      ))}
    </div>
  )
}

function NavHint() {
  return (
    <div className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2">
      <div className="flex items-center gap-3 rounded-2xl border border-foreground/10 bg-background/40 px-5 py-3 backdrop-blur-xl shadow-lg shadow-black/20">
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-foreground/15 bg-foreground/8 px-1.5 font-mono text-[10px] text-foreground/40">←</span>
          <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-foreground/15 bg-foreground/8 px-1.5 font-mono text-[10px] text-foreground/40">→</span>
        </div>
        <span className="font-mono text-[10px] text-foreground/25">или</span>
        <div className="flex items-center gap-1.5">
          <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-foreground/15 bg-foreground/8 px-1.5 font-mono text-[10px] text-foreground/40">A</span>
          <span className="flex h-6 min-w-[1.5rem] items-center justify-center rounded-md border border-foreground/15 bg-foreground/8 px-1.5 font-mono text-[10px] text-foreground/40">D</span>
        </div>
        <span className="mx-1 h-4 w-px bg-foreground/10" />
        <Icon name="Mouse" size={13} className="text-foreground/25 shrink-0" />
        <span className="font-mono text-[10px] text-foreground/30">колёсико скроллит содержимое</span>
      </div>
    </div>
  )
}

export default function Index() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [currentSection, setCurrentSection] = useState(0)
  const [loggedInUser, setLoggedInUser] = useState<{ name: string; email: string; level: number } | null>(null)
  const touchStartY = useRef(0)
  const touchStartX = useRef(0)
  const isAnimating = useRef(false)

  const totalSections = 6 + (loggedInUser ? 2 : 0)

  const scrollToSection = (index: number) => {
    if (isAnimating.current) return
    const clamped = Math.max(0, Math.min(totalSections - 1, index))
    if (clamped === currentSection) return
    if (scrollContainerRef.current) {
      isAnimating.current = true
      const sectionWidth = scrollContainerRef.current.offsetWidth
      scrollContainerRef.current.scrollTo({
        left: sectionWidth * clamped,
        behavior: "smooth",
      })
      setCurrentSection(clamped)
      setTimeout(() => { isAnimating.current = false }, 600)
    }
  }

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      // Колёсико всегда скроллит текущую секцию — переключение секций НЕ происходит
      const target = e.target as HTMLElement
      const scrollable = target.closest('[data-scrollable]') as HTMLElement | null
      if (scrollable) {
        // Пропускаем событие — браузер сам прокрутит внутри элемента
        return
      }
      // Если секция не прокручиваемая — просто блокируем стандартное поведение
      e.preventDefault()
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("wheel", handleWheel, { passive: false })
    }
    return () => { if (container) container.removeEventListener("wheel", handleWheel) }
  }, [currentSection])

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") {
        e.preventDefault()
        scrollToSection(currentSection + 1)
      } else if (e.key === "ArrowLeft") {
        e.preventDefault()
        scrollToSection(currentSection - 1)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [currentSection])

  useEffect(() => {
    const handleTouchStart = (e: TouchEvent) => {
      touchStartY.current = e.touches[0].clientY
      touchStartX.current = e.touches[0].clientX
    }

    const handleTouchMove = (e: TouchEvent) => {
      e.preventDefault()
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const deltaX = touchStartX.current - e.changedTouches[0].clientX
      const deltaY = touchStartY.current - e.changedTouches[0].clientY
      if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
        if (deltaX > 0) scrollToSection(currentSection + 1)
        else scrollToSection(currentSection - 1)
      } else if (Math.abs(deltaY) > Math.abs(deltaX) && Math.abs(deltaY) > 50) {
        if (deltaY > 0) scrollToSection(currentSection + 1)
        else scrollToSection(currentSection - 1)
      }
    }

    const container = scrollContainerRef.current
    if (container) {
      container.addEventListener("touchstart", handleTouchStart, { passive: true })
      container.addEventListener("touchmove", handleTouchMove, { passive: false })
      container.addEventListener("touchend", handleTouchEnd, { passive: true })
    }
    return () => {
      if (container) {
        container.removeEventListener("touchstart", handleTouchStart)
        container.removeEventListener("touchmove", handleTouchMove)
        container.removeEventListener("touchend", handleTouchEnd)
      }
    }
  }, [currentSection])

  // без логина: 0-Старт 1-Профиль 2-История 3-Проекты 4-Новости 5-Стажировки
  // с логином:  0-Старт 1-Профиль 2-История 3-Проекты 4-Карьера 5-Достижения 6-Новости 7-Стажировки
  const newsIdx = loggedInUser ? 6 : 4
  const internIdx = loggedInUser ? 7 : 5
  const allNav = [
    { label: "Старт", idx: 0 },
    { label: "История", idx: 2 },
    { label: "Проекты", idx: 3 },
    ...(loggedInUser ? [
      { label: "Карьера", idx: 4 },
      { label: "Достижения", idx: 5 },
    ] : []),
    { label: "Новости", idx: newsIdx },
    { label: "Стажировки", idx: internIdx },
  ]

  return (
    <main className="relative h-screen w-full overflow-hidden bg-background">
      <CustomCursor />
      <GrainOverlay />
      <SpaceBackground />

      <nav className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-6 md:px-12">
        <button
          onClick={() => scrollToSection(0)}
          className="flex items-center gap-2 transition-transform hover:scale-105"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-foreground/15 backdrop-blur-md transition-all duration-300 hover:scale-110 hover:bg-foreground/25">
            <img src="https://cdn.poehali.dev/projects/0b587db9-2812-4c85-8109-45d651feb589/bucket/91ad8165-4b37-4f7d-a5df-4e76d6a7da92.png" alt="logo" className="h-8 w-8 object-contain" />
          </div>
          <span className="font-sans text-xl font-semibold tracking-tight text-foreground">Космос.Rus</span>
        </button>

        <div className="hidden items-center gap-6 md:flex">
          {allNav.map(({ label, idx }) => (
            <button
              key={label}
              onClick={() => scrollToSection(idx)}
              className={`group relative font-sans text-sm font-medium transition-colors ${
                currentSection === idx ? "text-foreground" : "text-foreground/70 hover:text-foreground"
              }`}
            >
              {label}
              <span
                className={`absolute -bottom-1 left-0 h-px bg-foreground transition-all duration-300 ${
                  currentSection === idx ? "w-full" : "w-0 group-hover:w-full"
                }`}
              />
            </button>
          ))}
        </div>

        {loggedInUser ? (
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollToSection(1)}
              className="flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/10 px-3 py-1.5 backdrop-blur-md transition-all hover:bg-foreground/20"
            >
              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-blue-500/30 text-xs">🧑‍🚀</div>
              <span className="font-sans text-sm text-foreground">{loggedInUser.name.split(" ")[0]}</span>
            </button>
            <button
              onClick={() => setLoggedInUser(null)}
              className="flex items-center gap-1.5 font-mono text-xs text-foreground/50 hover:text-foreground transition-colors"
              title="Выйти"
            >
              <Icon name="LogOut" size={14} />
              <span className="hidden md:inline">Выйти</span>
            </button>
          </div>
        ) : (
          <MagneticButton variant="secondary" onClick={() => scrollToSection(1)}>
            Войти
          </MagneticButton>
        )}
      </nav>

      <div
        ref={scrollContainerRef}
        data-scroll-container
        className="relative z-10 flex h-screen overflow-x-auto overflow-y-hidden"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {/* Секция 0: Таймер до старта */}
        <section className="flex min-h-screen w-screen shrink-0 flex-col justify-end px-6 pb-16 pt-24 md:px-12 md:pb-24">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 animate-in fade-in slide-in-from-bottom-4 rounded-full border border-foreground/20 bg-foreground/10 px-4 py-1.5 backdrop-blur-md duration-700">
              <div className="h-2 w-2 rounded-full bg-red-500 animate-pulse" />
              <p className="font-mono text-xs text-foreground/90">Новая программа · Сезон 2026</p>
            </div>
            <h1 className="mb-4 animate-in fade-in slide-in-from-bottom-8 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground duration-1000 md:text-7xl lg:text-8xl">
              <span className="text-balance">
                До старта<br />
                <span className="text-foreground/40">осталось</span>
              </span>
            </h1>
            <div className="mb-8 animate-in fade-in slide-in-from-bottom-4 duration-1000 delay-200">
              <CountdownTimer />
            </div>
            <p className="mb-8 max-w-xl animate-in fade-in slide-in-from-bottom-4 text-base leading-relaxed text-foreground/80 duration-1000 delay-200 md:text-lg">
              Образовательная платформа по космонавтике. Изучай историю, следи за современными миссиями и строй карьеру в космической индустрии.
            </p>
            <div className="flex animate-in fade-in slide-in-from-bottom-4 flex-col gap-4 duration-1000 delay-300 sm:flex-row sm:items-center">
              <MagneticButton
                size="lg"
                variant="primary"
                onClick={() => scrollToSection(1)}
              >
                Открыть платформу
              </MagneticButton>
              <MagneticButton size="lg" variant="secondary" onClick={() => scrollToSection(2)}>
                История побед
              </MagneticButton>
            </div>
          </div>


        </section>

        {/* Секция 1: Профиль */}
        <ProfileSection
          scrollToSection={scrollToSection}
          externalUser={loggedInUser}
          onLogin={(u) => setLoggedInUser(u)}
          onLogout={() => setLoggedInUser(null)}
        />

        {/* Секция 2: История побед */}
        <HistorySection isLoggedIn={!!loggedInUser} />

        {/* Секция 3: Современные проекты */}
        <ProjectsSection isLoggedIn={!!loggedInUser} />

        {/* Секции 4-5: Карьера и Достижения — только для залогиненных */}
        {loggedInUser && (
          <>
            <CareerSection scrollToSection={scrollToSection} isLoggedIn={true} />
            <AchievementsSection isLoggedIn={true} onLogin={() => scrollToSection(1)} />
          </>
        )}

        {/* Новости */}
        <NewsSection />

        {/* Стажировки */}
        <InternshipsSection />
      </div>

      {/* Кнопки-стрелки */}
      <button
        onClick={() => scrollToSection(currentSection - 1)}
        disabled={currentSection === 0}
        className="fixed left-4 top-1/2 z-50 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-md transition-all duration-300 hover:bg-foreground/25 disabled:opacity-20 disabled:cursor-not-allowed"
        aria-label="Предыдущая секция"
      >
        <Icon name="ChevronLeft" size={20} className="text-foreground" />
      </button>
      <button
        onClick={() => scrollToSection(currentSection + 1)}
        disabled={currentSection === totalSections - 1}
        className="fixed right-4 top-1/2 z-50 -translate-y-1/2 flex h-10 w-10 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 backdrop-blur-md transition-all duration-300 hover:bg-foreground/25 disabled:opacity-20 disabled:cursor-not-allowed"
        aria-label="Следующая секция"
      >
        <Icon name="ChevronRight" size={20} className="text-foreground" />
      </button>

      {/* Подсказка навигации */}
      <NavHint />

      <style>{`
        div::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </main>
  )
}

const AUTH_URL = "https://functions.poehali.dev/3c94e97f-4f4e-4363-9667-9943fba30b5a"

function AuthForm({ onLogin }: { onLogin: (user: { name: string; email: string; level: number }) => void }) {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [visible, setVisible] = useState(false)
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [age, setAge] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 100)
    return () => clearTimeout(t)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    if (mode === "register") {
      if (!name.trim()) { setError("Введите имя"); return }
      if (!age || isNaN(Number(age)) || Number(age) < 10 || Number(age) > 99) { setError("Укажите корректный возраст"); return }
      if (password !== confirmPassword) { setError("Пароли не совпадают"); return }
      if (password.length < 6) { setError("Пароль минимум 6 символов"); return }
    }
    if (!email.includes("@")) { setError("Введите корректный email"); return }
    if (!password) { setError("Введите пароль"); return }

    setLoading(true)
    try {
      const action = mode === "login" ? "login" : "register"
      const res = await fetch(`${AUTH_URL}?action=${action}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, age: mode === "register" ? Number(age) : undefined }),
      })
      const data = await res.json()
      const parsed = typeof data === "string" ? JSON.parse(data) : data
      if (!res.ok || !parsed.ok) {
        setError(parsed.error || "Ошибка сервера")
        return
      }
      onLogin({ name: parsed.user.name, email: parsed.user.email, level: parsed.user.level, age: parsed.user.age })
    } catch {
      setError("Не удалось подключиться к серверу")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div ref={ref} className={`transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
      <div className="mb-8 flex items-center gap-3">
        <img src="https://cdn.poehali.dev/projects/0b587db9-2812-4c85-8109-45d651feb589/bucket/91ad8165-4b37-4f7d-a5df-4e76d6a7da92.png" alt="logo" className="h-10 w-10 object-contain" />
        <div>
          <h2 className="font-sans text-2xl font-light text-foreground">
            {mode === "login" ? "Добро пожаловать" : "Создать аккаунт"}
          </h2>
          <p className="font-mono text-xs text-foreground/50">Космос.Rus · Образовательная платформа</p>
        </div>
      </div>

      {/* Переключатель режимов */}
      <div className="mb-6 flex rounded-xl border border-foreground/10 bg-foreground/5 p-1">
        {(["login", "register"] as const).map((m) => (
          <button
            key={m}
            onClick={() => { setMode(m); setError("") }}
            className={`flex-1 rounded-lg py-2 font-sans text-sm font-medium transition-all duration-300 ${
              mode === m
                ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20"
                : "text-foreground/50 hover:text-foreground"
            }`}
          >
            {m === "login" ? "Войти" : "Регистрация"}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {mode === "register" && (
          <>
            <div>
              <label className="mb-1 block font-mono text-xs text-foreground/50">Имя</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Алексей Петров"
                className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 backdrop-blur-sm outline-none transition-all focus:border-blue-500/60 focus:bg-foreground/8"
              />
            </div>
            <div>
              <label className="mb-1 block font-mono text-xs text-foreground/50">Возраст</label>
              <input
                type="number"
                min={10}
                max={99}
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="20"
                className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 backdrop-blur-sm outline-none transition-all focus:border-blue-500/60 focus:bg-foreground/8"
              />
            </div>
          </>
        )}

        <div>
          <label className="mb-1 block font-mono text-xs text-foreground/50">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="cosmonaut@example.com"
            className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 backdrop-blur-sm outline-none transition-all focus:border-blue-500/60 focus:bg-foreground/8"
          />
        </div>

        <div>
          <label className="mb-1 block font-mono text-xs text-foreground/50">Пароль</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••"
            className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 backdrop-blur-sm outline-none transition-all focus:border-blue-500/60 focus:bg-foreground/8"
          />
        </div>

        {mode === "register" && (
          <div>
            <label className="mb-1 block font-mono text-xs text-foreground/50">Повторите пароль</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-3 font-sans text-sm text-foreground placeholder:text-foreground/30 backdrop-blur-sm outline-none transition-all focus:border-blue-500/60 focus:bg-foreground/8"
            />
          </div>
        )}

        {error && (
          <div className="flex items-center gap-2 rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2">
            <Icon name="AlertCircle" size={14} className="text-red-400 shrink-0" />
            <span className="font-mono text-xs text-red-400">{error}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="mt-2 w-full rounded-xl bg-blue-500 py-3 font-sans text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all duration-300 hover:bg-blue-400 hover:shadow-blue-400/30 active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {loading ? "Загрузка..." : mode === "login" ? "Войти в систему" : "Создать аккаунт"}
        </button>
      </form>

      {mode === "login" && (
        <p className="mt-4 text-center font-mono text-xs text-foreground/40">
          Нет аккаунта?{" "}
          <button onClick={() => setMode("register")} className="text-blue-400 hover:text-blue-300 transition-colors">
            Зарегистрироваться
          </button>
        </p>
      )}
    </div>
  )
}

type UserType = { name: string; email: string; level: number; age?: number }

function ProfileSection({
  scrollToSection,
  externalUser,
  onLogin,
  onLogout,
}: {
  scrollToSection: (i: number) => void
  externalUser: UserType | null
  onLogin: (u: UserType) => void
  onLogout: () => void
}) {
  const isLoggedIn = !!externalUser
  const user = externalUser
  const [visible, setVisible] = useState(false)
  const [npsScore, setNpsScore] = useState<number | null>(null)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setVisible(true) }, { threshold: 0.15 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])

  const metrics = [
    { label: "Выполнение заданий", value: "5/7 дней", icon: "CheckSquare", color: "text-green-400" },
    { label: "Серия", value: "3 дня подряд", icon: "Flame", color: "text-orange-400" },
    { label: "Время сессии", value: "~9 мин", icon: "Clock", color: "text-blue-400" },
    { label: "Рейтинг в городе", value: "Топ 20%", icon: "Trophy", color: "text-yellow-400" },
  ]

  const recs = [
    { label: "Следующая тема", value: "Луна-25: возвращение", icon: "BookOpen" },
    { label: "Проект", value: "«Луна-26» — подписаться", icon: "Satellite" },
    { label: "Тест", value: "Системы жизнеобеспечения", icon: "ClipboardList" },
  ]

  const xpPct = 60
  const xpLevel = user?.level ?? 1
  const rankNames = ["Стажёр", "Космонавт", "Пилот", "Конструктор", "Командор"]
  const rankName = rankNames[Math.min(xpLevel - 1, rankNames.length - 1)] ?? "Стажёр"

  return (
    <section ref={ref} className="flex h-screen w-screen shrink-0 snap-start">
      <div data-scrollable className="w-full h-full overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {!isLoggedIn ? (
          <div className="flex min-h-full items-center justify-center px-6 py-20">
            <div className="w-full max-w-md rounded-3xl border border-foreground/10 bg-foreground/5 p-8 shadow-2xl shadow-black/40 backdrop-blur-xl ring-1 ring-white/5">
              <AuthForm onLogin={onLogin} />
            </div>
          </div>
        ) : (
          <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-10 md:px-12 lg:px-16">

            {/* ── Шапка профиля ── */}
            <div className={`mb-8 transition-all duration-700 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
              <div className="relative overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-xl">
                {/* Декоративные орбиты */}
                <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full border border-blue-500/10" />
                <div className="pointer-events-none absolute -right-8 -top-8 h-40 w-40 rounded-full border border-blue-500/8" />
                <div className="pointer-events-none absolute right-8 top-8 h-3 w-3 rounded-full bg-blue-500/30 blur-sm" />
                <div className="pointer-events-none absolute right-24 top-6 h-1.5 w-1.5 rounded-full bg-cyan-400/40" />
                <div className="pointer-events-none absolute right-16 top-16 h-1 w-1 rounded-full bg-white/30" />

                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  {/* Аватар + данные */}
                  <div className="flex items-center gap-5">
                    {/* Аватар-орбита */}
                    <div className="relative shrink-0">
                      <div className="absolute inset-0 rounded-full border border-blue-500/20 scale-[1.35] animate-[spin_20s_linear_infinite]" style={{ borderStyle: "dashed" }} />
                      <div className="absolute inset-0 rounded-full border border-cyan-400/10 scale-[1.6]" />
                      <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-blue-500/30 bg-gradient-to-br from-blue-500/20 to-cyan-500/10 text-4xl shadow-lg shadow-blue-500/10 backdrop-blur-sm">
                        🧑‍🚀
                      </div>
                      <div className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-blue-500 text-[10px] font-bold text-white shadow-md shadow-blue-500/50">
                        {xpLevel}
                      </div>
                    </div>

                    {/* Имя и email */}
                    <div>
                      <div className="mb-0.5 flex items-center gap-2">
                        <h2 className="font-sans text-2xl font-light capitalize text-foreground">{user?.name}</h2>
                        <span className="rounded-full border border-blue-500/30 bg-blue-500/10 px-2 py-0.5 font-mono text-[10px] text-blue-400">{rankName}</span>
                      </div>
                      <div className="flex items-center gap-3 font-mono text-xs text-foreground/40">
                        <span className="flex items-center gap-1.5">
                          <Icon name="Mail" size={11} />
                          {user?.email}
                        </span>
                        {user?.age && (
                          <span className="flex items-center gap-1.5">
                            <Icon name="User" size={11} />
                            {user.age} лет
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Кнопка выйти */}
                  <button
                    onClick={onLogout}
                    className="flex items-center gap-1.5 self-start rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-1.5 font-mono text-xs text-foreground/40 transition-all hover:border-red-500/30 hover:text-red-400 sm:self-auto"
                  >
                    <Icon name="LogOut" size={12} />
                    Выйти
                  </button>
                </div>

                {/* XP-бар */}
                <div className="mt-5">
                  <div className="mb-2 flex items-center justify-between">
                    <span className="font-mono text-[11px] text-foreground/40">Опыт · уровень {xpLevel}</span>
                    <span className="font-mono text-[11px] text-blue-400">{xpPct}% до «{rankNames[Math.min(xpLevel, rankNames.length - 1)]}»</span>
                  </div>
                  <div className="relative h-2 w-full overflow-hidden rounded-full bg-foreground/8">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-1000 ease-out"
                      style={{ width: visible ? `${xpPct}%` : "0%" }}
                    />
                    <div
                      className="absolute top-0 h-full w-8 rounded-full bg-white/20 blur-sm transition-all duration-1000"
                      style={{ left: visible ? `calc(${xpPct}% - 1rem)` : "0%" }}
                    />
                  </div>
                  {/* Метки уровней */}
                  <div className="mt-1 flex justify-between">
                    {rankNames.map((r, i) => (
                      <span key={i} className={`font-mono text-[9px] transition-colors ${i < xpLevel ? "text-blue-400/60" : "text-foreground/20"}`}>{r}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* ── Основная сетка ── */}
            <div className="grid gap-4 md:grid-cols-3">

              {/* Быстрые очки (col-span-3) */}
              <div className={`md:col-span-3 grid grid-cols-3 gap-3 transition-all duration-700 delay-100 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                {[
                  { label: "Очков сегодня", value: "+45", icon: "Zap", color: "text-green-400", glow: "shadow-green-500/10" },
                  { label: "Серия", value: "3 дня", icon: "Flame", color: "text-orange-400", glow: "shadow-orange-500/10" },
                  { label: "Материалов за неделю", value: "12", icon: "BookOpen", color: "text-blue-400", glow: "shadow-blue-500/10" },
                ].map((s, i) => (
                  <div key={i} className={`flex items-center gap-3 rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm shadow-lg ${s.glow}`}>
                    <div className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-foreground/5 border border-foreground/10 ${s.color}`}>
                      <Icon name={s.icon} fallback="Star" size={16} />
                    </div>
                    <div>
                      <div className={`font-sans text-xl font-light ${s.color}`}>{s.value}</div>
                      <div className="font-mono text-[10px] text-foreground/40">{s.label}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Метрики */}
              <div className={`md:col-span-2 transition-all duration-700 delay-150 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="h-full rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/40">/ Метрики</p>
                  <div className="space-y-3">
                    {metrics.map((m, i) => (
                      <div key={i} className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className={`flex h-7 w-7 items-center justify-center rounded-lg bg-foreground/5 border border-foreground/10 ${m.color}`}>
                            <Icon name={m.icon} fallback="Circle" size={13} />
                          </div>
                          <span className="font-sans text-sm text-foreground/60">{m.label}</span>
                        </div>
                        <span className={`font-mono text-sm font-medium ${m.color}`}>{m.value}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Переходы на карьеру и достижения */}
              <div className={`flex flex-col gap-3 transition-all duration-700 delay-200 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <button
                  onClick={() => scrollToSection(4)}
                  className="group flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-blue-500/5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-blue-500/20 bg-blue-500/10 text-blue-400">
                    <Icon name="Rocket" size={18} />
                  </div>
                  <div>
                    <div className="mb-0.5 font-sans text-sm font-medium text-foreground">Карьерный трек</div>
                    <div className="font-mono text-[10px] text-foreground/40">Профессии и вузы</div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="mt-3 text-foreground/20 transition-all group-hover:translate-x-1 group-hover:text-blue-400" />
                </button>
                <button
                  onClick={() => scrollToSection(5)}
                  className="group flex flex-1 flex-col justify-between overflow-hidden rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm transition-all hover:border-yellow-500/30 hover:bg-yellow-500/5"
                >
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-yellow-500/20 bg-yellow-500/10 text-yellow-400">
                    <Icon name="Trophy" size={18} />
                  </div>
                  <div>
                    <div className="mb-0.5 font-sans text-sm font-medium text-foreground">Достижения</div>
                    <div className="font-mono text-[10px] text-foreground/40">Бейджи и награды</div>
                  </div>
                  <Icon name="ArrowRight" size={14} className="mt-3 text-foreground/20 transition-all group-hover:translate-x-1 group-hover:text-yellow-400" />
                </button>
              </div>

              {/* Рекомендации */}
              <div className={`md:col-span-2 transition-all duration-700 delay-250 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
                  <p className="mb-4 font-mono text-[10px] uppercase tracking-widest text-foreground/40">/ Рекомендуем</p>
                  <div className="space-y-2">
                    {recs.map((r, i) => (
                      <div key={i} className="group flex cursor-pointer items-center justify-between rounded-xl border border-foreground/8 bg-foreground/3 p-3 transition-all hover:border-blue-500/30 hover:bg-blue-500/5">
                        <div className="flex items-center gap-3">
                          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-blue-500/20 bg-blue-500/10 text-blue-400">
                            <Icon name={r.icon} fallback="Circle" size={13} />
                          </div>
                          <div>
                            <div className="font-mono text-[9px] uppercase tracking-wider text-foreground/30">{r.label}</div>
                            <div className="font-sans text-sm text-foreground/80">{r.value}</div>
                          </div>
                        </div>
                        <Icon name="ChevronRight" size={14} className="text-foreground/20 transition-all group-hover:translate-x-0.5 group-hover:text-blue-400" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* NPS-опрос */}
              <div className={`transition-all duration-700 delay-300 ${visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
                <div className="h-full rounded-2xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
                  <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/40">/ Опрос</p>
                  <p className="mb-4 font-sans text-sm text-foreground/60">Насколько вы готовы рекомендовать платформу?</p>
                  <div className="grid grid-cols-6 gap-1">
                    {Array.from({ length: 11 }, (_, i) => (
                      <button
                        key={i}
                        onClick={() => setNpsScore(i)}
                        className={`rounded-lg py-2 font-mono text-xs transition-all border ${
                          npsScore === i
                            ? i >= 9 ? "border-green-500 bg-green-500/20 text-green-300" : i >= 7 ? "border-yellow-500 bg-yellow-500/20 text-yellow-300" : "border-red-500 bg-red-500/20 text-red-300"
                            : "border-foreground/10 text-foreground/30 hover:border-foreground/25 hover:text-foreground/60"
                        }`}
                      >
                        {i}
                      </button>
                    ))}
                  </div>
                  {npsScore !== null && (
                    <p className="mt-3 font-mono text-[10px] text-foreground/40">
                      {npsScore >= 9 ? "Спасибо! Вы наш промоутер 🚀" : npsScore >= 7 ? "Спасибо за оценку!" : "Расскажите, что улучшить"}
                    </p>
                  )}
                  <div className="mt-3 flex justify-between font-mono text-[9px] text-foreground/25">
                    <span>Маловероятно</span>
                    <span>Точно да</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        )}
      </div>
    </section>
  )
}