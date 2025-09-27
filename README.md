# Spring Boot JWT & MySQL Security Project

This is a backend project built with Java and Spring Boot that demonstrates a complete user authentication and authorization system using JSON Web Tokens (JWT). It provides secure REST APIs for user registration, login, and accessing protected data, connecting to a MySQL database.

## Features

* **Secure User Authentication:** Provides a `/authenticate` endpoint for users to log in with a username and password.
* **JWT Generation:** Upon successful login, it generates a secure JWT for the user.
* **Role-Based Authorization:** The system is configured to protect certain API endpoints, allowing access only to users with a valid JWT.
* **Centralized Security Configuration:** Uses Spring Security (`WebSecurityConfig.java`) to manage all security rules in one place.
* **MySQL Database Integration:** Connects to a MySQL database to store and retrieve user information.

## Tech Stack

* **Language:** Java 17 (or your version)
* **Framework:** Spring Boot
* **Security:** Spring Security, JSON Web Tokens (JWT)
* **Database:** MySQL
* **Build Tool:** Maven

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

You need to have the following software installed on your machine:
* Java Development Kit (JDK) 17 or higher
* Apache Maven
* A running MySQL server instance

### Installation & Setup

1.  **Clone the repository**
    ```sh
    git clone [https://github.com/Yashdhekale03/your-java-project-name.git](https://github.com/Yashdhekale03/your-java-project-name.git)
    ```
2.  **Navigate into the project directory**
    ```sh
    cd your-java-project-name
    ```
3.  **Configure the Database**
    * Open the `src/main/resources/application.properties` file.
    * Update the `spring.datasource.url`, `spring.datasource.username`, and `spring.datasource.password` properties to match your local MySQL setup.

4.  **Run the Application**
    * You can run the application directly from your IDE (like IntelliJ or Eclipse).
    * Or, you can run it from the command line using Maven:
        ```sh
        mvn spring-boot:run
        ```
The server will start, typically on port 8080.

## API Endpoints

Here are the main API endpoints provided by the application:

* `POST /authenticate`: For user login.
* `POST /register`: To create a new user.
* `GET /api/hello`: An example of a secured endpoint that requires a valid JWT to access.
