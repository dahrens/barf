<template>
  <div class="modal">
    <div class="modal-background" v-on:click="close()"></div>
    <div class="modal-content">
      <nav class="panel">
        <p class="panel-heading">
          Automatic allocation
          <a v-on:click="close()" class="icon is-pulled-right has-text-dark">
            <fa pack="fas" name="times" />
          </a>
        </p>
        <div class="panel-block">
          <div class="field is-horizontal">
            <div class="field-label">Fasting Days</div>
            <div class="field-body">
              <div class="field is-expanded">
                <div class="field">
                  <p class="control is-expanded">
                    <div class="field has-addons">
                      <p v-for="(weekday, idx) in dog.plan.week" class="control">
                        <a class="button" v-on:click="toggleFastenDay(idx)" :class="{'is-success': fastenDays[idx]}">
                          <span>{{ weekday.substring(0, 2) }}</span>
                          <span class="icon">
                            <fa v-if="fastenDays[idx]" pack="fas" name="check" />
                            <fa v-else pack="fas" name="times" />
                          </span>
                        </a>
                      </p>
                    </div>
                  </p>
                </div>
                <p v-if="fastenDays.filter(fd => fd === true).length > 2" class="help is-danger">Are you sure that your dog should not eat on more than 2 days?</p>
                <p class="help is-info">Click on a day to toggle whether it is a fasten day or not</p>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="field is-horizontal">
            <div class="field-label">Vegetarian Days</div>
            <div class="field-body">
              <div class="field is-expanded">
                <div class="field">
                  <p class="control is-expanded">
                    <div class="field has-addons">
                      <p v-for="(weekday, idx) in dog.plan.week" class="control">
                        <a class="button" v-on:click="toggleVegetarianDay(idx)" :class="{'is-success': vegetarianDays[idx]}">
                          <span>{{ weekday.substring(0, 2) }}</span>
                          <span class="icon">
                            <fa v-if="vegetarianDays[idx]" pack="fas" name="check" />
                            <fa v-else pack="fas" name="times" />
                          </span>
                        </a>
                      </p>
                    </div>
                  </p>
                </div>
                <p v-if="fastenDays.filter(fd => fd === true).length > 2" class="help is-danger">Are you sure that your dog should not eat on more than 2 days?</p>
                <p class="help is-info">Click on a day to toggle whether it is a fasten day or not</p>
              </div>
            </div>
          </div>
        </div>
        <div class="panel-block">
          <div class="notification is-warning is-fullwidth">
            <span class="icon is-large fa-fw">
              <fa size="2x" pack="fas" name="exclamation-triangle" />
            </span>
            <span class="is-size-5">Automatic allocation overrides all existing allocations</span>
          </div>
        </div>
        <p class="panel-block">
          <button v-on:click="allocate" class="button is-primary is-fullwidth">
            <span class="icon">
              <fa pack="fas" name="save" />
            </span>
          </button>
        </p>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'planAllocationWizard',
  props: ['dog'],
  data () {
    return {
      fastenDays: [false, false, false, false, false, false, false],
      vegetarianDays: [false, false, false, false, false, false, false]
    }
  },
  methods: {
    toggleFastenDay (day) {
      this.fastenDays[day] = !this.fastenDays[day]
      this.$forceUpdate()
    },
    toggleVegetarianDay (day) {
      this.vegetarianDays[day] = !this.vegetarianDays[day]
      this.$forceUpdate()
    },
    close (value) {
      this.$emit('close')
    },
    allocate () {
      this.$store.dispatch('allocate', {
        dog: this.dog,
        fastenDays: this.fastenDays
          .map((b, i) => [b, i])
          .filter((i) => i[0])
          .map((d) => d[1]),
        vegetarianDays: this.vegetarianDays
          .map((b, i) => [b, i])
          .filter((i) => i[0])
          .map((d) => d[1])
      }).then(() => this.close())
    }
  }
}
</script>

<style lang="sass" scoped>
.is-expaned
  display: flex
  flex: 0 0 100%

.panel-block
  background-color: white
</style>
