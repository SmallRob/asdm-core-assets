# Phase 1: Git Repository Transformation

## Overview

| Item | Description |
|------|-------------|
| Objective | Complete Git repository directory structure and file format transformation |
| Estimated Time | 8 hours |
| Deliverables | manifest.json distributed asset manifests + simplified registry files |

---

## Step 1: Analyze Existing Registry Structure

### 1.1 Registry File List

| Asset Type | Registry File | Asset Count |
|------------|---------------|-------------|
| Toolset | `asdm-core-assets/toolsets/toolsets-registry.json` | 5 |
| Spec | `asdm-core-assets/specs/specs-registry.json` | 14 |
| Skill | `asdm-core-assets/skills/skills-registry.json` | 8 |
| MCP | `asdm-core-assets/mcps/mcps-registry.json` | 1 |

### 1.2 Existing Field Structure

**Toolset Fields**:
```json
{
  "id": "prototype-builder",
  "guid": "f2a3b4c5-d6e7-8901-2345-678901234567",
  "name": "Prototype Builder",
  "description": "...",
  "version": "1.0.0",
  "downloadUrl": "prototype-builder.zip",
  "entryPoint": "prototype-builder/README.md",
  "dateCreated": "2026-03-17T00:00:00Z",
  "dateUpdated": "2026-03-17T00:00:00Z",
  "createdBy": "ASDM Platform",
  "updatedBy": "ASDM Platform"
}
```

**Spec/Skill/MCP Additional Fields**:
```json
{
  "id": "reactjs",
  "guid": "...",
  "name": "...",
  "path": "reactjs",          // <-- additional field
  "entryPoint": "reactjs/README.md",
  ...
}
```

---

## Step 2: Define Manifest.json Field Specification

### 2.1 Manifest Field Definitions

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| registry_id | string | Yes | Asset unique identifier |
| guid | string | Yes | Global unique identifier |
| name | string | Yes | Asset name |
| description | string | Yes | Asset description |
| scenario | string | No | Scenario category |
| version | string | Yes | Version number |
| downloadUrl | string | Yes | Download path |
| path | string | No | Relative path (Spec/Skill/MCP) |
| entryPoint | string | Yes | Entry file |
| dateCreated | string | Yes | Creation time |
| dateUpdated | string | Yes | Update time |
| createdBy | string | Yes | Creator |
| updatedBy | string | Yes | Updater |

### 2.2 Scenario Value Mapping

| Scenario Value | Description | Applicable Assets |
|----------------|-------------|-------------------|
| `frontend` | Frontend development | reactjs, vue3-composition-api, nextjs-react-tailwind, typescript-vite-vue-tailwind-daisyui, javascript, typescript, css, html |
| `backend` | Backend development | java-springboot-jpa, java-general, node, java-springboot-crud, dotnet-crud, go-crud, python-fastapi-crud |
| `testing` | Testing related | playwright-accessibility-testing, playwright-integration-testing, playwright-e2e-testing |
| `data` | Data processing | sql-ddl, pdf-official, report-development |
| `productivity` | Productivity tools | pptx, prototype-builder, context-builder, prd-builder |
| `devops` | DevOps | kubernetes-mcp-server |
| `general` | General | basic-tools, sample-toolset |

---

## Step 3: Create Manifest Generation Script

### 3.1 Create Generation Script

**File**: `tools/generate_manifests.py`

