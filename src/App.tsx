import { useState, useEffect, useRef } from "react";

const PROJECTS = [
  {
    id: 1,
    num: "01",
    title: "Control Escolar Institucional",
    desc: "Sistema para la transición total al entorno digital de inscripciones, expedientes y generación de títulos.",
    impact: "↓ 40% en tiempos de respuesta administrativa. 100% expedientes digitalizados.",
    tech: [".NET Core", "C#", "SQL Server"],
    color: "#00c9ff",
    stats: [
      { val: "100%", key: "Digitalización" },
      { val: "–40%", key: "Tiempo inscripción" },
      { val: "<1s", key: "Consultas DB" },
    ],
    steps: [
      "Carga y validación masiva de documentos digitales",
      "Verificación de CURP y datos académicos",
      "Generación automática de expedientes digitales",
      "Reportes académicos en tiempo real",
      "Emisión de Títulos Digitales con folio",
    ],
  },
  {
    id: 2,
    num: "02",
    title: "Trazabilidad de Activos TI",
    desc: "Plataforma de monitoreo de hardware para control exacto del estado y mantenimiento de equipos institucionales.",
    impact: "Control de 200+ equipos con historial completo de mantenimiento.",
    tech: ["PHP", "Laravel", "MariaDB"],
    color: "#e8ff5a",
    stats: [
      { val: "200+", key: "Activos" },
      { val: "100%", key: "Trazabilidad" },
      { val: "QR", key: "Identificación" },
    ],
    steps: [
      "Escaneo de QR / Código de barras por activo",
      "Registro de asignación por área y usuario",
      "Historial de mantenimientos y reparaciones",
      "Alertas automáticas de mantenimiento preventivo",
      "Reportes de inventario para auditorías oficiales",
    ],
  },
  {
    id: 3,
    num: "03",
    title: "Sistema de Nómina Municipal",
    desc: "Motor financiero automatizado para el pago de empleados con integración total a normativas fiscales.",
    impact: "500+ empleados gestionados con 0% de margen de error.",
    tech: ["PHP", "MySQL", "CFDI"],
    color: "#ff5fa0",
    stats: [
      { val: "500+", key: "Empleados" },
      { val: "0%", key: "Margen error" },
      { val: "Auto", key: "Timbrado CFDI" },
    ],
    steps: [
      "Integración con normativas fiscales vigentes",
      "Cálculo automático de deducciones e impuestos",
      "Timbrado automático de CFDI",
      "Auditoría de transparencia gubernamental",
      "Reportes para DeclaraNet y cumplimiento legal",
    ],
  },
];

const SKILLS = [
  {
    icon: "⚙️",
    name: "Full Stack",
    desc: "Sistemas institucionales robustos de extremo a extremo.",
    tags: [".NET Core", "C#", "PHP", "Laravel", "JavaScript", "Java"],
  },
  {
    icon: "🗄️",
    name: "Bases de Datos",
    desc: "Optimización avanzada con tiempos <1s en reportes críticos.",
    tags: ["SQL Server", "MariaDB", "MySQL", "Optimización"],
  },
  {
    icon: "🔧",
    name: "Hardware",
    desc: "Reparación a nivel componente: tarjetas madre, impresoras, servidores.",
    tags: ["Tarjetas madre", "Impresoras", "Servidores", "Ensamble"],
  },
  {
    icon: "🌐",
    name: "Redes & Infraestructura",
    desc: "Redes WAN, seguridad perimetral y despliegue en zonas rurales.",
    tags: ["WAN", "Seguridad", "Conectividad", "Servidores"],
  },
  {
    icon: "🏛️",
    name: "Entornos Gubernamentales",
    desc: "Cumplimiento técnico ante DeclaraNet, SIGA y normativas fiscales.",
    tags: ["DeclaraNet", "SIGA", "SASA", "Transparencia"],
  },
  {
    icon: "📊",
    name: "Gestión TI",
    desc: "Liderazgo técnico en digitalización y reducción de costos.",
    tags: ["Auditoría", "Activos", "Reducción costos", "Estrategia"],
  },
];

