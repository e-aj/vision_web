<template>
  <div class="com-container">
    <div class="com-echart" ref="seller_ref"></div>
  </div>
</template>

<script>
import { getData } from "../api/seller";
export default {
  data() {
    return {
      chartInstance: null,
      allDate: null, //服务器返回的数据
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    this.updateChart();
  },
  methods: {
    //初始化echartsInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref);
    },
    //获取服务器数据
    getData() {
      getData().then((res) => {
        this.allDate = res.data;
        // console.log(this.allDate[0].name);
        // console.log(typeof res)
        // console.log(this.allDate.name)
        // console.log(typeof(this.allDate[0]))
        for(let key in this.allDate){
        console.log(this.allDate[0])
    }
      });
    },
    //更新图表
    updateChart() {
    //   const sellerNames = this.allDate.map((item) => {
    //     return item.name;
    //   });
    //   const sellerValue = this.allDate.map((item) => {
    //     return item.value;
    //   });
    
        
      const option = {
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        //   data:sellerNames
        },
        series: [
          {
            type: "bar",
            // data:sellerValue
          },
        ],
      };
      this.chartInstance.setOption(option);
    },
  },
};
</script>

<style>
</style>