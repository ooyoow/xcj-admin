<template>
  <div :class="prefixCls">
    <div>
      <div class="user-increase">
        <div>会员增长情况</div>
        <div>
          <el-button type="primary">导出数据</el-button>
          <el-select v-model="queryUserIncrease.type" placeholder="请选择" @input="onInputQueryUserParam">
            <el-option v-for="item in queryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="queryUserIncrease.date" :clearable="false" :type="queryUserIncrease.type === 1 ? 'month' : 'year'" placeholder="选择年" @input="onInputQueryUserParam"></el-date-picker>
        </div>
      </div>
      <line-chart height='300px' width='100%' :xAxisData="userIncreate.xAxisData" :seriesData="userIncreate.seriesData"></line-chart>
    </div>
    <div>
      <div class="user-increase">
        <div>会员端口来源</div>
        <div>
          <el-button type="primary">导出数据</el-button>
          <el-select v-model="queryUserPortSource.type" placeholder="请选择" @input="onInputQueryUserPortSource">
            <el-option v-for="item in queryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="queryUserPortSource.date" :clearable="false" :type="queryUserPortSource.type === 1 ? 'month' : 'year'" placeholder="选择年" @input="onInputQueryUserPortSource" />
        </div>
      </div>
      <pie height='300px' width='100%' :legendData="userPortSource.legendData" :seriesData="userPortSource.seriesData"></pie>
    </div>
    <div>
      <div class="user-increase">
        <div>会员消费金额分布</div>
        <div>
          <el-button type="primary">导出数据</el-button>
          <el-select v-model="queryUserConsume.type" placeholder="请选择" @input="onQueryUserConsume">
            <el-option v-for="item in queryOptions" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
          <el-date-picker v-model="queryUserConsume.date" :clearable="false" :type="queryUserConsume.type === 1 ? 'month' : 'year'" placeholder="选择年" @input="onQueryUserConsume" />
        </div>
      </div>
      <bar height='300px' width='100%' :option="userConsumeChartOption"></bar>
    </div>
  </div>
</template>

<script>
import moment from "moment";
import LineChart from "@/components/charts/line";
import Pie from "@/components/charts/pie";
import Bar from "@/components/charts/bar";
import $axios from "@/utils/axios";
import { getDateByInterval, createMonthByYear } from "@/utils/date";
import "./portrait.scss";
export default {
  data() {
    return {
      prefixCls: "xcj-user-portrait",
      queryOptions: [
        {
          value: 1,
          label: "按月统计"
        },
        {
          value: 2,
          label: "按年统计"
        }
      ],
      queryUserIncrease: this.initQueryParams(),
      queryUserPortSource: this.initQueryParams(),
      queryUserConsume: this.initQueryParams(),
      userIncreate: {
        xAxisData: [],
        seriesData: []
      },
      userPortSource: {
        legendData: ["微信", "小程序", "共享联盟", "集团客户"],
        seriesData: [
          {
            name: "微信",
            value: 0
          },
          {
            name: "小程序",
            value: 0
          },
          {
            name: "共享联盟",
            value: 0
          },
          {
            name: "集团客户",
            value: 0
          }
        ]
      },
      userConsumeChartOption: {
        color: ["#3398DB"],
        tooltip: {
          trigger: "axis",
          axisPointer: {
            // 坐标轴指示器，坐标轴触发有效
            type: "shadow" // 默认为直线，可选为：'line' | 'shadow'
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [
              "0元",
              "5-10元",
              "11-50元",
              "51-200元",
              "201-1000元",
              "1001-3000元",
              "3001-10000元",
              "10000元以上"
            ],
            axisTick: {
              alignWithLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "会员数",
            type: "bar",
            barWidth: "60%",
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
          }
        ]
      }
    };
  },
  components: {
    LineChart,
    Pie,
    Bar
  },
  created() {
    this.onInputQueryUserParam();
    this.onInputQueryUserPortSource();
    this.onQueryUserConsume();
  },
  methods: {
    // 查询用户增长记录
    getUserIncrease(params) {
      $axios({
        method: "get",
        url: "/api/v1/user/queryUserIncrease",
        params: params
      }).then(response => {
        const { resultObj } = response.data;
        const { type, year, month } = params;
        let xAxisData = [],
          seriesData = [];
        switch (params.type) {
          case 1: // 按月查询
            const date = `${year}-${month}`;
            const startDay = moment(date)
              .startOf("month")
              .valueOf();
            const endDay = moment(date)
              .endOf("month")
              .valueOf();
            xAxisData = getDateByInterval(startDay, endDay);
            break;
          case 2:
            xAxisData = createMonthByYear(year);
            break;
        }
        seriesData = xAxisData.map(item => 0);
        resultObj.forEach(item => {
          const { axis, totalcount } = item;
          const index = xAxisData.indexOf(axis);
          index > 0 ? (seriesData[index] = totalcount) : seriesData;
        });
        this.userIncreate = {
          xAxisData,
          seriesData
        };
      });
    },

    // 查询会员端口来源
    getUserPortSource(params) {
      $axios({
        method: "get",
        url: "/api/v1/user/queryUserSource",
        params: params
      }).then(response => {
        const { groupCustomer, sharedAlliance, smallProgram, weChat } =
          response.data.resultObj || {};
        this.userPortSource.seriesData = [
          {
            name: "微信",
            value: weChat
          },
          {
            name: "小程序",
            value: smallProgram
          },
          {
            name: "共享联盟",
            value: sharedAlliance
          },
          {
            name: "集团客户",
            value: groupCustomer
          }
        ];
      });
    },

    // 会员消费金额分布
    getUserConsume(params) {
      $axios({
        method: "get",
        url: "/api/v1/user/queryUserConsumption",
        params: params
      }).then(response => {
        const { resultObj } = response.data;
        if (resultObj && Array.isArray(resultObj)) {
          let data = [];
          resultObj.map(item => {
            data = Object.keys(item).map(key => {
              return item[key];
            });
          });
          this.userConsumeChartOption = {
            ...this.userConsumeChartOption,
            series: {
              ...this.userConsumeChartOption.series,
              data
            }
          };
        }
      });
    },

    onInputQueryUserParam(value) {
      const { type, date } = this.queryUserIncrease;
      const year = moment(date).format("YYYY");
      const params = { type, year, month: "" };
      type === 1 ? (params.month = moment(date).format("MM")) : params;
      this.getUserIncrease(params);
    },

    onInputQueryUserPortSource() {
      const { type, date } = this.queryUserPortSource;
      const params = this.formatQueryParams(type, date);
      this.getUserPortSource(params);
    },

    // 会员消费金额分布查询参数表更触发事件
    onQueryUserConsume() {
      const { type, date } = this.queryUserConsume;
      const params = this.formatQueryParams(type, date);
      this.getUserConsume(params);
    },

    // 查询参数处理
    formatQueryParams(type, date) {
      const params = { start: "", end: "" };
      switch (type) {
        case 1: // 按月查询
          Object.assign(params, {
            start: moment(date)
              .startOf("month")
              .valueOf(),
            end: moment(date)
              .endOf("month")
              .valueOf()
          });
          break;
        case 2: // 按年查询
          Object.assign(params, {
            start: moment(`${moment(date).format("YYYY")}-01`)
              .startOf("month")
              .valueOf(),
            end: moment(`${moment(date).format("YYYY")}-12`)
              .endOf("month")
              .valueOf()
          });
          break;
      }
      return params;
    },

    // 初始化查询对象
    initQueryParams() {
      return {
        type: 1,
        date: moment().format("YYYY-MM")
      };
    }
  }
};
</script>
