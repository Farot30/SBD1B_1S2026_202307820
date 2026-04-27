-- DML Parte 3: Evaluacion y respuestas
INSERT INTO Evaluacion VALUES (1, 1, DATE '2025-01-15', 'APROBADO',  'REPROBADO', 1, 1, 1, 1);
INSERT INTO Evaluacion VALUES (2, 2, DATE '2025-01-15', 'REPROBADO', 'APROBADO',  2, 2, 1, 2);
INSERT INTO Evaluacion VALUES (3, 3, DATE '2025-01-16', 'REPROBADO', 'REPROBADO', 3, 1, 2, 1);
INSERT INTO Evaluacion VALUES (4, 4, DATE '2025-01-17', 'PENDIENTE', 'PENDIENTE', 4, 3, 3, 3);
INSERT INTO Evaluacion VALUES (5, 5, DATE '2025-01-18', 'PENDIENTE', 'PENDIENTE', 5, 2, 2, 2);
COMMIT;

INSERT INTO Resp_Usuario VALUES (1, 'B', 'S', 1, 1);
INSERT INTO Resp_Usuario VALUES (2, 'B', 'S', 1, 2);
INSERT INTO Resp_Usuario VALUES (3, 'A', 'S', 2, 3);
INSERT INTO Resp_Usuario VALUES (4, 'C', 'S', 2, 4);
INSERT INTO Resp_Usuario VALUES (5, 'B', 'S', 3, 1);
INSERT INTO Resp_Usuario VALUES (6, 'A', 'N', 3, 2);
COMMIT;

INSERT INTO Resp_Prac_Usuario VALUES (1, 18, 1, 1);
INSERT INTO Resp_Prac_Usuario VALUES (2, 13, 1, 2);
INSERT INTO Resp_Prac_Usuario VALUES (3, 22, 2, 3);
INSERT INTO Resp_Prac_Usuario VALUES (4, 28, 2, 4);
INSERT INTO Resp_Prac_Usuario VALUES (5, 15, 3, 1);
COMMIT;
