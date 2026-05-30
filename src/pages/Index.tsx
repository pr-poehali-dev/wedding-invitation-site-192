import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

const WEDDING_DATE = new Date("2025-09-06T14:00:00");

// Pearl bead SVG component
function Pearl({ size = 12, style }: { size?: number; style?: React.CSSProperties }) {
  const r = size / 2;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style}>
      <defs>
        <radialGradient id={`pg-${size}`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
          <stop offset="30%" stopColor="#f5f0ea" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#d8cfc8" stopOpacity="0.85" />
          <stop offset="100%" stopColor="#c4b8b0" stopOpacity="0.9" />
        </radialGradient>
        <radialGradient id={`pg2-${size}`} cx="65%" cy="70%" r="40%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx={r} cy={r} r={r - 0.5} fill={`url(#pg-${size})`} />
      <circle cx={r} cy={r} r={r - 0.5} fill={`url(#pg2-${size})`} />
      <circle cx={r * 0.6} cy={r * 0.55} r={r * 0.22} fill="white" opacity="0.7" />
    </svg>
  );
}

// Decorative pearl string
function PearlString({ count = 11, vertical = false }: { count?: number; vertical?: boolean }) {
  return (
    <div
      className="flex items-center gap-[3px]"
      style={{
        flexDirection: vertical ? "column" : "row",
        filter: "drop-shadow(0 1px 2px rgba(180,165,150,0.35))",
      }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const delay = i * 0.08;
        const sizeVariant = i % 3 === 1 ? 9 : i % 5 === 0 ? 13 : 11;
        return (
          <div
            key={i}
            className="animate-float"
            style={{ animationDelay: `${delay}s`, animationDuration: `${4 + (i % 3)}s` }}
          >
            <Pearl size={sizeVariant} />
          </div>
        );
      })}
    </div>
  );
}

// Silk ribbon divider
function SilkDivider({ wide = false }: { wide?: boolean }) {
  return (
    <div className={`mx-auto my-0 ${wide ? "max-w-2xl" : "max-w-md"}`}>
      <div className="flex items-center gap-3">
        <div
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(to right, transparent, #d4ccc4 40%, #e8ddd4 60%, transparent)",
          }}
        />
        <div className="flex items-center gap-1.5">
          <Pearl size={7} />
          <Pearl size={10} />
          <Pearl size={7} />
        </div>
        <div
          className="flex-1 h-px"
          style={{
            background: "linear-gradient(to left, transparent, #d4ccc4 40%, #e8ddd4 60%, transparent)",
          }}
        />
      </div>
    </div>
  );
}

