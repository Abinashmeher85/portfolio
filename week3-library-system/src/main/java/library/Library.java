package library;

import java.util.List;
import java.util.ArrayList;
import java.util.Scanner;

/**
 * Main library management class that handles all library operations.
 */
public class Library {
    private List<Book> books;
    private List<Member> members;
    private Scanner scanner;

    public Library() {
        this.books = new ArrayList<>();
        this.members = new ArrayList<>();
        this.scanner = new Scanner(System.in);
        
        // Ensure data directory exists
        FileHandler.ensureDataDirectory();
        
        // Load data from files
        loadData();
    }

    /**
     * Loads data from files.
     */
    public void loadData() {
        books = FileHandler.loadBooks();
        members = FileHandler.loadMembers();
    }

    /**
     * Saves data to files.
     */
    public void saveData() {
        FileHandler.saveBooks(books);
        FileHandler.saveMembers(members);
    }

    /**
     * Adds a new book to the library.
     */
    public void addBook() {
        System.out.println("\n--- Add New Book ---");
        System.out.print("Enter Book ID: ");
        String id = scanner.nextLine().trim();
        
        // Check if book ID already exists
        for (Book book : books) {
            if (book.getId().equals(id)) {
                System.out.println("Error: Book with this ID already exists!");
                return;
            }
        }
        
        System.out.print("Enter Title: ");
        String title = scanner.nextLine().trim();
        System.out.print("Enter Author: ");
        String author = scanner.nextLine().trim();
        System.out.print("Enter ISBN: ");
        String isbn = scanner.nextLine().trim();
        
        Book newBook = new Book(id, title, author, isbn);
        books.add(newBook);
        saveData();
        System.out.println("Book added successfully!");
    }

    /**
     * Displays all books in the library.
     */
    public void displayBooks() {
        System.out.println("\n--- All Books ---");
        if (books.isEmpty()) {
            System.out.println("No books in the library.");
            return;
        }
        
        System.out.println("------------------------------------------------------------------");
        System.out.printf("%-10s %-25s %-20s %-15s %-10s%n", "ID", "Title", "Author", "ISBN", "Available");
        System.out.println("------------------------------------------------------------------");
        
        for (Book book : books) {
            System.out.printf("%-10s %-25s %-20s %-15s %-10s%n",
                    book.getId(),
                    truncate(book.getTitle(), 25),
                    truncate(book.getAuthor(), 20),
                    book.getIsbn(),
                    book.isAvailable() ? "Yes" : "No");
        }
        System.out.println("------------------------------------------------------------------");
    }

    /**
     * Searches for a book by ID or title.
     */
    public void searchBook() {
        System.out.println("\n--- Search Book ---");
        System.out.print("Enter search term (ID or Title): ");
        String searchTerm = scanner.nextLine().trim().toLowerCase();
        
        boolean found = false;
        for (Book book : books) {
            if (book.getId().toLowerCase().equals(searchTerm) || 
                book.getTitle().toLowerCase().contains(searchTerm)) {
                System.out.println(book);
                found = true;
            }
        }
        
        if (!found) {
            System.out.println("No book found matching: " + searchTerm);
        }
    }

    /**
     * Adds a new member to the library.
     */
    public void addMember() {
        System.out.println("\n--- Add New Member ---");
        System.out.print("Enter Member ID: ");
        String id = scanner.nextLine().trim();
        
        // Check if member ID already exists
        for (Member member : members) {
            if (member.getId().equals(id)) {
                System.out.println("Error: Member with this ID already exists!");
                return;
            }
        }
        
        System.out.print("Enter Name: ");
        String name = scanner.nextLine().trim();
        System.out.print("Enter Email: ");
        String email = scanner.nextLine().trim();
        System.out.print("Enter Phone: ");
        String phone = scanner.nextLine().trim();
        
        Member newMember = new Member(id, name, email, phone);
        members.add(newMember);
        saveData();
        System.out.println("Member added successfully!");
    }

    /**
     * Displays all members in the library.
     */
    public void displayMembers() {
        System.out.println("\n--- All Members ---");
        if (members.isEmpty()) {
            System.out.println("No members in the library.");
            return;
        }
        
        System.out.println("------------------------------------------------------------------");
        System.out.printf("%-10s %-20s %-25s %-15s %-15s%n", "ID", "Name", "Email", "Phone", "Books Borrowed");
        System.out.println("------------------------------------------------------------------");
        
        for (Member member : members) {
            System.out.printf("%-10s %-20s %-25s %-15s %-15d%n",
                    member.getId(),
                    truncate(member.getName(), 20),
                    truncate(member.getEmail(), 25),
                    member.getPhone(),
                    member.getBorrowedBooksCount());
        }
        System.out.println("------------------------------------------------------------------");
    }

