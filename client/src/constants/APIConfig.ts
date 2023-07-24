export const APIConfig = {
  baseURL: "http://localhost:8000/api",
  endpoints: {
    getAllBooks: "/books",
    getBook: (isbn: string) => `/books/${isbn}`,
    createBook: "/books",
    updateBook: (isbn: string) => `/books/${isbn}`,
    deleteBook: (isbn: string) => `/books/${isbn}`,
  },
};
