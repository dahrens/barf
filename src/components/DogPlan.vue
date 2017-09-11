<template>
  <table class="table is-fullwidth dog-plan">
    <tbody>
      <tr>
        <th>Mo</th>
        <td>Rindermuskelfleisch</td>
        <td>
          <span class="icon has-text-success">
            <i class="fa fa-check"></i>
          </span>
        </td>
      </tr>
      <tr>
        <th></th>
        <td>Rindermuskelfleisch</td>
        <td>
          <span class="icon has-text-success">
            <i class="fa fa-check"></i>
          </span>
        </td>
      </tr>
      <tr>
        <th>Di</th>
        <td>Blättermagen</td>
        <td>
          <span class="icon has-text-danger">
            <i class="fa fa-times"></i>
          </span>
        </td>
      </tr>
      <tr>
        <th></th>
        <td>Rindermuskelfleisch</td>
        <td>
          <span class="icon has-text-success">
            <i class="fa fa-check"></i>
          </span>
        </td>
      </tr>
      <tr>
        <th>Mi</th>
        <td>Rindermuskelfleisch</td>
        <td>
          <span class="icon has-text-success">
            <i class="fa fa-check"></i>
          </span>
        </td>
      </tr>
      <tr>
        <th>Do</th>
        <td>Rindermuskelfleisch</td>
        <td>
          <span class="icon has-text-success">
            <i class="fa fa-check"></i>
          </span>
        </td>
      </tr>
      <tr v-on:click="" class="link">
        <th></th>
        <td>Rindermuskelfleisch</td>
        <td>
          <span class="icon has-text-success">
            <i class="fa fa-check"></i>
          </span>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script>
export default {
  name: 'dogPlan',
  props: ['dog', 'plan']
}
</script>

<style scoped>
.dog-plan tr {
  cursor: pointer;
}
</style>
