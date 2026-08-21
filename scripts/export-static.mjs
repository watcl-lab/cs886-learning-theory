import { cp, mkdir, rm, writeFile } from "node:fs/promises";
import { dirname, join, relative, resolve, sep } from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputDirectory = join(projectRoot, "_site");
const relativeOutput = relative(projectRoot, outputDirectory);

if (relativeOutput.startsWith("..") || relativeOutput.split(sep).includes("..")) {
  throw new Error("Static output directory must remain inside the project.");
}

const configuredUrl = process.env.SITE_URL ?? "http://localhost/";
const siteUrl = new URL(configuredUrl.endsWith("/") ? configuredUrl : `${configuredUrl}/`);

const workerUrl = pathToFileURL(join(projectRoot, "dist", "server", "index.js"));
workerUrl.searchParams.set("static-export", `${Date.now()}`);
const { default: worker } = await import(workerUrl.href);

const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  {
    ASSETS: {
      fetch: async () => new Response("Not found", { status: 404 }),
    },
  },
  {
    waitUntil() {},
    passThroughOnException() {},
  },
);

if (!response.ok) {
  throw new Error(`Course page render failed with status ${response.status}.`);
}

let html = await response.text();
const faviconUrl = new URL("favicon.svg", siteUrl).href;
html = html
  .replace(/<link rel="modulepreload"[^>]*>/g, "")
  .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
  .replaceAll('href="/assets/', 'href="assets/')
  .replaceAll('src="/assets/', 'src="assets/')
  .replaceAll('href="/favicon.svg"', `href="${faviconUrl}"`)
  .replaceAll("href='/favicon.svg'", `href='${faviconUrl}'`)
  .replace(
    /content="https?:\/\/localhost(?::\d+)?\/og\.png"/g,
    `content="${new URL("og.png", siteUrl).href}"`,
  )
  .replace(
    "</head>",
    `<link rel="canonical" href="${siteUrl.href}"/></head>`,
  );

await rm(outputDirectory, { recursive: true, force: true });
await mkdir(outputDirectory, { recursive: true });
await cp(join(projectRoot, "dist", "client", "assets"), join(outputDirectory, "assets"), {
  recursive: true,
});
await cp(join(projectRoot, "public", "og.png"), join(outputDirectory, "og.png"));
await cp(join(projectRoot, "public", "favicon.svg"), join(outputDirectory, "favicon.svg"));
await writeFile(join(outputDirectory, "index.html"), html, "utf8");
await writeFile(join(outputDirectory, ".nojekyll"), "", "utf8");

console.log(`Static site exported to ${outputDirectory}`);
