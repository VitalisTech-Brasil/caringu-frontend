DROP DATABASE IF EXISTS vitalis;
CREATE DATABASE IF NOT EXISTS vitalis;
USE vitalis;

CREATE TABLE IF NOT EXISTS pessoas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    senha VARCHAR(16) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    celular VARCHAR(11),
    data_nascimento DATE,
    genero ENUM('M', 'F', 'Não Binário', 'Outro', 'Prefiro não informar'),
    data_cadastro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO pessoas (nome, email, senha, celular, data_nascimento, genero) VALUES
('Carlos Silva', 'carlos@email.com', '54321', '999991111', '1990-05-12', 'M'),
('Ana Souza', 'ana@email.com', '12345', '999992222', '1985-08-25', 'F'),
('Roberto Lima', 'roberto@email.com', '90901', '999993333', '1995-03-10', 'M'),
('Mariana Oliveira', 'mariana@email.com', '2004', '999994444', '1998-11-30', 'F'),
('Lucas Ferreira', 'lucas@email.com', '99333', '999995555', '1992-07-20', 'M'),
('Juliana Costa', 'juliana@email.com', '00998', '999996666', '1980-12-05', 'F');




CREATE TABLE IF NOT EXISTS alunos (
    id INT PRIMARY KEY,
    peso DECIMAL(5, 2),
    altura DECIMAL(3, 2),
    objetivo TEXT,
    FOREIGN KEY (id) REFERENCES pessoas (id) ON DELETE CASCADE
);

INSERT INTO alunos (id, peso, altura, objetivo) VALUES
(1, 75.5, 1.78, 'Ganho de massa muscular'),
(3, 68.0, 1.65, 'Definição e emagrecimento'),
(5, 82.3, 1.80, 'Melhora da resistência física');



CREATE TABLE IF NOT EXISTS personal_trainers (
    id INT PRIMARY KEY,
    especialidade VARCHAR(255),
    experiencia INT COMMENT 'Anos de experiência',
    certificacoes TEXT,
    FOREIGN KEY (id) REFERENCES pessoas (id) ON DELETE CASCADE
);

INSERT INTO personal_trainers (id, especialidade, experiencia, certificacoes) VALUES
(2, 'Musculação e Hipertrofia', 10, 'Certificação ABC de Treinamento Físico'),
(4, 'Treinamento Funcional e Emagrecimento', 8, 'Certificado XYZ de Personal Trainer'),
(6, 'Condicionamento e Performance', 12, 'Certificação Nacional de Educação Física');

-- ---------------------------

CREATE TABLE exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    grupo_muscular ENUM('Peitoral', 'Costas', 'Pernas', 'Ombro', 'Braço', 'Core', 'Cardio') NOT NULL
);


INSERT INTO exercicios (nome, grupo_muscular) 
VALUES 
('Supino Reto', 'Peitoral'),
('Supino Inclinado', 'Peitoral'),
('Crucifixo Inclinado', 'Peitoral'),
('Elevação Lateral', 'Ombro'),
('Leg Press', 'Pernas'),
('Agachamento Búlgaro', 'Pernas');

CREATE TABLE IF NOT EXISTS treinos (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(100) NOT NULL,
    descricao TEXT,
    personal_id INT NOT NULL,
    FOREIGN KEY (personal_id) REFERENCES personal_trainers (id) ON DELETE CASCADE
);

CREATE TABLE treinos_exercicios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    treino_id INT NOT NULL,
    exercicio_id INT NOT NULL,
    carga DECIMAL(5,2),
    repeticoes INT,
    series INT,
    descanso INT COMMENT 'Descanso em segundos',
    
    UNIQUE(treino_id, exercicio_id),
    
    FOREIGN KEY (treino_id) REFERENCES treinos (id) ON DELETE CASCADE,
    FOREIGN KEY (exercicio_id) REFERENCES exercicios (id) ON DELETE CASCADE
);

INSERT INTO treinos (nome, descricao, personal_id) 
VALUES ('Treino A', 'Peitoral e Ombro', 2);

