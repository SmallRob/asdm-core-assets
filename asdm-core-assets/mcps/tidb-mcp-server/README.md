# TiDB MCP Server

[![Version](https://img.shields.io/badge/version-0.1.0-blue.svg)](https://github.com/c4pt0r/mcp-server-tidb)
[![Python](https://img.shields.io/badge/python-3.13+-green.svg)](https://www.python.org/)
[![License](https://img.shields.io/badge/license-Apache%202.0-orange.svg)](LICENSE)

A comprehensive Model Context Protocol (MCP) server for TiDB Serverless database operations. This server enables AI assistants to query, manage, and execute SQL statements on TiDB databases with built-in connection pooling, transaction support, and automatic retry logic.

## Overview

TiDB MCP Server provides a robust interface for AI assistants to interact with TiDB Serverless databases. It supports all essential database operations including querying, executing SQL statements, managing database users, and inspecting table structures. The server implements best practices for database connectivity including connection pooling, exponential backoff retry logic, and SSL/TLS encryption.

## Features

- **Database Operations**: Execute queries and SQL statements on TiDB databases
- **Table Inspection**: Show all tables and get table creation SQL
- **User Management**: Create and remove database users
- **Connection Management**: Get server connection information
- **Connection Pooling**: Thread-safe connection pool with automatic connection management
- **Retry Logic**: Exponential backoff retry mechanism for network errors
- **Transaction Support**: Built-in transaction management with automatic rollback
- **SSL/TLS Security**: Secure connections with SSL certificate verification
- **TiDB Syntax**: Optimized for TiDB-specific SQL syntax

## Directory Structure

```
tidb-mcp-server/
├── .env.example                          # Environment variables template
├── LICENSE                               # Apache License 2.0
├── pyproject.toml                        # Python project configuration
├── README.md                             # This file
├── INSTALL.md                            # Installation instructions
├── config.json                           # Tool definitions and configurations
└── src/
    ├── main.py                           # Main MCP server entry point
    ├── db_client/
    │   ├── __init__.py                   # Package initialization
    │   ├── db.py                         # Database connection and operations
    │   └── pool.py                       # Connection pool implementation
    └── utils/
        └── logging.py                    # Logging utilities with thread info
```

## Tools

### 1. show_tables

Show all tables in a specific database.

**Parameters:**
- `db_name` (string): The name of the database to show tables from

**Returns:** List of table names

**Example:**
```python
# Get all tables from 'mydb' database
tables = show_tables(db_name="mydb")
# Returns: ['users', 'orders', 'products']
```

### 2. db_query

Execute SQL queries on TiDB database with best practices.

**Parameters:**
- `db_name` (string): The name of the database to query
- `sql` (string): The SQL query string (always include LIMIT and ORDER BY)

**Returns:** List of tuples containing query results

**Best Practices:**
- SQL is always a string
- Always add LIMIT in the query
- Always add ORDER BY in the query
- Use TiDB syntax instead of MySQL

**Example:**
```python
# Query data from a table
results = db_query(
    db_name="mydb",
    sql="SELECT * FROM users ORDER BY created_at DESC LIMIT 100"
)
```

### 3. show_create_table

Show the CREATE TABLE SQL statement for a specific table.

**Parameters:**
- `db_name` (string): The name of the database
- `table` (string): The name of the table

**Returns:** CREATE TABLE SQL statement as string

**Example:**
```python
# Get table creation SQL
create_sql = show_create_table(db_name="mydb", table="users")
# Returns: "CREATE TABLE `users` (\n  `id` int NOT NULL, ..."
```

### 4. db_execute

Execute SQL statements on a specific database with transaction support.

**Parameters:**
- `db_name` (string): The name of the database
- `sql_stmts` (string | list[string]): One or more SQL statements to execute

**Returns:** "success" string on successful execution

**Best Practices:**
- SQL statements are always strings or list of strings
- Always use transactions for executing SQL statements
- Use TiDB syntax instead of MySQL

**Example:**
```python
# Execute single SQL statement
db_execute(
    db_name="mydb",
    sql_stmts="INSERT INTO users (name, email) VALUES ('John', 'john@example.com')"
)

# Execute multiple SQL statements
db_execute(
    db_name="mydb",
    sql_stmts=[
        "INSERT INTO users (name, email) VALUES ('John', 'john@example.com')",
        "INSERT INTO orders (user_id, product) VALUES (1, 'Product A')"
    ]
)
```

### 5. create_db_user

Create a new database user with automatic username prefix handling.

**Parameters:**
- `username` (string): The username for the new user
- `password` (string): The password for the new user

**Returns:** Success message with the full username (including prefix)

**Example:**
```python
# Create a new database user
result = create_db_user(username="myuser", password="mypassword")
# Returns: "success, username: prefix.myuser"
```

### 6. remove_db_user

Remove a database user from TiDB Serverless.

**Parameters:**
- `username` (string): The username to remove (can be with or without prefix)

**Returns:** Success message with the full username

**Example:**
```python
# Remove a database user
result = remove_db_user(username="myuser")
# Returns: "success, username: prefix.myuser"
```

### 7. get_tidb_serverless_address

Get the connection host and port for the TiDB Serverless instance.

**Parameters:** None

**Returns:** Connection address in format "host:port"

**Example:**
```python
# Get server address
address = get_tidb_serverless_address()
# Returns: "gateway01.us-east-1.prod.aws.tidbcloud.com:4000"
```

## Prerequisites

- Python 3.13 or higher
- uv package manager (recommended) or pip
- TiDB Serverless account (free tier available at [tidbcloud.com](https://tidbcloud.com))

## Quick Start

### 1. Clone and Install

```bash
# Clone the repository
git clone https://github.com/c4pt0r/mcp-server-tidb
cd mcp-server-tidb

# Install using uv (recommended)
uv venv
uv pip install -e .

# Or install using pip
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -e .
```

### 2. Configure Environment

Copy the example environment file and configure your TiDB credentials:

```bash
cp .env.example .env
```

Edit `.env` with your TiDB Serverless credentials:

```env
TIDB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
TIDB_PORT=4000
TIDB_USERNAME=xxxxxxxxxx.root
TIDB_PASSWORD=your_password
TIDB_DATABASE=test
```

### 3. Get TiDB Credentials

1. Visit [tidbcloud.com](https://tidbcloud.com) and create a free account
2. Create a new TiDB Serverless cluster
3. Go to the cluster dashboard and click "Connect"
4. Copy the connection details to your `.env` file

## Usage Examples

### Basic Query

```python
# Query data from a table
results = db_query(
    db_name="mydb",
    sql="SELECT * FROM users WHERE status = 'active' ORDER BY created_at DESC LIMIT 50"
)
```

### Insert Data

```python
# Insert a single record
db_execute(
    db_name="mydb",
    sql_stmts="INSERT INTO products (name, price, stock) VALUES ('Widget', 29.99, 100)"
)

# Insert multiple records in a transaction
db_execute(
    db_name="mydb",
    sql_stmts=[
        "INSERT INTO products (name, price, stock) VALUES ('Widget A', 29.99, 100)",
        "INSERT INTO products (name, price, stock) VALUES ('Widget B', 39.99, 50)",
        "UPDATE inventory SET last_updated = NOW()"
    ]
)
```

### Table Management

```python
# List all tables in a database
tables = show_tables(db_name="mydb")

# Get table structure
create_sql = show_create_table(db_name="mydb", table="users")
```

### User Management

```python
# Create a new database user
result = create_db_user(username="app_user", password="secure_password")
print(result)  # Output: success, username: prefix.app_user

# Remove a database user
result = remove_db_user(username="app_user")
```

## Architecture

### Connection Pool

The server uses a thread-safe connection pool with the following features:

- **Minimum Connections**: 10 connections maintained at all times
- **Maximum Connections**: Up to 100 connections supported
- **Connection Validation**: Automatic ping to verify connection health
- **Connection Reuse**: Efficient connection reuse for better performance
- **Automatic Reconnection**: Connection re-establishment on failure

### Retry Logic

The server implements exponential backoff retry logic:

- **Max Retries**: 5 attempts
- **Backoff Strategy**: Exponential (2^i seconds delay)
- **Retry Conditions**: Network and interface errors
- **Non-Retryable Errors**: SQL syntax and logical errors

### Transaction Management

```python
# Transactions are automatically managed
with db.transaction():
    db.execute("INSERT INTO orders (user_id, amount) VALUES (1, 99.99)")
    db.execute("UPDATE users SET order_count = order_count + 1 WHERE id = 1")
    # Auto-commit on success, auto-rollback on exception
```

## Security

- **SSL/TLS**: All connections use SSL certificate verification
- **Certificate Validation**: Platform-specific SSL certificate paths
- **Password Protection**: Secure password handling in environment variables
- **User Isolation**: TiDB Serverless user prefix system for multi-tenant security

## Error Handling

The server provides comprehensive error handling:

- **DatabaseError**: Custom exception for all database errors
- **Connection Errors**: Automatic retry with exponential backoff
- **Transaction Errors**: Automatic rollback on exception
- **Detailed Logging**: Thread-aware logging for debugging

## Dependencies

- `mcp[cli]>=1.3.0` - Model Context Protocol SDK
- `pydantic>=2.10.6` - Data validation library
- `pymysql>=1.1.1` - MySQL/TiDB database driver
- `python-dotenv>=1.0.1` - Environment variable management

## License

This project is licensed under the Apache License 2.0 - see the [LICENSE](LICENSE) file for details.

## Author

Original implementation by [c4pt0r](https://github.com/c4pt0r/mcp-server-tidb)

## Support

For issues and feature requests, please visit the [GitHub repository](https://github.com/c4pt0r/mcp-server-tidb/issues).

## Related Resources

- [TiDB Cloud](https://tidbcloud.com)
- [TiDB Documentation](https://docs.pingcap.com/tidbcloud/)
- [Model Context Protocol](https://modelcontextprotocol.io/)
- [FastMCP Documentation](https://github.com/modelcontextprotocol/python-sdk)