#!/bin/bash
# ============================================================
# Script de inicializacion automatica
# Se ejecuta al levantar el contenedor Oracle XE por primera vez
# ============================================================

echo "================================================="
echo " Iniciando carga de esquema - Centros Evaluacion"
echo "================================================="

# Esperar a que Oracle este completamente listo
echo ">>> Esperando que Oracle este listo..."
sleep 10

# Crear usuario centros_db y darle permisos (como SYSTEM)
echo ">>> Creando usuario centros_db..."
sqlplus system/"${ORACLE_PWD}"@//localhost:1521/XEPDB1 << EOF
CREATE USER centros_db IDENTIFIED BY "${ORACLE_PWD}";
GRANT CONNECT, RESOURCE TO centros_db;
GRANT CREATE SESSION TO centros_db;
GRANT CREATE TABLE TO centros_db;
GRANT CREATE SEQUENCE TO centros_db;
GRANT CREATE VIEW TO centros_db;
GRANT UNLIMITED TABLESPACE TO centros_db;
GRANT DBA TO centros_db;
EXIT;
EOF

echo ">>> Ejecutando DDL - Creando tablas..."
sqlplus centros_db/"${ORACLE_PWD}"@//localhost:1521/XEPDB1 @/opt/scripts/01_ddl.sql

echo ">>> Ejecutando DML parte 1 - Datos base..."
sqlplus centros_db/"${ORACLE_PWD}"@//localhost:1521/XEPDB1 @/opt/scripts/02a_dml_base.sql

echo ">>> Ejecutando DML parte 2 - Persona..."
sqlplus centros_db/"${ORACLE_PWD}"@//localhost:1521/XEPDB1 @/opt/scripts/02b_dml_persona.sql

echo ">>> Ejecutando DML parte 3 - Evaluacion y respuestas..."
sqlplus centros_db/"${ORACLE_PWD}"@//localhost:1521/XEPDB1 @/opt/scripts/02c_dml_evaluacion.sql

echo "================================================="
echo " Esquema cargado exitosamente"
echo "================================================="