var sampleState = require('../fixtures/state')
var expect = require('chai').expect
var JSON = require('babel-runtime/core-js/json/stringify')

module.exports = {
  'check the features of the plan view': function (browser) {
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .execute(
        function (state) {
          window.localStorage.setItem('barf', JSON.stringify(state))
          return true
        }, [sampleState]
      )
      .pause(100)
      .refresh()
      .waitForElementVisible('#dog-selector', 1000)
      .click('a[name=wizard]')
      .pause(100)
      .click('a[name=fastenDay-Sunday]')
      .click('a[name=vegetarianDay-Wednesday]')
      .click('a[name=vegetarianDay-Saturday]')
      .assert.containsText('span[title=vegetables-count]', '2')
      .assert.containsText('span[title=grains-count]', '2')

    browser.getText("span[title=meat-count]", function (meatCountContent) {
      let meatCount = parseInt(meatCountContent.value.replace(' X', ''))
      let expectedMeatCount = 3
      let diff = expectedMeatCount - meatCount
      if (diff < 0) {
        for (let x = 0; x < Math.abs(diff); x++) {
          browser.click('a[name=meat-minus]')
          meatCount -= 1
          browser.assert.containsText('span[title=meat-count]', '' + meatCount)
        }
      } else if (diff > 0) {
        for (let x = 0; x < Math.abs(diff); x++) {
          browser.click('a[name=meat-plus]')
          meatCount += 1
          browser.assert.containsText('span[title=meat-count]', '' + meatCount)
        }
      }

      browser
        .click('a[name=meat-minus]')
        .click('a[name=meat-minus]')
        .click('a[name=meat-minus]')
        .click('a[name=meat-minus]')
        .click('a[name=meat-minus]')
        .assert.containsText('span[title=meat-count]', '' + 0)
        .click('a[name=meat-plus]')
        .click('a[name=meat-plus]')
        .click('a[name=meat-plus]')
        .assert.containsText('span[title=meat-count]', '' + expectedMeatCount)
        .click('button[name=allocate]').pause(100)
        .assert.elementCount('.week-day div[title=meat-tag]', expectedMeatCount)
        .end()
    })
  }
}
