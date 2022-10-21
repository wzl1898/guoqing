import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'reset-css'
import 'normalize.css'
import {Form, Field, Button, Tabbar, TabbarItem, Image as VanImage, Icon} from 'vant';
import {Swipe, SwipeItem, NavBar, Badge,Cell, CellGroup, Overlay, RadioGroup, Radio } from 'vant';
import { Popup, Picker, Tab, Tabs ,Tag } from 'vant';

Vue.config.productionTip = false
Vue.use(Form).use(Field).use(Button);Vue.use(Tabbar);
Vue.use(TabbarItem).use(VanImage).use(Icon).use(Swipe).use(SwipeItem).use(NavBar).use(Badge).use(Cell).use(CellGroup);
Vue.use(Overlay).use(RadioGroup).use(Radio).use(Popup).use(Picker).use(Tab).use(Tabs).use(Tag);


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
