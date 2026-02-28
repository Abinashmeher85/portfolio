package library;

/**
 * Main entry point for the Library Management System.
 */
public class Main {
    public static void main(String[] args) {
        System.out.println("========================================");
        System.out.println("   WELCOME TO LIBRARY MANAGEMENT SYSTEM");
        System.out.println("========================================");
        System.out.println();
        
        // Create and start the library
        Library library = new Library();
        library.showMenu();
    }
}
