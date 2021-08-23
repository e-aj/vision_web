<template>
  <div class="com-container">
    <div class="com-chart" ref="hot_ref"></div>
    <span class="iconfont arr-left" @click="toLeft" :style="comStyle"> ＜</span>
    <span class="iconfont arr-right" @click="toRight" :style="comStyle">＞</span>
    <span class="cat-name" :style="comStyle">{{ cattName }}-</span>
  </div>
</template>

<script>
import { getData } from "@api/data";
export default {
  data() {
    return {
      chartInstance: null,
      allData: null,
      currentIndex: 0, //当前所展示出的一级分类数据
    };
  },
  computed: {
    cattName() {
      if (!this.allData) {
        return "";
      } else {
        return this.allData[this.currentIndex].name;
      }
    },
    comStyle (){
        return {
            fontSize:this.fontSize + 'px'
        }
    }
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
    //初始化图表
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.hot_ref, "chalk");
      const initOption = {
        title: {
          text: "▎ 热销商品的占比",
          left: 20,
          top: 20,
        },
        legend: {
          top: "10%",
          icon: "circle",
        },
        tooltip: {
          show: true,
          formatter: (arg) => {
            const thirdCategory = arg.data.children;
            //计算出所有三级分类 的数值总和
            // let total = 0;
            // thirdCategory.foreach((item) => {
            //   total += item.value;
            // });
            // let retStr = "";
            // thirdCategory.foreach((item) => {
            //   retStr += `
            //   ${item.name}:${parseInt((item.value / total) * 100) + "%"}
            //   <br/>
            //   `;
            // });
            // return retStr;
          },
        },
        series: [
          {
            type: "pie",
            label: {
              show: false,
            },
            emphasis: {
              label: {
                show: true,
              },
              labelLine: {
                show: false,
              },
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
    },
    //获取数据
    getData() {
      getData("hot").then((res) => {
        this.allData = res.data;
        console.log(this.allData);
        this.updataChart();
      });
    },
    updataChart() {
      //处理图表需要的数据
      const legendData = this.allData[this.currentIndex].children.map(
        (item) => {
          return item.name;
        }
      );
      const seriesData = this.allData[this.currentIndex].children.map(
        (item) => {
          return {
            name: item.name,
            value: item.value,
          };
        }
      );
      const dataOption = {
        legend: {
          data: legendData,
        },
        series: [
          {
            data: seriesData,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    screeAdapter() {
        const titleFontSize = this.$refs.hot_ref.offsetWidth / 100 *3.6
      const adapterOption = {
          title:{
              textStyle:{
                  fontSize:titleFontSize
              }
          },
          legend:{
              itemWidth: titleFontSize / 2,
              itemHeight: titleFontSize / 2,
              itemGap: titleFontSize / 2,
              textStyle:{
                  fontSize:titleFontSize / 2
              }
          },
          series:[
              {
                  radius:titleFontSize * 4.5,
                //   center:['50%','60%']
              }
          ]
      };
      this.chartInstance.setOption(adapterOption);
      this.chartInsance.resize();
    },
    toLeft() {
      this.currentIndex--;

      if (this.currentIndex < 0) {
        this.currentIndex = this.allData.length - 1;
      }
      this.updataChart();
    },
    toRight() {
      this.currentIndex++;

      console.log(this.currentIndex);
      if (this.currentIndex > this.allData.length - 1) {
        this.currentIndex = 0;
      }
      this.updataChart();
      console.log(this.catName);
    },
  },
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
  .arr-left {
    position: absolute;
    left: 3%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: rgb(255, 255, 255);
    font-size: 36px;
  }
  .arr-right {
    position: absolute;
    right: 3%;
    top: 50%;
    transform: translateY(-50%);
    cursor: pointer;
    color: rgb(255, 255, 255);
    font-size: 36px;
  }
  .cat-name {
    position: absolute;
    left: 80%;
    bottom: 20px;
    color: rgb(255, 255, 255);
  }
}
</style>