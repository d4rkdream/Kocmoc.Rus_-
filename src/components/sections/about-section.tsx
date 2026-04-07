import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MagneticButton } from "@/components/magnetic-button"
import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

type Internship = { name: string; type: string; deadline: string; icon: string }

function ApplicationModal({ internship, onClose }: { internship: Internship; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [form, setForm] = useState({ name: "", email: "", course: "", motivation: "" })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1200))
    setLoading(false)
    setStep("success")
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-md rounded-2xl border border-foreground/15 bg-background shadow-2xl shadow-black/50 ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-300">

        {step === "form" ? (
          <>
            {/* Шапка */}
            <div className="flex items-start justify-between border-b border-foreground/10 p-5">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Icon name={internship.icon as "Award"} fallback="Building2" size={14} className="text-blue-400" />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">{internship.type}</span>
                </div>
                <h3 className="font-sans text-lg font-light text-foreground">{internship.name}</h3>
                <p className="font-mono text-[10px] text-foreground/40">Дедлайн: {internship.deadline}</p>
              </div>
              <button onClick={onClose} className="text-foreground/30 hover:text-foreground/60 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="p-5 space-y-3">
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-foreground/40">Имя и фамилия</label>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Алексей Петров"
                  className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50 focus:bg-foreground/8"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-foreground/40">Email</label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="cosmonaut@example.com"
                  className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50 focus:bg-foreground/8"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-foreground/40">Курс / год обучения</label>
                <input
                  required
                  value={form.course}
                  onChange={(e) => setForm({ ...form, course: e.target.value })}
                  placeholder="3 курс, Бауманка"
                  className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50 focus:bg-foreground/8"
                />
              </div>
              <div>
                <label className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-foreground/40">Мотивационное письмо</label>
                <textarea
                  required
                  rows={3}
                  value={form.motivation}
                  onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                  placeholder="Почему вы хотите пройти стажировку..."
                  className="w-full resize-none rounded-xl border border-foreground/15 bg-foreground/5 px-4 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50 focus:bg-foreground/8"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="mt-1 w-full rounded-xl bg-blue-500 py-3 font-sans text-sm font-medium text-white shadow-lg shadow-blue-500/25 transition-all hover:bg-blue-400 active:scale-[0.98] disabled:opacity-60"
              >
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Loader" size={14} className="animate-spin" />
                    Отправляем...
                  </span>
                ) : "Отправить заявку"}
              </button>
            </form>
          </>
        ) : (
          /* Успех */
          <div className="flex flex-col items-center p-10 text-center">
            <div className="relative mb-5">
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-xl scale-150" />
              <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-3xl">
                🚀
              </div>
            </div>
            <h3 className="mb-2 font-sans text-xl font-light text-foreground">Заявка отправлена!</h3>
            <p className="mb-1 font-mono text-sm text-foreground/60">{internship.name}</p>
            <p className="mb-6 font-mono text-xs text-foreground/40">Ответ придёт на {form.email}</p>
            <button
              onClick={onClose}
              className="rounded-xl border border-foreground/15 px-6 py-2.5 font-mono text-sm text-foreground/60 transition-all hover:border-foreground/30 hover:text-foreground"
            >
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const professions = [
  { name: "Космонавт-испытатель", icon: "Rocket", desc: "Летают на МКС, проводят эксперименты", studied: true },
  { name: "Инженер-конструктор", icon: "Settings", desc: "Разрабатывают корабли и станции", studied: false },
  { name: "Астрофизик", icon: "Star", desc: "Исследуют звёзды, чёрные дыры, экзопланеты", studied: false },
  { name: "Специалист по ЖО", icon: "Shield", desc: "Системы жизнеобеспечения в космосе", studied: false },
  { name: "Оператор миссий", icon: "Radio", desc: "Управление полётами из ЦУП", studied: false },
  { name: "Медик-исследователь", icon: "Heart", desc: "Медицина в условиях невесомости", studied: false },
]

const universities = [
  { name: "МГУ", dept: "Физический факультет", icon: "GraduationCap" },
  { name: "Бауманка", dept: "Ракетно-космические системы", icon: "Cpu" },
  { name: "МФТИ", dept: "Аэрофизика и космос", icon: "Atom" },
  { name: "МАИ", dept: "Аэрокосмический", icon: "Plane" },
]

const internships = [
  { name: "Роскосмос", type: "Стажировка", deadline: "1 июн 2025", icon: "Building2" },
  { name: "Сириус", type: "Конкурс", deadline: "15 апр 2025", icon: "Award" },
  { name: "ЦНИИмаш", type: "Стажировка", deadline: "30 мая 2025", icon: "Microscope" },
]

export function CareerSection({ scrollToSection, isLoggedIn = false }: { scrollToSection?: (index: number) => void; isLoggedIn?: boolean }) {
  const { ref, isVisible } = useReveal(0.2)
  const navigate = useNavigate()
  const [studiedProfs, setStudiedProfs] = useState<number[]>([0])
  const [testDone] = useState(true)
  const [internshipDone] = useState(false)
  const [activeApplication, setActiveApplication] = useState<Internship | null>(null)

  const checklist = [
    { label: "Профтест пройден", done: testDone },
    { label: `Профессий изучено (${studiedProfs.length}/3)`, done: studiedProfs.length >= 3 },
    { label: "Стажировка выбрана (0/1)", done: internshipDone },
  ]
  const checklistPct = Math.round((checklist.filter((c) => c.done).length / checklist.length) * 100)

  const toggleProf = (i: number) => {
    setStudiedProfs((prev) => prev.includes(i) ? prev.filter((x) => x !== i) : [...prev, i])
  }

  return (
    <>
      {activeApplication && (
        <ApplicationModal internship={activeApplication} onClose={() => setActiveApplication(null)} />
      )}
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
              <Icon name="Lock" size={22} className="text-blue-400" />
            </div>
            <h3 className="mb-2 font-sans text-xl font-light text-foreground">Только для участников</h3>
            <p className="mb-5 font-mono text-xs text-foreground/50">Карьерный трек доступен после регистрации на платформе</p>
            <button
              onClick={() => scrollToSection?.(1)}
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
            Карьерный трек
          </h2>
          <p className="font-mono text-sm text-foreground/60">/ Профессии, вузы, стажировки</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Персональный трекер */}
          <div className={`rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm transition-all duration-700 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-3 flex items-center gap-2">
              <Icon name="Map" size={14} className="text-blue-400" />
              <span className="font-mono text-xs text-foreground/60">Персональный маршрут</span>
            </div>
            <div className="mb-3 space-y-2">
              {checklist.map((c, i) => (
                <div key={i} className="flex items-center gap-2">
                  <div className={`flex h-4 w-4 items-center justify-center rounded-full ${c.done ? "bg-blue-500" : "border border-foreground/20"}`}>
                    {c.done && <Icon name="Check" size={10} className="text-white" />}
                  </div>
                  <span className={`font-sans text-xs ${c.done ? "text-foreground" : "text-foreground/50"}`}>{c.label}</span>
                </div>
              ))}
            </div>
            <div className="mb-1 flex justify-between font-mono text-xs text-foreground/40">
              <span>Полный маршрут</span>
              <span>{checklistPct}%</span>
            </div>
            <div className="h-1.5 w-full rounded-full bg-foreground/10">
              <div className="h-1.5 rounded-full bg-blue-500 transition-all duration-700" style={{ width: `${checklistPct}%` }} />
            </div>
          </div>

          {/* Профессии */}
          <div className={`rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
            <div className="mb-3 flex items-center gap-2">
              <Icon name="Briefcase" size={14} className="text-blue-400" />
              <span className="font-mono text-xs text-foreground/60">Космические профессии</span>
            </div>
            <div className="space-y-2">
              {professions.map((p, i) => (
                <div
                  key={i}
                  className={`group flex items-center gap-2 rounded-lg border p-2 cursor-pointer transition-all ${
                    studiedProfs.includes(i)
                      ? "border-blue-500/30 bg-blue-500/5"
                      : "border-foreground/10 hover:border-foreground/20"
                  }`}
                  onClick={() => toggleProf(i)}
                >
                  <Icon name={p.icon as "Rocket"} fallback="Circle" size={12} className={studiedProfs.includes(i) ? "text-blue-400" : "text-foreground/30"} />
                  <div className="flex-1 min-w-0">
                    <div className="font-sans text-xs font-medium text-foreground truncate">{p.name}</div>
                    <div className="font-mono text-[10px] text-foreground/40 truncate">{p.desc}</div>
                  </div>
                  {studiedProfs.includes(i) && <Icon name="CheckCircle" size={12} className="text-blue-400 shrink-0" />}
                </div>
              ))}
            </div>
          </div>

          {/* Вузы + стажировки + созвездие */}
          <div className="space-y-3">
            {/* Вузы */}
            <div className={`rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm transition-all duration-700 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-3 flex items-center gap-2">
                <Icon name="GraduationCap" size={14} className="text-blue-400" />
                <span className="font-mono text-xs text-foreground/60">Где учиться</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {universities.map((u, i) => (
                  <div key={i} className="rounded-lg border border-foreground/10 bg-foreground/5 p-2 hover:border-foreground/20 transition-all">
                    <div className="font-sans text-xs font-medium text-foreground">{u.name}</div>
                    <div className="font-mono text-[9px] text-foreground/40">{u.dept}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Стажировки */}
            <div className={`rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm transition-all duration-700 delay-300 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="mb-3 flex items-center gap-2">
                <Icon name="Sparkles" size={14} className="text-blue-400" />
                <span className="font-mono text-xs text-foreground/60">Стажировки и конкурсы</span>
              </div>
              <div className="space-y-1.5">
                {internships.map((s, i) => (
                  <div key={i} className="flex items-center justify-between rounded-lg border border-foreground/10 p-2 hover:border-blue-500/30 transition-all">
                    <div className="flex items-center gap-2">
                      <Icon name={s.icon as "Award"} fallback="Circle" size={12} className="text-foreground/40" />
                      <div>
                        <div className="font-sans text-xs text-foreground">{s.name}</div>
                        <div className="font-mono text-[9px] text-foreground/40">{s.type} · до {s.deadline}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => setActiveApplication(s)}
                      className="rounded-lg border border-blue-500/30 px-2 py-0.5 font-mono text-[9px] text-blue-400 hover:bg-blue-500/10 transition-all"
                    >
                      Подать
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Созвездие наставничества */}
            <div className={`rounded-xl border border-blue-500/20 bg-blue-500/5 p-3 backdrop-blur-sm transition-all duration-700 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Icon name="Users" size={12} className="text-blue-400" />
                  <span className="font-mono text-xs text-blue-300">Созвездие наставников</span>
                </div>
                <span className="font-mono text-[10px] text-foreground/40">156 активных пар</span>
              </div>
              <div className="mt-2 flex gap-2">
                <button className="flex-1 rounded-lg border border-blue-500/30 py-1.5 font-mono text-[10px] text-blue-400 hover:bg-blue-500/10 transition-all">Найти наставника</button>
                <button className="flex-1 rounded-lg border border-foreground/20 py-1.5 font-mono text-[10px] text-foreground/60 hover:border-foreground/40 transition-all">Стать наставником</button>
              </div>
            </div>
          </div>
        </div>

        {/* Профтест */}
        <div className={`mt-4 flex flex-wrap items-center gap-3 transition-all duration-700 delay-500 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <MagneticButton size="lg" variant="primary" onClick={() => navigate("/space-quiz")}>
            Кто ты в космосе? — пройти тест
          </MagneticButton>
          <MagneticButton size="lg" variant="secondary" onClick={() => {}}>
            Поделиться планом
          </MagneticButton>
        </div>

      </div>
    </section>
    </>
  )
}