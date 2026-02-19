# Installation Guide for Sample Toolset

## Prerequisites

- ASDM Bootstrapper installed
- Python 3.8+ or Node.js 16+ (depending on tool requirements)

## Installation Steps

1. **Download the toolset**
   ```bash
   asdm-bootstrapper install sample-toolset
   ```

2. **Verify installation**
   ```bash
   asdm-toolset list
   ```

3. **Initialize the toolset**
   ```bash
   asdm-toolset init sample-toolset
   ```

## Configuration

After installation, configure the toolset by editing the configuration file:

```bash
vim ~/.asdm/toolsets/sample-toolset/config.json
```

## Upgrading

To upgrade to the latest version:

```bash
asdm-bootstrapper update sample-toolset
```

## Uninstallation

To remove the toolset:

```bash
asdm-bootstrapper uninstall sample-toolset
```
