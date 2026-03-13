# Scripts

Utility scripts for HTML processing and link extraction.

## Available Scripts

### 1. clean-html.js

Clean HTML files by removing scripts, styles, SVGs, stylesheet links, comments, and tracking code while preserving semantic structure.

**Usage:**
```bash
node scripts/clean-html.js input.html [output.html]
./scripts/clean-html.js input.html
```

**What it removes:**
- `<script>...</script>` tags and contents
- `<style>...</style>` tags and contents
- `<svg>...</svg>` tags and contents
- `<link rel="stylesheet">` tags
- HTML comments `<!-- -->`
- `<noscript>` blocks with tracking code

**What it keeps:**
- Semantic HTML structure
- Content elements (headings, paragraphs, lists, tables, forms)
- Images, anchors, and important attributes

[Full documentation](./README-clean-html.md)

---

### 2. extract-links.js

Extract only `<a href>` tags and plain text from HTML, removing all other markup.

**Usage:**
```bash
node scripts/extract-links.js input.html [output.txt]
./scripts/extract-links.js input.html
```

**What it does:**
- Removes all HTML tags except `<a href>` anchors
- Preserves anchor tags with all attributes
- Keeps plain text content
- Decodes HTML entities
- Cleans excessive whitespace

**Output format:**
```
Plain text content...
<a href="https://example.com/page">Link Text</a>
More plain text...
```

[Full documentation](./README-extract-links.md)

---

## Quick Examples

```bash
# Clean a bloated HTML file
node scripts/clean-html.js page.html page-cleaned.html

# Extract only links and text
node scripts/extract-links.js page.html page-links.txt

# Chain operations: clean first, then extract links
node scripts/clean-html.js input.html - | node scripts/extract-links.js - output.txt

# Count links in a file
node scripts/extract-links.js page.html - | grep -c "<a href"
```

## Installation

Make scripts executable:
```bash
chmod +x scripts/*.js
```

Then run directly:
```bash
./scripts/clean-html.js input.html
./scripts/extract-links.js input.html
```
