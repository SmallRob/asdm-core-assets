---
name: dotnet-crud
description: Generate .NET CRUD operations using Entity Framework Core with ASP.NET Core. Includes Models, DTOs, Services, Controllers, and DbContext templates.
---

# dotnet-crud

Stack: .NET 8.0 + ASP.NET Core + Entity Framework Core

## Workflow

1. Generate CRUD code using the template generator
2. Review and customize the generated files
3. Build and run the application

## Quick Start

### Generate CRUD

```bash
# Generate CRUD for an entity
# Usage: bash scripts/generate-crud.sh <EntityName> [output-dir]
bash scripts/generate-crud.sh User ./src
```

**Parameters**:
- `EntityName`: The name of the entity (e.g., User, Product, Order)
- `output-dir`: Optional output directory (default: current directory)

**AI Agent Notes**:
- Entity name should be PascalCase (e.g., User, ProductCategory)
- Output directory should be the project src folder
- The script generates: Model, Request/Response DTOs, Service Interface & Implementation, Controller, DbContext
- Uses soft delete pattern (IsActive flag)
- Follows repository pattern with service layer

## Generated Code Structure

```
{output-dir}/
├── Controllers/
│   └── {Entity}Controller.cs
├── Models/
│   └── {Entity}.cs
├── DTOs/
│   ├── {Entity}RequestDTO.cs
│   └── {Entity}ResponseDTO.cs
├── Services/
│   ├── I{Entity}Service.cs
│   └── {Entity}Service.cs
├── Data/
│   └── ApplicationDbContext.cs
└── Program.cs (update)
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /api/{entity} | List all active entities |
| GET | /api/{entity}/{id} | Get entity by ID |
| POST | /api/{entity} | Create new entity |
| PUT | /api/{entity}/{id} | Update entity |
| DELETE | /api/{entity}/{id} | Soft delete entity |

## Dependencies

Add NuGet packages:

```xml
<PackageReference Include="Microsoft.EntityFrameworkCore" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.SqlServer" Version="8.0.0" />
<PackageReference Include="Microsoft.EntityFrameworkCore.InMemory" Version="8.0.0" />
```

## Coding Standards

This skill follows .NET best practices:

### Naming Conventions

- **Classes/Interfaces**: PascalCase (e.g., `UserService`, `UserController`)
- **Methods**: PascalCase (e.g., `GetAllAsync`, `CreateAsync`)
- **Properties**: PascalCase (e.g., `UserName`, `CreatedAt`)
- **Private Fields**: camelCase with underscore prefix (e.g., `_context`, `_repository`)

### Code Patterns

- Follow ASP.NET Core Web API conventions
- Use async/await pattern for all I/O operations
- Use dependency injection (constructor injection)
- Follow repository pattern with service layer
- Use DTOs for request/response (not exposing entities directly)
- Enable CORS if needed
- Use action filters for cross-cutting concerns

## Customization

- Modify model properties in the generated Model class
- Add custom queries in Service implementation
- Configure database provider in Program.cs
- Add authorization if needed
