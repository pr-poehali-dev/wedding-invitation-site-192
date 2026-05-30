import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2025-09-06T14:00:00");

const FLOWER_POSITIONS = [
  { top: "3%", left: "2%", size: 80, delay: 0, rotate: -15 },
  { top: "2%", right: "3%", size: 90, delay: 1, rotate: 20 },
  { top: "45%", left: "0%", size: 60, delay: 2, rotate: -25 },
  { bottom: "5%", left: "3%", size: 75, delay: 0.5, rotate: 10 },
  { bottom: "4%", right: "2%", size: 85, delay: 1.5, rotate: -10 },
];

function FlowerSvg({ size = 70, opacity = 0.55 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" fill="none" style={{ opacity }}>
      <ellipse cx="50" cy="25" rx="10" ry="20" fill="#e8b4b8" transform="rotate(0 50 50)" />
      <ellipse cx="50" cy="25" rx="10" ry="20" fill="#e8c5c8" transform="rotate(45 50 50)" />
      <ellipse cx="50" cy="25" rx="10" ry="20" fill="#f0d0d2" transform="rotate(90 50 50)" />
      <ellipse cx="50" cy="25" rx="10" ry="20" fill="#e8b4b8" transform="rotate(135 50 50)" />
      <ellipse cx="50" cy="25" rx="10" ry="20" fill="#e8c5c8" transform="rotate(180 50 50)" />
      <ellipse cx="50" cy="25" rx="10" ry="20" fill="#f0d0d2" transform="rotate(225 50 50)" />
      <ellipse cx="50" cy="25" rx="10" ry="20" fill="#e8b4b8" transform="rotate(270 50 50)" />
      <ellipse cx="50" cy="25" rx="10" ry="20" fill="#e8c5c8" transform="rotate(315 50 50)" />
      <circle cx="50" cy="50" r="12" fill="#f5c4a1" />
      <circle cx="50" cy="50" r="7" fill="#f0e0b0" />
    </svg>
  );
}

function LeafSvg({ size = 50, opacity = 0.4 }: { size?: number; opacity?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 60 60" fill="none" style={{ opacity }}>
      <path d="M30 5 Q50 20 45 40 Q35 55 20 50 Q5 35 15 15 Q20 5 30 5Z" fill="#9aab95" />
      <path d="M30 5 Q25 30 20 50" stroke="#7a9470" strokeWidth="1.5" fill="none" />
    </svg>
  );
}

function useCountdown(targetDate: Date) {
  const calc = () => {
    const now = new Date().getTime();
    const diff = targetDate.getTime() - now;
    if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    return {
      days: Math.floor(diff / (1000 * 60 * 60 * 24)),
      hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((diff % (1000 * 60)) / 1000),
    };
  };
  const [time, setTime] = useState(calc);
  useEffect(() => {
    const t = setInterval(() => setTime(calc()), 1000);
    return () => clearInterval(t);
  }, []);
  return time;
}

const schedule = [
  { time: "14:00", icon: "Heart", title: "Церемония бракосочетания", desc: "Торжественная регистрация в Дворце Бракосочетания" },
  { time: "15:00", icon: "Camera", title: "Фотосессия", desc: "Прогулка и фотографии в парке" },
  { time: "16:30", icon: "UtensilsCrossed", title: "Банкет", desc: "Торжественный ужин в ресторане «Белая роза»" },
  { time: "18:00", icon: "Music", title: "Первый танец", desc: "Вальс молодожёнов и открытие танцпола" },
  { time: "20:00", icon: "Cake", title: "Разрезание торта", desc: "Сладкая церемония и тосты" },
  { time: "22:00", icon: "Sparkles", title: "Фейерверк", desc: "Яркое завершение вечера под открытым небом" },
];

