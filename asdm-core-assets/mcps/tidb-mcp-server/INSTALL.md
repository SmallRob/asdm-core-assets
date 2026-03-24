# Installation Guide

This guide provides detailed installation instructions for the TiDB MCP Server. The server supports multiple transport methods and can be configured for different AI assistant platforms.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Installation Methods](#installation-methods)
  - [Using uv (Recommended)](#using-uv-recommended)
  - [Using pip](#using-pip)
- [Configuration](#configuration)
- [Transport Methods](#transport-methods)
  - [stdio Transport](#stdio-transport)
  - [SSE Transport](#sse-transport)
  - [HTTP Transport](#http-transport)
- [AI Assistant Integration](#ai-assistant-integration)
  - [Claude Desktop](#claude-desktop)
  - [VS Code](#vs-code)
  - [Cursor](#cursor)
  - [Docker](#docker)
- [Verification](#verification)
- [Troubleshooting](#troubleshooting)

## Prerequisites

Before installing the TiDB MCP Server, ensure you have:

1. **Python 3.13 or higher**
   ```bash
   python --version  # Should show Python 3.13.x or higher
   ```

2. **uv package manager (recommended)** or pip
   ```bash
   # Install uv
   curl -LsSf https://astral.sh/uv/install.sh | sh
   
   # Or on Windows
   powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
   ```

3. **TiDB Serverless Account**
   - Create a free account at [tidbcloud.com](https://tidbcloud.com)
   - Create a TiDB Serverless cluster
   - Obtain connection credentials

## Installation Methods

### Using uv (Recommended)

The recommended way to install the TiDB MCP Server is using the `uv` package manager:

```bash
# Clone the repository
git clone https://github.com/c4pt0r/mcp-server-tidb
cd mcp-server-tidb

# Create virtual environment and install dependencies
uv venv
uv pip install -e .
```

### Using pip

Alternatively, you can use the standard pip package manager:

```bash
# Clone the repository
git clone https://github.com/c4pt0r/mcp-server-tidb
cd mcp-server-tidb

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -e .
```

## Configuration

### Environment Variables

Create a `.env` file in the project root directory with your TiDB credentials:

```bash
# Copy the example file
cp .env.example .env
```

Edit the `.env` file with your TiDB Serverless connection details:

```env
# Required: TiDB Serverless Connection Details
TIDB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
TIDB_PORT=4000
TIDB_USERNAME=xxxxxxxxxx.root
TIDB_PASSWORD=your_password_here
TIDB_DATABASE=test

# Optional: SSL Certificate Path (defaults are provided for macOS/Linux)
SSL_CERT_PATH=/etc/ssl/certs/ca-certificates.crt
```

### Getting TiDB Credentials

1. **Create TiDB Cloud Account**
   - Visit [tidbcloud.com](https://tidbcloud.com)
   - Sign up for a free account

2. **Create a Cluster**
   - Click "Create Cluster"
   - Select "Serverless" tier (free)
   - Choose your preferred region
   - Click "Create"

3. **Get Connection Details**
   - Go to your cluster dashboard
   - Click "Connect" button
   - Choose "General" connection method
   - Copy the connection details:
     - Host: `gateway01.us-east-1.prod.aws.tidbcloud.com`
     - Port: `4000`
     - Username: `xxxxxxxxxx.root`
     - Password: (your cluster password)

4. **Configure Database**
   - The default database is `test`
   - You can create additional databases using SQL statements

## Transport Methods

The TiDB MCP Server supports three transport methods:

### stdio Transport

The simplest method, using standard input/output for communication.

**Command:**
```bash
uv --directory /path/to/mcp-server-tidb run src/main.py
```

**Or with Python directly:**
```bash
python /path/to/mcp-server-tidb/src/main.py
```

**Features:**
- Simple configuration
- No network setup required
- Best for local development
- Default transport method

### SSE Transport

Server-Sent Events transport for HTTP-based connections.

**Command:**
```bash
uv --directory /path/to/mcp-server-tidb run src/main.py --transport sse --port 8080
```

**Features:**
- HTTP-based communication
- Suitable for remote access
- Supports multiple clients
- Built-in CORS support

### HTTP Transport

Standard HTTP transport for RESTful API access.

**Command:**
```bash
uv --directory /path/to/mcp-server-tidb run src/main.py --transport http --port 8080
```

**Features:**
- Standard HTTP protocol
- Easy integration with web services
- Supports load balancing
- Can be deployed behind reverse proxies

## AI Assistant Integration

### Claude Desktop

Configure Claude Desktop to use the TiDB MCP Server:

**Configuration File Location:**
- **macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`
- **Windows**: `%APPDATA%\Claude\claude_desktop_config.json`
- **Linux**: `~/.config/Claude/claude_desktop_config.json`

**stdio Transport Configuration:**
```json
{
  "mcpServers": {
    "tidb": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/mcp-server-tidb",
        "run",
        "src/main.py"
      ],
      "env": {
        "TIDB_HOST": "gateway01.us-east-1.prod.aws.tidbcloud.com",
        "TIDB_PORT": "4000",
        "TIDB_USERNAME": "xxxxxxxxxx.root",
        "TIDB_PASSWORD": "your_password",
        "TIDB_DATABASE": "test"
      }
    }
  }
}
```

**WSL Configuration (if running in WSL):**
```json
{
  "mcpServers": {
    "tidb": {
      "command": "wsl.exe",
      "args": [
        "bash",
        "-c",
        "/path/to/uv --directory /path/to/mcp-server-tidb run python src/main.py"
      ],
      "env": {
        "TIDB_HOST": "gateway01.us-east-1.prod.aws.tidbcloud.com",
        "TIDB_PORT": "4000",
        "TIDB_USERNAME": "xxxxxxxxxx.root",
        "TIDB_PASSWORD": "your_password",
        "TIDB_DATABASE": "test"
      }
    }
  }
}
```

### VS Code

Configure VS Code MCP extension:

**Settings (settings.json):**
```json
{
  "mcp.servers": {
    "tidb": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/mcp-server-tidb",
        "run",
        "src/main.py"
      ],
      "env": {
        "TIDB_HOST": "gateway01.us-east-1.prod.aws.tidbcloud.com",
        "TIDB_PORT": "4000",
        "TIDB_USERNAME": "xxxxxxxxxx.root",
        "TIDB_PASSWORD": "your_password",
        "TIDB_DATABASE": "test"
      }
    }
  }
}
```

### Cursor

Configure Cursor IDE:

**Configuration File**: `~/.cursor/mcp_config.json`

```json
{
  "mcpServers": {
    "tidb": {
      "command": "uv",
      "args": [
        "--directory",
        "/path/to/mcp-server-tidb",
        "run",
        "src/main.py"
      ],
      "env": {
        "TIDB_HOST": "gateway01.us-east-1.prod.aws.tidbcloud.com",
        "TIDB_PORT": "4000",
        "TIDB_USERNAME": "xxxxxxxxxx.root",
        "TIDB_PASSWORD": "your_password",
        "TIDB_DATABASE": "test"
      }
    }
  }
}
```

### Docker

Run the TiDB MCP Server in a Docker container:

**Dockerfile:**
```dockerfile
FROM python:3.13-slim

WORKDIR /app

# Install uv
RUN pip install uv

# Copy project files
COPY . .

# Install dependencies
RUN uv pip install --system -e .

# Set environment variables
ENV TIDB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
ENV TIDB_PORT=4000
ENV TIDB_USERNAME=xxxxxxxxxx.root
ENV TIDB_PASSWORD=your_password
ENV TIDB_DATABASE=test

# Run the server
CMD ["python", "src/main.py"]
```

**Build and Run:**
```bash
# Build the image
docker build -t tidb-mcp-server .

# Run the container
docker run -d \
  --name tidb-mcp \
  -e TIDB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com \
  -e TIDB_PORT=4000 \
  -e TIDB_USERNAME=xxxxxxxxxx.root \
  -e TIDB_PASSWORD=your_password \
  -e TIDB_DATABASE=test \
  tidb-mcp-server
```

**Docker Compose:**
```yaml
version: '3.8'

services:
  tidb-mcp-server:
    build: .
    container_name: tidb-mcp-server
    environment:
      - TIDB_HOST=gateway01.us-east-1.prod.aws.tidbcloud.com
      - TIDB_PORT=4000
      - TIDB_USERNAME=xxxxxxxxxx.root
      - TIDB_PASSWORD=your_password
      - TIDB_DATABASE=test
    restart: unless-stopped
```

## Verification

### Test Connection

After installation, verify the server is working:

```bash
# Run the server directly to test
cd /path/to/mcp-server-tidb
uv run src/main.py
```

You should see output like:
```
Starting tidb serverless mcp server...
🔄 Getting database connection
Connecting to database test@gateway01.us-east-1.prod.aws.tidbcloud.com:4000
Successfully connected to database
Connection pool initialized successfully
```

### Test with AI Assistant

1. Restart your AI assistant (Claude Desktop, VS Code, etc.)
2. Ask the assistant to query your TiDB database:
   ```
   Please show me all tables in my test database
   ```

3. The assistant should list your database tables.

### Test SQL Operations

Test various SQL operations:

```python
# Test query
db_query(
    db_name="test",
    sql="SELECT CURRENT_USER()"
)

# Test table creation
db_execute(
    db_name="test",
    sql_stmts="CREATE TABLE IF NOT EXISTS test_table (id INT PRIMARY KEY, name VARCHAR(100))"
)

# Test insert
db_execute(
    db_name="test",
    sql_stmts="INSERT INTO test_table (id, name) VALUES (1, 'Test')"
)
```

## Troubleshooting

### Common Issues

#### 1. Connection Timeout

**Symptom:** `Connection timeout` or `Failed to connect to database`

**Solutions:**
- Verify your TiDB credentials are correct
- Check if your IP is whitelisted in TiDB Cloud
- Ensure you're using the correct host and port
- Verify SSL certificate path for your OS

#### 2. SSL Certificate Error

**Symptom:** `SSL certificate verification failed`

**Solutions:**
- Set the correct SSL certificate path:
  ```bash
  # macOS
  export SSL_CERT_PATH=/private/etc/ssl/cert.pem
  
  # Linux
  export SSL_CERT_PATH=/etc/ssl/certs/ca-certificates.crt
  
  # Windows (download certificate first)
  set SSL_CERT_PATH=C:\path\to\cert.pem
  ```

#### 3. Import Errors

**Symptom:** `ModuleNotFoundError: No module named 'mcp'`

**Solutions:**
- Ensure you've activated the virtual environment
- Reinstall dependencies: `uv pip install -e .`
- Check Python version: `python --version`

#### 4. Permission Denied

**Symptom:** `Permission denied` when running the server

**Solutions:**
- Check file permissions: `ls -la`
- Make the script executable: `chmod +x src/main.py`
- Run with correct user permissions

#### 5. Environment Variables Not Loaded

**Symptom:** `Missing environment variables for database connection`

**Solutions:**
- Verify `.env` file exists in project root
- Check `.env` file format (no spaces around `=`)
- Ensure python-dotenv is installed: `uv pip install python-dotenv`
- Set environment variables explicitly in your shell

### Debug Mode

Enable debug logging:

```python
import logging
logging.basicConfig(level=logging.DEBUG)
```

Or set environment variable:
```bash
export LOG_LEVEL=DEBUG
```

### Getting Help

- **GitHub Issues**: [mcp-server-tidb/issues](https://github.com/c4pt0r/mcp-server-tidb/issues)
- **TiDB Documentation**: [docs.pingcap.com/tidbcloud/](https://docs.pingcap.com/tidbcloud/)
- **MCP Documentation**: [modelcontextprotocol.io](https://modelcontextprotocol.io/)

## Security Best Practices

1. **Never commit `.env` files** to version control
2. **Use environment variables** for sensitive credentials
3. **Rotate passwords** regularly
4. **Limit database user permissions** to minimum required
5. **Use TiDB Cloud IP whitelist** for additional security
6. **Enable SSL/TLS** for all connections (default)
7. **Monitor connection logs** for suspicious activity

## Next Steps

After successful installation:

1. Read the [README.md](README.md) for detailed feature documentation
2. Explore the [config.json](config.json) for tool configurations
3. Check the TiDB Cloud dashboard for database metrics
4. Review connection pool settings in `src/db_client/pool.py`
5. Customize logging configuration in `src/utils/logging.py`