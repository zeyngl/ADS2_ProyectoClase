Create Database Fase2;
Use Fase2;
Create Table Usuario(
id int auto_increment primary key,
nit varchar(20) not null,
nombre varchar(100) not null,
correo varchar(50) not null,
direccion varchar(200) not null,
pass varchar(50) not null,
nacimiento date not null,
tipouser int not null
);


INSERT INTO Usuario(nit,nombre,correo,direccion,pass,nacimiento,tipouser)
VALUES('1010101','Lionel Andres Messi','user','Patagonia, Argentina','123','1978-06-26',1);

INSERT INTO Usuario(nit,nombre,correo,direccion,pass,nacimiento,tipouser)
VALUES('7070707','Serre Ciete','admin','Madeira, Portugal','asd','1982-02-26',0);
Create Table Producto(
ID numeric primary key,
Nombre Varchar(50),
Precio numeric,
Categoria numeric
);
