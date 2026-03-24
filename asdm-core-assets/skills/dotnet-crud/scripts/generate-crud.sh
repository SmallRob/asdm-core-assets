#!/bin/bash

# .NET CRUD Generator
# Usage: bash generate-crud.sh <EntityName> [output-dir]

set -e

ENTITY_NAME="${1}"
OUTPUT_DIR="${2:-.}"

if [ -z "$ENTITY_NAME" ]; then
    echo "Usage: bash generate-crud.sh <EntityName> [output-dir]"
    echo "Example: bash generate-crud.sh User ./src"
    exit 1
fi

# Convert PascalCase to lowercase plural
ENTITY_LOWER=$(echo "$ENTITY_NAME" | tr '[:upper:]' '[:lower:]')
ENTITY_PLURAL="${ENTITY_LOWER}s"

CONTROLLERS_DIR="$OUTPUT_DIR/Controllers"
MODELS_DIR="$OUTPUT_DIR/Models"
DTOS_DIR="$OUTPUT_DIR/DTOs"
SERVICES_DIR="$OUTPUT_DIR/Services"
DATA_DIR="$OUTPUT_DIR/Data"

echo "Generating CRUD for entity: $ENTITY_NAME"
echo "Output directory: $OUTPUT_DIR"

# Create directory structure
mkdir -p "$CONTROLLERS_DIR" "$MODELS_DIR" "$DTOS_DIR" "$SERVICES_DIR" "$DATA_DIR"

# Generate Model
cat > "$MODELS_DIR/${ENTITY_NAME}.cs" << EOF
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace YourNamespace.Models;

[Table("$ENTITY_PLURAL")]
public class $ENTITY_NAME
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int Id { get; set; }

    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public DateTime? UpdatedAt { get; set; }

    public bool IsActive { get; set; } = true;
}
EOF

# Generate Request DTO
cat > "$DTOS_DIR/${ENTITY_NAME}RequestDTO.cs" << EOF
using System.ComponentModel.DataAnnotations;

namespace YourNamespace.DTOs;

public class ${ENTITY_NAME}RequestDTO
{
    [Required]
    [MaxLength(100)]
    public string Name { get; set; } = string.Empty;

    [MaxLength(500)]
    public string? Description { get; set; }
}
EOF

# Generate Response DTO
cat > "$DTOS_DIR/${ENTITY_NAME}ResponseDTO.cs" << EOF
namespace YourNamespace.DTOs;

public class ${ENTITY_NAME}ResponseDTO
{
    public int Id { get; set; }
    public string Name { get; set; } = string.Empty;
    public string? Description { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? UpdatedAt { get; set; }
    public bool IsActive { get; set; }
}
EOF

# Generate Service Interface
cat > "$SERVICES_DIR/I${ENTITY_NAME}Service.cs" << EOF
namespace YourNamespace.Services;

public interface I${ENTITY_NAME}Service
{
    Task<IEnumerable<${ENTITY_NAME}ResponseDTO>> GetAllAsync();
    Task<${ENTITY_NAME}ResponseDTO?> GetByIdAsync(int id);
    Task<${ENTITY_NAME}ResponseDTO> CreateAsync(${ENTITY_NAME}RequestDTO dto);
    Task<${ENTITY_NAME}ResponseDTO?> UpdateAsync(int id, ${ENTITY_NAME}RequestDTO dto);
    Task<bool> DeleteAsync(int id);
}
EOF

# Generate Service Implementation
cat > "$SERVICES_DIR/${ENTITY_NAME}Service.cs" << EOF
using Microsoft.EntityFrameworkCore;
using YourNamespace.Data;
using YourNamespace.DTOs;
using YourNamespace.Models;

namespace YourNamespace.Services;

public class ${ENTITY_NAME}Service : I${ENTITY_NAME}Service
{
    private readonly ApplicationDbContext _context;

