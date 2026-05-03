'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './redactar.module.css';

export default function RedactarPage() {
  const [plantillas, setPlantillas] = useState([]);
  const [filtroGrupo, setFiltroGrupo] = useState('todos');
  const [busqueda, setBusqueda] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/plantillas')
      .then(r => r.json())
      .then(data => {
        setPlantillas(data.plantillas);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const filtradas = plantillas.filter(p => {
    const matchGrupo = filtroGrupo === 'todos' || p.grupo === filtroGrupo;
    const matchBusqueda = !busqueda || p.nombre.toLowerCase().includes(busqueda.toLowerCase());
    return matchGrupo && matchBusqueda;
  });

  const grupos = {
    A: { label: 'Estructurados', color: '#22c55e' },
    B: { label: 'Semiestructurados', color: '#3b82f6' },
    C: { label: 'Narrativos', color: '#a855f7' },
  };

  return (
    <div className={styles.page}>
      <nav className="navbar">
        <div className="container navbar-content">
          <Link href="/" className="logo">
            <div className="logo-icon">D</div>
            <span>Doc<span className="text-gradient">Pol</span></span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/redactar">Redactar</Link></li>
            <li><Link href="/mis-documentos">Mis documentos</Link></li>
          </ul>
        </div>
      </nav>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <h1>Selecciona un documento para <span className="text-gradient">redactar</span></h1>
            <p>Elige el tipo de documento del catálogo del Manual PNP</p>
          </div>

          {/* Búsqueda y filtros */}
          <div className={styles.controls}>
            <input
              type="text"
              className="input"
              placeholder="Buscar documento..."
              value={busqueda}
              onChange={e => setBusqueda(e.target.value)}
              style={{ maxWidth: '400px' }}
            />
            <div className={styles.filtros}>
              <button
                className={`btn ${filtroGrupo === 'todos' ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                onClick={() => setFiltroGrupo('todos')}
              >
                Todos ({plantillas.length})
              </button>
              {Object.entries(grupos).map(([key, g]) => (
                <button
                  key={key}
                  className={`btn ${filtroGrupo === key ? 'btn-primary' : 'btn-ghost'} btn-sm`}
                  onClick={() => setFiltroGrupo(key)}
                >
                  Grupo {key}
                </button>
              ))}
            </div>
          </div>

          {/* Grid de plantillas */}
          {loading ? (
            <div className={styles.loading}>Cargando plantillas...</div>
          ) : (
            <div className={styles.grid}>
              {filtradas.map(p => (
                <Link key={p.id} href={`/redactar/${p.id}`} className={styles.card}>
                  <div className={styles.cardHeader}>
                    <span className="badge badge-neutral">F{String(p.id).padStart(2, '0')}</span>
                    <span
                      className="badge"
                      style={{
                        background: `${grupos[p.grupo]?.color || '#888'}20`,
                        color: grupos[p.grupo]?.color || '#888',
                      }}
                    >
                      {p.grupo}
                    </span>
                  </div>
                  <h4 className={styles.cardTitle}>{p.nombre}</h4>
                  <p className={styles.cardDesc}>{p.descripcion}</p>
                  <div className={styles.cardFooter}>
                    <span className={styles.cardMeta}>{p.cantidadCampos} campos</span>
                    <span className={styles.cardCategory}>{p.categoria}</span>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {!loading && filtradas.length === 0 && (
            <div className={styles.empty}>
              No se encontraron documentos con ese filtro.
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
