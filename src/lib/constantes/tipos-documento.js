// Catálogo completo de los 69 tipos documentales del Manual PNP
// Organizados por grupo: A (estructurados), B (semiestructurados), C (narrativos)

export const TIPOS_DOCUMENTO = [
  // ═══ GRUPO A — Documentos Altamente Estructurados ═══
  { id: 1, nombre: 'Acta de Audiencia', grupo: 'A', categoria: 'Acta' },
  { id: 2, nombre: 'Acta de Aislamiento de Persona', grupo: 'A', categoria: 'Acta' },
  { id: 3, nombre: 'Acta de Allanamiento y Registro', grupo: 'A', categoria: 'Acta' },
  { id: 4, nombre: 'Acta de Cadena de Custodia', grupo: 'A', categoria: 'Acta' },
  { id: 5, nombre: 'Acta de Detención', grupo: 'A', categoria: 'Acta' },
  { id: 6, nombre: 'Acta de Entrega y Recepción', grupo: 'A', categoria: 'Acta' },
  { id: 7, nombre: 'Acta de Hallazgo y Recojo', grupo: 'A', categoria: 'Acta' },
  { id: 8, nombre: 'Acta de Incautación', grupo: 'A', categoria: 'Acta' },
  { id: 9, nombre: 'Acta de Información de Derechos (Víctima/Testigo)', grupo: 'A', categoria: 'Acta' },
  { id: 10, nombre: 'Acta de Ingreso, Aislamiento y Traslado del Reconocedor', grupo: 'A', categoria: 'Acta' },
  { id: 11, nombre: 'Acta de Inmovilización', grupo: 'A', categoria: 'Acta' },
  { id: 12, nombre: 'Acta de Intervención Policial', grupo: 'A', categoria: 'Acta' },
  { id: 13, nombre: 'Acta de Lacrado', grupo: 'A', categoria: 'Acta' },
  { id: 14, nombre: 'Acta de Lectura de Derechos del Imputado', grupo: 'A', categoria: 'Acta' },
  { id: 15, nombre: 'Acta de Lectura de Obligaciones del Testigo', grupo: 'A', categoria: 'Acta' },
  { id: 16, nombre: 'Acta de Levantamiento de Cadáver', grupo: 'A', categoria: 'Acta' },
  { id: 17, nombre: 'Acta de Llegada a la Escena del Delito', grupo: 'A', categoria: 'Acta' },
  { id: 18, nombre: 'Acta de Recepción de Persona por Arresto Ciudadano', grupo: 'A', categoria: 'Acta' },
  { id: 19, nombre: 'Acta de Recepción de Denuncia Verbal', grupo: 'A', categoria: 'Acta' },
  { id: 20, nombre: 'Acta de Reconocimiento Físico/Fotográfico', grupo: 'A', categoria: 'Acta' },
  { id: 21, nombre: 'Acta de Registro de Bienes Muebles e Incautación', grupo: 'A', categoria: 'Acta' },
  { id: 22, nombre: 'Acta de Registro de Equipaje e Incautación', grupo: 'A', categoria: 'Acta' },
  { id: 23, nombre: 'Acta de Registro y Verificación Domiciliaria', grupo: 'A', categoria: 'Acta' },
  { id: 24, nombre: 'Acta de Registro Personal e Incautación', grupo: 'A', categoria: 'Acta' },
  { id: 25, nombre: 'Acta de Registro de Vehículo e Incautación', grupo: 'A', categoria: 'Acta' },
  { id: 30, nombre: 'Citación Policial', grupo: 'A', categoria: 'Notificación' },
  { id: 31, nombre: 'Constancia', grupo: 'A', categoria: 'Certificación' },
  { id: 37, nombre: 'Hoja Básica de Requisitoria', grupo: 'A', categoria: 'Identificación' },
  { id: 38, nombre: 'Hoja de Datos de Identificación', grupo: 'A', categoria: 'Identificación' },
  { id: 54, nombre: 'Notificación Policial', grupo: 'A', categoria: 'Notificación' },
  { id: 55, nombre: 'Notificación de Detención', grupo: 'A', categoria: 'Notificación' },
  { id: 65, nombre: 'Pase', grupo: 'A', categoria: 'Trámite' },
  { id: 66, nombre: 'Planilla de Rendición de Cuenta', grupo: 'A', categoria: 'Administrativo' },
  { id: 68, nombre: 'Solicitud', grupo: 'A', categoria: 'Administrativo' },
  { id: 69, nombre: 'Solicitud de Acceso a la Información', grupo: 'A', categoria: 'Administrativo' },

  // ═══ GRUPO B — Documentos Semiestructurados ═══
  { id: 28, nombre: 'Carta Funcional', grupo: 'B', categoria: 'Administrativo' },
  { id: 29, nombre: 'Certificado', grupo: 'B', categoria: 'Certificación' },
  { id: 32, nombre: 'Copia Certificada', grupo: 'B', categoria: 'Certificación' },
  { id: 33, nombre: 'Decreto', grupo: 'B', categoria: 'Trámite' },
  { id: 34, nombre: 'Devolución', grupo: 'B', categoria: 'Trámite' },
  { id: 35, nombre: 'Disposición de Comando', grupo: 'B', categoria: 'Comando' },
  { id: 36, nombre: 'Elevación', grupo: 'B', categoria: 'Trámite' },
  { id: 41, nombre: 'Informe', grupo: 'B', categoria: 'Informe' },
  { id: 42, nombre: 'Informe Administrativo', grupo: 'B', categoria: 'Informe' },
  { id: 44, nombre: 'Informe de Acto Antisocial', grupo: 'B', categoria: 'Informe' },
  { id: 45, nombre: 'Informe por Situación Irregular de Menor', grupo: 'B', categoria: 'Informe' },
  { id: 47, nombre: 'Inventario de Relevo', grupo: 'B', categoria: 'Administrativo' },
  { id: 49, nombre: 'Memorándum', grupo: 'B', categoria: 'Comunicación' },
  { id: 50, nombre: 'Memorándum Múltiple', grupo: 'B', categoria: 'Comunicación' },
  { id: 51, nombre: 'Nota de Agente', grupo: 'B', categoria: 'Inteligencia' },
  { id: 52, nombre: 'Nota de Información', grupo: 'B', categoria: 'Inteligencia' },
  { id: 53, nombre: 'Nota Informativa', grupo: 'B', categoria: 'Comunicación' },
  { id: 56, nombre: 'Oficio', grupo: 'B', categoria: 'Comunicación' },
  { id: 57, nombre: 'Orden de Incorporación', grupo: 'B', categoria: 'Personal' },
  { id: 59, nombre: 'Orden Telefónica', grupo: 'B', categoria: 'Comando' },
  { id: 60, nombre: 'Orden de Sanción', grupo: 'B', categoria: 'Disciplinario' },
  { id: 61, nombre: 'Parte', grupo: 'B', categoria: 'Comunicación' },
  { id: 67, nombre: 'Resolución', grupo: 'B', categoria: 'Dispositivo' },

  // ═══ GRUPO C — Documentos Narrativos Complejos ═══
  { id: 26, nombre: 'Apreciación de Situación de Inteligencia', grupo: 'C', categoria: 'Inteligencia' },
  { id: 27, nombre: 'Atestado Policial', grupo: 'C', categoria: 'Investigación' },
  { id: 39, nombre: 'Hoja de Estudio y Opinión', grupo: 'C', categoria: 'Estado Mayor' },
  { id: 40, nombre: 'Hoja de Recomendación', grupo: 'C', categoria: 'Estado Mayor' },
  { id: 43, nombre: 'Informe de Estudio de Estado Mayor', grupo: 'C', categoria: 'Estado Mayor' },
  { id: 46, nombre: 'Informe Policial', grupo: 'C', categoria: 'Investigación' },
  { id: 48, nombre: 'Manifestación (NCPP)', grupo: 'C', categoria: 'Investigación' },
  { id: 58, nombre: 'Orden de Operaciones', grupo: 'C', categoria: 'Operaciones' },
  { id: 62, nombre: 'Plan Ceremonial', grupo: 'C', categoria: 'Planificación' },
  { id: 63, nombre: 'Plan de Trabajo', grupo: 'C', categoria: 'Planificación' },
  { id: 64, nombre: 'Plan de Operaciones', grupo: 'C', categoria: 'Operaciones' },
];

// Categorías únicas para filtros
export const CATEGORIAS = [...new Set(TIPOS_DOCUMENTO.map(t => t.categoria))].sort();

// Grupos con descripción
export const GRUPOS = {
  A: { label: 'Estructurados', desc: 'Formularios con campos fijos', color: '#22c55e' },
  B: { label: 'Semiestructurados', desc: 'Encabezado fijo, cuerpo variable', color: '#3b82f6' },
  C: { label: 'Narrativos', desc: 'Editor por secciones complejas', color: '#a855f7' },
};
