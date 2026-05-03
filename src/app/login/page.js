'use client';

import { useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from './auth.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const res = await signIn('credentials', {
      redirect: false,
      email,
      password,
    });

    setLoading(false);

    if (res?.error) {
      setError('Credenciales inválidas. Por favor intenta nuevamente.');
    } else {
      router.push('/mis-documentos');
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className="logo-icon" style={{ margin: '0 auto 16px', fontSize: '2rem', width: '56px', height: '56px' }}>D</div>
          <h2>Iniciar Sesión en <span className="text-gradient">DocPol</span></h2>
          <p>Accede a tu cuenta institucional</p>
        </div>

        {error && <div className={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <div className="input-group">
            <label>Correo electrónico</label>
            <input
              type="email"
              className="input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ejemplo@docpol.pe"
              required
            />
          </div>

          <div className="input-group">
            <label>Contraseña</label>
            <input
              type="password"
              className="input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              required
            />
          </div>

          <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} disabled={loading}>
            {loading ? 'Iniciando sesión...' : 'Ingresar al sistema'}
          </button>
        </form>

        <div className={styles.footer}>
          ¿No tienes una cuenta? <Link href="/registro" className="text-gradient">Regístrate aquí</Link>
        </div>
      </div>
      
      {/* Demo helper */}
      <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '0.8rem', color: 'var(--text-tertiary)' }}>
        <p>Usuario de prueba:</p>
        <p>Email: <b>demo@docpol.pe</b> | Password: <b>demo1234</b></p>
      </div>
    </div>
  );
}
