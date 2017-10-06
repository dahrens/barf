<template>
  <div class="dog-detail">
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
        value: parseInt(dog.plan.idealWeight / 1000) + 'kg'
      }, {
        label: 'current weight',
        value: parseInt(dog.plan.currentWeight / 1000) + 'kg'
        }]">
    </levelBlock>
    <levelBlock
      :data="[{
        label: 'birthday-cake',
        value: 5,
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
  props: ['dog'],
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
      return parseInt(this.$store.getters.planRequirements(this.dog))
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
      console.log(this.dog.birthday)
      let birthday = this.dog.birthday
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
