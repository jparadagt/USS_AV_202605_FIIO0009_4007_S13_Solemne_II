# TaskManager Pro

Aplicacion web de gestion de tareas desarrollada con Angular, Express y PostgreSQL.

---

## Tecnologias

- Angular
- TypeScript
- Express.js
- PostgreSQL
- Docker
- Bootstrap

---

## Funcionalidades

- CRUD de tareas
- Filtros de tareas
- Busqueda de tareas
- Reportes de tareas
- Alertas de tareas
- Diseno responsivo
- Integracion con API REST
- Persistencia en PostgreSQL

---

## Arquitectura

Angular Frontend -> Express API -> PostgreSQL Database

---

## Ejecutar frontend

```bash
cd frontend
npm install
npm start
```

Frontend:

```txt
http://localhost:4200
```

---

## Ejecutar backend

```bash
cd backend
npm install
node server.js
```

Backend:

```txt
http://localhost:3000/tasks
```

---

## Ejecutar con Docker

```bash
docker-compose up --build
```

Si tu entorno tiene Docker Compose v2:

```bash
docker compose up --build
```

Frontend:

```txt
http://localhost:4200
```

Backend:

```txt
http://localhost:3000/tasks
```

---

## Base de datos

PostgreSQL se ejecuta en el puerto 5432.

Base de datos:

```txt
taskmanager
```

El esquema inicial de la base de datos y los datos de prueba estan en:

```txt
database/init.sql
```

Ejecutar bootstrap manualmente:

```bash
cd backend
npm run bootstrap
```

Ejecutar bootstrap con Docker Compose:

```bash
docker-compose run --rm backend npm run bootstrap
```

---

## Variables de entorno

Variables de base de datos para el backend:

```txt
DB_HOST=postgres
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=postgres
DB_NAME=taskmanager
```

---

## Autor

Jonathan Parada Gaete
