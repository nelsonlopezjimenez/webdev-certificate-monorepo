#!/usr/bin/env node

/**
 * strip-solutions.js
 *
 * Strips solution code from assignment files based on language-specific
 * comment markers. Designed for course repos where the solution branch
 * is the single source of truth.
 *
 * SUPPORTED MARKERS BY FILE TYPE:
 *
 *   JS/JSX/TS/TSX:  // === SOLUTION START ===
 *                    // === SOLUTION END ===
 *
 *   CSS/SCSS/LESS:   /* === SOLUTION START === *​/
 *                    /* === SOLUTION END === *​/
 *
 *   HTML/SVG:        <!-- === SOLUTION START === -->
 *                    <!-- === SOLUTION END === -->
 *
 * USAGE:
 *   node strip-solutions.js [options] <source>
 *
 * OPTIONS:
 *   --output, -o <dir>     Output to a separate directory (default: ./student-dist)
 *   --in-place, -i         Overwrite files in place (USE WITH CAUTION)
 *   --replace, -r <mode>   Replacement mode: "todo", "blank", or "none" (default: "todo")
 *   --dry-run, -d          Preview changes without writing files
 *   --verbose, -v          Show detailed processing info
 *   --help, -h             Show this help message
 *
 * EXAMPLES:
 *   node strip-solutions.js ./assignments
 *   node strip-solutions.js ./assignments -o ./student-version
 *   node strip-solutions.js ./assignments -i -r blank
 *   node strip-solutions.js ./assignments --dry-run --verbose
 */

const fs = require("fs");
const path = require("path");

// ---------------------------------------------------------------------------
// Configuration
// ---------------------------------------------------------------------------

const SUPPORTED_EXTENSIONS = new Set([
  ".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs",
  ".css", ".scss", ".less",
  ".html", ".htm", ".svg", ".xml",
  ".json", // in case of jsonc with comments
]);

// Regex patterns for each comment style
// Each pattern matches the full block: marker line, content, end marker line
const MARKER_PATTERNS = [
  // // === SOLUTION START === ... // === SOLUTION END ===
  {
    regex: /^[ \t]*\/\/\s*={2,}\s*SOLUTION\s+START\s*={2,}.*\n([\s\S]*?)^[ \t]*\/\/\s*={2,}\s*SOLUTION\s+END\s*={2,}.*\n?/gm,
    commentPrefix: "//",
    extensions: new Set([".js", ".jsx", ".ts", ".tsx", ".mjs", ".cjs"]),
  },
  // /* === SOLUTION START === */ ... /* === SOLUTION END === */
  {
    regex: /^[ \t]*\/\*\s*={2,}\s*SOLUTION\s+START\s*={2,}\s*\*\/.*\n([\s\S]*?)^[ \t]*\/\*\s*={2,}\s*SOLUTION\s+END\s*={2,}\s*\*\/.*\n?/gm,
    commentPrefix: "/*",
    commentSuffix: "*/",
    extensions: new Set([".css", ".scss", ".less"]),
  },
  // <!-- === SOLUTION START === --> ... <!-- === SOLUTION END === -->
  {
    regex: /^[ \t]*<!--\s*={2,}\s*SOLUTION\s+START\s*={2,}\s*-->.*\n([\s\S]*?)^[ \t]*<!--\s*={2,}\s*SOLUTION\s+END\s*={2,}\s*-->.*\n?/gm,
    commentPrefix: "<!--",
    commentSuffix: "-->",
    extensions: new Set([".html", ".htm", ".svg", ".xml"]),
  },
];

// Directories/files to always skip
const SKIP_DIRS = new Set([
  "node_modules", ".git", "dist", "build", ".next",
  ".cache", "coverage", "__pycache__",
]);

// ---------------------------------------------------------------------------
// Argument parsing
// ---------------------------------------------------------------------------

function parseArgs(argv) {
  const args = {
    source: null,
    output: null,
    inPlace: false,
    replace: "todo",    // "todo" | "blank" | "none"
    dryRun: false,
    verbose: false,
    help: false,
  };

  let i = 2; // skip node and script path
  while (i < argv.length) {
    const arg = argv[i];
    switch (arg) {
      case "--output":
      case "-o":
        args.output = argv[++i];
        break;
      case "--in-place":
      case "-i":
        args.inPlace = true;
        break;
      case "--replace":
      case "-r":
        args.replace = argv[++i];
        if (!["todo", "blank", "none"].includes(args.replace)) {
          console.error(`Error: --replace must be "todo", "blank", or "none"`);
          process.exit(1);
        }
        break;
      case "--dry-run":
      case "-d":
        args.dryRun = true;
        break;
      case "--verbose":
      case "-v":
        args.verbose = true;
        break;
      case "--help":
      case "-h":
        args.help = true;
        break;
      default:
        if (arg.startsWith("-")) {
          console.error(`Unknown option: ${arg}`);
          process.exit(1);
        }
        args.source = arg;
    }
    i++;
  }

  // Defaults
  if (!args.inPlace && !args.output) {
    args.output = "./student-dist";
  }

  return args;
}

// ---------------------------------------------------------------------------
// File discovery
// ---------------------------------------------------------------------------

