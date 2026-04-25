# Sistema de Centros de Evaluación de Manejo 🚗

**Proyecto SBD1B_1S2026** - Universidad San Carlos de Guatemala

Sistema integral para la gestión de centros de evaluación de conducción, personalizado para escuelas autorizadas y evaluadores de licencias de manejo.

## 📋 Descripción

Este proyecto es un **sistema de información** que permite:

- ✅ Gestionar centros de evaluación de manejo
- ✅ Administrar personal evaluador (instructores)
- ✅ Registrar escuelas autorizadas
- ✅ Crear y administrar exámenes teóricos y prácticos
- ✅ Registrar evaluaciones y resultados de candidatos
- ✅ Generar reportes de desempeño

**Tecnologías:**
- **Backend:** Node.js (Express)
- **Base de Datos:** Oracle XE 21c (SQL)
- **Arquitectura:** Microservicios con Docker
- **Orquestación:** Docker Compose

---

## 🏗️ Estructura del Proyecto

```
.
├── db/                          # Scripts de base de datos
│   └── init/
│       ├── 00_setup.sh         # Script de inicialización
│       ├── 01_ddl.sql          # Definición de tablas (DDL)
│       └── 02_dml.sql          # Datos iniciales (DML)
│
├── src/                         # Código fuente de la API
│   ├── controllers/            # Lógica de negocio
│   ├── routes/                 # Rutas HTTP
│   ├── models/                 # Modelos de datos
│   └── config/                 # Configuración
│
├── docker-compose.yml          # Orquestación de servicios
├── Dockerfile                  # Imagen de la API
├── Dockerfile.oracle           # Imagen personalizada Oracle
├── .env                        # Variables de entorno
├── .env.example                # Plantilla de variables
└── README.md                   # Este archivo
```

---

## 📦 Requisitos Previos

- **Docker Desktop** (incluye Docker Engine y Docker Compose)
- **Git** para control de versiones
- **DBeaver** u otro cliente SQL (opcional, para conexión directa)

### Instalación de Docker (Windows):
```powershell
# Descargar desde: https://www.docker.com/products/docker-desktop
```

---

## 🚀 Instalación y Levantamiento

### 1. Clonar el repositorio
```bash
git clone https://github.com/tu-usuario/SBD1B_1S2026_202307820.git
cd SBD1B_1S2026_202307820
```

### 2. Configurar variables de entorno
```bash
# Copiar archivo de ejemplo
cp .env.example .env

# Editar según tus necesidades (opcional, ya tiene valores por defecto)
```

### 3. Levantar los servicios
```powershell
docker-compose up -d
```

**Esto creará 2 contenedores:**
- `centros_evaluacion_db` - Oracle XE (Puerto 1521)
- `centros_evaluacion_api` - API Node.js (Puerto 3000)

### 4. Verificar que todo esté corriendo
```powershell
docker ps
```

---

## 🔧 Configuración

### Variables de Entorno (`.env`)

```env
# Oracle Database
ORACLE_PWD=Admin1234
ORACLE_PORT=1521

# Usuario de Base de Datos
DB_USER=centros_db
DB_PASSWORD=Admin1234
DB_HOST=localhost
DB_PORT=1521
DB_SERVICE=XEPDB1

# API REST
API_PORT=3000
```

---

## 📊 Estructura de Base de Datos

### Tablas Principales

| Tabla | Descripción |
|-------|-------------|
| `Depa` | Departamentos |
| `Municipio` | Municipios por departamento |
| `Persona` | Candidatos a evaluación |
| `Personal` | Personal administrativo |
| `Instructor` | Instructores evaluadores |
| `Esc_Auto` | Escuelas autorizadas |
| `Centro_Eva` | Centros de evaluación |
| `Evaluacion` | Evaluaciones realizadas |
| `Eva_Teo` | Exámenes teóricos |
| `Eva_Prac` | Exámenes prácticos |
| `Resp_Usuario` | Respuestas de usuarios a exámenes |
| `Licencia` | Licencias de manejo |
| `Tramite` | Trámites de licencia |

### Diagrama de Relaciones

