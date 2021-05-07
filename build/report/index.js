const fs = require('fs');
const path = require('path');
const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const printer = require('lighthouse/lighthouse-cli/printer');
const Reporter = require('lighthouse/lighthouse-core/report/report-generator');
const { Command } = require('commander');
const program = new Command();
const desktopConfig = require('./lighthouse-desktop-config.js');
const mobileConfig = require('./lighthouse-mobile-config.js');

let chrome;
const outputPath = path.resolve(__dirname, '../../cases');
let taskList = [
  `https://juejin.cn/`,
  `https://juejin.cn/`,
  `https://juejin.cn/`,
]

program
  .option('-t, --type <type>', 'mobile pc')
  .option('-tl, --tlist [list...]', 'task list <Array>');
program.parse(process.argv);
const options = program.opts() || {};

console.log(options)

// if (options.tlist) {
//   const dataType = Object.prototype.toString.call(options.tlist).replace(/\[object (\w+)\]/, "$1").toLowerCase();
//   if (dataType === 'array') {
//     taskList = options.tlist;
//   } else if (dataType === 'string') {
//     taskList = [options.tlist]
//   }
// }

// 开启chrome
async function launchChrome() {
  try {
    chrome = await chromeLauncher.launch({
      chromeFlags: [
        "--disable-gpu",
        "--no-sandbox",
        "--headless"
      ],
      enableExtensions: true,
      logLevel: 'error',
    });

    return {
      port: chrome.port,
      chromeFlags: [
        "--headless"
      ],
      logError: 'error',
    }
  } catch (e) {
    console.log("ENOW lighthouse error: launching Chrome ", e);
  }
}

// 启动lighthouse测试
async function lighthouseRunner(url, opt, config = { extends: 'lighthouse:default' }) {
  try {
    return await lighthouse(url, opt, config);
  } catch (e) {
    console.log("ENOW lighthouse error: running lighthouse");
  }
}

// 生成报告
function genReport(result) {
  return Reporter.generateReport(result.lhr, 'html');
}

// 每个页面的测试入口
async function run(url, timestamp, num, config) {
  let chromeOpt = await launchChrome();
  let result = await lighthouseRunner(url, chromeOpt, config);
  let report = genReport(result);

  if (!fs.existsSync(outputPath)) {
    await fs.mkdirSync(outputPath)
  }

  // 保存报告
  await printer.write(report, 'html', `./cases/lighthouse-report@${timestamp}-${num}.html`);

  result.lhr.audits['first-contentful-paint'].rawValue;
  let res = {
    audits: {
      "first-contentful-paint": result.lhr.audits['first-contentful-paint']
    },
    categories: result.lhr.categories,
    lighthouseVersion: result.lhr.lighthouseVersion,
    requestedUrl: result.lhr.requestedUrl
  }

  // 关闭chrome
  await chrome.kill();
  return res;
}

// 生成总报告
async function write(file, report) {
  try {
    await fs.writeFileSync(file, report);
    return true
  } catch (e) {
    console.log("error while writing report ", e);
  }
}

module.exports = async function () {
  const timestamp = Date.now();
  const spent = [];

  console.log(`共 ${taskList.length} 个任务`);

  for (let i = 0; i < taskList.length; i++) {
    console.log(`当前第 ${i + 1} 个任务`)
    spent.push(await run(taskList[i], timestamp, i, options.type === 'mobile' ? mobileConfig : desktopConfig));
  }

  // 替换模板中的内容
  const template = await fs.readFileSync('./build/report/template.html', 'utf-8');
  const summary = Reporter.replaceStrings(template, [{
    search: '%% TIME_SPENT %%',
    replacement: JSON.stringify(spent)
  }, {
    search: '%% TIMESTAMP %%',
    replacement: timestamp
  }]);

  await write(`./cases/summary@${timestamp}.html`, summary);
}