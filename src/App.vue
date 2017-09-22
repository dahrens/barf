<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="nav-item"><h1 class="title">B.A.R.F.</h1></a>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath ==='/plan'}"
              :to="{ name: 'Plan' }">
              Planen
            </router-link>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath === '/'}"
              :to="{ name: 'Home' }">
              Übersicht
            </router-link>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath ==='/stash'}"
              :to="{ name: 'Stash' }">
              Vorräte
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
export default {
  name: 'app',
  computed: {
    today () {
      return this.$moment().format('[Heute ist ]dddd [der] D. MMMM YYYY')
    }
  }
}
</script>

<style lang="sass">
// 1. Import the initial variables
@import "../node_modules/bulma/sass/utilities/initial-variables"

$primary: green

@import "../node_modules/bulma/bulma"

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

.barf-title
  margin-bottom: 1em

</style>
