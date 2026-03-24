#!/bin/bash

# Python FastAPI CRUD Generator
# Usage: bash generate-crud.sh <entity_name> [output-dir]

set -e

ENTITY_NAME="${1}"
OUTPUT_DIR="${2:-./src}"

if [ -z "$ENTITY_NAME" ]; then
    echo "Usage: bash generate-crud.sh <entity_name> [output-dir]"
    echo "Example: bash generate-crud.sh user ./src"
    exit 1
fi

# Convert to lowercase with underscores
ENTITY_LOWER=$(echo "$ENTITY_NAME" | tr '[:upper:]' '[:lower:]')
ENTITY_CLASS=$(echo "$ENTITY_LOWER" | sed 's/_//g' | awk '{for(i=1;i<=NF;i++){$i=toupper(substr($i,1,1)) tolower(substr($i,2));}print}')
ENTITY_PATH=$(echo "$ENTITY_LOWER" | tr '_' '-')

MODELS_DIR="$OUTPUT_DIR/models"
SCHEMAS_DIR="$OUTPUT_DIR/schemas"
CRUD_DIR="$OUTPUT_DIR/crud"
ROUTERS_DIR="$OUTPUT_DIR/routers"

echo "Generating CRUD for entity: $ENTITY_NAME"
echo "Output directory: $OUTPUT_DIR"

# Create directory structure
mkdir -p "$MODELS_DIR" "$SCHEMAS_DIR" "$CRUD_DIR" "$ROUTERS_DIR"

# Generate Model
cat > "$MODELS_DIR/${ENTITY_LOWER}.py" << EOF
from sqlalchemy import Column, Integer, String, DateTime, Boolean
from datetime import datetime

from ..database import Base


class $ENTITY_CLASS(Base):
    __tablename__ = "${ENTITY_LOWER}s"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, index=True)
    description = Column(String(500), nullable=True)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
EOF

# Generate Schema
cat > "$SCHEMAS_DIR/${ENTITY_LOWER}_schema.py" << EOF
from pydantic import BaseModel, ConfigDict
from datetime import datetime
from typing import Optional


class ${ENTITY_CLASS}Base(BaseModel):
    name: str
    description: Optional[str] = None


class ${ENTITY_CLASS}Create(${ENTITY_CLASS}Base):
    pass


class ${ENTITY_CLASS}Update(${ENTITY_CLASS}Base):
    pass


class ${ENTITY_CLASS}InDB(${ENTITY_CLASS}Base):
    id: int
    is_active: bool
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)


class ${ENTITY_CLASS}Response(${ENTITY_CLASS}InDB):
    pass
EOF

# Generate CRUD
cat > "$CRUD_DIR/${ENTITY_LOWER}_crud.py" << EOF
from typing import List, Optional
from sqlalchemy.orm import Session

from ..models.${ENTITY_LOWER} import $ENTITY_CLASS
from ..schemas.${ENTITY_LOWER}_schema import ${ENTITY_CLASS}Create, ${ENTITY_CLASS}Update


def get_all(db: Session, skip: int = 0, limit: int = 100) -> List[$ENTITY_CLASS]:
    return (
        db.query($ENTITY_CLASS)
        .filter($ENTITY_CLASS.is_active == True)
        .offset(skip)
        .limit(limit)
        .all()
    )


def get_by_id(db: Session, ${ENTITY_LOWER}_id: int) -> Optional[$ENTITY_CLASS]:
    return (
        db.query($ENTITY_CLASS)
        .filter($ENTITY_CLASS.id == ${ENTITY_LOWER}_id, $ENTITY_CLASS.is_active == True)
        .first()
    )


def create(db: Session, ${ENTITY_LOWER}_in: ${ENTITY_CLASS}Create) -> $ENTITY_CLASS:
    ${ENTITY_LOWER} = $ENTITY_CLASS(**${ENTITY_LOWER}_in.model_dump())
    db.add(${ENTITY_LOWER})
    db.commit()
    db.refresh(${ENTITY_LOWER})
    return ${ENTITY_LOWER}


def update(
    db: Session, ${ENTITY_LOWER}_id: int, ${ENTITY_LOWER}_in: ${ENTITY_CLASS}Update
) -> Optional[$ENTITY_CLASS]:
    ${ENTITY_LOWER} = get_by_id(db, ${ENTITY_LOWER}_id)
    if ${ENTITY_LOWER}:
        update_data = ${ENTITY_LOWER}_in.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(${ENTITY_LOWER}, field, value)
        db.commit()
        db.refresh(${ENTITY_LOWER})
    return ${ENTITY_LOWER}


def delete(db: Session, ${ENTITY_LOWER}_id: int) -> bool:
    ${ENTITY_LOWER} = get_by_id(db, ${ENTITY_LOWER}_id)
    if ${ENTITY_LOWER}:
        # Soft delete
        ${ENTITY_LOWER}.is_active = False
        db.commit()
        return True
    return False
EOF

# Generate Router
cat > "$ROUTERS_DIR/${ENTITY_LOWER}.py" << EOF
from typing import List
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from ..database import get_db
from ..schemas.${ENTITY_LOWER}_schema import ${ENTITY_CLASS}Create, ${ENTITY_CLASS}Update, ${ENTITY_CLASS}Response
from ..crud.${ENTITY_LOWER}_crud import (
    get_all,
    get_by_id,
    create,
    update,
    delete,
)

router = APIRouter(prefix="/${ENTITY_PATH}", tags=["${ENTITY_LOWER}"])


@router.get("", response_model=List[${ENTITY_CLASS}Response])
def read_${ENTITY_LOWER}s(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    items = get_all(db, skip=skip, limit=limit)
    return items


@router.get("/{id}", response_model=${ENTITY_CLASS}Response)
def read_${ENTITY_LOWER}(id: int, db: Session = Depends(get_db)):
    item = get_by_id(db, id)
    if not item:
        raise HTTPException(status_code=404, detail="${ENTITY_CLASS} not found")
    return item


@router.post("", response_model=${ENTITY_CLASS}Response, status_code=status.HTTP_201_CREATED)
def create_${ENTITY_LOWER}(${ENTITY_LOWER}_in: ${ENTITY_CLASS}Create, db: Session = Depends(get_db)):
    return create(db, ${ENTITY_LOWER}_in)


@router.put("/{id}", response_model=${ENTITY_CLASS}Response)
def update_${ENTITY_LOWER}(id: int, ${ENTITY_LOWER}_in: ${ENTITY_CLASS}Update, db: Session = Depends(get_db)):
    item = update(db, id, ${ENTITY_LOWER}_in)
    if not item:
        raise HTTPException(status_code=404, detail="${ENTITY_CLASS} not found")
    return item


@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_${ENTITY_LOWER}(id: int, db: Session = Depends(get_db)):
    if not delete(db, id):
        raise HTTPException(status_code=404, detail="${ENTITY_CLASS} not found")
EOF

echo "CRUD generated successfully!"
echo "Files created in: $OUTPUT_DIR"
echo ""
echo "Don't forget to:"
echo "1. Add database.py and settings.py if not exists"
echo "2. Import and include router in main.py:"
echo "   from .routers import ${ENTITY_LOWER}"
echo "   app.include_router(${ENTITY_LOWER}.router)"
echo "3. Run: pip install -r requirements.txt"
