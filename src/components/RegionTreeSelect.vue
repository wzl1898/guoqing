<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    },
    value: {
      type: [String, Number],
      default: null
    }
  },
  data () {
    return {
      regionName: [],
      filterText: '', // 输入的过滤关键字
      visible: false, // 是否显示弹出框
      oResult: '', // resultText
      defaultProps: {
        children: 'childList',
        label: 'name'
      }
    }
  },
  computed: {
    innerValue () {
      return this.value !== '' ? this.value : undefined
    },
    currentNode () {
      return this.$refs.tree.getCurrentNode(this.innerValue)
    }
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    innerValue () {
      this.$refs.tree.setCurrentKey(this.innerValue)
      this.update()
    },
    data () {
      this.$nextTick(() => {
        this.$refs.tree.setCurrentKey(this.innerValue)
        this.update()
      })
    }
  },
  methods: {
    clearTree () {
      this.$emit('input', '')
      this.visible = !this.visible
    },
    recTree (currentData, parentIdsDataArr) {
      // 遍历选中节点的函数
      currentData.forEach((item) => {
        for (let i = 0; i < parentIdsDataArr.length; i++) {
          if (item.id === parentIdsDataArr[i]) {
            var a = item[this.defaultProps.label]
            this.regionName.push(a)
            this.recTree(item.childList, parentIdsDataArr)
          }
        }
      })
    },
    update () {
      if (this.currentNode) {
        var parentIdsDataArr = this.currentNode.parentIds.split(',') // 当前节点的父节点id字符串转成父节点id数组格式
        parentIdsDataArr.push(this.currentNode.id) // 想父节点id数组添加选中节点id
        this.regionName = [] // 每次执行将数组置空
        this.oResult = '' // 每次执行将字符串置空
        this.recTree(this.data, parentIdsDataArr) // 执行遍历选中节点以及父节点函数
        for (let i = 0; i < this.regionName.length; i++) {
          // 循环拼接信息至oResult变量中
          this.oResult += this.regionName[i] + ' '
        }

        this.$emit('input', this.currentNode.id)
      } else {
        this.oResult = ''
      }
    },
    confirmTree () {
      if (this.currentNode) {
        this.update()
        this.visible = false
      } else {
        this.$message.warning('请选择一个节点!')
      }
    },
    filterNode (value, data) {
      if (!value) return true
      return data.label.indexOf(value) !== -1
    }
  }
}
</script>

<template>
  <el-popover
    v-model="visible"
    class="elPopover"
    placement="right"
    width="400"
    trigger="click"
  >
    <el-input
      v-model="filterText"
      placeholder="输入关键字进行过滤"
    />
    <el-scrollbar class="elScrollbar">
      <el-tree
        ref="tree"
        class="elTree"
        :data="data"
        :props="defaultProps"
        default-expand-all
        :filter-node-method="filterNode"
        :current-node-key="value"
        node-key="id"
        highlight-current
      />
    </el-scrollbar>

    <el-row>
      <el-col align="right">
        <el-link
          type="primary"
          class="control"
          @click="clearTree"
        >
          清除
        </el-link>
        <el-link
          type="primary"
          class="control"
          @click="visible = !visible"
        >
          取消
        </el-link>
        <el-button
          type="primary"
          class="control"
          @click="confirmTree"
        >
          确定
        </el-button>
      </el-col>
    </el-row>

    <el-input
      slot="reference"
      v-model="oResult"
      class="tInpit"
      readonly
      placeholder="未选择"
      @click="visible = !visible"
    />
  </el-popover>
</template>

<style lang="scss" scoped>
.control {
  margin: 0 10px;
}

.tInpit {
  width: 200px;
}

.elScrollbar {
  height: 500px;
}

.elScrollbar >>> .el-scrollbar__wrap {
  overflow-x: hidden;
}
</style>
