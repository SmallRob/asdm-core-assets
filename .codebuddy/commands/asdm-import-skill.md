based on the absolute path of the folder by user
refer to the following sample skill folder
asdm-core-assets/skills/pptx

copy all files and directories from the given folder to asdm-core-assets/skills/{skill-name}/
create or update README.md in asdm-core-assets/skills/{skill-name}/
update asdm-core-assets/skills/skills-registry.json

make sure you follow the following rules:
- make sure you read and analyze all files in the given path
- copy ALL files (including scripts, documentation, license files, etc.) from the source folder to the target skill directory
- determine a best skillId and description based on comprehensive analysis from the given folder path
- preserve the original directory structure (scripts/, ooxml/, etc.)
- generate README.md with tree-view format showing all files in the skill folder
- if SKILL.md exists, keep it; if not, create it based on the main documentation
- the README.md should include all files links in the folder with a tree-view format

Skill registry entry must include:
- id: unique identifier (use folder name as id)
- name: display name
- description: comprehensive description
- capabilities: array of skill capabilities
- scripts: array of available scripts (if any)
- path: directory path (relative to skills/)
- entryPoint: main skill documentation file (usually SKILL.md)