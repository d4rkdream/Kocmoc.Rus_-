import { useNavigate } from "react-router-dom"
import { MagneticButton } from "@/components/magnetic-button"
import { CustomCursor } from "@/components/custom-cursor"
import { GrainOverlay } from "@/components/grain-overlay"
import Icon from "@/components/ui/icon"

const milestones = [
  {
    year: "2021",
    title: "Концепция утверждена",
    desc: "Правительство России утвердило концепцию многофункциональной спутниковой системы СФЕРА. В состав системы войдут группировки широкополосного интернета, связи и дистанционного зондирования Земли.",
  },
  {
    year: "2022",
    title: "Первые испытательные спутники",
    desc: "Роскосмос приступил к разработке демонстрационных аппаратов. Проведены первые испытания бортовой аппаратуры для группировки «Марафон-IoT».",
  },
  {
    year: "2023",
    title: "Марафон-IoT: старт разработки",
    desc: "Спутниковая группировка «Марафон-IoT» вошла в активную фазу. ИСС им. Решетнёва начало производство первой партии малых космических аппаратов серии «Марафон».",
  },
  {
    year: "2024",
    title: "Наземная инфраструктура",
    desc: "Введены в эксплуатацию первые наземные станции управления. Отработаны протоколы связи с малыми аппаратами IoT-класса.",
  },
  {
    year: "2025 (план)",
    title: "Первые запуски «Марафон»",
    desc: "Запланирован старт первой партии спутников «Марафон» с помощью ракеты-носителя «Союз-2». После вывода на орбиту начнётся тестирование широкополосного IoT-покрытия.",
  },
  {
    year: "2026–2030",
    title: "Развёртывание группировки",
    desc: "Поэтапное наращивание орбитальной группировки до 264 аппаратов. Выход на коммерческое обслуживание: покрытие всей территории России и приполярных районов.",
  },
]

const specs = [
  { icon: "Satellite", label: "Спутников в группировке", value: "264 аппарата" },
  { icon: "Globe", label: "Тип орбиты", value: "НОО / 750 км" },
  { icon: "Wifi", label: "Тип сервиса", value: "IoT / M2M связь" },
  { icon: "Zap", label: "Масса одного аппарата", value: "~50 кг" },
  { icon: "Radio", label: "Частотный диапазон", value: "Ka + V диапазон" },
  { icon: "Map", label: "Зона покрытия", value: "Вся Россия + Арктика" },
]

const useCases = [
  { icon: "Truck", title: "Логистика и мониторинг", desc: "Отслеживание грузов, транспорта и оборудования в труднодоступных районах без наземных сотовых сетей." },
  { icon: "Leaf", title: "Агро и экология", desc: "Датчики умных полей, мониторинг качества почв, водных ресурсов и климатических параметров в реальном времени." },
  { icon: "Bolt", title: "Энергетика", desc: "Дистанционное считывание счётчиков, контроль трубопроводов, ЛЭП и нефтяных скважин в Сибири и на шельфе." },
  { icon: "Shield", title: "Безопасность и МЧС", desc: "Экстренная связь в зонах стихийных бедствий, интеграция с системами ГЛОНАСС для поиска людей." },
]

