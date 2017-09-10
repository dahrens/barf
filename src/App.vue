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
              Übersicht
            </router-link>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath ==='/stash'}"
              :to="{ name: 'Stash' }">
              Vorräte
            </router-link>
            <router-link
              class="nav-item is-tab is-hidden-mobile"
              :class="{'is-active': $route.fullPath ==='/plan'}"
              :to="{ name: 'Plan' }">
              Pläne
            </router-link>
          </div>
        </div>
        <div class="navbar-end">
          <span class="navbar-item">
            {{ today }}
          </span>
          <div class="navbar-item has-dropdown is-hoverable ">
            <a class="navbar-link">
              <span class="icon has-text-primary">
                <i class="fa fa-cog"></i>
              </span>
              Einstellungen
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
    <!-- <section class="barf-title hero is-primary">
      <div class="hero-body">
        <div v-if="$route.fullPath ==='/'" class="container">
          <h1 class="title">
            Hunde, Essen und Aktionen
          </h1>
          <h2 class="subtitle">
            Schau was deine Hunde in den kommenden Tagen benötigen und bestätige inwiefern die deine Pläne eingehalten hast.
          </h2>
        </div>
        <div v-if="$route.fullPath ==='/food'" class="container">
          <h1 class="title">
            Zutaten, Rezepte und Vorräte
          </h1>
          <h2 class="subtitle">
            Erstelle Rezepte und deren Zutaten und lege fest was du vorrätig hast
          </h2>
        </div>
        <div v-if="$route.fullPath ==='/plan'" class="container">
          <h1 class="title">
            Plane auf Wochen-Basis
          </h1>
          <h2 class="subtitle">
            Damit du nicht mehr selbst rechnen musst
          </h2>
        </div>
      </div>
    </section> -->
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

$primary: orange

@import "../node_modules/bulma/bulma"

#app
  font-family: 'Avenir', Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  color: #2c3e50

.barf-title
  margin-bottom: 1em

</style>
