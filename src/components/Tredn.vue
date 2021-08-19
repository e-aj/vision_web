<template>
  <div class="com-container">
      <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
export default {
    data(){
        return{
            chartInsance: null,
            allData:null,//从服务器获取的数据
        }
    },
    methods: {
        //初始化
        initChart (){
            this.chartInsance = this.$echarts.init(this.$refs.trend_ref)
            const initOption = {}
            this.chartInsance.setOption(initOption)
        },
        //获取数据
        getData(){},
        // 处理数据
        updtaChart (){

        }

    }

}
</script>

<style lang="less" scoped>

</style>