export default function Sfera() {
  const navigate = useNavigate()

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
        <div className="flex items-center gap-1 rounded-full border border-green-500/30 bg-green-500/10 px-3 py-1">
          <div className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
          <span className="font-mono text-xs text-green-300">Развёртывание</span>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-6 pb-24 pt-28 md:px-12">

        {/* Hero */}
        <div className="mb-16">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-4 py-1.5">
            <span className="font-mono text-xs text-foreground/60">/ Современные проекты · Россия</span>
          </div>
          <h1 className="mb-6 font-sans text-5xl font-light leading-[1.1] tracking-tight text-foreground md:text-7xl">
            СФЕРА —<br />
            <span className="text-foreground/40">Марафон</span>
          </h1>
          <p className="max-w-2xl text-lg leading-relaxed text-foreground/80 md:text-xl">
            Российская многофункциональная спутниковая система нового поколения. Группировка «Марафон» обеспечит повсеместный доступ к интернету вещей (IoT) на всей территории страны, включая Арктику и труднодоступные районы.
          </p>
        </div>

        {/* Статус-баннер */}
        <div className="mb-12 grid gap-4 grid-cols-2 md:grid-cols-4">
          {[
            { label: "Следующий старт", value: "Июль 2025", icon: "Rocket", color: "text-blue-400" },
            { label: "Подписчиков", value: "2 280", icon: "Bell", color: "text-foreground" },
            { label: "Дней до запуска", value: "~90", icon: "Clock", color: "text-yellow-400" },
            { label: "Статус", value: "Развёртывание", icon: "Activity", color: "text-green-400" },
          ].map((s, i) => (
            <div key={i} className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm">
              <div className="mb-1 flex items-center gap-1.5">
                <Icon name={s.icon as "Rocket"} fallback="Circle" size={12} className={s.color} />
                <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">{s.label}</span>
              </div>
              <div className={`font-sans text-lg font-light ${s.color}`}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Что такое СФЕРА */}
        <div className="mb-12">
          <h2 className="mb-6 font-sans text-2xl font-light text-foreground">Что такое СФЕРА?</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
              <p className="font-sans text-sm leading-relaxed text-foreground/70">
                СФЕРА — это масштабная российская космическая программа, объединяющая несколько орбитальных группировок разного назначения. В её состав входят спутники широкополосного интернета, IoT-связи и дистанционного зондирования Земли.
              </p>
            </div>
            <div className="rounded-xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm">
              <p className="font-sans text-sm leading-relaxed text-foreground/70">
                Группировка «Марафон-IoT» — ключевой элемент СФЕРА для интернета вещей. 264 малых спутника на низкой орбите создадут сплошное покрытие, позволяя миллионам устройств передавать данные из любой точки России.
              </p>
            </div>
          </div>
        </div>

        {/* Технические характеристики */}
        <div className="mb-12">
          <h2 className="mb-6 font-sans text-2xl font-light text-foreground">Технические характеристики</h2>
          <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
            {specs.map((s, i) => (
              <div key={i} className="rounded-xl border border-foreground/10 bg-foreground/5 p-4 backdrop-blur-sm">
                <div className="mb-2 flex items-center gap-2">
                  <Icon name={s.icon as "Satellite"} fallback="Circle" size={14} className="text-blue-400" />
                  <span className="font-mono text-[10px] text-foreground/40 uppercase tracking-widest">{s.label}</span>
                </div>
                <div className="font-sans text-base font-light text-foreground">{s.value}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Хронология */}
        <div className="mb-12">
          <h2 className="mb-8 font-sans text-2xl font-light text-foreground">Хронология проекта</h2>
          <div className="relative space-y-5">
            <div className="absolute left-[23px] top-0 bottom-0 w-px bg-foreground/10" />
            {milestones.map((m, i) => (
              <div key={i} className="relative pl-14">
                <div className="absolute left-0 top-1 flex h-12 w-12 items-center justify-center rounded-full border border-blue-500/30 bg-blue-500/10">
                  <span className="font-mono text-[10px] text-blue-400 text-center leading-tight">{m.year.replace(" (план)", "")}</span>
                </div>
                <div className={`rounded-xl border p-5 backdrop-blur-sm ${m.year.includes("план") ? "border-blue-500/20 bg-blue-500/5" : "border-foreground/10 bg-foreground/5"}`}>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="font-sans text-sm font-medium text-foreground">{m.title}</h3>
                    {m.year.includes("план") && (
                      <span className="rounded border border-blue-500/30 px-1.5 py-0.5 font-mono text-[9px] text-blue-400">план</span>
                    )}
                  </div>
                  <p className="font-sans text-xs leading-relaxed text-foreground/70">{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Области применения */}
        <div className="mb-12">
          <h2 className="mb-6 font-sans text-2xl font-light text-foreground">Области применения</h2>
          <div className="grid gap-4 md:grid-cols-2">
            {useCases.map((u, i) => (
              <div key={i} className="group rounded-xl border border-foreground/10 bg-foreground/5 p-5 backdrop-blur-sm transition-all hover:border-blue-500/30 hover:bg-blue-500/5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10 border border-blue-500/20">
                    <Icon name={u.icon as "Truck"} fallback="Circle" size={16} className="text-blue-400" />
                  </div>
                  <h3 className="font-sans text-sm font-medium text-foreground">{u.title}</h3>
                </div>
                <p className="font-sans text-xs leading-relaxed text-foreground/70">{u.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Разработчики */}
        <div className="mb-12 rounded-xl border border-foreground/10 bg-foreground/5 p-6 backdrop-blur-sm">
          <h2 className="mb-4 font-sans text-xl font-light text-foreground">Кто создаёт</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {[
              { name: "Роскосмос", role: "Генеральный заказчик", desc: "Государственная корпорация, руководящая реализацией программы СФЕРА." },
              { name: "ИСС им. Решетнёва", role: "Производитель спутников", desc: "Ведущее российское предприятие по созданию телекоммуникационных и навигационных КА." },
              { name: "РКЦ «Прогресс»", role: "Ракета-носитель", desc: "Производит ракеты «Союз-2» для запуска спутников на низкую орбиту." },
            ].map((c, i) => (
              <div key={i} className="rounded-lg border border-foreground/10 p-3">
                <div className="mb-1 font-sans text-sm font-medium text-foreground">{c.name}</div>
                <div className="mb-1.5 font-mono text-[10px] text-blue-400">{c.role}</div>
                <div className="font-sans text-xs text-foreground/60">{c.desc}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Цитата */}
        <blockquote className="mb-12 border-l-2 border-blue-500 pl-6">
          <p className="font-sans text-xl font-light italic text-foreground/90 md:text-2xl">
            «СФЕРА обеспечит технологическую независимость России в области спутниковой связи и создаст новую цифровую инфраструктуру для всей страны.»
          </p>
          <cite className="mt-3 block font-mono text-sm text-foreground/40">— Роскосмос, программный документ</cite>
        </blockquote>

        {/* Кнопки */}
        <div className="flex flex-wrap gap-4">
          <MagneticButton variant="primary" size="lg" onClick={() => navigate(-1)}>
            Вернуться к проектам
          </MagneticButton>
          <MagneticButton variant="secondary" size="lg" onClick={() => navigate("/")}>
            На главную
          </MagneticButton>
        </div>
      </div>
    </main>
  )
}
