<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement("
            CREATE OR REPLACE VIEW `books_rated` AS
            SELECT
                `books`.`title` AS `title`,
                `books`.`author` AS `author`,
                `books`.`isbn` AS `isbn`,
                `books`.`publication_year` AS `publication_year`,
                `books`.`publisher` AS `publisher`,
                `books`.`image_url_s` AS `image_url_s`,
                `rt`.`avg_rating` AS `avg_rating`,
                `rt`.`num_ratings` AS `num_ratings`
            FROM
                `books`
            LEFT JOIN (
                SELECT
                    `ratings`.`isbn` AS `isbn`,
                    AVG(`ratings`.`rating`) AS `avg_rating`,
                    COUNT(`ratings`.`user_id`) AS `num_ratings`
                FROM
                    `ratings`
                GROUP BY
                    `ratings`.`isbn`
            ) `rt` ON `books`.`isbn` = `rt`.`isbn`
        ");
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement("DROP VIEW IF EXISTS `books_rated`");
    }
};