INSERT INTO treinos_exercicios (treino_id, exercicio_id, carga, repeticoes, series, descanso) 
VALUES 
(1, 1, 80.0, 10, 4, 60),  
(1, 2, 75.0, 10, 4, 60),  
(1, 4, 50.0, 12, 3, 45); 

INSERT INTO treinos (nome, descricao, personal_id) 
VALUES ('Treino B', 'Treino de Pernas', 4);

INSERT INTO treinos_exercicios (treino_id, exercicio_id, carga, repeticoes, series, descanso) 
VALUES 
(2, 5, 10.0, 12, 3, 45), 
(2, 6, 120.0, 10, 4, 60);  
-- ---------------------------------

CREATE TABLE IF NOT EXISTS alunos_treinos (
    id INT AUTO_INCREMENT,
    aluno_id INT NOT NULL,
    treino_id INT NOT NULL,
    data_inicio DATE NOT NULL,
    data_fim DATE NULL COMMENT 'Data de término do treino',
    ativo BOOLEAN DEFAULT TRUE COMMENT 'Indica se o treino está em andamento',

	PRIMARY KEY (id, aluno_id, treino_id),
    FOREIGN KEY (aluno_id) REFERENCES alunos (id) ON DELETE CASCADE,
    FOREIGN KEY (treino_id) REFERENCES treinos (id) ON DELETE CASCADE,
    
    CHECK (data_fim IS NULL OR data_fim >= data_inicio)
);

INSERT INTO alunos_treinos (aluno_id, treino_id, data_inicio, data_fim, ativo) 
VALUES
(1, 1, '2024-01-10', '2024-02-10', FALSE), 
(1, 2, '2024-02-15', NULL, TRUE),  
(3, 2, '2024-01-20', '2024-02-20', FALSE),  
(3, 2, '2024-02-25', NULL, TRUE),  
(5, 1, '2024-01-05', NULL, TRUE);


SELECT 
    t.nome AS treino, 
    e.nome AS exercicio, 
    e.grupo_muscular, 
    te.carga, 
    te.repeticoes, 
    te.series, 
    te.descanso
FROM treinos_exercicios te
JOIN treinos t ON te.treino_id = t.id
JOIN exercicios e ON te.exercicio_id = e.id
WHERE t.id = 1; 

SELECT 
    p_aluno.nome AS aluno, 
    t.nome AS treino, 
    p_personal.nome AS personal_trainer,
    e.nome AS exercicio,
    e.grupo_muscular,
    te.carga,
    te.repeticoes,
    te.series,
    te.descanso
FROM alunos_treinos at
JOIN alunos a ON at.aluno_id = a.id
JOIN pessoas p_aluno ON a.id = p_aluno.id
JOIN treinos t ON at.treino_id = t.id
JOIN personal_trainers pt ON t.personal_id = pt.id
JOIN pessoas p_personal ON pt.id = p_personal.id
JOIN treinos_exercicios te ON t.id = te.treino_id
JOIN exercicios e ON te.exercicio_id = e.id
WHERE a.id = 1; 

SELECT 
    p_aluno.nome AS aluno, 
    t.nome AS treino, 
    p_personal.nome AS personal_trainer,
    e.nome AS exercicio,
    e.grupo_muscular,
    te.carga,
    te.repeticoes,
    te.series,
    te.descanso,
    at.data_inicio,
    at.data_fim,
    at.ativo
FROM alunos_treinos at
JOIN alunos a ON at.aluno_id = a.id
JOIN pessoas p_aluno ON a.id = p_aluno.id
JOIN treinos t ON at.treino_id = t.id
JOIN personal_trainers pt ON t.personal_id = pt.id
JOIN pessoas p_personal ON pt.id = p_personal.id
JOIN treinos_exercicios te ON t.id = te.treino_id
JOIN exercicios e ON te.exercicio_id = e.id
WHERE a.id = 1  
ORDER BY at.data_inicio DESC;