const EXPERIENCE = [
  {
    period: "Ago 2025 – Feb 2026",
    role: "Programador Especializado",
    company: "ICATCAM — Instituto de Capacitación para el Trabajo",
    color: "#00c9ff",
    items: [
      "<b>Digitalización Institucional:</b> Sistema de Control Escolar (.NET/C#) — migración digital del 100% de expedientes.",
      "<b>Reducción del 40%</b> en tiempos de inscripción mediante automatización de flujos administrativos.",
      "<b>Inventarios PHP/Laravel/MariaDB:</b> Trazabilidad exacta de 200+ activos tecnológicos.",
      "<b>Optimización DB:</b> Consultas de reportes críticos en menos de 1 segundo.",
    ],
  },
  {
    period: "Nov 2024 – Ago 2025",
    role: "Encargado de Informática y Soporte Técnico Regional",
    company: "IEEA — Instituto Estatal de Educación para Adultos",
    color: "#e8ff5a",
    items: [
      "<b>99% de disponibilidad</b> operativa en Plazas Comunitarias mediante mantenimiento a nivel componente.",
      "<b>Soporte Nivel 3</b> en sistemas SIGA y SASA, garantizando continuidad educativa en la zona.",
      "<b>Infraestructura rural:</b> Despliegue de red en áreas remotas para acceso a plataformas educativas.",
    ],
  },
  {
    period: "Oct 2018 – Sep 2024",
    role: "Coordinador de Tecnologías de la Información",
    company: "H. Ayuntamiento de Hecelchakán",
    color: "#ff5fa0",
    items: [
      "<b>35% de reducción</b> en gasto de hardware mediante taller técnico interno de rehabilitación.",
      "<b>Nómina Municipal:</b> Automatización del pago de 500+ empleados con integración fiscal.",
      "<b>Seguridad perimetral</b> de servidores institucionales y cumplimiento ante DeclaraNet.",
    ],
  },
];

// ── Utility ──────────────────────────────────────────────────────────────────
function useInView(threshold = 0.15) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { threshold }
    );
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── Components ────────────────────────────────────────────────────────────────
function SectionLabel({ children }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00c9ff", fontFamily: "'DM Mono', monospace" }}>
        {children}
      </span>
      <span style={{ flex: 1, height: 1, background: "#1e2d45", maxWidth: 80 }} />
    </div>
  );
}

