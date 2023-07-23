# Bookshelf

## Project Description

Fullstack developer trial. Simple CRUD application manipulating a dataset of books derived from [Kaggle](https://www.kaggle.com/datasets/saurabhbagchi/books-dataset).

## Stack

PHP/Laravel, React/TypeScript, MySQL, Node.js and Composer.

## Database Setup:

First, ensure that MySQL is installed on your system.
To import the SQL dump into your MySQL database, navigate to the directory containing the dump file and run:

mysql -u [username] -p [database_name] < sqldump.sql
Replace [username] and [database_name] with your MySQL username, the database you want to import into, respectively.

## Server Setup:

Navigate to the server directory, with `cd server`.
Install all the server dependencies with `composer install`.
To start the server, run `php artisan serve`.

## Client Setup:

Navigate to the client directory, with `cd client`.
Install all the client dependencies with `npm install`.
To start the client, run `npm start`.

## Run unit tests

Client-side: `npm test`
Server-side: `php artisan test --env=testing`
