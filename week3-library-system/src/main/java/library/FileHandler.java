package library;

import java.io.*;
import java.util.ArrayList;
import java.util.List;

/**
 * Handles file operations for books and members.
 */
public class FileHandler {
    private static final String BOOKS_FILE = "data/books.txt";
    private static final String MEMBERS_FILE = "data/members.txt";

    /**
     * Saves all books to the books file.
     */
    public static void saveBooks(List<Book> books) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(BOOKS_FILE))) {
            for (Book book : books) {
                writer.println(book.toCSV());
            }
            System.out.println("Books saved successfully.");
        } catch (IOException e) {
            System.err.println("Error saving books: " + e.getMessage());
        }
    }

    /**
     * Loads all books from the books file.
     */
    public static List<Book> loadBooks() {
        List<Book> books = new ArrayList<>();
        File file = new File(BOOKS_FILE);
        
        if (!file.exists()) {
            return books;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(BOOKS_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.trim().isEmpty()) {
                    Book book = Book.fromCSV(line);
                    if (book != null) {
                        books.add(book);
                    }
                }
            }
            System.out.println("Loaded " + books.size() + " books.");
        } catch (IOException e) {
            System.err.println("Error loading books: " + e.getMessage());
        }
        return books;
    }

    /**
     * Saves all members to the members file.
     */
    public static void saveMembers(List<Member> members) {
        try (PrintWriter writer = new PrintWriter(new FileWriter(MEMBERS_FILE))) {
            for (Member member : members) {
                writer.println(member.toCSV());
            }
            System.out.println("Members saved successfully.");
        } catch (IOException e) {
            System.err.println("Error saving members: " + e.getMessage());
        }
    }

    /**
     * Loads all members from the members file.
     */
    public static List<Member> loadMembers() {
        List<Member> members = new ArrayList<>();
        File file = new File(MEMBERS_FILE);
        
        if (!file.exists()) {
            return members;
        }

        try (BufferedReader reader = new BufferedReader(new FileReader(MEMBERS_FILE))) {
            String line;
            while ((line = reader.readLine()) != null) {
                if (!line.trim().isEmpty()) {
                    Member member = Member.fromCSV(line);
                    if (member != null) {
                        members.add(member);
                    }
                }
            }
            System.out.println("Loaded " + members.size() + " members.");
        } catch (IOException e) {
            System.err.println("Error loading members: " + e.getMessage());
        }
        return members;
    }

    /**
     * Ensures the data directory exists.
     */
    public static void ensureDataDirectory() {
        File dataDir = new File("data");
        if (!dataDir.exists()) {
            dataDir.mkdirs();
            System.out.println("Created data directory.");
        }
    }
}
