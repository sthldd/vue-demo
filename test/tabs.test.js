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

describe('Tabs', () => {
  it('存在', () => {
    expect(Tabs).to.exist;
  });
  it('接受selected属性', (done) => {
    const div = document.createElement('div');
    document.body.appendChild(div);
    div.innerHTML = `
        <g-tabs selected="woman">
          <g-tabs-head>
            <g-tabs-item name="woman">美女</g-tabs-item>
            <g-tabs-item name="money">财经</g-tabs-item>
            <g-tabs-item name="sports">体育</g-tabs-item>
          </g-tabs-head>
          <g-tabs-body>
            <g-tabs-panel name="woman">美女相关的信息</g-tabs-panel>
            <g-tabs-panel name="money">财经相关的信息</g-tabs-panel>
            <g-tabs-panel name="sports">体育相关的信息</g-tabs-panel>
            </g-tabs-body>
          </g-tabs>
    `
    let vm = new Vue({
      el: div
    })
    vm.$nextTick(()=>{
      let a = vm.$el.querySelector(`.tabs-item[data-name="woman"]`)
      expect(a.classList.contains('active')).to.be.true
      done()
    })
  })

})
