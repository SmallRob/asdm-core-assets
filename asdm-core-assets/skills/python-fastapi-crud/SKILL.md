---
name: python-fastapi-crud
description: Generate Python CRUD operations using FastAPI and SQLAlchemy. Includes Models, Schemas, CRUD operations, and API Router templates.
---

# python-fastapi-crud

Stack: Python 3.11+ + FastAPI 0.109.x + SQLAlchemy 2.0.x + Pydantic 2.x

## Workflow

1. Generate CRUD code using the template generator
2. Review and customize the generated files
3. Run the application with uvicorn

## Quick Start

### Generate CRUD

```bash
# Generate CRUD for an entity
# Usage: bash scripts/generate-crud.sh <entity_name> [output-dir]
bash scripts/generate-crud.sh user ./src
```

**Parameters**:
- `entity_name`: The name of the entity (e.g., user, product, order)
- `output-dir`: Optional output directory (default: ./src)

**AI Agent Notes**:
- Entity name should be lowercase with underscores (e.g., user, product_category)
- Output directory should be the src folder
- The script generates: Model, Schemas, CRUD operations, API Router
- Uses Pydantic v2 for data validation
- Uses SQLAlchemy 2.0 for database operations
- Uses soft delete pattern (is_active flag)

## Generated Code Structure

```
{output-dir}/
├── models/
│   └── {entity}.py
├── schemas/
│   └── {entity}_schema.py
├── crud/
│   └── {entity}_crud.py
└── routers/
    └── {entity}.py
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /{entity_path} | List all active entities |
| GET | /{entity_path}/{id} | Get entity by ID |
| POST | /{entity_path} | Create new entity |
| PUT | /{entity_path}/{id} | Update entity |
| DELETE | /{entity_path}/{id} | Soft delete entity |

## Dependencies (requirements.txt)

```txt
fastapi==0.109.0
uvicorn[standard]==0.27.0
sqlalchemy==2.0.25
pydantic==2.5.3
pydantic-settings==2.1.0
```

## Coding Standards

This skill follows Python and FastAPI best practices:

### Naming Conventions

- **Modules/Packages**: lowercase with underscores (e.g., `user_service`, `user_router`)
- **Classes**: PascalCase (e.g., `UserService`, `UserRouter`)
- **Functions**: snake_case (e.g., `get_user`, `create_user`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `MAX_PAGE_SIZE`)

### Code Patterns

- Follow PEP 8 style guide
- Use FastAPI dependency injection
- Use Pydantic v2 for data validation
- Use SQLAlchemy 2.0 ORM patterns
- Use async/await for database operations
- Follow FastAPI router conventions
- Use type hints throughout

## Customization

- Modify model fields in the generated Model file
- Add custom queries in CRUD operations
- Configure database URL in settings
- Add routers to main.py
