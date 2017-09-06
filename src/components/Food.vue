<template>
  <div class="data container">
    <div class="columns">
      <div class="column is-half">
        <nav class="panel">
					<p class="panel-tabs">
            <template v-for="entity in entities">
              <a v-on:click="activateEntity(entity)" :class="{'is-active': entity === activeEntity}">{{ entity }}s</a>
            </template>
					</p>
          <template v-for="element in elements">
            <a v-on:mouseover="activateRecord(element)" class="panel-block is-active">
              <span class="panel-icon">
                <i v-if="activeEntity === 'dog'" class="fa fa-id-card-o"></i>
                <i v-else class="fa fa-question"></i>
              </span>
              {{ element.name }}
            </a>
          </template>
          <div class="panel-block">
						<button class="button is-primary is-outlined is-fullwidth">
							Add new {{ activeEntity }}
						</button>
					</div>
				</nav>
      </div>
      <div class="column is-half">
        <article class="message">
          <div class="message-header">
            <p>Hello World</p>
            <button class="delete" aria-label="delete"></button>
          </div>
          <div class="message-body">
          </div>
        </article>
        <div class="card">
					<div class="card-content">
            <table v-if="activeEntity === 'dog'" class="table">
							<thead>
								<tr>
                  <td>Name</td>
									<td>Age</td>
								</tr>
							</thead>
							<tbody>
								<tr>
                  <td>{{ activeRecord.name }}</td>
									<td>3</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
      activeRecord: {
        name: 'unknown'
      },
      activeEntity: 'ingredient',
      entities: ['ingredient', 'recipe']
    }
  },
  computed: {
    elements () {
      return this.$store.state[this.activeEntity + 's']
    }
  },
  methods: {
    activateEntity: function (entity) {
      this.activeRecord = {
        name: 'Unknown'
      }
      this.activeEntity = entity
    },
    activateRecord: function (record) {
      console.log('activated')
      this.activeRecord = record
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
</style>