```
Depa (1) ──────┬─→ (M) Municipio
              └─→ (M) Centro_Eva

Persona (M) ──────┬─→ (1) Municipio
                 ├─→ (1) Personal
                 ├─→ (1) Licencia
                 ├─→ (1) Tramite
                 └─→ (M) Registracion

Evaluacion (M) ──┬─→ (1) Persona
                 ├─→ (1) Instructor
                 ├─→ (1) Esc_Auto
                 ├─→ (1) Centro_Eva
                 ├─→ (M) Resp_Usuario
                 └─→ (M) Resp_Prac_Usuario
```

---

## 🌐 API REST

### Puertos

- **API:** `http://localhost:3000`
- **Base de Datos:** `localhost:1521`

### Endpoints Principales (Ejemplo)

```
GET  /api/centros              # Listar centros de evaluación
POST /api/centros              # Crear nuevo centro
GET  /api/centros/:id          # Obtener centro por ID
PUT  /api/centros/:id          # Actualizar centro
DELETE /api/centros/:id        # Eliminar centro

GET  /api/evaluaciones         # Listar evaluaciones
POST /api/evaluaciones         # Crear evaluación
GET  /api/evaluaciones/:id     # Obtener evaluación
```

---

## 🛠️ Comandos Útiles

### Docker Compose

```powershell
# Levantar servicios
docker-compose up -d

# Ver logs de un servicio
docker-compose logs -f api
docker-compose logs -f oracle-db

# Detener servicios
docker-compose stop

# Apagar y eliminar contenedores
docker-compose down

# Apagar, eliminar y limpiar volúmenes
docker-compose down -v

# Reconstruir imágenes
docker-compose build --no-cache
```

### Docker

```powershell
# Listar contenedores en ejecución
docker ps

# Listar todos los contenedores
docker ps -a

# Ver logs de un contenedor
docker logs <container_id>

# Ejecutar comando dentro del contenedor
docker exec -it <container_id> bash

# Detener contenedor
docker stop <container_id>

# Eliminar contenedor
docker rm <container_id>
```

### Conexión a Base de Datos

```powershell
# Desde una terminal local
sqlplus centros_db/Admin1234@localhost:1521/XEPDB1

# O con DBeaver:
# - Host: localhost
# - Puerto: 1521
# - SID: XEPDB1
# - Usuario: centros_db
# - Contraseña: Admin1234
```

---

## 📝 Inicialización de Datos

Los scripts en `db/init/` se ejecutan automáticamente:

1. **00_setup.sh** - Crea usuario `centros_db`
2. **01_ddl.sql** - Define todas las tablas
3. **02_dml.sql** - Inserta datos iniciales

Si necesitas reiniciar los datos:

```powershell
# Opción 1: Eliminar volúmenes (borra datos)
docker-compose down -v
docker-compose up -d

# Opción 2: Ejecutar scripts manualmente
docker exec -it centros_evaluacion_db bash /container-entrypoint-initdb.d/00_setup.sh
```

---

## 🐛 Troubleshooting

### El contenedor Oracle no inicia
```powershell
docker logs centros_evaluacion_db
# Verifica que el puerto 1521 no esté en uso
# Espera 2-3 minutos en primer levantamiento
```

### No puedo conectarme a la BD
```powershell
# Verifica que Oracle esté listo
docker exec centros_evaluacion_db healthcheck.sh

# Espera a que el healthcheck sea "healthy"
docker ps
```

### La API no se conecta a la BD
```powershell
# Verifica variables de entorno
docker exec centros_evaluacion_api env | grep DB_

# Ver logs de la API
docker logs -f centros_evaluacion_api
```

### Limpiar todo y empezar de nuevo
```powershell
# Apagar y eliminar todo (¡cuidado con datos!)
docker-compose down -v
docker system prune -a

# Reconstruir desde cero
docker-compose build --no-cache
docker-compose up -d
```

---

## 📧 Contacto y Soporte

- **Universidad:** San Carlos de Guatemala
- **Carrera:** Ingeniería en Informática
- **Curso:** SBD1 - Semestre 2026
- **Proyecto:** Sistemas de Base de Datos

---

## 📄 Licencia

Proyecto académico - Derechos reservados Universidad San Carlos de Guatemala

---

**Última actualización:** Abril 2026
