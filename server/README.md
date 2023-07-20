## Getting started

First you need to set your .env variables to enable connection to your local mysql server.
Next we need to use the data dump in sqldump.sql.

## Create dummy database records for testing

`php artisan db:seed --class=BooksTableSeeder --env=testing`
`php artisan db:seed --class=UserTableSeeder --env=testing`
`php artisan db:seed --class=RatingTableSeeder --env=testing`
