<template>
  <div class="about">
    <section class="hero is-primary is-bold">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">B.A.R.F.</h2>
          <p class="subtitle">
            version {{ version }}
          </p>
        </div>
      </div>
    </section>
    <section class="hero is-medium is-light">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">DATA &amp; PRIVACY</h2>
          <p class="subtitle">
            B.A.R.F stores all <strong>data in your browser</strong>.
            Noone except of you has access to this data.
            This also means that it is <strong>your responsibility to take care</strong> of it.
          </p>
          <p class="subtitle">
            With default browser settings the data should be persistent.
          </p>
          <p class="subtitle">
            If you want to use different devices it might be a little tricky.
            Currently B.A.R.F. does not support anything else except of importing and exporting the data.
            Visit the <router-link class="has-text-primary" :to="{ name: 'Settings' }">settings</router-link> for those features.
          </p>
        </div>
      </div>
    </section>
    <section class="hero is-medium is-warning">
      <div class="hero-body">
        <div class="container">
          <h2 class="title">IT'S A TOOL, NOT A CONSULTANT NOR A VET</h2>
          <p class="subtitle">
            B.A.R.F. <strong>assists you</strong> creating an individal plan to feed your pet.
            You still need to study this topic and <strong>observe your dog</strong> to find out what is needed.
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { version } from '../../package.json'

export default {
  name: 'about',
  data () {
    return {
      version
    }
  }
}
</script>
