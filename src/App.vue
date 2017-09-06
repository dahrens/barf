<template>
  <div id="app">
    <nav class="navbar">
      <div class="container">
        <div class="navbar-menu">
          <div class="navbar-start">
            <a class="nav-item"><h1 class="title">B.A.R.F.</h1></a>
            <router-link class="nav-item is-tab is-hidden-mobile" :class="{'is-active': $route.fullPath === '/'}"
              :to="{ name: 'Home' }">Home</router-link>
            <router-link class="nav-item is-tab is-hidden-mobile" :class="{'is-active': $route.fullPath ==='/food'}"
              :to="{ name: 'Food' }">Food</router-link>
            <router-link class="nav-item is-tab is-hidden-mobile" :class="{'is-active': $route.fullPath ==='/plan'}"
              :to="{ name: 'Plan' }">Plan</router-link>
          </div>
        </div>
        <div class="navbar-end">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              <span class="icon">
                <i class="fa fa-cog"></i>
              </span>
            </a>

            <div class="navbar-dropdown is-right">
              <a class="navbar-item">
                load default store data
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
