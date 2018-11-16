-- ************************************************************
--   Nom de la base   :  BANKONET
--   Nom de SGBD      :  MySQL Workbench 6.3 CE
--   Date de mdification:  03/11/2012  15:18
--   Auteur :  ANTOINE RIBAL & THEO TENAGUILLO
-- ************************************************************
DROP DATABASE IF exists BANKONET;
CREATE DATABASE IF NOT EXISTS BANKONET;
USE BANKONET;

-- ************************************************************
--   Table : USERS
-- ************************************************************
create table clients
(
   ID_CLIENT  INT NOT NULL AUTO_INCREMENT,
   NOM   varchar(255),
   PRENOM  varchar(255),
   EMAIL varchar(255) UNIQUE,
   PASS varchar(255),
   TEL varchar(255),
   PRIMARY KEY (ID_CLIENT)

);
-- ************************************************************
--   Table : QCM
-- ************************************************************
create table comptes
(
   ID_COMPTE  INT NOT NULL AUTO_INCREMENT,
   INTITULE   varchar(255),
   SOLDE  double,
   DECOUVERT double,
   INTERET double,
   SOLDEMIN	double,
   ID_CLIENT INT NOT NULL,
   DTYPE varchar(2),
   PRIMARY KEY (ID_COMPTE)
);

-- ************************************************************
--   ADD CONTRAINT
-- ************************************************************
ALTER TABLE COMPTES ADD CONSTRAINT fk_comptes_ID_CLIENT FOREIGN KEY(ID_CLIENT) references CLIENTS(ID_CLIENT);

insert into clients (NOM, PRENOM, EMAIL,PASS, TEL) values ('a', 'a', 'a@a.a', 'a', '0678564738'); 
insert into clients (NOM, PRENOM, EMAIL,PASS, TEL) values ('b', 'b', 'b@b.b', 'b', '0689675698'); 

insert into comptes (INTITULE, SOLDE, DECOUVERT,ID_CLIENT, DTYPE) values ('compte Courant à A', 17899, 500 , 1, 'CC'); 
insert into comptes (INTITULE, SOLDE, INTERET, SOLDEMIN,ID_CLIENT, DTYPE) values ('compte Epargne1 à A', 200000, 2 , 1000 , 1, 'CE');
insert into comptes (INTITULE, SOLDE, INTERET, SOLDEMIN,ID_CLIENT, DTYPE) values ('compte Epargne2 à A', 3428466, 2 , 1000 , 1, 'CE');  

insert into comptes (INTITULE, SOLDE, DECOUVERT,ID_CLIENT, DTYPE) values ('compte Courant à B', 2000, 500 , 2, 'CC'); 
insert into comptes (INTITULE, SOLDE, INTERET, SOLDEMIN,ID_CLIENT, DTYPE) values ('compte Epargne1 à B', 382944, 2 , 1000 , 2, 'CE'); 
insert into comptes (INTITULE, SOLDE, INTERET, SOLDEMIN,ID_CLIENT, DTYPE) values ('compte Epargne2 à B', 34782456, 2 , 1000 , 2, 'CE'); 


