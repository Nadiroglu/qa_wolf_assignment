// EDIT THIS FILE TO COMPLETE ASSIGNMENT QUESTION 1
const { log } = require("console");
const { chromium } = require("playwright");


const convertTime = (timeString) => {
  const now = new Date()

  //! splitting time as ['6', 'days']
  let [amount, unit] = timeString.split(' ')

  //! amount will be converted from string to integer between (0, 10)
  amount = parseInt(amount, 10)

  //!checking the time cases

  switch (unit) {
    case 'minutes':
    case 'minute':
      return now - amount * 60 * 1000
    case 'hours':
    case 'hour':
      return now - amount * 60 * 60 * 1000
    case 'days':
    case 'day':
      return now - amount * 24 * 60 * 60 * 1000
    default:
      return now
  }
}

async function saveHackerNewsArticles() {

  //! launch browser
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();
  //! go to Hacker News
  await page.goto("https://news.ycombinator.com/newest");
  await page.waitForSelector('.athing')

  //                                                                                                                        0             1             2
  //*!NOTE//!  
        // *This is the part with playground eval method which will take .subtext classed element in html and split it as 4 points | 3 minutes ago | by Nail
  const timeStamps = await page.$$eval('.subtext', elements => elements.slice(0,100).map((el) => el.innerText.split(' | ')[1])) // 1st indexed is 3 minutes ago 

  //! time will be converted as [amount, unit]
  const times = timeStamps.map(time => convertTime(time))

  let sorted = true

  //!checking the recent posts time
  for (i = 0; i < times.length - 1; i ++) {
    if (times[i] < times[i+1]) {
      sorted = false;
      break
    }
  }
  

  //! logging to console to debug
  if (sorted) {
    console.log('They are sorted')
  } else {
    console.log('They are trying hard to be sorted')
  }

  await browser.close()
}


//! invoke the function 
(async () => {
  await saveHackerNewsArticles();
})();
