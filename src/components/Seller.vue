<template>
  <div class="com-container">
    <div class="com-echart" ref="seller_ref"></div>
  </div>
</template>

<script>
import { getData } from "../api/data";
export default {
  data() {
    return {
      chartInstance: null,
      allDate: null, //服务器返回的数据
      currentPage: 1, //当前显示的页数
      totalPage: 0, //一共有多少页
      timerId: null, //定时器的标识
    };
  },
  mounted() {
    this.initChart();
    this.getData();
    window.addEventListener("resize", this.screeAdapter);
    //在屏幕加载完成后，主动进行屏幕的适配
    this.screeAdapter();
  },
  destroyed() {
    clearInterval(this.timerId);
    //在组件销毁时 ，需要将监听取消
    window.removeEventListener("resize", this.screeAdapter);
  },
  methods: {
    //初始化echartsInstance对象
    initChart() {
      this.chartInstance = this.$echarts.init(this.$refs.seller_ref, "chalk");
      //对图表初始化配置的控制
      const initOption = {
        title: {
          text: "▍ 商家销售统计",
          left: 20,
          top: 20,
        },
        grid: {
          top: "20%",
          left: "3%",
          right: "6%",
          bottom: "3%",
          containLabel: true, //距离是包含坐标轴的文字
        },
        xAxis: {
          type: "value",
        },
        yAxis: {
          type: "category",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "line",
            z: 0,
            lineStyle: {
              color: "#2D3443",
            },
          },
        },
        series: [
          {
            type: "bar",
            label: {
              show: true,
              position: "right",
              textStyle: {
                color: "white",
              },
            },
            itemStyle: {
              //指明验收渐变的放向
              //指明不同百分比之下颜色的值

              color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [
                {
                  offset: 0,
                  color: "#5052EE",
                },
                //百分百状态下的颜色值
                {
                  offset: 1,
                  color: "#AB6EE5",
                },
              ]),
            },
          },
        ],
      };
      this.chartInstance.setOption(initOption);
      //对图表对象进行鼠标时间的监听
      this.chartInstance.on("mouseover", () => {
        clearInterval(this.timerId);
      });
      this.chartInstance.on("mouseout", () => {
        this.startInterval();
      });
    },
    //获取服务器数据
    getData() {
      getData("seller").then((res) => {
        this.allDate = res.data;
        //对数组进行排序
        this.allDate.sort((a, b) => {
          return a.value - b.value; //从小到大排序
        });
        //每5个元素显示一页
        this.totalPage =
          this.allDate.length % 5 === 0
            ? this.allDate.length / 5
            : this.allDate.length / 5 + 1;
        this.updateChart();
        this.startInterval();
      });
    },
    //更新图表
    updateChart() {
      const start = (this.currentPage - 1) * 5;
      const end = this.currentPage * 5;
      const showData = this.allDate.slice(start, end);
      const sellerNames = showData.map((item) => {
        return item.name;
      });
      const sellerValues = showData.map((item) => {
        return item.value;
      });
      const dataOption = {
        yAxis: {
          data: sellerNames,
        },

        series: [
          {
            data: sellerValues,
          },
        ],
      };
      this.chartInstance.setOption(dataOption);
    },
    //定时器
    startInterval() {
      if (this.timerId) {
        clearInterval(this.timerId);
      }
      this.timerId = setInterval(() => {
        this.currentPage++;
        if (this.currentPage > this.totalPage) {
          this.currentPage = 1;
        }
        this.updateChart();
      }, 3000);
    },
    //当浏览器的大小发生变化的时候，会调用的方法，来完成屏幕的适配
    screeAdapter() {
      // console.log(this.$refs.seller_ref.offsetWidth)
      const titleFontSize = (this.$refs.seller_ref.offsetWidth / 100) * 3.6;
      //和分辨率大小的配置项
      const adapterOption = {
        title: {
          textStyle: {
            fontSize: titleFontSize,
          },
        },
        tooltip: {
          axisPointer: {
            lineStyle: {
              width: titleFontSize,
            },
          },
        },
        series: [
          {
            barWidth: titleFontSize,

            itemStyle: {
              barBorderRadius: [0, titleFontSize / 2, titleFontSize / 2, 0],
            },
          },
        ],
      };
      this.chartInstance.setOption(adapterOption);
      //手动调用图表对象的resize,才能产生效果

      this.chartInstance.resize();
    },
  },
};
</script>

<style lang="less" scoped>
.com-container {
  width: 100%;
  height: 100%;
  overflow: hidden;
  .com-echart {
    width: 100%;
    height: 100%;
    overflow: hidden;
  }
}
</style>