    /**
     * Allows a member to borrow a book.
     */
    public void borrowBook() {
        System.out.println("\n--- Borrow Book ---");
        
        // Get member
        System.out.print("Enter Member ID: ");
        String memberId = scanner.nextLine().trim();
        Member member = findMemberById(memberId);
        
        if (member == null) {
            System.out.println("Error: Member not found!");
            return;
        }
        
        // Check if member has reached borrowing limit
        if (member.getBorrowedBooksCount() >= 3) {
            System.out.println("Error: Member has already borrowed maximum 3 books!");
            return;
        }
        
        // Get book
        System.out.print("Enter Book ID: ");
        String bookId = scanner.nextLine().trim();
        Book book = findBookById(bookId);
        
        if (book == null) {
            System.out.println("Error: Book not found!");
            return;
        }
        
        // Check if book is available
        if (!book.isAvailable()) {
            System.out.println("Error: Book is not available!");
            return;
        }
        
        // Process borrowing
        book.borrow();
        member.borrowBook(bookId);
        saveData();
        System.out.println("Book borrowed successfully!");
    }

    /**
     * Allows a member to return a book.
     */
    public void returnBook() {
        System.out.println("\n--- Return Book ---");
        
        // Get member
        System.out.print("Enter Member ID: ");
        String memberId = scanner.nextLine().trim();
        Member member = findMemberById(memberId);
        
        if (member == null) {
            System.out.println("Error: Member not found!");
            return;
        }
        
        // Get book
        System.out.print("Enter Book ID: ");
        String bookId = scanner.nextLine().trim();
        Book book = findBookById(bookId);
        
        if (book == null) {
            System.out.println("Error: Book not found!");
            return;
        }
        
        // Check if member has borrowed this book
        if (!member.getBorrowedBookIds().contains(bookId)) {
            System.out.println("Error: Member has not borrowed this book!");
            return;
        }
        
        // Process return
        book.returnBook();
        member.returnBook(bookId);
        saveData();
        System.out.println("Book returned successfully!");
    }

    /**
     * Displays books borrowed by a specific member.
     */
    public void displayMemberBorrowedBooks() {
        System.out.println("\n--- Member's Borrowed Books ---");
        
        System.out.print("Enter Member ID: ");
        String memberId = scanner.nextLine().trim();
        Member member = findMemberById(memberId);
        
        if (member == null) {
            System.out.println("Error: Member not found!");
            return;
        }
        
        List<String> borrowedIds = member.getBorrowedBookIds();
        
        if (borrowedIds.isEmpty()) {
            System.out.println("This member has not borrowed any books.");
            return;
        }
        
        System.out.println("Books borrowed by " + member.getName() + ":");
        for (String bookId : borrowedIds) {
            Book book = findBookById(bookId);
            if (book != null) {
                System.out.println("  - " + book.getTitle() + " by " + book.getAuthor());
            }
        }
    }

    /**
     * Finds a book by ID.
     */
    private Book findBookById(String id) {
        for (Book book : books) {
            if (book.getId().equals(id)) {
                return book;
            }
        }
        return null;
    }

    /**
     * Finds a member by ID.
     */
    private Member findMemberById(String id) {
        for (Member member : members) {
            if (member.getId().equals(id)) {
                return member;
            }
        }
        return null;
    }

    /**
     * Truncates a string to a maximum length.
     */
    private String truncate(String str, int maxLength) {
        if (str.length() <= maxLength) {
            return str;
        }
        return str.substring(0, maxLength - 3) + "...";
    }

    /**
     * Displays the main menu and handles user choices.
     */
    public void showMenu() {
        boolean running = true;
        
        while (running) {
            System.out.println("\n========== LIBRARY MANAGEMENT SYSTEM ==========");
            System.out.println("1. Add Book");
            System.out.println("2. Display All Books");
            System.out.println("3. Search Book");
            System.out.println("4. Add Member");
            System.out.println("5. Display All Members");
            System.out.println("6. Borrow Book");
            System.out.println("7. Return Book");
            System.out.println("8. Display Member's Borrowed Books");
            System.out.println("9. Save Data");
            System.out.println("0. Exit");
            System.out.print("Enter your choice: ");
            
            String choice = scanner.nextLine().trim();
            
            switch (choice) {
                case "1":
                    addBook();
                    break;
                case "2":
                    displayBooks();
                    break;
                case "3":
                    searchBook();
                    break;
                case "4":
                    addMember();
                    break;
                case "5":
                    displayMembers();
                    break;
                case "6":
                    borrowBook();
                    break;
                case "7":
                    returnBook();
                    break;
                case "8":
                    displayMemberBorrowedBooks();
                    break;
                case "9":
                    saveData();
                    System.out.println("Data saved successfully!");
                    break;
                case "0":
                    saveData();
                    System.out.println("Thank you for using the Library Management System!");
                    running = false;
                    break;
                default:
                    System.out.println("Invalid choice! Please try again.");
            }
        }
    }

    /**
     * Main method to start the application.
     */
    public static void main(String[] args) {
        Library library = new Library();
        library.showMenu();
    }
}