```python
#!/usr/bin/env python3
"""Generate asset manifest.json files"""

import json
import os
from pathlib import Path

ASSET_CONFIGS = {
    'toolsets': {
        'registry_file': 'asdm-core-assets/toolsets/toolsets-registry.json',
        'registry_key': 'toolsets',
        'base_dir': 'asdm-core-assets/toolsets',
        'scenario_map': {
            'prototype-builder': 'productivity',
            'basic-tools': 'general',
            'context-builder': 'productivity',
            'prd-builder': 'productivity',
            'sample-toolset': 'general'
        }
    },
    'specs': {
        'registry_file': 'asdm-core-assets/specs/specs-registry.json',
        'registry_key': 'specs',
        'base_dir': 'asdm-core-assets/specs',
        'scenario_map': {
            'reactjs': 'frontend',
            'nextjs-react-tailwind': 'frontend',
            'playwright-accessibility-testing': 'testing',
            'playwright-integration-testing': 'testing',
            'playwright-e2e-testing': 'testing',
            'java-springboot-jpa': 'backend',
            'java-general': 'backend',
            'vue3-composition-api': 'frontend',
            'typescript-vite-vue-tailwind-daisyui': 'frontend',
            'javascript': 'frontend',
            'typescript': 'frontend',
            'css': 'frontend',
            'html': 'frontend',
            'node': 'backend'
        }
    },
    'skills': {
        'registry_file': 'asdm-core-assets/skills/skills-registry.json',
        'registry_key': 'skills',
        'base_dir': 'asdm-core-assets/skills',
        'scenario_map': {
            'pptx': 'productivity',
            'pdf-official': 'data',
            'java-springboot-crud': 'backend',
            'dotnet-crud': 'backend',
            'go-crud': 'backend',
            'python-fastapi-crud': 'backend',
            'sql-ddl': 'data',
            'report-development': 'data'
        }
    },
    'mcps': {
        'registry_file': 'asdm-core-assets/mcps/mcps-registry.json',
        'registry_key': 'mcps',
        'base_dir': 'asdm-core-assets/mcps',
        'scenario_map': {
            'kubernetes-mcp-server': 'devops'
        }
    }
}

def generate_manifest(asset_config, asset_info):
    asset_id = asset_info['id']
    scenario = asset_config['scenario_map'].get(asset_id, None)
    
    return {
        'registry_id': asset_id,
        'guid': asset_info.get('guid'),
        'name': asset_info.get('name'),
        'description': asset_info.get('description'),
        'scenario': scenario,
        'version': asset_info.get('version'),
        'downloadUrl': asset_info.get('downloadUrl'),
        'path': asset_info.get('path'),
        'entryPoint': asset_info.get('entryPoint'),
        'dateCreated': asset_info.get('dateCreated'),
        'dateUpdated': asset_info.get('dateUpdated'),
        'createdBy': asset_info.get('createdBy', 'ASDM Platform'),
        'updatedBy': asset_info.get('updatedBy', 'ASDM Platform')
    }

def process_registry(asset_type, config):
    registry_path = Path(config['registry_file'])
    
    if not registry_path.exists():
        print(f"Registry file not found: {registry_path}")
        return
    
    with open(registry_path, 'r', encoding='utf-8') as f:
        registry_data = json.load(f)
    
    assets = registry_data.get(config['registry_key'], [])
    base_dir = Path(config['base_dir'])
    
    print(f"\nProcessing {asset_type} ({len(assets)} assets)")
    
    for asset in assets:
        asset_id = asset['id']
        manifest_path = base_dir / asset_id / 'manifest.json'
        
        manifest_path.parent.mkdir(parents=True, exist_ok=True)
        
        manifest = generate_manifest(config, asset)
        
        with open(manifest_path, 'w', encoding='utf-8') as f:
            json.dump(manifest, f, indent=2, ensure_ascii=False)
        
        print(f"  V {asset_id}/manifest.json")

def main():
    print("Starting manifest.json generation")
    
    for asset_type, config in ASSET_CONFIGS.items():
        process_registry(asset_type, config)
    
    print("\nDone!")

if __name__ == '__main__':
    main()
```

### 3.2 Run Script

```bash
cd f:/rt-project/asdm-core-assets
python tools/generate_manifests.py
```

### 3.3 Expected Output

```
Starting manifest.json generation

Processing toolsets (5 assets)
  V prototype-builder/manifest.json
  V basic-tools/manifest.json
  V context-builder/manifest.json
  V prd-builder/manifest.json
  V sample-toolset/manifest.json

Processing specs (14 assets)
  V reactjs/manifest.json
  V nextjs-react-tailwind/manifest.json
  ...

Processing skills (8 assets)
  ...

Processing mcps (1 assets)
  V kubernetes-mcp-server/manifest.json

Done!
```

