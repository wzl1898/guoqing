<script>
import treeFilter from '@components/TreeSelect'
import { getRegion, getRegionType, addRegion } from '@api/institutional'

import { loadingModel } from '@utils/modelFunc'

export default {
  components: { treeFilter },
  page: {
    title: '添加区域',
    meta: [{ name: 'regionadd' }]
  },
  data () {
    return {
      ruleForm: {
        code: '',
        name: '',
        parentId: '',
        remarks: '',
        sort: null,
        type: ''
      },
      rules: {
        code: [
          {
            pattern: /^[0-9]+$/,
            message: '区域编码只能是数字',
            trigger: ['blur', 'change']
          }
        ],
        parentId: [
          { required: true, message: '请选择上级区域', trigger: 'change' }
        ],
        name: [
          { required: true, message: '请输区域名称', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 1 到 100 个字符',
            trigger: 'blur'
          }
        ]
      },
      AreaData: [],
      OrganizationTypeData: []
    }
  },
  computed: {
    params: function () {
      const { code, name, parentId, remarks, sort, type } = this.ruleForm
      return {
        code,
        name,
        parentId,
        remarks,
        sort,
        type
      }
    }
  },
  mounted () {
    const loading = loadingModel(this)
    getRegion()
      .then((data) => {
        var oldData = [data.item.areaTree]
        function setName (obj) {
          for (var i in obj) {
            obj[i].label = obj[i].name
            obj[i].children = obj[i].childList
            if (obj[i].childList) {
              setName(obj[i].childList)
            }
          }
          return obj
        }
        setName(oldData)
        this.AreaData = setName(oldData)
      })
      .finally(() => {
        loading.close()
      })
    getRegionType('area_type').then((data) => {
      this.OrganizationTypeData = data.page.list
    })
    this.ruleForm.parentId = this.$route.query.parentId
  },
  methods: {
    async submitForm (formName) {
      try {
        await this.$refs[formName].validate()
        const regionForm = { ...this.params }
        // TODO 属性值 为空时传null
        const keys = Object.keys(regionForm)
        keys.forEach((e) => {
          if (!regionForm[e]) {
            // delete userForm[e]
            regionForm[e] = null
          }
        })
        const loading = loadingModel(this)
        await addRegion(regionForm).finally(() => {
          loading.close()
        })
        this.$message.success('添加成功')
        this.$router.go(-1)
      } catch {}
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    },
    getAttributionArea (data) {
      this.ruleForm.attributionArea = data
    },
    getPrincipal (data) {
      this.ruleForm.principal = data
    },
    getVicePrincipal (data) {
      this.ruleForm.vicePrincipal = data
    }
  }
}
</script>

<template>
  <el-container>
    <el-header>
      <h3>添加区域</h3>
    </el-header>

    <el-main>
      <el-form
        ref="ruleForm"
        :rules="rules"
        :model="ruleForm"
        label-width="100px"
      >
        <el-form-item
          ref="treeFilter"
          style="width: 50%;"
          label="上级区域"
          prop="parentId"
        >
          <tree-filter
            v-model="ruleForm.parentId"
            style="display: inline-block; width: 75%;"
            :data="AreaData"
            @treeFilterEmit="getAttributionArea"
          />
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="区域名称"
          prop="name"
        >
          <el-col :span="18">
            <el-input
              v-model="ruleForm.name"
              :maxlength="100"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="区域编码"
          prop="code"
        >
          <el-col :span="18">
            <el-input
              v-model="ruleForm.code"
              :maxlength="100"
              type="tel"
              onkeypress="return( /[\d]/.test(String.fromCharCode(event.keyCode)))"
            />
          </el-col>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="区域类型"
          prop="type"
        >
          <el-select
            v-model="ruleForm.type"
            style="width: 75%;"
            placeholder="请选择"
          >
            <el-option
              v-for="(item, index) in OrganizationTypeData"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>

        <el-form-item
          style="width: 50%;"
          label="备注"
          prop="remarks"
        >
          <el-col :span="18">
            <el-input
              v-model="ruleForm.remarks"
              :maxlength="255"
              type="textarea"
              :rows="2"
              placeholder="请输入内容"
            />
          </el-col>
        </el-form-item>

        <el-form-item style="width: 50%;">
          <el-button
            type="primary"
            @click="submitForm('ruleForm')"
          >
            立即创建
          </el-button>
          <el-button @click="resetForm('ruleForm')">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
