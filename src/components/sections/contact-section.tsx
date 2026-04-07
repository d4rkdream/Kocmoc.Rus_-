import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import { MagneticButton } from "@/components/magnetic-button"
import Icon from "@/components/ui/icon"

const badges = [
  { name: "Знаток спутников", icon: "Satellite", earned: true, date: "12 мар 2025", color: "text-blue-400" },
  { name: "Историк Гагарина", icon: "Rocket", earned: true, date: "1 апр 2025", color: "text-yellow-400" },
  { name: "Первопроходец", icon: "Flag", earned: true, date: "10 фев 2025", color: "text-green-400" },
  { name: "Наблюдатель МКС", icon: "Eye", earned: false, condition: "Подпишись на МКС", color: "text-foreground/30" },
  { name: "Навигатор", icon: "Compass", earned: false, condition: "Изучи 20 событий", color: "text-foreground/30" },
  { name: "Исследователь Луны", icon: "Moon", earned: false, condition: "Открой Луна-25", color: "text-foreground/30" },
  { name: "Лётчик-испытатель", icon: "Plane", earned: false, condition: "Пройди карьерный тест", color: "text-foreground/30" },
  { name: "Легенда орбиты", icon: "Crown", earned: false, condition: "Достичь уровня Капитан", color: "text-foreground/30" },
  { name: "Звёздный наставник", icon: "Star", earned: false, condition: "Привлеки 3 друзей", color: "text-foreground/30" },
  { name: "Охотник за кометами", icon: "Zap", earned: false, condition: "7 дней подряд", color: "text-foreground/30" },
  { name: "Орбитальный механик", icon: "Settings", earned: false, condition: "Изучи 5 профессий", color: "text-foreground/30" },
  { name: "Сверхновая", icon: "Sparkles", earned: false, condition: "2000+ очков", color: "text-foreground/30" },
]

const planets = [
  { name: "Меркурий", topic: "Физика", done: true, size: "h-4 w-4" },
  { name: "Венера", topic: "Атмосфера", done: true, size: "h-5 w-5" },
  { name: "Земля", topic: "Орбита", done: true, size: "h-6 w-6" },
  { name: "Марс", topic: "Марс", done: false, size: "h-5 w-5" },
  { name: "Юпитер", topic: "Газовые гиганты", done: false, size: "h-8 w-8" },
  { name: "Сатурн", topic: "Кольца", done: false, size: "h-7 w-7" },
  { name: "Уран", topic: "Лёд", done: false, size: "h-5 w-5" },
  { name: "Нептун", topic: "Дальний космос", done: false, size: "h-5 w-5" },
]