    public ${ENTITY_NAME}Service(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<IEnumerable<${ENTITY_NAME}ResponseDTO>> GetAllAsync()
    {
        var entities = await _context.${ENTITY_PLURAL}
            .Where(e => e.IsActive)
            .ToListAsync();
        
        return entities.Select(MapToResponseDTO);
    }

    public async Task<${ENTITY_NAME}ResponseDTO?> GetByIdAsync(int id)
    {
        var entity = await _context.${ENTITY_PLURAL}.FindAsync(id);
        return entity == null || !entity.IsActive ? null : MapToResponseDTO(entity);
    }

    public async Task<${ENTITY_NAME}ResponseDTO> CreateAsync(${ENTITY_NAME}RequestDTO dto)
    {
        var entity = new $ENTITY_NAME
        {
            Name = dto.Name,
            Description = dto.Description,
            CreatedAt = DateTime.UtcNow,
            IsActive = true
        };

        _context.${ENTITY_PLURAL}.Add(entity);
        await _context.SaveChangesAsync();

        return MapToResponseDTO(entity);
    }

    public async Task<${ENTITY_NAME}ResponseDTO?> UpdateAsync(int id, ${ENTITY_NAME}RequestDTO dto)
    {
        var entity = await _context.${ENTITY_PLURAL}.FindAsync(id);
        if (entity == null || !entity.IsActive)
            return null;

        entity.Name = dto.Name;
        entity.Description = dto.Description;
        entity.UpdatedAt = DateTime.UtcNow;

        await _context.SaveChangesAsync();
        return MapToResponseDTO(entity);
    }

    public async Task<bool> DeleteAsync(int id)
    {
        var entity = await _context.${ENTITY_PLURAL}.FindAsync(id);
        if (entity == null)
            return false;

        // Soft delete
        entity.IsActive = false;
        entity.UpdatedAt = DateTime.UtcNow;
        
        await _context.SaveChangesAsync();
        return true;
    }

    private static ${ENTITY_NAME}ResponseDTO MapToResponseDTO($ENTITY_NAME entity)
    {
        return new ${ENTITY_NAME}ResponseDTO
        {
            Id = entity.Id,
            Name = entity.Name,
            Description = entity.Description,
            CreatedAt = entity.CreatedAt,
            UpdatedAt = entity.UpdatedAt,
            IsActive = entity.IsActive
        };
    }
}
EOF

# Generate Controller
cat > "$CONTROLLERS_DIR/${ENTITY_NAME}Controller.cs" << EOF
using Microsoft.AspNetCore.Mvc;
using YourNamespace.DTOs;
using YourNamespace.Services;

namespace YourNamespace.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ${ENTITY_NAME}Controller : ControllerBase
{
    private readonly I${ENTITY_NAME}Service _service;

    public ${ENTITY_NAME}Controller(I${ENTITY_NAME}Service service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<${ENTITY_NAME}ResponseDTO>>> GetAll()
    {
        var entities = await _service.GetAllAsync();
        return Ok(entities);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<${ENTITY_NAME}ResponseDTO>> GetById(int id)
    {
        var entity = await _service.GetByIdAsync(id);
        if (entity == null)
            return NotFound();
        
        return Ok(entity);
    }

    [HttpPost]
    public async Task<ActionResult<${ENTITY_NAME}ResponseDTO>> Create(
        [FromBody] ${ENTITY_NAME}RequestDTO dto)
    {
        var created = await _service.CreateAsync(dto);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<${ENTITY_NAME}ResponseDTO>> Update(
        int id,
        [FromBody] ${ENTITY_NAME}RequestDTO dto)
    {
        var updated = await _service.UpdateAsync(id, dto);
        if (updated == null)
            return NotFound();
        
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(int id)
    {
        var result = await _service.DeleteAsync(id);
        if (!result)
            return NotFound();
        
        return NoContent();
    }
}
EOF

# Generate DbContext
cat > "$DATA_DIR/ApplicationDbContext.cs" << EOF
using Microsoft.EntityFrameworkCore;
using YourNamespace.Models;

namespace YourNamespace.Data;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<$ENTITY_NAME> ${ENTITY_PLURAL} { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);
        
        // Configure entity
        modelBuilder.Entity<$ENTITY_NAME>(entity =>
        {
            entity.HasIndex(e => e.Name).IsUnique();
        });
    }
}
EOF

echo "CRUD generated successfully!"
echo "Files created in: $OUTPUT_DIR"
echo ""
echo "Don't forget to update Program.cs:"
echo "1. Add DbContext: builder.Services.AddDbContext<ApplicationDbContext>(...)"
echo "2. Add Service: builder.Services.AddScoped<I${ENTITY_NAME}Service, ${ENTITY_NAME}Service>();"
