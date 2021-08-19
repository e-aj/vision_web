<template>
  <div class="com-container">
    <div class="com-chart" ref="trend_ref"></div>
  </div>
</template>

<script>
import { getData } from "@api/data";
export default {
  data() {
    return {
      chartInsance: null,
      allData: null, //从服务器获取的数据
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screeAdapter);
    this.screeAdapter();
  },
  destroyed() {
    window.removeEventListener("resize", this.screeAdapter);
  },

  methods: {
    //初始化
    initChart() {
      this.chartInsance = this.$echarts.init(this.$refs.trend_ref, "chalk");
      const initOption = {
        grid: {
          left: "3%",
          top: "35%",
          right: "4%",
          botton: "1%",
          containLabel: true,
        },
        tooltip: {
          show: true,
          trigger: "axis",
        },
        legend: {
          left: 20,
          top: "15%",
          icon:'circle'
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
        },
        yAxis: {
          type: "value",
        },
      };
      this.chartInsance.setOption(initOption);
    },
    //获取数据
    getData() {
      getData("trend").then((res) => {
        this.allData = res.data;
        this.updtaChart();
      });
    },
    // 处理数据
    updtaChart() {
        // 半透明的颜色值
      const colorArr1 = [
        'rgba(11, 168, 44, 0.5)',
        'rgba(44, 110, 255, 0.5)',
        'rgba(22, 242, 217, 0.5)',
        'rgba(254, 33, 30, 0.5)',
        'rgba(250, 105, 0, 0.5)'
      ]
      // 全透明的颜色值
      const colorArr2 = [
        'rgba(11, 168, 44, 0)',
        'rgba(44, 110, 255, 0)',
        'rgba(22, 242, 217, 0)',
        'rgba(254, 33, 30, 0)',
        'rgba(250, 105, 0, 0)'
      ]
      //类目轴的数据
      const timeArr = this.allData.common.month;
      //y轴的数据  series下的数据
      const valueArr = this.allData.map.data;
      const seriesArr = valueArr.map((item,index) => {
        return {
          name: item.name,
          type: "line",
          data: item.data,
          stack: "map",
          areaStyle:{
              color:new this.$echarts.graphic.LinearGradient(0,0,0,1,[
                  {
                      offset:0,
                      color:colorArr1[index]
                  },
                  {
                      offset:1,
                      color:colorArr2[index]
                  }
              ])
          }
        };
      });
      //图例的数据
      const legendArr = valueArr.map((item) => {
        return item.name;
      });
      const dataOption = {
        xAxis: {
          data: timeArr,
        },
        legend: {
          data: legendArr,
        },
        series: seriesArr,
      };
      this.chartInsance.setOption(dataOption);
    },
    //屏幕自适应
    screeAdapter() {
      const adapterOption = {};
      this.chartInsance.setOption(adapterOption);
      this.chartInsance.resize();
    },
  },
};
</script>

<style lang="less" scoped>
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