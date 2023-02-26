# NLW Setup - Django e React

# Descrição

Aplicação desenvolvida durante o NLW Setup - Ignite.
Utilizando Django Rest Framework e React

# Guia para instalação

## Dependências

* [Node.JS versão 16.16.0](https://nodejs.org/dist/v16.16.0/)
* [MySQL versão 8.0.30](https://downloads.mysql.com/archives/installer/)
* [Python versão 3.11.1](https://www.python.org/downloads/)

## Rodando o projeto

* Abra um terminal na pasta do projeto e copie os comandos abaixo:

```
    cd ./api
    python -m venv '.venv'
    .\.venv\Scripts\Activate.ps1
    pip install -r requirements.txt
    cd ../frontend/
    npm install
```
* Abra o **MySQL command line client**, faça login e digite os comandos abaixo:

```
    create database nlwsetup;
    use nlwsetup;
```

* Crie o arquivo **env.py** na raíz da API, usando como base o arquivo **env_example.py**, utilizando suas credenciais (obs.: não é uma boa prática este método, será corrigido em versões futuras)

* No terminal, crie as tabelas do banco de dados:
```
    cd ../api
    python manage.py migrate
    python manage.py makemigrations
```

* Inicie o servidor:

```
    python manage.py runserver
```

* Em outro terminal, inicie o frontend:
```
    cd ./frontend
    npm run dev
```
