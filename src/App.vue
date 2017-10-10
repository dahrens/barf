<template>
  <div id="app" class="app">
    <nav class="navbar is-light">
      <div class="navbar-brand">
        <a class="nav-item" href="/">
          <span class="icon is-large has-text-primary">
            <fa size="2x" pack="fas" name="paw"/>
          </span>
          <h1 class="title">B.A.R.F.</h1>
        </a>
        <button v-on:click="mobileMenu = !mobileMenu" class="button navbar-burger" :class="{'is-active': mobileMenu}">
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
      <div class="navbar-menu" :class="{'is-active': mobileMenu}">
        <div class="navbar-start">
          <router-link
            class="nav-item is-tab"
            :class="{'is-active': $route.fullPath ==='/'}"
            :to="{ name: 'Plan' }">
            <span class="icon is-large">
              <fa size="2x" pack="fas" name="calculator"/>
            </span>
            <span class="is-size-5 is-uppercase">plan</span>
          </router-link>
          <router-link
            v-if="settings.useMeals"
            class="nav-item is-tab"
            :class="{'is-active': $route.fullPath ==='/meals'}"
            :to="{ name: 'Meals' }">
            <span class="icon is-large">
              <fa size="2x" pack="fas" name="utensils"/>
            </span>
            <span class="is-size-5 is-uppercase">meals</span>
          </router-link>
          <router-link
            v-if="settings.useMeals"
            class="nav-item is-tab"
            :class="{'is-active': $route.fullPath ==='/ingredients'}"
            :to="{ name: 'Ingredients' }">
            <span class="icon is-large">
              <fa size="2x" pack="fas" name="puzzle-piece"/>
            </span>
            <span class="is-size-5 is-uppercase">ingredients</span>
          </router-link>
          <router-link
            v-if="settings.useStash"
            class="nav-item is-tab"
            :class="{'is-active': $route.fullPath ==='/stash'}"
            :to="{ name: 'Stash' }">
            <span class="icon is-large">
              <fa size="2x" pack="fas" name="archive"/>
            </span>
            <span class="is-size-5 is-uppercase">stash</span>
          </router-link>
        </div>
        <div class="navbar-end">
          <router-link
            class="nav-item is-tab"
            :class="{'is-active': $route.fullPath === '/about'}"
            :to="{ name: 'About' }">
            <span class="icon is-large">
              <fa size="2x" pack="fas" name="info"/>
            </span>
            <span class="is-size-5 is-uppercase">about</span>
          </router-link>
          <router-link
            class="nav-item is-tab"
            :class="{'is-active': $route.fullPath === '/settings'}"
            :to="{ name: 'Settings' }">
            <span class="icon is-large">
              <fa size="2x" pack="fas" name="wrench" />
            </span>
            <span class="is-size-5 is-uppercase">settings</span>
          </router-link>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <section class="hero is-warning">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-1">
              <span class="icon is-large">
                <fa size="4x" pack="fas" name="exclamation-triangle" />
              </span>
            </div>
            <div class="column">
              <h2 class="title">
                Alpha Release
              </h2>
              <p class="subtitle">
                The app is not ready for production use.
                In worst case it might happen that your <strong>inserted data will not be compatible with future versions</strong>.
              </p>
              <p>If you were here before and encounter strange behavior - <a class="has-text-primary" v-on:click="resetApp()">reset all data</a> and reload the page. This removes all local data from the app and a fresh state is enforced.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <footer class="footer">
      <div class="content has-text-centered">
        <p>
          <strong>B.A.R.F.</strong> by <a href="https://github.com/dahrens">Dennis Ahrens</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
        <p>
          <a class="icon" href="mailto:dennis.ahrens@mailbox.org">
            <fa pack="fas" name="envelope" />
          </a>
          <a class="icon" href="https://github.com/dahrens/barf">
            <fa pack="fab" name="github" />
          </a>
        </p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'barf',
  data () {
    return {
      mobileMenu: false
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
    }
  },
  methods: {
    resetApp () {
      localStorage.removeItem('barf')
    }
  }
}
</script>

<style lang="sass">
@charset "utf-8"
@import "./assets/sass/variables"

@import "../node_modules/bulma/bulma"
@import "./assets/sass/steps"

.faked-panel-block
  padding: 0.5em 0.75em
  border-bottom: 1px solid $border
  border-left: 1px solid $border
  border-right: 1px solid $border

.panel-heading .icon
  margin-left: 0.5em

</style>
