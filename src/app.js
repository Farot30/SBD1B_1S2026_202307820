require('dotenv').config();
const express = require('express');
const cors = require('cors');

// Rutas
const depaRoutes        = require('./routes/depa.routes');
const municipioRoutes   = require('./routes/municipio.routes');
const escAutoRoutes     = require('./routes/escAuto.routes');
const centroEvaRoutes   = require('./routes/centroEva.routes');
const instructorRoutes  = require('./routes/instructor.routes');
const personalRoutes    = require('./routes/personal.routes');
const licenciaRoutes    = require('./routes/licencia.routes');
const tramiteRoutes     = require('./routes/tramite.routes');
const registracionRoutes= require('./routes/registracion.routes');
const personaRoutes     = require('./routes/persona.routes');
const evaTeoRoutes      = require('./routes/evaTeo.routes');
const respTeoRoutes     = require('./routes/respTeo.routes');
const evaPracRoutes     = require('./routes/evaPrac.routes');
const respPracRoutes    = require('./routes/respPrac.routes');
const evaluacionRoutes  = require('./routes/evaluacion.routes');
const respUsuarioRoutes = require('./routes/respUsuario.routes');
const respPracUsuRoutes = require('./routes/respPracUsuario.routes');
const relation7Routes   = require('./routes/relation7.routes');
const consultasRoutes   = require('./routes/consultas.routes');

const app = express();

app.use(cors());
app.use(express.json());

// ── Rutas CRUD ──────────────────────────────────────────────
app.use('/api/depa',              depaRoutes);
app.use('/api/municipio',         municipioRoutes);
app.use('/api/escuela',           escAutoRoutes);
app.use('/api/centro',            centroEvaRoutes);
app.use('/api/instructor',        instructorRoutes);
app.use('/api/personal',          personalRoutes);
app.use('/api/licencia',          licenciaRoutes);
app.use('/api/tramite',           tramiteRoutes);
app.use('/api/registracion',      registracionRoutes);
app.use('/api/persona',           personaRoutes);
app.use('/api/eva-teo',           evaTeoRoutes);
app.use('/api/resp-teo',          respTeoRoutes);
app.use('/api/eva-prac',          evaPracRoutes);
app.use('/api/resp-prac',         respPracRoutes);
app.use('/api/evaluacion',        evaluacionRoutes);
app.use('/api/resp-usuario',      respUsuarioRoutes);
app.use('/api/resp-prac-usuario', respPracUsuRoutes);
app.use('/api/ubicacion',         relation7Routes);

// ── Rutas de Consultas Estadísticas ─────────────────────────
app.use('/api/consultas',         consultasRoutes);

// ── Ruta raíz ───────────────────────────────────────────────
app.get('/', (req, res) => {
  res.json({
    mensaje: 'API Centros de Evaluación de Manejo - USAC SBD1 2026',
    version: '1.0.0',
    endpoints: {
      crud: [
        '/api/depa', '/api/municipio', '/api/escuela', '/api/centro',
        '/api/instructor', '/api/personal', '/api/licencia', '/api/tramite',
        '/api/registracion', '/api/persona', '/api/eva-teo', '/api/resp-teo',
        '/api/eva-prac', '/api/resp-prac', '/api/evaluacion',
        '/api/resp-usuario', '/api/resp-prac-usuario', '/api/ubicacion'
      ],
      consultas: [
        '/api/consultas/estadisticas-centro',
        '/api/consultas/ranking-evaluados',
        '/api/consultas/pregunta-menor-aciertos'
      ]
    }
  });
});

const PORT = process.env.API_PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
