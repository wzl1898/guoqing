<template>
<div class="Container">
  <van-nav-bar
    left-text="返回"
    @click-left="$router.go(-1)"
    left-arrow
    title="我的消息"
  />
  <div class="messageContainer">
    <div class="content">
      <div v-for="(item, idx) in items" :class="{'openItem': item.open == 1, 'contentItem':true}"  :key="idx" @click="change(idx)">
        <div class="itemHeader">
          <p class="itemHeaderTitle"> 过期提醒 </p>
          <p class="isRead"> {{item.mark == 1 ? '已读' : '未读'}} </p>
        </div>
        <div class="itemTime"> {{item.createDate}} </div>
        <div class="itemContent"> {{item.message}} </div>
        <div class="itemBtn"> 收起 </div>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import {getData} from '@/api/message.js';
export default {
  name: "Message",
  data() {
    return {
      items: [],
    }
  },
  methods: {
    change(idx){
      if(this.items[idx].hasOwnProperty('open') === false || this.items[idx].open === 0){
        this.items[idx].open = 1;
      }else{
        this.items[idx].open = 0;
      }
    }
  },
  created(){
    getData().then(
      res => {
        this.items = res.page.list;
        for (let idx in this.items)
        {
          this.$set(this.items[idx], "open", 0);
        }
      }
    )
  }
}
</script>

<style scoped>
.Container {
  height: 100%;
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

.messageContainer {
  height: calc(var(--vh, 1vh) * 100 - 12.26667vw);
  padding: 0 4vw;
  overflow: hidden;
  background-color: #f4f4f4;
}

.content {
  padding: 4vw 0;
}

.contentItem {
  height: 15.2vw;
  padding: 4vw 4vw 0;
  margin-bottom: 4vw;
  overflow: hidden;
  background-color: #fff;
  border-radius: 1.33333vw;
}

.itemHeader {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 4vw;
}

.itemHeaderTitle {
  font-size: 4vw;
  font-weight: 700;
  color: #282828;
}

.isRead {
  font-size: 2.93333vw;
  color: #666;
}

.itemTime {
  padding-bottom: 4vw;
  font-size: 2.93333vw;
  color: #868686;
  text-align: right;
}

.itemContent {
  padding-bottom: 4vw;
  font-size: 2.93333vw;
  line-height: 1.8;
  text-indent: 2em;
}

.itemBtn {
  font-size: 3.2vw;
  line-height: 12vw;
  color: #868686;
  text-align: center;
  border-top: 1px solid #ccc;
}

.openItem {
  height: auto;
}
</style>
