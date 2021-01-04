import * as types from './mutation_types'
import Vue from 'vue'
export default {
  [types.ADD_COMPONENTS] (state, { chartData, element }) {
    chartData.elements.unshift(element)
  },
  [types.DELETE_COMPONENTS] (state, { chartData, index }) {
    chartData.elements.splice(index, 1)
  },
  /**
   * update element active state
   * @param {*} state
   * @param {*} param1 element and active
   */
  [types.SET_COMPONENT_ACTIVITY] (state, { element, active }) {
    element.active = active
  },
  /**
   * update component location
   * @param {*} state
   * @param {*} param1 chartData, element and [x,y,w,h]
   */
  [types.SET_COMPONENT_LOCATION] (state, { chartData, index, args }) {
    // x: args[0] y: args[1] w: args[2] h:args[3]
    const element = chartData.elements[index]
    element.x = args[0]
    element.y = args[1]
    if (args[2] && args[3]) {
      element.w = args[2]
      element.h = args[3]
    }
    chartData.elements.splice(index, 1, element)
  },
  /**
   * update selectIndex
   * @param {*} state
   * @param {*} param1 chartData and element index
   */
  [types.SELECT_COMPONENT] (state, { chartData, index }) {
    // HACK: if a component is still active, ignore index, respect activeIndex
    const activeIndex = chartData.elements.findIndex(el => el.active === true)
    chartData.selectIndex = activeIndex !== -1 ? activeIndex : index
  },
  [types.SET_PREVIEW] (state, { project, preview }) {
    project.preview = preview
  },
  [types.SET_COMPONENT_NAME] (state, { element, name }) {
    element.name = name
  },
  [types.SET_COMPONENT_BACKGROUND_COLOR] (state, { element, color }) {
    element.bgcolor = color
  },
  [types.SET_COMPONENT_DATASET] (state, { element, dataset }) {
    element.data.options.dataset = dataset
  },
  [types.ADD_PROJECT] (state, {
    key = String(new Date().getTime())
    , width, height
  }) {
    Vue.set(state.projects, key, {
      key,
      title: '新建工程' + Object.keys(state.projects).length,
      preview: false,
      chartData: {
        selectIndex: -1,
        activeIndex: -1,
        w: 1280,
        h: 800,
        elements: []
      }
    })
    state.tabKey = key
  },
  [types.DELETE_PROJECT] (state, key) {
    Vue.delete(state.projects, key)
  },
  [types.SET_TAB] (state, key) {
    state.tabKey = key
  }
}
