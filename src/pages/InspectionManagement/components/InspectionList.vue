<template>
  <div class="inspection_table">
    <el-table
      :data="inspectionList"
      stripe
      height="calc(100vh - 305px)"
    >
      <template #empty>
        <Empty />
      </template>
      <el-table-column
        label="任务类型"
        width="80px"
        prop="type"
      />
      <el-table-column
        label="企业名称"
        show-overflow-tooltip
        prop="companyName"
      />
      <el-table-column
        label="污染区"
        show-overflow-tooltip
        prop="pollution"
      />
      <el-table-column
        label="巡查人"
        width="80px"
        prop="inspector"
      />
      <el-table-column
        label="任务发起时间"
        width="120px"
        prop="createDate"
      />
      <el-table-column
        label="完成巡查时间"
        width="120px"
        prop="finishDate"
      />
      <el-table-column
        label="审查专家"
        width="80px"
        prop="expert"
      />
      <el-table-column
        label="状态"
        width="80px"
        prop="state"
      />
      <el-table-column
        label="操作"
        width="300px"
      >
        <template #default="{row}">
          <el-button
            type="text"
            @click="handleClickView(row)"
          >
            查看
          </el-button>
          <el-button type="text">
            指派
          </el-button>
          <!--//TODO 根据状态， 当状态为不合格时， 切换按钮文字为重新提交  -->
          <el-button type="text">
            提交
          </el-button>
          <el-button type="text">
            流转记录
          </el-button>
          <el-button type="text">
            异常关闭
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="inspection_table_pagination">
      <el-pagination
        background
        small
        hide-on-single-page
        :current-page="currentPage"
        :page-size="pageSize"
        layout="prev, pager, next"
        :total="total"
        @current-change="handleCurrentChange"
      />
    </div>
  </div>
</template>

<script>
import Empty from '@components/_empty'

export default {
  name: 'InspectionList',
  components: {
    Empty
  },
  data () {
    return {
      inspectionList: [{
        type: '文本资料',
        companyName: '企业',
        pollution: '污染区',
        inspector: '巡查人',
        createDate: '2021-01-22',
        finishDate: '2021-02-01',
        expert: '专家',
        state: '状态'
      }, {
        type: '文本资料',
        companyName: '企业',
        pollution: '污染区',
        inspector: '巡查人',
        createDate: '2021-01-22',
        finishDate: '2021-02-01',
        expert: '专家',
        state: '状态'
      }, {
        type: '文本资料',
        companyName: '企业',
        pollution: '污染区',
        inspector: '巡查人',
        createDate: '2021-01-22',
        finishDate: '2021-02-01',
        expert: '专家',
        state: '状态'
      }, {
        type: '文本资料',
        companyName: '企业',
        pollution: '污染区',
        inspector: '巡查人',
        createDate: '2021-01-22',
        finishDate: '2021-02-01',
        expert: '专家',
        state: '状态'
      }, {
        type: '文本资料',
        companyName: '企业',
        pollution: '污染区',
        inspector: '巡查人',
        createDate: '2021-01-22',
        finishDate: '2021-02-01',
        expert: '专家',
        state: '状态'
      }],
      currentPage: 1,
      pageSize: 20,
      total: 10
    }
  },
  methods: {
    /**
     * @event: current-change
     * 改变页码
     */
    handleCurrentChange (page) {
      this.currentPage = page
    },
    /**
     * @event: click
     * 点击查看
     * @param {object} rowInfo 表格行的数据
     */
    handleClickView (rowInfo) {
      this.$router.push({
        path: '/inspection/list/12224'
      })
    }
  }
}
</script>

<style scoped lang="scss">
.inspection_table {
  &_pagination {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-top: 20px;
  }
}
</style>
