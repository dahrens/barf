<template>
  <div id="dog-selector" class="field has-addons has-addons-right has-addons-left">
    <p class="control">
      <button v-on:click="deleteDog()" name="delete-dog" class="button is-medium is-danger" :disabled="selectedDogId === 0">
        <span class="icon is-medium">
          <fa pack="fas" name="trash"/>
        </span>
      </button>
    </p>
    <div class="control has-icons-left is-expanded">
      <div class="select is-fullwidth is-medium">
        <select v-model="selectedDogId" :disabled="selectedDogId === 0">
          <option v-if="dogs.length === 0" disabled selected value="0">no dog available - create one!</option>
          <option v-for="d in dogs" v-bind:value="d.id">{{ d.name }}</option>
        </select>
        <div class="icon is-left has-text-primary">
          <fa pack="fas" name="paw" />
        </div>
      </div>
    </div>
    <p class="control">
      <button v-on:click="createDog()" name="create-dog" class="button is-medium is-success">
        <span class="icon is-medium">
          <fa pack="fas" name="plus"/>
        </span>
      </button>
    </p>
    <div id="dog-create-modal" class="modal" :class="{'is-active': showCreate}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <nav class="panel">
          <p class="panel-heading">
            Please provide a few details
            <a v-on:click="cancelCreate()" class="icon is-pulled-right has-text-dark">
              <fa pack="fas" name="times" />
            </a>
          </p>
          <div class="faked-panel-block">
            <div class="steps is-medium">
              <div class="step-item" :class="stepClasses(1)">
                <div class="step-marker">
                  <span class="icon">
                    <fa pack="fas" name="paw" />
                  </span>
                </div>
                <div class="step-details">
                  <p class="step-title">Dog</p>
                  <p class="is-size-7 is-uppercase">general info</p>
                </div>
              </div>
              <div class="step-item" :class="{'is-active': step === 2, 'is-completed is-success': step > 2}">
                <div class="step-marker">
                  <span class="icon">
                    <fa pack="fas" name="question" />
                  </span>
                </div>
                <div class="step-details">
                  <p class="step-title">Plan</p>
                  <p class="is-size-7 is-uppercase">general info</p>
                </div>
              </div>
              <div class="step-item" :class="{'is-active': step === 3, 'is-completed is-success': step > 3}">
                <div class="step-marker">
                  <span class="icon">
                    <fa pack="fas" name="sliders-h" />
                  </span>
                </div>
                <div class="step-details">
                  <p class="step-title">Distribution</p>
                  <p class="is-size-7 is-uppercase">what and how much</p>
                </div>
              </div>
              <div class="step-item" :class="{'is-active': step === 4, 'is-completed is-success': step > 4}">
                <div class="step-marker">
                  <span class="icon">
                    <fa pack="fas" name="flag" />
                  </span>
                </div>
                <div class="step-details">
                  <p class="step-title">Done</p>
                  <p class="is-size-7 is-uppercase">summary</p>
                </div>
              </div>
            </div>
          </div>
          <dogEdit v-if="step === 1" :dog="newDog"></dogEdit>
          <planMetaEdit v-if="step === 2" :dog="newDog"></planMetaEdit>
          <planDistributionEdit v-if="step === 3" :dog="newDog" :commit="false"></planDistributionEdit>
          <dogDetail v-if="step === 4" :dog="newDog" :imageSmall="true"></dogDetail>
          <div class="faked-panel-block">
            <div class="field has-addons is-centered">
              <p class="control is-expanded">
                <button v-on:click="prevStep()" name="prev" class="button is-primary" :disabled="step < 2">
                  <span class="icon">
                    <fa pack="fas" name="angle-left" />
                  </span>
                  <span>back</span>
                </button>
              </p>
              <p class="control">
                <button v-if="step < 4" name="next" v-on:click="nextStep()" class="button is-primary" >
                  <span>next</span>
                  <span class="icon">
                    <fa pack="fas" name="angle-right" />
                  </span>
                </button>
                <button v-else name="save" v-on:click="saveNewDog()" class="button is-primary">
                  <span class="icon">
                    <fa pack="fas" name="save" />
                  </span>
                  <span>save</span>
                </button>
              </p>
            </div>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import dogEdit from '@/components/DogEdit'
import planMetaEdit from '@/components/PlanMetaEdit'
import planDistributionEdit from '@/components/PlanDistributionEdit'
import dogDetail from '@/components/DogDetail'
import { SELECT_DOG, INSERT_DOG, REMOVE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogSelector',
  components: {
    dogEdit,
    planMetaEdit,
    planDistributionEdit,
    dogDetail
  },
  data () {
    return {
      showCreate: false,
      step: 0,
      newDog: null
    }
  },
  computed: {
    dogs () {
      return this.$store.state.dogs
    },
    selectedDogId: {
      get () {
        return this.$store.state.ui.selectedDogId
      },
      set (dogId) {
        this.$store.commit(SELECT_DOG, dogId)
      }
    },
    canStepFurther () {
      if (this.step === 1) {
        if (!this.newDog.name) return false
      }
      return true
    }
  },
  methods: {
    stepClasses (step) {
      let classes = []
      if (this.step > step) {
        classes.push('is-completed')
      }
      if (this.step === step) {
        classes.push('is-active')
      }
      if (this.canStepFurther) {
        classes.push('is-success')
      }
      return classes.join(' ')
    },
    prevStep () {
      if (this.step > 1) this.step -= 1
    },
    nextStep () {
      if (this.canStepFurther && this.step < 4) {
        this.step += 1
      }
    },
    cancelCreate () {
      this.step = 0
      this.showCreate = false
    },
    createDog () {
      this.showCreate = true
      this.step = 1
      this.newDog = JSON.parse(JSON.stringify(this.$store.state.newDog))
    },
    saveNewDog () {
      let dog = JSON.parse(JSON.stringify(this.newDog))
      this.$store.commit(INSERT_DOG, dog)
      this.$store.dispatch('allocate', {
        dog,
        fastenDays: [],
        vegetarianDays: [2, 5]
      })
      this.selectedDogId = dog.id
      this.cancelCreate()
    },
    deleteDog () {
      this.$store.commit(REMOVE_DOG, this.selectedDogId)
      if (this.dogs.length > 0) {
        this.selectedDogId = this.dogs[0].id
      } else {
        this.selectedDogId = 0
      }
    }
  }
}
</script>

<style lang="sass">
@import "../assets/sass/variables"
@import "../../node_modules/bulma/bulma"

.modal .panel-block,
.modal .faked-panel-block,
.modal .panel-tabs,
.modal .steps
  background-color: white
  color: $dark

.steps
  margin-bottom: 0 !important
</style>
