export type Book = {
  isbn: string;
  title: string;
  author: string;
  publication_year: string;
  publisher: string;
  image_url_s: string;
  image_url_m: string;
  image_url_l: string;
};

export interface RatedBook extends Book {
  avg_rating?: number;
  num_ratings?: number;
}
