package peep.xchange;

import java.net.URI;

import static org.assertj.core.api.Assertions.assertThat;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.annotation.DirtiesContext;

import com.jayway.jsonpath.DocumentContext;
import com.jayway.jsonpath.JsonPath;

import net.minidev.json.JSONArray;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT, classes = CashCardApplication.class)
class CashCardApplicationTests {
        @Autowired
        TestRestTemplate restTemplate;

        @Test
        void shouldReturnACashCardWhenDataIsSaved() {
                ResponseEntity<String> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards/1001", String.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

                DocumentContext documentContext = JsonPath.parse(response.getBody());
                Number id = documentContext.read("$.id");
                assertThat(id).isEqualTo(1001);

                Double amount = documentContext.read("$.amount");
                assertThat(amount).isEqualTo(694000.00);
        }

        @Test
        void shouldNotReturnACashCardWithAnUnknownId() {
                ResponseEntity<String> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards/9999", String.class);

                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
                assertThat(response.getBody()).isBlank();
        }

        @Test
        @DirtiesContext
        void shouldCreateANewCashCard() {
                CashCard newCashCard = new CashCard(null, 250.00, null);
                ResponseEntity<Void> createResponse = restTemplate
                                .withBasicAuth("sara", "password")
                                .postForEntity("/cashcards", newCashCard, Void.class);
                assertThat(createResponse.getStatusCode()).isEqualTo(HttpStatus.CREATED);

                URI locationOfNewCashCard = createResponse.getHeaders().getLocation();
                ResponseEntity<String> getResponse = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity(locationOfNewCashCard, String.class);
                assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);

                DocumentContext documentContext = JsonPath.parse(getResponse.getBody());
                Number id = documentContext.read("$.id");
                Double amount = documentContext.read("$.amount");

