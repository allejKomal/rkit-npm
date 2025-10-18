# rkit-npm

A modern React component library with a beautiful design system built on top of Radix UI and Tailwind CSS.

## Features

- 🎨 **50+ Beautiful Components** - Pre-built, accessible components ready to use
- ⚡ **Built on Radix UI** - Unstyled, accessible components as foundation
- 🎯 **TypeScript First** - Full type safety out of the box
- 🌗 **Dark Mode Support** - Built-in theme switching with next-themes
- 📱 **Responsive Design** - Mobile-first approach
- ♿ **Accessible** - WCAG compliant components
- 🎨 **Tailwind CSS** - Utility-first styling
- 📦 **Tree Shakeable** - Import only what you need

## Installation

```bash
npm install rkit-npm
# or
yarn add rkit-npm
# or
pnpm add rkit-npm
```

### Peer Dependencies

Make sure you have these installed:

```bash
npm install react react-dom react-router-dom
```

## Usage

```tsx
import { Button, Card, Input } from "rkit-npm";
import "rkit-npm/styles";

function App() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Welcome</CardTitle>
      </CardHeader>
      <CardContent>
        <Input placeholder="Enter your name" />
        <Button>Submit</Button>
      </CardContent>
    </Card>
  );
}
```

## Import Styles

Import the stylesheet in your main entry file:

```tsx
import "rkit-npm/styles";
```

## Import Icons

```tsx
import { MenuIcon } from "rkit-npm/icons";

function Header() {
  return <MenuIcon className="h-6 w-6" />;
}
```

## Import Paths

The library provides multiple import paths for better organization:

### 1. Main Entry (Default)
All components, hooks, and utilities:
```tsx
import { Button, useTheme, cn } from "rkit-npm";
```

### 2. Primitives
All UI primitive components (Radix-based):
```tsx
import { Button, Card, Input, Dialog, Accordion } from "rkit-npm/primitives";
```

### 3. Components
Design system components:
```tsx
import { Avatar } from "rkit-npm/components";
```

### 4. Icons
All icon components:
```tsx
import { MenuIcon } from "rkit-npm/icons";
```

### 5. Styles
CSS stylesheets:
```tsx
import "rkit-npm/styles";
```

## Components

### Layout Components

- Accordion
- Card
- Collapsible
- Separator
- Tabs

### Form Components

- Button
- Checkbox
- Input
- Label
- Radio Group
- Select
- Slider
- Switch
- Textarea
- Form

### Navigation

- Breadcrumb
- Menu
- Navigation Menu
- Pagination
- Sidebar

### Overlay

- Alert Dialog
- Dialog
- Drawer
- Hover Card
- Popover
- Sheet
- Tooltip

### Data Display

- Avatar
- Badge
- Calendar
- Chart
- Table
- Progress

### And many more!

## Tailwind Configuration

If you're using Tailwind CSS in your project, you may need to configure your `tailwind.config.js`:

```js
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/rkit-npm/dist/**/*.{js,ts,jsx,tsx}",
  ],
  // ... rest of your config
};
```

## TypeScript

The library is written in TypeScript and includes type definitions out of the box.

```tsx
import type { ButtonProps } from "rkit-npm";

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## License

MIT © [alleJKomal](https://github.com/allejkomal)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Links

- [GitHub Repository](https://github.com/allejkomal/rkit-ui)
- [Issues](https://github.com/allejkomal/rkit-ui/issues)
