const expect = chai.expect;
import Vue from 'vue';
import Row from '../src/row';
import Col from '../src/col';

Vue.config.productionTip = false;
Vue.config.devtools = false;

describe('Row', () => {
  it('存在', () => {
    expect(Row).to.exist;
  });
  it('接受gutter属性', () => {
    Vue.component('g-row', Row);
    Vue.component('g-col', Col);
    const div = document.createElement('div');
    document.body.appendChild('div');
    div.innerHTML = `
      <g-row gutter="20">
        <g-col><g-col>
      </g-row>
    `
    const vm = new Vue({
      el: div
    })
    console.log(vm.$el.outerHTML)
  })

})
