# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Setup

This is a frontend-only application with no build process or dependencies. The app uses:
- HTML, JavaScript, and Tailwind CSS (loaded via CDN)
- Live server for development (recommended: VS Code Live Server extension)
- Default development server: http://127.0.0.1:3000/

## Architecture

The application has three implementations demonstrating different frontend approaches:

### Core Structure
- **Root (`/`)**: Landing page with links to all three implementations
- **Vanilla JS (`/vanilla/`)**: Pure JavaScript implementation with manual DOM manipulation
- **HTMX (`/htmx/`)**: HTMX-based implementation with declarative interactions
- **Alpine.js (`/alpinejs/`)**: Alpine.js reactive framework implementation

### Data Layer
- **Products** (`/data/products.json`): Fence styles with height options and associated parts
- **Parts** (`/data/parts.json`): Individual fence components with SKUs and dimensions
- **Relationship**: Product options reference part IDs to build complete fence systems

### Key Components

#### Vanilla Implementation (`/vanilla/`)
- `app.js`: Main application logic with async data loading
- Product selection triggers filtered parts display
- Input validation for fence length with real-time feedback
- Manual DOM manipulation for all interactions

#### HTMX Implementation (`/htmx/`)  
- `app.htmx.js`: HTMX response handlers and HTML rendering
- Declarative data loading via `hx-get` attributes
- Server-side rendering simulation for dynamic content
- Event-driven architecture with `hx-on` handlers

#### Alpine.js Implementation (`/alpinejs/`)
- `app.alpine.js`: Data fetching functions and validation utilities
- Reactive data binding with `x-data` and `x-model`
- Template rendering with `x-for` and conditional display with `x-show`
- Event handling with `x-on` for user interactions

### Data Flow
1. Load products from JSON and render selection UI
2. User selects fence style/height → filter and display required parts
3. User enters fence length → validate input and show feedback
4. Future: Calculate quantities based on length and generate PDF/email

## Key Functions

### Vanilla Implementation
- `loadData(file)`: Fetch JSON data with error handling
- `displayProducts()`: Render product selection interface
- `showParts(filteredParts)`: Display parts list for selected fence
- `validateInput()`: Validate fence length with error messages

### HTMX Implementation  
- `populateProducts(event)`: Handle product data loading response
- `showParts(requiredPartIds)`: Filter and display parts based on selection
- `renderProductHtml(data)`: Generate product selection HTML
- `renderPartsHtml(data)`: Generate parts list HTML

### Alpine.js Implementation
- `getProducts()`: Async function to fetch products data
- `getParts()`: Async function to fetch parts data
- `validateFenceLength(fenceLength)`: Real-time input validation
- Reactive filtering via `x-on:click` with array filter operations

## Planned Features
- Parts quantity calculation based on fence length
- PDF generation for parts list
- Email capture and sending functionality