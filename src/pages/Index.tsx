import { useState } from "react";

// Pearl bead component
function Pearl({ size = 12, style }: { size?: number; style?: React.CSSProperties }) {
  const r = size / 2;
  const id = `pg-${size}-${Math.round(r * 10)}`;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={style} className="inline-block flex-shrink-0">
      <defs>
        <radialGradient id={id} cx="35%" cy="28%" r="70%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
          <stop offset="35%" stopColor="#f5f0ea" />
          <stop offset="70%" stopColor="#d8cfc8" />
          <stop offset="100%" stopColor="#bdb0a8" />
        </radialGradient>
      </defs>
      <circle cx={r} cy={r} r={r - 0.5} fill={`url(#${id})`} />
      <circle cx={r * 0.6} cy={r * 0.52} r={r * 0.2} fill="white" opacity="0.75" />
    </svg>
  );
}

// Horizontal pearl string
function PearlRow({ count = 12, sizes }: { count?: number; sizes?: number[] }) {
  return (
    <div className="flex items-center" style={{ gap: "2px", filter: "drop-shadow(0 1px 2px rgba(160,145,130,0.3))" }}>
      {Array.from({ length: count }).map((_, i) => {
        const sz = sizes ? sizes[i % sizes.length] : (i % 4 === 0 ? 13 : i % 3 === 0 ? 10 : 11);
        return <Pearl key={i} size={sz} />;
      })}
    </div>
  );
}

// Vertical pearl string
function PearlColumn({ count = 20 }: { count?: number }) {
  return (
    <div className="flex flex-col items-center" style={{ gap: "3px", filter: "drop-shadow(1px 0 2px rgba(160,145,130,0.3))" }}>
      {Array.from({ length: count }).map((_, i) => {
        const sz = i % 5 === 0 ? 13 : i % 3 === 0 ? 10 : 11;
        return <Pearl key={i} size={sz} />;
      })}
    </div>
  );
}

// Phone mockup with silk inside
function PhoneMockup() {
  return (
    <div
      className="relative mx-auto"
      style={{
        width: "220px",
        height: "420px",
        borderRadius: "36px",
        background: "linear-gradient(160deg, #2a2a2a 0%, #1a1a1a 100%)",
        boxShadow: "0 25px 60px rgba(0,0,0,0.35), inset 0 0 0 1.5px #3a3a3a, inset 0 0 0 2.5px #111",
        padding: "10px",
      }}
    >
      {/* Screen */}
      <div
        className="relative w-full h-full rounded-3xl overflow-hidden flex flex-col"
        style={{
          background: "linear-gradient(170deg, #f8f4ef 0%, #ede8e0 30%, #e8e0d5 70%, #ddd5c8 100%)",
        }}
      >
        {/* Silk texture overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `repeating-linear-gradient(105deg, transparent, transparent 3px, rgba(255,255,255,0.07) 3px, rgba(255,255,255,0.07) 6px)`,
            mixBlendMode: "overlay",
          }}
        />
        {/* Pearl chain on silk */}
        <div className="absolute bottom-16 left-4 right-4 flex justify-center opacity-70">
          <PearlRow count={14} sizes={[8, 10, 8, 9, 11, 9, 8, 10, 9, 8, 11, 8, 9, 10]} />
        </div>

        {/* Date big */}
        <div className="flex-1 flex flex-col justify-center px-6 pt-4">
          <div
            className="font-light leading-none mb-4"
            style={{
              fontFamily: "'Cormorant Garamond', serif",
              fontSize: "52px",
              color: "#3a2e26",
              letterSpacing: "-0.02em",
            }}
          >
            <div>20</div>
            <div>09</div>
            <div>25</div>
          </div>
          <p
            className="text-xs tracking-widest uppercase"
            style={{ color: "#8a7a6a", fontFamily: "'Raleway', sans-serif", fontWeight: 400 }}
          >
            ҮЙЛЕНУ ТОЙЫНА
            <br />ШАҚЫРУ
          </p>
        </div>

        {/* Names */}
        <div
          className="text-center pb-8 px-4"
          style={{
            background: "linear-gradient(to top, rgba(240,234,225,0.95) 70%, transparent)",
            paddingTop: "24px",
          }}
        >
          <p
            className="font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: "18px", color: "#2a1e14", letterSpacing: "0.2em" }}
          >
            ТУРАР
          </p>
          <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "22px", color: "#8a7050", fontStyle: "italic" }}>
            &
          </p>
          <p
            className="font-bold tracking-[0.15em] uppercase"
            style={{ fontFamily: "'Raleway', sans-serif", fontSize: "18px", color: "#2a1e14", letterSpacing: "0.2em" }}
          >
            АМИНА
          </p>
        </div>
      </div>
      {/* Notch */}
      <div
        className="absolute top-[18px] left-1/2 -translate-x-1/2"
        style={{ width: "60px", height: "6px", background: "#111", borderRadius: "3px", zIndex: 10 }}
      />
    </div>
  );
}

