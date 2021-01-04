<template>
  <div>
    <layout>
      <!-- 头部组件 -->
      <template slot="header">
        <ElRow :gutter="24">
          <ElCol :span="5">
            <ElInput
              v-model="title"
              placeholder="请输入菜单名"
            >
              <template slot="prepend">
                操作菜单
              </template>
            </ElInput>
          </ElCol>
          <ElCol :span="4">
            <ElInput
              v-model="requestUri"
              placeholder="请输入URI"
            >
              <template slot="prepend">
                URI
              </template>
            </ElInput>
          </ElCol>
          <ElCol :span="5">
            <ElInput
              v-model="id"
              placeholder="请输入用户ID"
            >
              <template slot="prepend">
                用户ID
              </template>
            </ElInput>
          </ElCol>
          <ElCol :span="10">
            <ElDatePicker
              v-model="createDate"
              type="daterange"
              value-format="yyyy-MM-dd"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :editable="false"
              width="250px"
            />
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
              @size-change="tableHandleSizeChange"
              @current-change="tableHandleCurrentChange"
            />
          </ElCol>
        </ElRow>
      </template>
    </layout>
  </div>
</template>
<script>
import layout from '@components/layout'
import { readlog } from '@api/table'
export default {
  components: {
    layout
  },
  filters: {
    datefilter (value) {
      return '2222' + value
    }
  },
  data () {
    return {
      data: null,
      createDate: '',
      title: '',
      requestUri: '',
      dataLoading: true,
      id: '',
      pageNo: 1,
      pageSize: this.defaultPageSize,
      total: 0,

      columns: [
        {
          label: '操作菜单',
          value: 'title'
        },
        {
          label: '操作用户',
          value: 'id'
        },
        {
          label: '所在公司',
          value: 'label'
        },
        {
          label: '所在部门',
          value: 'label'
        },
        {
          label: 'URI',
          value: 'requestUri'
        },
        {
          label: '提交方式',
          value: 'method'
        },
        {
          label: '操作者IP',
          value: 'remoteAddr'
        },
        {
          label: '操作时间',
          value: 'createDate'
        }
      ]
    }
  },
  computed: {
    params: function () {
      const { pageNo, pageSize, title, requestUri, createDate, id } = this
      return {
        pageNo: pageNo,
        pageSize: pageSize,
        title: title,
        id: id,
        requestUri: requestUri,
        createDate: createDate
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
      if (this.createDate) {
      }
      readlog(this.params).then((res) => {
        this.data = res.page.list
        this.total = res.page.count

        this.dataLoading = false
      })
    },
    // 改变当前页码
    tableHandleCurrentChange (page) {
      this.pageNo = page
      this.fetchdata()
    },
    // 搜索事件
    handleSearch () {
      this.fetchdata()
    },
    // 清空搜索框
    handleReset () {
      this.requestUri = ''
      this.title = ''
      this.id = ''
      this.createDate = ''
      this.pageNo = 1
      this.fetchdata()
    },
    // 改变每页显示的条数
    tableHandleSizeChange (size) {
      this.pageSize = size
      this.pageNo = 1
      this.fetchdata()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-date-editor--daterange.el-input__inner {
  width: 250px;
}
</style>
