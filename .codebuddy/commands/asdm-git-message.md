执行 'git status' 和 'git diff' 命令收集仓库当前状态和最近更改的信息。基于上述收集的上下文，生成一个简洁且描述性的提交信息，准确反映代码库中所做的修改。确保提交信息遵循最佳实践，包括清晰、简洁和相关性。提交信息应按以下格式编写：

```markdown
feat: 添加应用管理脚本及对应的npm命令
- 新增app-management.sh脚本，提供应用启动、停止、重启、状态查看和日志查看功能
- 脚本支持自动端口管理、进程管理、依赖检查和日志管理
- 在package.json中添加start、stop、restart、status、logs等npm命令
- 更新README.md文档，添加应用管理脚本使用说明和项目结构更新
```

其中 "feat" 是变更类型（例如：feat、fix、docs、style、refactor、test、chore），后面跟着用中文编写的简要变更摘要。提交信息的正文部分应提供关于所做更改的更多详细信息，使用列表格式。
