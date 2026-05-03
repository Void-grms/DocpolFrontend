// Grados jerárquicos de la PNP — Cap. IV del Manual
export const GRADOS_OFICIALES = [
  { grado: 'Teniente General', abreviatura: 'Tnte. Gral. PNP' },
  { grado: 'General', abreviatura: 'Gral. PNP' },
  { grado: 'Coronel', abreviatura: 'Crnl. PNP' },
  { grado: 'Comandante', abreviatura: 'Cmdte. PNP' },
  { grado: 'Mayor', abreviatura: 'May. PNP' },
  { grado: 'Capitán', abreviatura: 'Cap. PNP' },
  { grado: 'Teniente', abreviatura: 'Tnte. PNP' },
  { grado: 'Alférez', abreviatura: 'Alfz. PNP' },
];

export const GRADOS_SUBOFICIALES = [
  { grado: 'Suboficial Superior', abreviatura: 'SS PNP' },
  { grado: 'Suboficial Brigadier', abreviatura: 'SB PNP' },
  { grado: 'Suboficial Técnico de Primera', abreviatura: 'ST1 PNP' },
  { grado: 'Suboficial Técnico de Segunda', abreviatura: 'ST2 PNP' },
  { grado: 'Suboficial Técnico de Tercera', abreviatura: 'ST3 PNP' },
  { grado: 'Suboficial de Primera', abreviatura: 'S1 PNP' },
  { grado: 'Suboficial de Segunda', abreviatura: 'S2 PNP' },
  { grado: 'Suboficial de Tercera', abreviatura: 'S3 PNP' },
];

export const TODOS_LOS_GRADOS = [...GRADOS_OFICIALES, ...GRADOS_SUBOFICIALES];

// Frases protocolares según jerarquía — Cap. III, sección I.5
export const FRASES_PROTOCOLO = {
  superior: 'Tengo el honor de dirigirme a Ud.,',
  igual: 'Tengo el agrado de dirigirme a Ud.,',
  inferior: 'Me dirijo a Ud.,',
  externo: 'Es grato dirigirme a Ud.,',
};

// Despedida protocolar para Oficios
export const DESPEDIDA_OFICIO = 'Es propicia la oportunidad para expresarle los sentimientos de mi consideración y deferente estima personal.';
export const CIERRE_OFICIO = 'Dios guarde a Ud.';

// Clasificaciones de documentos
export const CLASIFICACIONES = [
  { value: 'comun', label: 'Común', color: '#22c55e' },
  { value: 'confidencial', label: 'Confidencial', color: '#f59e0b' },
  { value: 'reservado', label: 'Reservado', color: '#f97316' },
  { value: 'secreto', label: 'Secreto', color: '#ef4444' },
];

// Estados del documento
export const ESTADOS_DOCUMENTO = [
  { value: 'borrador', label: 'Borrador', color: '#94a3b8' },
  { value: 'revision', label: 'En Revisión', color: '#f59e0b' },
  { value: 'emitido', label: 'Emitido', color: '#22c55e' },
  { value: 'derivado', label: 'Derivado', color: '#3b82f6' },
  { value: 'archivado', label: 'Archivado', color: '#6b7280' },
];

// Prioridades
export const PRIORIDADES = [
  { value: 'normal', label: 'Normal' },
  { value: 'urgente', label: 'Urgente (24 horas)' },
  { value: 'muy_urgente', label: 'Muy Urgente (al término de la distancia)' },
];
