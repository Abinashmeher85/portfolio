package library;

/**
 * Represents a book in the library system.
 */
public class Book {
    private String id;
    private String title;
    private String author;
    private String isbn;
    private boolean isAvailable;

    public Book(String id, String title, String author, String isbn) {
        this.id = id;
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.isAvailable = true;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getAuthor() {
        return author;
    }

    public void setAuthor(String author) {
        this.author = author;
    }

    public String getIsbn() {
        return isbn;
    }

    public void setIsbn(String isbn) {
        this.isbn = isbn;
    }

    public boolean isAvailable() {
        return isAvailable;
    }

    public void setAvailable(boolean available) {
        isAvailable = available;
    }

    public void borrow() {
        this.isAvailable = false;
    }

    public void returnBook() {
        this.isAvailable = true;
    }

    @Override
    public String toString() {
        return "Book{" +
                "id='" + id + '\'' +
                ", title='" + title + '\'' +
                ", author='" + author + '\'' +
                ", isbn='" + isbn + '\'' +
                ", available=" + isAvailable +
                '}';
    }

    /**
     * Converts book to CSV format for file storage.
     */
    public String toCSV() {
        return id + "," + title + "," + author + "," + isbn + "," + isAvailable;
    }

    /**
     * Creates a Book from CSV string.
     */
    public static Book fromCSV(String csv) {
        String[] parts = csv.split(",");
        if (parts.length >= 5) {
            Book book = new Book(parts[0], parts[1], parts[2], parts[3]);
            book.setAvailable(Boolean.parseBoolean(parts[4]));
            return book;
        }
        return null;
    }
}
