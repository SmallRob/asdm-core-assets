# ASDM 工具集 - PRD 构建器

toolset-id: prd-builder
toolset-name: PRD 构建器
版本: 0.0.2
更新日期: 2026-01-19
工具集描述: 用于为工作区规划和执行任务的任务规划工具集。

## 概述

PRD 构建器（toolset-id: prd-builder）是一个 ASDM 工具集，用于为工作区规划和执行任务。它以功能描述为输入，为该功能生成任务计划，然后执行这些任务。在执行阶段，它会更新任务计划中每个任务的当前状态。

用户可以将此工具集安装到工作区，并使用「AI 引导安装」运行 `INSTALL.md` 文档来初始化工具集。只需将以下提示复制到「AI Coding」工具的聊天窗口中并按回车即可：

```shell
Follow instructions in .asdm/toolsets/prd-builder/INSTALL.md
```

## 功能

PRD 构建器的主要功能：

### 通用功能

- 提供友好的快捷命令 `actions`，使用提供商的入口点来简化为工作区规划任务的过程
- 提供标准的 `spec` 用于为工作区规划任务，并允许用户管理员（项目经理、产品经理、产品负责人）通过自定义模板（spec 文档）来定义自己的流程

### 规划阶段

- 使用模板（spec 文档：feature-prd-spec.md）生成详细的 功能 PRD 文档，并分配唯一 ID（`.asdm/workspace/features/<feature-id>-<feature-name>/feature-prd.md`）
- 将当前功能添加到功能跟踪文档 `.asdm/workspace/features/features-list.md` 中，用于跟踪工作区中的所有功能列表，生成新功能时应自动更新该文档
- 基于功能描述为该功能生成任务计划，并保存为 `.asdm/workspace/features/<feature-id>-<feature-name>/task-list.md`，文件中应包含带有唯一 ID 的任务列表及其状态（例如 `TODO`、`IN PROGRESS`、`DONE`）

### 任务拆分阶段

- 使用模板（spec 文档：task-prd-spec.md）和功能 PRD（`.asdm/workspace/features/<feature-id>-<feature-name>/<feature-name>-prd.md`）生成任务描述文件（`.asdm/workspace/features/<feature-id>-<feature-name>/<task-id>-<task-name>-prd.md`）

### 执行阶段

- 基于任务计划（`.asdm/workspace/features/<feature-id>-<feature-name>/task-list.md`）执行功能的任务
- 更新任务计划（`.asdm/workspace/features/<feature-id>-<feature-name>/task-list.md`）中每个任务的当前状态
- 如果用户未指定任务 ID，工具集应提示用户从任务计划中选择任务，提示时应显示任务 ID、任务名称和每个任务的当前状态，以便用户清楚要执行哪个任务

## 技能执行

PRD 构建器支持使用技能（Skills）进行代码生成。技能是从注册表中动态加载的可执行模块。

### 技能注册表

所有可用技能都注册在 `.asdm/skills/skills-registry.json` 中。该注册表包含：
- 技能 ID 和元数据
- 技术栈信息（语言、框架、ORM）
- 参数定义
- 相关 spec 引用
- 别名用于匹配

### 支持的技能

| 技能 ID | 名称 | 技术栈 |
|---------|------|--------|
| java-springboot-crud | Java Spring Boot CRUD 生成器 | Java 17+, Spring Boot 3.x |
| dotnet-crud | .NET CRUD 生成器 | C#, ASP.NET Core, EF Core |
| go-crud | Go CRUD 生成器 | Go, Gin, GORM |
| python-fastapi-crud | Python FastAPI CRUD 生成器 | Python, FastAPI, SQLAlchemy |
| sql-ddl | SQL DDL 生成器 | SQL (PostgreSQL, MySQL, SQLite, MSSQL) |

### 技能选择方式

**方式一：手动指定**
```bash
/asdm-prd-execution --tech-stack java-springboot --entity User
/asdm-prd-execution --tech-stack sql --entity User
```

**方式二：自动检测**
- 根据用户请求关键词自动判断使用哪个技能
- 从项目文件检测技术栈

详细说明请参阅 [asdm-prd-execution.md](./actions/asdm-prd-execution.md)。

### 添加新技能

添加新技能只需：
1. 创建技能目录 `.asdm/skills/{新技能-id}/`
2. 添加 SKILL.md 定义工作流和参数
3. 添加生成脚本 `scripts/generate-*.sh`
4. 在 `.asdm/skills/skills-registry.json` 中注册

新技能将自动可用，无需修改其他文件！

## 工具集安装流程

`INSTALL.md` 将通过以下步骤设置工具集：

- 创建 PRD 构建器工作区的 `.asdm/workspace/features` 目录
- 检测当前的「Agentic Engine」提供商，例如 Claude Code、GitHub Copilot、腾讯 CodeBuddy 等（目前使用硬编码的提供商名称，如 CodeBuddy）
- 在提供商的入口点创建 PRD 构建器的快捷命令，例如 `.claude/commands`、`.github/prompts`、`.codebuddy/commands` 等

## 工具集工作流

安装 PRD 构建器后，用户可以使用以下命令为当前工作区规划任务：

- `/asdm-prd-planning`: 为当前工作区规划任务
- `/asdm-prd-breakdown`: 为当前工作区拆分任务
- `/asdm-prd-execution`: 为当前工作区执行任务

## 工具集结构

PRD 构建器工具集具有以下结构：

```
.asdm/
├── toolsets/
│   └── prd-builder/                        ## PRD 构建器工具集
│       ├── INSTALL.md                      ## 工具集安装说明
│       ├── README.md                       ## 英文文档
│       ├── README.zh.md                    ## 中文文档
│       └── actions/                        ## PRD 构建器指令
│           ├── asdm-prd-planning           ## 规划任务指令
│           ├── asdm-prd-breakdown          ## 拆分任务指令
│           └── asdm-prd-execution          ## 执行任务指令
│       └── spec/                           ## PRD 构建器规范文档
│           ├── feature-prd-spec.md         ## 功能 PRD 规范文档
│           ├── task-prd-spec.md            ## 任务 PRD 规范文档
│           ├── feature-list.md             ## 功能列表规范文档
│           └── task-list.md                ## 任务列表规范文档
└── skills/                                 ## 代码生成技能
    ├── skills-registry.json                ## 技能注册表
    ├── java-springboot-crud/               ## Java Spring Boot CRUD 技能
    ├── dotnet-crud/                        ## .NET CRUD 技能
    ├── go-crud/                           ## Go CRUD 技能
    ├── python-fastapi-crud/                ## Python FastAPI CRUD 技能
    └── sql-ddl/                           ## SQL DDL 技能
```

## 工具集工作区

PRD 构建器工具集具有以下工作区结构：

```
.asdm/
└── workspace/                                  ## ASDM 工作区
    └── features/                               ## 功能工作区
        ├── <feature-id>-<feature-name>/        ## 功能工作区
        │   ├── feature-prd.md                  ## 功能 PRD 文档
        │   ├── task-list.md                    ## 任务列表文档
        │   └── <task-id>-<task-name>-prd.md    ## 任务 PRD 文档
        └── features-list.md                    ## 功能列表文档
```

## 版权与许可

版权所有 (c) 2026 LeansoftX.com & iSoftStone。保留所有权利。

根据专有软件许可证授权。请参阅项目根目录中的 [LICENSE](LICENSE) 获取许可信息。
