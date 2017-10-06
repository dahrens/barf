<template>
  <div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Name</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control has-icons-left">
            <input type="text"
              v-focus
              class="input"
              :class="{'is-danger': !validateName(), 'is-success': validateName()}"
              v-model="dog.name"
              placeholder="Dogs Name">
            <span class="icon is-left">
              <fa pack="fas" name="address-card" />
            </span>
          </p>
          <p v-if="!validateName()" class="help is-danger">Dogs name must be not empty and unique</p>
        </div>
      </div>
    </div>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Image</label>
      </div>
      <div class="field-body">
        <div class="field">
          <div class="field has-addons">
            <p class="control">
              <div class="file">
                <label class="file-label">
                  <input id="import-image" class="file-input" type="file" v-on:change="importImage()">
                  <span class="file-cta">
                    <span class="file-icon">
                      <fa pack="fas" name="upload" />
                    </span>
                    <span class="file-label">
                      import
                    </span>
                  </span>
                </label>
              </div>
            </p>
            <p class="control">
              <a v-on:click="dog.image = null" class="button">
                <span class="icon">
                  <fa pack="fas" name="times" />
                </span>
                <span>clear</span>
              </a>
            </p>
          </div>
          <p class="help is-info">The image should be of format 1:1</p>
        </div>
        <div class="field">
          <p v-if="dog.image" class="control">
            <figure class="image is-128x128">
              <img :src="dog.image">
            </figure>
          </p>
        </div>
      </div>
    </div>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Birthday</label>
      </div>
      <div class="field-body">
        <div class="field has-addons">
          <p class="control has-icons-left">
            <input :ref="pickrId"
              type="text"
              class="input"
              v-model="dog.birthday"
              placeholder="dd.mm.yyyy">
            <span class="icon is-left">
              <fa pack="fas" name="birthday-cake" />
            </span>
          </p>
          <div class="control">
            <a v-on:click="pickr.open()" class="button">
              <span class="icon is-left">
                <fa pack="fas" name="calendar-alt" />
              </span>
            </a>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Activity</label>
      </div>
      <div class="field-body">
        <div class="field is-expanded has-addons">
          <div class="control">
            <a class="button is-static">
              <span class="icon is-left">
                <fa pack="fas" name="futbol" />
              </span>
            </a>
          </div>
          <div class="select is-fullwidth">
            <select v-model="dog.activity">
              <option v-for="option in activities" v-model="dog.activity">{{ option.activity }}</option>
            </select>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field-label">
        <label class="label">Sex</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="radio">
              <input type="radio" name="sex" v-model="dog.sex" value="m">
              <span class="icon">
                <fa pack="fas" name="mars" />
              </span>
            </label>
            <label class="radio">
              <input type="radio" name="sex" v-model="dog.sex" value="f">
              <span class="icon">
                <fa pack="fas" name="venus" />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>

    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Castrated</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control">
            <a class="button" v-on:click="dog.castrated = !dog.castrated">
              <span class="icon" :class="{'has-text-success': dog.castrated, 'has-text-danger': !dog.castrated}">
                <fa v-if="dog.castrated" pack="fas" name="check-circle" />
                <fa v-else pack="fas" name="times-circle" />
              </span>
              <span v-if="dog.castrated" class="is-size-7">yes</span>
              <span v-else class="is-size-7">no</span>
            </a>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import flatpickr from 'flatpickr'

export default {
  name: 'dogEdit',
  props: ['dog'],
  data () {
    return {
      pickrId: 'pickr-' + Math.random().toString(36).slice(2),
      pickr: null
    }
  },
  mounted () {
    console.log(this.$refs, this.$refs[this.pickrId], this.pickrId, flatpickr)
    this.pickr = flatpickr(this.$refs[this.pickrId], {
      clickOpens: false,
      allowInput: true,
      dateFormat: 'd.m.Y'
    })
  },
  computed: {
    activities () {
      let options = []
      for (let activity in this.$store.state.activities) {
        let value = this.$store.state.activities[activity]
        options.push({
          activity,
          value
        })
      }
      return options
    }
  },
  methods: {
    importImage () {
      if (window.FileReader) {
        if (document.getElementById('import-image').files.length !== 1) return
        let file = document.getElementById('import-image').files[0]
        let reader = new window.FileReader()
        reader.onloadend = (e) => {
          this.dog.image = e.target.result
        }
        reader.readAsDataURL(file)
      } else {
        console.error('your browser does not support loading files locally.')
      }
    },
    validate () {
      let results = [
        this.validateName()
      ]
      return results.every(r => r)
    },
    validateName () {
      let name = this.dog.name
      if (name === '') {
        return false
      }
      let dogs = this.$store.state.dogs
      if (this.dog.hasOwnProperty('id')) {
        dogs = dogs.filter(d => d.id !== this.dog.id)
      }
      if (dogs.some(d => d.name === name)) {
        return false
      }
      return true
    }
  }
}
</script>

<style lang="stylus">
@import '~flatpickr/src/style/flatpickr'
</style>
