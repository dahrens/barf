<template>
  <nav class="panel">
    <p class="panel-heading">
      Dog
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="solid" name="caret-down" />
        <fa v-if="collapsed" pack="solid" name="caret-right" />
      </a>
      <a v-on:click="toggleEdit()" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" pack="solid" name="edit" />
        <fa v-if="edit" pack="solid" name="save" />
      </a>
    </p>
    <template v-if="!collapsed">
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Name</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field">
            <p class="control has-icons-left">
              <input v-model="dog.name" class="input" type="text" placeholder="Name">
              <span class="icon is-left">
                <fa pack="solid" name="address-card" />
              </span>
            </p>
          </div>
          <div v-else>
            {{ dog.name }}
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Gewicht</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field">
            <p class="control has-icons-left">
              <input v-model="dog.weight" class="input" type="number" placeholder="weight" min="0" max="150000" step="50">
              <span class="icon is-left">
                <fa pack="solid" name="tachometer-alt" />
              </span>
            </p>
          </div>
          <div v-else>
            {{ dog.weight }}g
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Aktivität</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field is-expanded">
            <div class="field has-addons">
              <div class="control">
                <a class="button is-static">
                  <span class="icon is-left">
                    <fa pack="solid" name="futbol" />
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
          <div v-else>
            moderate
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label">
          <label class="label">Geschlecht</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field is-narrow">
            <div class="control">
              <label class="radio">
                <input type="radio" name="sex" v-model="dog.sex" value="m">
                <span class="icon">
                  <fa pack="solid" name="mars" />
                </span>
              </label>
              <label class="radio">
                <input type="radio" name="sex" v-model="dog.sex" value="f">
                <span class="icon">
                  <fa pack="solid" name="venus" />
                </span>
              </label>
            </div>
          </div>
          <div v-else>
            <span class="icon">
              <fa pack="solid" name="mars" />
            </span>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">
            Kastriert
          </label>
        </div>
        <div class="field-body">
          <input v-if="edit" type="checkbox" v-model="dog.castrated">
          <div v-else>
            <span class="icon">
              <fa pack="solid" name="check" />
            </span>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label">
          <label class="label">Ration</label>
        </div>
        <div class="field-body">
          {{ dog.weight }}g * 0.02 * {{ dogActivity }}
          <template v-if="dog.castrated">* 0.8</template> = {{ expectedQuantityPerDay }}g
          * {{ dog.plan.week.length }} = {{ expectedQuantityWeek }}g
        </div>
      </div>
    </template>
  </nav>
</template>

<script>
import { UPDATE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogPanel',
  props: ['dog'],
  data () {
    return {
      collapsed: false,
      edit: false
    }
  },
  computed: {
    dogActivity () {
      return this.$store.state.activities[this.dog.activity]
    },
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
    },
    expectedQuantityPerDay () {
      return this.$store.getters.planRequirements(this.dog)
    },
    expectedQuantityWeek () {
      return this.dog.plan.week.length * this.expectedQuantityPerDay
    }
  },
  methods: {
    toggleEdit () {
      if (this.edit) {
        this.$store.commit(UPDATE_DOG, this.dog)
      }
      this.edit = !this.edit
    }
  }
}
</script>

<style>
.field-label {
  width: 500px;
}
</style>
