-- ============================================================
-- DML - Centros de Evaluacion de Manejo
-- Datos de prueba - Data_Proyecto2.json
-- ============================================================

SET CONSTRAINTS ALL DEFERRED;

-- 1. DEPA
INSERT INTO Depa VALUES (1, 'Guatemala');
INSERT INTO Depa VALUES (2, 'Sacatepéquez');
INSERT INTO Depa VALUES (3, 'Escuintla');

-- 2. PERSONAL
INSERT INTO Personal VALUES (1, 'Administrativo');
INSERT INTO Personal VALUES (2, 'Evaluador');
INSERT INTO Personal VALUES (3, 'Instructor');

-- 3. ESC_AUTO
INSERT INTO Esc_Auto VALUES (1, 'Escuela de Manejo AutoMaster',   'Avenida Reforma 15-45, Zona 10',        'ESC-AM-001');
INSERT INTO Esc_Auto VALUES (2, 'Academia Vial GuateDrive',        'Boulevard Los Próceres 18-20, Zona 10', 'ESC-GD-002');
INSERT INTO Esc_Auto VALUES (3, 'Instituto de Conducción Segura',  'Calzada Roosevelt 25-30, Zona 11',      'ESC-ICS-003');

-- 4. INSTRUCTOR
INSERT INTO Instructor VALUES (1, 'Roberto García López',   'Instructor de manejo práctico certificado');
INSERT INTO Instructor VALUES (2, 'Carmen Pérez Juárez',    'Instructora certificada zona metropolitana');
INSERT INTO Instructor VALUES (3, 'Miguel Torres Sandoval', 'Instructor certificado área sur');

-- 5. MUNICIPIO
INSERT INTO Municipio VALUES (1, 'Guatemala',         1);
INSERT INTO Municipio VALUES (2, 'Mixco',             1);
INSERT INTO Municipio VALUES (3, 'Villa Nueva',       1);
INSERT INTO Municipio VALUES (4, 'Escuintla',         3);
INSERT INTO Municipio VALUES (5, 'Antigua Guatemala', 2);

-- 6. CENTRO_EVA
INSERT INTO Centro_Eva VALUES (1, 'Centro de Evaluación Zona 12',           'Zona 12, Guatemala',  NULL, 1);
INSERT INTO Centro_Eva VALUES (2, 'Centro de Evaluación Antigua Guatemala',  'Antigua Guatemala',   NULL, 2);
INSERT INTO Centro_Eva VALUES (3, 'Centro de Evaluación Escuintla',          'Escuintla Centro',    NULL, 3);

-- 7. RELATION_7 (UBICACION)
INSERT INTO Relation_7 VALUES (1, 1);
INSERT INTO Relation_7 VALUES (1, 2);
INSERT INTO Relation_7 VALUES (2, 1);
INSERT INTO Relation_7 VALUES (3, 2);
INSERT INTO Relation_7 VALUES (3, 3);
INSERT INTO Relation_7 VALUES (2, 2);

-- 8. EVA_TEO (preguntas teoricas con opciones)
INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
  VALUES (1, '¿Cuál es la distancia mínima que debe mantener entre vehículos en carretera?',
          1, 4, '2 metros', '3 segundos de distancia', '5 metros', '1 segundo de distancia', 'B');
INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
  VALUES (2, '¿Qué significa una señal de alto?',
          2, 4, 'Reducir velocidad', 'Detenerse completamente', 'Ceder el paso', 'Continuar con precaución', 'B');
INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
  VALUES (3, '¿Cuál es el límite de velocidad en zona escolar?',
          3, 4, '20 km/h', '30 km/h', '40 km/h', '50 km/h', 'A');
INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
  VALUES (4, '¿Qué debe hacer al ver una ambulancia con sirena activada?',
          4, 4, 'Mantener velocidad', 'Acelerar para salir del camino', 'Orillarse y detenerse', 'Ignorar la sirena', 'C');

-- 9. RESP_TEO (respuesta correcta de cada pregunta)
INSERT INTO Resp_Teo VALUES (1, '3 segundos de distancia', NULL, 25, 1);
INSERT INTO Resp_Teo VALUES (2, 'Detenerse completamente', NULL, 25, 2);
INSERT INTO Resp_Teo VALUES (3, '20 km/h',                 NULL, 25, 3);
INSERT INTO Resp_Teo VALUES (4, 'Orillarse y detenerse',   NULL, 25, 4);

-- 10. EVA_PRAC (ejercicios practicos)
INSERT INTO Eva_Prac VALUES (1, 'Realizar estacionamiento en paralelo en un espacio de 6 metros',    4, 20);
INSERT INTO Eva_Prac VALUES (2, 'Conducir en reversa por 50 metros manteniendo trayectoria recta',   4, 15);
INSERT INTO Eva_Prac VALUES (3, 'Maniobra de tres puntos en espacio reducido',                       4, 25);
INSERT INTO Eva_Prac VALUES (4, 'Conducción en zona urbana respetando señales de tránsito',          4, 30);