function Tag({ children, accent }) {
  return (
    <span style={{
      background: accent ? "rgba(0,201,255,0.12)" : "rgba(255,255,255,0.04)",
      border: `1px solid ${accent ? "rgba(0,201,255,0.25)" : "#1e2d45"}`,
      color: accent ? "#00c9ff" : "#6b82a8",
      padding: "0.2rem 0.55rem",
      borderRadius: 3,
      fontSize: "0.65rem",
      textTransform: "uppercase",
      letterSpacing: "0.05em",
      fontFamily: "'DM Mono', monospace",
    }}>
      {children}
    </span>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const fn = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [onClose]);

  return (
    <div
      onClick={onClose}
      style={{
        position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)",
        backdropFilter: "blur(10px)", zIndex: 999,
        display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem",
      }}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          background: "#0f1623",
          border: "1px solid #1e2d45",
          borderRadius: 4,
          width: "100%", maxWidth: 680,
          maxHeight: "80vh", overflowY: "auto",
          animation: "modalIn 0.22s ease",
        }}
      >
        {/* Header */}
        <div style={{ padding: "1.75rem 2rem", borderBottom: "1px solid #1e2d45", display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: "1rem" }}>
          <div>
            <div style={{ fontSize: "0.65rem", color: "#6b82a8", textTransform: "uppercase", letterSpacing: "0.15em", marginBottom: "0.3rem", fontFamily: "'DM Mono', monospace" }}>
              Proyecto {project.num}
            </div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>
              {project.title}
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "none", border: "1px solid #1e2d45", color: "#6b82a8",
              width: 32, height: 32, borderRadius: 3, cursor: "pointer",
              fontSize: "1rem", display: "flex", alignItems: "center", justifyContent: "center",
              flexShrink: 0, transition: "border-color 0.2s, color 0.2s",
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={{ padding: "2rem" }}>
          {/* Stats */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#1e2d45", border: "1px solid #1e2d45", marginBottom: "1.75rem" }}>
            {project.stats.map((s, i) => (
              <div key={i} style={{ background: "#090d14", padding: "1.1rem", textAlign: "center" }}>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.15rem", color: project.color }}>{s.val}</div>
                <div style={{ fontSize: "0.65rem", color: "#6b82a8", textTransform: "uppercase", letterSpacing: "0.08em", marginTop: "0.25rem" }}>{s.key}</div>
              </div>
            ))}
          </div>

          {/* Impact */}
          <div style={{ background: "rgba(232,255,90,0.06)", borderLeft: `2px solid ${project.color}`, padding: "0.75rem 1rem", marginBottom: "1.5rem", fontSize: "0.78rem", color: project.color, lineHeight: 1.6 }}>
            {project.impact}
          </div>

          {/* Steps */}
          <div style={{ fontSize: "0.65rem", color: "#6b82a8", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "0.9rem" }}>Flujo del sistema</div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {project.steps.map((s, i) => (
              <li key={i} style={{ display: "flex", alignItems: "center", gap: "0.9rem", fontSize: "0.8rem", color: "#a0b4cc" }}>
                <span style={{
                  width: 24, height: 24, border: `1px solid ${project.color}`, borderRadius: 3,
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "0.62rem", color: project.color,
                  fontFamily: "'Syne', sans-serif", fontWeight: 700, flexShrink: 0,
                }}>{String(i + 1).padStart(2, "0")}</span>
                {s}
              </li>
            ))}
          </ul>

          {/* Tech */}
          <div style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.tech.map((t) => <Tag key={t}>{t}</Tag>)}
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Typewriter ────────────────────────────────────────────────────────────────
const LINES = [
  { text: "Adrián Guadalupe", color: "#ffffff" },
  { text: "Haas Coox", color: "#e8ff5a" },
];

function TypewriterTitle({ style }) {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (done) return;
    const current = LINES[lineIdx];
    if (charIdx < current.text.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), 55);
      return () => clearTimeout(t);
    }
    if (lineIdx < LINES.length - 1) {
      const t = setTimeout(() => { setLineIdx((l) => l + 1); setCharIdx(0); }, 320);
      return () => clearTimeout(t);
    }
    setDone(true);
  }, [charIdx, lineIdx, done]);

  return (
    <div style={{ ...style, marginBottom: "1.5rem" }}>
      <h1 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2.8rem, 6.5vw, 6rem)", lineHeight: 1.05, letterSpacing: "-0.02em", margin: 0 }}>
        {LINES.map((line, i) => {
          const isCurrentLine = i === lineIdx;
          const isDone = i < lineIdx;
          const displayed = isDone ? line.text : isCurrentLine ? line.text.slice(0, charIdx) : "";
          const showCursor = isCurrentLine && !done;
          return (
            <span key={i} style={{ display: "block", color: line.color, minHeight: "1.1em" }}>
              {displayed}
              {showCursor && (
                <span style={{ display: "inline-block", width: 3, height: "0.85em", background: "#00c9ff", marginLeft: 4, verticalAlign: "middle", animation: "cursorBlink 0.8s step-end infinite" }} />
              )}
            </span>
          );
        })}
      </h1>
      <div style={{
        display: "flex", alignItems: "center", gap: "1rem", marginTop: "1rem",
        opacity: done ? 1 : 0, transform: done ? "translateY(0)" : "translateY(8px)",
        transition: "opacity 0.5s ease, transform 0.5s ease",
      }}>
        <span style={{ display: "block", width: 40, height: 3, background: "#00c9ff", borderRadius: 2 }} />
        <span style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.78rem", color: "#00c9ff", letterSpacing: "0.18em", textTransform: "uppercase" }}>
          Especialista en Tecnologías de la Información
        </span>
      </div>
    </div>
  );
}

