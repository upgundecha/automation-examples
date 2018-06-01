const HeadlessChrome = require('simple-headless-chrome')

const browser = new HeadlessChrome({
  headless: false
});

async function googleSearch() {
    try {
        
        await browser.init()
        const mainTab = await browser.newTab()
        
        await mainTab.goTo('http://www.google.com')
        await mainTab.type('input#lst-ib', 'Unmesh Gundecha')
        await mainTab.wait(2000)
        await mainTab.click('input.lsb')
        await mainTab.waitForPageToLoad()
        await mainTab.saveScreenshot('./search_results')
        
        console.log('Task Completed!')
        browser.close();

    } catch (err) {
        console.log('ERROR!', err)
    }
}

googleSearch();
