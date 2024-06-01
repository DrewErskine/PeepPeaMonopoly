package peep.xchange.Users;

import java.io.IOException;
import static org.assertj.core.api.Assertions.assertThat;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;

@JsonTest
class UsersJsonTest {

    @Autowired
    private JacksonTester<User> json;

    @Autowired
    private JacksonTester<User[]> jsonList;

    private User[] users;

    @BeforeEach
    void setUp() {
        users = Arrays.array(
                new User(1L, "sara", "$2a$10$DowJ/HY6y5cF2oKYOJh9guvjdgM1Wpa7.kgI8/ojChV4sLQHEO7WC", "ROLE_ADMIN"),
                new User(2L, "peep", "$2a$10$8nLaU/6v3vE1YsRrw2LxI.6xFpkzEhO/qVqeD.Bq6PHJ7TZ/hNKI2", "ROLE_USER"),
                new User(3L, "drew", "$2a$10$2TgYP4Um3roEpjvP.xRf1OPPquN0E64Vm98B24snFqU7w0PGu6Cyq", "ROLE_ADMIN"),
                new User(4L, "evilDrew", "$2a$10$2TgYP4Um3roEpjvP.xRf1OPPquN0E64Vm98B24snFqU7w0PGu6Cyq", "INVALID_ROLE")
        );
    }

    @Test
    void userSerializationTest() throws IOException {
        User user = users[0];
        assertThat(json.write(user)).isStrictlyEqualToJson("singleUser.json");
        assertThat(json.write(user)).hasJsonPathNumberValue("@.id");
        assertThat(json.write(user)).extractingJsonPathNumberValue("@.id")
                .isEqualTo(1);
        assertThat(json.write(user)).hasJsonPathStringValue("@.username");
        assertThat(json.write(user)).extractingJsonPathStringValue("@.username")
                .isEqualTo("sara");
        assertThat(json.write(user)).hasJsonPathStringValue("@.password");
        assertThat(json.write(user)).extractingJsonPathStringValue("@.password")
                .isEqualTo("$2a$10$DowJ/HY6y5cF2oKYOJh9guvjdgM1Wpa7.kgI8/ojChV4sLQHEO7WC");
        assertThat(json.write(user)).hasJsonPathStringValue("@.role");
        assertThat(json.write(user)).extractingJsonPathStringValue("@.role")
                .isEqualTo("ROLE_ADMIN");
    }

    @Test
    void userDeserializationTest() throws IOException {
        String expected = """
                {
                    "id": 1,
                    "username": "sara",
                    "password": "$2a$10$DowJ/HY6y5cF2oKYOJh9guvjdgM1Wpa7.kgI8/ojChV4sLQHEO7WC",
                    "role": "ROLE_ADMIN"
                }
                """;
        assertThat(json.parse(expected))
                .isEqualTo(new User(1L, "sara", "$2a$10$DowJ/HY6y5cF2oKYOJh9guvjdgM1Wpa7.kgI8/ojChV4sLQHEO7WC", "ROLE_ADMIN"));
        assertThat(json.parseObject(expected).getId()).isEqualTo(1L);
        assertThat(json.parseObject(expected).getUsername()).isEqualTo("sara");
        assertThat(json.parseObject(expected).getPassword()).isEqualTo("$2a$10$DowJ/HY6y5cF2oKYOJh9guvjdgM1Wpa7.kgI8/ojChV4sLQHEO7WC");
        assertThat(json.parseObject(expected).getRole()).isEqualTo("ROLE_ADMIN");
    }

    @Test
    void userListSerializationTest() throws IOException {
        assertThat(jsonList.write(users)).isStrictlyEqualToJson("userList.json");
    }

    @Test
    void userListDeserializationTest() throws IOException {
        String expected = """
                [
                    {
                        "id": 1,
                        "username": "sara",
                        "password": "$2a$10$DowJ/HY6y5cF2oKYOJh9guvjdgM1Wpa7.kgI8/ojChV4sLQHEO7WC",
                        "role": "ROLE_ADMIN"
                    },
                    {
                        "id": 2,
                        "username": "peep",
                        "password": "$2a$10$8nLaU/6v3vE1YsRrw2LxI.6xFpkzEhO/qVqeD.Bq6PHJ7TZ/hNKI2",
                        "role": "ROLE_USER"
                    },
                    {
                        "id": 3,
                        "username": "drew",
                        "password": "$2a$10$2TgYP4Um3roEpjvP.xRf1OPPquN0E64Vm98B24snFqU7w0PGu6Cyq",
                        "role": "ROLE_ADMIN"
                    },
                    {
                        "id": 4,
                        "username": "evilDrew",
                        "password": "$2a$10$2TgYP4Um3roEpjvP.xRf1OPPquN0E64Vm98B24snFqU7w0PGu6Cyq",
                        "role": "INVALID_ROLE"
                    }
                ]
                """;
        assertThat(jsonList.parse(expected)).isEqualTo(users);
    }
}
