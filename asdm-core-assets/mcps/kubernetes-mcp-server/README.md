# Kubernetes MCP Server

[![CI](https://github.com/Flux159/mcp-server-kubernetes/actions/workflows/ci.yml/badge.svg)](https://github.com/Flux159/mcp-server-kubernetes/actions/workflows/ci.yml)
[![License](https://img.shields.io/github/license/Flux159/mcp-server-kubernetes)](https://github.com/Flux159/mcp-server-kubernetes)
[![NPM Version](https://img.shields.io/npm/v/mcp-server-kubernetes)](https://www.npmjs.com/package/mcp-server-kubernetes)
[![Kubernetes](https://img.shields.io/badge/kubernetes-%23326ce5.svg?style=flat&logo=kubernetes&logoColor=white)](https://kubernetes.io/)

TypeScript MCP server for comprehensive Kubernetes cluster management via kubectl, supporting multiple transports and advanced features.

## Overview

MCP Server Kubernetes is a Model Context Protocol (MCP) server that enables AI assistants to interact with Kubernetes clusters. It provides a unified kubectl-style API for managing Kubernetes resources, along with advanced operations like Helm chart management, port forwarding, and node management.

## Features

- **Comprehensive kubectl Operations**: Full support for get, describe, apply, create, delete, logs, scale, patch, rollout, and more
- **Helm Chart Management**: Install, upgrade, and uninstall Helm charts with template mode support
- **Port Forwarding**: Forward local ports to pods and services
- **Node Management**: Cordon, drain, and uncordon nodes for maintenance
- **Pod Exec**: Execute commands inside pods and containers
- **Context Management**: Manage multiple Kubernetes contexts
- **OpenTelemetry Observability**: Optional distributed tracing for all operations
- **Security Features**: Non-destructive mode, secrets masking, and read-only mode
- **Multiple Transports**: Support for stdio, SSE, and HTTP transports

## Installation

### Prerequisites

- Node.js >= 18
- kubectl installed and configured
- Valid kubeconfig with cluster access
- Helm v3 (optional, for Helm operations)

### Quick Start

```bash
# Using npx
npx mcp-server-kubernetes

# Or install globally
npm install -g mcp-server-kubernetes
mcp-server-kubernetes
```

### Claude Desktop Configuration

Add to your Claude Desktop config (`~/Library/Application Support/Claude/claude_desktop_config.json` on macOS):

```json
{
  "mcpServers": {
    "kubernetes": {
      "command": "npx",
      "args": ["mcp-server-kubernetes"]
    }
  }
}
```

### VS Code Configuration

```json
{
  "mcpServers": {
    "kubernetes": {
      "command": "npx",
      "args": ["mcp-server-kubernetes"],
      "description": "Kubernetes cluster management and operations"
    }
  }
}
```

### Cursor Configuration

```json
{
  "mcpServers": {
    "kubernetes": {
      "command": "npx",
      "args": ["mcp-server-kubernetes"]
    }
  }
}
```

## Tools (22 Available)

### Core kubectl Operations

| Tool | Description |
|------|-------------|
| `kubectl_get` | Get or list Kubernetes resources by type, name, and namespace |
| `kubectl_describe` | Describe Kubernetes resources with detailed information |
| `kubectl_apply` | Apply YAML manifests to create or update resources |
| `kubectl_create` | Create Kubernetes resources from manifests or subcommands |
| `kubectl_delete` | Delete Kubernetes resources by type, name, or labels |
| `kubectl_logs` | Get logs from pods, deployments, jobs, or cronjobs |
| `kubectl_scale` | Scale deployments, replicasets, or statefulsets |
| `kubectl_patch` | Update resource fields using strategic/merge/json patch |
| `kubectl_rollout` | Manage deployment rollouts (history, pause, restart, resume, undo) |
| `kubectl_context` | Manage Kubernetes contexts (list, get, set) |
| `kubectl_generic` | Execute any kubectl command with custom arguments |

### Resource Discovery

| Tool | Description |
|------|-------------|
| `explain_resource` | Get documentation for Kubernetes resources and fields |
| `list_api_resources` | List all API resources available in the cluster |

### Helm Operations

| Tool | Description |
|------|-------------|
| `install_helm_chart` | Install Helm charts with template mode support |
| `upgrade_helm_chart` | Upgrade existing Helm releases |
| `uninstall_helm_chart` | Uninstall Helm releases |

### Advanced Operations

| Tool | Description |
|------|-------------|
| `port_forward` | Forward local ports to pods/services |
| `stop_port_forward` | Stop active port-forward sessions |
| `exec_in_pod` | Execute commands inside pods/containers |
| `node_management` | Cordon, drain, and uncordon nodes |

### Utility

| Tool | Description |
|------|-------------|
| `ping` | Verify connection is alive |
| `cleanup` | Cleanup managed resources |

## Security Features

### Non-Destructive Mode

Run the server in read-only mode that disables destructive operations:

```bash
ALLOW_ONLY_NON_DESTRUCTIVE_TOOLS=true npx mcp-server-kubernetes
```

### Read-Only Mode

Allow only read operations:

```bash
ALLOW_ONLY_READONLY_TOOLS=true npx mcp-server-kubernetes
```

### Secrets Masking

By default, sensitive data in secrets is masked. Disable with:

```bash
MASK_SECRETS=false npx mcp-server-kubernetes
```

## OpenTelemetry Observability

Enable distributed tracing for all operations:

```bash
export ENABLE_TELEMETRY=true
export OTEL_EXPORTER_OTLP_ENDPOINT=http://localhost:4317
npx mcp-server-kubernetes
```

## Authentication Options

The server supports multiple authentication methods:

1. **Default kubeconfig**: Loads from `~/.kube/config`
2. **Custom kubeconfig path**: Set `KUBECONFIG` environment variable
3. **In-cluster authentication**: Automatic when running in Kubernetes
4. **Server + Token**: For cloud provider authentication

## Advanced Configuration

### Environment Variables

| Variable | Description |
|----------|-------------|
| `ALLOW_ONLY_NON_DESTRUCTIVE_TOOLS` | Disable destructive operations |
| `ALLOW_ONLY_READONLY_TOOLS` | Allow only read operations |
| `ALLOWED_TOOLS` | Comma-separated list of allowed tools |
| `MASK_SECRETS` | Mask sensitive data in secrets (default: true) |
| `ENABLE_TELEMETRY` | Enable OpenTelemetry tracing |
| `OTEL_EXPORTER_OTLP_ENDPOINT` | OTLP endpoint for traces |
| `ENABLE_UNSAFE_SSE_TRANSPORT` | Enable SSE transport |
| `ENABLE_UNSAFE_STREAMABLE_HTTP_TRANSPORT` | Enable HTTP transport |

## Usage Examples

### Get Pods

```json
{
  "name": "kubectl_get",
  "arguments": {
    "resourceType": "pods",
    "namespace": "default",
    "output": "json"
  }
}
```

### Apply Manifest

```json
{
  "name": "kubectl_apply",
  "arguments": {
    "manifest": "apiVersion: v1\nkind: Pod\n...",
    "namespace": "default"
  }
}
```

### Port Forward

```json
{
  "name": "port_forward",
  "arguments": {
    "resourceType": "pod",
    "resourceName": "my-pod",
    "localPort": 8080,
    "targetPort": 80,
    "namespace": "default"
  }
}
```

### Install Helm Chart

```json
{
  "name": "install_helm_chart",
  "arguments": {
    "name": "nginx",
    "chart": "bitnami/nginx",
    "namespace": "web",
    "repo": "https://charts.bitnami.com/bitnami"
  }
}
```

## Project Structure

```
kubernetes-mcp-server/
├── README.md                    # This file
├── config.json                  # Tool definitions and configuration
├── INSTALL.md                   # Detailed installation guide
└── ADVANCED_README.md           # Advanced features documentation
```

## License

MIT License - See [LICENSE](https://github.com/Flux159/mcp-server-kubernetes/blob/main/LICENSE) for details.

## Author

Flux159 (Suyog Sonwalkar)

## Links

- [GitHub Repository](https://github.com/Flux159/mcp-server-kubernetes)
- [NPM Package](https://www.npmjs.com/package/mcp-server-kubernetes)
- [MCP Documentation](https://modelcontextprotocol.io/)
