import KLTableColumn from '../table/src/column.vue';

KLTableColumn.install = function(Vue) {
    Vue.component(KLTableColumn.name, KLTableColumn);
};

export default KLTableColumn;