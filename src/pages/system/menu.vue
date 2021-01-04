<script>
import { getMenuTreeTable, deleteMenu } from '@api/system'
import layout from '@components/layout'
export default {
  page: {
    title: '菜单管理',
    meta: [{ name: 'Menucontrol' }]
  },
  components: {
    layout
  },
  data () {
    return {
      tableData: []
    }
  },
  mounted () {
    getMenuTreeTable().then((data) => {
      this.tableData = data.item.menuTree.childList
    })
  },
  methods: {
    goToUpdata (row) {
      const tempList = row.parentIds.split(',')
      let isTwo = false
      if (tempList.length === 4) {
        isTwo = true
      }
      this.$router.push({
        path: `/menu/updata/${row.id}`,
        query: {
          isTwo
        }
      })
    },
    clickDeleteMenu (row) {
      this.$confirm('此操作将永久删除该菜单项, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          deleteMenu(row.id).then((Response) => {
            this.tableData = []
            getMenuTreeTable().then((data) => {
              this.tableData.push(data.item.menuTree)
            })
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    }
  }
}
</script>

<template>
  <layout>
    <!-- <el-header class="eldHeader">
      <h5>菜单管理</h5>
    </el-header> -->

    <!-- 头部 -->
    <template slot="header">
      <el-header class="el_header">
        <el-row class="elRow">
          <el-col>
            <el-button
              type="primary"
              @click="$router.push(`/menu/add`)"
            >
              菜单添加
            </el-button>
          </el-col>
        </el-row>
      </el-header>
    </template>

    <!-- 树形表格 -->
    <template slot="table">
      <el-table
        class="elTable"
        :data="tableData"
        size="mini"
        row-key="id"
        border
        :indent="24"
        :tree-props="{ children: 'childList' }"
        :expand-row-keys="['511634537501227067', '2536050909926844723']"
      >
        <el-table-column
          prop="name"
          label="名称"
          min-width="250px"
        />

        <el-table-column
          prop="href"
          label="链接"
          width="180"
          align="center"
          min-width="170px"
        />

        <el-table-column
          prop="vueRoute"
          label="vue路由"
          align="center"
          min-width="170px"
        />

        <el-table-column
          prop="sort"
          label="排序"
          align="center"
          min-width="170px"
        />

        <el-table-column
          prop="isShowDictionary"
          label="可见"
          align="center"
          min-width="170px"
        />

        <el-table-column
          prop="permission"
          label="权限标识"
          align="center"
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
              @click="clickDeleteMenu(scope.row)"
            />
            <el-button
              size="mini"
              icon="el-icon-plus"
              circle
              @click="$router.push(`/menu/add?parentId=${scope.row.id}`)"
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

.elTable {
  width: 100%;
  margin-bottom: 20px;
}

.elMain {
  padding-top: 0;
}
</style>
