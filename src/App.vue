<template>
  <div id="app">
    <nav class="nav has-shadow">
	    <div class="container">
		    <div class="nav-left">
          <a class="nav-item"><h1 class="title">B.A.R.F.</h1></a>
          <router-link class="nav-item is-tab is-hidden-mobile" :class="{'is-active': $route.fullPath === '/'}"
            :to="{ name: 'Home' }">Home</router-link>
          <router-link class="nav-item is-tab is-hidden-mobile" :class="{'is-active': $route.fullPath ==='/data'}"
            :to="{ name: 'Data' }">Dogs & Food</router-link>
          <router-link class="nav-item is-tab is-hidden-mobile" :class="{'is-active': $route.fullPath ==='/plan'}"
            :to="{ name: 'Plan' }">Plan</router-link>
		    </div>
		    <span class="nav-toggle">
		      <span></span>
		      <span></span>
		      <span></span>
		    </span>
		    <div class="nav-right nav-menu">
		      <a class="nav-item is-tab is-hidden-tablet is-active">Home</a>
		      <a class="nav-item is-tab is-hidden-tablet">Plan</a>
		      <a class="nav-item is-tab">
			      <figure class="image is-16x16" style="margin-right: 8px;">
			        <img src="http://bulma.io/images/jgthms.png">
			      </figure>
			      Profile
		      </a>
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

#app nav {
  margin-bottom: 2em;
}
</style>
