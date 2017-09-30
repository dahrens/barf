<template>
  <article class="message">
    <div class="message-header">
      <span v-if="event.name === 'meal'">Mahlzeit</span>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body is-clearfix">
      <p v-if="event.name === 'meal'">
        Has {{ dog.name }} received
        {{ this.event.amount }}{{ this.event.unit }}
        {{ this.recipe.name }}
        {{ this.event.day | moment("from") }}?
      </p>
      <div class="field has-addons is-pulled-right">
        <p class="control">
          <a class="button is-outlined">
            <span class="icon is-small has-text-success">
              <fa pack="fas" name="check" />
            </span>
            <span>Yes</span>
          </a>
        </p>
        <p class="control">
          <a class="button is-outlined">
            <span class="icon is-small has-text-danger">
              <fa pack="fas" name="times" />
            </span>
            <span>No</span>
          </a>
        </p>
        <p class="control">
          <a class="button is-outlined">
            <span class="icon is-small has-text-info">
              <fa pack="fas" name="edit" />
            </span>
            <span>Adjust</span>
          </a>
        </p>
      </div>
    </div>
  </article>
</template>

<script>
export default {
  name: 'eventMessage',
  props: ['event'],
  computed: {
    dog () {
      return this.$store.state.dogs.filter(d => d.id === this.event.dog)[0]
    },
    recipe () {
      return this.$store.state.recipes.filter(r => r.id === this.event.recipe)[0]
    }
  }
}
</script>
