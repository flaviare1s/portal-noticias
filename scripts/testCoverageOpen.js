const { spawn, spawnSync } = require("node:child_process");
const path = require("node:path");

const jestBinPath = path.join(
  process.cwd(),
  "node_modules",
  "jest",
  "bin",
  "jest.js",
);

const coverageReportPath = path.join(
  process.cwd(),
  "coverage",
  "lcov-report",
  "index.html",
);

const coverageRun = spawnSync(
  process.execPath,
  [jestBinPath, "--coverage", "--runInBand", "--passWithNoTests"],
  {
    stdio: "inherit",
    shell: false,
  },
);

let openCommand;
let openArgs;

if (process.platform === "win32") {
  openCommand = "cmd.exe";
  openArgs = ["/c", "start", "", coverageReportPath];
} else if (process.platform === "darwin") {
  openCommand = "open";
  openArgs = [coverageReportPath];
} else {
  openCommand = "xdg-open";
  openArgs = [coverageReportPath];
}

const openRun = spawn(openCommand, openArgs, {
  detached: true,
  stdio: "ignore",
  shell: false,
});

openRun.unref();

openRun.on("error", (error) => {
  console.error(error.message);
});

if (coverageRun.error) {
  console.error(coverageRun.error.message);
}

process.exit(coverageRun.status ?? 1);
