package peep.xchange.Users;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.jdbc.DataJdbcTest;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Import;
import org.springframework.data.jdbc.repository.config.EnableJdbcRepositories;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;

import static org.assertj.core.api.Assertions.assertThat;

@DataJdbcTest
@ContextConfiguration(classes = UserRepositoryTests.Config.class)
class UserRepositoryTests {

    @Configuration
    @EnableJdbcRepositories(basePackages = "peep.xchange.Users")
    @ComponentScan(basePackages = "peep.xchange.Users")
    @Import({UserService.class})
    static class Config {
    }

    @Autowired
    private UserRepository userRepository;

    @Test
    void testFindByUsername() {
        User user = new User(null, "testuser", "password", "ROLE_USER");
        userRepository.save(user);

        User foundUser = userRepository.findByUsername("testuser");
        assertThat(foundUser).isNotNull();
        assertThat(foundUser.getUsername()).isEqualTo("testuser");
    }

    @Test
    void testExistsByUsername() {
        User user = new User(null, "testuser", "password", "ROLE_USER");
        userRepository.save(user);

        boolean exists = userRepository.existsByUsername("testuser");
        assertThat(exists).isTrue();
    }

    @Test
    void testFindAll() {
        User user1 = new User(null, "testuser1", "password1", "ROLE_USER");
        User user2 = new User(null, "testuser2", "password2", "ROLE_USER");
        userRepository.save(user1);
        userRepository.save(user2);

        Page<User> usersPage = userRepository.findAll(PageRequest.of(0, 10));
        assertThat(usersPage.getContent()).hasSize(6);
    }

    @Test
    void testSaveUser() {
        User user = new User(null, "testuser", "password", "ROLE_USER");
        User savedUser = userRepository.save(user);

        assertThat(savedUser).isNotNull();
        assertThat(savedUser.getId()).isNotNull();
    }

    @Test
    void testDeleteUser() {
        User user = new User(null, "testuser", "password", "ROLE_USER");
        User savedUser = userRepository.save(user);
        userRepository.deleteById(savedUser.getId());

        boolean exists = userRepository.findById(savedUser.getId()).isPresent();
        assertThat(exists).isFalse();
    }
}
