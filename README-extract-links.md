# extract-links.js

Extract only `<a href>` tags and plain text from HTML files, removing all other markup.

## Usage

```bash
# Extract links and text (creates input.links.txt)
node scripts/extract-links.js input.html

# Specify output file
node scripts/extract-links.js input.html output.txt

# Output to stdout (for piping)
node scripts/extract-links.js input.html -

# Run directly (executable)
./scripts/extract-links.js input.html
```

## What it does

**Removes all HTML tags except:**
- `<a href="...">...</a>` anchor tags (preserved with all attributes)

**Keeps:**
- Plain text content
- Anchor tags with href attributes
- Decoded HTML entities (e.g., `&nbsp;` → space, `&amp;` → `&`)

**Removes:**
- All other HTML tags (`<div>`, `<span>`, `<img>`, `<button>`, etc.)
- Scripts, styles, SVGs, noscript blocks
- HTML comments
- Excessive whitespace

## Examples

```bash
# Extract links from jammy.co.uk
node scripts/extract-links.js src/components/OrderSuccess/jammy.co.uk.bak

# Count links
node scripts/extract-links.js input.html - | grep -c "<a href"

# Extract only unique URLs
node scripts/extract-links.js input.html - | grep -o 'href="[^"]*"' | sort -u
```

## Output format

The output is plain text with preserved anchor tags:

```
Welcome Roland! <a href="https://example.com/logout">logout</a>

<a href="https://example.com/shop">Shop</a>
<a href="https://example.com/about">About Us</a>

Contact us for more information.
```

## Example output

```
Reading: jammy.co.uk.bak
Wrote: jammy.co.uk.links.txt
Extracted 204 links
Output size: 141492 bytes
```

## Use cases

- Extract navigation menus as text + links
- Create a sitemap of all links in a page
- Analyze link structure without HTML noise
- Generate plain text versions with clickable links preserved
- Feed to LLMs for link analysis without bloat