export default function Index() {
  const countdown = useCountdown(WEDDING_DATE);
  const [form, setForm] = useState({ name: "", guests: "1", food: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="floral-bg min-h-screen overflow-x-hidden" style={{ fontFamily: "'Raleway', sans-serif" }}>

      {/* Decorative floating flowers */}
      {FLOWER_POSITIONS.map((pos, i) => (
        <div
          key={i}
          className="fixed pointer-events-none z-0 animate-float"
          style={{ ...pos, animationDelay: `${pos.delay}s` } as React.CSSProperties}
        >
          {i % 2 === 0 ? <FlowerSvg size={pos.size} opacity={0.35} /> : <LeafSvg size={pos.size * 0.7} opacity={0.3} />}
        </div>
      ))}

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20">
        <div className="opacity-0 animate-fade-in" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
          <p className="text-sm tracking-[0.35em] uppercase mb-6" style={{ color: "var(--rose)", fontFamily: "'Raleway', sans-serif", fontWeight: 500 }}>
            Вы приглашены
          </p>
        </div>

        <div className="opacity-0 animate-fade-in-up delay-200" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-none mb-2"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a", letterSpacing: "0.02em" }}
          >
            Алексей
          </h1>
          <div className="flex items-center justify-center gap-4 my-3">
            <div className="h-px w-16 md:w-24" style={{ background: "var(--rose-light)" }} />
            <span style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "2rem", color: "var(--rose)", fontStyle: "italic" }}>&</span>
            <div className="h-px w-16 md:w-24" style={{ background: "var(--rose-light)" }} />
          </div>
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-none"
            style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a", letterSpacing: "0.02em" }}
          >
            Мария
          </h1>
        </div>

        <div className="opacity-0 animate-fade-in-up delay-500 mt-8 mb-10" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
          <p className="text-lg tracking-[0.2em] uppercase" style={{ color: "#8a6e6e", fontWeight: 300, letterSpacing: "0.25em" }}>
            6 сентября 2025
          </p>
        </div>

        {/* Bouquet image */}
        <div className="opacity-0 animate-fade-in delay-700 mb-10" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
          <div className="relative mx-auto w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden"
            style={{ boxShadow: "0 20px 60px rgba(201,132,138,0.25)" }}>
            <img
              src="https://cdn.poehali.dev/projects/0a382ef9-9900-4a75-9879-e32bc4c4bd3a/files/ee4a56bd-b36c-417a-990b-c575852bc991.jpg"
              alt="Цветы"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Countdown */}
        <div className="opacity-0 animate-fade-in-up delay-900" style={{ animationFillMode: "forwards" } as React.CSSProperties}>
          <p className="text-xs tracking-[0.3em] uppercase mb-5" style={{ color: "var(--rose)", fontWeight: 500 }}>До торжества</p>
          <div className="flex gap-4 md:gap-8 justify-center">
            {[
              { v: countdown.days, l: "дней" },
              { v: countdown.hours, l: "часов" },
              { v: countdown.minutes, l: "минут" },
              { v: countdown.seconds, l: "секунд" },
            ].map(({ v, l }) => (
              <div key={l} className="text-center">
                <div
                  className="text-4xl md:text-5xl font-light tabular-nums"
                  style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a", minWidth: "3rem" }}
                >
                  {String(v).padStart(2, "0")}
                </div>
                <div className="text-xs tracking-widest uppercase mt-1" style={{ color: "#b09090", fontWeight: 500 }}>
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-50">
          <span className="text-xs tracking-widest uppercase" style={{ color: "var(--rose)" }}>Листайте</span>
          <Icon name="ChevronDown" size={16} style={{ color: "var(--rose)" }} />
        </div>
      </section>

      {/* Details */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="section-divider mb-16" />
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--rose)", fontWeight: 500 }}>Детали события</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a" }}>
              Когда и где
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: "Calendar", title: "Дата", lines: ["6 сентября 2025", "Суббота"] },
              { icon: "Clock", title: "Время", lines: ["14:00", "Начало церемонии"] },
              { icon: "MapPin", title: "Место", lines: ["Ресторан «Белая роза»", "ул. Садовая, 12"] },
            ].map(({ icon, title, lines }) => (
              <div
                key={title}
                className="group text-center p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "rgba(255,255,255,0.75)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(201,132,138,0.2)",
                  boxShadow: "0 4px 30px rgba(201,132,138,0.08)",
                }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "var(--rose-pale)", border: "1px solid var(--rose-light)" }}
                >
                  <Icon name={icon} size={20} style={{ color: "var(--rose)" }} />
                </div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--rose)", fontWeight: 500 }}>{title}</p>
                {lines.map((l, i) => (
                  <p key={i} className={i === 0 ? "text-xl font-medium" : "text-sm mt-1"}
                    style={{ fontFamily: i === 0 ? "'Cormorant Garamond', serif" : "'Raleway', sans-serif", color: i === 0 ? "#5a3a3a" : "#9a8080", fontWeight: i === 0 ? 500 : 300 }}>
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="relative z-10 py-24 px-6" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="section-divider mb-16" />
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--rose)", fontWeight: 500 }}>Программа</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a" }}>
              Расписание торжества
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-[88px] top-0 bottom-0 w-px" style={{ background: "linear-gradient(to bottom, transparent, var(--rose-light) 10%, var(--rose-light) 90%, transparent)" }} />
            <div className="space-y-8">
              {schedule.map(({ time, icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="text-right w-16 pt-1 flex-shrink-0">
                    <span className="text-sm font-medium" style={{ color: "var(--rose)", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.1rem" }}>{time}</span>
                  </div>
                  <div
                    className="relative z-10 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 transition-all duration-300 group-hover:scale-110"
                    style={{ background: "var(--rose-pale)", border: "2px solid var(--rose-light)" }}
                  >
                    <Icon name={icon} size={14} style={{ color: "var(--rose)" }} />
                  </div>
                  <div className="flex-1 pb-2">
                    <p className="font-medium mb-0.5" style={{ color: "#5a3a3a", fontFamily: "'Cormorant Garamond', serif", fontSize: "1.2rem" }}>{title}</p>
                    <p className="text-sm" style={{ color: "#9a8080", fontWeight: 300 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RSVP Form */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-xl mx-auto">
          <div className="section-divider mb-16" />
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--rose)", fontWeight: 500 }}>Подтверждение</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a" }}>
              Придёте?
            </h2>
            <p className="mt-4 text-sm" style={{ color: "#9a8080", fontWeight: 300 }}>Пожалуйста, подтвердите присутствие до 1 августа 2025</p>
          </div>

          {submitted ? (
            <div
              className="text-center p-12 rounded-2xl"
              style={{ background: "rgba(255,255,255,0.8)", border: "1px solid var(--rose-light)", boxShadow: "0 8px 40px rgba(201,132,138,0.12)" }}
            >
              <div className="text-5xl mb-4">🌸</div>
              <h3 className="text-2xl mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a" }}>Спасибо!</h3>
              <p className="text-sm" style={{ color: "#9a8080", fontWeight: 300 }}>Мы с нетерпением ждём вас на нашем празднике</p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl space-y-5"
              style={{ background: "rgba(255,255,255,0.8)", border: "1px solid var(--rose-light)", boxShadow: "0 8px 40px rgba(201,132,138,0.12)" }}
            >
              <div>
                <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--rose)", fontWeight: 500 }}>Ваше имя</label>
                <input
                  type="text"
                  required
                  placeholder="Имя и фамилия"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "var(--rose-pale)",
                    border: "1px solid var(--rose-light)",
                    color: "#5a3a3a",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--rose)", fontWeight: 500 }}>Количество гостей</label>
                <div className="flex gap-2">
                  {["1", "2", "3", "4+"].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, guests: n })}
                      className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200"
                      style={{
                        background: form.guests === n ? "var(--rose)" : "var(--rose-pale)",
                        color: form.guests === n ? "#fff" : "#9a8080",
                        border: `1px solid ${form.guests === n ? "var(--rose)" : "var(--rose-light)"}`,
                        fontFamily: "'Raleway', sans-serif",
                      }}
                    >
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--rose)", fontWeight: 500 }}>Предпочтения в еде</label>
                <select
                  value={form.food}
                  onChange={e => setForm({ ...form, food: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: "var(--rose-pale)",
                    border: "1px solid var(--rose-light)",
                    color: form.food ? "#5a3a3a" : "#b09090",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                >
                  <option value="">Выберите вариант</option>
                  <option value="standard">Стандартное меню</option>
                  <option value="vegetarian">Вегетарианское меню</option>
                  <option value="vegan">Веганское меню</option>
                  <option value="halal">Халяль</option>
                </select>
              </div>

              <div>
                <label className="block text-xs tracking-[0.2em] uppercase mb-2" style={{ color: "var(--rose)", fontWeight: 500 }}>Пожелания молодожёнам</label>
                <textarea
                  rows={3}
                  placeholder="Ваши тёплые слова..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{
                    background: "var(--rose-pale)",
                    border: "1px solid var(--rose-light)",
                    color: "#5a3a3a",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-sm font-medium tracking-[0.15em] uppercase transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "var(--rose)",
                  color: "#fff",
                  fontFamily: "'Raleway', sans-serif",
                  boxShadow: "0 4px 20px rgba(201,132,138,0.4)",
                }}
              >
                Подтвердить присутствие
              </button>
            </form>
          )}
        </div>
      </section>

      {/* Contacts */}
      <section className="relative z-10 py-24 px-6" style={{ background: "rgba(255,255,255,0.5)" }}>
        <div className="max-w-2xl mx-auto">
          <div className="section-divider mb-16" />
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.3em] uppercase mb-3" style={{ color: "var(--rose)", fontWeight: 500 }}>Контакты</p>
            <h2 className="text-4xl md:text-5xl font-light" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a" }}>
              Остались вопросы?
            </h2>
            <p className="mt-4 text-sm" style={{ color: "#9a8080", fontWeight: 300 }}>Мы всегда рады ответить</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "Phone", name: "Алексей", detail: "+7 (999) 123-45-67", sub: "Жених" },
              { icon: "Phone", name: "Мария", detail: "+7 (999) 765-43-21", sub: "Невеста" },
            ].map(({ icon, name, detail, sub }) => (
              <div
                key={name}
                className="flex items-center gap-5 p-6 rounded-2xl"
                style={{ background: "rgba(255,255,255,0.8)", border: "1px solid var(--rose-light)" }}
              >
                <div
                  className="w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: "var(--rose-pale)", border: "1px solid var(--rose-light)" }}
                >
                  <Icon name={icon} size={18} style={{ color: "var(--rose)" }} />
                </div>
                <div>
                  <p className="font-medium" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a", fontSize: "1.15rem" }}>{name}</p>
                  <p className="text-sm font-medium" style={{ color: "var(--rose)" }}>{detail}</p>
                  <p className="text-xs mt-0.5" style={{ color: "#b09090", fontWeight: 300 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 text-center">
        <div className="section-divider mb-10" />
        <p className="text-3xl font-light mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#5a3a3a", fontStyle: "italic" }}>
          С любовью, Алексей & Мария
        </p>
        <p className="text-xs tracking-[0.3em] uppercase mt-3" style={{ color: "var(--rose)", fontWeight: 400 }}>
          6 · 9 · 2025
        </p>
        <div className="flex justify-center gap-2 mt-6 opacity-50">
          <FlowerSvg size={30} opacity={0.6} />
          <LeafSvg size={24} opacity={0.5} />
          <FlowerSvg size={30} opacity={0.6} />
        </div>
      </footer>
    </div>
  );
}