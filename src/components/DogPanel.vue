<template>
  <nav class="panel dog-panel">
    <p class="panel-heading">
      <span>Dog</span>
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" icon="caret-down" />
        <fa v-if="collapsed" icon="caret-right" />
      </a>
      <a v-on:click="toggleEdit()" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" icon="edit"/>
        <fa v-if="edit" icon="save"/>
      </a>
    </p>
    <template v-if="!collapsed">
      <dogDetail v-if="!edit" :dog="dog"></dogDetail>
      <dogEdit v-if="edit" :dog="dog"></dogEdit>
      <planMetaEdit v-if="edit" :dog="dog"></planMetaEdit>
      <planDistributionEdit v-if="edit" :dog="dog"></planDistributionEdit>
    </template>
  </nav>
</template>

<script>
import dogEdit from '@/components/DogEdit'
import dogDetail from '@/components/DogDetail'
import planMetaEdit from '@/components/PlanMetaEdit'
import planDistributionEdit from '@/components/PlanDistributionEdit'
import { UPDATE_DOG } from '@/store/mutation-types'

export default {
  name: 'dogPanel',
  props: ['dog'],
  components: {
    dogEdit,
    dogDetail,
    planMetaEdit,
    planDistributionEdit
  },
  data () {
    return {
      collapsed: false,
      edit: false
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
