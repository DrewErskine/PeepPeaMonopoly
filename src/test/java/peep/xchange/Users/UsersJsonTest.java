package peep.xchange.Users;

import java.io.IOException;

import static org.assertj.core.api.Assertions.assertThat;
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
        users = new User[] {
            new User(1L, "drew_erskine", "erskine321", "ROLE_USER"),
            new User(2L, "sara_huang", "huang321", "ROLE_ADMIN")
        };
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
                .isEqualTo("drew_erskine");
        assertThat(json.write(user)).hasJsonPathStringValue("@.password");
        assertThat(json.write(user)).extractingJsonPathStringValue("@.password")
                .isEqualTo("erskine321");
        assertThat(json.write(user)).hasJsonPathStringValue("@.role");
        assertThat(json.write(user)).extractingJsonPathStringValue("@.role")
                .isEqualTo("ROLE_USER");
    }

    @Test
    void userDeserializationTest() throws IOException {
        String expected = """
                {
                    "id": 1,
                    "username": "drew_erskine",
                    "password": "sara_huang", 
                    "role": "ROLE_USER"
                }
                """;
        User deserializedUser = json.parseObject(expected);
        assertThat(deserializedUser.getId()).isEqualTo(1L);
        assertThat(deserializedUser.getUsername()).isEqualTo("drew_erskine");
        assertThat(deserializedUser.getPassword()).isEqualTo("sara_huang");
        assertThat(deserializedUser.getRole()).isEqualTo("ROLE_USER");
    }

    @Test
    void userListSerializationTest() throws IOException {
        assertThat(jsonList.write(users)).isStrictlyEqualToJson("userList.json");
    }

    @Test
    void userListDeserializationTest() throws IOException {
        String expected = """
                [
                     {"id": 1, "username": "drew_erskine", "password": "erskine321", "role": "ROLE_USER"},
                     {"id": 2, "username": "sara_huang", "password": "huang321", "role": "ROLE_ADMIN"}
                ]
                """;
        User[] deserializedUsers = jsonList.parseObject(expected);

        assertThat(deserializedUsers).hasSize(users.length);
        for (int i = 0; i < users.length; i++) {
            assertThat(deserializedUsers[i].getId()).isEqualTo(users[i].getId());
            assertThat(deserializedUsers[i].getUsername()).isEqualTo(users[i].getUsername());
            assertThat(deserializedUsers[i].getPassword()).isEqualTo(users[i].getPassword());
            assertThat(deserializedUsers[i].getRole()).isEqualTo(users[i].getRole());
        }
    }
}
