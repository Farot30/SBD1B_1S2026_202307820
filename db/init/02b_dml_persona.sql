-- DML Parte 2: Persona y sus FK circulares
SET CONSTRAINTS ALL DEFERRED;

INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (1, 'A', 1);
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (2, 'B', 2);
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (3, 'A', 3);
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (4, 'A', 4);
INSERT INTO Licencia (ID_Licencia, Tipo_Licencia, Persona_ID_persona) VALUES (5, 'B', 5);

INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (1, 'Licencia de Conducir', 1);
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (2, 'Licencia de Conducir', 2);
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (3, 'Licencia de Conducir', 3);
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (4, 'Licencia de Conducir', 4);
INSERT INTO Tramite (ID_tramite, Tipo_tramite, Persona_ID_persona) VALUES (5, 'Licencia de Conducir', 5);

INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto) VALUES (1, DATE '2025-01-15', 1, 1);
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto) VALUES (2, DATE '2025-01-15', 2, 1);
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto) VALUES (3, DATE '2025-01-16', 3, 2);
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto) VALUES (4, DATE '2025-01-17', 4, 3);
INSERT INTO Registracion (ID_registro, Fecha_reg, Persona_ID_persona, Esc_Auto_ID_auto) VALUES (5, DATE '2025-01-18', 5, 2);

INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci, Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia, Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (1, 'Juan Carlos Lopez Garcia',      'Guatemala, Zona 1', 10000001, 55551001, 'M', DATE '1995-03-10', 1, 1, 1, 1, 1);
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci, Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia, Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (2, 'Maria Elena Rodriguez Morales', 'Mixco, Zona 3',     10000002, 55551002, 'F', DATE '1998-07-22', 2, 1, 2, 2, 2);
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci, Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia, Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (3, 'Carlos Alberto Mendez Castillo','Villa Nueva',       10000003, 55551003, 'M', DATE '1993-11-05', 3, 1, 3, 3, 3);
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci, Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia, Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (4, 'Ana Sofia Guerrero Diaz',       'Escuintla Centro',  10000004, 55551004, 'F', DATE '2000-02-14', 4, 1, 4, 4, 4);
INSERT INTO Persona (ID_persona, Nombre_Comp, Direccion, IDE, Telefono, Genero, Fecha_Naci, Tramite_ID_tramite, Personal_ID_personal, Licencia_ID_Licencia, Registracion_ID_registro, Municipio_ID_Municipio)
  VALUES (5, 'Pedro Jose Hernandez Ruiz',     'Antigua Guatemala', 10000005, 55551005, 'M', DATE '1990-09-30', 5, 1, 5, 5, 5);

COMMIT;
