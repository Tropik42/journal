-- CREATE DATABASE perntodo;

--Таблица с заметками
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    time TIMESTAMP(0) DEFAULT now(),
    description VARCHAR(255),
    done BOOLEAN DEFAULT FALSE,
    type VARCHAR(30)
);
--Таблица с заметками
CREATE TABLE todo(
    todo_id SERIAL PRIMARY KEY,
    time TIMESTAMP(0) DEFAULT now(),
    description VARCHAR(255),
    done BOOLEAN DEFAULT FALSE,
    type VARCHAR(30),
    deleted BOOLEAN default FALSE,
    comment VARCHAR(511) default null
);
--таблица с типами заметок
CREATE TABLE types(
    type_id SERIAL PRIMARY KEY,
    time TIMESTAMP(0) DEFAULT now(),
    description VARCHAR(100)
);

--Добавить новый столбец
ALTER TABLE todo
ADD type VARCHAR(30);

--Добавить новый столбец
ALTER TABLE todo
ADD deleted BOOLEAN default FALSE;

--Добавить новый столбец
ALTER TABLE todo
ADD comment VARCHAR(511) default null;

--Добавить в метку времени значение по умолчанию
ALTER TABLE todo
ALTER COLUMN time 
SET DEFAULT now();

--Изменить тип столбца с меткой времени на строку
ALTER TABLE todo
ALTER COLUMN time 
TYPE VARCHAR(30);

--Вставить новую строку
INSERT INTO todo (description, type)
VALUES
('Помыть кота', 'Домашнее');

--Вставить новую строку
INSERT INTO types (description)
VALUES
('Девочки');

--Вывести всю таблицу
SELECT * FROM todo;

--Удалить указанную строку из types
DELETE FROM types WHERE type_id = 2;

--Таблица для ссылок
CREATE TABLE links(
    link_id SERIAL PRIMARY KEY,
    time TIMESTAMP(0) DEFAULT now(),
    title VARCHAR(255),
    link VARCHAR(255),
    description VARCHAR(255),
    type VARCHAR(127)
); 

INSERT INTO links (title, link, description, type)
VALUES
('Test title', 'testlink', 'test description', 'test type');

--Таблица для списков
CREATE TABLE lists(
    list_id SERIAL PRIMARY KEY,
    time TIMESTAMP(0) DEFAULT now(),
    title VARCHAR(255),
    description VARCHAR(255),
    type VARCHAR(127)
);

INSERT INTO lists (title, description, type)
VALUES
('Test title', 'test description', 'test type');

DELETE FROM lists WHERE list_id between 17 and 19
DELETE FROM todo WHERE todo_id between 466 and 500;

TEST