# SQL DDL Generator

Generate SQL DDL (Data Definition Language) scripts for various database systems. Supports PostgreSQL, MySQL, SQLite, and SQL Server.

## Quick Start

```bash
# Generate SQL for an entity
# Usage: bash scripts/generate-sql.sh <entity-name> [database-type] [output-dir]
bash scripts/generate-sql.sh User postgresql ./sql
```

**Parameters**:
- `entity-name`: The name of the entity (e.g., User, Product, Order)
- `database-type`: Optional database type (postgresql, mysql, sqlite, mssql) - default: postgresql
- `output-dir`: Optional output directory (default: current directory)

**AI Agent Notes**:
- Entity name should be PascalCase (e.g., User, ProductCategory)
- Script generates: CREATE TABLE, ALTER TABLE (foreign keys), CREATE INDEX
- Follows database-specific best practices for each DBMS
- Includes soft delete support (active flag)
- Generates proper constraints and indexes

## Generated SQL Structure

```sql
-- Tables
CREATE TABLE users (...);

-- Indexes
CREATE INDEX idx_users_email ON users(email);

-- Foreign Keys (if relationships defined)
ALTER TABLE orders ADD CONSTRAINT fk_orders_user ...
```

## Database Support

| Database | File Extension | Notes |
|----------|----------------|-------|
| PostgreSQL | .sql | DEFAULT, SERIAL, UUID, JSONB |
| MySQL | .mysql | AUTO_INCREMENT, ENUM |
| SQLite | .sqlite | INTEGER PRIMARY KEY |
| SQL Server | .mssql | IDENTITY, NVARCHAR |

## Coding Standards

This skill follows these ASDM specifications:

### Required Specs

- **SQL General**: `.asdm/specs/sql/` - Follow SQL naming conventions, best practices

### Naming Conventions

- **Tables**: lowercase with underscores (e.g., `user_accounts`, `product_categories`)
- **Columns**: lowercase with underscores (e.g., `created_at`, `is_active`)
- **Primary Keys**: `id` or `{table_name}_id`
- **Foreign Keys**: `{referenced_table}_id` (e.g., `user_id`, `product_id`)
- **Indexes**: `idx_{table_name}_{column}`
- **Constraints**: `fk_{table_name}_{referenced_table}`, `uq_{table_name}_{column}`

### SQL Patterns

- Use explicit table aliases
- Always define primary keys
- Add created_at and updated_at timestamps
- Use soft delete (active/deleted flag) instead of physical delete
- Add proper indexes for frequently queried columns
- Use appropriate data types per database

## Customization

- Modify column types based on your database
- Adjust constraints as needed
- Add additional indexes for performance
- Configure cascade delete rules
