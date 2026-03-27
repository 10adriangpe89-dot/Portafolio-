import React, { useState, useEffect, useRef, ReactNode } from "react";

// ── DEFINICIÓN DE TIPOS (Obligatorio para GitHub Actions) ─────────────────────
interface Stat {
  val: string;
  key: string;
}

interface Project {
  id: number;
  num: string;
  title: string;
  desc: string;
  impact: string;
  tech: string[];
  color: string;
  stats: Stat[];
  steps: string[];
}

interface Skill {
  icon: string;
  name: string;
  desc: string;
  tags: string[];
}

interface ExperienceItem {
  period: string;
  role: string;
  company: string;
  color: string;
  items: string[];
}

// ── DATA REAL DEL CV ─────────────────────────────────────────────────────────
const PROJECTS: Project[] = [
  {
    id: 1,
    num: "01",
    title: "Control Escolar Institucional",
    desc: "Sistema para la transición total al entorno digital de inscripciones, expedientes y títulos.",
    impact: "↓ 40% en tiempos de respuesta administrativa. 100% expedientes digitalizados.",
    tech: [".NET Core", "C#", "SQL Server"],
    color: "#00c9ff",
    stats: [
      { val: "100%", key: "Digitalización" },
      { val: "–40%", key: "Tiempo inscripción" },
      { val: "<1s", key: "Consultas DB" },
    ],
    steps: [
      "Carga y validación masiva de documentos",
      "Verificación de CURP y datos académicos",
      "Generación automática de expedientes digitales",
      "Emisión de Títulos Digitales con folio oficial",
    ],
  },
  {
    id: 2,
    num: "02",
    title: "Trazabilidad de Activos TI",
    desc: "Plataforma de monitoreo de hardware para control exacto del estado de equipos.",
    impact: "Control de 200+ equipos con historial completo de mantenimiento.",
    tech: ["PHP", "Laravel", "MariaDB"],
    color: "#e8ff5a",
    stats: [
      { val: "200+", key: "Activos" },
      { val: "100%", key: "Trazabilidad" },
      { val: "QR", key: "Identificación" },
    ],
    steps: [
      "Escaneo de QR por activo",
      "Registro de asignación por área y usuario",
      "Alertas automáticas de mantenimiento preventivo",
    ],
  },
  {
    id: 3,
    num: "03",
    title: "Sistema de Nómina Municipal",
    desc: "Motor financiero automatizado para el pago de empleados con integración fiscal.",
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
      "Auditoría de transparencia gubernamental",
    ],
  },
];

const SKILLS: Skill[] = [
  {
    icon: "⚙️",
    name: "Full Stack",
    desc: "Sistemas institucionales robustos.",
    tags: [".NET Core", "C#", "PHP", "Laravel"],
  },
  {
    icon: "🔧",
    name: "Hardware",
    desc: "Reparación a nivel componente y electrónica.",
    tags: ["Tarjetas madre", "Servidores", "Ensamble"],
  },
  {
    icon: "🌐",
    name: "Redes & Infraestructura",
    desc: "Seguridad perimetral y despliegue rural.",
    tags: ["WAN", "Seguridad", "Conectividad"],
  },
];

const EXPERIENCE: ExperienceItem[] = [
  {
    period: "Ago 2025 – Feb 2026",
    role: "Programador Especializado",
    company: "ICATCAM",
    color: "#00c9ff",
    items: [
      "Digitalización del 100% de expedientes físicos.",
      "Optimización de DB: Consultas críticas en < 1 segundo.",
    ],
  },
  {
    period: "Nov 2024 – Ago 2025",
    role: "Soporte Técnico Regional",
    company: "IEEA",
    color: "#e8ff5a",
    items: [
      "99% de disponibilidad operativa regional.",
      "Despliegue de red en áreas rurales remotas.",
    ],
  },
  {
    period: "Oct 2018 – Sep 2024",
    role: "Coordinador de TI",
    company: "H. Ayuntamiento de Hecelchakán",
    color: "#ff5fa0",
    items: [
      "35% de ahorro mediante rehabilitación de hardware.",
      "Automatización de Nómina (500+ empleados).",
    ],
  },
];

// ── UTILITY HOOKS ────────────────────────────────────────────────────────────
function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, visible];
}

// ── UI COMPONENTS ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.75rem" }}>
      <span style={{ fontSize: "0.65rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "#00c9ff", fontFamily: "'DM Mono', monospace" }}>
        {children}
      </span>
      <span style={{ flex: 1, height: 1, background: "#1e2d45", maxWidth: 80 }} />
    </div>
  );
}

function Tag({ children, accent }: { children: ReactNode; accent?: boolean }) {
  return (
    <span style={{
      background: accent ? "rgba(0,201,255,0.12)" : "rgba(255,255,255,0.04)",
      border: `1px solid ${accent ? "rgba(0,201,255,0.25)" : "#1e2d45"}`,
      color: accent ? "#00c9ff" : "#6b82a8",
      padding: "0.2rem 0.55rem",
      borderRadius: 3,
      fontSize: "0.65rem",
      textTransform: "uppercase",
      fontFamily: "'DM Mono', monospace",
    }}>
      {children}
    </span>
  );
}

