# ASDM 工具集 - 原型构建器

toolset-id: prototype-builder
toolset-name: 原型构建器
版本: 1.0.0
更新日期: 2026-03-17
工具集描述: 一个基于用户需求和技术栈规范快速生成可验证原型的工具集。

## 概述

原型构建器（toolset-id: prototype-builder）是一个 ASDM 工具集，用于根据用户需求和技术栈规范快速生成前端原型。它接受用户需求和技术栈偏好，然后生成可立即验证的可运行原型。

用户可以将此工具集安装到工作区，并使用「AI 引导安装」运行 `INSTALL.md` 文档来初始化工具集。只需将以下提示复制到「AI Coding」工具的聊天窗口中并按回车即可：

```shell
Follow instructions in .asdm/toolsets/prototype-builder/INSTALL.md
```

## 功能

原型构建器的主要功能：

- **快速原型生成**：根据用户需求生成完整、可验证的原型
- **多技术栈支持**：支持 React、Vue、HTML、微信小程序
- **UI 库集成**：支持 Ant Design、Material-UI、Element Plus、Vuetify、Bootstrap、Tailwind CSS
- **编码规范遵循**：自动应用 `asdm-core-assets/specs` 中的编码规范
- **项目脚手架**：创建带有基本配置的最小项目结构

### 支持的技术栈

| 技术栈 | 框架 | UI 库 | 构建工具 |
|--------|------|-------|----------|
| React | React 18 | Ant Design / Material-UI / Chakra UI | Vite |
| Vue | Vue 3 | Element Plus / Vuetify / Naive UI | Vite |
| HTML | Vanilla | Bootstrap / Tailwind CSS | 无 |
| 小程序 | 微信 | TDesign / Vant | 原生 |

## 编码规范

生成原型时，工具会根据所选技术栈自动应用 `asdm-core-assets/specs` 中的编码规范。

### ⚠️ 强制规范阅读流程

**重要：所有命令在生成代码前必须完整阅读规范文件，确保符合编码标准。**

#### 规范阅读清单

| 技术栈 | 必需规范文件（全部强制） |
|--------|------------------------|
| **React** | 1. `.asdm/specs/reactjs/reactjs-coding-standard.md`<br>2. `.asdm/specs/reactjs/reactjs-performance-guidelines.md`<br>3. `.asdm/specs/javascript/javascript.md`<br>4. `.asdm/specs/css/css.md`<br>5. `.asdm/toolsets/prototype-builder/specs/specs4react.md`<br>6. `.asdm/specs/typescript/typescript.md`（如启用 TypeScript） |
| **Vue** | 1. `.asdm/specs/vue3-composition-api/`（所有文件）<br>2. `.asdm/specs/javascript/javascript.md`<br>3. `.asdm/specs/css/css.md`<br>4. `.asdm/toolsets/prototype-builder/specs/specs4vue.md`<br>5. `.asdm/specs/typescript/typescript.md`（如启用 TypeScript） |
| **HTML** | 1. `.asdm/specs/html/html.md`<br>2. `.asdm/specs/css/css.md`<br>3. `.asdm/specs/javascript/javascript.md`<br>4. `.asdm/toolsets/prototype-builder/specs/specs4html.md` |
| **小程序** | 1. `.asdm/toolsets/prototype-builder/specs/specs4miniprogram.md` |

### 技术栈到规范映射

| 技术栈 | 主要规范 | 相关规范 |
|--------|----------|----------|
| React | `specs/reactjs/README.md` | JavaScript, TypeScript, CSS |
| Vue | `specs/vue3-composition-api/README.md` | JavaScript, TypeScript, CSS |
| HTML | `specs/html/html.md` | CSS, JavaScript |
| 小程序 | 微信原生规范 | JavaScript |

### 必需约定

所有生成的原型必须遵循以下约定：