### 3.4 Manifest File Example

**toolsets/prototype-builder/manifest.json**:
```json
{
  "registry_id": "prototype-builder",
  "guid": "f2a3b4c5-d6e7-8901-2345-678901234567",
  "name": "Prototype Builder",
  "description": "A toolset for rapidly generating verifiable prototypes...",
  "scenario": "productivity",
  "version": "1.0.0",
  "downloadUrl": "prototype-builder.zip",
  "path": null,
  "entryPoint": "prototype-builder/README.md",
  "dateCreated": "2026-03-17T00:00:00Z",
  "dateUpdated": "2026-03-17T00:00:00Z",
  "createdBy": "ASDM Platform",
  "updatedBy": "ASDM Platform"
}
```

---

## Step 4: Transform Registry Files

### 4.1 Create Transformation Script

**File**: `tools/transform_registries.py`

```python
#!/usr/bin/env python3
"""Transform registry.json files to registry_ids mode"""

import json
from pathlib import Path

ASSET_CONFIGS = {
    'toolsets': 'asdm-core-assets/toolsets/toolsets-registry.json',
    'specs': 'asdm-core-assets/specs/specs-registry.json',
    'skills': 'asdm-core-assets/skills/skills-registry.json',
    'mcps': 'asdm-core-assets/mcps/mcps-registry.json'
}

def transform_registry(asset_type, registry_path):
    registry_path = Path(registry_path)
    
    if not registry_path.exists():
        print(f"Registry file not found: {registry_path}")
        return
    
    with open(registry_path, 'r', encoding='utf-8') as f:
        old_data = json.load(f)
    
    registry_key = asset_type
    assets = old_data.get(registry_key, [])
    registry_ids = [asset['id'] for asset in assets]
    
    new_data = {
        "version": old_data.get('version', '1.0.0'),
        "dateCreated": old_data.get('dateCreated'),
        "dateUpdated": "2026-04-21T00:00:00Z",
        "createdBy": old_data.get('createdBy', 'ASDM Platform'),
        "updatedBy": "ASDM Platform",
        "registry_ids": registry_ids
    }
    
    # Backup original file
    backup_path = registry_path.with_suffix('.json.bak')
    registry_path.rename(backup_path)
    
    with open(registry_path, 'w', encoding='utf-8') as f:
        json.dump(new_data, f, indent=2, ensure_ascii=False)
    
    print(f"{asset_type} registry transformed (backup: {backup_path.name})")

def main():
    print("Starting registry transformation\n")
    
    for asset_type, registry_path in ASSET_CONFIGS.items():
        transform_registry(asset_type, registry_path)
    
    print("\nDone!")

if __name__ == '__main__':
    main()
```

### 4.2 Run Script

```bash
python tools/transform_registries.py
```

### 4.3 Transformed Registry Example

**toolsets-registry.json**:
```json
{
  "version": "1.0.3",
  "dateCreated": "2026-02-19T00:00:00Z",
  "dateUpdated": "2026-04-21T00:00:00Z",
  "createdBy": "ASDM Platform",
  "updatedBy": "ASDM Platform",
  "registry_ids": [
    "prototype-builder",
    "basic-tools",
    "context-builder",
    "prd-builder",
    "sample-toolset"
  ]
}
```

---

## Step 5: Verify Manifest Generation Results

### 5.1 Create Verification Script

**File**: `tools/verify_manifests.py`

