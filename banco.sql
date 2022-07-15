-- Criar um banco de dados chamado produtos_api 

-- Criar a tabela produtos

create table livros (
codigo serial not null primary key, 
titulo varchar(50) not null, 
preco decimal(10,2) not null, 
estoque integer not null);

-- inserir alguns registros
insert into livros (titulo, preco, estoque) values ('Tres porquinhos', 350.00, 8), ('O hobbit', 150.00, 10);
