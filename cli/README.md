# @shorilabs/patterns-cli

CLI tool to browse and install shorilabs background patterns.

## Installation

```bash
npm install -g @shorilabs/patterns-cli
```

## Usage

### List all patterns

```bash
shorilabs list
```

Filter by category:
```bash
shorilabs list --category gradients
```

Output as JSON:
```bash
shorilabs list --json
```

### Get a specific pattern

```bash
shorilabs get aurora-glow
```

Get only CSS:
```bash
shorilabs get aurora-glow --format css
```

Get only Tailwind:
```bash
shorilabs get aurora-glow --format tailwind
```

### Add pattern to project

Add as CSS:
```bash
shorilabs add aurora-glow --file styles/patterns.css
```

Add as Tailwind:
```bash
shorilabs add aurora-glow --tailwind --file styles/patterns.css
```

Append to existing file:
```bash
shorilabs add grid-fade --append
```

### Search patterns

```bash
shorilabs search aurora
```

## Development

```bash
# Install dependencies
npm install

# Build
npm run build

# Run in development
npm run dev list
```

## Commands

- `shorilabs list` - List all available patterns
- `shorilabs get <id>` - Get a specific pattern
- `shorilabs add <id>` - Add pattern to your project
- `shorilabs search <query>` - Search patterns

