drop schema bd_CadastroDeProduto;
create database bd_CadastroDeProduto;
use bd_CadastroDeProduto;

create table Usuario(
id_usu int primary key auto_increment,
login_usu varchar(50),
senha_usu varchar(50)
);

insert into Usuario values(01, 'PedroLucas','1234');
select * from Usuario;

create table Funcionario(
id_fun int primary key auto_increment,
nome_fun varchar(100),
cpf_fun varchar(14),
funcao_fun varchar(10),
id_usu_fk int,
foreign key (id_usu_fk) references Usuario (id_usu)
);

create table Cliente(
id_cli int primary key auto_increment,
nome_cli varchar(50),
cpf_cli varchar(14),
telefone_cli varchar(15)
);

create table Servico(
id_ser int primary key auto_increment,
diagnostico_ser varchar(50), 
pecasTrocada_ser varchar(50),
placaCarro_ser varchar(50),
id_fun_fk int, 
foreign key (id_fun_fk) references Funcionario(id_fun),
nome_fun varchar(50)
);

create table NotaServico(
id_not int primary key auto_increment,
valorTotal_not double,
id_ser_fk int,
foreign key (id_ser_fk) references Servico(id_ser),
id_fun_fk int,
foreign key (id_fun_fk) references Funcionario(id_fun),
id_cli_fk int,
foreign key (id_cli_fk) references Cliente(id_cli)
);

create table Produto(
id_prod int primary key auto_increment,
nome_prod varchar(20),
descricao_prod varchar(50),
tipo_prod varchar(30),
valor_prod double,
quantidade_prod integer,
id_fun_fk int, 
foreign key (id_fun_fk) references Funcionario(id_fun)
);

INSERT INTO Produto (nome_prod, descricao_prod, tipo_prod, valor_prod, quantidade_prod) VALUES ('penel', 'penel aro 18', 'penel trase', 25);
select * from Produto;

create table ItemNota (
id_item int primary key auto_increment,
quantidade int,
preco_unitario double,
subtotal double,
id_not_fk int,
foreign key (id_not_fk) references NotaServico(id_not),
id_prod_fk int,
foreign key (id_prod_fk) references Produto(id_prod)
);

select id_not as Nota, nome_cli as Cliente, nome_fun as Funcionario, nome_prod as Produto, quantidade, preco_unitario, subtotal,valorTotal_not AS Total
from NotaServico join Cliente on id_cli_fk = id_cli
join Funcionario on id_fun_fk = id_fun
join ItemNota on id_not = id_not_fk
join Produto on id_prod_fk = id_prod
where id_not = 1;