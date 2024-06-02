# Peep Pea Ponopoly

**LIVE DEMO:** [Watch on YouTube](https://youtu.be/u7EFFxZ7kOc)

This demo is super cool and rare, check it out! It's the first one ever included in the README. Shout out to my graphics professor, Mr. Fredricks, who encouraged me to do this because he doesn't like reading. Honestly, that's a vibe. I support it heavily—more people should just ship their coding clips to YouTube! Don't let Sara be a hater.


---

PeepMonopoly is a full-stack application developed using Spring Boot 3 for the backend and React for the frontend. This README is divided into multiple sections for easier navigation.

## Table of Contents

1. [Project Overview](#project-overview)
2. [Spring Boot Application](#spring-boot-application)
3. [PeeppeaReact Application](#peeppeareact-application)
4. [Postman Ponus Points](#postman-ponus-points) - https://documenter.getpostman.com/view/33305065/2sA3QwapMe

---

## Project Overview

PeepMonopoly is designed to manage users and cash cards with functionalities encapsulated in various Java classes and React components.

### Project Structure
```
PeepMonopoly
│
├── .gradle
├── .vscode
├── build
├── gradle
├── src
│   ├── main
│   │   ├── java
│   │   │   └── peep
│   │   │       └── xchange
│   │   │           ├── Users
│   │   │           │   ├── User.java
│   │   │           │   ├── UserController.java
│   │   │           │   ├── UserRepository.java
│   │   │           │   ├── UserService.java
│   │   │           ├── CashCard
│   │   │           │   ├── CashCard.java
│   │   │           │   ├── CashCardController.java
│   │   │           │   ├── CashCardRepository.java
│   │   │           ├── Config
│   │   │           │   ├── SecurityConfig.java
│   │   │           │   └── WebConfig.java
│   │   │           ├── CashCardApplication.java
│   │   └── resources
│   │       ├── static
│   │       │   └── index.html
│   │       ├── application.properties
│   │       └── schema.sql
│   └── test
│       ├── java
│       │   └── peep
│       │       └── xchange
│       │           └── Users
│       │           │    ├── UserControllerTests.java
│       │           │    ├──UserJsonTest.java
│       │           ├── CashCardApplicationTests.java
│       │           ├── CashCardJsonTest.java
│       └── resources
│           └── data.sql
└── peeppeareact
    └── src
        ├── App.js
        ├── index.js
        ├── components
        │   ├── CashCardDetail
        │   │   ├── CashCardDetail.js
        │   │   ├── CashCardDetail.css
        │   │   └── CashCardDetailContainer.js
        │   ├── CashCardForm
        │   │   ├── CashCardForm.js
        │   │   ├── CashCardForm.css
        │   │   └── CashCardFormContainer.js
        │   ├── CashCardList
        │   │   ├── CashCardList.js
        │   │   ├── CashCardList.css
        │   │   └── CashCardListContainer.js
        │   └── common
        │       ├── Header.js
        │       ├── Footer.js
        │       ├── LoginForm.js
        │       ├── Home.js
        │       └── PrivateRoute.js
        └── api
            └── apiClient.js
```

### Setup and Build Instructions

#### Prerequisites

Ensure you have the following installed:
- Java 21
- Node.js
- npm
- Gradle

### Backend (Spring Boot)

1. Navigate to the project directory:
   ```sh
   cd C:\Users\Dmers\Code\Spring\PeepMonopoly
   ```

2. Clean and build the project:
   ```sh
   ./gradlew clean build
   ```

3. Run the application:
   ```sh
   ./gradlew bootRun
   ```

### Frontend (React)

1. Navigate to the React project directory:
   ```sh
   cd src/main/peeppeareact
   ```

2. Build the React application:
   ```sh
   npm run build
   ```

3. Copy the build output to the Spring Boot resources static directory:
   ```sh
   cp -r build/* ../resources/static/
   ```

## Running the Application

After setting up and building both the backend and frontend, you can run the application using the following command:
```sh
./gradlew bootRun
```

## Contribution

Feel free to fork this repository and make contributions. Pull requests are welcome.

## License

This project is licensed under the MIT License - see the LICENSE.md file for details.

---

## Spring Boot Application

The Spring Boot application is the backend of the PeepMonopoly project. It manages users and cash cards, provides RESTful APIs, and integrates with the frontend React application.

### Components

#### User.java

- Represents a user entity.
- Contains fields for ID, username, password, and role.
- Includes a default constructor for JPA and another constructor with parameters for user details.
- Provides standard getters and setters for each field.

#### UserController.java

- Handles HTTP requests related to user operations.
- Includes methods for creating, reading, updating, and deleting users.
- Uses `UserService` to manage user data and operations.

#### UserRepository.java

- Provides database operations for users.
- Extends `CrudRepository` to leverage Spring Data JPA functionalities.
- Includes a method to find users by username.

#### UserService.java

- Contains business logic related to users.
- Uses `UserRepository` for database operations and `PasswordEncoder` for encoding passwords.
- Provides methods for getting all users, getting a user by ID, creating, updating, and deleting users.

#### CashCard.java

- Represents a cash card entity.
- Contains fields for ID, amount, and owner.

#### CashCardApplication.java

- Entry point for the Spring Boot application.
- Configures and runs the application.

#### CashCardController.java

- Handles HTTP requests related to cash card operations.
- Includes methods for creating, reading, updating, and deleting cash cards.

#### CashCardRepository.java

- Provides database operations for cash cards.
- Extends JpaRepository to leverage Spring Data JPA functionalities.

#### SecurityConfig.java

- Configures security settings for the application.
- Defines in-memory user details for testing purposes.
- Disables CSRF protection and enables basic authentication.

### Testing

Test classes are located under the `src/test` directory.

- **CashCardApplicationTests.java**: Contains tests for the CashCard application.
- **CashCardJsonTest.java**: Tests for JSON responses related to cash cards.

### Resources

Resource files such as SQL schemas, JSON data, and application properties are located under the `src/main/resources` and `src/test/resources` directories.

### Detailed Build Instructions

1. **Clean and Build:**
   ```sh
   ./gradlew clean build
   ```

2. **Run the Application:**
   ```sh
   ./gradlew bootRun
   ```

---

## PeeppeaReact Application

*Placeholder for the PeeppeaReact application details. This section will be expanded with specific information about the React frontend, its structure, and how to work with it.*

### Setup

Detailed setup instructions for the React application will be provided here.

### Components

Overview of the various components used in the React application.

### API Integration

Details about API integration and data handling.
```
