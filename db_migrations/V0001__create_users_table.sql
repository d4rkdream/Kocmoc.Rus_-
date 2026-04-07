CREATE TABLE IF NOT EXISTS t_p90348729_project_zenith_2024_.users (
  id SERIAL PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  level INTEGER DEFAULT 1,
  xp INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT NOW()
);

INSERT INTO t_p90348729_project_zenith_2024_.users (name, email, password_hash)
VALUES ('Алексей Петров', 'pilot@kosmos.ru', '$2b$12$LQv3c1yqBWVHxkd0LHAkCOYz6TtxMRJGHKe8H.u7V5eJ3zM4lNqnO')
ON CONFLICT (email) DO NOTHING;
