<template>
  <div class="Container">
    <van-nav-bar
      left-text="返回"
      @click-left="$router.go(-1)"
      left-arrow
      title="审批详情"
    />
    <div class="headerContainer">
      <p class="headerContainerTitle"> {{item.ApprovalFormList.leader}}提交的用证申请 </p>
      <p class="headerContainerTip"> 等待我处理 </p>
    </div>
    <ul class="content">
      <li class="item">
        <p class="itemTitle"> 姓名 </p>
        <p class="itemText"> {{item.ApprovalFormList.leader}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 性别 </p>
        <p class="itemText"> {{item.ApprovalFormList.sex === 0 ? '男':'女'}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 出生日期 </p>
        <p class="itemText"> {{item.ApprovalFormList.birthDate}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 籍贯 </p>
        <p class="itemText"> {{item.ApprovalFormList.birthPlace}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 民族 </p>
        <p class="itemText"> {{item.ApprovalFormList.nation}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 政治面貌 </p>
        <p class="itemText"> {{item.ApprovalFormList.politicsStatus}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 身份证号码 </p>
        <p class="itemText">  {{item.ApprovalFormList.idCard}}  </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 文化程度 </p>
        <p class="itemText"> {{item.ApprovalFormList.education}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 工作部门 </p>
        <p class="itemText"> {{item.ApprovalFormList.department}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 职务 </p>
        <p class="itemText"> {{item.ApprovalFormList.job}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 家庭住址 </p>
        <p class="itemText"> {{item.ApprovalFormList.address}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 联系电话 </p>
        <p class="itemText"> {{item.ApprovalFormList.tellphone}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 应急联系人 </p>
        <p class="itemText">  </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 联系电话 </p>
        <p class="itemText"></p>
      </li>
      <li class="item">
        <p class="itemTitle"> 证件名称 </p>
        <p class="itemText"> {{item.ApprovalFormList.certificate}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 出发时间 </p>
        <p class="itemText"> {{item.ApprovalFormList.startTime}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 回程时间 </p>
        <p class="itemText"> {{item.ApprovalFormList.endTime}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 目的地 </p>
        <p class="itemText"> {{item.ApprovalFormList.destination}} </p>
      </li>
      <li class="item">
        <p class="itemTitle"> 使用事由 </p>
        <p class="itemText"> {{item.ApprovalFormList.reason}} </p>
      </li>
    </ul>

    <div class="infoContainer">
      <p class="infoContainerTitle">流程</p>
      <div class="itemContainer">
        <div class="itemContainerLeft">
          <div class="itemContainerLeftIcon">
            <van-tag type="primary" size="large">
              {{item.ApprovalFormList.leader[0]}}
              <van-icon name="success" />
            </van-tag>
          </div>
        </div>
        <div class="itemContainerRight">
          <div class="rightHeader">
            <div class="headerTitle">发起申请</div>
            <div class="headerTime"> {{item.ApprovalFormList.applyBegin}} </div>
          </div>
          <p class="name"> {{item.ApprovalFormList.leader}} </p>
        </div>

      </div>
      <div class="itemContainer" v-for="(proc,idx) in item.ApprovalFormList.approvalProcessList.slice(1)" :key="idx">
        <div class="itemContainerLeft">
          <div class="leftLine"></div>
          <div class="itemContainerLeftIcon">
            <van-tag type="primary" size="large">
              {{proc.approval[0]}}
              <van-icon name="success" />
            </van-tag>
          </div>
        </div>
        <div class="itemContainerRight">
          <div class="rightHeader">
            <div class="headerTitle">{{proc.currentOrganization}}</div>
            <div class="headerTime"> {{proc.updateDate}} </div>
          </div>
          <p class="name"> {{proc.approval}} </p>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import {getData} from '@/api/approveProcess.js';
export default {
  name: "ApproveProcess",
  data(){
    return {
      item: {}
    }
  },
  created(){
    getData(this.$route.params.id).then(
      res => {
        this.item = res.item;
      }
    )
  }
}
</script>

<style scoped>
.Container {
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

.headerContainer {
  padding: 2.66667vw 4vw;
  background-color: #fff;
}

.headerContainerTitle {
  display: flex;
  align-items: center;
  font-size: 4.8vw;
  line-height: 1.6;
}

.headerContainerTip {
  font-size: 3.2vw;
  line-height: 1.6;
  color: #ff976a;
}

.content {
  padding: 4vw 4vw 1.33333vw;
  margin: 4vw 2.66667vw;
  background-color: #fff;
  border-radius: 2.66667vw;
}

.item {
  margin-bottom: 2.66667vw;
  line-height: 1.6;
}

.itemTitle {
  font-size: 3.2vw;
  color: #868686;
}

.itemText {
  font-size: 4vw;
}

.infoContainer {
  padding: 4vw;
  margin: 4vw 2.66667vw;
  background-color: #fff;
  border-radius: 2.66667vw;
}

.infoContainerTitle {
  margin-bottom: 4vw;
  font-size: 4vw;
  font-weight: 500;
}

.itemContainer {
  display: flex;
  align-items: flex-end;
}

.itemContainerLeft {
  display: flex;
  flex-direction: column;
}

.leftLine {
  height: 8vw;
  margin: 1.33333vw auto;
  border-style: solid;
  border-left: 0.66667vw solid #ccc;
}

.van-tag {
  width: 5vw;
  height: 8vw;
}

.itemContainerRight {
  flex: 1;
  padding-left: 4vw;
}

.rightHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 2.93333vw;
}

.headerTitle {
  font-size: 3.73333vw;
}

.headerTime {
  font-size: 2.93333vw;
  color: #868686;
}

.name {
  font-size: 3.2vw;
  color: #868686;
}
</style>
