import { useState } from "react"
import { useReveal } from "@/hooks/use-reveal"
import Icon from "@/components/ui/icon"

type InternshipItem = typeof internships[number]

function ApplicationModal({ item, onClose }: { item: InternshipItem; onClose: () => void }) {
  const [step, setStep] = useState<"form" | "success">("form")
  const [form, setForm] = useState({ name: "", email: "", age: "", university: "", course: "", motivation: "" })
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
      <div className="absolute inset-0 bg-background/85 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg rounded-2xl border border-foreground/15 bg-background shadow-2xl shadow-black/50 ring-1 ring-white/5 animate-in fade-in zoom-in-95 duration-300 max-h-[90vh] overflow-y-auto" style={{ scrollbarWidth: "none" }}>
        {step === "form" ? (
          <>
            {/* Шапка */}
            <div className="sticky top-0 z-10 flex items-start justify-between border-b border-foreground/10 bg-background p-5">
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <Icon name={item.icon as "Rocket"} fallback="Building2" size={13} className={item.color} />
                  <span className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">{item.type}</span>
                  <span className="rounded-full border border-foreground/10 px-2 py-0.5 font-mono text-[9px] text-foreground/40">до {item.deadline}</span>
                </div>
                <h3 className="font-sans text-base font-medium text-foreground">{item.title}</h3>
                <p className={`font-mono text-xs ${item.color}`}>{item.org}</p>
              </div>
              <button onClick={onClose} className="ml-3 shrink-0 text-foreground/30 hover:text-foreground/60 transition-colors">
                <Icon name="X" size={18} />
              </button>
            </div>

            {/* Ключевые параметры */}
            <div className="grid grid-cols-2 gap-2 px-5 pt-4 md:grid-cols-4">
              {[
                { icon: "Clock", value: item.duration },
                { icon: "MapPin", value: item.location },
                { icon: "Banknote", value: item.stipend },
                { icon: "Calendar", value: item.deadline },
              ].map((d) => (
                <div key={d.icon} className="rounded-lg border border-foreground/10 bg-foreground/5 p-2 text-center">
                  <Icon name={d.icon as "Clock"} fallback="Circle" size={10} className="mx-auto mb-0.5 text-foreground/30" />
                  <div className="font-mono text-[9px] text-foreground/60">{d.value}</div>
                </div>
              ))}
            </div>

            {/* Форма */}
            <form onSubmit={handleSubmit} className="space-y-3 p-5">
              <p className="font-mono text-[10px] uppercase tracking-widest text-foreground/40">/ Данные заявителя</p>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-mono text-[10px] text-foreground/40">Имя и фамилия</label>
                  <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Алексей Петров"
                    className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] text-foreground/40">Возраст</label>
                  <input required type="number" min={16} max={35} value={form.age} onChange={(e) => setForm({ ...form, age: e.target.value })}
                    placeholder="21"
                    className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50" />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] text-foreground/40">Email</label>
                <input required type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="cosmonaut@example.com"
                  className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="mb-1 block font-mono text-[10px] text-foreground/40">Университет</label>
                  <input required value={form.university} onChange={(e) => setForm({ ...form, university: e.target.value })}
                    placeholder="МГТУ Бауманка"
                    className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50" />
                </div>
                <div>
                  <label className="mb-1 block font-mono text-[10px] text-foreground/40">Курс</label>
                  <input required value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}
                    placeholder="3 курс"
                    className="w-full rounded-xl border border-foreground/15 bg-foreground/5 px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50" />
                </div>
              </div>

              <div>
                <label className="mb-1 block font-mono text-[10px] text-foreground/40">Мотивационное письмо</label>
                <textarea required rows={4} value={form.motivation} onChange={(e) => setForm({ ...form, motivation: e.target.value })}
                  placeholder={`Почему вы хотите пройти стажировку в ${item.org}...`}
                  className="w-full resize-none rounded-xl border border-foreground/15 bg-foreground/5 px-3 py-2.5 font-sans text-sm text-foreground placeholder:text-foreground/25 outline-none transition-all focus:border-blue-500/50" />
              </div>

              <button type="submit" disabled={loading}
                className={`w-full rounded-xl py-3 font-sans text-sm font-medium text-white shadow-lg transition-all active:scale-[0.98] disabled:opacity-60 bg-blue-500 hover:bg-blue-400 shadow-blue-500/25`}>
                {loading ? (
                  <span className="flex items-center justify-center gap-2">
                    <Icon name="Loader" size={14} className="animate-spin" />
                    Отправляем заявку...
                  </span>
                ) : "Отправить заявку"}
              </button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center p-12 text-center">
            <div className="relative mb-6">
              <div className="absolute inset-0 rounded-full bg-green-500/20 blur-2xl scale-150" />
              <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-green-500/30 bg-green-500/10 text-4xl">
                🚀
              </div>
            </div>
            <h3 className="mb-2 font-sans text-xl font-light text-foreground">Заявка отправлена!</h3>
            <p className={`mb-1 font-mono text-sm font-medium ${item.color}`}>{item.org}</p>
            <p className="mb-1 font-sans text-sm text-foreground/60">{item.title}</p>
            <p className="mb-6 font-mono text-xs text-foreground/40">Ответ придёт на {form.email}</p>
            <button onClick={onClose}
              className="rounded-xl border border-foreground/15 px-8 py-2.5 font-mono text-sm text-foreground/60 transition-all hover:border-foreground/30 hover:text-foreground">
              Закрыть
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

const universities = [
  {
    id: 1,
    name: "Московский государственный университет",
    short: "МГУ",
    faculty: "Физический факультет",
    programs: ["Астрофизика", "Физика космоса", "Прикладная математика"],
    city: "Москва",
    icon: "GraduationCap",
    url: "msu.ru",
    color: "text-blue-400",
    border: "border-blue-500/20",
    founded: "1755",
    students: "47 000+",
    about: "Старейший и крупнейший университет России. Физический факультет МГУ — кузница кадров для Роскосмоса и РАН. Здесь готовят астрофизиков, специалистов по физике атмосферы и космической плазме. Выпускники работают в ЦНИИмаш, ИКИ РАН и на международных телескопах.",
    advantages: ["Сильная научная школа", "Доступ к обсерватории ГАИШ", "Партнёрство с Роскосмосом", "Международные обмены"],
    budget: "Есть бюджетные места",
    score: "от 270 баллов ЕГЭ",
  },
  {
    id: 2,
    name: "МГТУ им. Н.Э. Баумана",
    short: "Бауманка",
    faculty: "Аэрокосмический факультет (факультет СМ)",
    programs: ["Ракетно-космические системы", "Двигатели летательных аппаратов", "Системы управления и испытания"],
    city: "Москва",
    icon: "Cpu",
    url: "bmstu.ru",
    color: "text-purple-400",
    border: "border-purple-500/20",
    founded: "1830",
    students: "21 000+",
    about: "Главный технический университет страны. Аэрокосмический факультет Бауманки — поставщик инженеров для всех ключевых предприятий отрасли: РКЦ «Прогресс», РКК «Энергия», НПО «Энергомаш». Выпускники проектируют ракеты, спутники и двигатели.",
    advantages: ["Практика на заводах с 3-го курса", "Собственный студенческий КБ", "Сильнейшая инженерная школа", "Высокий процент трудоустройства"],
    budget: "Есть бюджетные места",
    score: "от 275 баллов ЕГЭ",
  },
  {
    id: 3,
    name: "Московский физико-технический институт",
    short: "МФТИ",
    faculty: "Аэрофизика и космические исследования",
    programs: ["Аэрокосмические технологии", "Прикладная физика и математика", "Космические системы и технологии"],
    city: "Долгопрудный (МО)",
    icon: "Atom",
    url: "mipt.ru",
    color: "text-cyan-400",
    border: "border-cyan-500/20",
    founded: "1951",
    students: "6 500+",
    about: "«Физтех» — элитный вуз с системой Капицы: студенты со 2-го курса работают в базовых организациях — институтах РАН и центрах Роскосмоса. Система «база + кафедра» позволяет получить реальный научный опыт ещё в студенческие годы.",
    advantages: ["Система базовых кафедр в НИИ", "Лучший конкурс на месте среди техн. вузов", "Малые группы, индивидуальный подход", "Сильная математическая подготовка"],
    budget: "Есть бюджетные места",
    score: "от 290 баллов ЕГЭ",
  },
  {
    id: 4,
    name: "Московский авиационный институт",
    short: "МАИ",
    faculty: "Аэрокосмический институт (институт №1)",
    programs: ["Авиастроение", "Ракетные и космические системы", "Авионика и системы управления"],
    city: "Москва",
    icon: "Plane",
    url: "mai.ru",
    color: "text-orange-400",
    border: "border-orange-500/20",
    founded: "1930",
    students: "22 000+",
    about: "МАИ — флагман авиационно-космического образования России. Более 150 000 выпускников работают в авиации и космонавтике. Институт сотрудничает с Airbus, Boeing, «Яковлевым» и Роскосмосом. Студенты участвуют в реальных проектах разработки малых спутников.",
    advantages: ["Собственное КБ малых спутников", "Партнёрство с индустрией", "Широкий выбор специализаций", "Студенческие команды CubeSat"],
    budget: "Есть бюджетные места",
    score: "от 240 баллов ЕГЭ",
  },
]

const internships = [
  {
    id: 1,
    org: "Роскосмос",
    title: "Стажёр-инженер по системам навигации",
    type: "Стажировка",
    duration: "3 месяца",
    deadline: "1 июня 2026",
    location: "Москва",
    stipend: "45 000 ₽/мес",
    icon: "Building2",
    color: "text-blue-400",
    bg: "bg-blue-500/5 border-blue-500/20",
    tags: ["Инженерия", "Навигация", "Очно"],
    about: "Стажировка в Главном вычислительном центре Роскосмоса. Стажёры участвуют в разработке и тестировании алгоритмов навигации для автоматических космических аппаратов. Работа в команде из 5–8 специалистов под руководством ведущего инженера.",
    requirements: ["Студент 3–5 курса по специальностям: радиотехника, навигация, информатика", "Знание C++ или Python", "Базовые знания теории управления", "Оформленный допуск к гостайне (или готовность оформить)"],
    result: "По итогам стажировки лучшие участники получают предложение о трудоустройстве на позицию инженера 3-й категории.",
  },
  {
    id: 2,
    org: "Образовательный центр «Сириус»",
    title: "Программа «Космические технологии» для студентов",
    type: "Конкурс",
    duration: "21 день",
    deadline: "15 апреля 2026",
    location: "Сочи",
    stipend: "Бесплатно + проживание",
    icon: "Award",
    color: "text-yellow-400",
    bg: "bg-yellow-500/5 border-yellow-500/20",
    tags: ["Студентам", "Проживание", "Очно"],
    about: "Интенсивная образовательная программа для студентов 2–4 курсов технических специальностей. Участники под руководством ведущих специалистов отрасли разрабатывают проекты в области малых спутников, систем дистанционного зондирования Земли и орбитальных платформ.",
    requirements: ["Студент 2–4 курса технического или физического направления", "Средний балл диплома от 4,5", "Эссе-мотивация (до 1000 слов)", "Портфолио проектов (при наличии)"],
    result: "Лучшие проекты получают гранты на реализацию от Фонда «Сириус». Все участники — сертификат и включение в базу кадрового резерва Роскосмоса.",
  },
  {
    id: 3,
    org: "ЦНИИмаш",
    title: "Научная стажировка по аэродинамике",
    type: "Стажировка",
    duration: "6 месяцев",
    deadline: "30 мая 2026",
    location: "Королёв",
    stipend: "35 000 ₽/мес",
    icon: "Microscope",
    color: "text-green-400",
    bg: "bg-green-500/5 border-green-500/20",
    tags: ["Наука", "Аэродинамика", "Очно"],
    about: "ЦНИИмаш — головной научный институт Роскосмоса. Стажёры работают в лаборатории аэродинамики и тепломассообмена, проводят испытания моделей в аэродинамических трубах и участвуют в расчётах тепловых режимов возвращаемых аппаратов.",
    requirements: ["Студент 4–6 курса или аспирант по специальностям: аэродинамика, авиастроение, прикладная математика", "Опыт работы с CFD-пакетами (ANSYS Fluent, OpenFOAM)", "Знание методов вычислительной математики"],
    result: "Возможность публикации результатов в научных журналах. Приоритет при трудоустройстве в ЦНИИмаш.",
  },
  {
    id: 4,
    org: "РКК Энергия",
    title: "Конструктор-стажёр пилотируемых кораблей",
    type: "Стажировка",
    duration: "4 месяца",
    deadline: "20 июня 2026",
    location: "Королёв",
    stipend: "50 000 ₽/мес",
    icon: "Rocket",
    color: "text-purple-400",
    bg: "bg-purple-500/5 border-purple-500/20",
    tags: ["Конструирование", "Пилотируемые", "Очно"],
    about: "РКК «Энергия» — создатель кораблей «Союз», «Прогресс» и модулей МКС. Стажёры участвуют в конструкторских разработках нового транспортного корабля «Орёл», работают с САПР-системами и участвуют в технических совещаниях.",
    requirements: ["Студент 4–5 курса или выпускник по специальностям: машиностроение, ракетно-космические системы", "Уверенное владение SolidWorks или CATIA", "Знание стандартов ЕСКД"],
    result: "Лучшие стажёры получают предложение о постоянном трудоустройстве. Доступ к засекреченным проектам после оформления допуска.",
  },
  {
    id: 5,
    org: "Кванториум «КосмоКвантум»",
    title: "Летняя школа по спутниковым технологиям",
    type: "Школьникам",
    duration: "2 недели",
    deadline: "10 мая 2026",
    location: "Онлайн + выезд",
    stipend: "Бесплатно",
    icon: "Star",
    color: "text-pink-400",
    bg: "bg-pink-500/5 border-pink-500/20",
    tags: ["Школьникам", "Спутники", "Гибрид"],
    about: "Программа для школьников 8–11 классов, увлечённых космосом и технологиями. Первая неделя — онлайн-лекции и практические задания по основам спутниковых систем. Вторая неделя — очный интенсив на базе Центра Кванториум, сборка и запуск модели наноспутника.",
    requirements: ["Школьник 8–11 класса", "Интерес к физике, математике, программированию", "Базовые знания Python (желательно)", "Согласие родителей на участие"],
    result: "Сертификат Кванториума. Возможность продолжить обучение в кружке спутниковых технологий. Рекомендации для поступления в профильные вузы.",
  },
]

export function InternshipsSection() {
  const { ref, isVisible } = useReveal(0.2)
  const [tab, setTab] = useState<"universities" | "internships">("internships")
  const [expandedId, setExpandedId] = useState<number | null>(null)
  const [applyItem, setApplyItem] = useState<InternshipItem | null>(null)

  return (
    <>
      {applyItem && <ApplicationModal item={applyItem} onClose={() => setApplyItem(null)} />}
      <section
        ref={ref}
        data-scrollable
        className="flex h-screen w-screen shrink-0 snap-start items-start px-6 pt-20 pb-6 md:px-12 lg:px-16 overflow-y-auto"
        style={{ scrollbarWidth: "none" }}
      >
      <div className="mx-auto w-full max-w-7xl">
        <div className={`mb-6 transition-all duration-700 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-12 opacity-0"}`}>
          <h2 className="mb-1 font-sans text-4xl font-light tracking-tight text-foreground md:text-6xl">
            Стажировки
          </h2>
          <p className="font-mono text-sm text-foreground/60">/ Где учиться и начать карьеру в космосе</p>
        </div>

        <div className={`mb-6 flex rounded-xl border border-foreground/10 bg-foreground/5 p-1 max-w-xs transition-all duration-700 delay-100 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <button
            onClick={() => setTab("internships")}
            className={`flex-1 rounded-lg py-2 font-sans text-xs font-medium transition-all duration-300 ${
              tab === "internships" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            Стажировки
          </button>
          <button
            onClick={() => setTab("universities")}
            className={`flex-1 rounded-lg py-2 font-sans text-xs font-medium transition-all duration-300 ${
              tab === "universities" ? "bg-blue-500 text-white shadow-lg shadow-blue-500/20" : "text-foreground/50 hover:text-foreground"
            }`}
          >
            Учебные заведения
          </button>
        </div>

        {/* Стажировки */}
        {tab === "internships" && (
          <div className="space-y-3 pb-4">
            {internships.map((item, i) => (
              <div
                key={item.id}
                className={`rounded-xl border p-4 backdrop-blur-sm transition-all duration-500 ${item.bg} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${150 + i * 70}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-foreground/10 ${item.color}`}>
                      <Icon name={item.icon as "Rocket"} fallback="Circle" size={16} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="mb-0.5 flex flex-wrap items-center gap-2">
                        <span className={`font-mono text-[10px] font-medium ${item.color}`}>{item.org}</span>
                        <span className="rounded border border-foreground/15 px-1.5 py-0.5 font-mono text-[9px] text-foreground/50">{item.type}</span>
                      </div>
                      <h3 className="font-sans text-sm font-medium text-foreground leading-snug">{item.title}</h3>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {item.tags.map((tag) => (
                          <span key={tag} className="rounded-full border border-foreground/10 bg-foreground/5 px-2 py-0.5 font-mono text-[9px] text-foreground/50">{tag}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                    className={`shrink-0 rounded-lg border px-3 py-1.5 font-mono text-[10px] transition-all ${item.color} border-current opacity-70 hover:opacity-100`}
                  >
                    {expandedId === item.id ? "Скрыть" : "Подробнее"}
                  </button>
                </div>

                {expandedId === item.id && (
                  <div className="mt-4 border-t border-foreground/10 pt-4 space-y-4">
                    {/* Ключевые параметры */}
                    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
                      {[
                        { icon: "Clock", label: "Длительность", value: item.duration },
                        { icon: "Calendar", label: "Дедлайн", value: item.deadline },
                        { icon: "MapPin", label: "Место", value: item.location },
                        { icon: "Banknote", label: "Стипендия", value: item.stipend },
                      ].map((detail) => (
                        <div key={detail.label} className="rounded-lg border border-foreground/10 bg-foreground/5 p-2">
                          <div className="mb-0.5 flex items-center gap-1">
                            <Icon name={detail.icon as "Clock"} fallback="Circle" size={10} className="text-foreground/40" />
                            <span className="font-mono text-[9px] text-foreground/40">{detail.label}</span>
                          </div>
                          <div className="font-sans text-xs font-medium text-foreground">{detail.value}</div>
                        </div>
                      ))}
                    </div>
                    {/* О стажировке */}
                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/40">О стажировке</p>
                      <p className="font-sans text-xs leading-relaxed text-foreground/65">{item.about}</p>
                    </div>
                    {/* Требования */}
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-foreground/40">Требования</p>
                      <ul className="space-y-1">
                        {item.requirements.map((req, ri) => (
                          <li key={ri} className="flex items-start gap-2">
                            <Icon name="ChevronRight" size={10} className={`mt-0.5 shrink-0 ${item.color}`} />
                            <span className="font-sans text-xs text-foreground/60">{req}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    {/* Результат */}
                    <div className="rounded-lg border border-foreground/10 bg-foreground/5 p-3">
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/40">По итогам</p>
                      <p className="font-sans text-xs leading-relaxed text-foreground/70">{item.result}</p>
                    </div>
                    <button
                      onClick={() => setApplyItem(item)}
                      className={`w-full rounded-xl py-2.5 font-sans text-xs font-medium text-white transition-all hover:opacity-90 active:scale-[0.98] bg-blue-500 shadow-lg shadow-blue-500/20`}
                    >
                      Подать заявку
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* Учебные заведения */}
        {tab === "universities" && (
          <div className="space-y-3 pb-4">
            {universities.map((uni, i) => (
              <div
                key={uni.id}
                className={`rounded-xl border bg-foreground/5 p-4 backdrop-blur-sm transition-all duration-500 ${uni.border} ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}
                style={{ transitionDelay: `${150 + i * 80}ms` }}
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-foreground/10 ${uni.color}`}>
                      <Icon name={uni.icon as "GraduationCap"} fallback="Circle" size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5">
                        <span className={`font-sans text-sm font-semibold ${uni.color}`}>{uni.short}</span>
                        <span className="font-mono text-[10px] text-foreground/40">{uni.city}</span>
                      </div>
                      <p className="font-sans text-xs text-foreground/60">{uni.faculty}</p>
                      <div className="mt-1.5 flex flex-wrap gap-1">
                        {uni.programs.map((prog) => (
                          <span key={prog} className={`rounded-full border px-2 py-0.5 font-mono text-[9px] ${uni.color} border-current opacity-50`}>{prog}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setExpandedId(expandedId === uni.id + 100 ? null : uni.id + 100)}
                    className={`shrink-0 rounded-lg border px-3 py-1.5 font-mono text-[10px] transition-all ${uni.color} border-current opacity-70 hover:opacity-100`}
                  >
                    {expandedId === uni.id + 100 ? "Скрыть" : "Подробнее"}
                  </button>
                </div>

                {expandedId === uni.id + 100 && (
                  <div className="mt-4 border-t border-foreground/10 pt-4 space-y-4">
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: "Основан", value: uni.founded },
                        { label: "Студентов", value: uni.students },
                        { label: "Проходной балл", value: uni.score },
                      ].map((stat) => (
                        <div key={stat.label} className="rounded-lg border border-foreground/10 bg-foreground/5 p-2 text-center">
                          <div className="font-sans text-xs font-medium text-foreground">{stat.value}</div>
                          <div className="font-mono text-[9px] text-foreground/40">{stat.label}</div>
                        </div>
                      ))}
                    </div>
                    <div>
                      <p className="mb-1 font-mono text-[10px] uppercase tracking-widest text-foreground/40">О вузе</p>
                      <p className="font-sans text-xs leading-relaxed text-foreground/65">{uni.about}</p>
                    </div>
                    <div>
                      <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-foreground/40">Преимущества</p>
                      <ul className="grid grid-cols-2 gap-1.5">
                        {uni.advantages.map((adv, ai) => (
                          <li key={ai} className="flex items-start gap-1.5">
                            <Icon name="Check" size={10} className={`mt-0.5 shrink-0 ${uni.color}`} />
                            <span className="font-sans text-xs text-foreground/60">{adv}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between rounded-lg border border-foreground/10 bg-foreground/5 px-3 py-2">
                      <span className="font-mono text-[10px] text-foreground/50">{uni.budget}</span>
                      <button className={`flex items-center gap-1 font-mono text-[10px] transition-colors ${uni.color} opacity-70 hover:opacity-100`}>
                        <Icon name="ExternalLink" size={10} />
                        {uni.url}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
      </section>
    </>
  )
}