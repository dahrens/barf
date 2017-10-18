<template>
  <div id="app" class="app">
    <nav class="navbar" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <a class="navbar-item" href="/">
          <span class="icon is-medium has-text-primary brand-icon">
            <fa size="3x" icon="paw"/>
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
            v-on:click.native="mobileMenu = false"
            class="nav-item is-tab"
            :to="{ name: 'Plan' }">
            <span class="icon is-large fa-layers fa-fw">
              <fa size="2x" icon="calculator"/>
              <span v-if="notificationCount('plan')" class="is-size-1 fa-layers-counter">
                {{ notificationCount('plan') }}
              </span>
            </span>
            <span class="is-size-5 is-uppercase">plan</span>
          </router-link>
          <router-link
            v-if="settings.useMeals"
            v-on:click.native="mobileMenu = false"
            class="nav-item is-tab"
            :to="{ name: 'Meals' }">
            <span class="icon is-large fa-layers fa-fw">
              <fa size="2x" icon="utensils"/>
              <span v-if="notificationCount('meals')" class="is-size-1 fa-layers-counter">
                {{ notificationCount('meals') }}
              </span>
            </span>
            <span class="is-size-5 is-uppercase">meals</span>
          </router-link>
          <router-link
            v-if="settings.useMeals"
            v-on:click.native="mobileMenu = false"
            class="nav-item is-tab"
            :to="{ name: 'Ingredients' }">
            <span class="icon is-large fa-layers fa-fw">
              <fa size="2x" icon="puzzle-piece"/>
              <span v-if="notificationCount('ingredients')" class="is-size-1 fa-layers-counter">
                {{ notificationCount('ingredients') }}
              </span>
            </span>
            <span class="is-size-5 is-uppercase">ingredients</span>
          </router-link>
          <router-link
            v-if="settings.useStash"
            v-on:click.native="mobileMenu = false"
            class="nav-item is-tab"
            :to="{ name: 'Stash' }">
            <span class="icon is-large fa-layers fa-fw">
              <fa size="2x" icon="archive"/>
              <span v-if="notificationCount('stash')" class="is-size-1 fa-layers-counter">
                {{ notificationCount('stash') }}
              </span>
            </span>
            <span class="is-size-5 is-uppercase">stash</span>
          </router-link>
        </div>
        <div class="navbar-end">
          <router-link
            v-on:click.native="mobileMenu = false"
            class="nav-item is-tab"
            :to="{ name: 'About' }">
            <span class="icon is-large fa-layers fa-fw">
              <fa size="2x" icon="info"/>
              <span v-if="notificationCount('about')" class="is-size-1 fa-layers-counter">
                {{ notificationCount('about') }}
              </span>
            </span>
            <span class="is-size-5 is-uppercase">about</span>
          </router-link>
          <router-link
            v-on:click.native="mobileMenu = false"
            class="nav-item is-tab"
            :to="{ name: 'Settings' }">
            <span class="icon is-large fa-layers fa-fw">
              <fa size="2x" icon="cog"/>
              <span v-if="notificationCount('settings')" class="is-size-1 fa-layers-counter">
                {{ notificationCount('settings') }}
              </span>
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
                <fa size="4x" icon="exclamation-triangle" />
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
          <a href="http://bulma.io">
            <img src="http://bulma.io/images/made-with-bulma--semiblack.png" alt="Made with Bulma" width="128" height="24">
          </a>
        </p>
        <p>
          <a class="icon" href="mailto:dennis.ahrens@mailbox.org">
            <fa icon="envelope"/>
          </a>
          <a class="icon" href="https://github.com/dahrens/barf">
            <fa :icon="['fab', 'github']"/>
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
    },
    notificationCount (page) {
      return this.$store.getters.notifications(page).length
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

.brand-icon
  margin-right: 1em
</style>