                assertThat(id).isNotNull();
                assertThat(amount).isEqualTo(250.00);
        }

        @Test
        void shouldReturnAllCashCardsWhenListIsRequested() {
                ResponseEntity<String> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards", String.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

                DocumentContext documentContext = JsonPath.parse(response.getBody());
                int cashCardCount = documentContext.read("$.length()");
                assertThat(cashCardCount).isEqualTo(3);

                JSONArray ids = documentContext.read("$..id");
                assertThat(ids).containsExactlyInAnyOrder(1001, 1002, 1004);

                JSONArray amounts = documentContext.read("$..amount");
                assertThat(amounts).containsExactlyInAnyOrder(0.0, 32.3, 694000.0);
        }

        @Test
        void shouldReturnAPageOfCashCards() {
                ResponseEntity<String> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards?page=0&size=1", String.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

                DocumentContext documentContext = JsonPath.parse(response.getBody());
                JSONArray page = documentContext.read("$[*]");
                assertThat(page.size()).isEqualTo(1);
        }

        @Test
        void shouldReturnASortedPageOfCashCards() {
                ResponseEntity<String> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards?page=0&size=1&sort=amount,desc", String.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

                DocumentContext documentContext = JsonPath.parse(response.getBody());
                JSONArray read = documentContext.read("$[*]");
                assertThat(read.size()).isEqualTo(1);

                double amount = documentContext.read("$[0].amount");
                assertThat(amount).isEqualTo(694000.00);
        }

        @Test
        void shouldReturnASortedPageOfCashCardsWithNoParametersAndUseDefaultValues() {
                ResponseEntity<String> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards", String.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.OK);

                DocumentContext documentContext = JsonPath.parse(response.getBody());
                JSONArray page = documentContext.read("$[*]");
                assertThat(page.size()).isEqualTo(3);

                JSONArray amounts = documentContext.read("$..amount");
                assertThat(amounts).containsExactly(0.00, 32.3, 694000.00);
        }

        @Test
        void shouldNotReturnACashCardWhenUsingBadCredentials() {
                ResponseEntity<String> response = restTemplate
                                .withBasicAuth("BAD-USER", "password")
                                .getForEntity("/cashcards/1001", String.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);

                response = restTemplate
                                .withBasicAuth("sara", "BAD-PASSWORD")
                                .getForEntity("/cashcards/1001", String.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        }

        @Test
        void shouldRejectUsersWhoAreNotCardOwners() {
        ResponseEntity<String> response = restTemplate
                        .withBasicAuth("evilDrew", "erskine")
                        .getForEntity("/cashcards/1003", String.class);
        assertThat(response.getStatusCode()).isEqualTo(HttpStatus.UNAUTHORIZED);
        }

        @Test
        void shouldNotAllowAccessToCashCardsTheyDoNotOwn() {
                ResponseEntity<String> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards/1005", String.class); // peep's data
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        }

        @Test
        @DirtiesContext
        void shouldUpdateAnExistingCashCard() {
                CashCard cashCardUpdate = new CashCard(null, 19.99, null);
                HttpEntity<CashCard> request = new HttpEntity<>(cashCardUpdate);
                ResponseEntity<Void> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .exchange("/cashcards/1001", HttpMethod.PUT, request, Void.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);

                ResponseEntity<String> getResponse = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards/1001", String.class);
                assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
                DocumentContext documentContext = JsonPath.parse(getResponse.getBody());
                Number id = documentContext.read("$.id");
                Double amount = documentContext.read("$.amount");
                assertThat(id).isEqualTo(1001);
                assertThat(amount).isEqualTo(19.99);
        }

        @Test
        void shouldNotUpdateACashCardThatDoesNotExist() {
                CashCard unknownCard = new CashCard(null, 19.99, null);
                HttpEntity<CashCard> request = new HttpEntity<>(unknownCard);
                ResponseEntity<Void> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .exchange("/cashcards/99999", HttpMethod.PUT, request, Void.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        }

        @Test
        void shouldNotUpdateACashCardThatIsOwnedBySomeoneElse() {
                CashCard peepCashCard = new CashCard(null, 333.33, null);
                HttpEntity<CashCard> request = new HttpEntity<>(peepCashCard);
                ResponseEntity<Void> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .exchange("/cashcards/1005", HttpMethod.PUT, request, Void.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        }

        @Test
        @DirtiesContext
        void shouldDeleteAnExistingCashCard() {
                ResponseEntity<Void> response = restTemplate
                                .withBasicAuth("sara", "password")
                                .exchange("/cashcards/1001", HttpMethod.DELETE, null, Void.class);
                assertThat(response.getStatusCode()).isEqualTo(HttpStatus.NO_CONTENT);
                ResponseEntity<String> getResponse = restTemplate
                                .withBasicAuth("sara", "password")
                                .getForEntity("/cashcards/1001", String.class);
                assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        }

        @Test
        void shouldNotDeleteACashCardThatDoesNotExist() {
                ResponseEntity<Void> deleteResponse = restTemplate
                                .withBasicAuth("sara", "password")
                                .exchange("/cashcards/99999", HttpMethod.DELETE, null, Void.class);
                assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        }

        @Test
        void shouldNotAllowDeletionOfCashCardsTheyDoNotOwn() {
            // Sara attempts to delete Peep's cash card, expecting NOT_FOUND
            ResponseEntity<Void> deleteResponse = restTemplate
                            .withBasicAuth("sara", "password")
                            .exchange("/cashcards/1005", HttpMethod.DELETE, null, Void.class);
            assertThat(deleteResponse.getStatusCode()).isEqualTo(HttpStatus.NOT_FOUND);
        
            // Verify that Peep's cash card still exists
            ResponseEntity<String> getResponse = restTemplate
                            .withBasicAuth("peep", "meow")
                            .getForEntity("/cashcards/1005", String.class);
            assertThat(getResponse.getStatusCode()).isEqualTo(HttpStatus.OK);
        }    
}
