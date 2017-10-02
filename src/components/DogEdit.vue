<template>
  <div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Name</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="dog.name" class="input" type="text" placeholder="Name">
            <span class="icon is-left">
              <fa pack="fas" name="address-card" />
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Weight</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control has-icons-left">
            <input v-model="dog.weight" class="input" type="number" placeholder="weight" min="0" max="150000" step="50">
            <span class="icon is-left">
              <fa pack="fas" name="tachometer-alt" />
            </span>
          </p>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">Activity</label>
      </div>
      <div class="field-body">
        <div class="field is-expanded">
          <div class="field has-addons">
            <div class="control">
              <a class="button is-static">
                <span class="icon is-left">
                  <fa pack="fas" name="futbol" />
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
      </div>
    </div>
    <div class="panel-block">
      <div class="field-label">
        <label class="label">Sex</label>
      </div>
      <div class="field-body">
        <div class="field is-narrow">
          <div class="control">
            <label class="radio">
              <input type="radio" name="sex" v-model="dog.sex" value="m">
              <span class="icon">
                <fa pack="fas" name="mars" />
              </span>
            </label>
            <label class="radio">
              <input type="radio" name="sex" v-model="dog.sex" value="f">
              <span class="icon">
                <fa pack="fas" name="venus" />
              </span>
            </label>
          </div>
        </div>
      </div>
    </div>
    <div class="panel-block">
      <div class="field-label is-normal">
        <label class="label">
          Castrated
        </label>
      </div>
      <div class="field-body">
        <input type="checkbox" v-model="dog.castrated">
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dogEdit',
  props: ['dog'],
  computed: {
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
    }
  }
}
</script>

<style lang="sass" scoped>

.faked-panel-block
  padding: 1em
  border-bottom: 1px solid #dbdbdb
  border-left: 1px solid #dbdbdb
  border-right: 1px solid #dbdbdb

</style>
