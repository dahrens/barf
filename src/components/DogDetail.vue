<template>
  <div class="dog-detail">
    <div v-if="dog.image && !imageSmall" class="card-image">
      <figure class="image is-square">
        <img :src="dog.image" />
      </figure>
    </div>
    <div class="faked-panel-block">
      <nav class="level">
        <div class="level-item has-text-centered has-text-dark">
          <div>
            <p class="heading">name</p>
            <p class="subtitle has-text-weight-bold has-text-dark">{{ dog.name }}</p>
          </div>
        </div>
        <div v-if="dog.image && imageSmall" class="level-item has-text-centered has-text-dark">
          <div>
            <div class="is-pulled-right">
              <figure class="image is-128x128">
                <img :src="dog.image" />
              </figure>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <levelBlock
      :data="[{
        label: 'portion per day',
        value: expectedQuantityPerDay + 'g'
      }, {
        label: 'portion per week',
        value: expectedQuantityPerWeek + 'g'
      }]"
      :helpText="formulaString">
    </levelBlock>
    <levelBlock
      :data="[{
        label: 'ideal weight',
        value: (dog.plan.idealWeight / 1000).toFixed(1) + 'kg'
      }, {
        label: 'current weight',
        value: (dog.plan.currentWeight / 1000).toFixed(1) + 'kg'
        }]">
    </levelBlock>
    <levelBlock
      :data="[{
        label: 'birthday-cake',
        value: calculateAge(),
        iconLabel: true
      }, {
        label: 'futbol',
        value: dog.activity,
        iconLabel: true
      }]">
    </levelBlock>
    <levelBlock
      :data="[{
        label: 'sex',
        value: sexIcon,
        iconValue: true
      }, {
        label: 'castrated',
        value: castratedIcon,
        iconValue: true
      }]">
    </levelBlock>
  </div>
</template>

<script>
import levelBlock from '@/components/include/LevelBlock'

export default {
  name: 'dogDetail',
  props: {
    dog: {
      required: true
    },
    imageSmall: {
      required: false,
      default: () => (false)
    }
  },
  components: {
    levelBlock
  },
  computed: {
    castratedIcon () {
      if (this.dog.castrated) return 'check-circle'
      return 'times-circle'
    },
    sexIcon () {
      if (this.dog.sex === 'm') return 'mars'
      return 'venus'
    },
    dogActivity () {
      return this.$store.state.activities[this.dog.activity]
    },
    expectedQuantityPerDay () {
      return parseInt(this.$store.getters.dogFoodQuantityPerDay(this.dog))
    },
    expectedQuantityPerWeek () {
      return parseInt(this.dog.plan.week.length * this.expectedQuantityPerDay)
    },
    formulaString () {
      let f = this.dog.plan.idealWeight + 'g * '
      f += (this.dog.plan.percentOfWeight / 100)
      f += ' * ' + this.dogActivity
      if (this.dog.castrated) {
        f += ' * 0.8'
      }
      f += ' = ' + this.expectedQuantityPerDay + 'g'
      f += ' * ' + this.dog.plan.week.length + ' = '
      f += this.expectedQuantityPerWeek + 'g'
      return f
    }
  },
  methods: {
    calculateAge () {
      if (!this.dog.birthday) return '?'
      var dateParts = this.dog.birthday.split('.')
      var birthday = new Date(dateParts[2], (dateParts[1] - 1), dateParts[0])
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

<style