- **缩进**：2 个空格（不使用 Tab）
- **行长度**：最大 100 个字符
- **字符编码**：UTF-8
- **分号**：必需（JavaScript）
- **命名**：遵循技术栈特定的约定
- **模块**：使用 ES6 模块（`import`/`export`）

## 工具集安装流程

`INSTALL.md` 将通过以下步骤设置工具集：

- 创建原型构建器的 `.asdm/toolsets/prototype-builder` 目录
- 创建生成原型的 `.asdm/prototypes` 目录
- 检测当前的「Agentic Engine」提供商，例如 Claude Code、GitHub Copilot、腾讯 CodeBuddy
- 在提供商的入口点创建原型构建器的快捷命令

## 工具集工作流

安装原型构建器后，用户可以使用以下命令生成原型：

- `/asdm-prototype-create`：根据需求生成完整原型
- `/asdm-prototype-scaffold`：使用特定技术栈脚手架新项目

### 强制工作流程（MUST FOLLOW）

所有原型构建命令都遵循以下强制工作流程，确保生成的代码符合编码规范：

#### 1. 解析参数
- 提取命令行参数（技术栈、UI 库、功能特性等）

#### 2. 加载并读取所有适用规范
- 根据技术栈读取对应的规范文件
- **禁止在完成规范阅读前生成任何代码**
- 输出规范约束摘要

#### 3. 生成代码
- 严格遵循已读取的规范生成项目代码
- 应用编码标准、目录结构、命名约定等

#### 4. 自查与验证
- 对照规范检查生成的代码
- 验证：PropTypes、目录结构、命名约定、性能优化、代码风格

**关键约束：**
- React 项目必须包含 PropTypes 验证
- 使用 React.memo、useMemo、useCallback 进行性能优化
- 遵循 `components/ComponentName/index.jsx` 目录模式
- API 层放在 `services/` 而非 `api/`
- 可复用逻辑提取到 `hooks/useXxx.js`
- 包含 `.eslintrc.cjs` 和 `.prettierrc` 配置文件

## 工具集结构

原型构建器工具集具有以下结构：

```
.asdm/toolsets/prototype-builder/
├── INSTALL.md                                  ## 安装说明
├── README.md                                   ## 英文文档
├── README.zh.md                               ## 中文文档
├── actions                                     ## 原型构建器指令
│   ├── asdm-prototype-create.md                ## 创建原型指令（包含强制工作流程）
│   └── asdm-prototype-scaffold.md              ## 脚手架项目指令（包含强制工作流程）
└── specs                                       ## 原型构建器规范文档
    ├── specs4react.md                          ## React 原型规范
    ├── specs4vue.md                            ## Vue 原型规范
    ├── specs4html.md                           ## HTML 原型规范
    └── specs4miniprogram.md                   ## 小程序规范
```

**注意**：所有 action 文件都包含 `Execution Workflow (MUST FOLLOW)` 章节，强制要求在生成代码前完整阅读相关规范。

## 使用示例

### 创建原型

```
/asdm-prototype-create --requirements "一个待办事项应用，包含添加、删除和完成功能" --stack react
```

### 脚手架项目

```
/asdm-prototype-scaffold --stack vue --ui-library element-plus --name my-app
```

### 输出

生成项目时，工具会输出使用的规范：

```
--- 编码规范（来自 asdm-core-assets/specs）---
主要规范: specs/reactjs/README.md
相关规范:
  - specs/reactjs/reactjs-coding-standard.md
  - specs/javascript/javascript.md
  - specs/typescript/typescript.md
  - specs/css/css.md

重要提示：实现原型时请遵循这些编码规范。
```

## 相关工具集

- **PRD 构建器**：用于规划和执行任务
- **上下文构建器**：用于构建工作区上下文

## 版权与许可

版权所有 (c) 2026 LeansoftX.com & iSoftStone。保留所有权利。

根据专有软件许可证授权。请参阅项目根目录中的 [LICENSE](LICENSE) 获取许可信息。
