'use client';

import { useState } from 'react';
import { TIPOS_DOCUMENTO, GRUPOS } from '@/lib/constantes/tipos-documento';
import styles from './page.module.css';

export default function LandingPage() {
  const [filtroGrupo, setFiltroGrupo] = useState('todos');

  const docsFiltrados = filtroGrupo === 'todos'
    ? TIPOS_DOCUMENTO
    : TIPOS_DOCUMENTO.filter(d => d.grupo === filtroGrupo);

  return (
    <>
      {/* ─── Navbar ─── */}
      <nav className="navbar">
        <div className="container navbar-content">
          <div className="logo">
            <div className="logo-icon">D</div>
            <span>Doc<span className="text-gradient">Pol</span></span>
          </div>
          <ul className="nav-links">
            <li><a href="#caracteristicas">Características</a></li>
            <li><a href="#documentos">Documentos</a></li>
            <li><a href="#como-funciona">Cómo funciona</a></li>
            <li><a href="/login" className="btn btn-ghost btn-sm">Ingresar</a></li>
            <li><a href="/registro" className="btn btn-primary btn-sm">Registrarse</a></li>
          </ul>
        </div>
      </nav>

      {/* ─── Hero ─── */}
      <section className={styles.hero}>
        <div className="container">
          <div className={styles.heroContent}>
            <div className={styles.heroBadge}>
              <span className="badge badge-primary">🛡️ Basado en R.D. N°776-2016-DIRGEN/EMG-PNP</span>
            </div>
            <h1 className={styles.heroTitle}>
              Documentos policiales<br />
              <span className="text-gradient">perfectos en minutos</span>
            </h1>
            <p className={styles.heroDesc}>
              Genera actas, oficios, informes y los 69 documentos del Manual de Documentación
              Policial PNP con formato oficial exacto. Sin errores, sin demoras.
            </p>
            <div className={styles.heroActions}>
              <a href="/registro" className="btn btn-primary btn-lg">
                Comenzar gratis
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
              </a>
              <a href="#como-funciona" className="btn btn-secondary btn-lg">
                Ver demostración
              </a>
            </div>
            <div className={styles.heroStats}>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>69</span>
                <span className={styles.heroStatLabel}>Tipos de documento</span>
              </div>
              <div className={styles.heroDivider}></div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>3 min</span>
                <span className={styles.heroStatLabel}>Tiempo promedio</span>
              </div>
              <div className={styles.heroDivider}></div>
              <div className={styles.heroStat}>
                <span className={styles.heroStatValue}>PDF</span>
                <span className={styles.heroStatLabel}>Formato PNP exacto</span>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.heroGlow}></div>
      </section>

      {/* ─── Características ─── */}
      <section id="caracteristicas" className="section">
        <div className="container">
          <div className="text-center mb-lg">
            <h2>¿Por qué <span className="text-gradient">DocPol</span>?</h2>
            <p className="mt-sm">Automatiza lo tedioso, enfócate en lo importante</p>
          </div>
          <div className="grid grid-3">
            {[
              {
                icon: '⚡',
                title: 'Rápido y Preciso',
                desc: 'Formularios inteligentes que guían la redacción. Sin olvidar campos obligatorios ni cometer errores de formato.'
              },
              {
                icon: '📋',
                title: 'Formato PNP Oficial',
                desc: 'Márgenes, tipografía, membrete y numeración exactos según el Manual R.D. N°776-2016. Documentos impecables.'
              },
              {
                icon: '🔢',
                title: 'Numeración Automática',
                desc: 'Correlativo por dependencia y tipo documental. El sistema asigna el número al emitir. Sin duplicados.'
              },
              {
                icon: '📁',
                title: 'Expedientes Digitales',
                desc: 'Agrupa documentos por caso con foliación automática. Exporta el expediente completo en un solo PDF.'
              },
              {
                icon: '🔒',
                title: 'Clasificación Segura',
                desc: 'Control de acceso por clasificación: Común, Confidencial, Reservado y Secreto, conforme al manual.'
              },
              {
                icon: '📄',
                title: 'Exporta PDF y DOCX',
                desc: 'Genera documentos listos para imprimir con formato PNP exacto o en Word editable para ajustes finales.'
              },
            ].map((feat, i) => (
              <div key={i} className="card card-glass">
                <div className={styles.featIcon}>{feat.icon}</div>
                <h4 className="mt-sm">{feat.title}</h4>
                <p className="mt-sm text-sm">{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Cómo funciona ─── */}
      <section id="como-funciona" className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container">
          <div className="text-center mb-lg">
            <h2>Cómo funciona</h2>
            <p className="mt-sm">Tres pasos simples para un documento perfecto</p>
          </div>
          <div className={styles.steps}>
            {[
              { step: '01', title: 'Selecciona', desc: 'Elige el tipo de documento del catálogo de 69 formatos policiales.' },
              { step: '02', title: 'Completa', desc: 'Llena el formulario inteligente con validación en tiempo real.' },
              { step: '03', title: 'Exporta', desc: 'Descarga tu documento en PDF con formato PNP oficial listo para firmar.' },
            ].map((s, i) => (
              <div key={i} className={styles.stepCard}>
                <div className={styles.stepNumber}>{s.step}</div>
                <h4>{s.title}</h4>
                <p className="text-sm">{s.desc}</p>
                {i < 2 && <div className={styles.stepArrow}>→</div>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Catálogo de documentos ─── */}
      <section id="documentos" className="section">
        <div className="container">
          <div className="text-center mb-lg">
            <h2>69 documentos del <span className="text-gradient">Manual PNP</span></h2>
            <p className="mt-sm">Todos los formatos del R.D. N°776-2016, listos para usar</p>
          </div>

          {/* Filtros */}
          <div className={styles.filters}>
            <button
              className={`btn ${filtroGrupo === 'todos' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
              onClick={() => setFiltroGrupo('todos')}
            >
              Todos ({TIPOS_DOCUMENTO.length})
            </button>
            {Object.entries(GRUPOS).map(([key, grupo]) => (
              <button
                key={key}
                className={`btn ${filtroGrupo === key ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                onClick={() => setFiltroGrupo(key)}
              >
                Grupo {key} — {grupo.label} ({TIPOS_DOCUMENTO.filter(d => d.grupo === key).length})
              </button>
            ))}
          </div>

          {/* Grid de documentos */}
          <div className="grid grid-4">
            {docsFiltrados.map(doc => (
              <div key={doc.id} className="card card-interactive">
                <div className="flex flex-between">
                  <span className="badge badge-neutral">F{String(doc.id).padStart(2, '0')}</span>
                  <span
                    className="badge"
                    style={{
                      background: `${GRUPOS[doc.grupo].color}20`,
                      color: GRUPOS[doc.grupo].color
                    }}
                  >
                    Grupo {doc.grupo}
                  </span>
                </div>
                <h5 className="mt-sm" style={{ fontSize: '0.9rem', lineHeight: 1.3 }}>{doc.nombre}</h5>
                <p className="text-xs mt-sm" style={{ color: 'var(--text-tertiary)' }}>{doc.categoria}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── CTA Final ─── */}
      <section className="section" style={{ background: 'var(--bg-secondary)' }}>
        <div className="container text-center">
          <h2>Empieza a documentar <span className="text-gradient">sin errores</span></h2>
          <p className="mt-sm" style={{ maxWidth: '500px', margin: '8px auto 0' }}>
            Regístrate gratis y genera tu primer documento policial en menos de 3 minutos.
          </p>
          <div className="mt-lg">
            <a href="/registro" className="btn btn-primary btn-lg">
              Crear cuenta gratuita
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
            </a>
          </div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer className={styles.footer}>
        <div className="container">
          <div className="flex flex-between" style={{ flexWrap: 'wrap', gap: '24px' }}>
            <div>
              <div className="logo" style={{ fontSize: '1.2rem' }}>
                <div className="logo-icon" style={{ width: '28px', height: '28px', fontSize: '0.9rem' }}>D</div>
                <span>Doc<span className="text-gradient">Pol</span></span>
              </div>
              <p className="text-sm mt-sm" style={{ maxWidth: '300px' }}>
                Sistema de documentación policial basado en el Manual PNP R.D. N°776-2016.
              </p>
            </div>
            <div className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
              © 2026 DocPol. Todos los derechos reservados.
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
