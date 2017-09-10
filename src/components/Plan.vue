<template>
  <div class="is-marginless">
    <section class="hero is-light">
      <div class="hero-body">
        <div class="container">
          <nav class="level">
            <div v-for="category in categories" class="level-item has-text-centered">
              <div>
                <p class="heading">{{category.part}}</p>
                <p class="title">0</p>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </section>
    <div class="plan container">
      <div class="columns">
        <div class="column is-5">
          <planPanel :plan="plan"></planPanel>
          <nav class="panel">
            <p class="panel-heading">
              Geplante Mahlzeiten
            </p>
          </nav>
        </div>
        <div class="columns column is-7 is-multiline">
          <div v-for="weekday in weekdays" class="column is-4">
            <nav class="panel">
              <p class="panel-heading">
                {{weekday}}
              </p>
              <a class="panel-block" v-if="weekday === 'Mi' || weekday === 'Do' || weekday === 'Fr'">
                Normale Fleisch Mahlzeit
              </a>
            </nav>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import kitchen from '@/components/Kitchen'
import planPanel from '@/components/PlanPanel'

export default {
  name: 'plan',
  components: {
    planPanel,
    kitchen
  },
  data () {
    return {
      weekdays: ['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'],
      selectedPlan: 1
    }
  },
  computed: {
    categories () {
      return this.$store.getters.categories
    },
    plan () {
      return this.$store.state.plans.filter(p => p.id === this.selectedPlan)[0]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.plan {
  margin-top: 1em;
}
</style>
