<template>
  <div id="dog-selector" class="field has-addons has-addons-right has-addons-left">
    <p class="control">
      <button v-on:click="deleteDog()" name="delete-dog" class="button is-medium is-danger" :disabled="selectedDogId === 0">
        <span class="icon is-medium">
          <fa icon="trash"/>
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
          <fa icon="paw"/>
        </div>
      </div>
    </div>
    <p class="control">
      <button v-on:click="createDog()" name="create-dog" class="button is-medium is-success">
        <span class="icon is-medium">
          <fa icon="plus"/>
        </span>
      </button>
    </p>
    <div id="dog-create-modal" class="modal" :class="{'is-active': showCreate}">
      <div class="modal-background"></div>
      <div class="modal-card">
        <header class="modal-card-head">
          <p class="modal-card-title">Create new dog</p>
          <button v-on:click="cancelCreate()" class="delete" aria-label="close"></button>
        </header>
        <section class="modal-card-body">
          <div class="steps is-medium is-hidden-mobile">
            <div class="step-item" :class="stepClasses(1)">
              <div class="step-marker">
                <span class="icon">
                  <fa icon="paw"/>
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
                  <fa icon="question"/>
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
                  <fa icon="sliders-h" />
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
                  <fa icon="calendar-alt"/>
                </span>
              </div>
              <div class="step-details">
                <p class="step-title">Allocate</p>
                <p class="is-size-7 is-uppercase">assign to week</p>
              </div>
            </div>
            <div class="step-item" :class="{'is-active': step === 5, 'is-completed is-success': step > 4}">
              <div class="step-marker">
                <span class="icon">
                  <fa icon="flag"/>
                </span>
              </div>
              <div class="step-details">
                <p class="step-title">Done</p>
                <p class="is-size-7 is-uppercase">summary</p>
              </div>
            </div>
          </div>
          <dogEdit v-if="step === 1" :dog="newDog"></dogEdit>
          <planMetaEdit v-if="step === 2" :dog="newDog"></planMetaEdit>
          <planDistributionEdit v-if="step === 3" :dog="newDog"
            :commit="false"></planDistributionEdit>
          <planAllocationWizard v-if="step === 4"
            ref="allocationWizard"
            :dog="newDog"
            :newDog="true">
          </planAllocationWizard>
          <dogDetail v-if="step === 5" :dog="newDog" :imageSmall="true"></dogDetail>

        </section>
        <footer class="modal-card-foot">
          <a v-on:click="prevStep()" name="prev" class="button is-primary is-fullwidth" :disabled="step < 2">
            <span class="icon">
              <fa icon="angle-left" />
            </span>
            <span>back</span>
          </a>
          <a v-if="step < 5" name="next" v-on:click="nextStep()" class="button is-primary is-fullwidth" >
            <span>next</span>
            <span class="icon">
              <fa icon="angle-right" />
            </span>
          </a>
          <a v-else name="save" v-on:click="saveNewDog()" class="button is-primary is-fullwidth">
            <span class="icon">
              <fa icon="save"/>
            </span>
            <span>save</span>
          </a>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import dogEdit from '@/components/DogEdit'
import planMetaEdit from '@/components/PlanMetaEdit'
import planDistributionEdit from '@/components/PlanDistributionEdit'
import planAllocationWizard from '@/components/PlanAllocationWizard'
import dogDetail from '@/components/DogDetail'
import { SELECT_DOG, INSERT_DOG, REMOVE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogSelector',
  components: {
    dogEdit,
    planMetaEdit,
    planDistributionEdit,
    planAllocationWizard,
    dogDetail
  },
  data () {
    let newDog = {
      name: '',
      birthday: null,
      sex: 'm',
      castrated: true,
      activity: 'moderate',
      image: '',
      plan: {
        calculated: true,
        portionPerDay: 500,  // only used when calculated = false
        idealWeight: 25000,
        currentWeight: 25000,
        percentOfWeight: 2,
        animal: 80,
        vegetables: 20,
        distribution: {
          animal: {
            meat: 40,
            stomach: 30,
            entrails: 20,
            bones: 10
          },
          vegetables: {
            grains: 40,
            vegetables: 40,
            fruits: 20
          }
        },
        week: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        allocation: [[], [], [], [], [], [], []],
        mealAllocation: 'manual',
        meals: [
          { morning: [], evening: [] },
          { morning: [], evening: [] },
          { morning: [], evening: [] },
          { morning: [], evening: [] },
          { morning: [], evening: [] },
          { morning: [], evening: [] },
          { morning: [], evening: [] }
        ]
      },
      meals: new Map()
    }
    return {
      showCreate: false,
      step: 0,
      newDogBlueprint: JSON.stringify(newDog),
      newDog: null
    }
  },
  computed: {
    dogs () {
      return this.$store.state.dogs
    },
    selectedDogId: {
      get () {
        return this.$store.state.selectedDogId
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
      } else if (this.step === 4) {
        this.$refs['allocationWizard'].allocate()
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
      this.newDog = JSON.parse(this.newDogBlueprint)
    },
    saveNewDog () {
      let dog = JSON.parse(JSON.stringify(this.newDog))
      this.$store.commit(INSERT_DOG, dog)
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

.modal-card-foot .is-expanded
  flex: 1
</style>
