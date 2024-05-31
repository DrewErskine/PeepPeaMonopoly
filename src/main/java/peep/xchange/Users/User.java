package peep.xchange.Users;

import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

/**
 * Represents a User entity in the system.
 */
@Table("users")
public class User {

    @Id
    private Long id;
    private String username;
    private String password;
    private String role;

    /**
     * Default constructor for JPA.
     */
    public User() {
        // This constructor is intentionally empty. Nothing special is needed here.
    }

    /**
     * Constructs a new User with the specified details.
     *
     * @param id The unique identifier for the user.
     * @param username The user's username.
     * @param password The user's password.
     * @param role The user's role.
     */
    public User(Long id, String username, String password, String role) {
        this.id = id;
        this.username = username;
        this.password = password;
        this.role = role;
    }

    // Standard getters and setters with minimal validation (for demonstration purposes)

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
