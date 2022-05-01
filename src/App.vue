<template>
  <v-app>
    <ToolbarComponent></ToolbarComponent>
    <v-main>
      <v-fade-transition mode="out-in">
        <router-view></router-view>
      </v-fade-transition>
      <FooterComponent></FooterComponent>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  components: {
    ToolbarComponent: () => import('@/components/ToolbarComponent'),
    FooterComponent: () => import('@/components/FooterComponent'),
  },
  data () {
    return {
      fullscreen: false,
    }
  },
  methods: {
    home: function() {
      const path = `/`
      if (this.$route.path !== path) this.$router.push(path)
      // this.$router.push("/");
    }
  }
};
</script>

