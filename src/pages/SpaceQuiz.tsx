import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { MagneticButton } from "@/components/magnetic-button"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import Icon from "@/components/ui/icon"

const questions = [
  {
    id: 1,
    text: "Что тебя привлекает больше всего в освоении космоса?",
    emoji: "🚀",
    options: [
      { text: "Лететь самому, испытывать невесомость и видеть Землю из иллюминатора", type: "cosmonaut" },
      { text: "Проектировать корабли и двигатели — создавать то, что полетит", type: "engineer" },
      { text: "Разгадывать тайны звёзд, чёрных дыр и далёких галактик", type: "scientist" },
      { text: "Управлять миссиями из ЦУПа, координировать команду и принимать решения", type: "commander" },
    ],
  },
  {
    id: 2,
    text: "Представь: экспедиция на Марс. Какую роль ты выбираешь?",
    emoji: "🪐",
    options: [
      { text: "Пилот корабля — я веду экипаж через 7 месяцев перелёта", type: "cosmonaut" },
      { text: "Бортинженер — слежу за системами жизнеобеспечения и реактором", type: "engineer" },
      { text: "Геолог-исследователь — изучаю марсианский грунт в поисках следов жизни", type: "scientist" },
      { text: "Командир экспедиции — принимаю стратегические решения и отвечаю за экипаж", type: "commander" },
    ],
  },
]

const results: Record<string, { title: string; emoji: string; desc: string; skills: string[]; path: string; color: string }> = {
  cosmonaut: {
    title: "Космонавт-испытатель",
    emoji: "👨‍🚀",
    desc: "Ты рождён для полётов. Тебя влечёт живой опыт — невесомость, восход Солнца каждые 90 минут, выходы в открытый космос. Ты не боишься риска и умеешь сохранять хладнокровие в критических ситуациях.",
    skills: ["Физическая выносливость", "Психологическая устойчивость", "Пилотирование", "Работа в команде"],
    path: "Лётное училище → Отряд космонавтов → МКС",
    color: "text-blue-400",
  },
  engineer: {
    title: "Инженер-конструктор",
    emoji: "🔧",
    desc: "Твоя сила — в создании. Ты видишь, как идея превращается в чертёж, а чертёж — в ракету. Именно такие люди строят корабли, двигатели и орбитальные станции. Без тебя никто никуда не полетит.",
    skills: ["Математика и физика", "Конструирование", "Системное мышление", "Работа с CAD"],
    path: "Бауманка / МАИ → ИСС Решетнёва / РКК Энергия → ОКБ",
    color: "text-yellow-400",
  },
  scientist: {
    title: "Астрофизик-исследователь",
    emoji: "🔭",
    desc: "Вселенная — твоя лаборатория. Тебя завораживают вопросы без ответов: есть ли жизнь за пределами Земли, что внутри чёрной дыры, как возникла Вселенная. Наука — твой способ раздвигать горизонты.",
    skills: ["Астрофизика", "Математический анализ", "Программирование", "Научное письмо"],
    path: "МГУ / МФТИ → аспирантура → ИКИ РАН / ГАИШ",
    color: "text-purple-400",
  },
  commander: {
    title: "Командир миссии",
    emoji: "🎯",
    desc: "Ты мыслишь стратегически и умеешь вести людей за собой. Управление миссией — это не только техника, но и люди, дипломатия и принятие решений под давлением. Твоё место — в центре управления полётами.",
    skills: ["Лидерство", "Управление рисками", "Международная коммуникация", "Стратегическое планирование"],
    path: "Технический вуз → ЦУП Роскосмоса → Руководство миссией",
    color: "text-red-400",
  },
}

