CREATE TABLE IF NOT EXISTS tasks (
  id BIGSERIAL PRIMARY KEY,
  title VARCHAR(120) NOT NULL,
  description TEXT NOT NULL,
  status VARCHAR(20) NOT NULL DEFAULT 'PENDING',
  priority VARCHAR(20) NOT NULL DEFAULT 'MEDIUM',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  due_date TIMESTAMPTZ NOT NULL,
  CONSTRAINT tasks_status_check CHECK (status IN ('PENDING', 'COMPLETED')),
  CONSTRAINT tasks_priority_check CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH'))
);

INSERT INTO tasks (
  title,
  description,
  status,
  priority,
  created_at,
  due_date
)
SELECT
  'Database integration',
  'Connect backend with PostgreSQL',
  'PENDING',
  'HIGH',
  '2026-05-23 08:04:01.400+00',
  '2026-05-28 08:04:01.400+00'
WHERE NOT EXISTS (
  SELECT 1 FROM tasks WHERE title = 'Database integration'
);

INSERT INTO tasks (
  title,
  description,
  status,
  priority,
  created_at,
  due_date
)
SELECT
  'Mi Tarea',
  'prueba',
  'COMPLETED',
  'MEDIUM',
  '2026-05-23 08:09:35.518+00',
  '2026-12-31 03:00:00.000+00'
WHERE NOT EXISTS (
  SELECT 1 FROM tasks WHERE title = 'Mi Tarea'
);
