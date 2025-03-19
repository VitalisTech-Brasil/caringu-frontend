DROP DATABASE IF EXISTS `vitalis`;
CREATE DATABASE IF NOT EXISTS `vitalis` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;
USE `vitalis` ;

-- -----------------------------------------------------
-- Tabela `vitalis`.`pessoas`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`pessoas` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `senha` VARCHAR(16) NOT NULL,
  `cpf` VARCHAR(11) NOT NULL,
  `celular` VARCHAR(11) NULL DEFAULT NULL,
  `data_nascimento` DATE NULL DEFAULT NULL,
  `genero` ENUM('M', 'F', 'Não Binário', 'Outro', 'Prefiro não informar') NULL DEFAULT NULL,
  `data_cadastro` TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email` (`email` ASC) VISIBLE,
  UNIQUE INDEX `cpf` (`cpf` ASC) VISIBLE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO pessoas (nome, email, senha, cpf, celular, data_nascimento, genero) VALUES
('Carlos Silva', 'carlos@email.com', '54321', '12345678901', '999991111', '1990-05-12', 'M'),
('Ana Souza', 'ana@email.com', '12345', '22345678901', '999992222', '1985-08-25', 'F'),
('Roberto Lima', 'roberto@email.com', '90901', '32345678901', '999993333', '1995-03-10', 'M'),
('Mariana Oliveira', 'mariana@email.com', '2004', '42345678901', '999994444', '1998-11-30', 'F'),
('Lucas Ferreira', 'lucas@email.com', '99333', '52345678901', '999995555', '1992-07-20', 'M'),
('Juliana Costa', 'juliana@email.com', '00998', '62345678901', '999996666', '1980-12-05', 'F');

-- -----------------------------------------------------
-- Tabela `vitalis`.`alunos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`alunos` (
  `id` INT NOT NULL,
  `peso` DECIMAL(5,2) NULL,
  `altura` DECIMAL(3,2) NULL,
  `deficiencia` BOOLEAN NOT NULL,
  `lesao` BOOLEAN NOT NULL,
  `condicao_medica` BOOLEAN NOT NULL,
  `nivel_atividade` ENUM("Sedentário", "Levemente Ativo", "Moderadamente Ativo", "Muito Ativo", "Extremamente Ativo") NOT NULL,
  `frequencia_treino` ENUM("1x", "2x", "3x", "Mais de 3") NOT NULL,
  `objetivo` ENUM("Emagrecimento", "Hipertrofia", "Condicionamento Físico", "Reabilitação", "Ganho de Força", "Treinamento Funcional", "Alívio do Estresse", "Outros") NOT NULL,
  
  PRIMARY KEY (`id`),
  CONSTRAINT `alunos_ibfk_1` FOREIGN KEY (`id`) REFERENCES `vitalis`.`pessoas` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO alunos (id, peso, altura, deficiencia, lesao, condicao_medica, nivel_atividade, frequencia_treino, objetivo) VALUES
(1, 75.5, 1.78, FALSE, FALSE, FALSE, "Levemente Ativo", "1x", 'Hipertrofia'),
(3, 68.0, 1.65, FALSE, TRUE, FALSE, "Moderadamente Ativo", "2x", 'Emagrecimento'),
(5, 82.3, 1.80, TRUE, TRUE, TRUE, "Sedentário", "1x", 'Condicionamento Físico');

-- -----------------------------------------------------
-- Tabela `vitalis`.`personal_trainers`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`personal_trainers` (
  `id` INT NOT NULL,
  `cref` CHAR(9) NOT NULL,
  `especialidade` VARCHAR(255) NOT NULL,
  `experiencia` INT NOT NULL COMMENT 'Anos de experiência',
  `valor_aulas` DECIMAL(6,2) NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `cref_UNIQUE` (`cref` ASC) VISIBLE,
  CONSTRAINT `personal_trainers_ibfk_1` FOREIGN KEY (`id`) REFERENCES `vitalis`.`pessoas` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO personal_trainers (id, cref, especialidade, experiencia, valor_aulas) VALUES
(2, "2XXXXXXXX", 'Musculação e Hipertrofia', 10, 100.00),
(4, "4XXXXXXXX", 'Treinamento Funcional e Emagrecimento', 8, 250.00),
(6, "6XXXXXXXX", 'Condicionamento e Performance', 12, 89.00);

-- -----------------------------------------------------
-- Tabela `vitalis`.`exercicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`exercicios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `grupo_muscular` ENUM('Peitoral', 'Costas', 'Pernas', 'Ombro', 'Braço', 'Core', 'Cardio') NOT NULL,
  
  PRIMARY KEY (`id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO exercicios (nome, grupo_muscular) 
VALUES 
('Supino Reto', 'Peitoral'),
('Supino Inclinado', 'Peitoral'),
('Crucifixo Inclinado', 'Peitoral'),
('Elevação Lateral', 'Ombro'),
('Leg Press', 'Pernas'),
('Agachamento Búlgaro', 'Pernas');


-- -----------------------------------------------------
-- Tabela `vitalis`.`treinos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`treinos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(100) NOT NULL,
  `descricao` TEXT NULL DEFAULT NULL,
  `personal_id` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  CONSTRAINT `treinos_ibfk_1` FOREIGN KEY (`personal_id`) REFERENCES `vitalis`.`personal_trainers` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;
-- -----------------------------------------------------
-- Tabela `vitalis`.`treinos_exercicios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`treinos_exercicios` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `treino_id` INT NOT NULL,
  `exercicio_id` INT NOT NULL,
  `carga` DECIMAL(5,2) NULL DEFAULT NULL,
  `repeticoes` INT NULL DEFAULT NULL,
  `series` INT NULL DEFAULT NULL,
  `descanso` INT NULL DEFAULT NULL COMMENT 'Descanso em segundos',
  
  PRIMARY KEY (`id`),
  UNIQUE INDEX `treino_id` (`treino_id` ASC, `exercicio_id` ASC) VISIBLE,
  CONSTRAINT `treinos_exercicios_ibfk_1` FOREIGN KEY (`treino_id`) REFERENCES `vitalis`.`treinos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `treinos_exercicios_ibfk_2` FOREIGN KEY (`exercicio_id`) REFERENCES `vitalis`.`exercicios` (`id`) ON DELETE CASCADE
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

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


-- -----------------------------------------------------
-- Tabela `vitalis`.`alunos_treinos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`alunos_treinos` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alunos_id` INT NOT NULL,
  `treinos_exercicios_id` INT NOT NULL,
  `data_inicio` DATE NOT NULL,
  `data_fim` DATE NULL DEFAULT NULL COMMENT 'Data de término do treino',
  `periodo_avaliacao` INT NOT NULL COMMENT 'Período em dias para ser feita a avaliação novamente',
  
  PRIMARY KEY (`id`, `alunos_id`, `treinos_exercicios_id`),
  CONSTRAINT `alunos_treinos_ibfk_1` FOREIGN KEY (`alunos_id`) REFERENCES `vitalis`.`alunos` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_alunos_treinos_treinos_exercicios1` FOREIGN KEY (`treinos_exercicios_id`) REFERENCES `vitalis`.`treinos_exercicios` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

INSERT INTO alunos_treinos (alunos_id, treinos_exercicios_id, data_inicio, data_fim, periodo_avaliacao) 
VALUES
(1, 1, '2024-01-10', '2024-02-10', 60), 
(1, 2, '2024-02-15', NULL, 90),  
(3, 2, '2024-01-20', '2024-02-20', 60),  
(3, 2, '2024-02-25', NULL, 180),  
(5, 1, '2024-01-05', NULL, 60);

-- -----------------------------------------------------
-- Tabela `vitalis`.`estados`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`estados` (
  `id` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `vitalis`.`cidades`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`cidades` (
  `id` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `estados_id` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_cidades_estados1` FOREIGN KEY (`estados_id`) REFERENCES `vitalis`.`estados` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `vitalis`.`bairros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`bairros` (
  `id` INT NOT NULL,
  `nome` VARCHAR(45) NOT NULL,
  `cidades_id` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_bairros_cidades1` FOREIGN KEY (`cidades_id`) REFERENCES `vitalis`.`cidades` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `vitalis`.`pessoas_bairros`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`pessoas_bairros` (
  `pessoas_id` INT NOT NULL,
  `bairros_id` INT NOT NULL,
  
  PRIMARY KEY (`pessoas_id`, `bairros_id`),
  CONSTRAINT `fk_pessoas_has_bairros_pessoas1` FOREIGN KEY (`pessoas_id`) REFERENCES `vitalis`.`pessoas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_pessoas_has_bairros_bairros1` FOREIGN KEY (`bairros_id`) REFERENCES `vitalis`.`bairros` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Tabela `vitalis`.`anamnese`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`anamnese` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `alunos_id` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  UNIQUE (`alunos_id` ASC) VISIBLE,
  CONSTRAINT `fk_anamnese_alunos1` FOREIGN KEY (`alunos_id`) REFERENCES `vitalis`.`alunos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `vitalis`.`planos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`planos` (
  `alunos_id` INT NOT NULL,
  `personal_trainers_id` INT NOT NULL,
  `aulas_restantes` INT NOT NULL,
  `data_inicio` DATE NOT NULL,
  `date_fim` DATE NULL,
  
  PRIMARY KEY (`alunos_id`, `personal_trainers_id`),
  CONSTRAINT `fk_alunos_has_personal_trainers_alunos1` FOREIGN KEY (`alunos_id`) REFERENCES `vitalis`.`alunos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_alunos_has_personal_trainers_personal_trainers1` FOREIGN KEY (`personal_trainers_id`) REFERENCES `vitalis`.`personal_trainers` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) 
ENGINE = InnoDB 
DEFAULT CHARACTER SET = utf8mb4 
COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Tabela `vitalis`.`topicos`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`topicos` (
  `id` INT NOT NULL,
  `titulo` VARCHAR(45) NULL,
  `descricao` TEXT NULL,
  `data_criacao` DATETIME NULL,
  `pessoas_id` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_topicos_pessoas1` FOREIGN KEY (`pessoas_id`) REFERENCES `vitalis`.`pessoas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;


-- -----------------------------------------------------
-- Tabela `vitalis`.`comentarios`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `vitalis`.`comentarios` (
  `id` INT NOT NULL,
  `topicos_id` INT NOT NULL,
  `descricao` TEXT NOT NULL,
  `data_criacao` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `pessoas_id` INT NOT NULL,
  
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_comentarios_topicos1` FOREIGN KEY (`topicos_id`) REFERENCES `vitalis`.`topicos` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  CONSTRAINT `fk_comentarios_pessoas1` FOREIGN KEY (`pessoas_id`) REFERENCES `vitalis`.`pessoas` (`id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB;

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
JOIN alunos a ON at.alunos_id = a.id
JOIN pessoas p_aluno ON a.id = p_aluno.id
JOIN treinos t ON at.treinos_exercicios_id = t.id
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
    at.data_fim
FROM alunos_treinos at
JOIN alunos a ON at.alunos_id = a.id
JOIN pessoas p_aluno ON a.id = p_aluno.id
JOIN treinos t ON at.treinos_exercicios_id = t.id
JOIN personal_trainers pt ON t.personal_id = pt.id
JOIN pessoas p_personal ON pt.id = p_personal.id
JOIN treinos_exercicios te ON t.id = te.treino_id
JOIN exercicios e ON te.exercicio_id = e.id
WHERE a.id = 1  
ORDER BY at.data_inicio DESC;
