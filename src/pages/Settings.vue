<template>
  <div class="settings">
    <a id="downloadAnchorElem" style="display:none"></a>
    <section class="hero is-primary is-bold">
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
                  <a v-on:click="exportData()" class="button is-dark">
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
            <label class="label">Meals</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input type="radio" name="useMeals" :value="true" v-model="settings.useMeals" v-on:change="writeSettings()">
                  Yes
                </label>
                <label class="radio">
                  <input type="radio" name="useMeals" :value="false" v-model="settings.useMeals" v-on:change="writeSettings()">
                  No
                </label>
              </div>
              <p class="help is-info">The meals feature allows you to create a real plan for a week with things you can buy.</p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Stash</label>
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
              <p class="help is-info">This feature is experimental! In addition to the meals plan, this should enable you to track what you have at home.</p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Rounding</label>
          </div>
          <div class="field-body">
            <div class="field">
              <div class="control">
                <label class="radio">
                  <input type="radio" name="enableRounding" :value="true" v-model="settings.rounding.enabled" v-on:change="writeSettings()">
                  Yes
                </label>
                <label class="radio">
                  <input type="radio" name="enableRounding" :value="false" v-model="settings.rounding.enabled" v-on:change="writeSettings()">
                  No
                </label>
                <p class="help is-info">Do you want calculated amounts to be rounded?</p>
              </div>
            </div>
            <div v-if="settings.rounding.enabled" class="field">
              <div class="control">
                <input type="number"
                  class="input"
                  :min="10" :max="100" :step="5"
                  v-model="settings.rounding.value">
              </div>
              <p class="help is-info">Specify to which value everything should be rounded.</p>
            </div>
          </div>
        </div>
        <div class="field is-horizontal">
          <div class="field-label">
            <label class="label">Colors</label>
          </div>
          <div class="field-body">
            <div class="columns is-0 is-multiline ">
              <div class="column is-one-quarter" v-for="(color, subCategory) in settings.subCategoryColors">
                <div class="tags has-addons">
                  <span class="tag is-dark is-medium">{{ color }}</span>
                  <span class="tag is-light is-medium" v-bind:style="{
                    backgroundColor: color
                  }">{{ subCategory }}</span>
                </div>
                <color-picker v-model="colors[subCategory]" @input="onColorChange" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonSize from 'json-size'
import { Chrome } from 'vue-color'
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
  components: {
    'color-picker': Chrome
  },
  computed: {
    settings () {
      return this.$store.state.settings
    },
    dataSize () {
      return bytesToSize(jsonSize(this.$store.state))
    },
    colors () {
      let colorData = {}
      for (let subCategory in this.settings.subCategoryColors) {
        let color = this.settings.subCategoryColors[subCategory]
        colorData[subCategory] = {
          hex: color
        }
      }
      return colorData
    }
  },
  methods: {
    onColorChange (data) {
      for (let subCategory in this.colors) {
        this.settings.subCategoryColors[subCategory] = this.colors[subCategory].hex
      }
      this.writeSettings()
    },
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
