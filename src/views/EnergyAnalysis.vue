<template>
  <div>
    <v-card class="mx-auto lighten-5 ma-10" outlined max-width="1400px">
      <v-system-bar height="60" dark color="blue darken-2">
        <v-icon large>mdi-domain</v-icon>
        <span class="headline">에너지 사용량 분석</span>          
      </v-system-bar>

      <v-row class='ma-2'>
        <v-col cols="12" md="2">
          <v-select
            v-model="b_name"
            :items="b_names"
            prepend-icon="mdi-domain"
            menu-props="auto"
            hide-details
            label="빌딩 이름"
          >
          </v-select>
        </v-col>

        <v-col cols="12" md="2">
          <v-menu
            ref="menu1"
            v-model="menu1"
            :close-on-content-click="false"
            :return-value.sync="from_dt"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field 
                v-model="from_dt"
                readonly
                v-on="on"
                hide-details
                class="white"
                outlined
                label="From"                
              ></v-text-field>
            </template>
            <template>
              <v-row justify="space-around">
                <v-date-picker 
                  v-model="from_dt" 
                  :first-day-of-week="0"
                  locale="ko-kr"  
                  @input="$refs.menu1.save(from_dt)"
                >
                </v-date-picker>
              </v-row>
            </template>
          </v-menu>  
        </v-col>

        <v-col cols="12" md="2">
          <v-menu
            ref="menu2"
            v-model="menu2"
            :close-on-content-click="false"
            :return-value.sync="to_dt"
            transition="scale-transition"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-text-field 
                v-model="to_dt"
                readonly
                v-on="on"
                hide-details
                class="white"
                outlined
                label="To"                 
              ></v-text-field>
            </template>
            <template>
              <v-row justify="space-around">
                <v-date-picker 
                  v-model="to_dt" 
                  :first-day-of-week="0"
                  locale="ko-kr"  
                  @input="$refs.menu2.save(to_dt)"
                  @change="get_energy_usage()"
                >
                </v-date-picker>
              </v-row>
            </template>
          </v-menu> 
        </v-col>

        <v-col cols="12" md="2">
          <v-btn outlined color="blue" x-large  @click="get_energy_usage()">
            조회
          </v-btn>
        </v-col>  
      </v-row>

      <v-row class='ma-2'>
        <v-col cols="12" md="12">
          <v-chart :option="chart_option" autoresize />
        </v-col>
      </v-row>
    </v-card>   

    <v-card class="mx-auto lighten-5 ma-10" outlined max-width="1400px">
      <v-row>
        <v-col cols="12"></v-col>
      </v-row>

      <v-row class='ma-2'>
        <v-col cols="10">        
          <v-card-title>
            ◆ 에너지 사용량
          </v-card-title>
        </v-col>
        <v-col cols="2">        
          <v-btn outlined color="teal lighten-1" x-large>
            <v-icon left>mdi-file-excel</v-icon>
            <download-excel
              class   = "btn btn-default"
              :data   = "energy_usage"
              :fields = "json_fields"
              worksheet = "에너지사용량"
              name    = "에너지사용량">다운로드 
            </download-excel>
          </v-btn> 
        </v-col>        
      </v-row>
  

      <v-row> 
        <v-col cols="12">
          <v-data-table 
          :headers="headers" 
          :items="energy_usage" 
          >                       
          </v-data-table>  
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12" md="4" lg="4">
        </v-col>    
      </v-row>
      <v-row>
        <v-col cols="12">
        </v-col>
      </v-row>
    </v-card>  
  </div>
</template>


<script>
import axios from 'axios'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/toolbox'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/component/dataZoom'

const colors = ['#188df0', '#5470C6', '#EE6666', '#91CC75']

export default { 
  data: () => ({ 
    b_name: 'ABC',
    b_names: ['ABC', '우리빌딩'], 
    from_dt: '',
    to_dt: '',
    menu1: false,
    menu2: false,

    energy_usage: [],
    json_fields: {
      '빌딩': 'b_name',  
      '일시': 'date_time',  
      '전기에너지 사용량': 'p_usage',  
      '온도': 'temp',  
      '습도': 'rh',  
    },
    headers: [
      {'text': '빌딩명', 'value': 'b_name', 'width': '100px'},
      {'text': '일시', 'value': 'date_time', 'width': '100px'},
      {'text': '전기사용량 사용량', 'value': 'p_usage', 'width': '100px'},
      {'text': '온도', 'value': 'temp', 'width': '100px'},
      {'text': '습도', 'value': 'rh', 'width': '100px'},
    ],

    chart_option: {
        toolbox: {
          feature: {
            dataZoom: {yAxisIndex: false},
            magicType: {
              show: true, 
              type: ['line', 'bar'], 
              title: {line: "선그래프", bar: "막대그래프"}
            },
            saveAsImage: {show: true, title: "그래프 저장" }
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          bottom: 90
        },
        legend: {
          data: ['사용량', '예측량', '온도', '습도'],
        },
        dataZoom: [
          {
            type: 'inside'
          },
          {
            type: 'slider'
          }
        ],
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },          
          axisLabel: {
            rotate: 45
          },
          data: []
        },
        yAxis: [
          {
            type: 'value',
            name: '사용량',
            position: 'left',
            alignTicks: true,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[0]
              }
            },
            axisLabel: {
              formatter: '{value} kWH'
            }
          },
          {
            type: 'value',
            name: '온도',
            max: 50,
            min: -30,
            position: 'right',
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[2]
              }
            },
            axisLabel: {
              formatter: '{value} °C'
            }
          },
          {
            type: 'value',
            name: '습도',
            max: 100,
            min: 0,            
            position: 'right',
            offset: 80,
            axisLine: {
              show: true,
              lineStyle: {
                color: colors[3]
              }
            },
            axisLabel: {
              formatter: '{value} %'
            }
          }
        ],
        series: []      
    },

  }),
  created: function () {
    this.from_dt = this.$moment().startOf('month').format('YYYY-MM-DD');
    this.to_dt   = this.$moment().format('YYYY-MM-DD');
    this.get_energy_usage()
  },  
  methods: {
    get_energy_usage(){
      let url = process.env.VUE_APP_API_SERVER + '/energy/usage'  
      let post_data = {     
        b_name: this.b_name,
        from_dt: this.from_dt,
        to_dt: this.to_dt,  
      }
      axios.post(url, post_data).then((response) => {
        this.energy_usage = response.data.energy_usage
        this.chart_option.yAxis.max = response.data.max_usage
        this.chart_option.xAxis.data = response.data.x_axis
        this.chart_option.series = [
          {
            name: '사용량',
            type: 'bar',
            color: colors[0],  
            data: response.data.p_usage
          },
          {
            name: '예측량',
            type: 'line',
            color: colors[1], 
            data: response.data.prediction
          },
          {
            name: '온도',
            type: 'line',
            yAxisIndex: 1,
            color: colors[2], 
            data: response.data.temp
          },
          {
            name: '습도',
            type: 'line',
            yAxisIndex: 2,
            color: colors[3],            
            data: response.data.rh
          },
        ]        
      }).catch((error) => {
        console.log(error)
      })
    }
  }
}

</script>

<style scoped>
.echarts {
  width: 100%;
  height: 600px;
}
</style>