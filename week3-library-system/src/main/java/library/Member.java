package library;

import java.util.ArrayList;
import java.util.List;

/**
 * Represents a member of the library.
 */
public class Member {
    private String id;
    private String name;
    private String email;
    private String phone;
    private List<String> borrowedBookIds;

    public Member(String id, String name, String email, String phone) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.phone = phone;
        this.borrowedBookIds = new ArrayList<>();
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public List<String> getBorrowedBookIds() {
        return borrowedBookIds;
    }

    public void borrowBook(String bookId) {
        if (!borrowedBookIds.contains(bookId)) {
            borrowedBookIds.add(bookId);
        }
    }

    public void returnBook(String bookId) {
        borrowedBookIds.remove(bookId);
    }

    public int getBorrowedBooksCount() {
        return borrowedBookIds.size();
    }

    @Override
    public String toString() {
        return "Member{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", phone='" + phone + '\'' +
                ", borrowedBooks=" + borrowedBookIds.size() +
                '}';
    }

    /**
     * Converts member to CSV format for file storage.
     */
    public String toCSV() {
        StringBuilder sb = new StringBuilder();
        sb.append(id).append(",");
        sb.append(name).append(",");
        sb.append(email).append(",");
        sb.append(phone).append(",");
        sb.append(String.join(";", borrowedBookIds));
        return sb.toString();
    }

    /**
     * Creates a Member from CSV string.
     */
    public static Member fromCSV(String csv) {
        String[] parts = csv.split(",");
        if (parts.length >= 4) {
            Member member = new Member(parts[0], parts[1], parts[2], parts[3]);
            if (parts.length > 4 && !parts[4].isEmpty()) {
                String[] bookIds = parts[4].split(";");
                for (String bookId : bookIds) {
                    member.borrowBook(bookId.trim());
                }
            }
            return member;
        }
        return null;
    }
}
