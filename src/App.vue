<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="nav-item"><h1 class="title">B.A.R.F.</h1></a>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath === '/'}"
              :to="{ name: 'Home' }">
              Home
            </router-link>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath ==='/plan'}"
              :to="{ name: 'Plan' }">
              Plan
            </router-link>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath ==='/stash'}"
              :to="{ name: 'Stash' }">
              Stash
            </router-link>
          </div>
        </div>
        <div class="navbar-end">
          <span class="navbar-item">
            {{ today }}
          </span>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
import Vue from 'vue'
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'

Vue.component('fa', FontAwesomeIcon)

export default {
  name: 'app',
  computed: {
    today () {
      return this.$moment().format('[Today is ]dddd [the] D. MMMM YYYY')
    }
  }
}
</script>

<style lang="sass">
// 1. Import the initial variables
@import "../node_modules/bulma/sass/utilities/initial-variables"

$primary: green

@import "../node_modules/bulma/bulma"

.barf-title
  margin-bottom: 1em

</style>
