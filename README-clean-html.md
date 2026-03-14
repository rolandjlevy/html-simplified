# clean-html.js

Clean HTML files by removing scripts, styles, SVGs, stylesheet links, comments, and tracking code.

## Usage

```bash
# Clean a file (creates input.cleaned.html)
node scripts/clean-html.js input.html

# Specify output file
node scripts/clean-html.js input.html output.html

# Output to stdout (for piping)
node scripts/clean-html.js input.html -

# Make executable and run directly
chmod +x scripts/clean-html.js
./scripts/clean-html.js input.html
```

## What it removes

- `<script>...</script>` tags and their contents
- `<style>...</style>` tags and their contents
- `<svg>...</svg>` tags and their contents
- `<link rel="stylesheet" ...>` tags
- HTML comments `<!-- ... -->`
- `<noscript>` tags containing styles, scripts, or tracking code

## What it keeps

- All semantic HTML structure (html, body, header, main, section, article, footer)
- Content elements (headings, paragraphs, lists, tables, forms)
- Images and anchors
- Important attributes (href, src, alt, id, class, aria-*)

## Examples

```bash
# Clean jammy.co.uk backup
node scripts/clean-html.js src/components/OrderSuccess/jammy.co.uk.bak

# Clean and pipe to another tool
node scripts/clean-html.js input.html - | grep -i "<a href"

# Clean multiple files
for file in *.html; do
  node scripts/clean-html.js "$file" "cleaned-$file"
done
```

## Output

The script reports:
- Size reduction percentage
- Count of removed elements (scripts, styles, SVGs, stylesheets, comments)
- Input/output file paths

Example output:
```
Reading: jammy.co.uk.bak
Wrote: jammy-cleaned.html
Size: 415780 → 335285 bytes (19.4% reduction)
Removed:
  - <script> tags: 130
  - <style> tags: 1
  - <svg> tags: 15
  - <link rel="stylesheet">: 1
  - HTML comments: 14
```
