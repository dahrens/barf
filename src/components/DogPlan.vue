<template>
  <table class="table is-fullwidth dog-plan">
    <tbody>
      <tr>
        <th>Mo</th>
        <td>Beef muscle meat</td>
        <td>
          <span class="icon has-text-success">
            <fa pack="fas" name="check" />
          </span>
        </td>
      </tr>
      <tr>
        <th></th>
        <td>Beef muscle meat</td>
        <td>
          <span class="icon has-text-success">
            <fa pack="fas" name="check" />
          </span>
        </td>
      </tr>
      <tr>
        <th>Di</th>
        <td>Omasum</td>
        <td>
          <span class="icon has-text-danger">
            <fa pack="fas" name="times" />
          </span>
        </td>
      </tr>
      <tr>
        <th></th>
        <td>Beef muscle meat</td>
        <td>
          <span class="icon has-text-success">
            <fa pack="fas" name="check" />
          </span>
        </td>
      </tr>
      <tr>
        <th>Mi</th>
        <td>Beef muscle meat</td>
        <td>
          <span class="icon has-text-success">
            <fa pack="fas" name="check" />
          </span>
        </td>
      </tr>
      <tr>
        <th>Do</th>
        <td>Beef muscle meat</td>
        <td>
          <span class="icon has-text-success">
            <fa pack="fas" name="check" />
          </span>
        </td>
      </tr>
      <tr v-on:click="" class="link">
        <th></th>
        <td>Beef muscle meat</td>
        <td>
          <span class="icon has-text-success">
            <fa pack="fas" name="check" />
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'dogPlan',
  props: ['dog'],
  computed: {
    plan () {
      return this.dog.plan
    }
  }
}
</script>

<style scoped>
.dog-plan tr {
  cursor: pointer;
}
</style>