// ── MODAL ─────────────────────────────────────────────────────────────────────
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div onClick={onClose} style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(10px)", zIndex: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem" }}>
      <div onClick={(e) => e.stopPropagation()} style={{ background: "#0f1623", border: "1px solid #1e2d45", borderRadius: 4, width: "100%", maxWidth: 680, maxHeight: "80vh", overflowY: "auto" }}>
        <div style={{ padding: "1.75rem 2rem", borderBottom: "1px solid #1e2d45", display: "flex", justifyContent: "space-between" }}>
          <div>
            <div style={{ fontSize: "0.65rem", color: "#6b82a8", textTransform: "uppercase" }}>Proyecto {project.num}</div>
            <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.3rem", color: "#fff" }}>{project.title}</div>
          </div>
          <button onClick={onClose} style={{ background: "none", border: "1px solid #1e2d45", color: "#6b82a8", width: 32, height: 32, cursor: "pointer" }}>✕</button>
        </div>
        <div style={{ padding: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "#1e2d45", marginBottom: "1.75rem" }}>
            {project.stats.map((s, i) => (
              <div key={i} style={{ background: "#090d14", padding: "1.1rem", textAlign: "center" }}>
                <div style={{ color: project.color, fontWeight: 700 }}>{s.val}</div>
                <div style={{ fontSize: "0.6rem", color: "#6b82a8" }}>{s.key}</div>
              </div>
            ))}
          </div>
          <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.7rem" }}>
            {project.steps.map((s, i) => (
              <li key={i} style={{ fontSize: "0.8rem", color: "#a0b4cc", display: "flex", gap: "1rem" }}>
                <span style={{ color: project.color }}>{String(i + 1).padStart(2, "0")}</span> {s}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// ── TYPEWRITER TITLE ──────────────────────────────────────────────────────────
function TypewriterTitle() {
  const [text, setText] = useState("");
  const fullText = "Adrián Haas Coox";
  
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.slice(0, i));
      i++;
      if (i > fullText.length) clearInterval(timer);
    }, 100);
    return () => clearInterval(timer);
  }, []);

  return (
    <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "clamp(3rem, 8vw, 5.5rem)", fontWeight: 800, lineHeight: 1, marginBottom: "1.5rem" }}>
      {text}<span style={{ color: "#00c9ff", animation: "blink 1s infinite" }}>_</span>
    </h1>
  );
}

