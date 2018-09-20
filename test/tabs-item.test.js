const expect = chai.expect;
import Vue from 'vue';
import Tabs from '../src/tabs';
import TabsHead from '../src/tabs-head';
import TabsBody from '../src/tabs-body';
import TabsItem from '../src/tabs-item';
import TabsPanel from '../src/tabs-panel';
Vue.component('g-tabs', Tabs);
Vue.component('g-tabs-head', TabsHead);
Vue.component('g-tabs-body', TabsBody);
Vue.component('g-tabs-item', TabsItem);
Vue.component('g-tabs-panel', TabsPanel);



Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('TabsItem', () => {
  it('存在', () => {
    expect(TabsItem).to.exist;
  });
  it('接受name', () => {
    const Constructor = Vue.extend(TabsItem)
    const vm = new Constructor({
      propsData: {
        name: 'xxx'
      }
    }).$mount()
    expect(vm.$el.getAttribute('data-name')).to.eq('xxx')
  })
  it('接受disabled', () => {
   const Constructor = Vue.extend(TabsItem)
   const vm = new Constructor({
     propsData: {
       disabled: true
     }
   }).$mount()
   //测试disabled 就给他加个回调 点击回调也不能执行成功
   expect(vm.$el.classList.contains('disabled')).to.be.true
   const callback = sinon.fake();
   vm.$on('click',callback)
   vm.$el.click()
   expect(callback).to.have.not.been.called
  })
})
