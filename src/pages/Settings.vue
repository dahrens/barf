<template>
  <div class="settings">
    <a id="downloadAnchorElem" style="display:none"></a>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">Settings</h2>
          <p class="subtitle">
            Technical stuff related to this app.
          </p>
        </div>
      </div>
    </section>
    <div class="container">
      <div class="settings-form">
        <div class="field is-horizontal">
          <div class="field-label is-normal">
            <label class="label">Data</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="field has-addons">
                <p class="control">
                  <div class="file">
                    <label class="file-label">
                      <input id="import-file" class="file-input" type="file" name="resume" v-on:change="importData()">
                      <span class="file-cta">
                        <span class="file-icon">
                          <fa pack="fas" name="upload" />
                        </span>
                        <span class="file-label">
                          Import
                        </span>
                      </span>
                    </label>
                  </div>
                </p>
                <p class="control">
                  <a v-on:click="exportData()" class="button">
                    <span class="icon">
                      <fa pack="fas" name="download" />
                    </span>
                    <span>export</span>
                  </a>
                </p>
                <p class="control">
                  <a v-on:click="resetData()" class="button is-danger">
                    <span class="icon">
                      <fa pack="fas" name="bomb" />
                    </span>
                    <span>reset</span>
                  </a>
                </p>
              </div>
              <p class="help is-info">The size of your data is {{ dataSize }}</p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Enable Stash?</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input type="radio" name="useStash" :value="true" v-model="settings.useStash" v-on:change="writeSettings()">
                  Yes
                </label>
                <label class="radio">
                  <input type="radio" name="useStash" :value="false" v-model="settings.useStash" v-on:change="writeSettings()">
                  No
                </label>
              </div>
              <p class="help is-info">This feature is experimental</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonSize from 'json-size'
import { version } from '../../package.json'
import { SET_VERSION, WRITE_SETTINGS } from '@/store/mutation-types'
import defaultState from '@/store/default-state'

function bytesToSize (bytes) {
  var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
  if (bytes === 0) return '0 Byte'
  var i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
  return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
};

export default {
  name: 'settings',
  computed: {
    settings () {
      return this.$store.state.settings
    },
    dataSize () {
      return bytesToSize(jsonSize(this.$store.state))
    }
  },
  methods: {
    writeSettings () {
      this.$store.commit(WRITE_SETTINGS, this.settings)
      this.$forceUpdate()
    },
    exportData () {
      let data = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(this.$store.state))
      let dlAnchorElem = document.getElementById('downloadAnchorElem')
      dlAnchorElem.setAttribute('href', data)
      dlAnchorElem.setAttribute('download', 'barf.json')
      dlAnchorElem.click()
    },
    importData () {
      if (window.FileReader) {
        if (document.getElementById('import-file').files.length !== 1) return
        let file = document.getElementById('import-file').files[0]
        let reader = new window.FileReader()
        reader.onloadend = (e) => {
          let loadedState = JSON.parse(e.target.result)
          this.$store.replaceState(loadedState)
          // to trigger persist!
          this.$store.commit(SET_VERSION, version)
        }
        reader.readAsText(file)
      } else {
        console.error('your browser does not support loading files locally.')
      }
    },
    resetData () {
      this.$store.replaceState(defaultState)
      this.$store.commit(SET_VERSION, version)
    }
  }
}
</script>

<style lang="sass">
.settings-form
  margin: 0.5em
</style>
