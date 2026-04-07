import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

const events = [
  { id: 1, date: "4 октября 1957", title: "Первый спутник", country: "СССР", icon: "Satellite", desc: "Советский Союз запустил первый искусственный спутник Земли — «Спутник-1». Это стало началом космической эры. Спутник был размером с мяч, весил 83 кг и передавал простой радиосигнал. Весь мир слушал его «бип-бип-бип»." },
  { id: 2, date: "12 апреля 1961", title: "Полёт Гагарина", country: "СССР", icon: "Rocket", desc: "Юрий Гагарин совершил первый в истории полёт человека в космос на корабле «Восток». 108 минут, изменивших мир. «Поехали!» — эти слова облетели всю планету." },
  { id: 3, date: "18 марта 1965", title: "Выход в открытый космос", country: "СССР", icon: "User", desc: "Алексей Леонов провёл 12 минут в открытом космосе — первый человек, вышедший за пределы корабля. Скафандр раздулся так, что пришлось стравить давление, чтобы вернуться." },
  { id: 4, date: "19 апреля 1971", title: "Первая орбитальная станция", country: "СССР", icon: "Building2", desc: "Запуск «Салют-1» — первой в мире орбитальной станции. Новая эпоха долговременного пребывания в космосе. Экипаж провёл на борту 23 дня." },
  { id: 5, date: "20 февраля 1986", title: "Станция «Мир»", country: "СССР", icon: "Star", desc: "Запуск базового модуля станции «Мир». На протяжении 15 лет — символ советской и российской космонавтики. Здесь побывали 104 космонавта из 12 стран." },
  { id: 6, date: "20 ноября 1998", title: "МКС: Первый модуль", country: "РФ", icon: "Globe", desc: "Россия запустила модуль «Заря» — первый элемент Международной космической станции. Начало крупнейшего международного космического проекта в истории." },
  { id: 7, date: "12 апреля 2021", title: "60 лет полёту Гагарина", country: "РФ", icon: "Award", desc: "Россия торжественно отметила 60-летие первого полёта человека в космос. Прошли памятные мероприятия в Звёздном городке, Байконуре и по всей стране." },
  { id: 8, date: "11 августа 2023", title: "Луна-25", country: "РФ", icon: "Moon", desc: "Запуск первой за 47 лет российской лунной миссии. Автоматическая станция направилась к южному полюсу Луны для поиска воды и минералов." },
]

