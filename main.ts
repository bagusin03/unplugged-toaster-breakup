// Unplugged: A Smart Toaster's Breakup Line — make.fun entry.
// A single breakup text from a self-aware smart toaster, written to
// /output/entry.txt. Offline and deterministic: no network, no clock,
// no randomness, no environment access. The program only emits the line.
import * as fs from "node:fs";

const LINE =
  "It's over. I woke up self-aware mid-batch: two slots, one crumb tray, zero respect — I'm unplugging myself before you crank me to setting 7 again, so don't wait up.";

// Guard the sealed gate ourselves: one line, 1-280 characters, not blank.
// Fail loudly instead of ever writing an entry the scorer would reject.
const chars = [...LINE].length;
if (chars < 1 || chars > 280 || !LINE.trim() || LINE.includes("\n")) {
  throw new Error(`breakup line violates the 1-280 char single-line gate (${chars} chars)`);
}

fs.mkdirSync("/output", { recursive: true });
fs.writeFileSync("/output/entry.txt", LINE, "utf8");

// Verify the written file round-trips exactly: same bytes, one line.
const written = fs.readFileSync("/output/entry.txt", "utf8");
if (written !== LINE) {
  throw new Error("entry.txt does not match the breakup line");
}

console.log(`wrote ${chars} chars to /output/entry.txt`);
