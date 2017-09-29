<template>
  <div class="dog">
    <div class="card dog-card">
      <header class="card-header">
        <p class="card-header-title is-size-4">
          {{ dog.name }}
        </p>
        <a class="card-header-icon">
          <fa pack="solid" name="edit" />
        </a>
        <a class="card-header-icon">
          <fa pack="solid" name="chart-area" />
        </a>
        <a v-on:click="showConfig = !showConfig" class="card-header-icon">
          <fa pack="solid" name="cog" />
        </a>
        <a  v-on:click="collapsed = !collapsed" class="card-header-icon">
          <span class="icon">
            <fa v-if="!collapsed" pack="solid" name="caret-down" />
            <fa v-if="collapsed" pack="solid" name="caret-right" />
          </span>
        </a>
      </header>
      <div v-if="showConfig" class="card-header is-clearfix">
        <div class="field-label is-normal">
          <label class="label">Konfiguration:</label>
        </div>
        <div class="field is-horizontal is-pulled-right">
          <div class="field-body">
            <div class="field">
              <div class="control">
                <button v-on:click="showInfo = !showInfo" class="button is-light">
                  <span>Bild & Statistik</span>
                  <span v-if="showInfo" class="icon has-text-success">
                    <fa pack="solid" name="check" />
                  </span>
                  <span v-else class="icon has-text-danger">
                    <fa pack="solid" name="times" />
                  </span>
                </button>
              </div>
            </div>
            <div class="field">
              <button v-on:click="showNeeds = !showNeeds" class="button is-light">
                <span>Bedarf</span>
                <span v-if="showNeeds" class="icon has-text-success">
                  <fa pack="solid" name="check" />
                </span>
                <span v-else class="icon has-text-danger">
                  <fa pack="solid" name="times" />
                </span>
              </button>
            </div>
            <div class="field">
              <div class="control">
                <button v-on:click="showPlan = !showPlan" class="button is-light">
                  <span>Mahlzeiten</span>
                  <span v-if="showPlan" class="icon has-text-success">
                    <fa pack="solid" name="check" />
                  </span>
                  <span v-else class="icon has-text-danger">
                    <fa pack="solid" name="times" />
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="card-content" v-if="!collapsed">
        <div class="columns is-multiline">
          <div v-if="showInfo" class="column is-3 content">
            <p class="image is-256x256">
            <img src="http://bulma.io/images/placeholders/256x256.png">
            </p>
            <nav class="level">
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">weight</p>
                  <p class="title">{{ dog.weight / 1000}} kg</p>
                </div>
              </div>
              <div class="level-item has-text-centered">
                <div>
                  <p class="heading">age</p>
                  <p class="title">{{ calculateAge(dog.birthday) }}</p>
                </div>
              </div>
            </nav>
            <div class="has-text-centered">
              <span v-if="dog.sex === 'm'" class="icon is-medium">
                <fa size="2x" pack="solid" name="mars" />
              </span>
              <span v-else class="icon is-large">
                <fa size="2x" pack="solid" name="venus" />
              </span>
            </div>
          </div>
          <div v-if="showNeeds" class="column">
            <dog-needs :dog="dog"></dog-needs>
          </div>
          <div v-if="showPlan" class="column">
            <dog-plan :dog="dog" :plan="dog.plan"></dog-plan>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import DogNeeds from '@/components/DogNeeds'
import DogPlan from '@/components/DogPlan'

export default {
  name: 'dogPanel',
  props: ['dog'],
  data () {
    return {
      collapsed: false,
      showInfo: true,
      showNeeds: true,
      showPlan: true,
      showEdit: false,
      showConfig: false
    }
  },
  components: {
    'dog-needs': DogNeeds,
    'dog-plan': DogPlan
  },
  methods: {
    calculateAge (birthday) {
      if (!birthday) return
      let today = new Date()
      var age = today.getFullYear() - birthday.getFullYear()
      var m = today.getMonth() - birthday.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--
      }
      return age
    }
  }
}
</script>

<style scoped>
.dog-card {
  margin-bottom: 2em;
}
</style>
