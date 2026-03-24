#!/bin/bash

# Java Spring Boot CRUD Generator
# Usage: bash generate-crud.sh <EntityName> [output-dir]

set -e

ENTITY_NAME="${1}"
OUTPUT_DIR="${2:-.}"

if [ -z "$ENTITY_NAME" ]; then
    echo "Usage: bash generate-crud.sh <EntityName> [output-dir]"
    echo "Example: bash generate-crud.sh User ./src/main/java/com/example"
    exit 1
fi

# Convert PascalCase to camelCase and lowercase
ENTITY_CAMEL=$(echo "$ENTITY_NAME" | sed 's/^./\l&/g' | sed 's/\([A-Z]\)/_\l\1/g' | sed 's/^_//')
ENTITY_LOWER=$(echo "$ENTITY_CAMEL" | tr '[:upper:]' '[:lower:]')
ENTITY_PLURAL="${ENTITY_LOWER}s"

PACKAGE_PATH="com/example"
ENTITY_PATH="$OUTPUT_DIR/$PACKAGE_PATH/$ENTITY_LOWER"

echo "Generating CRUD for entity: $ENTITY_NAME"
echo "Output directory: $ENTITY_PATH"

# Create directory structure
mkdir -p "$ENTITY_PATH/exception"

# Generate Entity.java
cat > "$ENTITY_PATH/${ENTITY_NAME}.java" << EOF
package com.example.$ENTITY_LOWER;

import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "$ENTITY_PLURAL")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class $ENTITY_NAME {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
        updatedAt = LocalDateTime.now();
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
EOF

# Generate Repository.java
cat > "$ENTITY_PATH/${ENTITY_NAME}Repository.java" << EOF
package com.example.$ENTITY_LOWER;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ${ENTITY_NAME}Repository extends JpaRepository<$ENTITY_NAME, Long> {

    Optional<$ENTITY_NAME> findByName(String name);

    List<$ENTITY_NAME> findByNameContaining(String name);

    @Query("SELECT e FROM $ENTITY_NAME e WHERE e.active = true")
    List<$ENTITY_NAME> findAllActive();
}
EOF

# Generate DTO.java
cat > "$ENTITY_PATH/${ENTITY_NAME}DTO.java" << EOF
package com.example.$ENTITY_LOWER;

import lombok.*;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ${ENTITY_NAME}DTO {
    private Long id;
    private String name;
    private String description;
}
EOF

# Generate Mapper.java
cat > "$ENTITY_PATH/${ENTITY_NAME}Mapper.java" << EOF
package com.example.$ENTITY_LOWER;

import org.mapstruct.*;
import java.util.List;

@Mapper(componentModel = "spring", unmappedTargetPolicy = ReportingPolicy.IGNORE)
public interface ${ENTITY_NAME}Mapper {

    $ENTITY_NAME toEntity(${ENTITY_NAME}DTO dto);

    ${ENTITY_NAME}DTO toDTO($ENTITY_NAME entity);

    List<${ENTITY_NAME}DTO> toDTOList(List<$ENTITY_NAME> entities);

    @Mapping(target = "id", ignore = true)
    void updateEntity($ENTITY_NAME entity, ${ENTITY_NAME}DTO dto);
}
EOF

# Generate Service.java
cat > "$ENTITY_PATH/${ENTITY_NAME}Service.java" << EOF
package com.example.$ENTITY_LOWER;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class ${ENTITY_NAME}Service {

    private final ${ENTITY_NAME}Repository repository;

    @Transactional(readOnly = true)
    public List<$ENTITY_NAME> findAll() {
        return repository.findAll();
    }

    @Transactional(readOnly = true)
    public $ENTITY_NAME findById(Long id) {
        return repository.findById(id)
            .orElseThrow(() -> new ${ENTITY_NAME}NotFoundException(id));
    }

    @Transactional
    public $ENTITY_NAME create(${ENTITY_NAME}DTO dto) {
        $ENTITY_NAME entity = ${ENTITY_NAME}Mapper.toEntity(dto);
        return repository.save(entity);
    }

    @Transactional
    public $ENTITY_NAME update(Long id, ${ENTITY_NAME}DTO dto) {
        $ENTITY_NAME existing = findById(id);
        ${ENTITY_NAME}Mapper.updateEntity(existing, dto);
        return repository.save(existing);
    }

    @Transactional
    public void delete(Long id) {
        $ENTITY_NAME entity = findById(id);
        repository.delete(entity);
    }
}
EOF

# Generate Controller.java
cat > "$ENTITY_PATH/${ENTITY_NAME}Controller.java" << EOF
package com.example.$ENTITY_LOWER;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/$ENTITY_PLURAL")
@RequiredArgsConstructor
public class ${ENTITY_NAME}Controller {

    private final ${ENTITY_NAME}Service service;

    @GetMapping
    public ResponseEntity<List<$ENTITY_NAME>> getAll() {
        return ResponseEntity.ok(service.findAll());
    }

    @GetMapping("/{id}")
    public ResponseEntity<$ENTITY_NAME> getById(@PathVariable Long id) {
        return ResponseEntity.ok(service.findById(id));
    }

    @PostMapping
    public ResponseEntity<$ENTITY_NAME> create(@RequestBody ${ENTITY_NAME}DTO dto) {
        return ResponseEntity.status(HttpStatus.CREATED)
            .body(service.create(dto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<$ENTITY_NAME> update(
            @PathVariable Long id,
            @RequestBody ${ENTITY_NAME}DTO dto) {
        return ResponseEntity.ok(service.update(id, dto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        service.delete(id);
        return ResponseEntity.noContent().build();
    }
}
EOF

# Generate NotFoundException.java
cat > "$ENTITY_PATH/exception/${ENTITY_NAME}NotFoundException.java" << EOF
package com.example.$ENTITY_LOWER.exception;

public class ${ENTITY_NAME}NotFoundException extends RuntimeException {
    public ${ENTITY_NAME}NotFoundException(Long id) {
        super("$ENTITY_NAME not found with id: " + id);
    }
}
EOF

# Generate GlobalExceptionHandler.java
cat > "$ENTITY_PATH/exception/GlobalExceptionHandler.java" << EOF
package com.example.$ENTITY_LOWER.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.HashMap;
import java.util.Map;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(${ENTITY_NAME}NotFoundException.class)
    public ResponseEntity<Map<String, String>> handle${ENTITY_NAME}NotFound(
            ${ENTITY_NAME}NotFoundException ex) {
        Map<String, String> error = new HashMap<>();
        error.put("error", ex.getMessage());
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
}
EOF

echo "CRUD generated successfully!"
echo "Files created in: $ENTITY_PATH/"
echo ""
echo "Generated files:"
ls -la "$ENTITY_PATH/"
echo ""
echo "Don't forget to add dependencies to pom.xml:"
echo "- spring-boot-starter-web"
echo "- spring-boot-starter-data-jpa"
echo "- spring-boot-starter-validation"
echo "- lombok"
echo "- mapstruct"