// ── MAIN APP ──────────────────────────────────────────────────────────────────
export default function App() {
  const [selected, setSelected] = useState<Project | null>(null);
  const [refSkills, skillsVis] = useInView();
  const [refExp, expVis] = useInView();
  const [refProj, projVis] = useInView();

  return (
    <div style={{ background: "#090d14", color: "#d6e4ff", fontFamily: "'DM Mono', monospace", minHeight: "100vh" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Mono&display=swap');
        html { scroll-behavior: smooth; }
        body::after {
          content: ''; position: fixed; inset: 0;
          background-image: linear-gradient(rgba(0,201,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(0,201,255,0.02) 1px, transparent 1px);
          background-size: 50px 50px; pointer-events: none; z-index: 0;
        }
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0; } }
      `}</style>

      {/* Nav */}
      <nav style={{ position: "fixed", top: 0, width: "100%", padding: "1.2rem 3rem", display: "flex", justifyContent: "space-between", zIndex: 100, background: "rgba(9,13,20,0.8)", backdropFilter: "blur(12px)" }}>
        <span style={{ color: "#00c9ff", fontWeight: 800, letterSpacing: "0.1em" }}>AH // DEV</span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {["skills", "experience", "projects", "contact"].map(h => (
            <a key={h} href={`#${h}`} style={{ color: "#6b82a8", textDecoration: "none", fontSize: "0.65rem", textTransform: "uppercase", letterSpacing: "0.1em" }}>{h}</a>
          ))}
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" style={{ height: "100vh", display: "flex", alignItems: "center", padding: "0 3rem", position: "relative" }}>
        <div style={{ maxWidth: 900, position: "relative", zIndex: 1 }}>
          <div style={{ color: "#00c9ff", fontSize: "0.65rem", letterSpacing: "0.2em", marginBottom: "1rem", textTransform: "uppercase" }}>Especialista TI // +8 Años de Exp.</div>
          <TypewriterTitle />
          <p style={{ maxWidth: 500, color: "#6b82a8", lineHeight: 1.8, fontSize: "0.9rem" }}>
            Transformando infraestructuras críticas mediante desarrollo Full Stack y automatización de procesos gubernamentales.
          </p>
          <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem" }}>
            <a href="#projects" style={{ background: "#00c9ff", color: "#000", padding: "0.8rem 1.8rem", textDecoration: "none", fontWeight: 800, borderRadius: 4, fontSize: "0.75rem" }}>VER PROYECTOS</a>
            <a href="#contact" style={{ border: "1px solid #1e2d45", color: "#fff", padding: "0.8rem 1.8rem", textDecoration: "none", fontWeight: 800, borderRadius: 4, fontSize: "0.75rem" }}>CONTACTO</a>
          </div>
        </div>
      </section>

      {/* Skills */}
      <section id="skills" ref={refSkills} style={{ padding: "6rem 3rem", opacity: skillsVis ? 1 : 0, transition: "1s ease-out", transform: skillsVis ? "none" : "translateY(20px)" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>Especialidades</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {SKILLS.map(s => (
              <div key={s.name} style={{ background: "#0f1623", padding: "2.5rem", border: "1px solid #1e2d45", borderRadius: 4 }}>
                <div style={{ fontSize: "1.8rem", marginBottom: "1rem" }}>{s.icon}</div>
                <div style={{ fontWeight: 800, marginBottom: "0.6rem", color: "#fff" }}>{s.name}</div>
                <p style={{ fontSize: "0.75rem", color: "#6b82a8", lineHeight: 1.7, marginBottom: "1.5rem" }}>{s.desc}</p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
                  {s.tags.map(t => <Tag key={t} accent>{t}</Tag>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" ref={refExp} style={{ padding: "6rem 3rem", opacity: expVis ? 1 : 0, transition: "1s ease-out" }}>
        <div style={{ maxWidth: 800, margin: "0 auto" }}>
          <SectionLabel>Trayectoria</SectionLabel>
          <div style={{ position: "relative", borderLeft: "1px solid #1e2d45", paddingLeft: "2rem", marginLeft: "0.5rem" }}>
            {EXPERIENCE.map((e, idx) => (
              <div key={idx} style={{ marginBottom: "4rem", position: "relative" }}>
                <div style={{ position: "absolute", left: "-2.35rem", top: "0.3rem", width: "10px", height: "10px", borderRadius: "50%", background: e.color, boxShadow: `0 0 10px ${e.color}` }} />
                <div style={{ color: "#6b82a8", fontSize: "0.65rem", marginBottom: "0.5rem", fontFamily: "'DM Mono'" }}>{e.period}</div>
                <div style={{ fontWeight: 800, fontSize: "1.2rem", color: "#fff", marginBottom: "0.3rem" }}>{e.role}</div>
                <div style={{ color: e.color, fontSize: "0.8rem", fontWeight: 700, marginBottom: "1rem" }}>{e.company}</div>
                {e.items.map((item, i) => <div key={i} style={{ fontSize: "0.8rem", color: "#6b82a8", marginBottom: "0.4rem" }}>• {item}</div>)}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" ref={refProj} style={{ padding: "6rem 3rem", opacity: projVis ? 1 : 0, transition: "1s ease-out" }}>
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <SectionLabel>Portafolio</SectionLabel>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))", gap: "1.5rem" }}>
            {PROJECTS.map(p => (
              <div key={p.id} onClick={() => setSelected(p)} style={{ background: "#0f1623", padding: "2.5rem", border: "1px solid #1e2d45", borderRadius: 4, cursor: "pointer", transition: "0.3s" }}>
                <div style={{ color: "#6b82a8", fontSize: "0.65rem", marginBottom: "1rem" }}>PROYECTO {p.num}</div>
                <div style={{ fontWeight: 800, fontSize: "1.1rem", marginBottom: "0.8rem", color: "#fff" }}>{p.title}</div>
                <div style={{ background: `${p.color}15`, color: p.color, padding: "0.6rem", fontSize: "0.7rem", borderRadius: 3, marginBottom: "1.5rem", borderLeft: `2px solid ${p.color}` }}>{p.impact}</div>
                <div style={{ fontSize: "0.7rem", color: p.color, fontWeight: 800 }}>VER DETALLES →</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contact" style={{ padding: "8rem 3rem", textAlign: "center", background: "#0c121d" }}>
        <div style={{ maxWidth: 600, margin: "0 auto" }}>
          <h2 style={{ fontFamily: "'Syne'", fontSize: "2.5rem", fontWeight: 800, marginBottom: "1.5rem" }}>¿Listo para el siguiente paso?</h2>
          <p style={{ color: "#6b82a8", fontSize: "0.9rem", marginBottom: "3rem" }}>Disponible para consultoría técnica, desarrollo Full Stack e infraestructura crítica.</p>
          <div style={{ display: "flex", justifyContent: "center", gap: "2rem", flexWrap: "wrap" }}>
            <a href="mailto:10adriangpe89@gmail.com" style={{ color: "#00c9ff", textDecoration: "none", fontWeight: 800, fontSize: "0.9rem" }}>10adriangpe89@gmail.com</a>
            <span style={{ color: "#fff", fontWeight: 800, fontSize: "0.9rem" }}>996-110-9967</span>
          </div>
        </div>
      </section>

      <footer style={{ padding: "2rem 3rem", borderTop: "1px solid #1e2d45", textAlign: "center", fontSize: "0.6rem", color: "#455a7a", letterSpacing: "0.2em" }}>
        © 2026 ADRIÁN GUADALUPE HAAS COOX // CAMPECHE, MÉXICO
      </footer>

      {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
    </div>
  );
}