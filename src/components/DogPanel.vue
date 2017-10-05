<template>
  <nav class="panel">
    <p class="panel-heading">
      <span>Dog: <strong>{{ dog.name }}</strong></span>
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="caret-down" />
        <fa v-if="collapsed" pack="fas" name="caret-right" />
      </a>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <fa v-if="!edit" pack="fas" name="edit" />
        <fa v-if="edit" pack="fas" name="save" />
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
