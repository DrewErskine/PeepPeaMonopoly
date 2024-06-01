package peep.xchange;

import java.io.IOException;
import static org.assertj.core.api.Assertions.assertThat;
import org.assertj.core.util.Arrays;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.json.JsonTest;
import org.springframework.boot.test.json.JacksonTester;

@JsonTest
class CashCardJsonTest {

    @Autowired
    private JacksonTester<CashCard> json;

    @Autowired
    private JacksonTester<CashCard[]> jsonList;

    private CashCard[] cashCards;

    @BeforeEach
    void setUp() {
        cashCards = Arrays.array(
                new CashCard(1001L, 69420.69, "sara"),
                new CashCard(1002L, 32.30, "sara"),
                new CashCard(1003L, 32.30, "drew"),
                new CashCard(1004L, 1.00, "sara"),
                new CashCard(1005L, 1.00, "peep"));
    }

    @Test
    void cashCardSerializationTest() throws IOException {
        CashCard cashCard = cashCards[0];
        assertThat(json.write(cashCard)).isStrictlyEqualToJson("single.json");
        assertThat(json.write(cashCard)).hasJsonPathNumberValue("@.id");
        assertThat(json.write(cashCard)).extractingJsonPathNumberValue("@.id")
                .isEqualTo(1001);
        assertThat(json.write(cashCard)).hasJsonPathNumberValue("@.amount");
        assertThat(json.write(cashCard)).extractingJsonPathNumberValue("@.amount")
                .isEqualTo(69420.69);
    }

    @Test
    void cashCardDeserializationTest() throws IOException {
        String expected = """
                {
                    "id": 1001,
                    "amount": 69420.69, 
                    "owner": "sara"
                }
                """;
        assertThat(json.parse(expected))
                .isEqualTo(new CashCard(1001L, 69420.69, "sara"));
        assertThat(json.parseObject(expected).id()).isEqualTo(1001L);
        assertThat(json.parseObject(expected).amount()).isEqualTo(69420.69);
    }

    @Test
    void cashCardListSerializationTest() throws IOException {
        assertThat(jsonList.write(cashCards)).isStrictlyEqualToJson("list.json");
    }

    @Test
    void cashCardListDeserializationTest() throws IOException {
        String expected = """
                [
                     {"id": 1001, "amount": 69420.69 , "owner": "sara"},
                     {"id": 1002, "amount": 32.30 , "owner": "sara"},
                     {"id": 1003, "amount": 32.30, "owner": "drew"},
                     {"id": 1004, "amount": 1.00, "owner": "sara"},
                     {"id": 1005, "amount": 1.00, "owner": "peep"}
                ]
                """;
        assertThat(jsonList.parse(expected)).isEqualTo(cashCards);
    }
}
