# Library Management System

A simple Java-based library management system that allows managing books and members, with the ability to borrow and return books.

## Features

- **Book Management**: Add, display, and search books
- **Member Management**: Add and display library members
- **Borrowing System**: Members can borrow up to 3 books
- **Return System**: Members can return borrowed books
- **Data Persistence**: Books and members data are saved to text files

## Project Structure

```
week3-library-system/
├── src/
│   └── main/
│       └── java/
│           └── library/
│               ├── Main.java
│               ├── Book.java
│               ├── Member.java
│               ├── Library.java
│               └── FileHandler.java
├── data/
│   ├── books.txt
│   └── members.txt
├── pom.xml
└── README.md
```

## Prerequisites

- Java JDK 11 or higher
- Maven 3.6 or higher

## How to Run

1. Navigate to the project directory:
   
```
bash
   cd week3-library-system
   
```

2. Compile the project:
   
```
bash
   mvn compile
   
```

3. Run the application:
   
```
bash
   mvn exec:java
   
```

   Or alternatively:
   
```
bash
   mvn clean compile exec:java
   
```

## Usage

When the application starts, you'll see a menu with the following options:

1. **Add Book** - Add a new book to the library
2. **Display All Books** - View all books in the library
3. **Search Book** - Search for a book by ID or title
4. **Add Member** - Add a new member to the library
5. **Display All Members** - View all library members
6. **Borrow Book** - A member borrows a book
7. **Return Book** - A member returns a book
8. **Display Member's Borrowed Books** - View books borrowed by a member
9. **Save Data** - Manually save all data to files
0. **Exit** - Exit the application (automatically saves data)

## Data Storage

The system stores data in text files in the `data/` directory:
- `books.txt` - Contains all book records
- `members.txt` - Contains all member records

Data is automatically saved when you exit the application or when you choose option 9.

## Example Usage

### Adding a Book
```
1. Add Book
Enter Book ID: B001
Enter Title: The Great Gatsby
Enter Author: F. Scott Fitzgerald
Enter ISBN: 978-0743273565
Book added successfully!
```

### Adding a Member
```
4. Add Member
Enter Member ID: M001
Enter Name: John Doe
Enter Email: john.doe@email.com
Enter Phone: 555-1234
Member added successfully!
```

### Borrowing a Book
```
6. Borrow Book
Enter Member ID: M001
Enter Book ID: B001
Book borrowed successfully!
```

## License

This project is for educational purposes.
