<script>
import { getInstitutional, deleteInstitutional } from '@api/institutional'
import layout from '@components/layout'
import { loadingModel } from '@utils/modelFunc'

export default {
  page: {
    title: '机构管理',
    meta: [{ name: 'Institutional' }]
  },
  components: {
    layout
  },
  data () {
    return {
      /*
      tableData: [
        {
          code: 1, // id用于控制子集
          OrganizationName: '实达迪美总公司', // 机构名称
          AttributionArea: '福建省', // 归属区域
          OrganizationCoding: '100000', // 机构编码
          OrganizationType: '公司', // 机构类型
          describe: '', // 备注
          children: [
            {
              code: 11, // id用于控制子集
              OrganizationName: '实达迪美分公司', // 机构名称
              AttributionArea: '福州市', // 归属区域
              OrganizationCoding: '100001', // 机构编码
              OrganizationType: '公司', // 机构类型
              describe: '', // 备注
              children: [
                {
                  code: 111, // id用于控制子集
                  OrganizationName: '外包中心合作公司', // 机构名称
                  AttributionArea: '福州市', // 归属区域
                  OrganizationCoding: '100001003', // 机构编码
                  OrganizationType: '部门', // 机构类型
                  describe: '', // 备注
                  children: [
                    {
                      code: 1111, // id用于控制子集
                      OrganizationName: '普通员工部', // 机构名称
                      AttributionArea: '鼓楼区', // 归属区域
                      OrganizationCoding: '', // 机构编码
                      OrganizationType: '小组', // 机构类型
                      describe: '', // 备注
                    },
                    {
                      code: 1112, // id用于控制子集
                      OrganizationName: '综合部', // 机构名称
                      AttributionArea: '福建省', // 归属区域
                      OrganizationCoding: '100002', // 机构编码
                      OrganizationType: '部门', // 机构类型
                      describe: '', // 备注
                    },
                  ],
                },
                {
                  code: 112, // id用于控制子集
                  OrganizationName: '运营部', // 机构名称
                  AttributionArea: '福建省', // 归属区域
                  OrganizationCoding: '100003', // 机构编码
                  OrganizationType: '部门', // 机构类型
                  describe: '', // 备注
                  children: [
                    {
                      code: 1121, // id用于控制子集
                      OrganizationName: '配套', // 机构名称
                      AttributionArea: '福州市', // 归属区域
                      OrganizationCoding: '100003001', // 机构编码
                      OrganizationType: '部门', // 机构类型
                      describe: '', // 备注
                    },
                  ],
                },
              ],
            },
            {
              code: 12, // id用于控制子集
              OrganizationName: '技术部', // 机构名称
              AttributionArea: '福建省', // 归属区域
              OrganizationCoding: '100004', // 机构编码
              OrganizationType: '部门', // 机构类型
              describe: '', // 备注
            },
            {
              code: 13, // id用于控制子集
              OrganizationName: '研发部', // 机构名称
              AttributionArea: '福建省', // 归属区域
              OrganizationCoding: '100005', // 机构编码
              OrganizationType: '部门', // 机构类型
              describe: '', // 备注
            },
          ],
        },
      ],
      */
      dataTable: [],
      loading: false,
      dataTableAll: null
    }
  },
  mounted () {
    // getDateTime() 获取当前时间
    this.getMenuTree()
  },
  methods: {
    /**
     * @request
     * 获取机构管理列表
     */
    async getMenuTree () {
      try {
        this.loading = true
        const { item } = await getInstitutional()
        this.dataTable = [item.officeTree]
      } finally {
        this.loading = false
      }
    },
    goToUpdata (row) {
      this.$router.push(`/institutional/updata/${row.id}`)
    },
    async delInstitutional (row) {
      if (row.id !== 1 && row.id !== '1') {
        let loading
        try {
          await this.$confirm('此操作将永久删除该机构, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          })
          loading = loadingModel(this)
          await deleteInstitutional(row.id)
          await this.getMenuTree()
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        } catch {
        } finally {
          loading.close()
        }
      } else {
        this.$alert('请勿删除根节点', '注意:', {
          confirmButtonText: '确定'
        })
      }
    }
  }
}
</script>

<template>
  <layout>
    <el-header slot="eldHeader">
      <h5>机构管理</h5>
    </el-header>
    <!-- 头部 -->
    <template slot="header">
      <el-header class="el_header">
        <el-row class="elRow">
          <el-button
            type="primary"
            @click="$router.push(`/institutional/add`)"
          >
            机构添加
          </el-button>
        </el-row>
      </el-header>
    </template>

    <!-- 树形表格 -->
    <template slot="table">
      <el-table
        v-loading="loading"
        size="mini"
        :data="dataTable"
        row-key="id"
        :indent="24"
        border
        height="calc(100vh - 220px)"
        default-expand-all
        :tree-props="{ children: 'childList' }"
      >
        <el-table-column
          prop="name"
          label="机构名称"
          min-width="170px"
          show-overflow-tooltip
        />

        <el-table-column
          prop="area.name"
          label="归属区域"
          width="180"
          align="center"
          min-width="170px"
        />

        <el-table-column
          prop="code"
          label="机构编码"
          align="center"
          min-width="170px"
        />

        <el-table-column
          prop="typeDictionary"
          label="机构类型"
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
              @click="delInstitutional(scope.row)"
            />
            <el-button
              size="mini"
              icon="el-icon-plus"
              circle
              @click="
                $router.push(`/institutional/add?parentId=${scope.row.id}`)
              "
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
