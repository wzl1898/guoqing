<template>
  <div class="Container">
    <van-nav-bar
      left-text="返回"
      @click-left="$router.go(-1)"
      left-arrow
      title="我的申请"
    />
    <div class="tabsContainer">
      <van-tabs v-model="active" @click="tab">
        <van-tab name="5" title="等待审批" :badge="47">
        </van-tab>
        <van-tab name="0" title="通过"></van-tab>
        <van-tab name="1" title="拒绝"></van-tab>
        <van-tab name="-1" title="全部"></van-tab>
      </van-tabs>
    </div>
    <div class="content">
      <div class="card" v-for="(item, idx) in items" :key="idx">
        <div class="cardHeader">
          <p class="cardHeaderTitle"> {{item.leader}}提交的用证申请 </p>
          <p class="cardHeaderTime"> {{item.applyBegin}} </p>
        </div>
        <div class="cardContent">
          <p class="text"> 联系电话: {{item.tellphone}} </p>
          <p class="text"> 工作部门: {{item.department}} </p>
          <p class="text"> 当前审批节点: {{item.approvalProcessList !== null ? item.approvalProcessList[0].currentOrganization : '暂无'}} </p>
        </div>
        <div class="cardFooter">
          <van-tag size="medium" type="primary">庄</van-tag>
          <p class="footerName"> 由庄晨忠提交 </p>
          <van-tag size="medium" type="primary" plain round v-if="item.status==5">等待审批</van-tag>
          <van-tag size="medium" type="primary" plain round v-if="item.status==0">通过</van-tag>
          <van-tag size="medium" type="primary" plain round v-if="item.status==1">拒绝</van-tag>
          <van-tag size="medium" type="primary" plain round v-if="item.status==4">撤回</van-tag>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {getData} from '@/api/application.js';
export default {
  name: "Application",
  data(){
    return {
      acitve: 0,
      items: [],
      num: 0,
    }
  },
  methods: {
    tab(val, title) {
      getData(val).then(
        res => {
          this.items = res.page.list;
        }
      )
    }
  },
  created(){
    getData(5).then(
        res => {
          this.items = res.page.list;
          this.num = this.items.length;
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

.content {
  padding: 0 2.66667vw 4vw;
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
  font-size: 4.26667vw;
}

.cardHeaderTime {
  font-size: 2.93333vw;
  color: #868686;
}

.cardContent {
  padding: 4vw 0;
  font-size: 3.46667vw;
  line-height: 1.8;
  color: #868686;
}

.cardFooter {
  display: flex;
  align-items: center;
}

.footerName {
  flex: 1;
  padding: 0 2.66667vw;
  font-size: 3.73333vw;
}
</style>
