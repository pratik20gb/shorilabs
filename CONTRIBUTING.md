# Contributing to shorilabs

Thank you for your interest in contributing to shorilabs! This document provides guidelines and instructions for contributing.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/shorilabs.git`
3. Install dependencies: `npm install`
4. Create a branch: `git checkout -b feature/your-feature-name`

## Development

### Running the Project

```bash
npm run dev
```

Visit `http://localhost:8080` to see the app.

### Building

```bash
npm run build
npm run preview
```

## Adding New Patterns

1. Edit `src/data/patterns.ts`
2. Add your pattern following the existing format:

```typescript
{
  id: "your-pattern-id",
  name: "Your Pattern Name",
  category: "gradients" | "geometric" | "decorative" | "effects",
  isNew: true, // Optional
  css: `your-css-here;`,
  tailwind: `your-tailwind-classes`,
}
```

3. Export patterns for CLI: `npm run export-patterns`
4. Test your changes locally

## Submitting Changes

1. Ensure your code follows the existing style
2. Test your changes thoroughly
3. Commit with a clear message: `git commit -m "Add: description of changes"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request on GitHub

## Code Style

- Use TypeScript
- Follow existing code formatting
- Add comments for complex logic
- Keep components focused and reusable

## Reporting Issues

If you find a bug or have a suggestion:

1. Check if the issue already exists
2. Create a new issue with:
   - Clear title
   - Description of the problem
   - Steps to reproduce (if applicable)
   - Expected vs actual behavior

## Questions?

Feel free to open an issue for any questions or reach out via [Twitter](https://twitter.com/sage_pratik).

Thank you for contributing! 🎉

