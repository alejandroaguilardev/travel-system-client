# Pet Travel Perú
![Pet Travel Perú Logo](https://pettravelperu.com/storage/3oI8cZmcGuWB969fhdFOoH4ysCIVEKZejFTpTSka.png)

**More than 10 years traveling happy pets**

At *Pet Travel Perú*, we are a team of professionals and veterinarians committed to your peace of mind and satisfaction. Since 2008, we have been helping to mobilize over ten thousand pets worldwide, to destinations such as the United States, European Union, Asia, Africa, and all of Latin America.

---

## Prerequisites

Before starting the system, make sure to have **Node.js** installed in your development environment.

## Configuration

Before running the application, you need to configure some environment variables. Create a `.env` file at the root of the project and set the following variables:

```env
DATABASE_URL="http://localhost:5000/api/"
```

# Features

## Project Overview

This project represents a frontend application built with the following technologies:

- **React**: A declarative, efficient, and flexible JavaScript library for building user interfaces.
- *  *ViteJS**: A fast, opinionated frontend build tool that sets up quickly with no configuration required.
- **TypeScript**: A superset of JavaScript that adds static types to the language, providing improved developer experience and code quality.
- **React Hook Form**: A library for managing forms in React with a focus on simplicity and reusability.
- **Material-UI**: A popular React UI framework that provides a set of pre-built components following Material Design principles.
- **React Router DOM**: A library for handling navigation in React applications.
- **Zustand**: A minimalistic state management library for React applications.


## Best Practices and Patterns

The project follows industry best practices and design patterns, including:

- **Strategy Pattern**: Implementing the Strategy pattern for enhanced flexibility and modularity. This pattern allows encapsulating a family of algorithms, making them interchangeable. It enables the client to choose the appropriate algorithm at runtime.

- **Hexagonal Architecture**: Structuring the application with a hexagonal architecture for better separation of concerns.

- **Repository Pattern**: Implementing the repository pattern for a clean and organized data access layer.

- **SOLID Principles**: Adhering to SOLID principles (Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, Dependency Inversion) for better maintainability and extensibility.

In addition to design patterns, the project incorporates various best practices, such as:

- **Proxy Component**: Utilizing proxy components to control access to other components, providing an additional layer for security or performance optimization.

- **State Hoisting**: Elevating state to higher-level components to manage and share state efficiently among child components.

- **Layout Component**: Implementing layout components to create consistent and reusable page structures.

- **Style Component**: Using style components to encapsulate and modularize the styling of components, promoting maintainability and reusability.

## Testing

The project is developed following the Test-Driven Development (TDD) approach, ensuring a robust and reliable codebase. Testing is conducted using:

- **Jest**: A JavaScript testing framework that ensures the reliability of the application through unit tests and end-to-end (E2E) tests.
- **Cypress**: A JavaScript end-to-end testing framework that facilitates the creation and execution of E2E tests. Cypress is utilized to simulate user interactions and behavior, providing a comprehensive testing solution for web applications.



## Project Structure
![Folders](https://i.ibb.co/WDYB5Jc/struc.png")

## App System
![Login](https://i.ibb.co/T07zFcW/login.png)
![Client](https://i.ibb.co/tBRfXQJ/client.png)
![User](https://i.ibb.co/JzyL74Z/user.png)

