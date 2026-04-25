-- ============================================================
-- DDL - Centros de Evaluacion de Manejo
-- Universidad San Carlos de Guatemala - SBD1 2026
-- INSTRUCCIONES: Ejecutar con Ctrl+Alt+Enter en DBeaver
-- Si ya existen tablas, ejecutar primero el script de limpieza
-- ============================================================

CREATE TABLE Depa (
  ID_Depa INTEGER      NOT NULL,
  Nombre  VARCHAR2(45) NOT NULL,
  CONSTRAINT Depa_PK PRIMARY KEY (ID_Depa)
);

CREATE TABLE Personal (
  ID_personal   INTEGER      NOT NULL,
  Nombre_Person VARCHAR2(30) NOT NULL,
  CONSTRAINT Personal_PK PRIMARY KEY (ID_personal)
);

CREATE TABLE Esc_Auto (
  ID_auto      INTEGER      NOT NULL,
  Nombre       VARCHAR2(35) NOT NULL,
  Direccion    VARCHAR2(35) NOT NULL,
  Num_Autoriza VARCHAR2(35) NOT NULL,
  CONSTRAINT Esc_Auto_PK PRIMARY KEY (ID_auto)
);

CREATE TABLE Instructor (
  ID_instructor INTEGER       NOT NULL,
  Nombre        VARCHAR2(50)  NOT NULL,
  Dar_Instruc   VARCHAR2(100) NOT NULL,
  CONSTRAINT Instructor_PK PRIMARY KEY (ID_instructor)
);

CREATE TABLE Municipio (
  ID_Municipio INTEGER      NOT NULL,
  Nombre       VARCHAR2(45) NOT NULL,
  Depa_ID_Depa INTEGER      NOT NULL,
  CONSTRAINT Municipio_PK      PRIMARY KEY (ID_Municipio),
  CONSTRAINT Municipio_Depa_FK FOREIGN KEY (Depa_ID_Depa) REFERENCES Depa(ID_Depa)
);

CREATE TABLE Centro_Eva (
  ID_Centro    INTEGER      NOT NULL,
  Nombre       VARCHAR2(50) NOT NULL,
  Direccion    VARCHAR2(50) NOT NULL,
  Calificacion INTEGER,
  Depa_ID_Depa INTEGER      NOT NULL,
  CONSTRAINT Centro_Eva_PK      PRIMARY KEY (ID_Centro),
  CONSTRAINT Centro_Eva_Depa_FK FOREIGN KEY (Depa_ID_Depa) REFERENCES Depa(ID_Depa)
);

CREATE TABLE Relation_7 (
  Esc_Auto_ID_auto     INTEGER NOT NULL,
  Centro_Eva_ID_Centro INTEGER NOT NULL,
  CONSTRAINT Relation_7_PK             PRIMARY KEY (Esc_Auto_ID_auto, Centro_Eva_ID_Centro),
  CONSTRAINT Relation_7_Esc_Auto_FK    FOREIGN KEY (Esc_Auto_ID_auto)     REFERENCES Esc_Auto(ID_auto),
  CONSTRAINT Relation_7_Centro_Eva_FK  FOREIGN KEY (Centro_Eva_ID_Centro) REFERENCES Centro_Eva(ID_Centro)
);

CREATE TABLE Eva_Teo (
  ID_Teorica    INTEGER       NOT NULL,
  Texto_Preg    VARCHAR2(200) NOT NULL,
  Imagen        BLOB,
  Num_Preg      INTEGER       NOT NULL,
  Num_resp      INTEGER       NOT NULL,
  Opcion_A      VARCHAR2(100),
  Opcion_B      VARCHAR2(100),
  Opcion_C      VARCHAR2(100),
  Opcion_D      VARCHAR2(100),
  Resp_Correcta VARCHAR2(1),
  CONSTRAINT Eva_Teo_PK PRIMARY KEY (ID_Teorica)
);

