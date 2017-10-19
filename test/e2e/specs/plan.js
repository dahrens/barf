// For authoring Nightwatch tests, see
// http://nightwatchjs.org/guide#usage

module.exports = {
  'create initial dog': function (browser) {
    // automatically uses dev Server port from /config.index.js
    // default: http://localhost:8080
    // see nightwatch.conf.js
    const devServer = browser.globals.devServerURL

    browser
      .url(devServer)
      .waitForElementVisible('#dog-selector', 5000)
      .assert.elementPresent('button[name=create-dog]')
      .assert.elementNotPresent('.dog-panel')
      .assert.elementNotPresent('.plan-week')
      .assert.elementNotPresent('.statistics')
      .click('button[name=create-dog]')
      .pause(100)
      .assert.elementPresent('#dog-create-modal')
      .assert.attributeContains('#dog-create-modal', 'class', 'is-active')
      .assert.elementPresent('input[name=name]:focus')
      .setValue('input[name=name]', 'Foobar')
      .click('button[name=next]')
      .click('button[name=next]')
      .click('button[name=next]')
      .click('button[name=next]')
      .click('button[name=save]')
      .waitForElementVisible('.dog-panel', 1000)
      .assert.elementPresent('.dog-panel')
      .assert.containsText('.dog-panel', 'Foobar')
      .assert.elementPresent('.plan-week')
      .assert.elementPresent('.statistics')
      .refresh()
      .assert.elementPresent('.dog-panel')
      .assert.elementPresent('.plan-week')
      .assert.elementPresent('.statistics')
      .end()
  }
}
