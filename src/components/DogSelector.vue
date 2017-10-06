<template>
  <div class="field has-addons has-addons-right has-addons-left">
    <p class="control">
      <a v-on:click="deleteDog()" class="button is-medium is-danger" :disabled="selectedDog === 0">
        <span class="icon is-medium">
          <fa pack="fas" name="trash"/>
        </span>
      </a>
    </p>
    <div class="control has-icons-left is-expanded">
      <div class="select is-fullwidth is-medium">
        <select v-model="selectedDog">
          <option v-if="dogs.length === 0" disabled selected value="0">no dogs, create one</option>
          <option v-for="d in dogs" v-bind:value="d.id">{{ d.name }}</option>
        </select>
        <div class="icon is-left has-text-primary">
          <fa pack="fas" name="paw" />
        </div>
      </div>
    </div>
    <p class="control">
      <a v-on:click="createDog()" class="button is-medium is-success">
        <span class="icon is-medium">
          <fa pack="fas" name="plus"/>
        </span>
      </a>
    </p>
    <div class="modal" :class="{'is-active': showCreate}">
      <div class="modal-background"></div>
      <div class="modal-content">
        <nav class="panel">
          <p class="panel-heading">
            New Dog
            <a v-on:click="cancelCreate()" class="icon is-pulled-right has-text-dark">
              <fa pack="fas" name="times" />
            </a>
          </p>
          <div class="faked-panel-block">
            <div class="steps">
              <div class="step-item" :class="stepClasses(1)">
                <div class="step-marker">
                  <span class="icon">
                    <fa pack="fas" name="paw" />
                  </span>
                </div>
                <div class="step-details">
                  <p class="step-title">Dog</p>
                </div>
              </div>
              <div class="step-item" :class="{'is-active': step === 2, 'is-completed is-success': step > 2}">
                <div class="step-marker">
                  <span class="icon">
                    <fa pack="fas" name="sliders-h" />
                  </span>
                </div>
                <div class="step-details">
                  <p class="step-title">Plan</p>
                </div>
              </div>
              <div class="step-item" :class="{'is-active': step === 3, 'is-completed is-success': step > 3}">
                <div class="step-marker">
                  <span class="icon">
                    <fa pack="fas" name="flag" />
                  </span>
                </div>
                <div class="step-details">
                  <p class="step-title">Save?</p>
                </div>
              </div>
            </div>
          </div>
          <dogEdit v-if="step === 1" :dog="newDog"></dogEdit>
          <planDistributionEdit v-if="step === 2" :dog="newDog"></planDistributionEdit>
          <dogDetail v-if="step === 3" :dog="newDog"></dogDetail>
          <div class="faked-panel-block">
            <div class="field has-addons">
              <p class="control is-expanded">
                <a v-on:click="prevStep()" class="button is-dark" :disabled="step < 2">
                  <span class="icon">
                    <fa pack="fas" name="angle-left" />
                  </span>
                  <span>previous step</span>
                </a>
              </p>
              <p class="control">
                <a v-on:click="nextStep()" class="button is-dark" :disabled="!canStepFurther || step > 2">
                  <span>next step</span>
                  <span class="icon">
                    <fa pack="fas" name="angle-right" />
                  </span>
                </a>
              </p>
            </div>
          </div>
          <div v-if="step === 3" class="panel-block">
            <button v-on:click="saveNewDog()" class="button is-primary is-outlined is-fullwidth">
              <span class="icon">
                <fa pack="fas" name="save" />
              </span>
              <span>Save</span>
            </button>
          </div>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import dogEdit from '@/components/DogEdit'
import planDistributionEdit from '@/components/PlanDistributionEdit'
import dogDetail from '@/components/DogDetail'
import { SELECT_DOG, INSERT_DOG, REMOVE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogSelector',
  components: {
    dogEdit,
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
    selectedDog: {
      get () {
        return this.$store.state.ui.selectedDog
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
      this.step -= 1
    },
    nextStep () {
      if (this.canStepFurther) {
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
      this.selectedDog = dog.id
      this.cancelCreate()
    },
    deleteDog () {
      this.$store.commit(REMOVE_DOG, this.selectedDog)
      if (this.dogs.length > 0) {
        this.selectedDog = this.dogs[0].id
      } else {
        this.selectedDog = 0
      }
    }
  }
}
</script>

<style lang="sass">
.modal .panel-block,
.modal .faked-panel-block,
.modal .steps
  background-color: white
</style>