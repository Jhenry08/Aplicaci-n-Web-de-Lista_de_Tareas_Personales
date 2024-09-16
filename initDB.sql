CREATE DATABASE IF NOT EXISTS lista_tareas;
USE lista_tareas;

CREATE TABLE IF NOT EXISTS tareas (
  id_tarea INT AUTO_INCREMENT PRIMARY KEY,
  titulo VARCHAR(255) NOT NULL,
  descripcion TEXT,
  prioridad ENUM('baja', 'media', 'alta') DEFAULT 'media',
  estado BOOLEAN DEFAULT 0,
  fecha_creacion DATETIME DEFAULT CURRENT_TIMESTAMP,
  fecha_finalizacion DATETIME NULL
);
