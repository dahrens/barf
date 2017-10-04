<template>
  <div class="dog-detail">
    <div class="faked-panel-block">
      <nav class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">
              <span class="icon is-large">
                <fa v-if="dog.sex === 'm'" size="5x" pack="fas" name="mars" />
                <fa v-else size="5x" pack="fas" name="venus" />
              </span>
            </p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">
              <span class="icon is-large">
                <fa size="3x" pack="fas" name="tachometer-alt" />
              </span>
            </p>
            <p class="subtitle"> {{ dog.weight }}g</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">
              <span class="icon is-large">
                <fa size="3x" pack="fas" name="futbol" />
              </span>
            </p>
            <p class="subtitle"> {{ dog.activity }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">
              <span class="icon is-large">
                <fa v-if="dog.castrated" size="3x" pack="fas" name="check" />
                <fa v-else size="3x" pack="fas" name="times" />
              </span>
            </p>
            <p class="subtitle">castrated</p>
          </div>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  name: 'dogDetail',
  props: ['dog']
}
</script>