export function AchievementsSection({ isLoggedIn = false, onLogin }: { isLoggedIn?: boolean; onLogin?: () => void }) {
  const { ref, isVisible } = useReveal(0.2)
  const [npsValue, setNpsValue] = useState<number | null>(null)
  const [refCopied, setRefCopied] = useState(false)

  const copyRef = () => {
    navigator.clipboard.writeText("https://kosmotrack.ru/invite/alex42")
    setRefCopied(true)
    setTimeout(() => setRefCopied(false), 2000)
  }

  const earnedBadges = badges.filter((b) => b.earned).length

  return (
    <section
      ref={ref}
      data-scrollable
      className="flex h-screen w-screen shrink-0 snap-start items-start px-6 pt-20 pb-6 md:px-12 lg:px-16 overflow-y-auto relative"
      style={{ scrollbarWidth: "none" }}
    >
      {/* Блюр-оверлей для незалогиненных */}
      {!isLoggedIn && (
        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center backdrop-blur-md bg-background/60">
          <div className="rounded-2xl border border-foreground/15 bg-foreground/8 p-8 text-center max-w-sm backdrop-blur-sm">
            <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-full border border-foreground/20 bg-foreground/10 mx-auto">
              <Icon name="Trophy" size={22} className="text-yellow-400" />
            </div>
            <h3 className="mb-2 font-sans text-xl font-light text-foreground">Только для участников</h3>
            <p className="mb-5 font-mono text-xs text-foreground/50">Бейджи и достижения открываются после регистрации</p>
            <button
              onClick={onLogin}
              className="w-full rounded-xl bg-blue-500 py-2.5 font-sans text-sm font-medium text-white transition-all hover:bg-blue-400"
            >
              Войти / Зарегистрироваться
            </button>
          </div>
        </div>
      )}
      <div className="mx-auto w-full max-w-7xl">
        <div className={`mb-5 transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
          <h2 className="mb-1 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl">
            Достижения
          </h2>
          <p className="font-mono text-sm text-foreground/60">/ Геймификация и награды</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {/* Левая колонка: профиль + прогресс */}
          <div className="space-y-4">
            {/* Аватар и прогресс */}
            <div className={`rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-3 flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10 border border-foreground/20 text-xl">
                  🧑‍🚀
                </div>
                <div>
                  <div className="font-sans text-sm font-medium text-foreground">Конструктор</div>
                  <div className="font-mono text-xs text-blue-400">2 840 очков</div>
                </div>
              </div>
              <div className="mb-1 flex justify-between font-mono text-xs text-foreground/40">
                <span>До «Капитана корабля»</span>
                <span>45%</span>
              </div>
              <div className="mb-3 h-1.5 w-full rounded-full bg-foreground/10">
                <div className="h-1.5 rounded-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-1000" style={{ width: isVisible ? "45%" : "0%" }} />
              </div>
              {/* Солнечная система */}
              <div className="flex items-center gap-2 overflow-hidden">
                {planets.map((p, i) => (
                  <div
                    key={i}
                    title={`${p.topic} ${p.done ? "✓" : ""}`}
                    className={`rounded-full shrink-0 transition-all ${p.size} ${
                      p.done
                        ? "bg-blue-500 shadow-[0_0_8px_2px_rgba(59,130,246,0.4)]"
                        : "bg-foreground/15 border border-foreground/10"
                    }`}
                  />
                ))}
              </div>
              <div className="mt-1 font-mono text-[9px] text-foreground/30">Планеты = темы курса</div>
            </div>

            {/* Статистика */}
            <div className={`rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-3 font-mono text-xs text-foreground/50 uppercase tracking-widest">/ Статистика</div>
              <div className="space-y-2">
                {[
                  { label: "Бейджей у вас", value: `${earnedBadges} — больше 70%`, icon: "Award" },
                  { label: "Достигли Конструктора", value: "25% активных", icon: "Users" },
                  { label: "Ежедневные задания", value: "82% выполнения", icon: "CheckSquare" },
                ].map((s, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-foreground/10 py-1.5">
                    <div className="flex items-center gap-2">
                      <Icon name={s.icon as "Award"} fallback="Circle" size={12} className="text-foreground/40" />
                      <span className="font-sans text-xs text-foreground/70">{s.label}</span>
                    </div>
                    <span className="font-mono text-xs text-foreground">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Сарафанный космос */}
            <div className={`rounded-xl border border-blue-500/20 bg-blue-500/5 p-4 backdrop-blur-sm transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-2 flex items-center gap-2">
                <Icon name="Share2" size={12} className="text-blue-400" />
                <span className="font-mono text-xs text-blue-300">Сарафанный космос</span>
              </div>
              <p className="mb-3 font-sans text-xs text-foreground/60">Пригласи 3 друзей → +50 очков за каждого</p>
              <MagneticButton variant="primary" onClick={copyRef}>
                {refCopied ? "Ссылка скопирована!" : "Скопировать реф-ссылку"}
              </MagneticButton>
            </div>
          </div>

          {/* Бейджи — сетка 3×4 */}
          <div className={`md:col-span-1 lg:col-span-2 transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-8"}`}>
            <div className="mb-3 flex items-center justify-between">
              <div className="font-mono text-xs text-foreground/50 uppercase tracking-widest">/ Бейджи</div>
              <span className="font-mono text-xs text-foreground/40">{earnedBadges} из {badges.length}</span>
            </div>
            <div className="grid grid-cols-3 gap-3 md:grid-cols-4">
              {badges.map((b, i) => (
                <div
                  key={i}
                  className={`group flex flex-col items-center rounded-xl border p-3 transition-all ${
                    b.earned
                      ? "border-foreground/20 bg-foreground/5 hover:border-foreground/30"
                      : "border-foreground/5 bg-foreground/2 opacity-50"
                  }`}
                  title={b.earned ? `Получено ${b.date}` : b.condition}
                >
                  <div className={`mb-2 flex h-10 w-10 items-center justify-center rounded-full ${b.earned ? "bg-foreground/10" : "bg-foreground/5"}`}>
                    <Icon name={b.icon as "Star"} fallback="Circle" size={18} className={b.color} />
                  </div>
                  <div className="text-center font-sans text-[10px] leading-tight text-foreground/80">{b.name}</div>
                  {b.earned ? (
                    <div className="mt-1 font-mono text-[9px] text-foreground/30">{b.date}</div>
                  ) : (
                    <div className="mt-1 font-mono text-[9px] text-foreground/25 text-center">{b.condition}</div>
                  )}
                </div>
              ))}
            </div>

            {/* NPS */}
            <div className="mt-4 rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm">
              <p className="mb-3 font-sans text-sm text-foreground/80">Насколько платформа вам помогла? (0 — совсем нет, 10 — очень)</p>
              <div className="flex gap-1.5 flex-wrap">
                {Array.from({ length: 11 }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setNpsValue(i)}
                    className={`h-8 min-w-[2rem] flex-1 rounded-lg border font-mono text-xs transition-all ${
                      npsValue === i
                        ? "border-blue-500 bg-blue-500/30 text-blue-300"
                        : i >= 9
                        ? "border-blue-500/30 text-blue-400 hover:bg-blue-500/10"
                        : "border-foreground/10 text-foreground/40 hover:border-foreground/20"
                    }`}
                  >
                    {i}
                  </button>
                ))}
              </div>
              {npsValue !== null && (
                <p className="mt-2 font-mono text-xs text-foreground/50">
                  {npsValue >= 9 ? "Спасибо! Вы — наш амбассадор 🚀" : npsValue >= 7 ? "Спасибо за оценку!" : "Расскажите, что улучшить?"}
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}