CREATE DATABASE libreria;
USE libreria;

CREATE TABLE libros(
    id_libro INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    isbn VARCHAR(20),
    titulo VARCHAR(50),
    resenia VARCHAR(50),
    id_autor INT,
    id_editorial INT,
    id_edicion INT,
    id_genero INT,
    id_subgenero int,
    id_formato INT
);
CREATE TABLE ejemplares (
    id_ejemplar INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_libro INT,
    observacion VARCHAR(50)
);
CREATE TABLE socios(
    id_socio INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fecha_nacimiento DATE,
    id_genero INT,
    dni LONG,
    direccion VARCHAR(50),
    localidad VARCHAR(50),
    id_provincia INT,
    telefono varchar(50),
    email varchar(50),
    fecha_alta DATE,
    id_categoria INT
);

CREATE TABLE empleados(
    id_empleado INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50),
    apellido VARCHAR(50),
    fecha_nacimiento DATE,
    id_genero INT,
    dni LONG,
    direccion VARCHAR(50),
    localidad VARCHAR(50),
    id_provincia INT,
    telefono varchar(50),
    email varchar(50),
    fecha_alta DATE,
    id_cargo INT
);

CREATE TABLE prestamos(
    id_prestamo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_libro INT,
    id_ejemplar INT,
    id_socio INT,
    fecha_retiro DATE,
    fecha_entrega DATE,
    Extension1 INT,
    Extension2 INT,
    Extension3 INT,
    estado INT
);
CREATE TABLE cargos_empleados (
    id_cargo INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

CREATE TABLE generos (
    id_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    genero VARCHAR(50)
);

CREATE TABLE categorias(
    id_categoria INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);
CREATE TABLE provincias(
    id_provincia INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20)
);

CREATE TABLE nacionalidades(
    id_nacionalidad INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20)
);

CREATE TABLE editoriales(
    id_editorial INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20),
    ubicacion VARCHAR(50),
    telefono VARCHAR(20),
    direccion varchar(50),
    cuit varchar(20)
);

CREATE TABLE ediciones(
    id_edicion INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    portada VARCHAR(20),
    fecha_impresion Date
);

CREATE TABLE autores(
    id_autor INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(20),
    apellido VARCHAR(20),
    id_nacionalidad VARCHAR(20)
);
CREATE TABLE generos_libros (
    id_genero INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);
CREATE TABLE subgeneros (
    id_subgenero integer NOT NULL PRIMARY KEY AUTO_INCREMENT,
    id_genero INT ,
    nombre VARCHAR(50)
);
CREATE TABLE formatos (
    id_formato INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(50)
);

DESCRIBE libros;
DESCRIBE socios;
DESCRIBE empleados;
DESCRIBE prestamos;
DESCRIBE autores;
DESCRIBE ejemplares;
DESCRIBE editoriales;
DESCRIBE ediciones;
DESCRIBE generos;
DESCRIBE subgeneros;
DESCRIBE formatos;
DESCRIBE provincias;
DESCRIBE generos_libros;
DESCRIBE categorias;
DESCRIBE cargos_empleados;
DESCRIBE nacionalidades;



INSERT INTO LIBROS (ISBN,TITULO,ID_AUTOR) VALUES ('777093274','Jari Potta y la piedra filasofal','1');
INSERT INTO LIBROS (ISBN,TITULO,ID_AUTOR) VALUES ('777093274','Jari Potta y el camaron secreto','5');

insert into ejemplares (id_libro,observacion) values ('1','Impecable estado.');
insert into ejemplares (id_libro,observacion) values ('2','Pagina 23,50,70 con marcas.');
insert into ejemplares (id_libro,observacion) values ('1','Pagina 11 con marcas.');
insert into ejemplares (id_libro,observacion) values ('1','Le falta el final.');
insert into ejemplares (id_libro,observacion) values ('2','No tiene tapa.');
insert into ejemplares (id_libro,observacion) values ('2','Excelente estado.');

insert into socios (nombre, apellido, fecha_nacimiento, id_genero, dni, direccion, localidad, id_provincia, telefono, email, fecha_alta, id_categoria) values ('Lucas', 'Dobal', '2023-08-11', '2', '12312321', 'La Crujia 3322', 'Gral San Martin', '5', '01121800293', 'lucaseld1108@gmail.com', '2023-08-11', '6');
insert into socios ( nombre, apellido, fecha_nacimiento, id_genero, dni, direccion, localidad, id_provincia, telefono, email, fecha_alta, id_categoria) values ('Manuel', 'Constenla', '1998-06-09', '3', '123123', 'Marengo', 'San Andres', '5', '12312', 'manuel@contenla.com', '2023-08-11', '7');
insert into socios (nombre, apellido, fecha_nacimiento, id_genero, dni, direccion, localidad, id_provincia, telefono, email, fecha_alta, id_categoria) values ('Lucas', 'Liotta Dobal', '2023-08-11', '2', '', 'La Crujia 3322', 'Gral San Martin', '5', '01121800293', 'lucaseld1108@gmail.com', '2023-08-11', '6');

insert into prestamos (id_libro, id_ejemplar, id_socio, fecha_retiro, fecha_entrega, Extension1, Extension2, Extension3,estado) values ( '1', '4', '1', '2023-08-01', '2023-08-11', '5', NULL, NULL,'1');
insert into prestamos (id_libro, id_ejemplar, id_socio, fecha_retiro, fecha_entrega, Extension1, Extension2, Extension3,estado) values ( '1', '4', '2', '2023-08-11', NULL, '5', NULL, NULL,'0');
insert into prestamos (id_libro, id_ejemplar, id_socio, fecha_retiro, fecha_entrega, Extension1, Extension2, Extension3,estado) values ( '1', '1', '1', '2023-08-01', '2023-08-11', NULL, NULL, NULL,'1');
insert into prestamos (id_libro, id_ejemplar, id_socio, fecha_retiro, fecha_entrega, Extension1, Extension2, Extension3,estado) values ( '2', '2', '3', '2023-08-11', NULL, NULL, NULL, NULL,'0');
insert into prestamos (id_libro, id_ejemplar, id_socio, fecha_retiro, fecha_entrega, Extension1, Extension2, Extension3,estado) values ( '1', '3', '3', '2023-08-11', NULL, NULL, NULL, NULL,'0');


insert into autores (nombre, apellido, id_nacionalidad) values ( 'Autor', 'Prueba', '1');
insert into autores (nombre, apellido, id_nacionalidad) values ( 'Paulo', 'Cohelo', '4');

insert into generos (genero) values ("Masculino");
insert into generos (genero) values ("Femenino");

insert into provincias (id_provincia,nombre) values ('5', 'Buenos Aires');
insert into provincias (id_provincia,nombre) values ('7', 'Cordoba');
insert into provincias (id_provincia,nombre) values ('9', 'Catamarca');
insert into provincias (id_provincia,nombre) values ('11', 'Formosa');
insert into provincias (id_provincia,nombre) values ('12', 'Tierra del Fuego');
insert into provincias (id_provincia,nombre) values ('13', 'San Juan');

insert into categorias values ('6','Administrador');
insert into categorias values ('7','Cadete');
insert into nacionalidades values ('1','Argentino');
insert into nacionalidades values ('2','Peruano');
insert into nacionalidades values ('4','Paraguayo');















