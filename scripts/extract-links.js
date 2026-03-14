#!/usr/bin/env node

const fs = require('fs');

/**
 * Extract href values from all <a> tags
 * @param {string} html - Raw HTML string
 * @returns {string[]} - Array of href URLs
 */
function extractHrefs(html) {
  const hrefs = [];
  const anchorRegex = /<a\b[^>]*\bhref\s*=\s*["']([^"']*)["'][^>]*>/gi;

  let match;
  // eslint-disable-next-line no-cond-assign
  while ((match = anchorRegex.exec(html)) !== null) {
    hrefs.push(match[1]);
  }

  return hrefs;
} /**
 * Main execution
 */
function main() {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    // eslint-disable-next-line no-console
    console.error('Usage: node extract-links.js <input-file> [output-file]');
    // eslint-disable-next-line no-console
    console.error('');
    // eslint-disable-next-line no-console
    console.error('Examples:');
    // eslint-disable-next-line no-console
    console.error('  node extract-links.js input.html');
    // eslint-disable-next-line no-console
    console.error('  node extract-links.js input.html output.txt');
    // eslint-disable-next-line no-console
    console.error('  node extract-links.js input.html - (outputs to stdout)');
    process.exit(1);
  }

  const inputFile = args[0];
  const outputFile = args[1] || inputFile.replace(/(\.[^.]+)?$/, '.links.txt');

  // Read input file
  if (!fs.existsSync(inputFile)) {
    // eslint-disable-next-line no-console
    console.error(`Error: Input file "${inputFile}" not found`);
    process.exit(1);
  }

  // eslint-disable-next-line no-console
  console.error(`Reading: ${inputFile}`);
  const html = fs.readFileSync(inputFile, 'utf-8');

  // Extract href values
  const hrefs = extractHrefs(html);
  const output = hrefs.join('\n') + (hrefs.length > 0 ? '\n' : '');

  // Output results
  if (outputFile === '-') {
    // Output to stdout
    process.stdout.write(output);
  } else {
    // Write to file
    fs.writeFileSync(outputFile, output, 'utf-8');
    // eslint-disable-next-line no-console
    console.error(`Wrote: ${outputFile}`);
  }

  // Report stats
  // eslint-disable-next-line no-console
  console.error(`Extracted ${hrefs.length} links`);
}

main();
