## README for ASDM Core Repository

### Overview

ASDM Core Assets is a repository containing essential resources for the [ASDM](https://asdm.ai) (AI-First System Development Methodology) system. It includes toolsets, specifications, and contexts that are used to manage and enhance software development processes. 

This repository is used by [ASDM Platform](https://platform.asdm.ai) to provide a centralized location for managing and sharing these resources. [ASDM Platform](https://platform.asdm.ai) will sync the contents of this repository as shared resources, and provide a UI for managing and utilizing them.

### Directory Structure

README.md                     ## ASDM核心存储库 总说明文件，当前文件
.github                       ## GitHub 资源目录
│   ├── README.md                    ## GitHub Action 说明文件
│   ├── workflows
│       ├── asdm-workspace-init-pipeline.yml  # ASDM 工作区初始化workflow
│       ├── asdm-workspace-execution.yml      # ASDM 工作区任务执行通用workflow
│       ├── asdm-context-space-sync.yml       # 用于同步上下文注册表的workflow
├── asdm-core-assets
│   ├── README.md                    ## ASDM资产说明文件
│   ├── toolsets                     ## 工具包目录
│       ├── toolsets-registry.json   ## 工具包注册表文件，用于对接 asdm-boostrapper 安装和更新工具包，Admin UI 也使用这个文件记载对应的工具包详情
│       ├── sample-toolset           ## 示例工具包
│           ├── README.md            ## 示例工具包说明文件
│           ├── INSTALL.md           ## 示例工具包安装文件
│           ├── actions              ## 行为(action)文件，转换为AI Coding工具的斜杠指令 
│               ├── action-tool-001.md   ## 示例 action 001
│               ├── action-tool-002.md   ## 示例 action 002
│           ├── specs                    ## 规约(specs)文件，内置在工具包内部的规约文件
│               ├── specs4action001.md   ## 对应于action001的规约(specs)文件
│               ├── specs4action002.md   ## 对应于action002的规约(specs)文件
│           ├── tools                    ## 当前工具所需要的其他工具，需要封装成方便 agent 在 cli 环境中调用的方式
│               ├── {tool-name-xxx}      ## 具体工具目录
│   ├── specs       ## 通用specs目录（这里的specs更接近rules的概念），内部文件夹自由组织，文件内容采用通用的markdown格式，去除掉任何frontmatter部分，确保通用型。这部分内容由adsm-bootstrapper自动根据需要添加
│       ├── specs-registry.json   ## 规约注册表文件，Admin UI 使用这个文件记载对应的specs详情
│       ├── reactjs                          ## 示例specs for react.js开发（这里可以根据技术栈规划一个标准结构）
│           ├── reactjs-coding-standard.md   ## 示例specs
│           ├── reactjs-performance-guidelines.md   ## 示例specs
│           ├── reactjs-testing-guidelines.md   ## 示例specs
│   ├── contexts    ## 上下文存储，所有经过ASDM处理的 context spaces 的上下文会统一存储在这里，形成统一的仓库，开源用户越多，这个库就会越大，形成自然流量
│       ├── contexts-registry.json    ## 暂时使用简单的json跟踪所有的 context spaces 列表
│       ├── {context-space-guid}      ## 特定 context space 目录，使用guid作为目录名称
│           ├── README.md             ## README - 当前 context space 的内容入口，为 AI Agent 提供使用当前 context space 的指导性信息，引导agent行为 
│           ├── manifest.json         ## 结构化基础信息文件，包括：数据源类型，链接，认证方式，同步状态，更新时间，内部文件结构等
│           ├── {resource-guid}       ## 特定资源的 resource-id 作为子文件夹目录
│               ├── README.md         ## 特定资源的入口文件
