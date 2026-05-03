'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from '../login/auth.module.css';

export default function RegistroPage() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    nombreCompleto: '',
    grado: '',
    cargo: '',
    cip: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('http://localhost:4000/api/auth/registro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || 'Ocurrió un error al registrarse');
        setLoading(false);
        return;
      }

      // Si el registro fue exitoso, iniciar sesión automáticamente
      const loginRes = await signIn('credentials', {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (!loginRes?.error) {
        router.push('/mis-documentos');
      } else {
        setError('Registro exitoso, pero falló el inicio de sesión automático. Ve a login.');
        setLoading(false);
      }
    } catch (err) {
      setError('Error de conexión con el servidor');
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card} style={{ maxWidth: '500px' }}>
        <div className={styles.header}>
          <div className="logo-icon" style={{ margin: '0 auto 16px', fontSize: '2rem', width: '56px', height: '56px' }}>D</div>
          <h2>Registro de <span className="text-gradient">Personal PNP</span></h2>
          <p>Crea tu cuenta para usar DocPol</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="input-group">
            <label>Correo electrónico (oficial o personal)</label>
            <input type="email" name="email" className="input" value={formData.email} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input type="password" name="password" className="input" value={formData.password} onChange={handleChange} required />
          </div>

          <div className="input-group">
            <label>Nombre completo</label>
            <input type="text" name="nombreCompleto" className="input" value={formData.nombreCompleto} onChange={handleChange} placeholder="Ej: Juan Pérez García" required />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div className="input-group">
              <label>Grado (Opcional)</label>
              <input type="text" name="grado" className="input" value={formData.grado} onChange={handleChange} placeholder="Ej: ST3 PNP" />
            </div>
            <div className="input-group">
              <label>CIP (Opcional)</label>
              <input type="text" name="cip" className="input" value={formData.cip} onChange={handleChange} placeholder="Ej: 123456" />
            </div>
          </div>

          <div className="input-group">
            <label>Cargo / Función (Opcional)</label>
            <input type="text" name="cargo" className="input" value={formData.cargo} onChange={handleChange} placeholder="Ej: Instructor" />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
            {loading ? 'Registrando...' : 'Crear cuenta'}
          </button>
        </form>

        <div className={styles.footer}>
          ¿Ya tienes cuenta? <Link href="/login" className="text-gradient">Inicia sesión</Link>
        </div>
      </div>
    </div>
  );
}
