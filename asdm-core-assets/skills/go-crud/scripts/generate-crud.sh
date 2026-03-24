#!/bin/bash

# Go CRUD Generator
# Usage: bash generate-crud.sh <EntityName> [output-dir]

set -e

ENTITY_NAME="${1}"
OUTPUT_DIR="${2:-./internal}"

if [ -z "$ENTITY_NAME" ]; then
    echo "Usage: bash generate-crud.sh <EntityName> [output-dir]"
    echo "Example: bash generate-crud.sh User ./internal"
    exit 1
fi

# Convert PascalCase to lowercase
ENTITY_LOWER=$(echo "$ENTITY_NAME" | sed 's/^./\l&/g' | tr '[:upper:]' '[:lower:]')
ENTITY_PLURAL="${ENTITY_LOWER}Models

MODELS_DIR="$OUTPUT_DIR/models"
DTO_DIR="$OUTPUT_DIR/dto"
REPOSITORY_DIR="$OUTPUT_DIR/repository"
SERVICE_DIR="$OUTPUT_DIR/service"
HANDLER_DIR="$OUTPUT_DIR/handler"

echo "Generating CRUD for entity: $ENTITY_NAME"
echo "Output directory: $OUTPUT_DIR"

# Create directory structure
mkdir -p "$MODELS_DIR" "$DTO_DIR" "$REPOSITORY_DIR" "$SERVICE_DIR" "$HANDLER_DIR"

# Generate Model
cat > "$MODELS_DIR/${ENTITY_LOWER}.go" << EOF
package models

import (
    "time"
    "gorm.io/gorm"
)