// Silk fabric background element
function SilkDrape({ className = "" }: { className?: string }) {
  return (
    <div
      className={`absolute pointer-events-none ${className}`}
      style={{
        background: "linear-gradient(135deg, rgba(255,255,255,0.45) 0%, rgba(245,240,234,0.25) 50%, rgba(255,255,255,0.4) 100%)",
        filter: "blur(1px)",
      }}
    />
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
    <div
      className="floral-bg min-h-screen overflow-x-hidden"
      style={{ fontFamily: "'Raleway', sans-serif" }}
    >
      {/* Fixed pearl strings on sides */}
      <div className="fixed left-3 top-1/2 -translate-y-1/2 z-0 hidden lg:flex flex-col items-center gap-1 opacity-50">
        <PearlString count={18} vertical />
      </div>
      <div className="fixed right-3 top-1/2 -translate-y-1/2 z-0 hidden lg:flex flex-col items-center gap-1 opacity-50">
        <PearlString count={18} vertical />
      </div>

      {/* Hero */}
      <section className="relative z-10 min-h-screen flex flex-col items-center justify-center text-center px-6 py-20 overflow-hidden">
        {/* Silk drape backdrop */}
        <SilkDrape className="inset-0 silk-texture opacity-60" />

        {/* Scattered pearls bg */}
        {[
          { top: "8%", left: "8%", size: 8 }, { top: "12%", right: "10%", size: 11 },
          { top: "20%", left: "18%", size: 6 }, { top: "18%", right: "22%", size: 7 },
          { bottom: "15%", left: "12%", size: 9 }, { bottom: "12%", right: "8%", size: 10 },
          { bottom: "20%", left: "28%", size: 6 }, { bottom: "18%", right: "25%", size: 7 },
          { top: "40%", left: "5%", size: 8 }, { top: "35%", right: "6%", size: 9 },
        ].map((p, i) => (
          <div
            key={i}
            className="absolute pointer-events-none animate-float"
            style={{ ...p, animationDelay: `${i * 0.4}s`, animationDuration: `${5 + i % 3}s`, opacity: 0.55 } as React.CSSProperties}
          >
            <Pearl size={p.size} />
          </div>
        ))}

        {/* Top pearl necklace */}
        <div
          className="opacity-0 animate-fade-in mb-8"
          style={{ animationFillMode: "forwards", animationDelay: "0.1s" } as React.CSSProperties}
        >
          <PearlString count={15} />
        </div>

        <div
          className="opacity-0 animate-fade-in"
          style={{ animationFillMode: "forwards", animationDelay: "0.3s" } as React.CSSProperties}
        >
          <p
            className="text-xs tracking-[0.45em] uppercase mb-5"
            style={{ color: "var(--text-soft)", fontWeight: 500, letterSpacing: "0.4em" }}
          >
            Вы приглашены
          </p>
        </div>

        {/* Names with pearl accent */}
        <div
          className="opacity-0 animate-fade-in-up delay-200 relative"
          style={{ animationFillMode: "forwards" } as React.CSSProperties}
        >
          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--text-deep)",
              letterSpacing: "0.03em",
              textShadow: "0 2px 20px rgba(212,204,196,0.6)",
            }}
          >
            Алексей
          </h1>

          <div className="flex items-center justify-center gap-5 my-4">
            {/* Left silk ribbon */}
            <div
              className="h-[1.5px] w-20 md:w-32"
              style={{
                background: "linear-gradient(to right, transparent, var(--gold), var(--pearl-deep))",
              }}
            />
            <div className="flex flex-col items-center gap-1">
              <Pearl size={8} />
              <span
                style={{
                  fontFamily: "'Cormorant Garamond', serif",
                  fontSize: "1.9rem",
                  color: "var(--gold)",
                  fontStyle: "italic",
                  lineHeight: 1,
                }}
              >
                &
              </span>
              <Pearl size={8} />
            </div>
            <div
              className="h-[1.5px] w-20 md:w-32"
              style={{
                background: "linear-gradient(to left, transparent, var(--gold), var(--pearl-deep))",
              }}
            />
          </div>

          <h1
            className="text-6xl md:text-8xl lg:text-9xl font-light leading-none"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              color: "var(--text-deep)",
              letterSpacing: "0.03em",
              textShadow: "0 2px 20px rgba(212,204,196,0.6)",
            }}
          >
            Мария
          </h1>
        </div>

        {/* Date */}
        <div
          className="opacity-0 animate-fade-in-up delay-500 mt-8 mb-8"
          style={{ animationFillMode: "forwards" } as React.CSSProperties}
        >
          <p
            className="text-base tracking-[0.35em] uppercase"
            style={{ color: "var(--text-mid)", fontWeight: 300 }}
          >
            6 сентября 2025
          </p>
        </div>

        {/* Pearl-framed image */}
        <div
          className="opacity-0 animate-fade-in delay-700 mb-10"
          style={{ animationFillMode: "forwards" } as React.CSSProperties}
        >
          <div className="relative mx-auto w-52 h-52 md:w-64 md:h-64">
            {/* Rotating pearl necklace around image */}
            {Array.from({ length: 24 }).map((_, i) => {
              const angle = (i / 24) * 360;
              const rad = (angle * Math.PI) / 180;
              const r = 115;
              const cx = 128;
              const cy = 128;
              const x = cx + r * Math.cos(rad);
              const y = cy + r * Math.sin(rad);
              const sz = i % 3 === 0 ? 9 : i % 4 === 0 ? 11 : 7;
              return (
                <div
                  key={i}
                  className="absolute animate-float"
                  style={{
                    left: `${(x / 256) * 100}%`,
                    top: `${(y / 256) * 100}%`,
                    transform: "translate(-50%, -50%)",
                    animationDelay: `${i * 0.15}s`,
                    animationDuration: `${4 + (i % 4)}s`,
                  }}
                >
                  <Pearl size={sz} />
                </div>
              );
            })}
            {/* Image */}
            <div
              className="absolute inset-6 rounded-full overflow-hidden"
              style={{
                boxShadow: "0 8px 40px rgba(180,165,150,0.4), inset 0 0 0 2px rgba(255,255,255,0.6)",
              }}
            >
              <img
                src="https://cdn.poehali.dev/projects/0a382ef9-9900-4a75-9879-e32bc4c4bd3a/files/ee4a56bd-b36c-417a-990b-c575852bc991.jpg"
                alt="Цветы"
                className="w-full h-full object-cover"
              />
              {/* Silk sheen overlay */}
              <div
                className="absolute inset-0 pearl-shimmer"
                style={{ mixBlendMode: "overlay", opacity: 0.4 }}
              />
            </div>
          </div>
        </div>

        {/* Bottom pearl necklace */}
        <div
          className="opacity-0 animate-fade-in mb-8"
          style={{ animationFillMode: "forwards", animationDelay: "0.8s" } as React.CSSProperties}
        >
          <PearlString count={15} />
        </div>

        {/* Countdown */}
        <div
          className="opacity-0 animate-fade-in-up delay-900"
          style={{ animationFillMode: "forwards" } as React.CSSProperties}
        >
          <p
            className="text-xs tracking-[0.35em] uppercase mb-6"
            style={{ color: "var(--text-soft)", fontWeight: 500 }}
          >
            До торжества
          </p>
          <div className="flex gap-5 md:gap-10 justify-center">
            {[
              { v: countdown.days, l: "дней" },
              { v: countdown.hours, l: "часов" },
              { v: countdown.minutes, l: "минут" },
              { v: countdown.seconds, l: "секунд" },
            ].map(({ v, l }, i) => (
              <div key={l} className="text-center relative">
                {/* Pearl above each number */}
                <div className="flex justify-center mb-1">
                  <Pearl size={i === 1 ? 11 : 8} />
                </div>
                <div
                  className="text-4xl md:text-5xl tabular-nums font-light"
                  style={{
                    fontFamily: "'Cormorant Garamond', serif",
                    color: "var(--text-deep)",
                    minWidth: "3rem",
                    textShadow: "0 1px 8px rgba(180,165,150,0.3)",
                  }}
                >
                  {String(v).padStart(2, "0")}
                </div>
                <div
                  className="text-xs tracking-widest uppercase mt-1"
                  style={{ color: "var(--text-soft)", fontWeight: 400 }}
                >
                  {l}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll hint */}
        <div className="absolute bottom-8 flex flex-col items-center gap-2 opacity-40">
          <Pearl size={7} />
          <Icon name="ChevronDown" size={14} style={{ color: "var(--text-soft)" }} />
        </div>
      </section>

      {/* Details */}
      <section className="relative z-10 py-24 px-6 silk-section">
        <div className="max-w-4xl mx-auto">
          <SilkDivider wide />
          <div className="text-center my-14">
            <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
              Детали события
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-deep)" }}
            >
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
                className="group text-center p-8 rounded-2xl transition-all duration-400 hover:-translate-y-1.5"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.85) 0%, rgba(245,240,234,0.7) 100%)",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(212,204,196,0.5)",
                  boxShadow: "0 4px 30px rgba(180,165,150,0.12), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                {/* Pearl accent on top */}
                <div className="flex justify-center mb-3">
                  <PearlString count={5} />
                </div>
                <div
                  className="w-11 h-11 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{
                    background: "linear-gradient(135deg, #f0ece8, #e8ddd4)",
                    border: "1px solid rgba(212,204,196,0.6)",
                    boxShadow: "0 2px 8px rgba(180,165,150,0.2)",
                  }}
                >
                  <Icon name={icon} size={18} style={{ color: "var(--gold)" }} />
                </div>
                <p className="text-xs tracking-[0.25em] uppercase mb-3" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
                  {title}
                </p>
                {lines.map((l, i) => (
                  <p
                    key={i}
                    style={{
                      fontFamily: i === 0 ? "'Cormorant Garamond', serif" : "'Raleway', sans-serif",
                      color: i === 0 ? "var(--text-deep)" : "var(--text-soft)",
                      fontSize: i === 0 ? "1.2rem" : "0.8rem",
                      fontWeight: i === 0 ? 500 : 300,
                      marginTop: i === 1 ? "4px" : 0,
                    }}
                  >
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>
          <div className="mt-14">
            <SilkDivider wide />
          </div>
        </div>
      </section>

      {/* Schedule */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-14">
            <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
              Программа
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-deep)" }}
            >
              Расписание торжества
            </h2>
          </div>

          <div className="relative">
            {/* Pearl string as timeline */}
            <div className="absolute left-[86px] top-4 bottom-4 flex flex-col items-center gap-[5px] pointer-events-none">
              {Array.from({ length: 30 }).map((_, i) => (
                <Pearl key={i} size={i % 4 === 0 ? 7 : 5} style={{ opacity: 0.5 + (i % 3) * 0.1 }} />
              ))}
            </div>

            <div className="space-y-8">
              {schedule.map(({ time, icon, title, desc }, i) => (
                <div key={i} className="flex items-start gap-6 group">
                  <div className="text-right w-16 pt-2 flex-shrink-0">
                    <span
                      style={{
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: "1.05rem",
                        color: "var(--gold)",
                        fontWeight: 500,
                      }}
                    >
                      {time}
                    </span>
                  </div>
                  {/* Pearl icon node */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <div
                      className="w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                      style={{
                        background: "linear-gradient(135deg, #f5f0ea, #e8ddd4, #f0ece8)",
                        border: "1.5px solid rgba(196,184,176,0.7)",
                        boxShadow: "0 2px 10px rgba(180,165,150,0.25), inset 0 1px 0 rgba(255,255,255,0.8)",
                      }}
                    >
                      <Icon name={icon} size={14} style={{ color: "var(--gold)" }} />
                    </div>
                  </div>
                  <div
                    className="flex-1 p-4 rounded-xl transition-all duration-300 group-hover:-translate-x-0.5"
                    style={{
                      background: "linear-gradient(135deg, rgba(255,255,255,0.7), rgba(245,240,234,0.5))",
                      border: "1px solid rgba(212,204,196,0.35)",
                    }}
                  >
                    <p
                      className="font-medium mb-0.5"
                      style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-deep)", fontSize: "1.15rem" }}
                    >
                      {title}
                    </p>
                    <p className="text-sm" style={{ color: "var(--text-soft)", fontWeight: 300 }}>
                      {desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* RSVP */}
      <section className="relative z-10 py-24 px-6 silk-section overflow-hidden">
        {/* Decorative pearls corners */}
        <div className="absolute top-8 left-8 opacity-40"><PearlString count={7} /></div>
        <div className="absolute top-8 right-8 opacity-40"><PearlString count={7} /></div>
        <div className="absolute bottom-8 left-8 opacity-40"><PearlString count={7} /></div>
        <div className="absolute bottom-8 right-8 opacity-40"><PearlString count={7} /></div>

        <div className="max-w-xl mx-auto relative">
          <SilkDivider wide />
          <div className="text-center my-14">
            <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
              Подтверждение
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-deep)" }}
            >
              Придёте?
            </h2>
            <p className="mt-4 text-sm" style={{ color: "var(--text-soft)", fontWeight: 300 }}>
              Пожалуйста, подтвердите присутствие до 1 августа 2025
            </p>
          </div>

          {submitted ? (
            <div
              className="text-center p-12 rounded-2xl"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.9), rgba(245,240,234,0.8))",
                border: "1px solid rgba(212,204,196,0.5)",
                boxShadow: "0 8px 40px rgba(180,165,150,0.15)",
              }}
            >
              <div className="flex justify-center mb-4">
                <PearlString count={9} />
              </div>
              <h3
                className="text-2xl mb-3"
                style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-deep)" }}
              >
                Спасибо!
              </h3>
              <p className="text-sm" style={{ color: "var(--text-soft)", fontWeight: 300 }}>
                Мы с нетерпением ждём вас на нашем празднике
              </p>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="p-8 md:p-10 rounded-2xl space-y-5"
              style={{
                background: "linear-gradient(145deg, rgba(255,255,255,0.88) 0%, rgba(245,240,234,0.75) 100%)",
                border: "1px solid rgba(212,204,196,0.5)",
                boxShadow: "0 8px 40px rgba(180,165,150,0.15), inset 0 1px 0 rgba(255,255,255,0.9)",
              }}
            >
              {/* Silk texture line */}
              <div
                className="w-full h-[2px] rounded-full mb-6"
                style={{
                  background: "linear-gradient(to right, transparent, var(--pearl-deep), rgba(255,255,255,0.9), var(--pearl-deep), transparent)",
                }}
              />

              <div>
                <label className="block text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
                  Ваше имя
                </label>
                <input
                  type="text"
                  required
                  placeholder="Имя и фамилия"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: "rgba(248,245,240,0.8)",
                    border: "1px solid rgba(212,204,196,0.5)",
                    color: "var(--text-deep)",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                />
              </div>

              <div>
                <label className="block text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
                  Количество гостей
                </label>
                <div className="flex gap-2">
                  {["1", "2", "3", "4+"].map(n => (
                    <button
                      key={n}
                      type="button"
                      onClick={() => setForm({ ...form, guests: n })}
                      className="flex-1 py-3 rounded-xl text-sm font-medium transition-all duration-200 relative overflow-hidden"
                      style={{
                        background: form.guests === n
                          ? "linear-gradient(135deg, var(--pearl-deep), var(--pearl-shine))"
                          : "rgba(248,245,240,0.8)",
                        color: form.guests === n ? "var(--text-deep)" : "var(--text-soft)",
                        border: `1px solid ${form.guests === n ? "rgba(196,184,176,0.8)" : "rgba(212,204,196,0.4)"}`,
                        boxShadow: form.guests === n ? "0 2px 12px rgba(180,165,150,0.25), inset 0 1px 0 rgba(255,255,255,0.6)" : "none",
                        fontFamily: "'Raleway', sans-serif",
                      }}
                    >
                      {form.guests === n && (
                        <span className="absolute top-1 left-1/2 -translate-x-1/2">
                          <Pearl size={5} />
                        </span>
                      )}
                      {n}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
                  Предпочтения в еде
                </label>
                <select
                  value={form.food}
                  onChange={e => setForm({ ...form, food: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none"
                  style={{
                    background: "rgba(248,245,240,0.8)",
                    border: "1px solid rgba(212,204,196,0.5)",
                    color: form.food ? "var(--text-deep)" : "var(--text-soft)",
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
                <label className="block text-xs tracking-[0.25em] uppercase mb-2" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
                  Пожелания молодожёнам
                </label>
                <textarea
                  rows={3}
                  placeholder="Ваши тёплые слова..."
                  value={form.message}
                  onChange={e => setForm({ ...form, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl text-sm outline-none resize-none"
                  style={{
                    background: "rgba(248,245,240,0.8)",
                    border: "1px solid rgba(212,204,196,0.5)",
                    color: "var(--text-deep)",
                    fontFamily: "'Raleway', sans-serif",
                  }}
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-xl text-sm font-medium tracking-[0.2em] uppercase transition-all duration-300 hover:-translate-y-0.5 relative overflow-hidden"
                style={{
                  background: "linear-gradient(135deg, #d4ccc4 0%, #e8ddd4 40%, #f0ece8 60%, #d8cfc8 100%)",
                  color: "var(--text-deep)",
                  fontFamily: "'Raleway', sans-serif",
                  border: "1px solid rgba(196,184,176,0.6)",
                  boxShadow: "0 4px 20px rgba(180,165,150,0.25), inset 0 1px 0 rgba(255,255,255,0.7)",
                }}
              >
                <span className="relative z-10">Подтвердить присутствие</span>
                <div className="absolute inset-0 pearl-shimmer opacity-60" />
              </button>

              <div
                className="w-full h-[2px] rounded-full mt-2"
                style={{
                  background: "linear-gradient(to right, transparent, var(--pearl-deep), rgba(255,255,255,0.9), var(--pearl-deep), transparent)",
                }}
              />
            </form>
          )}
        </div>
      </section>

      {/* Contacts */}
      <section className="relative z-10 py-24 px-6">
        <div className="max-w-2xl mx-auto">
          <SilkDivider wide />
          <div className="text-center my-14">
            <p className="text-xs tracking-[0.35em] uppercase mb-3" style={{ color: "var(--text-soft)", fontWeight: 500 }}>
              Контакты
            </p>
            <h2
              className="text-4xl md:text-5xl font-light"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-deep)" }}
            >
              Остались вопросы?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {[
              { icon: "Phone", name: "Алексей", detail: "+7 (999) 123-45-67", sub: "Жених" },
              { icon: "Phone", name: "Мария", detail: "+7 (999) 765-43-21", sub: "Невеста" },
            ].map(({ icon, name, detail, sub }) => (
              <div
                key={name}
                className="flex items-center gap-5 p-6 rounded-2xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  background: "linear-gradient(145deg, rgba(255,255,255,0.85), rgba(245,240,234,0.7))",
                  border: "1px solid rgba(212,204,196,0.45)",
                  boxShadow: "0 4px 20px rgba(180,165,150,0.1), inset 0 1px 0 rgba(255,255,255,0.8)",
                }}
              >
                <div className="flex flex-col items-center gap-1">
                  <Pearl size={8} />
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #f0ece8, #e8ddd4)",
                      border: "1px solid rgba(212,204,196,0.5)",
                      boxShadow: "0 2px 8px rgba(180,165,150,0.2), inset 0 1px 0 rgba(255,255,255,0.7)",
                    }}
                  >
                    <Icon name={icon} size={18} style={{ color: "var(--gold)" }} />
                  </div>
                  <Pearl size={8} />
                </div>
                <div>
                  <p
                    className="font-medium"
                    style={{ fontFamily: "'Cormorant Garamond', serif", color: "var(--text-deep)", fontSize: "1.2rem" }}
                  >
                    {name}
                  </p>
                  <p className="text-sm font-medium mt-0.5" style={{ color: "var(--gold)" }}>{detail}</p>
                  <p className="text-xs mt-0.5" style={{ color: "var(--text-soft)", fontWeight: 300 }}>{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-16 text-center silk-section">
        <div className="flex justify-center mb-8">
          <PearlString count={21} />
        </div>
        <p
          className="text-3xl font-light mb-2"
          style={{
            fontFamily: "'Cormorant Garamond', serif",
            color: "var(--text-deep)",
            fontStyle: "italic",
            textShadow: "0 1px 8px rgba(180,165,150,0.25)",
          }}
        >
          С любовью, Алексей & Мария
        </p>
        <p
          className="text-xs tracking-[0.4em] uppercase mt-3"
          style={{ color: "var(--text-soft)", fontWeight: 400 }}
        >
          6 · 9 · 2025
        </p>
        <div className="flex justify-center mt-8">
          <PearlString count={11} />
        </div>
      </footer>
    </div>
  );
}
