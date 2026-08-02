// Accessibility gate for CI (see .github/workflows/ci.yml). Scans a fixed set of representative
// pages against a running server with axe-core and fails the run on any "serious" or "critical"
// violation. Requires the app to already be built and running at BASE_URL.
import puppeteer from "puppeteer";
import { AxePuppeteer } from "@axe-core/puppeteer";

const BASE_URL = process.env.BASE_URL ?? "http://localhost:3000";

// A small, representative set covering the public site, a CMS-driven content page, a form, and
// the admin login — not exhaustive, but enough to catch a regression before it ships.
const PAGES = [
  "/",
  "/הצהרת-נגישות",
  "/צור-קשר",
  "/מכרזים",
  "/admin/login",
];

const FAILING_IMPACTS = new Set(["serious", "critical"]);

async function main() {
  const browser = await puppeteer.launch({ headless: true, args: ["--no-sandbox"] });
  let hasFailures = false;

  try {
    for (const path of PAGES) {
      const page = await browser.newPage();
      const url = new URL(path, BASE_URL).toString();
      try {
        await page.goto(url, { waitUntil: "networkidle0", timeout: 30000 });
        const results = await new AxePuppeteer(page).analyze();

        const failing = results.violations.filter((v) => FAILING_IMPACTS.has(v.impact ?? ""));
        const other = results.violations.filter((v) => !FAILING_IMPACTS.has(v.impact ?? ""));

        if (failing.length > 0) {
          hasFailures = true;
          console.error(`\n✗ ${path} — ${failing.length} serious/critical violation(s):`);
          for (const v of failing) {
            console.error(`  [${v.impact}] ${v.id}: ${v.help} (${v.nodes.length} node(s)) — ${v.helpUrl}`);
          }
        } else {
          console.log(`✓ ${path} — no serious/critical violations`);
        }
        if (other.length > 0) {
          console.log(`  (${other.length} lower-severity violation(s) logged, not blocking)`);
        }
      } finally {
        await page.close();
      }
    }
  } finally {
    await browser.close();
  }

  if (hasFailures) {
    console.error("\nAccessibility gate failed: fix the serious/critical violations above.");
    process.exit(1);
  }
  console.log("\nAccessibility gate passed.");
}

main().catch((err) => {
  console.error("a11y-scan crashed:", err);
  process.exit(1);
});
