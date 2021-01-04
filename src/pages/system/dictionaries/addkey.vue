<template>
  <div>
    <layout>
      <template slot="table">
        <el-form
          ref="ruleForm"
          :model="ruleForm"
          :rules="rules"
          label-width="150px"
          class="demo-ruleForm"
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
              <el-input v-model="ruleForm.sort" />
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
import { getdict, createdict } from '@api/table'
export default {
  components: {
    layout
  },
  props: {
    id: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      ruleForm: {
        id: '',
        value: '',
        label: '',
        type: '',
        description: '',
        sort: '',
        remarks: ''
      },
      rules: {
        value: [
          {
            required: true,
            message: '请填写键值',
            trigger: 'blur'
          }
        ],
        label: [
          {
            required: true,
            message: '请填写标签',
            trigger: 'blur'
          }
        ],
        type: [
          {
            required: true,
            message: '请填写类型',
            trigger: 'blur'
          }
        ],
        description: [
          {
            required: true,
            message: '请填写描述信息',
            trigger: 'blur'
          }
        ],
        sort: [
          {
            required: true,
            message: '请填写排序',
            trigger: 'blur'
          }
        ]
      }
    }
  },
  computed: {
    params () {
      const { value, label, type, description, sort, remarks } = this.ruleForm
      return {
        value: value,
        label: label,
        type: type,
        description: description,
        sort: sort,
        remarks: remarks
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    getdict(to.params.id).then((res) => {
      next((vm) => {
        vm.ruleForm = res.item.dictionary
        vm.ruleForm.value = ''
        vm.ruleForm.label = ''
        vm.ruleForm.id = to.params.id
      })
    })
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid, obj) => {
        if (valid) {
          createdict(this.params).then((Response) => {
            this.$router.go(-1)
          })
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
