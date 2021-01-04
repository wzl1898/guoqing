<template>
  <div>
    <layout>
      <!-- 头部组件 -->
      <template slot="header">
        <!-- <ElRow>
          <ElCol :span="24" :offset="20">
            <ElButton type="primary" @click="addlib">
              字典添加
            </ElButton>
          </ElCol>
        </ElRow> -->
        <ElRow :gutter="20">
          <ElCol :span="4">
            <ElInput
              v-model="type"
              placeholder="请输入类型"
            >
              <template slot="prepend">
                类型
              </template>
            </ElInput>
          </ElCol>
          <ElCol :span="4">
            <ElInput
              v-model="description"
              placeholder="请输入描述"
            >
              <template slot="prepend">
                描述
              </template>
            </ElInput>
          </ElCol>
          <ElCol :span="12">
            <ElButton
              type="primary"
              @click="handleSearch"
            >
              查询
            </ElButton>
            <ElButton
              type="primary"
              @click="handleReset"
            >
              清空
            </ElButton>
          </ElCol>
          <ElCol
            :span="4"
            class="elCol"
          >
            <ElButton
              type="primary"
              @click="addlib"
            >
              字典添加
            </ElButton>
          </ElCol>
        </ElRow>
      </template>
      <!-- 表格组件 -->
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
          />
          <ElTableColumn label="类型">
            <template slot-scope="scope">
              {{ scope.row.type }}
            </template>
          </ElTableColumn>
          <ElTableColumn label="描述">
            <template slot-scope="scope">
              {{ scope.row.description }}
            </template>
          </ElTableColumn>
          <ElTableColumn label="排序">
            <template slot-scope="scope">
              {{ scope.row.sort }}
            </template>
          </ElTableColumn>
          <ElTableColumn
            align="center"
            label="操作"
            width="250"
          >
            <template slot-scope="scope">
              <ElTooltip content="添加键值">
                <ElButton
                  size="mini"
                  icon="el-icon-plus"
                  circle
                  @click="addkey(scope.row)"
                />
              </ElTooltip>
              <ElButton
                size="mini"
                icon="el-icon-edit"
                circle
                @click="editlib(scope.row)"
              />
              <ElButton
                size="mini"
                icon="el-icon-delete"
                circle
                type="danger"
                @click="dellib(scope.row)"
              />
            </template>
          </ElTableColumn>

          <!--footer组件-->
        </ElTable>
      </template>

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
import { readdict, deldict } from '@api/table'
export default {
  components: {
    layout
  },
  data () {
    return {
      data: null,
      type: '',
      orderBy: 'create_date desc',
      description: '',
      dataLoading: true,

      pageNo: 1,
      pageSize: 30,
      total: 0,

      columns: [
        {
          label: '键值',
          value: 'value'
        },
        {
          label: '标签',
          value: 'label'
        }
      ]
    }
  },
  computed: {
    params: function () {
      const { pageNo, pageSize, type, description, orderBy } = this
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        type: type,
        description: description,
        orderBy: orderBy
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next((vm) => {
      vm.fetchdata()
    })
  },

  methods: {
    // 数据查询
    fetchdata () {
      readdict(this.params).then((res) => {
        this.data = res.page.list
        this.total = res.page.count

        this.dataLoading = false
      })
    },
    // 时间过滤

    // 改变当前页码
    handleCurrentChange (page) {
      this.pageNo = page
      this.fetchdata()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.pageNo = 1
      this.fetchdata()
    },
    // 搜索事件
    handleSearch () {
      this.fetchdata()
    },
    editlib (row) {
      this.$router.push({
        path: `/dictionaries/editdic/${row.id}`
      })
    },
    addkey (row) {
      this.$router.push({
        path: `/dictionaries/addkey/${row.id}`
      })
    },
    addlib () {
      this.$router.push('/dictionaries/adddic')
    },
    dellib (row) {
      this.$confirm('是否删除当前选项?', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deldict(row.id).then((Response) => {
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
    // 清空搜索框
    handleReset () {
      this.description = ''
      this.type = ''
      this.currentPage = 1
      this.fetchdata()
    }
  }
}
</script>

<style scpoed>
.elCol {
  text-align: right;
}
</style>