```python
#!/usr/bin/env python3
"""Verify manifest.json files are generated correctly"""

import json
from pathlib import Path

ASSET_CONFIGS = {
    'toolsets': {
        'base_dir': 'asdm-core-assets/toolsets',
        'expected_ids': [
            'prototype-builder', 'basic-tools', 'context-builder',
            'prd-builder', 'sample-toolset'
        ]
    },
    'specs': {
        'base_dir': 'asdm-core-assets/specs',
        'expected_ids': [
            'reactjs', 'nextjs-react-tailwind', 'playwright-accessibility-testing',
            'playwright-integration-testing', 'playwright-e2e-testing',
            'java-springboot-jpa', 'java-general', 'vue3-composition-api',
            'typescript-vite-vue-tailwind-daisyui', 'javascript', 'typescript',
            'css', 'html', 'node'
        ]
    },
    'skills': {
        'base_dir': 'asdm-core-assets/skills',
        'expected_ids': [
            'pptx', 'pdf-official', 'java-springboot-crud', 'dotnet-crud',
            'go-crud', 'python-fastapi-crud', 'sql-ddl', 'report-development'
        ]
    },
    'mcps': {
        'base_dir': 'asdm-core-assets/mcps',
        'expected_ids': ['kubernetes-mcp-server']
    }
}

REQUIRED_FIELDS = [
    'registry_id', 'guid', 'name', 'description', 'scenario',
    'version', 'downloadUrl', 'entryPoint'
]

def verify_asset_manifest(asset_id, manifest_path):
    errors = []
    
    if not manifest_path.exists():
        return [f"File not found"]
    
    with open(manifest_path, 'r', encoding='utf-8') as f:
        manifest = json.load(f)
    
    for field in REQUIRED_FIELDS:
        if field not in manifest:
            errors.append(f"Missing field: {field}")
    
    if manifest.get('registry_id') != asset_id:
        errors.append(f"registry_id mismatch")
    
    return errors

def main():
    print("Verifying manifest.json files\n")
    
    total_assets = 0
    total_errors = 0
    
    for asset_type, config in ASSET_CONFIGS.items():
        base_dir = Path(config['base_dir'])
        expected_ids = config['expected_ids']
        
        print(f"{asset_type} ({len(expected_ids)} assets)")
        
        for asset_id in expected_ids:
            manifest_path = base_dir / asset_id / 'manifest.json'
            errors = verify_asset_manifest(asset_id, manifest_path)
            
            total_assets += 1
            
            if errors:
                print(f"  X {asset_id}: {', '.join(errors)}")
                total_errors += len(errors)
            else:
                print(f"  V {asset_id}")
    
    print(f"\nTotal: {total_assets} assets, {total_errors} errors")
    
    if total_errors == 0:
        print("All verifications passed!")

if __name__ == '__main__':
    main()
```

### 5.2 Run Verification

```bash
python tools/verify_manifests.py
```

### 5.3 Expected Output

```
Verifying manifest.json files

toolsets (5 assets)
  V prototype-builder
  V basic-tools
  ...

specs (14 assets)
  V reactjs
  ...

skills (8 assets)
  ...

mcps (1 assets)
  V kubernetes-mcp-server

Total: 28 assets, 0 errors
All verifications passed!
```

---

## Step 6: Git Commit and Push

### 6.1 Check Changes

```bash
git status
```

### 6.2 Commit Changes

```bash
git add .

git commit -m "feat: Phase 1 - Git Repository Transformation

- Add manifest.json distributed asset manifests
- Transform registry files to registry_ids mode
- Add scenario field support

Transformation scope:
- toolsets: 5 manifests
- specs: 14 manifests
- skills: 8 manifests
- mcps: 1 manifest"
```

### 6.3 Push

```bash
git push origin main
```

---

## Step 7: Acceptance Checklist

| # | Check Item | Status |
|---|------------|--------|
| 1 | Manifest directory created | ☐ |
| 2 | Manifest fields complete | ☐ |
| 3 | Scenario field added | ☐ |
| 4 | Registry files simplified | ☐ |
| 5 | Registry version updated | ☐ |
| 6 | Git committed | ☐ |
| 7 | Verification script passed | ☐ |

---

## Command Summary

```bash
# 1. Generate manifest.json
python tools/generate_manifests.py

# 2. Transform registry files
python tools/transform_registries.py

# 3. Verify manifest files
python tools/verify_manifests.py

# 4. Commit changes
git add .
git commit -m "feat: Phase 1 - Git Repository Transformation"
git push origin main
```

---

## Milestone

**M1: Git Repository Transformation Complete**
- manifest.json distributed manifests generated
- Registry files simplified to registry_ids mode
- Scenario field support added
