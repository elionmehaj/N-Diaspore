import { access, cp, mkdir, readdir } from "node:fs/promises";
import path from "node:path";

const cwd = process.cwd();
const outputDir = path.join(cwd, "public");
const outputIndex = path.join(outputDir, "index.html");

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

async function list(dir) {
  try {
    return (await readdir(dir)).sort();
  } catch {
    return [];
  }
}

async function findBuiltPublic() {
  const candidates = [
    outputDir,
    path.resolve(cwd, "apps", "web", "dist", "public"),
    path.resolve(cwd, "..", "..", "public"),
  ];

  for (const candidate of candidates) {
    if (await exists(path.join(candidate, "index.html"))) {
      return candidate;
    }
  }

  return null;
}

const sourceDir = await findBuiltPublic();

if (!sourceDir) {
  console.error("[vercel-output] Could not find a built index.html.");
  console.error("[vercel-output] cwd:", cwd);
  console.error("[vercel-output] cwd files:", (await list(cwd)).join(", "));
  process.exit(1);
}

if (path.resolve(sourceDir) !== path.resolve(outputDir)) {
  await mkdir(outputDir, { recursive: true });
  await cp(sourceDir, outputDir, { recursive: true });
}

if (!(await exists(outputIndex))) {
  console.error("[vercel-output] public/index.html is still missing after copy.");
  console.error("[vercel-output] source:", sourceDir);
  console.error("[vercel-output] public files:", (await list(outputDir)).join(", "));
  process.exit(1);
}

console.log("[vercel-output] Ready:", path.relative(cwd, outputIndex) || outputIndex);
console.log("[vercel-output] Files:", (await list(outputDir)).join(", "));
