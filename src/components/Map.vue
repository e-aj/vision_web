<template>
  <div class="com-container">
    <div class="com-chart" ref="map_ref"></div>
  </div>
</template>

<script>
import { getData } from '@api/data'
import axios from 'axios'
export default {
    data(){
        return{
            chartInstance:null,
            allData:null
        }
    },
    mounted (){
        this.initChart()
        this.getData()
        window.addEventListener('resize',this.screeAdapter)
        this.screeAdapter()
        
    },
    destroyed (){
        window.removeEventListener('resize',this.screeAdapter)

    },
    methods:{
        //初始化图表
        initChart (){
            this.chartInstance = this.$echarts.init(this.$refs.map_ref)
            //获取中国地图的矢量数据
            axios.get('http://localhost:8080/static/map/china.json').then((res) => {
                this.$echarts.registerMap('china',res.data)
            })
            const initOption = {
                geo: {
                    type:'map',
                    map:'china'
                }
            }
            this.chartInstance.setOption(initOption)
        },
        //获取数据
        getData(){
            getData('/map').then((res) => {
                this.allData = res.data
                console.log(this.allData)
                this.updataChart()
            })
        },
        updataChart(){
            const dataOption = {}
            this.chartInstance.setOption(dataOption)

        },
        screeAdapter(){
            const adapterOption ={}
            this.chartInstance.setOption(adapterOption)
            this.chartInsance.resize();
        }
    }
};
</script>

<style lang="less">
.com-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .com-chart {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>