<template>
  <div class="Container">
    <van-nav-bar
      left-text="返回"
      @click-left="$router.go(-1)"
      left-arrow
      title="用证记录"
    />
    <div class="tabsContainer">
      <van-tabs v-model="active" @click="tab">
        <van-tab title="未归还" name="0" badge="0" @click="tab(0)">
        </van-tab>
        <van-tab title="已归还" name="1" @click="tab(1)"></van-tab>
        <van-tab title="全部" name="-1" @click="tab(-1)"></van-tab>
      </van-tabs>
    </div>
    <div class="recordContainer">
      <div class="refresh">
        <p class="refreshTitle">下拉刷新</p>
      </div>
      <div class="card" v-for="(item, idx) in items" :key="idx">
        <div class="cardHeader">
          <p class="cardHeaderTitle">
            {{item.leader}}的{{item.certificate}}
          </p>
          <p class="cardHeaderTime">
            {{item.certificateId}}
          </p>
        </div>
        <div class="cardContent">
          <div class="left">
            <p class="cardContentText">
              借出时间：{{item.startTime}}
            </p>
            <p class="cardContentText">
              归还时间：{{item.endTime}}
            </p>
            <p class="cardContentText">
              借出类型：出国境借出
            </p>
            <p class="cardContentText">
              地点：{{item.destination}}
            </p>
            <p class="cardContentText">
              事由：{{item.reason}}
            </p>
          </div>
        </div>
        <div class="cardFooter">
          <van-tag class="tag" type="danger" size="medium">庄</van-tag>
          <p class="cardFooterName"> 由&nbsp;庄晨忠&nbsp;提交 </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getData} from '@/api/evidenceRecord.js';
export default {
  name: "EvidenceRecord",
  data(){
    return {
      active: 0,
      items: [],
    }
  },
  methods: {
    tab(name, _){
      getData(name).then(
        res => {
          this.items = res.page.list;
        }
      )
    }
  },
  created(){
    getData(0).then(
      res => {
        this.items = res.page.list;
      }
    )
  }
}
</script>

<style scoped>
.Container {
  height: 100%;
  background-color: #f4f4f4;
}

/deep/ .van-ellipsis {
  color: #fff;
}

/deep/ .van-nav-bar__text {
  color: #fff;
}

/deep/ .van-nav-bar__arrow {
  color: #fff;
}

/deep/ .van-nav-bar__content {
  background: #b13a3d;
}

.tabsContainer {
  position: relative;
  z-index: 20;
}

.recordContainer {
  padding: 0 2.66667vw 4vw;
  transition-timing-function: cubic-bezier(0.165, 0.84, 0.44, 1);
  transition-duration: 0ms;
  transition-property: transform;
  transform: translateY(-11px) translateZ(1px);
}

.refresh {
  position: absolute;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(100% - 5.33333vw);
  pointer-events: auto;
  transform: translateY(-150%);
}

.card {
  padding: 5.33333vw;
  margin-top: 4vw;
  background-color: #fff;
  border-radius: 2.66667vw;
}

.cardHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.cardHeaderTitle {
  display: flex;
  align-items: center;
  font-size: 4vw;
}

.cardHeaderTime {
  font-size: 2.93333vw;
  color: #868686;
}

.cardContent {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 4vw 0;
  font-size: 3.46667vw;
  line-height: 1.8;
  color: #868686;
}

.cardFooter {
  display: flex;
  align-items: center;
}

.tag {
  color: #fff;
  background-color: rgb(177, 58, 61);
  border-radius: 0.5vw;
}

.cardFooterName {
  flex: 1;
  padding: 0 2.66667vw;
  font-size: 4vw;
}

</style>