export default function SpaceQuiz() {
  const navigate = useNavigate()
  const [step, setStep] = useState<"intro" | "q1" | "q2" | "result">("intro")
  const [answers, setAnswers] = useState<string[]>([])
  const [selected, setSelected] = useState<string | null>(null)

  const currentQ = step === "q1" ? questions[0] : questions[1]

  const handleAnswer = (type: string) => {
    setSelected(type)
  }

  const handleNext = () => {
    if (!selected) return
    const newAnswers = [...answers, selected]
    setAnswers(newAnswers)
    setSelected(null)

    if (step === "q1") {
      setStep("q2")
    } else {
      setStep("result")
    }
  }

  const getResult = () => {
    const counts: Record<string, number> = {}
    answers.forEach((a) => { counts[a] = (counts[a] || 0) + 1 })
    return Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0] || "engineer"
  }

  const result = step === "result" ? results[getResult()] : null
  const progress = step === "q1" ? 50 : step === "q2" ? 100 : 0

  return (
    <main className="relative min-h-screen w-full bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Шапка */}
      <header className="fixed left-0 right-0 top-0 z-50 flex items-center justify-between px-6 py-5 backdrop-blur-md bg-background/60 border-b border-foreground/10 md:px-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-foreground/70 hover:text-foreground transition-colors"
        >
          <Icon name="ArrowLeft" size={16} />
          <span className="font-mono text-sm">Назад</span>
        </button>
        <div className="flex items-center gap-2">
          <Icon name="Rocket" size={16} className="text-blue-400" />
          <span className="font-sans text-sm font-semibold text-foreground">КосмоТрек</span>
        </div>
        <div className="flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1">
          <span className="font-mono text-xs text-blue-300">Профтест</span>
        </div>
      </header>

      <div className="mx-auto max-w-2xl px-6 pb-24 pt-28 md:px-12">

        {/* Интро */}
        {step === "intro" && (
          <div className="text-center">
            <div className="mb-6 text-7xl">🚀</div>
            <h1 className="mb-4 font-sans text-4xl font-light leading-tight text-foreground md:text-5xl">
              Кто ты<br />
              <span className="text-foreground/40">в космосе?</span>
            </h1>
            <p className="mb-10 text-base leading-relaxed text-foreground/70 md:text-lg">
              2 вопроса — и мы определим твою роль в освоении Вселенной: от пилота до учёного.
            </p>
            <MagneticButton variant="primary" size="lg" onClick={() => setStep("q1")}>
              Начать тест
            </MagneticButton>
          </div>
        )}

        {/* Вопросы */}
        {(step === "q1" || step === "q2") && (
          <div>
            {/* Прогресс */}
            <div className="mb-8">
              <div className="mb-2 flex justify-between font-mono text-xs text-foreground/40">
                <span>Вопрос {step === "q1" ? 1 : 2} из 2</span>
                <span>{progress}%</span>
              </div>
              <div className="h-1 w-full rounded-full bg-foreground/10">
                <div
                  className="h-1 rounded-full bg-blue-500 transition-all duration-500"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>

            {/* Вопрос */}
            <div className="mb-8 text-center">
              <div className="mb-4 text-5xl">{currentQ.emoji}</div>
              <h2 className="font-sans text-2xl font-light leading-snug text-foreground md:text-3xl">
                {currentQ.text}
              </h2>
            </div>

            {/* Варианты */}
            <div className="mb-8 space-y-3">
              {currentQ.options.map((opt, i) => (
                <button
                  key={i}
                  onClick={() => handleAnswer(opt.type)}
                  className={`w-full rounded-xl border p-4 text-left transition-all duration-200 ${
                    selected === opt.type
                      ? "border-blue-500 bg-blue-500/15 text-foreground"
                      : "border-foreground/10 bg-foreground/5 text-foreground/80 hover:border-foreground/25 hover:bg-foreground/8"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border transition-all ${
                      selected === opt.type ? "border-blue-500 bg-blue-500" : "border-foreground/20"
                    }`}>
                      {selected === opt.type && <Icon name="Check" size={10} className="text-white" />}
                    </div>
                    <span className="font-sans text-sm leading-relaxed">{opt.text}</span>
                  </div>
                </button>
              ))}
            </div>

            <MagneticButton
              variant="primary"
              size="lg"
              onClick={handleNext}
              className={!selected ? "opacity-40 pointer-events-none" : ""}
            >
              {step === "q1" ? "Следующий вопрос →" : "Узнать результат →"}
            </MagneticButton>
          </div>
        )}

        {/* Результат */}
        {step === "result" && result && (
          <div>
            <div className="mb-4 text-center font-mono text-xs text-foreground/40 uppercase tracking-widest">Твой результат</div>
            <div className="mb-8 rounded-2xl border border-foreground/10 bg-foreground/5 p-8 text-center backdrop-blur-sm">
              <div className="mb-4 text-6xl">{result.emoji}</div>
              <h2 className={`mb-3 font-sans text-3xl font-light ${result.color} md:text-4xl`}>
                {result.title}
              </h2>
              <p className="font-sans text-sm leading-relaxed text-foreground/75 md:text-base">
                {result.desc}
              </p>
            </div>

            {/* Навыки */}
            <div className="mb-6 rounded-xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
              <div className="mb-3 flex items-center gap-2">
                <Icon name="Star" size={14} className="text-blue-400" />
                <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest">Ключевые навыки</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {result.skills.map((s, i) => (
                  <span key={i} className="rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 font-mono text-xs text-blue-300">
                    {s}
                  </span>
                ))}
              </div>
            </div>

            {/* Путь */}
            <div className="mb-8 rounded-xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
              <div className="mb-2 flex items-center gap-2">
                <Icon name="Map" size={14} className="text-blue-400" />
                <span className="font-mono text-xs text-foreground/50 uppercase tracking-widest">Карьерный маршрут</span>
              </div>
              <p className="font-mono text-sm text-foreground/80">{result.path}</p>
            </div>

            {/* Кнопки */}
            <div className="flex flex-wrap gap-3">
              <MagneticButton variant="primary" size="lg" onClick={() => { setStep("intro"); setAnswers([]); setSelected(null) }}>
                Пройти ещё раз
              </MagneticButton>
              <MagneticButton variant="secondary" size="lg" onClick={() => navigate(-1)}>
                Вернуться к карьере
              </MagneticButton>
            </div>
          </div>
        )}
      </div>
    </main>
  )
}
