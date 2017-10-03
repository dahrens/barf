<template>
  <div class="plan">
    <nav class="plan-tabs">
      <div class="container is-clearfix">
        <div class="dog-selector field has-addons has-addons-right is-pulled-left">
          <p class="control">
            <a class="button is-static">
              <span><strong>selected dog</strong></span>
            </a>
          </p>
          <div class="control">
            <div class="select">
              <select v-model="selectedDog" v-on:change="dogSelect()">
                <option v-for="d in dogs" v-bind:value="d.id">{{ d.name }}</option>
              </select>
            </div>
          </div>
          <p class="control">
            <a class="button">
              <span class="icon is-medium">
                <fa pack="fas" name="plus"/>
              </span>
            </a>
          </p>
        </div>
        <div class="tabs is-pulled-right">
          <ul>
            <li :class="{'is-active': view === 'base'}">
              <a v-on:click="view = 'base'">
                <span class="icon is-medium has-text-primary">
                  <fa pack="fas" name="chart-pie"/>
                </span>
                BASEMENT
              </a>
            </li>
            <li :class="{'is-active': view === 'meals'}">
              <a v-on:click="view = 'meals'">
                <span class="icon is-medium has-text-primary">
                  <fa pack="fas" name="calendar-alt"/>
                </span>
                MEALS
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <div v-if="view === 'base'" class="container">
      <div class="columns is-multiline">
        <div class="column is-one-third">
          <dogPanel :dog="dog"></dogPanel>
        </div>
        <div class="column">
          <planWeek :dog="dog"></planWeek>
        </div>
        <div class="column is-one-third">
          <planPanel :dog="dog"></planPanel>
        </div>
      </div>
    </div>
    <div v-if="view === 'meals'" class="container">
      <div class="columns is-mobile is-multiline">
        <div class="column">MEALS!</div>
      </div>
    </div>
  </div>

</template>

<script>
import planWeek from '@/components/PlanWeek'
import dogPanel from '@/components/DogPanel'
import planPanel from '@/components/PlanAllocationPanel'

export default {
  name: 'plan',
  components: {
    planWeek,
    dogPanel,
    planPanel
  },
  data () {
    return {
      selectedDog: 2,
      view: 'base'
    }
  },
  computed: {
    subCategories () {
      return this.$store.getters.subCategories
    },
    dogs () {
      return this.$store.state.dogs
    },
    dog () {
      return this.$store.state.dogs.filter(d => d.id === this.selectedDog)[0]
    }
  },
  methods: {
    dogSelect () {
      console.log('changed!', this.selectedDog)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="sass">
.plan-tabs
  margin-bottom: 0.75em
  background-color: whitesmoke

.dog-selector
  position: relative
  top: 0.5em
</style>
