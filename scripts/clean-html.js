#!/usr/bin/env node

const fs = require('fs');

/**
 * Clean HTML by removing scripts, styles, stylesheets, SVGs, comments, and tracking noscript tags
 * @param {string} html - Raw HTML string
 * @returns {string} - Cleaned HTML
 */
function cleanHtml(html) {
  let cleaned = html;

  // Remove <script>...</script> blocks
  cleaned = cleaned.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '');

  // Remove <style>...</style> blocks
  cleaned = cleaned.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '');

  // Remove <svg>...</svg> blocks
  cleaned = cleaned.replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '');

  // Remove any <link> tag where rel contains "stylesheet"
  cleaned = cleaned.replace(
    /<link\b(?=[^>]*\brel\s*=\s*(?:"[^"]*stylesheet[^"]*"|'[^']*stylesheet[^']*'|stylesheet\b))[^>]*>/gi,
    '',
  );

  // Remove HTML comments
  cleaned = cleaned.replace(/<!--[\s\S]*?-->/g, '');

  // Remove noscript blocks only if they contain styles, scripts, or tracking markers
  const trackingMarkers = [
    'tracking',
    'pixel',
    'gtm',
    'googletagmanager',
    'google-analytics',
    'analytics',
    'klaviyo',
    'trustpilot',
    'facebook',
    'tiktok',
    'hotjar',
  ];

  cleaned = cleaned.replace(
    /<noscript\b[^>]*>[\s\S]*?<\/noscript>/gi,
    (match) => {
      const lower = match.toLowerCase();
      if (lower.includes('<style') || lower.includes('<script')) {
        return '';
      }
      if (trackingMarkers.some((marker) => lower.includes(marker))) {
        return '';
      }
      return match;
    },
  );

  return cleaned;
}

/**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // eslint-disable-next-line no-console
    console.error('Usage: node clean-html.js <input-file> [output-file]');
    // eslint-disable-next-line no-console
    console.error('');
    // eslint-disable-next-line no-console
    console.error('Examples:');
    // eslint-disable-next-line no-console
    console.error('  node clean-html.js input.html');
    // eslint-disable-next-line no-console
    console.error('  node clean-html.js input.html output.html');
    // eslint-disable-next-line no-console
    console.error('  node clean-html.js input.html - (outputs to stdout)');
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || inputFile.replace(/(\.[^.]+)?$/, '.cleaned$1');

  // Read input file
  if (!fs.existsSync(inputFile)) {
    // eslint-disable-next-line no-console
    console.error(`Error: Input file "${inputFile}" not found`);
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.error(`Reading: ${inputFile}`);
  const html = fs.readFileSync(inputFile, 'utf-8');
  const originalSize = html.length;

  // Clean HTML
  const cleaned = cleanHtml(html);
  const cleanedSize = cleaned.length;

  // Output results
  if (outputFile === '-') {
    // Output to stdout
    process.stdout.write(cleaned);
  } else {
    // Write to file
    fs.writeFileSync(outputFile, cleaned, 'utf-8');
    // eslint-disable-next-line no-console
    console.error(`Wrote: ${outputFile}`);
  }

  // Report stats
  const reduction = ((1 - cleanedSize / originalSize) * 100).toFixed(1);
  // eslint-disable-next-line no-console
  console.error(
    `Size: ${originalSize} → ${cleanedSize} bytes (${reduction}% reduction)`,
  );

  // Count removed elements
  const stats = {
    scripts: (html.match(/<script\b/gi) || []).length,
    styles: (html.match(/<style\b/gi) || []).length,
    svgs: (html.match(/<svg\b/gi) || []).length,
    stylesheets: (
      html.match(
        /<link\b[^>]*\brel\s*=\s*(?:"[^"]*stylesheet[^"]*"|'[^']*stylesheet[^']*')/gi,
      ) || []
    ).length,
    comments: (html.match(/<!--/g) || []).length,
  };

  // eslint-disable-next-line no-console
  console.error('Removed:');
  // eslint-disable-next-line no-console
  console.error(`  - <script> tags: ${stats.scripts}`);
  // eslint-disable-next-line no-console
  console.error(`  - <style> tags: ${stats.styles}`);
  // eslint-disable-next-line no-console
  console.error(`  - <svg> tags: ${stats.svgs}`);
  // eslint-disable-next-line no-console
  console.error(`  - <link rel="stylesheet">: ${stats.stylesheets}`);
  // eslint-disable-next-line no-console
  console.error(`  - HTML comments: ${stats.comments}`);
}

main();
