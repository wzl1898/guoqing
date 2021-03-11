<template>
  <BasicInfoCard title="审查意见">
    <el-form
      :model="opinionFormInfo"
      class="review_form"
      size="small"
      label-width="100px"
    >
      <el-form-item
        label="是否合格"
        style="width: calc(45% + 50px);"
        prop="eligibility"
      >
        <el-select
          v-model="opinionFormInfo.eligibility"
          class="review_form_item"
          placeholder="请选择"
        >
          <el-option
            label="合格"
            value="1"
          />
          <el-option
            label="不合格"
            value="0"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        label="是否整改"
        style="width: calc(45% + 50px);"
        prop="rectify"
      >
        <el-select
          v-model="opinionFormInfo.rectify"
          class="review_form_item"
        >
          <el-option
            label="是，需要整改"
            value="1"
          />
          <el-option
            label="否，不需要整改"
            value="0"
          />
        </el-select>
      </el-form-item>
      <el-form-item
        v-if="opinionFormInfo.eligibility === '0'"
        label="不合格原因"
        prop="eligibilityReason"
        style="width: 100%;"
      >
        <el-input
          v-model="opinionFormInfo.eligibilityReason"
          class="review_form_item"
          type="textarea"
          :rows="5"
          placeholder="请输入不合格原因"
          resize="none"
        />
      </el-form-item>
      <template v-if="opinionFormInfo.rectify ==='1'">
        <el-form-item
          v-for="(opinion, index) in opinionFormInfo.rectifyInfo"
          :key="index"
          label="整改意见"
          style="width: 100%;"
        >
          <div style="display: flex; align-items: flex-start;">
            <el-input
              v-model="opinion.value"
              class="review_form_item"
              type="textarea"
              :rows="3"
              placeholder="请输入整改意见"
              resize="none"
            />
            <el-button
              v-if="index === opinionFormInfo.rectifyInfo.length - 1"
              class="review_form_item_btn"
              type="primary"
              circle
              @click="handleClickIncrease"
            >
              +
            </el-button>
            <el-button
              v-if=" opinionFormInfo.rectifyInfo.length > 1"
              class="review_form_item_btn"
              type="danger"
              circle
              @click="handleClickDecrease(index)"
            >
              -
            </el-button>
          </div>
        </el-form-item>
      </template>
    </el-form>
  </BasicInfoCard>
</template>

<script>
import BasicInfoCard from '../../common/BasicInfoCard'

export default {
  name: 'CreateReviewOpinion',
  components: {
    BasicInfoCard
  },
  data () {
    return {
      opinionFormInfo: {
        eligibility: '', // 是否合格
        rectify: '', // 是否整改
        eligibilityReason: '', // 不合格原因
        rectifyInfo: [ // 整改意见
          {
            value: ''
          }
        ]
      }
    }
  },
  methods: {
    /**
     * @event: click
     * 新增一条整改意见
     */
    handleClickIncrease () {
      this.opinionFormInfo.rectifyInfo.push({
        value: ''
      })
    },
    /**
     * @event: click
     * 删除一条整改意见
     * @param {number} index 删除意见的index
     */
    handleClickDecrease (index) {
      this.opinionFormInfo.rectifyInfo.splice(index, 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.review_form {
  display: flex;
  flex-wrap: wrap;

  &_item {
    width: 90%;

    &_btn {
      width: 32px;
      height: 32px;
      margin-left: 10px;
    }
  }
}
</style>
