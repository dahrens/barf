<template>
  <nav class="panel">
    <p class="panel-heading">
      Dog
      <a v-on:click="collapsed = !collapsed" class="icon is-pulled-right has-text-dark">
        <i v-if="!collapsed" class="fa fa-caret-down"></i>
        <i v-if="collapsed" class="fa fa-caret-right"></i>
      </a>
      <a v-on:click="edit = !edit" class="icon is-pulled-right has-text-dark">
        <i v-if="!edit" class="fa fa-edit"></i>
        <i v-if="edit" class="fa fa-save"></i>
      </a>
    </p>
    <template v-if="!collapsed">
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Name</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field">
            <p class="control has-icons-left">
              <input class="input" type="text" placeholder="Name">
              <span class="icon is-small is-left">
                <i class="fa fa-id-card-o"></i>
              </span>
            </p>
          </div>
          <div v-else>
            Delphi
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Gewicht</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field">
            <p class="control has-icons-left">
              <input class="input" type="number" placeholder="Name" value="15000" min="0" max="150000" step="50">
              <span class="icon is-small is-left">
                <i class="fa fa-anchor"></i>
              </span>
            </p>
          </div>
          <div v-else>
            15000g
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Aktivität</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field is-narrow">
            <div class="control">
              <div class="select is-fullwidth">
                <select>
                  <option>moderate</option>
                  <option>Marketing</option>
                  <option>Sales</option>
                </select>
              </div>
            </div>
          </div>
          <div v-else>
            moderate
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label">
          <label class="label">Geschlecht</label>
        </div>
        <div class="field-body">
          <div v-if="edit" class="field is-narrow">
            <div class="control">
              <label class="radio">
                <input type="radio" name="member">
                <span class="icon">
                  <i class="fa fa-mars"></i>
                </span>
              </label>
              <label class="radio">
                <input type="radio" name="member">
                <span class="icon">
                  <i class="fa fa-venus"></i>
                </span>
              </label>
            </div>
          </div>
          <div v-else>
            <span class="icon">
              <i class="fa fa-mars"></i>
            </span>
          </div>
        </div>
      </div>
      <div class="panel-block">
        <div class="field-label is-normal">
          <label class="label">Kastriert</label>
        </div>
        <div class="field-body">
          <input v-if="edit" type="checkbox">
          <div v-else>
            <span class="icon">
              <i class="fa fa-check"></i>
            </span>
          </div>
        </div>

      </div>
      <div class="panel-block">
        <div class="field-label">
          <label class="label">Ration</label>
        </div>
        <div class="field-body">
          2100g
        </div>
      </div>
    </template>
  </nav>
</template>

<script>
export default {
  name: 'dogPanel',
  data () {
    return {
      collapsed: false,
      edit: false
    }
  }
}
</script>