function collectFiles(dir, fileList = []) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    if (SKIP_DIRS.has(entry.name)) continue;
    if (entry.name.startsWith(".") && entry.name !== ".") continue;

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      collectFiles(fullPath, fileList);
    } else if (entry.isFile()) {
      const ext = path.extname(entry.name).toLowerCase();
      if (SUPPORTED_EXTENSIONS.has(ext)) {
        fileList.push(fullPath);
      }
    }
  }

  return fileList;
}

// ---------------------------------------------------------------------------
// Solution stripping
// ---------------------------------------------------------------------------

function getReplacementText(indent, ext, replaceMode) {
  if (replaceMode === "none") return "";
  if (replaceMode === "blank") return "\n";

  // "todo" mode — insert a TODO comment in the appropriate syntax
  const todoText = "TODO: Write your solution here";

  if ([".html", ".htm", ".svg", ".xml"].includes(ext)) {
    return `${indent}<!-- ${todoText} -->\n`;
  }
  if ([".css", ".scss", ".less"].includes(ext)) {
    return `${indent}/* ${todoText} */\n`;
  }
  // JS/JSX/TS/TSX and default
  return `${indent}// ${todoText}\n`;
}

function stripSolutions(content, filePath, replaceMode) {
  const ext = path.extname(filePath).toLowerCase();
  let result = content;
  let strippedCount = 0;

  for (const pattern of MARKER_PATTERNS) {
    // Reset regex state
    const regex = new RegExp(pattern.regex.source, pattern.regex.flags);

    result = result.replace(regex, (match) => {
      strippedCount++;

      // Detect indentation from the first line of the match
      const indentMatch = match.match(/^([ \t]*)/);
      const indent = indentMatch ? indentMatch[1] : "";

      // Rebuild: keep start marker, replace content, keep end marker
      const lines = match.split("\n");
      const startMarker = lines[0];

      // Find the end marker line
      let endMarker = "";
      for (let i = lines.length - 1; i >= 0; i--) {
        if (/={2,}\s*SOLUTION\s+END\s*={2,}/.test(lines[i])) {
          endMarker = lines[i];
          break;
        }
      }

      const replacement = getReplacementText(indent, ext, replaceMode);

      return startMarker + "\n" + replacement + endMarker + "\n";
    });
  }

  return { result, strippedCount };
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

function showHelp() {
  const helpText = fs
    .readFileSync(__filename, "utf8")
    .match(/\/\*\*([\s\S]*?)\*\//)?.[1];

  if (helpText) {
    const cleaned = helpText
      .split("\n")
      .map((line) => line.replace(/^\s*\*\s?/, ""))
      .join("\n");
    console.log(cleaned);
  }
}

function main() {
  const args = parseArgs(process.argv);

  if (args.help) {
    showHelp();
    process.exit(0);
  }

  if (!args.source) {
    console.error("Error: No source directory specified.");
    console.error("Usage: node strip-solutions.js [options] <source>");
    console.error("Try --help for more information.");
    process.exit(1);
  }

  const sourcePath = path.resolve(args.source);

  if (!fs.existsSync(sourcePath)) {
    console.error(`Error: Source path "${sourcePath}" does not exist.`);
    process.exit(1);
  }

  // Collect files
  const stat = fs.statSync(sourcePath);
  let files;

  if (stat.isFile()) {
    files = [sourcePath];
  } else {
    files = collectFiles(sourcePath);
  }

  if (files.length === 0) {
    console.log("No supported files found.");
    process.exit(0);
  }

  console.log(`\n📂 Source:      ${sourcePath}`);
  console.log(`📁 Output:      ${args.inPlace ? "IN PLACE" : path.resolve(args.output)}`);
  console.log(`🔄 Replace:     ${args.replace}`);
  console.log(`📄 Files found: ${files.length}`);
  if (args.dryRun) console.log(`🏃 DRY RUN — no files will be written`);
  console.log("");

  let totalStripped = 0;
  let filesModified = 0;

  for (const filePath of files) {
    const content = fs.readFileSync(filePath, "utf8");
    const { result, strippedCount } = stripSolutions(content, filePath, args.replace);

    if (strippedCount > 0) {
      filesModified++;
      totalStripped += strippedCount;

      const relPath = path.relative(sourcePath, filePath);

      if (args.verbose || args.dryRun) {
        console.log(`  ✂️  ${relPath} — ${strippedCount} solution block(s)`);
      }

      if (!args.dryRun) {
        if (args.inPlace) {
          fs.writeFileSync(filePath, result, "utf8");
        } else {
          const outPath = path.join(path.resolve(args.output), relPath);
          fs.mkdirSync(path.dirname(outPath), { recursive: true });
          fs.writeFileSync(outPath, result, "utf8");
        }
      }
    } else if (!args.inPlace && !args.dryRun) {
      // Copy unmodified files to output directory too
      const relPath = path.relative(sourcePath, filePath);
      const outPath = path.join(path.resolve(args.output), relPath);
      fs.mkdirSync(path.dirname(outPath), { recursive: true });
      fs.copyFileSync(filePath, outPath);
    }
  }

  console.log(`\n✅ Done: ${totalStripped} solution block(s) stripped from ${filesModified} file(s).`);

  if (!args.dryRun && !args.inPlace && args.output) {
    console.log(`📁 Output written to: ${path.resolve(args.output)}\n`);
  }
}

main();
