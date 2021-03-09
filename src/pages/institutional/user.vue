<template>
  <div>
    <layout>
      <!-- 头部插槽 -->
      <template slot="header">
        <!-- <ElRow>
          <ElCol :span="24" :offset="20">
            <ElButton type="primary" @click="toadd">
              用户添加
            </ElButton>
          </ElCol>
        </ElRow> -->

        <ElRow :gutter="20">
          <ElCol :span="4">
            <ElInput
              v-model="inputLoginName"
              size="small"
              clearable
              placeholder="请输入登录名"
            >
              <template slot="prepend">
                登录名
              </template>
            </ElInput>
          </ElCol>
          <ElCol :span="4">
            <ElInput
              v-model="inputName"
              size="small"
              clearable
              placeholder="请输入姓名"
            >
              <template slot="prepend">
                姓名
              </template>
            </ElInput>
          </ElCol>
          <ElCol :span="12">
            <ElButton
              :loading="dataLoading"
              size="small"
              type="primary"
              @click="handleSearch"
            >
              查询
            </ElButton>
            <ElButton
              :loading="dataLoading"
              size="small"
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
              size="small"
              type="primary"
              @click="toadd"
            >
              用户添加
            </ElButton>
          </ElCol>
        </ElRow>
      </template>
      <!-- 表格插槽 -->
      <template slot="table">
        <ElTable
          v-loading="dataLoading"
          style="max-height: calc(100vh - 285px); overflow-y: auto;"
          border
          :data="data"
          stripe
          size="mini"
        >
          <ElTableColumn
            v-for="(column, index) in columns"
            :key="index"
            :prop="column.value"
            show-overflow-tooltip
            header-align="left"
            :label="column.label"
          />
          <ElTableColumn
            label="操作"
            align="center"
            width="200"
          >
            <template slot-scope="scope">
              <ElButton
                size="mini"
                icon="el-icon-edit"
                circle
                style="margin-right: 10px;"
                @click="editpage(scope.row)"
              />
              <ElButton
                size="mini"
                icon="el-icon-delete"
                circle
                type="danger"
                @click="deldata(scope.row)"
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
import { readUser, deluser } from '@api/table'
import { loadingModel } from '@utils/modelFunc'
export default {
  components: {
    layout
  },
  data () {
    return {
      visible: false,
      data: [],
      dataLoading: false,
      inputLoginName: '',
      inputName: '',
      pageNo: 1,
      orderBy: 'create_date desc',
      pageSize: 10,
      total: 0,
      columns: [
        {
          label: '归属公司',
          value: 'company.name'
        },
        {
          label: '归属部门',
          value: 'office.name'
        },
        {
          label: '登录名',
          value: 'loginName'
        },
        {
          label: '姓名',
          value: 'name'
        },

        {
          label: '电话',
          value: 'phone'
        },
        {
          label: '手机',
          value: 'mobile'
        }
      ]
    }
  },
  computed: {
    params: function () {
      const { pageNo, pageSize, inputLoginName, inputName, orderBy } = this
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        loginName: inputLoginName,
        name: inputName,
        orderBy: orderBy
      }
    }
  },
  // beforeRouteEnter(to, from, next) {
  //   next((vm) => {
  //     vm.fetchdata()
  //   })
  // },
  created () {
    this.getInfo()
  },
  mounted () {
    this.fetchdata()
  },
  methods: {
    cancelInput (id) {
      this.$refs[id].doClose()
    },

    fetchdata () {
      this.dataLoading = true
      readUser(this.params).then((res) => {
        this.data = res.page.list
        this.total = res.page.count
        this.dataLoading = false
      })
    },
    handleCurrentChange (page) {
      this.pageNo = page
      this.fetchdata()
    },
    handleSizeChange (size) {
      this.pageSize = size
      this.pageNo = 1
      this.fetchdata()
    },
    handleReset () {
      this.inputLoginName = ''
      this.inputName = ''
      this.pageNo = 1
      this.fetchdata()
    },
    editpage (row) {
      this.saveInfo()
      this.$router.push({
        path: `/user/editpage/${row.id}`
      })
    },
    toadd () {
      this.saveInfo()
      this.$router.push('/user/add')
    },
    async deldata (row) {
      try {
        await this.$confirm('是否删除当前选项?', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const loading = loadingModel(this)
        await deluser(row.id).finally(() => {
          loading.close()
        })
        this.fetchdata()
        this.$refs[row.id].doClose()
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch {}
    },
    handleSearch () {
      this.fetchdata()
    },
    // 将搜索信息保存到SessionStorage
    saveInfo () {
      const data = {
        pageSize: this.pageSize,
        pageNo: this.pageNo,
        inputLoginName: this.inputLoginName,
        inputName: this.inputName,
        from: 'user'
      }
      sessionStorage.setItem('pageInfo', JSON.stringify(data))
    },
    // 获取sessionStorage的值
    getInfo () {
      const data = JSON.parse(sessionStorage.getItem('pageInfo'))
      if (data && data.from === 'user') {
        this.pageNo = data.pageNo
        this.pageSize = data.pageSize
        this.inputLoginName = data.inputLoginName
        this.inputName = data.inputName
      }
      sessionStorage.removeItem('pageInfo') // 读取完移除sessionStor
    }
  }
}
</script>

<style scoped>
.elCol {
  text-align: right;
}
</style>
