'use client';

import { useState, useEffect, useCallback, use } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import styles from './editor.module.css';

export default function EditorPage({ params }) {
  const { id } = use(params);
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [plantilla, setPlantilla] = useState(null);
  const [datos, setDatos] = useState({});
  const [config, setConfig] = useState({
    siglas: '',
    dependencia: '',
    lugar: '',
  });
  const [previewHtml, setPreviewHtml] = useState('');
  const [guardando, setGuardando] = useState(false);
  const [mensaje, setMensaje] = useState(null);
  const [docGuardado, setDocGuardado] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Estados para Asistente IA
  const [iaModal, setIaModal] = useState({ abierto: false, campoKey: '', campoLabel: '' });
  const [iaPrompt, setIaPrompt] = useState('');
  const [iaGenerando, setIaGenerando] = useState(false);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/login');
    }
  }, [status, router]);

  // Cargar plantilla
  useEffect(() => {
    fetch(`/api/plantillas/${id}`)
      .then(r => r.json())
      .then(data => {
        setPlantilla(data);
        const init = {};
        data.campos?.forEach(c => { init[c.key] = ''; });
        setDatos(init);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  // Vista previa en tiempo real
  const actualizarPreview = useCallback(async (datosActuales, configActual) => {
    try {
      const res = await fetch('/api/documentos/preview', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          ...(session?.apiToken ? { 'Authorization': `Bearer ${session.apiToken}` } : {})
        },
        body: JSON.stringify({
          tipoId: parseInt(id),
          datos: datosActuales,
          config: configActual,
        }),
      });
      const data = await res.json();
      if (data.html) setPreviewHtml(data.html);
    } catch (e) {}
  }, [id, session]);

  // Debounce para preview
  useEffect(() => {
    if (!plantilla) return;
    const timer = setTimeout(() => {
      actualizarPreview(datos, config);
    }, 500);
    return () => clearTimeout(timer);
  }, [datos, config, plantilla, actualizarPreview]);

  // Manejar cambio de campo
  const handleChange = (key, value) => {
    setDatos(prev => ({ ...prev, [key]: value }));
  };

  const handleConfigChange = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  // Guardar documento
  const guardarDocumento = async () => {
    if (!session?.apiToken) return;
    setGuardando(true);
    setMensaje(null);
    try {
      const res = await fetch('/api/documentos', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.apiToken}`
        },
        body: JSON.stringify({
          tipoId: parseInt(id),
          datos,
          config,
        }),
      });
      const data = await res.json();
      if (res.ok) {
        setDocGuardado(data);
        setMensaje({ tipo: 'success', texto: `✅ Documento guardado: ${data.numero}` });
      } else {
        setMensaje({
          tipo: 'error',
          texto: data.errores ? data.errores.join('\n') : data.error,
        });
      }
    } catch (e) {
      setMensaje({ tipo: 'error', texto: 'Error de conexión con el servidor' });
    }
    setGuardando(false);
  };

  // Asistente IA
  const generarConIA = async () => {
    if (!iaPrompt || !session?.apiToken) return;
    setIaGenerando(true);
    
    try {
      const res = await fetch('/api/ia/redactar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${session.apiToken}`
        },
        body: JSON.stringify({
          prompt: iaPrompt,
          contextoCampo: iaModal.campoLabel,
          tipoDocumento: plantilla.nombre
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.texto) {
        // Insertar texto en el campo correspondiente
        handleChange(iaModal.campoKey, data.texto);
        cerrarModalIA();
      } else {
        alert(data.error || 'Error al generar texto con IA');
      }
    } catch (e) {
      alert('Error de conexión con la IA');
    }
    
    setIaGenerando(false);
  };

  const abrirModalIA = (campoKey, campoLabel) => {
    setIaModal({ abierto: true, campoKey, campoLabel });
    setIaPrompt('');
  };

  const cerrarModalIA = () => {
    setIaModal({ abierto: false, campoKey: '', campoLabel: '' });
    setIaPrompt('');
  };

  // Imprimir / Exportar PDF
  const imprimirDocumento = () => {
    const ventana = window.open('', '_blank');
    ventana.document.write(`
      <!DOCTYPE html>
      <html lang="es">
      <head>
        <meta charset="UTF-8">
        <title>${plantilla?.nombre || 'Documento'}</title>
        <style>
          @page { size: A4; margin: 3.5cm 2cm 2cm 3.5cm; }
          body { font-family: Arial, sans-serif; font-size: 12pt; color: #000; line-height: 1.6; }
        </style>
      </head>
      <body>
        ${previewHtml}
        <script>window.onload = function() { window.print(); }</script>
      </body>
      </html>
    `);
    ventana.document.close();
  };

  // Exportar a Word
  const exportarWord = () => {
    const encabezado = "<html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word' xmlns='http://www.w3.org/TR/REC-html40'><head><meta charset='utf-8'><title>DocPol</title></head><body>";
    const pie = "</body></html>";
    const htmlCompleto = encabezado + previewHtml + pie;
    
    const blob = new Blob(['\ufeff', htmlCompleto], {
      type: 'application/msword'
    });
    
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${config.numero || 'DocPol'}_${plantilla.nombre.replace(/ /g, '_')}.doc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>Cargando formulario...</div>
      </div>
    );
  }

  if (!plantilla) {
    return (
      <div className={styles.page}>
        <div className={styles.loading}>
          Plantilla no encontrada. <Link href="/redactar">Volver al catálogo</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      {/* Header */}
      <header className={styles.toolbar}>
        <div className={styles.toolbarLeft}>
          <Link href="/redactar" className={styles.backBtn}>
            ← Volver
          </Link>
          <div>
            <h2 className={styles.docTitle}>{plantilla.nombre}</h2>
            <span className={styles.docBadge}>F{String(plantilla.id).padStart(2, '0')} — {plantilla.categoria}</span>
          </div>
        </div>
        <div className={styles.toolbarRight}>
          <button className="btn btn-secondary btn-sm" onClick={exportarWord}>
            📄 Word
          </button>
          <button className="btn btn-secondary btn-sm" onClick={imprimirDocumento}>
            🖨️ PDF / Imprimir
          </button>
          <button
            className="btn btn-primary btn-sm"
            onClick={guardarDocumento}
            disabled={guardando}
          >
            {guardando ? '⏳ Guardando...' : '💾 Guardar documento'}
          </button>
        </div>
      </header>

      {/* Mensaje de estado */}
      {mensaje && (
        <div className={`${styles.mensaje} ${styles[mensaje.tipo]}`}>
          {mensaje.texto}
        </div>
      )}

      {/* Editor split: formulario | preview */}
      <div className={styles.editor}>
        {/* Panel izquierdo: Formulario */}
        <div className={styles.formPanel}>
          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>⚙️ Configuración del documento</h3>
            <div className={styles.formGrid}>
              <div className="input-group">
                <label>Dependencia policial</label>
                <input
                  className="input"
                  placeholder="Ej: COMISARÍA PNP SAN BORJA"
                  value={config.dependencia}
                  onChange={e => handleConfigChange('dependencia', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Siglas</label>
                <input
                  className="input"
                  placeholder="Ej: COM.PNP-SB"
                  value={config.siglas}
                  onChange={e => handleConfigChange('siglas', e.target.value)}
                />
              </div>
              <div className="input-group">
                <label>Lugar</label>
                <input
                  className="input"
                  placeholder="Ej: Lima"
                  value={config.lugar}
                  onChange={e => handleConfigChange('lugar', e.target.value)}
                />
              </div>
            </div>
          </div>

          <div className={styles.formSection}>
            <h3 className={styles.sectionTitle}>📝 Datos del documento</h3>
            <div className={styles.formFields}>
              {plantilla.campos.map(campo => (
                <div key={campo.key} className="input-group">
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ margin: 0 }}>
                      {campo.label}
                      {campo.required && <span className={styles.required}> *</span>}
                    </label>
                    {campo.type === 'textarea' && (
                      <button 
                        type="button" 
                        className={styles.iaBtn} 
                        onClick={() => abrirModalIA(campo.key, campo.label)}
                      >
                        ✨ Redactar con IA
                      </button>
                    )}
                  </div>

                  {campo.type === 'textarea' ? (
                    <textarea
                      className="textarea"
                      placeholder={campo.placeholder || ''}
                      value={datos[campo.key] || ''}
                      onChange={e => handleChange(campo.key, e.target.value)}
                      rows={4}
                    />
                  ) : campo.type === 'select' ? (
                    <select
                      className="select"
                      value={datos[campo.key] || ''}
                      onChange={e => handleChange(campo.key, e.target.value)}
                    >
                      <option value="">— Seleccionar —</option>
                      {campo.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      className="input"
                      type={campo.type || 'text'}
                      placeholder={campo.placeholder || ''}
                      value={datos[campo.key] || ''}
                      onChange={e => handleChange(campo.key, e.target.value)}
                      min={campo.min}
                      max={campo.max}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Panel derecho: Vista previa */}
        <div className={styles.previewPanel}>
          <div className={styles.previewHeader}>
            <h3>Vista previa del documento</h3>
            <span className="badge badge-neutral">Formato PNP</span>
          </div>
          <div className={styles.previewContent}>
            <div
              className={styles.previewDocument}
              dangerouslySetInnerHTML={{ __html: previewHtml || '<p style="text-align:center;color:#888;">Completa los campos para ver la vista previa</p>' }}
            />
          </div>
        </div>
      </div>

      {/* Modal IA */}
      {iaModal.abierto && (
        <div className={styles.modalOverlay}>
          <div className={styles.modalContent}>
            <h3>✨ Asistente IA DocPol</h3>
            <p>Describe brevemente los hechos para el campo <strong>{iaModal.campoLabel}</strong> y la IA lo redactará en lenguaje técnico y policial.</p>
            
            <textarea
              className="textarea"
              rows={4}
              placeholder="Ej: Intervenimos a un sujeto a las 15:30 que hurtó un celular en la Av. Larco..."
              value={iaPrompt}
              onChange={e => setIaPrompt(e.target.value)}
              disabled={iaGenerando}
              style={{ marginTop: '16px', marginBottom: '16px' }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button 
                className="btn btn-ghost" 
                onClick={cerrarModalIA}
                disabled={iaGenerando}
              >
                Cancelar
              </button>
              <button 
                className="btn btn-primary" 
                onClick={generarConIA}
                disabled={iaGenerando || !iaPrompt}
              >
                {iaGenerando ? '⏳ Redactando...' : '✨ Generar Texto'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
