<template slot="items" slot-scope="props">
  <v-card app  color="white">
    <v-toolbar class="pa-0 ma-0">
      
      <v-img id="logo" class="ma-4" @click="home" src="@/assets/around-the-world.png" 
      aspect-ratio="1" max-width="40" max-height="40">
      </v-img>      

      <v-btn text to="/analysis">
        에너지 사용량 분석
      </v-btn>
      <v-btn text to="/dashboard">
        대시보드
      </v-btn>
      <v-btn text to="/contact">
        Contact
      </v-btn>               
    </v-toolbar>
  </v-card>   
</template>

<script>
export default {

  methods: {
    home () {
      this.$router.push('/', () => {});
    },
  } 
}
</script>


<style>
  #core-toolbar a {
    text-decoration: none;
  }
  ::v-deep .v-btn {
    padding-left: 12px;
    padding-right: 12px;
  } 
</style>