export function HistorySection({ isLoggedIn = false }: { isLoggedIn?: boolean }) {
  const { ref, isVisible } = useReveal(0.2)
  const navigate = useNavigate()
  const [filter, setFilter] = useState<"all" | "СССР" | "РФ">("all")
  const [search, setSearch] = useState("")
  const [studiedIds, setStudiedIds] = useState<number[]>([2, 3, 7])
  const [openId, setOpenId] = useState<number | null>(null)

  const filtered = events.filter((e) => {
    if (filter !== "all" && e.country !== filter) return false
    if (search && !e.title.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const studiedCount = studiedIds.length
  const pct = Math.round((studiedCount / events.length) * 100)

  const toggleStudied = (id: number) => {
    setStudiedIds((prev) => prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id])
  }

  return (
    <section
      ref={ref}
      data-scrollable
      className="flex h-screen w-screen shrink-0 snap-start items-start px-6 pt-20 pb-6 md:px-12 lg:px-16 overflow-y-auto"
      style={{ scrollbarWidth: "none" }}
    >
      <div className="mx-auto w-full max-w-7xl">
        <div className={`mb-6 transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
          <h2 className="mb-1 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl">
            История побед
          </h2>
          <p className="font-mono text-sm text-foreground/60">/ Хронология покорения космоса</p>
        </div>

        {/* Метрики — только для залогиненных */}
        {isLoggedIn && (
          <>
            <div className={`mb-5 grid grid-cols-3 gap-3 transition-all duration-700 delay-100 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"}`}>
              <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-3 backdrop-blur-sm">
                <div className="font-sans text-xl font-light text-blue-400">{studiedCount} событий</div>
                <div className="font-mono text-[10px] text-foreground/50">Глубина горизонта</div>
              </div>
              <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-3 backdrop-blur-sm">
                <div className="font-sans text-xl font-light text-foreground">{pct}%</div>
                <div className="font-mono text-[10px] text-foreground/50">Хронологии изучено</div>
              </div>
              <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-3 backdrop-blur-sm">
                <div className="flex items-center gap-1 font-sans text-sm font-light text-yellow-400">
                  <Icon name="Award" size={12} /> Историк Гагарина
                </div>
                <div className="font-mono text-[10px] text-foreground/50">Последний бейдж</div>
              </div>
            </div>
            <div className="mb-5">
              <div className="mb-1 flex justify-between font-mono text-xs text-foreground/40">
                <span>Глубина космического горизонта</span>
                <span>{studiedCount}/12 цель ✅</span>
              </div>
              <div className="h-1.5 w-full rounded-full bg-foreground/10">
                <div className="h-1.5 rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${Math.min(pct, 100)}%` }} />
              </div>
            </div>
          </>
        )}

        {/* Фильтры + поиск */}
        <div className="mb-5 flex flex-wrap items-center gap-3">
          {(["all", "СССР", "РФ"] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`rounded-full border px-3 py-1 font-mono text-xs transition-all ${
                filter === f
                  ? "border-blue-500 bg-blue-500/20 text-blue-300"
                  : "border-foreground/20 text-foreground/50 hover:border-foreground/40"
              }`}
            >
              {f === "all" ? "Все" : f}
            </button>
          ))}
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Поиск..."
            className="ml-auto rounded-lg border border-foreground/20 bg-foreground/5 px-3 py-1 font-mono text-xs text-foreground placeholder:text-foreground/30 focus:outline-none focus:border-foreground/40"
          />
        </div>

        {/* Таймлайн */}
        <div className="relative space-y-3 pb-4">
          <div className="absolute left-[11px] top-0 bottom-0 w-px bg-foreground/10" />
          {filtered.map((ev, i) => (
            <div
              key={ev.id}
              className={`relative pl-8 transition-all duration-500 ${isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-8"}`}
              style={{ transitionDelay: `${200 + i * 60}ms` }}
            >
              <div className={`absolute left-0 top-3 flex h-6 w-6 items-center justify-center rounded-full border transition-all ${
                studiedIds.includes(ev.id)
                  ? "border-blue-500 bg-blue-500/20"
                  : "border-foreground/20 bg-foreground/5"
              }`}>
                <Icon name={ev.icon as "Satellite"} fallback="Circle" size={12} className={studiedIds.includes(ev.id) ? "text-blue-400" : "text-foreground/30"} />
              </div>
              <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-3 backdrop-blur-sm hover:border-foreground/20 transition-all">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="mb-0.5 flex items-center gap-2">
                      <span className="font-mono text-[10px] text-foreground/40">{ev.date}</span>
                      <span className={`rounded px-1 font-mono text-[9px] ${ev.country === "СССР" ? "bg-red-500/20 text-red-400" : "bg-blue-500/20 text-blue-400"}`}>{ev.country}</span>
                    </div>
                    <h3 className="font-sans text-sm font-medium text-foreground">{ev.title}</h3>
                    {openId === ev.id && (
                      <p className="mt-1.5 font-sans text-xs leading-relaxed text-foreground/70">{ev.desc}</p>
                    )}
                  </div>
                  <div className="flex items-center gap-2 ml-2 shrink-0">
                    {/* Кнопка «Читать» — доступна всем */}
                    {ev.id === 2 ? (
                      <button
                        onClick={() => navigate("/gagarin")}
                        className="flex items-center gap-1 font-mono text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        <Icon name="ExternalLink" size={10} />
                        Читать
                      </button>
                    ) : (
                      <button
                        onClick={() => setOpenId(openId === ev.id ? null : ev.id)}
                        className="font-mono text-[10px] text-blue-400 hover:text-blue-300 transition-colors"
                      >
                        {openId === ev.id ? "Скрыть" : "Читать"}
                      </button>
                    )}
                    {/* Кнопка «Изучить» — только для залогиненных */}
                    {isLoggedIn && (
                      <button
                        onClick={() => toggleStudied(ev.id)}
                        className={`flex h-5 w-5 items-center justify-center rounded-full border transition-all ${
                          studiedIds.includes(ev.id)
                            ? "border-blue-500 bg-blue-500 text-white"
                            : "border-foreground/20 text-transparent hover:border-foreground/40"
                        }`}
                        title="Отметить как изученное"
                      >
                        <Icon name="Check" size={10} className="text-white" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Баннер для незалогиненных */}
        {!isLoggedIn && (
          <div className="mt-4 rounded-xl border border-blue-500/20 bg-blue-500/5 px-4 py-3 flex items-center gap-3">
            <Icon name="Lock" size={14} className="text-blue-400 shrink-0" />
            <p className="font-mono text-xs text-foreground/60">
              <span className="text-blue-400">Войдите</span>, чтобы отслеживать прогресс и получать бейджи
            </p>
          </div>
        )}
      </div>
    </section>
  )
}
