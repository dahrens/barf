<template>
  <div class="container">
    <div class="columns section">
      <div class="column is-8">
        <div v-for="dog in dogs" class="card dog-card">
          <header class="card-header">
            <p class="card-header-title">
            {{ dog.name }}
            <span v-if="dog.sex === 'm'" class="icon is-small">
              <i class="fa fa-mars"></i>
            </span>
            <span v-else class="icon is-small">
              <i class="fa fa-venus"></i>
            </span>
            </p>
            <a class="card-header-icon has-text-dark">
              <span class="icon">
                <i class="fa fa-edit"></i>
              </span>
            </a>
            <a class="card-header-icon has-text-dark">
              <span class="icon">
                <i class="fa fa-area-chart"></i>
              </span>
            </a>
            <a class="card-header-icon has-text-dark">
              <span class="icon">
                <i class="fa fa-archive"></i>
              </span>
            </a>
            <a class="card-header-icon has-text-dark">
              <span class="icon">
                <i class="fa fa-cog"></i>
              </span>
            </a>
            <a class="card-header-icon has-text-dark">
              <span class="icon">
                <i class="fa fa-caret-down"></i>
              </span>
            </a>
          </header>
          <div class="card-content">
            <div class="columns">
              <div class="column is-3 content">
                <p class="image is-256x256">
                <img src="http://bulma.io/images/placeholders/256x256.png">
                </p>
                <nav class="level">
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">weight</p>
                      <p class="title">{{ dog.weight / 1000}} kg</p>
                    </div>
                  </div>
                  <div class="level-item has-text-centered">
                    <div>
                      <p class="heading">age</p>
                      <p class="title">{{ calculate_age(dog.birthday)}}</p>
                    </div>
                  </div>
                </nav>
              </div>
              <div class="column is-4">
                <table class="table is-fullwidth">
                  <tbody>
                    <tr>
                      <td>
                        <span class="icon has-text-danger">
                          <i class="fa fa-caret-down"></i>
                        </span>
                      </td>
                      <td>
                        <span class="tag is-dark">Fleisch</span>
                      </td>
                      <td class="subcategories-progress">
                        <progress class="progress is-medium is-success" :value="0.6 * 100" max="100"></progress>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="icon has-text-success">
                          <i class="fa fa-caret-up"></i>
                        </span>
                      </td>
                      <td>
                        <span class="tag is-dark">Innereien</span>
                      </td>
                      <td class="subcategories-progress">
                        <progress class="progress is-medium is-warning" :value="0.4 * 100" max="100"></progress>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span class="icon has-text-danger">
                          <i class="fa fa-exclamation"></i>
                        </span>
                      </td>
                      <td><span class="tag is-dark">Magen</span></td>
                      <td class="subcategories-progress"><progress class="progress is-medium is-danger" :value="0.2 * 100" max="100"></progress></td>
                    </tr>
                    <tr>
                      <td>
                        <span class="icon has-text-warning">
                          <i class="fa fa-minus"></i>
                        </span>
                      </td>
                      <td><span class="tag is-dark">Knochen</span></td>
                      <td class="subcategories-progress"><progress class="progress is-medium is-warning" :value="0.4 * 100" max="100"></progress></td>
                    </tr>
                    <tr>
                      <td>
                        <span class="icon has-text-success">
                          <i class="fa fa-check"></i>
                        </span>
                      </td>
                      <td><span class="tag is-black">Getreide</span></td>
                      <td class="subcategories-progress"><progress class="progress is-medium is-success" :value="1 * 100" max="100"></progress></td>
                    </tr>
                    <tr>
                      <td>
                        <span class="icon has-text-warning">
                          <i class="fa fa-minus"></i>
                        </span>
                      </td>
                      <td><span class="tag is-black">Früchte</span></td>
                      <td class="subcategories-progress"><progress class="progress is-medium is-warning" :value="0.5 * 100" max="100"></progress></td>
                    </tr>
                    <tr>
                      <td>
                        <span class="icon has-text-warning">
                          <i class="fa fa-minus"></i>
                        </span>
                      </td>
                      <td><span class="tag is-black">Gemüse</span></td>
                      <td class="subcategories-progress"><progress class="progress is-medium is-warning" :value="0.4 * 100" max="100"></progress></td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div class="column is-5">
                <table class="table is-fullwidth">
                  <tbody>
                    <tr>
                      <th>Mo</th>
                      <td>Rindermuskelfleisch</td>
                      <td>
                        <span class="icon has-text-success">
                          <i class="fa fa-check"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>Rindermuskelfleisch</td>
                      <td>
                        <span class="icon has-text-success">
                          <i class="fa fa-check"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Di</th>
                      <td>Blättermagen</td>
                      <td>
                        <span class="icon has-text-danger">
                          <i class="fa fa-times"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>Rindermuskelfleisch</td>
                      <td>
                        <span class="icon has-text-success">
                          <i class="fa fa-check"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Mi</th>
                      <td>Rindermuskelfleisch</td>
                      <td>
                        <span class="icon has-text-success">
                          <i class="fa fa-check"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th>Do</th>
                      <td>Rindermuskelfleisch</td>
                      <td>
                        <span class="icon has-text-success">
                          <i class="fa fa-check"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                    <tr>
                      <th></th>
                      <td>Rindermuskelfleisch</td>
                      <td>
                        <span class="icon has-text-success">
                          <i class="fa fa-check"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-edit"></i>
                        </span>
                        <span class="icon">
                          <i class="fa fa-trash"></i>
                        </span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="column is-4">
        <article class="message">
          <div class="message-header">
            <p>Hello World</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            buttons
          </div>
        </article>
        <article class="message">
          <div class="message-header">
            <p>Hello World</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            buttons
          </div>
        </article>
        <article class="message">
          <div class="message-header">
            <p>Hello World</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            buttons
          </div>
        </article>
        <article class="message">
          <div class="message-header">
            <p>Hello World</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
            buttons
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      msg: 'Welcome to BARF.'
    }
  },
  computed: {
    dogs () {
      return this.$store.state['dogs']
    }
  },
  methods: {
    calculate_age (birthday) {
      console.log(birthday)
      let today = new Date()
      var age = today.getFullYear() - birthday.getFullYear()
      var m = today.getMonth() - birthday.getMonth()
      if (m < 0 || (m === 0 && today.getDate() < birthday.getDate())) {
        age--
      }
      return age
    },
    plan_for_dog (dog) {
      return this.$store.state.plans.filter(p => p.id === dog.plan)[0]
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  display: inline-block;
  margin: 0 10px;
}

a {
  color: #42b983;
}

.dog-card {
  margin-bottom: 1em;
}

.subcategories-progress {
  min-width: 128px;
}
</style>
