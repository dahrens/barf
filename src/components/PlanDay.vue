<template>
  <nav class="panel">
    <p class="panel-heading">
      {{weekday}}
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <fa v-if="!collapsed" pack="fas" name="chevron-down" />
        <fa v-if="collapsed" pack="fas" name="chevron-right" />
      </a>
    </p>
    <span v-if="!collapsed && allocation.length" v-for="a in allocation" class="panel-block">
      <div class="field has-addons has-addons-right has-addons-left">
        <p class="control">
          <span class="select">
            <select v-model="a.subCategory">
              <option v-for="option in subCategoryOptions" v-model="a.subCategory">{{ option.subCategory}}</option>
            </select>
          </span>
        </p>
        <p class="control">
          <input class="input" type="number" min="0" max="99999" step="25" v-model="a.amount">
        </p>
        <p class="control">
          <a class="button" v-on:click="">
            <span class="icon">
              <fa pack="fas" name="plus" />
            </span>
          </a>
        </p>
        <p class="control">
          <a class="button" v-on:click="">
            <span class="icon">
              <fa pack="fas" name="trash" />
            </span>
          </a>
        </p>
      </div>
    </span>
    <span v-if="!collapsed && !allocation.length" class="panel-block">
      <div class="field has-addons has-addons-right has-addons-left">
        <p class="control">
          <span class="select">
            <select v-model="newAllocation.subCategory">
              <option v-for="option in subCategoryOptions" v-model="newAllocation.subCategory">{{ option.subCategory}}</option>
            </select>
          </span>
        </p>
        <p class="control">
          <input class="input" type="number" min="0" max="99999" step="25" v-model="newAllocation.amount">
        </p>
        <p class="control">
          <a class="button" v-on:click="">
            <span class="icon">
              <fa pack="fas" name="plus" />
            </span>
          </a>
        </p>
        <p class="control">
          <a class="button" v-on:click="" disabled>
            <span class="icon">
              <fa pack="fas" name="trash" />
            </span>
          </a>
        </p>
      </div>
    </span>
  </nav>
</template>

<script>
import subCategoryTag from '@/components/SubCategoryTag'

export default {
  name: 'planDay',
  props: ['plan', 'weekday', 'index'],
  components: {
    subCategoryTag
  },
  data () {
    return {
      expandedCreate: true,
      expandAll: false,
      collapsed: false,
      newAllocation: {
        subCategory: 'meat',
        amount: 0
      }
    }
  },
  computed: {
    allocation () {
      return this.plan.allocation[this.index]
    },
    subCategoryOptions () {
      return this.$store.getters.subCategories
    }
  }
}
</script>
