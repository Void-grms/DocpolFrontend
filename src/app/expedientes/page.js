'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function ExpedientesPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [expedientes, setExpedientes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [modalAbierto, setModalAbierto] = useState(false);
  const [nuevoAsunto, setNuevoAsunto] = useState('');

  useEffect(() => {
    if (status === 'unauthenticated') router.push('/login');
  }, [status, router]);

  const cargar = () => {
    if (!session?.apiToken) return;
    fetch('/api/expedientes', {
      headers: { 'Authorization': `Bearer ${session.apiToken}` }
    })
      .then(r => r.json())
      .then(data => {
        setExpedientes(data.expedientes || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { 
    if (status === 'authenticated') cargar(); 
  }, [status, session]);

  const crearExpediente = async (e) => {
    e.preventDefault();
    if (!nuevoAsunto) return;
    
    await fetch('/api/expedientes', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${session.apiToken}` 
      },
      body: JSON.stringify({ asunto: nuevoAsunto })
    });
    
    setNuevoAsunto('');
    setModalAbierto(false);
    cargar();
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-primary)' }}>
      <nav className="navbar">
        <div className="container navbar-content">
          <Link href="/" className="logo">
            <div className="logo-icon">D</div>
            <span>Doc<span className="text-gradient">Pol</span></span>
          </Link>
          <ul className="nav-links">
            <li><Link href="/dashboard">Dashboard</Link></li>
            <li><Link href="/redactar">Redactar</Link></li>
            <li><Link href="/mis-documentos">Mis documentos</Link></li>
            <li><Link href="/expedientes" style={{ color: 'var(--color-primary)' }}>Expedientes</Link></li>
            {session?.user && (
              <li style={{ marginLeft: '20px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                  {session.user.grado} {session.user.nombreCompleto}
                </span>
                <button onClick={() => signOut({ callbackUrl: '/' })} className="btn btn-ghost btn-sm">Salir</button>
              </li>
            )}
          </ul>
        </div>
      </nav>

      <main style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '2rem' }}>Mis <span className="text-gradient">Expedientes</span></h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>Agrupa documentos en carpetas o casos</p>
            </div>
            <button className="btn btn-primary" onClick={() => setModalAbierto(true)}>
              + Crear Expediente
            </button>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>Cargando expedientes...</p>
          ) : expedientes.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px', background: 'var(--bg-card)', borderRadius: 'var(--radius-lg)' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📁</div>
              <h3>No tienes expedientes creados</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Crea un expediente para agrupar múltiples documentos relacionados a un mismo caso.
              </p>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
              {expedientes.map(exp => (
                <div key={exp.id} style={{ background: 'var(--bg-card)', padding: '20px', borderRadius: 'var(--radius-lg)', border: '1px solid var(--border-color)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '12px' }}>
                    <span className="badge badge-neutral">{exp.numero}</span>
                    <span className="badge" style={{ background: exp.estado === 'abierto' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(107, 114, 128, 0.1)', color: exp.estado === 'abierto' ? '#22c55e' : '#6b7280' }}>
                      {exp.estado}
                    </span>
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px', lineHeight: '1.4' }}>{exp.asunto}</h3>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid var(--border-color)' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                      {exp.cantidadDocumentos} documentos
                    </span>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                      {new Date(exp.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Modal Nuevo Expediente */}
      {modalAbierto && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 100 }}>
          <div style={{ background: 'var(--bg-card)', padding: '24px', borderRadius: 'var(--radius-lg)', width: '100%', maxWidth: '400px', border: '1px solid var(--border-color)' }}>
            <h3 style={{ marginBottom: '16px' }}>Nuevo Expediente</h3>
            <form onSubmit={crearExpediente}>
              <div className="input-group">
                <label>Asunto o Descripción del Caso</label>
                <textarea 
                  className="textarea" 
                  value={nuevoAsunto} 
                  onChange={e => setNuevoAsunto(e.target.value)} 
                  placeholder="Ej: Carpeta Fiscal N° 456-2026 - Robo agravado"
                  required
                  rows={3}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn btn-ghost" onClick={() => setModalAbierto(false)}>Cancelar</button>
                <button type="submit" className="btn btn-primary">Crear</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
