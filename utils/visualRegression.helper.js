import fs from "fs";
import pixelmatch from "pixelmatch";
import { PNG } from "pngjs";

export async function captureScreenshot(driver, filePath) {
    const screenshot = await driver.takeScreenshot();
    fs.writeFileSync(filePath, screenshot, "base64");
}

export function compareScreenshots(baselinePath, actualPath, diffPath) {
    const baseline = PNG.sync.read(fs.readFileSync(baselinePath));
    const actual = PNG.sync.read(fs.readFileSync(actualPath));
    if (baseline.width !== actual.width || baseline.height !== actual.height) {
        throw new Error("Screenshot dimensions do not match.");
    }
    const diff = new PNG({ width: baseline.width, height: baseline.height });
    const diffPixels = pixelmatch(baseline.data, actual.data, diff.data, baseline.width, baseline.height, { threshold: 0.1 });
    fs.writeFileSync(diffPath, PNG.sync.write(diff));
    return diffPixels;
}