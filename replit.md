# Overview

The Apex Separatist Consortium is a dark-themed fictional faction website featuring a sci-fi universe with a galactic syndicate and multiple sub-factions. The website serves as an immersive portal into this fictional organization, complete with detailed faction pages and intelligence briefing systems. The site features a striking red and metallic silver cyberpunk aesthetic with advanced visual effects. All content is now publicly accessible without authentication requirements.

# Recent Changes

## Concord of Unity Standalone Deployment (September 2025)
- **Separate Domain Architecture**: Restructured Concord of Unity as completely independent Flask application for deployment on concord-of-unity.org
- **Standalone Flask Server**: Created secure main.py with proper file serving controls, API endpoints, and deployment configuration
- **Cross-Domain Navigation**: Updated all navigation links to use https://concord-of-unity.org for seamless territory transitions
- **Deployment Ready**: Configured for Replit Reserved VM deployment with gunicorn, custom domain support, and security hardening
- **Project Independence**: Complete separation with own requirements.txt, gitignore, deployment config, and documentation
- **Enhanced Security**: Implemented comprehensive file access controls blocking sensitive files and extensions

## Authentication System Removal (September 2025)
- **Public Access**: Completely removed authentication system - all faction pages and classified content now publicly accessible
- **Enemy Territory Maintained**: Concord of Unity retains enemy faction styling with warning badges and hostile territory design for immersion
- **Enhanced Transition System**: Territory-specific messaging and seamless navigation between Consortium and enemy Concord networks preserved
- **Streamlined Access**: Direct access to all content without login requirements while maintaining thematic territorial boundaries

## Intelligence Briefing System Expansion (September 2025)
- **New Intelligence Briefings**: Added 3-section dropdown menu: Enemy Factions, Consortium Heroes, and Threat Assessment
- **Enhanced Navigation**: Added "Return to Consortium" escape button across all Concord territory pages
- **Military Document Styling**: Implemented authentic intelligence briefing layouts with classification badges and threat level indicators

## September 2025 Redesign
- **Color Scheme Overhaul**: Transitioned from cyan/blue accents to striking red (#e63946) and metallic silver (#c0c0c0) theme
- **Cyberpunk Background**: Added custom-generated cyberpunk background image with red and metallic elements
- **Floating Master Crest**: Implemented floating Master Crest component in top-right corner with hover effects and mobile responsiveness
- **Visual Consistency**: Unified color palette across all pages including classified section, removing blue/purple accent inconsistencies
- **Open Access**: All content including classified files now publicly accessible for enhanced user experience

## Concord of Unity Faction (September 2025)
- **New Faction Addition**: Created complete "Concord of Unity" faction as diplomatic architects focused on unity and negotiation
- **Navigation Integration**: Added Concord of Unity link next to "The Shadow Grid" across all faction pages and main navigation
- **Custom Emblem**: Generated AI-powered faction emblem matching red/silver cyberpunk aesthetic theme
- **Complete Faction Page**: Built comprehensive faction page with 4-tab interface (Overview, Structure, Operations, Relations)
- **Faction Grid Integration**: Added faction card to main index page with thematic description and proper styling
- **Dropdown Menu Addition**: Integrated into faction dropdown menus across all pages with operational status indicator

## Mobile Optimization (September 2025)
- **Comprehensive Mobile Overhaul**: Complete mobile optimization across all pages with enhanced responsive design and touch interactions
- **JavaScript Stability**: Fixed all JavaScript errors affecting mobile experience with proper null checks and element validation
- **Mobile Navigation System**: Implemented hamburger menu with full-screen overlay and touch-friendly dropdown functionality
- **Touch-Friendly Interface**: Added 44px minimum touch targets for all interactive elements (buttons, navigation, tabs)
- **Enhanced Responsive Design**: Added comprehensive mobile breakpoints for <768px, 769px-1024px (tablet), and <480px (small phone)
- **Improved Mobile Typography**: Optimized font sizes, line heights, and spacing for better mobile readability across all pages
- **Mobile-First Layout**: Reorganized tier cards, tactics grids, and content sections for optimal mobile viewing
- **Touch Optimization**: Added webkit touch highlights, prevented text selection on buttons, disabled iOS font scaling
- **Content Optimization**: Enhanced faction pages, intelligence briefings, and all content sections for mobile devices
- **Performance Improvements**: Eliminated console errors and optimized mobile loading experience

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