type $ENTITY_NAME struct {
    ID          uint           \`gorm:"primarykey" json:"id"\`
    Name        string         \`gorm:"type:varchar(100);not null" json:"name"\`
    Description string         \`gorm:"type:varchar(500)" json:"description"\`
    CreatedAt   time.Time      \`json:"created_at"\`
    UpdatedAt   time.Time      \`json:"updated_at"\`
    DeletedAt   gorm.DeletedAt \`gorm:"index" json:"-"\`
}

func ($ENTITY_NAME) TableName() string {
    return "$ENTITY_PLURAL"
}
EOF

# Generate DTO
cat > "$DTO_DIR/${ENTITY_LOWER}_dto.go" << EOF
package dto

import "time"

type Create${ENTITY_NAME}Request struct {
    Name        string \`json:"name" binding:"required,max=100"\`
    Description string \`json:"description" binding:"max=500"\`
}

type Update${ENTITY_NAME}Request struct {
    Name        string \`json:"name" binding:"required,max=100"\`
    Description string \`json:"description" binding:"max=500"\`
}

type ${ENTITY_NAME}Response struct {
    ID          uint      \`json:"id"\`
    Name        string    \`json:"name"\`
    Description string    \`json:"description"\`
    CreatedAt   time.Time \`json:"created_at"\`
    UpdatedAt   time.Time \`json:"updated_at"\`
}

type ${ENTITY_NAME}ListResponse struct {
    Items      []\*${ENTITY_NAME}Response \`json:"items"\`
    TotalCount int64                     \`json:"total_count"\`
}
EOF

# Generate Repository
cat > "$REPOSITORY_DIR/${ENTITY_LOWER}_repository.go" << EOF
package repository

import (
    "your-project/internal/models"
    "gorm.io/gorm"
)

type ${ENTITY_NAME}Repository interface {
    Create(entity \*models.$ENTITY_NAME) error
    FindAll() ([]models.$ENTITY_NAME, error)
    FindByID(id uint) (\*models.$ENTITY_NAME, error)
    Update(entity \*models.$ENTITY_NAME) error
    Delete(id uint) error
    Count() (int64, error)
}

type ${ENTITY_NAME}RepositoryImpl struct {
    db \*gorm.DB
}

func New${ENTITY_NAME}Repository(db \*gorm.DB) ${ENTITY_NAME}Repository {
    return \&${ENTITY_NAME}RepositoryImpl{db: db}
}

func (r \*${ENTITY_NAME}RepositoryImpl) Create(entity \*models.$ENTITY_NAME) error {
    return r.db.Create(entity).Error
}

func (r \*${ENTITY_NAME}RepositoryImpl) FindAll() ([]models.$ENTITY_NAME, error) {
    var entities []models.$ENTITY_NAME
    err := r.db.Find(\&entities).Error
    return entities, err
}

func (r \*${ENTITY_NAME}RepositoryImpl) FindByID(id uint) (\*models.$ENTITY_NAME, error) {
    var entity models.$ENTITY_NAME
    err := r.db.First(\&entity, id).Error
    if err != nil {
        return nil, err
    }
    return \&entity, nil
}

func (r \*${ENTITY_NAME}RepositoryImpl) Update(entity \*models.$ENTITY_NAME) error {
    return r.db.Save(entity).Error
}

func (r \*${ENTITY_NAME}RepositoryImpl) Delete(id uint) error {
    return r.db.Delete(\&models.$ENTITY_NAME{}, id).Error
}

func (r \*${ENTITY_NAME}RepositoryImpl) Count() (int64, error) {
    var count int64
    err := r.db.Model(\&models.$ENTITY_NAME{}).Count(\&count).Error
    return count, err
}
EOF

# Generate Service
cat > "$SERVICE_DIR/${ENTITY_LOWER}_service.go" << EOF
package service

import (
    "errors"
    "your-project/internal/dto"
    "your-project/internal/models"
    "your-project/internal/repository"
)

var Err${ENTITY_NAME}NotFound = errors.New("$ENTITY_LOWER not found")

type ${ENTITY_NAME}Service interface {
    Create(req \*dto.Create${ENTITY_NAME}Request) (\*dto.${ENTITY_NAME}Response, error)
    GetAll() (\*dto.${ENTITY_NAME}ListResponse, error)
    GetByID(id uint) (\*dto.${ENTITY_NAME}Response, error)
    Update(id uint, req \*dto.Update${ENTITY_NAME}Request) (\*dto.${ENTITY_NAME}Response, error)
    Delete(id uint) error
}

type ${ENTITY_NAME}ServiceImpl struct {
    repo repository.${ENTITY_NAME}Repository
}

func New${ENTITY_NAME}Service(repo repository.${ENTITY_NAME}Repository) ${ENTITY_NAME}Service {
    return \&${ENTITY_NAME}ServiceImpl{repo: repo}
}

func (s \*${ENTITY_NAME}ServiceImpl) Create(req \*dto.Create${ENTITY_NAME}Request) (\*dto.${ENTITY_NAME}Response, error) {
    entity := models.$ENTITY_NAME{
        Name:        req.Name,
        Description: req.Description,
    }

    if err := s.repo.Create(\&entity); err != nil {
        return nil, err
    }

    return \&dto.${ENTITY_NAME}Response{
        ID:          entity.ID,
        Name:        entity.Name,
        Description: entity.Description,
        CreatedAt:   entity.CreatedAt,
        UpdatedAt:   entity.UpdatedAt,
    }, nil
}

func (s \*${ENTITY_NAME}ServiceImpl) GetAll() (\*dto.${ENTITY_NAME}ListResponse, error) {
    entities, err := s.repo.FindAll()
    if err != nil {
        return nil, err
    }

    items := make([]\*dto.${ENTITY_NAME}Response, len(entities))
    for i, e := range entities {
        items[i] = \&dto.${ENTITY_NAME}Response{
            ID:          e.ID,
            Name:        e.Name,
            Description: e.Description,
            CreatedAt:   e.CreatedAt,
            UpdatedAt:   e.UpdatedAt,
        }
    }

    count, _ := s.repo.Count()

    return \&dto.${ENTITY_NAME}ListResponse{
        Items:      items,
        TotalCount: count,
    }, nil
}

func (s \*${ENTITY_NAME}ServiceImpl) GetByID(id uint) (\*dto.${ENTITY_NAME}Response, error) {
    entity, err := s.repo.FindByID(id)
    if err != nil {
        return nil, Err${ENTITY_NAME}NotFound
    }

    return \&dto.${ENTITY_NAME}Response{
        ID:          entity.ID,
        Name:        entity.Name,
        Description: entity.Description,
        CreatedAt:   entity.CreatedAt,
        UpdatedAt:   entity.UpdatedAt,
    }, nil
}

func (s \*${ENTITY_NAME}ServiceImpl) Update(id uint, req \*dto.Update${ENTITY_NAME}Request) (\*dto.${ENTITY_NAME}Response, error) {
    entity, err := s.repo.FindByID(id)
    if err != nil {
        return nil, Err${ENTITY_NAME}NotFound
    }

    entity.Name = req.Name
    entity.Description = req.Description

    if err := s.repo.Update(entity); err != nil {
        return nil, err
    }

    return \&dto.${ENTITY_NAME}Response{
        ID:          entity.ID,
        Name:        entity.Name,
        Description: entity.Description,
        CreatedAt:   entity.CreatedAt,
        UpdatedAt:   entity.UpdatedAt,
    }, nil
}

func (s \*${ENTITY_NAME}ServiceImpl) Delete(id uint) error {
    _, err := s.repo.FindByID(id)
    if err != nil {
        return Err${ENTITY_NAME}NotFound
    }

    return s.repo.Delete(id)
}
EOF

# Generate Handler
cat > "$HANDLER_DIR/${ENTITY_LOWER}_handler.go" << EOF
package handler

import (
    "net/http"
    "strconv"
    "your-project/internal/dto"
    "your-project/internal/service"
    "github.com/gin-gonic/gin"
)

type ${ENTITY_NAME}Handler interface {
    Create(c \*gin.Context)
    GetAll(c \*gin.Context)
    GetByID(c \*gin.Context)
    Update(c \*gin.Context)
    Delete(c \*gin.Context)
}

type ${ENTITY_NAME}HandlerImpl struct {
    service service.${ENTITY_NAME}Service
}

func New${ENTITY_NAME}Handler(service service.${ENTITY_NAME}Service) ${ENTITY_NAME}Handler {
    return \&${ENTITY_NAME}HandlerImpl{service: service}
}

func (h \*${ENTITY_NAME}HandlerImpl) Create(c \*gin.Context) {
    var req dto.Create${ENTITY_NAME}Request
    if err := c.ShouldBindJSON(\&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    resp, err := h.service.Create(\&req)
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, resp)
}

func (h \*${ENTITY_NAME}HandlerImpl) GetAll(c \*gin.Context) {
    resp, err := h.service.GetAll()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, resp)
}

func (h \*${ENTITY_NAME}HandlerImpl) GetByID(c \*gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
        return
    }

    resp, err := h.service.GetByID(uint(id))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, resp)
}

func (h \*${ENTITY_NAME}HandlerImpl) Update(c \*gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
        return
    }

    var req dto.Update${ENTITY_NAME}Request
    if err := c.ShouldBindJSON(\&req); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    resp, err := h.service.Update(uint(id), \&req)
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusOK, resp)
}

func (h \*${ENTITY_NAME}HandlerImpl) Delete(c \*gin.Context) {
    id, err := strconv.ParseUint(c.Param("id"), 10, 32)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "invalid id"})
        return
    }

    if err := h.service.Delete(uint(id)); err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusNoContent, nil)
}
EOF

echo "CRUD generated successfully!"
echo "Files created in: $OUTPUT_DIR"
echo ""
echo "Don't forget to:"
echo "1. Update go.mod with your module name"
echo "2. Configure routes in main.go"
echo "3. Run: go mod tidy"
