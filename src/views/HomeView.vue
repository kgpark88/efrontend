<template>
  <v-card max-width="100%" class="mx-auto  lighten-5 ma-10" flat>
    <v-container class="grey lighten-5">
      <v-carousel 
        cycle
        hide-delimiter-background
        show-arrows-on-hover
        height=650
      >
        <v-carousel-item
          v-for="(item,i) in items"
          :key="i"
          :src="item.src"
        >
          <v-row
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-col cols="12">
              <div class="text-h2 font-weight-bold yellow--text ml-10">
                {{ item.title }}
              </div>
            </v-col>
          </v-row>
        
        </v-carousel-item>
      </v-carousel>

      <v-row>
        <v-col cols="12">
        </v-col>
      </v-row>

      <v-row>
        <v-col
          v-for="({ icon, title, menu }, i) in features"
          :key="i" cols="12"  md="4">
          <v-card class="py-4 px-4" flat>
            <div @click="router_push(menu)" align="center">
              <v-img 
                :src="icon"
                aspect-ratio="1" 
                max-width="100" 
                max-height="100"
              >  
              </v-img>
            </div>
            <v-card-title
              class="justify-center font-weight-black"
              v-text="title"
            ></v-card-title>
          </v-card>
        </v-col>
      </v-row> 
    </v-container>
  </v-card>
</template>

<script>
 export default {
  data: () => ({
    items: [
      {
        src: require('@/assets/home01.png'),
        title: '에너지 빅데이터 분석',
        to:'/energy-usage'
      },
      {
        src: require('@/assets/home02.png'),
        title: '에너지 예측 AI모델',
        to:'/dashboard'
      },
      {
        src: require('@/assets/home03.jpg'),
        title: '에너지 성능 분석',
        to: '/dashboard'
      },
    ],
    features: [
      { 
        icon: require('@/assets/analysis.png'),
        title: '에너지 빅데이터 분석',
        menu: 'analysis',
      },
      {
        icon: require('@/assets/statistics.png'),
        title: '에너지 예측 AI모델',
        menu: 'dashboard',
      },

      {
        icon: require('@/assets/team.png'),
        title: 'Contact',
        menu: 'contact',
      },
    ],    
  }), 
  methods: {
    router_push(menu) {
      console.log(menu)
      this.$router.push(menu);
    }        
  },
}
</script>