CREATE TABLE Resp_Teo (
  ID_Respuesta       INTEGER       NOT NULL,
  Texto_Respuesta    VARCHAR2(100),
  Imagen_Respuesta   BLOB,
  Valor_Puntos       INTEGER       NOT NULL,
  Eva_Teo_ID_Teorica INTEGER       NOT NULL,
  CONSTRAINT Resp_Teo_PK         PRIMARY KEY (ID_Respuesta),
  CONSTRAINT Resp_Teo_Eva_Teo_FK FOREIGN KEY (Eva_Teo_ID_Teorica) REFERENCES Eva_Teo(ID_Teorica)
);

CREATE TABLE Eva_Prac (
  ID_Practico INTEGER       NOT NULL,
  Descripcion VARCHAR2(200) NOT NULL,
  Num_Pregun  INTEGER       NOT NULL,
  Punteo_Max  INTEGER       NOT NULL,
  CONSTRAINT Eva_Prac_PK PRIMARY KEY (ID_Practico)
);

CREATE TABLE Resp_Prac (
  ID_Practica          INTEGER      NOT NULL,
  Valor_Puntos         INTEGER      NOT NULL,
  Proce                VARCHAR2(55) NOT NULL,
  Eva_Prac_ID_Practico INTEGER      NOT NULL,
  CONSTRAINT Resp_Prac_PK          PRIMARY KEY (ID_Practica),
  CONSTRAINT Resp_Prac_Eva_Prac_FK FOREIGN KEY (Eva_Prac_ID_Practico) REFERENCES Eva_Prac(ID_Practico)
);

CREATE TABLE Licencia (
  ID_Licencia        INTEGER      NOT NULL,
  Tipo_Licencia      VARCHAR2(30) NOT NULL,
  Persona_ID_persona INTEGER      NOT NULL,
  CONSTRAINT Licencia_PK PRIMARY KEY (ID_Licencia)
);

CREATE TABLE Tramite (
  ID_tramite         INTEGER      NOT NULL,
  Tipo_tramite       VARCHAR2(30) NOT NULL,
  Persona_ID_persona INTEGER      NOT NULL,
  CONSTRAINT Tramite_PK PRIMARY KEY (ID_tramite)
);

CREATE TABLE Registracion (
  ID_registro        INTEGER NOT NULL,
  Fecha_reg          DATE    NOT NULL,
  Persona_ID_persona INTEGER NOT NULL,
  Esc_Auto_ID_auto   INTEGER NOT NULL,
  CONSTRAINT Registracion_PK         PRIMARY KEY (ID_registro),
  CONSTRAINT Registracion_EscAuto_FK FOREIGN KEY (Esc_Auto_ID_auto) REFERENCES Esc_Auto(ID_auto)
);

CREATE TABLE Persona (
  ID_persona               INTEGER      NOT NULL,
  Nombre_Comp              VARCHAR2(50) NOT NULL,
  Direccion                VARCHAR2(50) NOT NULL,
  IDE                      INTEGER      NOT NULL,
  Telefono                 INTEGER      NOT NULL,
  Fotografia               BLOB,
  Genero                   VARCHAR2(10) NOT NULL,
  Fecha_Naci               DATE         NOT NULL,
  Tramite_ID_tramite       INTEGER      NOT NULL,
  Personal_ID_personal     INTEGER      NOT NULL,
  Licencia_ID_Licencia     INTEGER      NOT NULL,
  Registracion_ID_registro INTEGER      NOT NULL,
  Municipio_ID_Municipio   INTEGER      NOT NULL,
  CONSTRAINT Persona_PK           PRIMARY KEY (ID_persona),
  CONSTRAINT Persona_Personal_FK  FOREIGN KEY (Personal_ID_personal)   REFERENCES Personal(ID_personal),
  CONSTRAINT Persona_Municipio_FK FOREIGN KEY (Municipio_ID_Municipio) REFERENCES Municipio(ID_Municipio),
  CONSTRAINT Persona_Tramite_FK   FOREIGN KEY (Tramite_ID_tramite)       REFERENCES Tramite(ID_tramite)         DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT Persona_Licencia_FK  FOREIGN KEY (Licencia_ID_Licencia)     REFERENCES Licencia(ID_Licencia)       DEFERRABLE INITIALLY DEFERRED,
  CONSTRAINT Persona_Registra_FK  FOREIGN KEY (Registracion_ID_registro) REFERENCES Registracion(ID_registro)   DEFERRABLE INITIALLY DEFERRED
);

