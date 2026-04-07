import { useNavigate } from "react-router-dom"
import { MagneticButton } from "@/components/magnetic-button"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import Icon from "@/components/ui/icon"

const timeline = [
  {
    time: "05:30",
    title: "Подъём и подготовка",
    desc: "Юрий Гагарин и его дублёр Герман Титов проснулись в 05:30 по московскому времени. Врачи провели медосмотр — пульс 64 удара в минуту, давление в норме. Гагарин завтракал: мясное пюре, паштет, кофе с молоком — всё в тюбиках.",
  },
  {
    time: "07:10",
    title: "Облачение в скафандр",
    desc: "Гагарин надел оранжевый скафандр СК-1. На шлеме надпись «СССР» появилась в последний момент — кто-то из техников предложил добавить её, чтобы в случае приземления в другой стране не приняли за шпиона.",
  },
  {
    time: "09:07",
    title: "Старт. «Поехали!»",
    desc: "Ракета-носитель «Восток» стартовала с площадки №1 Байконура. Последнее слово Гагарина перед стартом: «Поехали!» — фраза, ставшая символом космической эры. Перегрузка при старте достигала 6g.",
  },
  {
    time: "09:18",
    title: "Выход на орбиту",
    desc: "Корабль «Восток-1» вышел на орбиту высотой 327 км в апогее и 181 км в перигее. Гагарин был первым человеком, увидевшим Землю из космоса: «Вижу Землю... Красота-то какая!»",
  },
  {
    time: "09:51",
    title: "Разворот над Африкой",
    desc: "Над Африкой включился тормозной двигатель. Во время спуска возникла нештатная ситуация — кабельный жгут не отделился, и спускаемый аппарат 10 минут вращался. Гагарин сохранял хладнокровие.",
  },
  {
    time: "10:55",
    title: "Приземление. Миссия завершена",
    desc: "На высоте 7 км Гагарин катапультировался и приземлился на парашюте в Саратовской области. Первой его встретила местная жительница Анна Тахтарова с внучкой. Полёт длился 108 минут.",
  },
]

const facts = [
  { icon: "Clock", label: "Длительность полёта", value: "108 минут" },
  { icon: "Globe", label: "Витков вокруг Земли", value: "1 виток" },
  { icon: "TrendingUp", label: "Максимальная высота", value: "327 км" },
  { icon: "Zap", label: "Скорость на орбите", value: "27 400 км/ч" },
  { icon: "Thermometer", label: "Температура снаружи", value: "до −60°С" },
  { icon: "Weight", label: "Перегрузка при старте", value: "до 6g" },
]

