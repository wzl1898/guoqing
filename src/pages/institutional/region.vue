<script>
import layout from '@components/layout'
import { getRegion, deleteRegion } from '@api/institutional'
import { loadingModel } from '@utils/modelFunc'
export default {
  components: {
    layout
  },
  data () {
    return {
      tableData: [],
      loading: false
    }
  },
  mounted () {
    this.obtainAreaInfoList()
  },
  methods: {
    // goToAdd(row) {
    //   this.$router.push(`/region/add?parentId=${row.id}`)
    // },
    goToUpdata (row) {
      this.$router.push(`/region/updata/${row.id}`)
    },
    async delRegion (row) {
      if (row.id !== 1 && row.id !== '1') {
        try {
          await this.$confirm('此操作将永久删除该区域, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          const loading = loadingModel(this)
          await deleteRegion(row.id).finally(() => {
            loading.close()
          })
          this.obtainAreaInfoList()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } catch {}
      } else {
        this.$alert('请勿删除根节点', '注意:', {
          confirmButtonText: '确定'
        })
      }
    },
    /**
     * @request
     * 获取区域信息列表
     */
    async obtainAreaInfoList () {
      try {
        this.loading = true
        const { item } = await getRegion()
        this.tableData = [item.areaTree]
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<template>
  <layout>
    <el-header class="eldHeader">
      <h5>区域管理</h5>
    </el-header>

    <!-- 头部 -->
    <template slot="header">
      <el-header class="el_header">
        <el-row class="elRow">
          <el-col>
            <el-button
              type="primary"
              @click="$router.push(`/region/add`)"
            >
              区域添加
            </el-button>
          </el-col>
        </el-row>
      </el-header>
    </template>

    <!-- 树形表格 -->
    <template slot="table">
      <el-table
        v-loading="loading"
        :data="tableData"
        size="mini"
        row-key="id"
        border
        :indent="24"
        height="calc(100vh - 220px)"
        default-expand-all
        :tree-props="{ children: 'childList' }"
      >
        <el-table-column
          prop="name"
          label="区域名称"
          min-width="170px"
          show-overflow-tooltip
        />

        <el-table-column
          prop="code"
          label="区域编码"
          width="180"
          align="center"
        />

        <el-table-column
          prop="typeDictionary"
          label="区域类型"
          align="center"
          min-width="170px"
        />

        <el-table-column
          prop="remarks"
          label="备注"
          align="center"
          show-overflow-tooltip
          min-width="170px"
        />

        <el-table-column
          label="操作"
          align="center"
          min-width="170px"
        >
          <template slot-scope="scope">
            <el-button
              size="mini"
              icon="el-icon-edit"
              circle
              @click="goToUpdata(scope.row)"
            />
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="delRegion(scope.row)"
            />
            <el-button
              size="mini"
              icon="el-icon-plus"
              circle
              @click="$router.push(`/region/add?parentId=${scope.row.id}`)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
  </layout>
</template>

<style lang="scss" scoped>
@import '@customStyle';

.el_header {
  height: auto !important;
}

.elRow {
  text-align: right;
}

.eldHeader {
  height: 40px !important;
  padding: 0;
  background: $tint-color-background-header;

  > h5 {
    margin: 0 20px;
    line-height: 40px;
  }
}

.elMain {
  padding-top: 0;
}
</style>
