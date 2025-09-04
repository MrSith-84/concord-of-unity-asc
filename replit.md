# Overview

The Apex Separatist Consortium is a dark-themed fictional faction website built as a static site. It presents a sci-fi universe featuring a galactic syndicate with multiple sub-factions, each with their own lore, emblems, and specialized roles. The website serves as an immersive portal into this fictional organization, complete with detailed faction pages and thematic design elements.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

The application is built as a static website using vanilla HTML, CSS, and JavaScript with the following design decisions:

- **Pure Static Site**: No backend framework or server-side rendering, making it lightweight and easily deployable
- **CSS Framework**: Uses Pico CSS as the base framework for consistent styling and responsive design
- **Custom Theming**: Heavy customization with dark theme, red accent colors, and sci-fi aesthetics
- **Navigation System**: Sticky navigation with dropdown menus for faction access
- **Multi-page Structure**: Organized hierarchy with main pages and faction-specific subpages

## Page Structure

The site follows a hierarchical structure:

- **Main Pages**: Command Center (index.html) and Codex overview
- **Faction Pages**: Individual pages for each of the 5 factions under `/factions/` directory
- **Error Handling**: Custom 404 page maintaining theme consistency
- **Image Assets**: Faction emblems and crests stored in `/factions/images/` directory

## Design Patterns

- **Consistent Navigation**: Shared navigation component across all pages
- **Theme Consistency**: Unified dark theme with red (#e63946) and off-white (#f1faee) color scheme
- **Responsive Design**: Mobile-first approach using CSS Grid and Flexbox
- **Animation Effects**: CSS animations for page transitions and visual effects

## File Organization

The project uses a clean directory structure:
- Root level contains main pages and global assets
- `/factions/` subdirectory houses faction-specific content
- Shared CSS and JavaScript files for consistent styling and behavior

# External Dependencies

## CSS Framework
- **Pico CSS v1**: Lightweight CSS framework delivered via CDN for base styling and responsive grid system

## Fonts
- **Google Fonts**: Orbitron font family for sci-fi aesthetic typography

## Development Tools
- **Semgrep**: Code security scanning rules configured in `.config/.semgrep/` for maintaining code quality

The architecture prioritizes simplicity, maintainability, and thematic consistency while providing an immersive user experience for the fictional faction content.