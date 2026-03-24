---
name: java-springboot-crud
description: Generate Java Spring Boot CRUD operations with Spring Data JPA. Includes Entity, Repository, Service, Controller, DTO, and Mapper templates.
---

# java-springboot-crud

Stack: Java 17+ + Spring Boot 3.x + Spring Data JPA + Maven

## Workflow

1. Generate CRUD code using the template generator
2. Review and customize the generated files
3. Add business logic as needed

## Quick Start

### Generate CRUD

```bash
# Generate CRUD for an entity
# Usage: bash scripts/generate-crud.sh <entity-name> [output-dir]
bash scripts/generate-crud.sh User ./src/main/java/com/example
```

**Parameters**:
- `entity-name`: The name of the entity (e.g., User, Product, Order)
- `output-dir`: Optional output directory (default: current directory)

**AI Agent Notes**:
- Entity name should be PascalCase (e.g., User, ProductCategory)
- Output directory should be the Java package base path
- The script generates: Entity, Repository, Service, Controller, DTO, Mapper
- Uses Lombok for boilerplate reduction
- Uses MapStruct for DTO mapping
- Includes soft delete support (active flag)

## Generated Code Structure

```
{output-dir}/com/example/{entity}/
├── {Entity}Controller.java      # REST endpoints
├── {Entity}Service.java          # Business logic
├── {Entity}Repository.java      # Data access
├── {Entity}.java               # Entity class
├── {Entity}DTO.java            # Data transfer object
├── {Entity}Mapper.java          # DTO mapper
└── exception/
    ├── {Entity}NotFoundException.java
    └── GlobalExceptionHandler.java
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/{entity-path} | List all entities |
| GET | /api/{entity-path}/{id} | Get entity by ID |
| POST | /api/{entity-path} | Create new entity |
| PUT | /api/{entity-path}/{id} | Update entity |
| DELETE | /api/{entity-path}/{id} | Delete entity |

## Dependencies

Add to `pom.xml`:

```xml
<dependencies>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-web</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-data-jpa</artifactId>
    </dependency>
    <dependency>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-validation</artifactId>
    </dependency>
    <dependency>
        <groupId>org.projectlombok</groupId>
        <artifactId>lombok</artifactId>
        <optional>true</optional>
    </dependency>
    <dependency>
        <groupId>org.mapstruct</groupId>
        <artifactId>mapstruct</artifactId>
        <version>1.5.5.Final</version>
    </dependency>
</dependencies>
```

## Coding Standards

This skill follows these ASDM specifications:

### Required Specs

- **Java General**: `.asdm/specs/java-general/` - Follow Java naming conventions, coding patterns from Effective Java
- **Java Spring Boot JPA**: `.asdm/specs/java-springboot-jpa/` - Follow Spring Boot best practices, JPA patterns

### Naming Conventions

- **Classes**: PascalCase (e.g., `UserService`, `ProductController`)
- **Packages**: lowercase (e.g., `com.example.user`)
- **Methods**: camelCase (e.g., `findById`, `saveEntity`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_RETRY_COUNT`)

### Code Patterns

- Use Lombok annotations (`@Getter`, `@Setter`, `@Builder`)
- Follow Spring Boot layered architecture
- Use constructor injection (via `@RequiredArgsConstructor`)
- Enable transaction management with `@Transactional`
- Use soft delete pattern (active flag)

## Customization

- Modify entity fields in the generated Entity class
- Add custom queries in Repository
- Add business logic in Service
- Configure CORS in Controller if needed
