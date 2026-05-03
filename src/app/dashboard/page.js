'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './dashboard.module.css';

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [metricas, setMetricas] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated' && session?.apiToken) {
      fetch('/api/documentos/metricas', {
        headers: { 'Authorization': `Bearer ${session.apiToken}` }
      })
        .then(r => r.json())
        .then(data => {
          setMetricas(data);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    }
  }, [status, session]);

  if (loading || !metricas) {
    return <div style={{ padding: '100px', textAlign: 'center', color: 'var(--text-secondary)' }}>Cargando métricas...</div>;
  }

  return (
    <div className={styles.page}>
      <nav className="navbar">
        <div className="container navbar-content">
          <Link href="/" className="logo">
            <div className="logo-icon">D</div>
            <span>Doc<span className="text-gradient">Pol</span></span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/dashboard" style={{ color: 'var(--color-primary)' }}>Dashboard</Link></li>
            <li><Link href="/redactar">Redactar</Link></li>
            <li><Link href="/mis-documentos">Mis documentos</Link></li>
            {session?.user && (
              <li style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {session.user.grado} {session.user.nombreCompleto}
                </span>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-ghost btn-sm">
                  Salir
                </button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <main className={styles.main}>
        <div className="container">
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>Panel de <span className="text-gradient">Control</span></h1>
              <p className={styles.subtitle}>Resumen de tu actividad documental</p>
            </div>
            <Link href="/redactar" className="btn btn-primary">
              + Nuevo documento
            </Link>
          </div>

          <div className={styles.statsGrid}>
            <div className={styles.statCard}>
              <div className={styles.statIcon}>📄</div>
              <div className={styles.statInfo}>
                <h3>Total Documentos</h3>
                <p className={styles.statValue}>{metricas.total}</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(34, 197, 94, 0.1)', color: '#22c55e' }}>✅</div>
              <div className={styles.statInfo}>
                <h3>Emitidos</h3>
                <p className={styles.statValue}>{metricas.porEstado.emitido || 0}</p>
              </div>
            </div>
            <div className={styles.statCard}>
              <div className={styles.statIcon} style={{ background: 'rgba(234, 179, 8, 0.1)', color: '#eab308' }}>📝</div>
              <div className={styles.statInfo}>
                <h3>Borradores</h3>
                <p className={styles.statValue}>{metricas.porEstado.borrador || 0}</p>
              </div>
            </div>
          </div>

          <div className={styles.recentSection}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h2>Documentos Recientes</h2>
              <Link href="/mis-documentos" className="btn btn-ghost btn-sm">Ver todos →</Link>
            </div>
            
            {metricas.recientes.length === 0 ? (
              <div className={styles.empty}>
                Aún no has generado documentos.
              </div>
            ) : (
              <div className="table-wrapper">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Número</th>
                      <th>Tipo</th>
                      <th>Categoría</th>
                      <th>Fecha</th>
                      <th>Estado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {metricas.recientes.map(doc => (
                      <tr key={doc.id}>
                        <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{doc.numero}</td>
                        <td>{doc.tipo}</td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>{doc.categoria}</td>
                        <td style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                          {new Date(doc.fecha).toLocaleDateString('es-PE')}
                        </td>
                        <td>
                          <span className="badge" style={{ 
                            background: doc.estado === 'emitido' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(234, 179, 8, 0.1)',
                            color: doc.estado === 'emitido' ? '#22c55e' : '#eab308'
                          }}>
                            {doc.estado}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
