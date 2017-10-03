<template>
  <div class="app">
    <nav class="navbar is-light">
      <div class="container">
        <div class="navbar-brand">
          <a class="nav-item" href="/">
            <span class="icon is-large has-text-primary">
              <fa size="2x" pack="fas" name="paw"/>
            </span>
            <h1 class="title">B.A.R.F.</h1>
          </a>
        </div>
        <div class="navbar-menu">
          <div class="navbar-start">
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath ==='/'}"
              :to="{ name: 'Plan' }">
              <span class="icon is-large">
                <fa size="2x" pack="fas" name="calculator"/>
              </span>
              <span class="is-size-5">PLAN</span>
            </router-link>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath ==='/stash'}"
              :to="{ name: 'Stash' }">
              <span class="icon is-large">
                <fa size="2x" pack="fas" name="archive"/>
              </span>
              <span class="is-size-5">STASH</span>
            </router-link>
          </div>
        </div>
        <div class="navbar-end">
          <span class="navbar-item">
            {{ today }}
          </span>
          <router-link
            class="nav-item is-tab is-hidden-mobile"
            :class="{'is-active': $route.fullPath === '/settings'}"
            :to="{ name: 'Settings' }">
            <span class="icon is-large">
              <fa size="2x" pack="fas" name="cog" />
            </span>
          </router-link>
          <router-link
            class="nav-item is-tab is-hidden-mobile"
            :class="{'is-active': $route.fullPath === '/about'}"
            :to="{ name: 'About' }">
            <span class="icon is-large">
              <fa size="2x" pack="fas" name="info"/>
            </span>
          </router-link>
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
@import "../node_modules/bulma/sass/utilities/initial-variables"

$primary: green

@import "../node_modules/bulma/bulma"

.faked-panel-block
  padding: 0.5em 0.75em
  border-bottom: 1px solid $light
  border-left: 1px solid $light
  border-right: 1px solid $light

.panel-heading .icon
  margin-left: 0.5em

</style>
