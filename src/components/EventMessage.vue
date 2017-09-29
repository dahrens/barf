<template>
  <article class="message">
    <div class="message-header">
      <span v-if="event.name === 'meal'">Mahlzeit</span>
      <button class="delete" aria-label="delete"></button>
    </div>
    <div class="message-body is-clearfix">
      <p v-if="event.name === 'meal'">
        Hat {{ dog.name }}
        {{ this.event.day | moment("from") }}
        {{ this.event.amount }}{{ this.event.unit }}
        {{ this.recipe.name }} bekommen?
      </p>
      <div class="field has-addons is-pulled-right">
        <p class="control">
          <a class="button is-outlined">
            <span class="icon is-small has-text-success">
              <font-awesome-icon pack="solid" name="check" />
            </span>
            <span>Ja</span>
          </a>
        </p>
        <p class="control">
          <a class="button is-outlined">
            <span class="icon is-small has-text-danger">
              <font-awesome-icon pack="solid" name="times" />
            </span>
            <span>Nein</span>
          </a>
        </p>
        <p class="control">
          <a class="button is-outlined">
            <span class="icon is-small has-text-info">
              <font-awesome-icon pack="solid" name="edit" />
            </span>
            <span>Anpassen</span>
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