-- 11. RESP_PRAC (descripcion del proceso de cada ejercicio)
INSERT INTO Resp_Prac VALUES (1, 20, 'Estacionar correctamente en paralelo sin tocar conos',         1);
INSERT INTO Resp_Prac VALUES (2, 15, 'Reversa en linea recta sin desviarse mas de 30cm',             2);
INSERT INTO Resp_Prac VALUES (3, 25, 'Completar maniobra tres puntos sin invadir acera',             3);
INSERT INTO Resp_Prac VALUES (4, 30, 'Respetar todas las señales de transito en recorrido urbano',   4);

-- 12. LICENCIA (sin FK a Persona aun, se resuelve en COMMIT)
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (1, 'A', 1);
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (2, 'B', 2);
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (3, 'A', 3);
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (4, 'A', 4);
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (5, 'B', 5);

-- 13. TRAMITE
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (1, 'Licencia de Conducir', 1);
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (2, 'Licencia de Conducir', 2);
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (3, 'Licencia de Conducir', 3);
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (4, 'Licencia de Conducir', 4);
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (5, 'Licencia de Conducir', 5);

-- 14. REGISTRACION
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto)
  VALUES (1, DATE '2025-01-15', 1, 1);
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto)
  VALUES (2, DATE '2025-01-15', 2, 1);
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto)
  VALUES (3, DATE '2025-01-16', 3, 2);
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto)
  VALUES (4, DATE '2025-01-17', 4, 3);
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto)
  VALUES (5, DATE '2025-01-18', 5, 2);

-- 15. PERSONA
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
                     Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
                     Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (1, 'Juan Carlos López García',     'Guatemala, Zona 1',  10000001, 55551001, 'M', DATE '1995-03-10', 1, 1, 1, 1, 1);
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
                     Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
                     Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (2, 'María Elena Rodríguez Morales','Mixco, Zona 3',      10000002, 55551002, 'F', DATE '1998-07-22', 2, 1, 2, 2, 2);
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
                     Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
                     Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (3, 'Carlos Alberto Méndez Castillo','Villa Nueva',       10000003, 55551003, 'M', DATE '1993-11-05', 3, 1, 3, 3, 3);
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
                     Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
                     Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (4, 'Ana Sofía Guerrero Díaz',      'Escuintla Centro',   10000004, 55551004, 'F', DATE '2000-02-14', 4, 1, 4, 4, 4);
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci,
                     Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia,
                     Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (5, 'Pedro José Hernández Ruiz',    'Antigua Guatemala',  10000005, 55551005, 'M', DATE '1990-09-30', 5, 1, 5, 5, 5);

-- 16. EVALUACION
INSERT INTO Evaluacion VALUES (1, 1, DATE '2025-01-15', 'APROBADO',  'REPROBADO', 1, 1, 1, 1);
INSERT INTO Evaluacion VALUES (2, 2, DATE '2025-01-15', 'REPROBADO', 'APROBADO',  2, 2, 1, 2);
INSERT INTO Evaluacion VALUES (3, 3, DATE '2025-01-16', 'REPROBADO', 'REPROBADO', 3, 1, 2, 1);
INSERT INTO Evaluacion VALUES (4, 4, DATE '2025-01-17', 'PENDIENTE', 'PENDIENTE', 4, 3, 3, 3);
INSERT INTO Evaluacion VALUES (5, 5, DATE '2025-01-18', 'PENDIENTE', 'PENDIENTE', 5, 2, 2, 2);

-- 17. RESP_USUARIO (respuestas teoricas de los evaluados)
-- Examen 1: Juan Carlos respondio preguntas 1 y 2
INSERT INTO Resp_Usuario VALUES (1, 'B', 'S', 1, 1);  -- P1: B correcto
INSERT INTO Resp_Usuario VALUES (2, 'B', 'S', 1, 2);  -- P2: B correcto
-- Examen 2: Maria Elena respondio preguntas 3 y 4
INSERT INTO Resp_Usuario VALUES (3, 'A', 'S', 2, 3);  -- P3: A correcto
INSERT INTO Resp_Usuario VALUES (4, 'C', 'S', 2, 4);  -- P4: C correcto
-- Examen 3: Carlos Alberto respondio preguntas 1 y 2
INSERT INTO Resp_Usuario VALUES (5, 'B', 'S', 3, 1);  -- P1: B correcto
INSERT INTO Resp_Usuario VALUES (6, 'A', 'N', 3, 2);  -- P2: A incorrecto (correcta es B)

-- 18. RESP_PRAC_USUARIO (notas practicas de los evaluados)
-- Examen 1: Juan Carlos
INSERT INTO Resp_Prac_Usuario VALUES (1, 18, 1, 1);  -- ejercicio 1: 18/20
INSERT INTO Resp_Prac_Usuario VALUES (2, 13, 1, 2);  -- ejercicio 2: 13/15
-- Examen 2: Maria Elena
INSERT INTO Resp_Prac_Usuario VALUES (3, 22, 2, 3);  -- ejercicio 3: 22/25
INSERT INTO Resp_Prac_Usuario VALUES (4, 28, 2, 4);  -- ejercicio 4: 28/30
-- Examen 3: Carlos Alberto
INSERT INTO Resp_Prac_Usuario VALUES (5, 15, 3, 1);  -- ejercicio 1: 15/20

COMMIT;