// Calendar component for September 2025
function Calendar() {
  const days = ["Д", "С", "Ш", "Б", "Ж", "С", "Ж"];
  // Sep 2025: starts Monday (1)
  const dates = [
    [1, 2, 3, 4, 5, 6, 7],
    [8, 9, 10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19, 20, 21],
    [22, 23, 24, 25, 26, 27, 28],
    [29, 30],
  ];
  return (
    <div className="text-center" style={{ fontFamily: "'Raleway', sans-serif" }}>
      <div className="grid grid-cols-7 gap-0 mb-1">
        {days.map(d => (
          <div key={d} className="text-center text-[10px] font-medium py-0.5" style={{ color: "#a09080" }}>{d}</div>
        ))}
      </div>
      {dates.map((week, wi) => (
        <div key={wi} className="grid grid-cols-7 gap-0">
          {Array.from({ length: 7 }).map((_, di) => {
            const day = week[di];
            const isWedding = day === 20;
            return (
              <div
                key={di}
                className="text-center text-[11px] py-[3px]"
                style={{
                  color: isWedding ? "#8a6a40" : day ? "#3a2e26" : "transparent",
                  fontWeight: isWedding ? 700 : 400,
                  background: isWedding ? "rgba(196,168,130,0.2)" : "transparent",
                  borderRadius: isWedding ? "50%" : "0",
                }}
              >
                {day || ""}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
}

// RSVP Form
function RSVPForm() {
  const [form, setForm] = useState({ name: "", guests: "1", message: "" });
  const [submitted, setSubmitted] = useState(false);

  if (submitted) {
    return (
      <div className="text-center py-8">
        <div className="flex justify-center mb-4"><PearlRow count={9} /></div>
        <p style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: "1.5rem", color: "#3a2e26" }}>
          Рахмет! Сізді күтеміз
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={e => { e.preventDefault(); setSubmitted(true); }} className="space-y-4">
      <div>
        <label className="block text-xs tracking-[0.2em] uppercase mb-1.5" style={{ color: "#9a8878", fontFamily: "'Raleway', sans-serif" }}>
          Аты-жөніңіз
        </label>
        <input
          required
          type="text"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          placeholder="Аты-жөніңіз"
          className="w-full px-4 py-2.5 text-sm outline-none rounded-lg"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(196,180,160,0.5)", color: "#3a2e26", fontFamily: "'Raleway', sans-serif" }}
        />
      </div>
      <div>
        <label className="block text-xs tracking-[0.2em] uppercase mb-1.5" style={{ color: "#9a8878", fontFamily: "'Raleway', sans-serif" }}>
          Адам саны
        </label>
        <div className="flex gap-2">
          {["1", "2", "3", "4+"].map(n => (
            <button
              key={n} type="button"
              onClick={() => setForm({ ...form, guests: n })}
              className="flex-1 py-2.5 text-sm rounded-lg transition-all"
              style={{
                background: form.guests === n ? "linear-gradient(135deg, #d4ccc4, #e8ddd4)" : "rgba(255,255,255,0.6)",
                color: "#3a2e26",
                border: `1px solid ${form.guests === n ? "rgba(180,165,145,0.8)" : "rgba(196,180,160,0.4)"}`,
                fontWeight: form.guests === n ? 600 : 400,
                fontFamily: "'Raleway', sans-serif",
              }}
            >
              {n}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-xs tracking-[0.2em] uppercase mb-1.5" style={{ color: "#9a8878", fontFamily: "'Raleway', sans-serif" }}>
          Тілек
        </label>
        <textarea
          rows={2}
          value={form.message}
          onChange={e => setForm({ ...form, message: e.target.value })}
          placeholder="Тілектеріңізді жазыңыз..."
          className="w-full px-4 py-2.5 text-sm outline-none rounded-lg resize-none"
          style={{ background: "rgba(255,255,255,0.7)", border: "1px solid rgba(196,180,160,0.5)", color: "#3a2e26", fontFamily: "'Raleway', sans-serif" }}
        />
      </div>
      <button
        type="submit"
        className="w-full py-3 text-sm rounded-lg tracking-[0.15em] uppercase transition-all hover:-translate-y-0.5"
        style={{
          background: "linear-gradient(135deg, #c4b090 0%, #d4c4a0 50%, #c8b488 100%)",
          color: "#fff",
          fontFamily: "'Raleway', sans-serif",
          fontWeight: 500,
          boxShadow: "0 3px 15px rgba(180,155,110,0.35)",
          letterSpacing: "0.1em",
        }}
      >
        Растау
      </button>
    </form>
  );
}

export default function Index() {
  return (
    <div
      className="min-h-screen"
      style={{
        background: "linear-gradient(160deg, #faf7f2 0%, #f5f0e8 40%, #ede8e0 100%)",
        fontFamily: "'Raleway', sans-serif",
      }}
    >
      {/* ── MAIN TWO-COLUMN LAYOUT ── */}
      <div className="flex min-h-screen">

        {/* LEFT COLUMN */}
        <div
          className="flex flex-col items-center justify-start pt-10 pb-10 px-6 flex-shrink-0"
          style={{ width: "min(55%, 300px)", minWidth: "260px" }}
        >
          {/* Title */}
          <div className="text-center mb-8">
            <p
              className="text-4xl font-bold tracking-widest uppercase mb-0"
              style={{ fontFamily: "'Cormorant Garamond', serif", color: "#2a1e14", fontSize: "2.2rem", letterSpacing: "0.1em" }}
            >
              САЙТ
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "2.6rem",
                color: "#8a6a40",
                fontStyle: "italic",
                lineHeight: 1.1,
                fontWeight: 400,
              }}
            >
              Шақыру
            </p>
          </div>

          {/* Phone mockup */}
          <PhoneMockup />

          {/* Invitation poem */}
          <div className="mt-8 text-center px-2">
            <p
              className="text-xs leading-relaxed uppercase"
              style={{ color: "#7a6a58", fontFamily: "'Raleway', sans-serif", fontWeight: 500, letterSpacing: "0.05em", fontSize: "10px" }}
            >
              БҮГІН ТАҒЫ АТА-ДӘСТҮР ЖАЛҒАСТЫ,<br />
              БАСТАМАҚШЫ КҮТТІ ҚАЛАМ АЛҒАШҚЫ,<br />
              ҚОЛ ҰСТАСЫП ОТАУ ТІККЕН ҚОС БОТАМ,<br />
              КӨПШІЛІКТІ АҚ БАТАСЫН АЛМАҚШЫ
            </p>
            <div className="mt-5">
              <p
                className="text-xs leading-relaxed"
                style={{ color: "#9a8a78", fontFamily: "'Cormorant Garamond', serif", fontStyle: "italic", fontSize: "11px" }}
              >
                Қымметті ағайын-туыстар, шешелер, ата-ауздар,<br />
                аға-білімдер, бауыр-дәрігерлер,<br />
                барды-бурдостар, дос-дорлардар<br />
                және зерттілер!
              </p>
            </div>
            <div className="mt-4">
              <p
                className="text-xs font-medium uppercase tracking-wide"
                style={{ color: "#7a6a58", fontFamily: "'Raleway', sans-serif", fontSize: "9px" }}
              >
                СЕНДЕРДІ БАЛАЛАРЫМЫЗ<br />
                ТУРАР МЕН АМИНАНЫҢ ҮЙЛЕНУІНЕ
              </p>
            </div>
          </div>
        </div>

        {/* VERTICAL PEARL DIVIDER */}
        <div className="flex flex-col items-center justify-center py-8 flex-shrink-0" style={{ width: "28px" }}>
          <PearlColumn count={36} />
        </div>

        {/* RIGHT COLUMN */}
        <div className="flex-1 flex flex-col pt-8 pb-10 px-5 overflow-y-auto" style={{ minWidth: 0 }}>

          {/* Owner names */}
          <div className="text-right mb-8">
            <p className="text-[10px] tracking-[0.2em] uppercase mb-1" style={{ color: "#9a8878" }}>
              ҚҰРМЕТПЕН, ТОЙ ИЕЛЕРІ:
            </p>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.25rem",
                color: "#3a2e26",
                fontStyle: "italic",
              }}
            >
              Әнбек · Қарашаш
            </p>
          </div>

          {/* Section: Date */}
          <div className="mb-6">
            <h2
              className="font-bold uppercase mb-2"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem", color: "#2a1e14", letterSpacing: "0.08em" }}
            >
              ТОЙ<br />САЛТАНАТЫ:
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.3rem",
                color: "#8a6a40",
                fontStyle: "italic",
              }}
            >
              Қыркүйек, 2025
            </p>
            <div className="mt-3">
              <Calendar />
            </div>
            <p
              className="mt-3 text-xs font-medium tracking-wide uppercase"
              style={{ color: "#3a2e26", fontFamily: "'Raleway', sans-serif", fontSize: "11px" }}
            >
              БАСТАЛУЫ 18:00 - ДЕ
            </p>
          </div>

          {/* Pearl row divider */}
          <div className="my-3 flex">
            <PearlRow count={8} sizes={[9, 12, 9, 11, 9, 12, 9, 11]} />
          </div>

          {/* Section: Schedule */}
          <div className="mb-6">
            <h2
              className="font-bold uppercase mb-4"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem", color: "#2a1e14", letterSpacing: "0.08em" }}
            >
              ТОЙ<br />БАҒДАРЛАМАСЫ:
            </h2>

            {/* Timeline */}
            <div className="relative">
              {/* Vertical line */}
              <div
                className="absolute left-[60px] top-2 bottom-2 w-[1px]"
                style={{ background: "linear-gradient(to bottom, transparent, #d4c4a8 15%, #d4c4a8 85%, transparent)" }}
              />

              {[
                { time: "17:30", label: "ФУРШЕТ" },
                { time: "18:00", label: "ТОЙДЫҢ БАСТАЛУЫ" },
                { time: "18:30", label: "ЕРТАҢАР РӘСІМІ" },
              ].map(({ time, label }, i) => (
                <div key={i} className="flex items-start mb-4 gap-3">
                  <div
                    className="text-right flex-shrink-0"
                    style={{ width: "52px", fontFamily: "'Cormorant Garamond', serif", color: "#8a6a40", fontSize: "0.95rem", fontWeight: 600, paddingTop: "1px" }}
                  >
                    {time}
                  </div>
                  {/* Pearl node */}
                  <div className="relative z-10 flex-shrink-0 mt-1">
                    <Pearl size={10} />
                  </div>
                  <div
                    className="text-xs font-semibold uppercase"
                    style={{ color: "#3a2e26", fontFamily: "'Raleway', sans-serif", fontSize: "10px", letterSpacing: "0.05em", paddingTop: "1px" }}
                  >
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pearl row divider */}
          <div className="my-2 flex">
            <PearlRow count={10} sizes={[8, 11, 9, 12, 9, 11, 8, 12, 9, 10]} />
          </div>

          {/* Section: Venue */}
          <div className="mb-6">
            <h2
              className="font-bold uppercase mb-3"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.85rem", color: "#2a1e14", letterSpacing: "0.08em" }}
            >
              МЕКЕН-ЖАЙЫМЫЗ:
            </h2>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1.6rem",
                color: "#8a6a40",
                fontStyle: "italic",
                lineHeight: 1.2,
              }}
            >
              «White Hills»
            </p>
            <p
              className="mt-2 text-xs uppercase"
              style={{ color: "#7a6a58", fontFamily: "'Raleway', sans-serif", fontSize: "9.5px", letterSpacing: "0.05em" }}
            >
              ТОЙХАНАСЫ,<br />
              КЕНЕС НОКИН КӨШЕСІ, 44 Д<br />
              АҚТӨБЕ ҚАЛАСЫ
            </p>
            {/* Map button */}
            <button
              className="mt-3 px-5 py-2 text-[10px] rounded-full tracking-widest uppercase transition-all hover:opacity-80"
              style={{
                background: "linear-gradient(135deg, #3a3028, #2a2018)",
                color: "#e8dcc8",
                fontFamily: "'Raleway', sans-serif",
                letterSpacing: "0.12em",
                border: "none",
              }}
            >
              КАРТАНЫ<br />АШУ
            </button>
          </div>

          {/* RSVP */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #d4c4a8)" }} />
              <Pearl size={10} />
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #d4c4a8)" }} />
            </div>
            <h2
              className="font-bold uppercase mb-4 text-center"
              style={{ fontFamily: "'Raleway', sans-serif", fontSize: "0.8rem", color: "#2a1e14", letterSpacing: "0.1em" }}
            >
              ҚАТЫСУДЫ РАСТАҢЫЗ
            </h2>
            <RSVPForm />
          </div>

          {/* Instagram */}
          <div className="text-center mt-4">
            <div className="flex items-center justify-center gap-2 mb-2">
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to right, transparent, #d4c4a8)" }} />
              <PearlRow count={3} sizes={[8, 11, 8]} />
              <div className="flex-1 h-px" style={{ background: "linear-gradient(to left, transparent, #d4c4a8)" }} />
            </div>
            <p
              style={{
                fontFamily: "'Cormorant Garamond', serif",
                fontSize: "1rem",
                color: "#8a7a68",
                fontStyle: "italic",
              }}
            >
              @an_kngdm
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
