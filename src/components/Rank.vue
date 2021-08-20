<template>
  <div class="com-container">
    <div class="com-chart" ref="rank_ref"></div>
  </div>
</template>

<script>
import { getData } from '@api/data'
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
            this.chartInstance = this.$echarts.init(this.$refs.rank_ref)
            const initOption = {}
            this.chartInstance.setOption(initOption)
        },
        //获取数据
        getData(){
            getData().then((res) => {
                this.allData = res.data
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