// ── Hero ──────────────────────────────────────────────────────────────────────
function Hero() {
  const [loaded, setLoaded] = useState(false);
  useEffect(() => { setTimeout(() => setLoaded(true), 50); }, []);
  const s = (delay) => ({
    opacity: loaded ? 1 : 0,
    transform: loaded ? "translateY(0)" : "translateY(24px)",
    transition: `opacity 0.7s ${delay}s ease, transform 0.7s ${delay}s ease`,
  });

  return (
    <section id="hero" style={{ minHeight: "100vh", display: "flex", alignItems: "center", padding: "0 3rem", position: "relative", overflow: "hidden" }}>
      {/* Glows */}
      <div style={{ position: "absolute", width: 700, height: 700, borderRadius: "50%", background: "radial-gradient(circle, rgba(0,201,255,0.12) 0%, transparent 70%)", top: -100, right: -200, pointerEvents: "none" }} />
      <div style={{ position: "absolute", width: 400, height: 400, borderRadius: "50%", background: "radial-gradient(circle, rgba(232,255,90,0.06) 0%, transparent 70%)", bottom: 100, left: -100, pointerEvents: "none" }} />

      <div style={{ maxWidth: 1100, margin: "0 auto", width: "100%", position: "relative", zIndex: 1, paddingTop: "5rem" }}>
        {/* Badge */}
        <div style={{ ...s(0), display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "rgba(0,201,255,0.1)", border: "1px solid rgba(0,201,255,0.25)", color: "#00c9ff", padding: "0.35rem 1rem", borderRadius: 100, fontSize: "0.68rem", letterSpacing: "0.12em", textTransform: "uppercase", marginBottom: "1.5rem" }}>
          <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#00c9ff", animation: "blink 1.5s ease-in-out infinite" }} />
          Disponible para nuevos proyectos
        </div>

        {/* Title */}
        <TypewriterTitle style={s(0.1)} />

        {/* Sub */}
        <p style={{ ...s(0.2), fontSize: "0.9rem", color: "#6b82a8", maxWidth: 460, lineHeight: 1.8, marginBottom: "2.5rem" }}>
          Especialista TI con <strong style={{ color: "#d6e4ff" }}>+8 años</strong> transformando instituciones gubernamentales mediante desarrollo Full Stack, infraestructura crítica y automatización de procesos.
        </p>

        {/* CTA */}
        <div style={{ ...s(0.3), display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "3.5rem" }}>
          <a href="#projects" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: "#00c9ff", color: "#000", padding: "0.85rem 2rem", borderRadius: 4, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.83rem", letterSpacing: "0.05em", textDecoration: "none", textTransform: "uppercase", transition: "transform 0.2s, box-shadow 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,201,255,0.4)"; }}
            onMouseLeave={e => { e.currentTarget.style.transform = ""; e.currentTarget.style.boxShadow = ""; }}>
            Ver proyectos →
          </a>
          <a href="#contact" style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", border: "1px solid #1e2d45", color: "#d6e4ff", padding: "0.85rem 2rem", borderRadius: 4, fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.83rem", letterSpacing: "0.05em", textDecoration: "none", textTransform: "uppercase", transition: "border-color 0.2s, color 0.2s" }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "#00c9ff"; e.currentTarget.style.color = "#00c9ff"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#1e2d45"; e.currentTarget.style.color = "#d6e4ff"; }}>
            Contactar
          </a>
        </div>

        {/* Stats */}
        <div style={{ ...s(0.4), display: "flex", gap: "3rem", flexWrap: "wrap", paddingTop: "2.5rem", borderTop: "1px solid #1e2d45" }}>
          {[["8+", "Años de exp."], ["500+", "Empleados gestionados"], ["200+", "Activos TI controlados"], ["35%", "Reducción costos HW"]].map(([val, lbl]) => (
            <div key={lbl}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontSize: "2rem", fontWeight: 800, color: "#e8ff5a", lineHeight: 1 }}>{val}</div>
              <div style={{ fontSize: "0.68rem", color: "#6b82a8", textTransform: "uppercase", letterSpacing: "0.1em", marginTop: "0.3rem" }}>{lbl}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Skills ────────────────────────────────────────────────────────────────────
function Skills() {
  const [ref, visible] = useInView();
  return (
    <section id="skills" style={{ padding: "6rem 3rem", background: "#0f1623" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Especialidades</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "3rem", color: "#fff", lineHeight: 1.1 }}>
          Stack técnico
        </h2>
        <div
          ref={ref}
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(290px, 1fr))",
            gap: 1, background: "#1e2d45", border: "1px solid #1e2d45",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {SKILLS.map((sk) => (
            <div
              key={sk.name}
              style={{ background: "#0f1623", padding: "2.2rem", transition: "background 0.2s", cursor: "default", position: "relative", overflow: "hidden" }}
              onMouseEnter={e => { e.currentTarget.style.background = "#161e2e"; e.currentTarget.querySelector(".accent-bar").style.height = "100%"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "#0f1623"; e.currentTarget.querySelector(".accent-bar").style.height = "0"; }}
            >
              <div className="accent-bar" style={{ position: "absolute", top: 0, left: 0, width: 3, height: 0, background: "#00c9ff", transition: "height 0.3s", borderRadius: "0 2px 2px 0" }} />
              <div style={{ fontSize: "1.3rem", marginBottom: "0.8rem" }}>{sk.icon}</div>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "0.95rem", color: "#fff", marginBottom: "0.6rem" }}>{sk.name}</div>
              <div style={{ fontSize: "0.74rem", color: "#6b82a8", lineHeight: 1.7, marginBottom: "1rem" }}>{sk.desc}</div>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {sk.tags.map((t) => <Tag key={t} accent>{t}</Tag>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Experience ────────────────────────────────────────────────────────────────
function Experience() {
  const [ref, visible] = useInView();
  return (
    <section id="experience" style={{ padding: "6rem 3rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Trayectoria</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "3.5rem", color: "#fff", lineHeight: 1.1 }}>
          Experiencia laboral
        </h2>
        <div
          ref={ref}
          style={{
            position: "relative",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {/* Line */}
          <div style={{ position: "absolute", left: 170, top: 0, bottom: 0, width: 1, background: "#1e2d45" }} />

          {EXPERIENCE.map((ex, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "170px 1fr", gap: "0 3rem", marginBottom: "3.5rem", position: "relative" }}>
              {/* Dot */}
              <div style={{ position: "absolute", left: 167, top: 8, width: 7, height: 7, borderRadius: "50%", background: ex.color, boxShadow: `0 0 10px ${ex.color}` }} />
              {/* Date */}
              <div style={{ textAlign: "right", paddingRight: "2.5rem" }}>
                <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.7rem", color: "#6b82a8", lineHeight: 1.7 }}>{ex.period}</div>
              </div>
              {/* Body */}
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: "0.25rem" }}>{ex.role}</div>
                <div style={{ fontSize: "0.72rem", color: ex.color, textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: "1rem" }}>{ex.company}</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  {ex.items.map((item, j) => (
                    <li key={j} style={{ fontSize: "0.77rem", color: "#6b82a8", lineHeight: 1.7, paddingLeft: "1.2rem", position: "relative" }}
                      dangerouslySetInnerHTML={{ __html: `<span style="position:absolute;left:0;color:${ex.color};font-weight:bold">›</span>${item.replace(/<b>/g, '<strong style="color:#d6e4ff">').replace(/<\/b>/g, '</strong>')}` }}
                    />
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Projects ──────────────────────────────────────────────────────────────────
function Projects({ onSelect }) {
  const [ref, visible] = useInView();
  return (
    <section id="projects" style={{ padding: "6rem 3rem", background: "#0f1623" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Portafolio</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "3rem", color: "#fff", lineHeight: 1.1 }}>
          Proyectos destacados
        </h2>
        <div
          ref={ref}
          style={{
            display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: 1, background: "#1e2d45", border: "1px solid #1e2d45",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          {PROJECTS.map((p) => (
            <div
              key={p.id}
              onClick={() => onSelect(p)}
              style={{ background: "#0f1623", padding: "2.2rem", cursor: "pointer", transition: "background 0.2s", position: "relative" }}
              onMouseEnter={e => e.currentTarget.style.background = "#161e2e"}
              onMouseLeave={e => e.currentTarget.style.background = "#0f1623"}
            >
              {/* Number */}
              <div style={{ fontFamily: "'DM Mono', monospace", fontSize: "0.68rem", color: "#6b82a8", letterSpacing: "0.15em", marginBottom: "1.2rem" }}>Proyecto {p.num}</div>

              {/* Color accent line */}
              <div style={{ width: 36, height: 3, background: p.color, borderRadius: 2, marginBottom: "1rem" }} />

              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem", color: "#fff", marginBottom: "0.7rem" }}>{p.title}</div>
              <div style={{ fontSize: "0.74rem", color: "#6b82a8", lineHeight: 1.7, marginBottom: "1rem" }}>{p.desc}</div>

              <div style={{ background: `${p.color}10`, borderLeft: `2px solid ${p.color}`, padding: "0.55rem 0.9rem", fontSize: "0.7rem", color: p.color, lineHeight: 1.5, marginBottom: "1.3rem" }}>
                {p.impact}
              </div>

              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem", marginBottom: "1.5rem" }}>
                {p.tech.map((t) => <Tag key={t}>{t}</Tag>)}
              </div>

              <div style={{ fontSize: "0.72rem", color: p.color, textTransform: "uppercase", letterSpacing: "0.1em" }}>Ver demo →</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ── Contact ───────────────────────────────────────────────────────────────────
function Contact() {
  const [ref, visible] = useInView();
  return (
    <section id="contact" style={{ padding: "6rem 3rem" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>
        <SectionLabel>Contacto</SectionLabel>
        <h2 style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "clamp(2rem, 4vw, 3.2rem)", marginBottom: "3rem", color: "#fff", lineHeight: 1.1 }}>
          Hablemos
        </h2>
        <div
          ref={ref}
          style={{
            display: "grid", gridTemplateColumns: "1fr 1fr", gap: "4rem",
            opacity: visible ? 1 : 0, transform: visible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s ease",
          }}
        >
          <div>
            <div style={{ fontFamily: "'Instrument Serif', serif", fontStyle: "italic", fontSize: "1.9rem", color: "#00c9ff", marginBottom: "1rem", lineHeight: 1.3 }}>
              "Infraestructura que resiste. Código que escala."
            </div>
            <p style={{ fontSize: "0.8rem", color: "#6b82a8", lineHeight: 1.8, marginBottom: "2rem" }}>
              Disponible para posiciones full-time, consultoría o proyectos de desarrollo en entornos gubernamentales, educativos o empresariales. Movilidad regional inmediata con licencia vigente.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
              {["Full Stack", "Laravel / .NET", "SQL", "Infraestructura TI", "Hardware"].map(t => <Tag key={t} accent>{t}</Tag>)}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            {[
              { icon: "📞", label: "Teléfono", val: "996-110-9967", href: "tel:9961109967" },
              { icon: "✉️", label: "Email", val: "10adriangpe89@gmail.com", href: "mailto:10adriangpe89@gmail.com" },
              { icon: "📍", label: "Ubicación", val: "Pomuch, Hecelchakán, Campeche", href: null },
            ].map(({ icon, label, val, href }) => {
              const inner = (
                <>
                  <div style={{ width: 38, height: 38, background: "rgba(0,201,255,0.1)", borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "1rem", flexShrink: 0 }}>{icon}</div>
                  <div>
                    <div style={{ fontSize: "0.65rem", color: "#6b82a8", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "0.2rem" }}>{label}</div>
                    <div style={{ fontSize: "0.83rem", color: "#d6e4ff" }}>{val}</div>
                  </div>
                </>
              );
              const base = { display: "flex", alignItems: "center", gap: "1rem", padding: "1rem 1.2rem", border: "1px solid #1e2d45", borderRadius: 3, textDecoration: "none", transition: "border-color 0.2s", color: "inherit" };
              return href ? (
                <a key={label} href={href} style={base}
                  onMouseEnter={e => e.currentTarget.style.borderColor = "#00c9ff"}
                  onMouseLeave={e => e.currentTarget.style.borderColor = "#1e2d45"}>
                  {inner}
                </a>
              ) : (
                <div key={label} style={base}>{inner}</div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <nav style={{
      position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
      padding: "1.1rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center",
      borderBottom: scrolled ? "1px solid #1e2d45" : "1px solid transparent",
      background: scrolled ? "rgba(9,13,20,0.9)" : "transparent",
      backdropFilter: scrolled ? "blur(16px)" : "none",
      transition: "all 0.3s ease",
    }}>
      <a href="#hero" style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "0.95rem", letterSpacing: "0.15em", color: "#00c9ff", textDecoration: "none", textTransform: "uppercase" }}>
        AH // Dev
      </a>
      <ul style={{ display: "flex", gap: "2.5rem", listStyle: "none" }}>
        {[["#skills", "Habilidades"], ["#experience", "Experiencia"], ["#projects", "Proyectos"], ["#contact", "Contacto"]].map(([href, label]) => (
          <li key={href}>
            <a href={href} style={{ color: "#6b82a8", textDecoration: "none", fontSize: "0.72rem", letterSpacing: "0.1em", textTransform: "uppercase", transition: "color 0.2s", fontFamily: "'DM Mono', monospace" }}
              onMouseEnter={e => e.currentTarget.style.color = "#00c9ff"}
              onMouseLeave={e => e.currentTarget.style.color = "#6b82a8"}>
              {label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState(null);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=DM+Mono:wght@400;500&family=Instrument+Serif:ital@0;1&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }
        html { scroll-behavior: smooth; }

        body {
          background: #090d14;
          color: #d6e4ff;
          font-family: 'DM Mono', monospace;
          overflow-x: hidden;
        }

        /* Grid bg */
        body::after {
          content: '';
          position: fixed; inset: 0;
          background-image:
            linear-gradient(rgba(0,201,255,0.025) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0,201,255,0.025) 1px, transparent 1px);
          background-size: 60px 60px;
          pointer-events: none;
          z-index: 0;
        }

        section, nav, footer { position: relative; z-index: 1; }

        @keyframes blink { 0%,100%{opacity:1} 50%{opacity:.2} }
        @keyframes cursorBlink { 0%,100%{opacity:1} 50%{opacity:0} }
        @keyframes modalIn { from{transform:translateY(16px);opacity:0} to{transform:translateY(0);opacity:1} }

        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #090d14; }
        ::-webkit-scrollbar-thumb { background: #1e2d45; border-radius: 3px; }
      `}</style>

      <Nav />
      <Hero />
      <Skills />
      <Experience />
      <Projects onSelect={setSelected} />
      <Contact />

      <footer style={{ borderTop: "1px solid #1e2d45", padding: "1.75rem 3rem", display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "0.68rem", color: "#6b82a8", position: "relative", zIndex: 1 }}>
        <span>© 2026 Adrián Guadalupe Haas Coox</span>
        <span style={{ color: "#00c9ff" }}>Especialista TI — Campeche, México</span>
      </footer>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </>
  );
}