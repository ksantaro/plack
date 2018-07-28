# Plack

NOTICE
--------------
This project is still in development


Prerequiesites
--------------
1. [PostgreSQL] (https://www.postgresql.org/)
2. [NodeJS] (https://nodejs.org/en/)

PostgreSQL Setup
--------------
1. Start Postgres
2. create database with 'CREATE DATABASE plack;'
3. create user with 'CREATE USER plack WITH PASSWORD 'plack;'
4. grant privileges to user with 'GRANT ALL PRIVILEGES ON DATABASE plack to plack;'
5. After running npm install in back end go into the folder ./plack-backend and run 'npm run set-tables' to add the tables to the database

## How to run front end
1. At root folder
2. npm install
3. npm start

## How to run back end
1. In folder  ./plack-backend
2. npm install
3. npm start
