<script>
export default {
    name: 'kl-table-column',
    render: function (createElement) {
        return createElement(
            'h' + this.level,   // tag name 标签名称
            this.$slots.default // 子组件中的阵列
        )
    },
    data() {
        return {

        };
    },
    props: {
        name: String,
        key: String,
        width: String,
        minWidth: String,
        tip: String,
        sortable: Boolean,
        enableCheckAll: Boolean,
        align: String,
        string: String,
        type: String   // check;expand;index;
    },
    methods: {

    },
    computed: {

    },
    created() {
        this.$options.render = createElement => createElement('div', this.$slots.default);
    },
    mounted() {
        // 生成column，以及 当前是第几个元素，是否是嵌套的内容（多表头结构）
    }
};

</script>
