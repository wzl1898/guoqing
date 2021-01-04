<template>
  <div class="dictionaries-contain">
    <layout>
      <template slot="header" />
      <template slot="table">
        <div class="line" />
        <span>新增字典</span>
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="150px"
        >
          <el-form-item
            label="键值"
            prop="value"
          >
            <el-col :span="6">
              <el-input v-model="ruleForm.value" />
            </el-col>
          </el-form-item>
          <el-form-item
            label="标签"
            prop="label"
          >
            <el-col :span="6">
              <el-input v-model="ruleForm.label" />
            </el-col>
          </el-form-item>

          <el-form-item
            label="类型 "
            prop="type"
          >
            <el-col :span="6">
              <el-input v-model="ruleForm.type" />
            </el-col>
          </el-form-item>
          <el-form-item
            label="描述"
            prop="description"
          >
            <el-col :span="6">
              <el-input v-model="ruleForm.description" />
            </el-col>
          </el-form-item>
          <el-form-item
            label="排序 "
            prop="sort"
          >
            <el-col :span="6">
              <el-input v-model.number="ruleForm.sort" />
            </el-col>
          </el-form-item>
          <el-form-item
            label="备注"
            prop="remarks"
          >
            <el-col :span="6">
              <el-input
                v-model="ruleForm.remarks"
                type="textarea"
                maxlength="100"
                show-word-limit
              />
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button @click="resetForm('ruleForm')">
              取消
            </el-button>
            <el-button
              type="primary"
              @click="submitForm('ruleForm')"
            >
              保存
            </el-button>
          </el-form-item>
        </el-form>
      </template>
    </layout>
  </div>
</template>
<script>
import layout from '@components/layout'
import { createdict } from '@api/table'

export default {
  components: {
    layout
  },
  data () {
    return {
      id: '',
      ruleForm: {
        value: '',
        label: '',
        type: '',
        remarks: '',
        description: '',
        sort: ''
      },
      rules: {
        value: [
          { required: true, message: '请输入健值', trigger: 'blur' },
          {
            min: 1,
            max: 100,
            message: '长度在 2 到 100个字符',
            trigger: 'blur'
          }
        ],
        label: [
          { required: true, message: '请输入标签', trigger: 'blur' },
          {
            min: 2,
            max: 100,
            message: '长度在 2 到 100个字符',
            trigger: 'blur'
          }
        ],
        type: [
          { required: true, message: '请输入类型', trigger: 'blur' },
          {
            min: 2,
            max: 100,
            message: '长度在 2 到 100个字符',
            trigger: 'blur'
          }
        ],
        description: [
          { required: true, message: '请输入描述信息', trigger: 'blur' },
          {
            min: 2,
            max: 100,
            message: '长度在 2 到 100个字符',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            type: 'number',
            required: true,
            message: '请输入数字类型排序',
            trigger: 'blur'
          },
          {
            transform (value) {
              return String(value)
            },
            min: 2,
            max: 10,
            message: '长度在 2 到 10个字符',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    params: function () {
      const { value, label, type, description, sort, remarks } = this.ruleForm
      return {
        value: value,
        label: label,
        type: type,
        remarks: remarks,
        description: description,
        sort: sort
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          createdict(this.params).then((Response) => {})
          this.$router.go(-1)
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
      this.$router.go(-1)
    }
  }
}
</script>

<style lang="scss" scoped>
.line {
  display: inline-block;
  width: 10px;
  height: 20px;
  margin-right: 10px;
  margin-bottom: 100px;
  vertical-align: top;
  background-color: blue;
}

.dictionaries-contain >>> .marginspace {
  height: 5px !important;
}
</style>
