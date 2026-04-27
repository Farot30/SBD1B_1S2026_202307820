-- DML Parte 1: Tablas base sin FK circulares
INSERT INTO Depa VALUES (1, 'Guatemala');
INSERT INTO Depa VALUES (2, 'Sacatepquez');
INSERT INTO Depa VALUES (3, 'Escuintla');

INSERT INTO Personal VALUES (1, 'Administrativo');
INSERT INTO Personal VALUES (2, 'Evaluador');
INSERT INTO Personal VALUES (3, 'Instructor');

INSERT INTO Esc_Auto VALUES (1, 'Escuela de Manejo AutoMaster',  'Avenida Reforma 15-45, Z10',   'ESC-AM-001');
INSERT INTO Esc_Auto VALUES (2, 'Academia Vial GuateDrive',      'Bulevar Los Proceres 18-20',   'ESC-GD-002');
INSERT INTO Esc_Auto VALUES (3, 'Instituto de Conduccion Segura','Calzada Roosevelt 25-30, Z11', 'ESC-ICS-003');

INSERT INTO Instructor VALUES (1, 'Roberto Garcia Lopez',   'Instructor de manejo practico certificado');
INSERT INTO Instructor VALUES (2, 'Carmen Perez Juarez',    'Instructora certificada zona metropolitana');
INSERT INTO Instructor VALUES (3, 'Miguel Torres Sandoval', 'Instructor certificado area sur');

INSERT INTO Municipio VALUES (1, 'Guatemala',         1);
INSERT INTO Municipio VALUES (2, 'Mixco',             1);
INSERT INTO Municipio VALUES (3, 'Villa Nueva',       1);
INSERT INTO Municipio VALUES (4, 'Escuintla',         3);
INSERT INTO Municipio VALUES (5, 'Antigua Guatemala', 2);

INSERT INTO Centro_Eva VALUES (1, 'Centro de Evaluacion Zona 12',          'Zona 12, Guatemala', NULL, 1);
INSERT INTO Centro_Eva VALUES (2, 'Centro de Evaluacion Antigua Guatemala', 'Antigua Guatemala',  NULL, 2);
INSERT INTO Centro_Eva VALUES (3, 'Centro de Evaluacion Escuintla',         'Escuintla Centro',   NULL, 3);

INSERT INTO Relation_7 VALUES (1, 1);
INSERT INTO Relation_7 VALUES (1, 2);
INSERT INTO Relation_7 VALUES (2, 1);
INSERT INTO Relation_7 VALUES (3, 2);
INSERT INTO Relation_7 VALUES (3, 3);
INSERT INTO Relation_7 VALUES (2, 2);

INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
  VALUES (1, 'Cual es la distancia minima entre vehiculos en carretera?', 1, 4, '2 metros', '3 segundos de distancia', '5 metros', '1 segundo de distancia', 'B');
INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
  VALUES (2, 'Que significa una senal de alto?', 2, 4, 'Reducir velocidad', 'Detenerse completamente', 'Ceder el paso', 'Continuar con precaucion', 'B');
INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
  VALUES (3, 'Cual es el limite de velocidad en zona escolar?', 3, 4, '20 km/h', '30 km/h', '40 km/h', '50 km/h', 'A');
INSERT INTO Eva_Teo (ID_Teorica, Texto_Preg, Num_Preg, Num_resp, Opcion_A, Opcion_B, Opcion_C, Opcion_D, Resp_Correcta)
  VALUES (4, 'Que hacer al ver una ambulancia con sirena activada?', 4, 4, 'Mantener velocidad', 'Acelerar para salir del camino', 'Orillarse y detenerse', 'Ignorar la sirena', 'C');

INSERT INTO Resp_Teo VALUES (1, '3 segundos de distancia', NULL, 25, 1);
INSERT INTO Resp_Teo VALUES (2, 'Detenerse completamente', NULL, 25, 2);
INSERT INTO Resp_Teo VALUES (3, '20 km/h',                 NULL, 25, 3);
INSERT INTO Resp_Teo VALUES (4, 'Orillarse y detenerse',   NULL, 25, 4);

INSERT INTO Eva_Prac VALUES (1, 'Estacionamiento en paralelo en espacio de 6 metros', 4, 20);
INSERT INTO Eva_Prac VALUES (2, 'Conducir en reversa 50 metros trayectoria recta',    4, 15);
INSERT INTO Eva_Prac VALUES (3, 'Maniobra de tres puntos en espacio reducido',        4, 25);
INSERT INTO Eva_Prac VALUES (4, 'Conduccion en zona urbana respetando senales',       4, 30);

INSERT INTO Resp_Prac VALUES (1, 20, 'Estacionar correctamente en paralelo sin tocar conos', 1);
INSERT INTO Resp_Prac VALUES (2, 15, 'Reversa en linea recta sin desviarse mas de 30cm',     2);
INSERT INTO Resp_Prac VALUES (3, 25, 'Completar maniobra tres puntos sin invadir acera',     3);
INSERT INTO Resp_Prac VALUES (4, 30, 'Respetar todas las senales en recorrido urbano',       4);

COMMIT;
