<template>
  <div>
    <layout>
      <!-- 头部插槽 -->
      <template slot="header">
        <ElRow>
          <ElCol
            :span="24"
            :offset="20"
          >
            <ElButton
              type="primary"
              @click="addrole"
            >
              角色添加
            </ElButton>
          </ElCol>
        </ElRow>
      </template>
      <!-- 表格插槽 -->
      <template slot="table">
        <ElTable
          v-loading="dataLoading"
          border
          :data="data"
          stripe
          size="mini"
        >
          <ElTableColumn
            v-for="(column, index) in columns"
            :key="index"
            :prop="column.value"
            header-align="left"
            :label="column.label"
          >
            <template />
          </ElTableColumn>

          <ElTableColumn
            label="操作"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <ElTooltip content="分配角色">
                <ElButton
                  size="mini"
                  icon="el-icon-time"
                  circle
                  @click="assignrole(scope.row)"
                />
              </ElTooltip>
              <ElButton
                size="mini"
                icon="el-icon-edit"
                circle
                @click="editrole(scope.row)"
              />
              <ElButton
                size="mini"
                icon="el-icon-delete"
                circle
                type="danger"
                @click="delrole(scope.row)"
              />
            </template>
          </ElTableColumn>
        </ElTable>
      </template>
      <!-- footer插槽 -->
      <template slot="pagination">
        <ElRow>
          <ElCol :span="24">
            <ElPagination
              background
              prev-text="上一页"
              next-text="下一页"
              :current-page.sync="pageNo"
              :page-sizes="[5, 10, 20, 30, 50]"
              :page-size="pageSize"
              layout="prev, pager, next, sizes, total"
              :total="total"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            />
          </ElCol>
        </ElRow>
      </template>
    </layout>
  </div>
</template>
<script>
import layout from '@components/layout'
import { readrole, delrole } from '@api/table'
export default {
  components: {
    layout
  },

  data () {
    return {
      data: null,
      pageNo: 1,
      pageSize: 10,
      total: 0,
      dataLoading: true,
      columns: [
        {
          label: '角色名称',
          value: 'name'
        },
        {
          label: '英文名称',
          value: 'enname'
        },
        {
          label: '归属机构',
          value: 'office.name'
        },
        {
          label: '数据范围',
          value: 'dataScopeDictionary'
        }
      ]
    }
  },

  computed: {
    params: function () {
      const { pageNo, pageSize } = this
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        orderBy: 'create_date desc'
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.fetchdata()
    })
  },
  methods: {
    // 获取数据
    fetchdata () {
      readrole(this.params).then((res) => {
        // console.log(this.params)
        this.data = res.page.list
        this.total = res.page.count

        this.dataLoading = false
      })
    },
    // 添加角色按钮
    addrole () {
      this.$router.push({
        path: '/role/addrole'
      })
    },
    // 编辑角色按钮
    editrole (row) {
      this.$router.push({
        path: `/role/editrole/${row.id}`
      })
    },
    // 分配角色按钮
    assignrole (row) {
      this.$router.push({
        path: `/role/assignrole/${row.id}`
      })
    },
    // 删除数据
    delrole (row) {
      // delrole(row.id).then((response) => {
      //   this.fetchdata()
      // })
      this.$confirm('是否删除当前选项?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          delrole(row.id).then((Response) => {
            this.fetchdata()
          })
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 翻页
    handleCurrentChange (page) {
      this.pageNo = page
      this.fetchdata()
    },

    handleSizeChange (size) {
      this.pageSize = size
      this.pageNo = 1
      this.fetchdata()
    }
  }
}
</script>
