'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function MisDocumentosPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [documentos, setDocumentos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  const cargar = () => {
    if (!session?.apiToken) return;
    fetch('/api/documentos', {
      headers: {
        'Authorization': `Bearer ${session.apiToken}`
      }
    })
      .then(r => r.json())
      .then(data => {
        setDocumentos(data.documentos || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  };

  useEffect(() => { 
    if (status === 'authenticated') cargar(); 
  }, [status, session]);

  const eliminar = async (id) => {
    if (!confirm('¿Eliminar este borrador?')) return;
    await fetch(`/api/documentos/${id}`, { 
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${session.apiToken}` }
    });
    cargar();
  };

  const estadoColor = {
    borrador: '#94a3b8',
    emitido: '#22c55e',
    archivado: '#6b7280',
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
            <li><Link href="/redactar">Redactar</Link></li>
            <li><Link href="/mis-documentos" style={{ color: 'var(--color-primary)' }}>Mis documentos</Link></li>
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

      <main style={{ paddingTop: '100px', paddingBottom: '60px' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
            <div>
              <h1 style={{ fontSize: '2rem' }}>Mis <span className="text-gradient">documentos</span></h1>
              <p style={{ color: 'var(--text-secondary)', marginTop: '4px' }}>{documentos.length} documento(s) guardado(s)</p>
            </div>
            <Link href="/redactar" className="btn btn-primary">
              + Nuevo documento
            </Link>
          </div>

          {loading ? (
            <p style={{ textAlign: 'center', padding: '60px', color: 'var(--text-secondary)' }}>Cargando...</p>
          ) : documentos.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '80px 20px' }}>
              <div style={{ fontSize: '3rem', marginBottom: '16px' }}>📄</div>
              <h3>No tienes documentos aún</h3>
              <p style={{ color: 'var(--text-secondary)', marginTop: '8px' }}>
                Empieza redactando tu primer documento policial
              </p>
              <Link href="/redactar" className="btn btn-primary" style={{ marginTop: '24px', display: 'inline-flex' }}>
                Redactar documento
              </Link>
            </div>
          ) : (
            <div className="table-wrapper">
              <table className="table">
                <thead>
                  <tr>
                    <th>Número</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                    <th>Fecha</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {documentos.map(doc => (
                    <tr key={doc.id}>
                      <td style={{ fontWeight: 600, fontSize: '0.85rem' }}>{doc.numero}</td>
                      <td>{doc.tipoNombre}</td>
                      <td>
                        <span
                          className="badge"
                          style={{
                            background: `${estadoColor[doc.estado] || '#888'}20`,
                            color: estadoColor[doc.estado] || '#888',
                          }}
                        >
                          {doc.estado}
                        </span>
                      </td>
                      <td style={{ fontSize: '0.85rem', color: 'var(--text-tertiary)' }}>
                        {new Date(doc.createdAt).toLocaleDateString('es-PE')}
                      </td>
                      <td>
                        <div style={{ display: 'flex', gap: '8px' }}>
                          {doc.estado === 'borrador' && (
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => eliminar(doc.id)}
                            >
                              Eliminar
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
