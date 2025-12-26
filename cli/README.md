# @shorilabs/cli

CLI tool to browse and install shorilabs patterns and buttons.

## Installation

```bash
npm install -g @shorilabs/cli
```

## Usage

### List Components

```bash
# List all patterns
shorilabs patterns

# List all buttons
shorilabs buttons

# Filter by category
shorilabs patterns --category gradients
shorilabs buttons --category neon

# Output as JSON
shorilabs patterns --json
```

### Get Component Details

```bash
# Get pattern CSS
shorilabs get aurora-glow

# Get button CSS
shorilabs get neon-blue --type button

# Get only Tailwind classes
shorilabs get aurora-glow --format tailwind
```

### Add to Project

```bash
# Add pattern to patterns.css
shorilabs add aurora-glow

# Add button to buttons.css
shorilabs add neon-blue --type button

# Specify output file
shorilabs add aurora-glow --file src/styles/backgrounds.css

# Append instead of overwrite
shorilabs add cyber-sunset --append

# Output Tailwind classes
shorilabs add aurora-glow --tailwind
```

### Search Components

```bash
# Search all components
shorilabs search gradient

# Search only patterns
shorilabs search geometric --type patterns

# Search only buttons
shorilabs search neon --type buttons

# Output as JSON
shorilabs search gradient --json
```

### Get Info

```bash
shorilabs info
```

## Pattern Categories

| Category | Description |
|----------|-------------|
| gradients | Gradient backgrounds |
| geometric | Geometric patterns |
| decorative | Decorative patterns |
| effects | Special effects |

## Button Categories

| Category | Description |
|----------|-------------|
| primary | Primary action buttons |
| secondary | Secondary buttons |
| outline | Outline/bordered buttons |
| ghost | Ghost/transparent buttons |
| animated | Buttons with animations |
| 3d | 3D effect buttons |
| neon | Neon glow buttons |

## Examples

```bash
# Quick workflow
shorilabs patterns                    # See all patterns
shorilabs get aurora-glow             # Preview CSS
shorilabs add aurora-glow             # Add to project

# Working with buttons
shorilabs buttons                     # See all buttons
shorilabs get neon-blue -t button     # Preview button CSS
shorilabs add neon-blue -t button     # Add to project
```

## Links

- Website: https://shorilabs.xyz
- GitHub: https://github.com/pratik20gb/shorilabs
- Author: [Pratik](https://thepratik.xyz)

## License

MIT
