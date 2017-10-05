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
          <option v-if="dogs.length === 0" disabled selected value="0">create a dog</option>
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
  </div>
</template>

<script>
import { SELECT_DOG, INSERT_DOG, REMOVE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogSelector',
  computed: {
    selectedDog: {
      get () {
        return this.$store.state.ui.selectedDog
      },
      set (dogId) {
        this.$store.commit(SELECT_DOG, dogId)
      }
    },
    dogs () {
      return this.$store.state.dogs
    }
  },
  methods: {
    createDog () {
      let dog = JSON.parse(JSON.stringify(this.$store.state.newDog))
      this.$store.commit(INSERT_DOG, dog)
      this.$store.dispatch('allocate', {
        dog,
        fastenDays: [],
        vegetarianDays: [2, 5]
      })
      this.selectedDog = dog.id
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
