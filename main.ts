// Worst Fix Ever: Funniest Commit Message — one-line entry.
// Writes the commit message to /output/entry.txt with runtime guards
// (sealed gate: 1–100 chars, single line).
import { writeFileSync, mkdirSync } from "node:fs";

const LINE =
  "fix: stop the crash by removing the error check that was crashing";

function validate(line: string): void {
  if (line.length < 1 || line.length > 100) {
    throw new Error(`entry must be 1-100 chars, got ${line.length}`);
  }
  if (line.includes("\n") || line.includes("\r")) {
    throw new Error("entry must be a single line");
  }
  if (line.trim() !== line) {
    throw new Error("entry must not have leading/trailing whitespace");
  }
  // Judge-brief guard: must read like a real commit message about a fix
  // that backfired — starts with a conventional "fix:" prefix and names
  // the repair that broke more than it mended.
  if (!line.startsWith("fix: ")) {
    throw new Error("entry must start with the 'fix: ' commit prefix");
  }
  if (!/remov(e|ing|ed)/.test(line)) {
    throw new Error("entry must name the repair that backfired");
  }
}

validate(LINE);

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
writeFileSync(`${outDir}/entry.txt`, LINE, "utf8");
console.log(`entry ok: ${LINE.length} chars, 1 line`);
