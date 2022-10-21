<template>
<div class="Container">
  <van-nav-bar
      left-text="返回"
      @click-left="$router.push('/home')"
      left-arrow
      title="用证申请"
    />
  <van-overlay :show="show">
    <div class="needContainer">
      <div class="needContainerContent">
        <p class="title">
          行前教育
        </p>
        <div class="text">
          <p class="indent">&nbsp;&nbsp;根据国家和省外办相关规定，为加强我校因公出国（境）教师的政治意识、组织意识和纪律意识，特明确相关纪律要求如下： </p>
          <p class="indent"> 一、请登录中国领事服务网http://cs.mfa.gov.cn,浏览有关注意事项和安全提示，注意了解往访国的安全形势和当地治安状况，如遇突发事件或紧急情况，尽量减少外出或避开人群密集、敏感场所，必要时请报警并寻求中国驻当地使领馆的协助。 </p>
          <p class="indent"> 二、增强大局意识，对外交往中，要忠于使命，认真履责，谨守纪律，切实维护国家以及学校的形象和利益。 </p>
          <p class="indent"> 三、自觉遵守保密法律法规，严守保密纪律。增强安全保密意识，未经批准，不得携带涉密载体（包括纸质文件和电磁介质等)；妥善保管内部材料，未经批准，不得对外提供内部文件和资料（如批件、出国（境）申请表、经费情况表、备案表等）；不在非保密场所谈论涉密事项；不得泄露国家秘密和商业秘密。严禁使用个人电脑、手机或其他非涉密载体处理、存储涉密信息。 </p>
          <p class="indent"> 四、教师出访“在外停留天数”和“出访时间”均有特定的计算方法和严格的规定（根据中办发〔2013〕16号文及省外办规定）。例如，经审批，出访时间：2018年8月1日离境（指中国边检出境章日期）～2018年8月5日回抵境内（指中国边检入境章日期），您选择航班和办理通关手续时，须保证护照（或通行证）上加盖的中国边检出、入境章日期分别为2018-08-01、2018-08-05（注：中国边检出境章日期视作离境日期，中国边检入境章日期视作回抵境内日期；如在京、沪、广、厦等地通关离境或入境通关，离境日期可能不同于离开福州的日期，回抵境内日期也可能不同于回到福州的日期）中国边检出、入境章日期均计入在外停留天数，故此例中，在外停留天数为5天。教师出访严禁超期，即，在外停留天数不得超过批准天数。 </p>
          <p class="indent"> 五、严格按批准的往访国别、地区和在外停留时间（离、抵境当日计入在外停留时间）合理安排行程，不得擅自延长在外停留时间；未经批准不得变更出访路线（特别是境外路线），增加出访国家、地区或城市（包括转机），前往与出访任务无关的国家、地区或城市考察、观光，或以任何理由绕道旅行。经批准，需在第三国（地区）转机的，不可出机场。 </p>
          <p class="indent"> 六、严禁安排与公务活动无关的娱乐活动；对商定的公务活动不得应付敷衍甚至随意取消或压缩；不得参加与访问任务无关的活动或会议。 </p>
          <p class="indent"> 七、严禁出入赌博场所，不得使用任何形式的资金参与赌博活动，不准以任何借口自行或接受接待单位安排前往赌博场所，严禁进行网络赌博。 </p>
          <p class="indent"> 八、严禁出入色情场所和观看色情表演，不得参加涉及低级趣味的娱乐旅游项目。</p>
          <p class="indent"> 九、不得借出访之机谋取私利。 </p>
          <p class="indent"> 十、不得违反囯家规定收送礼品。 </p>
          <p class="indent"> 十一、不得使用公款大吃大喝，聚众酗酒；不得使用公款购买高档消费品、礼品或参加高消费娱乐活动。 </p>
          <p class="indent"> 十二、教师出访应把确保人身生命安全放在第一位，增强防盗、防抢、防诈骗的自我保护意识，如在境外遇到交通和其他意外事故，应立即求助于当地的警察、我驻当地使领馆（或拨打外交部领事保护中心电话：0086-10-12308），或国际救援组织，并尽快向当地外事主管部门报告。在处置突发事件时，如果难以获得其他渠道的援助，可求救于SOS国际组织。 </p>
          <p class="indent"> 十三、增强应急应变意识，注意防范反华敌对势力的干扰、破坏，避免与可疑人员接触，拒收任何可疑信函和物品。不在反华组织活动现场停留、围观。不得随意发表有损国格、人格和不符合国家对外政策的言论。不要随意接受媒体采访。若受到前往国家或地区专门机关的调查或不公正待遇，应保持冷静，遇紧急情况，应及时向派出单位以及我国驻当地使领馆请示报告。 </p>
          <p class="indent"> 十四、在外期间自觉抵制“法轮功”等邪教组织的非法宣传和渗透，不拿各类非法宣传品。要保证严格遵守相关纪律，主动接受我驻外使领馆的领导和监督，遇到突发状况应及时请示报告。 </p>
          <p class="indent"> 十五、建议随身携带邀请函、英文机票订单、英文酒店订单和保单，以备海关查验。 </p>
          <p class="indent"> 十六、增强证照管理意识，切实遵守证照管理的有关规定。交回前请自行扫描、复印证照资料页、签证（注）页及中外方出入境章等，留存备用。 </p>
          <p class="indent"> 十七、保留全程登机牌和电子客票行程单备核。如遇航班延误，请及时向航空公司索要《航班延误证明》（加盖航空公司公章）。 </p>
          <p class="indent"> 十八、教师出访前应知悉并承诺遵守《福州大学关于印发修订后的教职工出国（境）留学管理规定的通知》（福大人〔2019〕74号）、《福州大学关于印发修订后的教职工进修培训管理办法（试行）的通知》（福大人〔2015〕41号）以及出国（境）留学协议书等相关规定。 </p>
        </div>
        <div class="needContainerBtn">
          <van-button class="okBtn" round type="info" size="small" @click="show = false">已阅读并同意(0s)</van-button>
        </div>
      </div>
    </div>
  </van-overlay>
  <van-form @submit="onSubmit">
    <van-cell-group>
      <van-field
        v-model="user.xm"
        name="姓名"
        label="姓名"
        placeholder="姓名"
        required
        :rules="[{ required: true, message: '姓名' }]"
      />

      <!-- <van-cell title="性别">
        <van-radio-group v-model="radio">
          <van-radio name="1">单选框 1</van-radio>
          <van-radio name="2">单选框 2</van-radio>
        </van-radio-group>
      </van-cell> -->
      <van-field name="radio" label="性别"  required>
        <template #input>
          <van-radio-group v-model="user.xbm" direction="horizontal">
            <van-radio name="0">男</van-radio>
            <van-radio name="1">女</van-radio>
          </van-radio-group>
        </template>
      </van-field>
      <van-field
        v-model="user.csrq"
        name="出生日期"
        label="出生日期"
        placeholder="出生日期"
        required
        :rules="[{ required: true, message: '出生日期' }]"
      />
      <van-field
        v-model="user.jgm"
        name="籍贯"
        label="籍贯"
        placeholder="籍贯"
        required
        :rules="[{ required: true, message: '籍贯' }]"
      />
      <van-field
        v-model="user.mzm"
        name="民族"
        label="民族"
        placeholder="民族"
        required
        :rules="[{ required: true, message: '民族' }]"
      />
      <van-field
        v-model="user.zzmmm"
        name="政治面貌"
        label="政治面貌"
        placeholder="政治面貌"
        required
        :rules="[{ required: true, message: '政治面貌' }]"
      />
      <van-field
        v-model="user.zjhm"
        name="身份证号码"
        label="身份证号码"
        placeholder="身份证号码"
        required
        :rules="[{ required: true, message: '身份证号码' }]"
      />
      <van-field
        value="硕士学位"
        name="文化程度"
        label="文化程度"
        placeholder="文化程度"
        required
        :rules="[{ required: true, message: '文化程度' }]"
      />
      <van-field
        v-model="user.sjtszdw"
        name="工作部门"
        label="工作部门"
        placeholder="工作部门"
        required
        :rules="[{ required: true, message: '工作部门' }]"
      />
      <van-field
        v-model="user.dzzwm"
        name="职务"
        label="职务"
        placeholder="职务"
        required
        :rules="[{ required: true, message: '职务' }]"
      />
      <van-field
        value="暂无"
        name="家庭住址"
        label="家庭住址"
        placeholder="家庭住址"
        required
        :rules="[{ required: true, message: '家庭住址' }]"
      />
      <van-field
        value="12312312412"
        name="联系电话"
        label="联系电话"
        placeholder="联系电话"
        required
        :rules="[{ required: true, message: '联系电话' }]"
      />
      <van-field
        value="暂无"
        name="紧急联系人"
        label="紧急联系人"
        placeholder="紧急联系人"
        required
        :rules="[{ required: true, message: '紧急联系人' }]"
      />
      <van-field
        v-model="username"
        name="紧急联系电话"
        label="紧急联系电话"
        placeholder="紧急联系电话"
        required
        :rules="[{ required: true, message: '紧急联系电话' }]"
      />
      <van-field
        readonly
        clickable
        label="选择证件"
        required
        :value="value"
        placeholder="选择证件"
        @click="showPicker = true"
      />
      <van-popup v-model="showPicker" round position="bottom">
        <van-picker
          show-toolbar
          :columns="columns"
          @cancel="showPicker = false"
          @confirm="showPicker = false"
        />
      </van-popup>
      <div style="margin: 16px;">
        <van-button class="submit" round block type="info" native-type="submit" @click="$router.go(-1)">提交</van-button>
      </div>
    </van-cell-group>
  </van-form>

</div>
</template>

<script>
import {mapState} from 'vuex';
export default {
  name: "Apply",
  data(){
    return {
      show: true,
      value: '',
      showPicker: false,
      columns: ['杭州', '宁波', '温州', '绍兴', '湖州', '嘉兴', '金华', '衢州'],
    }
  },
  computed: {
    ...mapState(['user']),
  }
}
</script>

<style scoped>
.needContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: calc(var(--vh, 1vh) * 100);
}

.needContainerContent {
  padding: 4vw;
  margin: 0 4vw;
  background-color: #fff;
  border-radius: 5.33333vw;
}

.title {
  font-size: 4.53333vw;
  font-weight: 500;
  line-height: 1.6;
  text-align: center;
}

.text {
  height: 60vh;
  margin: 4vw 0;
  overflow: auto;
  font-size: 3.46667vw;
  line-height: 1.4;
}

.indent {
  text-indent: 2em;
}

.needContainerBtn {
  text-align: center;
}

.okBtn {
  color: #fff;
  background-color: #b13a3d;
  border: 1px solid #b13a3d;
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

.submit {
  background: #b13a3d;
  border: #b13a3d;
}
</style>
