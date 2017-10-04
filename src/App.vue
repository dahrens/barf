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
              <span class="is-size-5">PLAN</span>
            </router-link>
            <router-link
              class="nav-item is-tab"
              :class="{'is-active': $route.fullPath ==='/stash'}"
              :to="{ name: 'Stash' }">
              <span class="icon is-large">
                <fa size="2x" pack="fas" name="archive"/>
              </span>
              <span class="is-size-5">STASH</span>
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
              <span class="is-size-5">ABOUT</span>
            </router-link>
            <router-link
              class="nav-item is-tab"
              :class="{'is-active': $route.fullPath === '/settings'}"
              :to="{ name: 'Settings' }">
              <span class="icon is-large">
                <fa size="2x" pack="fas" name="wrench" />
              </span>
              <span class="is-size-5">SETTINGS</span>
            </router-link>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
    <footer class="footer">
      <div class="container">
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
            <a class="icon" href="https://stackoverflow.com/users/5992118/dahrens">
              <fa pack="fab" name="stack-overflow" />
            </a>
          </p>
        </div>
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
  }
}
</script>

<style lang="sass">
@charset "utf-8"
@import "./assets/sass/variables"

@import "../node_modules/bulma/bulma"

.footer
  margin-top: 0.5em

.faked-panel-block
  padding: 0.5em 0.75em
  border-bottom: 1px solid $border
  border-left: 1px solid $border
  border-right: 1px solid $border

.panel-heading .icon
  margin-left: 0.5em

</style>
