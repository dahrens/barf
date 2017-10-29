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
            </span>
            <span class="is-size-5 is-uppercase">about</span>
          </router-link>
          <router-link
            v-on:click.native="mobileMenu = false"
            class="nav-item is-tab"
            :to="{ name: 'Settings' }">
            <span class="icon is-large fa-layers fa-fw">
              <fa size="2x" icon="cog"/>
            </span>
            <span class="is-size-5 is-uppercase">settings</span>
          </router-link>
        </div>
      </div>
    </nav>
    <div class="notification-container">
      <div class="container">
        <notifications></notifications>
      </div>
    </div>
    <router-view></router-view>
    <section class="hero is-info">
      <div class="hero-body">
        <div class="container">
          <div class="columns">
            <div class="column is-1">
              <span class="icon is-large">
                <fa size="4x" icon="info" />
              </span>
            </div>
            <div class="column">
              <h2 class="title">
                Release candidate 1
              </h2>
              <p class="subtitle">
                The app is nearly ready for production use. No new features will be added before the release of version 1.0.0 will take place.
              </p>
              <p>
                If you find any bugs, please <a href="https://github.com/dahrens/barf/issues">report on github</a>
              </p>
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
import notifications from '@/components/Notifications'

export default {
  name: 'barf',
  components: {
    notifications
  },
  data () {
    return {
      mobileMenu: false
    }
  },
  computed: {
    settings () {
      return this.$store.state.settings
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

.notification-container
  position: fixed
  display: flex
  top: 0
  left: 0
  right: 0
  z-index: 1000
  opacity: 0.9
  margin: 1em
</style>