ALTER TABLE Licencia
  ADD CONSTRAINT Licencia_Persona_FK
  FOREIGN KEY (Persona_ID_persona) REFERENCES Persona(ID_persona)
  DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE Tramite
  ADD CONSTRAINT Tramite_Persona_FK
  FOREIGN KEY (Persona_ID_persona) REFERENCES Persona(ID_persona)
  DEFERRABLE INITIALLY DEFERRED;

ALTER TABLE Registracion
  ADD CONSTRAINT Registracion_Persona_FK
  FOREIGN KEY (Persona_ID_persona) REFERENCES Persona(ID_persona)
  DEFERRABLE INITIALLY DEFERRED;

CREATE TABLE Evaluacion (
  ID_Evalua                INTEGER      NOT NULL,
  Num_Corre                INTEGER      NOT NULL,
  Fech_Eva                 DATE         NOT NULL,
  Fase1                    VARCHAR2(30) NOT NULL,
  Fase2                    VARCHAR2(30) NOT NULL,
  Persona_ID_persona       INTEGER      NOT NULL,
  Instructor_ID_instructor INTEGER      NOT NULL,
  Esc_Auto_ID_auto         INTEGER      NOT NULL,
  Centro_Eva_ID_Centro     INTEGER      NOT NULL,
  CONSTRAINT Evaluacion_PK             PRIMARY KEY (ID_Evalua),
  CONSTRAINT Evaluacion_Persona_FK     FOREIGN KEY (Persona_ID_persona)       REFERENCES Persona(ID_persona),
  CONSTRAINT Evaluacion_Instructor_FK  FOREIGN KEY (Instructor_ID_instructor) REFERENCES Instructor(ID_instructor),
  CONSTRAINT Evaluacion_EscAuto_FK     FOREIGN KEY (Esc_Auto_ID_auto)         REFERENCES Esc_Auto(ID_auto),
  CONSTRAINT Evaluacion_Centro_FK      FOREIGN KEY (Centro_Eva_ID_Centro)     REFERENCES Centro_Eva(ID_Centro)
);

CREATE TABLE Resp_Usuario (
  ID_Resp_Usuario      INTEGER     NOT NULL,
  Respuesta            VARCHAR2(1) NOT NULL,
  Es_Correcta          VARCHAR2(1),
  Evaluacion_ID_Evalua INTEGER     NOT NULL,
  Eva_Teo_ID_Teorica   INTEGER     NOT NULL,
  CONSTRAINT Resp_Usuario_PK PRIMARY KEY (ID_Resp_Usuario),
  CONSTRAINT Resp_Usu_Eva_FK FOREIGN KEY (Evaluacion_ID_Evalua) REFERENCES Evaluacion(ID_Evalua),
  CONSTRAINT Resp_Usu_Teo_FK FOREIGN KEY (Eva_Teo_ID_Teorica)   REFERENCES Eva_Teo(ID_Teorica)
);

CREATE TABLE Resp_Prac_Usuario (
  ID_Resp_Prac         INTEGER NOT NULL,
  Nota_Obtenida        INTEGER NOT NULL,
  Evaluacion_ID_Evalua INTEGER NOT NULL,
  Eva_Prac_ID_Practico INTEGER NOT NULL,
  CONSTRAINT Resp_Prac_Usu_PK      PRIMARY KEY (ID_Resp_Prac),
  CONSTRAINT Resp_Prac_Usu_Eva_FK  FOREIGN KEY (Evaluacion_ID_Evalua) REFERENCES Evaluacion(ID_Evalua),
  CONSTRAINT Resp_Prac_Usu_Prac_FK FOREIGN KEY (Eva_Prac_ID_Practico) REFERENCES Eva_Prac(ID_Practico)
);

COMMIT;