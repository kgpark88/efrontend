<template>
  <v-footer id="core-footer" fixed>
    <span class="font-weight-light copyright">
      &copy;
      {{ (new Date()).getFullYear() }}
      Danny
    </span>
  </v-footer>
</template>

<script>
  export default {
    data: () => ({
      links: [
        { name: 'Contact', Link: '/contact' },
      ]
    })
  }
</script>

<style>
#core-footer {
  z-index: 0;
}
</style>