export default function Gagarin() {
  const navigate = useNavigate()

  return (
    <main className="relative min-h-screen w-full bg-background">
      <CustomCursor />
      <GrainOverlay />

      {/* Фиксированная шапка */}
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
          <div className="h-1.5 w-1.5 rounded-full bg-blue-400 animate-pulse" />
          <span className="font-mono text-xs text-blue-300">12 апр 1961</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-28 md:px-12">

        {/* Hero */}
        <div className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5">
            <span className="font-mono text-xs text-foreground/60">/ История побед · СССР</span>
          </div>
          <h1 className="mb-6 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground md:text-7xl">
            Полёт<br />
            <span className="text-foreground/40">Гагарина</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
            12 апреля 1961 года советский лётчик Юрий Алексеевич Гагарин на корабле «Восток-1» совершил первый в истории человечества орбитальный космический полёт. 108 минут, навсегда изменивших мир.
          </p>
        </div>

        {/* Цитата */}
        <blockquote className="mb-16 border-l-2 border-blue-500 pl-6">
          <p className="font-sans text-2xl font-light italic text-foreground/90 md:text-3xl">
            «Облетев Землю в корабле-спутнике, я увидел, как прекрасна наша планета. Люди, будем хранить и приумножать эту красоту, а не разрушать её!»
          </p>
          <cite className="mt-3 block font-mono text-sm text-foreground/40">— Юрий Гагарин</cite>
        </blockquote>

        {/* Факты */}
        <div className="mb-16">
          <h2 className="mb-6 font-sans text-2xl font-light text-foreground">Факты о полёте</h2>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
            {facts.map((f, i) => (
              <div key={i} className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Icon name={f.icon as "Clock"} fallback="Circle" size={14} className="text-blue-400" />
                  <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">{f.label}</span>
                </div>
                <div className="font-sans text-xl font-light text-foreground">{f.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Хронология дня */}
        <div className="mb-16">
          <h2 className="mb-8 font-sans text-2xl font-light text-foreground">Хронология 12 апреля</h2>
          <div className="relative space-y-6">
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-foreground/10" />
            {timeline.map((t, i) => (
              <div key={i} className="relative pl-14">
                <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                  <span className="font-mono text-xs text-blue-400">{t.time}</span>
                </div>
                <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
                  <h3 className="mb-2 font-sans text-base font-medium text-foreground">{t.title}</h3>
                  <p className="font-sans text-sm leading-relaxed text-foreground/70">{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Биография */}
        <div className="mb-16 grid gap-6 md:grid-cols-2">
          <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 font-sans text-xl font-light text-foreground">О Гагарине</h2>
            <div className="space-y-3 font-sans text-sm leading-relaxed text-foreground/70">
              <p>Юрий Алексеевич Гагарин родился 9 марта 1934 года в деревне Клушино Смоленской области. В детстве пережил немецкую оккупацию, после войны увлёкся авиацией.</p>
              <p>В 1955 году поступил в Оренбургское лётное училище. Из 20 кандидатов в первый отряд космонавтов был отобран в марте 1960 года — за отличную физическую подготовку, хладнокровие и обаяние.</p>
              <p>После полёта стал символом СССР и всего человечества. Объездил 30 стран с визитами мира. Погиб 27 марта 1968 года в тренировочном полёте на МиГ-15.</p>
            </div>
          </div>
          <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
            <h2 className="mb-4 font-sans text-xl font-light text-foreground">«Восток-1»</h2>
            <div className="space-y-3 font-sans text-sm leading-relaxed text-foreground/70">
              <p>Корабль «Восток-1» был разработан ОКБ-1 под руководством Сергея Королёва. Сферическая капсула диаметром 2,3 м, масса около 4,7 тонн.</p>
              <p>Система управления была намеренно упрощена: предполагалось, что в случае нештатной ситуации Гагарин может управлять вручную. Код разблокировки был «125» — но Гагарин узнал его заранее от коллег.</p>
              <p>На борту была предусмотрена автономная система приземления, но Гагарин катапультировался на высоте 7 км — это засекречивалось до 1971 года, так как по правилам FAI рекорд не засчитывался.</p>
            </div>
          </div>
        </div>

        {/* Наследие */}
        <div className="mb-12 rounded-xl border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur-sm">
          <h2 className="mb-3 font-sans text-xl font-light text-foreground">Наследие</h2>
          <p className="font-sans text-sm leading-relaxed text-foreground/70">
            12 апреля стало Всемирным днём авиации и космонавтики — Днём космонавтики в России и «Yuri's Night» во всём мире. Имя Гагарина носят кратер на Луне, астероид 1772, проспекты и площади в десятках городов. Его полёт открыл эпоху пилотируемой космонавтики, вдохновив поколения учёных, инженеров и мечтателей.
          </p>
        </div>

        {/* Кнопки */}
        <div className="flex flex-wrap gap-4">
          <MagneticButton variant="primary" size="lg" onClick={() => navigate(-1)}>
            Вернуться к истории
          </MagneticButton>
          <MagneticButton variant="secondary" size="lg" onClick={() => navigate("/")}>
            На главную
          </MagneticButton>
        </div>
      </div>
    </main>
  )
}
