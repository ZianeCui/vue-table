<template>
    <div class="kl-table">
        <!-- table fixed left -->
        <div class="kl-table__fixed"
            :style="{width: fixedLeftWidth}">
            <table v-if="isFixedLeft == true"
                :style="{width: tableNodeWidth + 'px'}"
                class="kl-table__main">
                <colgroup>
                    <col v-for="(column, index) in cloumns"
                        :width="column.width" >
                </colgroup>
                <thead class="kl-table__main__thead">
                    <tr>
                        <th class="kl-table__main__thead__th"
                            v-for="thItem in cloumns">{{thItem.title}}</th>
                    </tr>
                </thead>
                <tbody class="kl-table__main__tbody">
                    <tr v-for="trItem in data">
                        <td class="kl-table__main__tbody__td"
                            v-for="tdItem in cloumns">{{trItem[tdItem.key]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- table fixed right -->
        <div :style="{overflow: 'auto'}">
            <table :style="{width: '2000px'}" class="kl-table__main" ref="table">
                <colgroup>
                    <col v-for="(column, index) in cloumns"
                        :width="column.width" >
                </colgroup>
                <thead ref="thead" class="kl-table__main__thead">
                    <tr>
                        <th class="kl-table__main__thead__th"
                            v-for="thItem in cloumns">{{thItem.title}}</th>
                    </tr>
                </thead>
                <tbody ref="tbody" class="kl-table__main__tbody">
                    <tr v-for="trItem in data">
                        <td class="kl-table__main__tbody__td"
                            v-for="tdItem in cloumns">{{trItem[tdItem.key]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

    </div>
</template>

<script>
export default {
    name: 'kl-table',
    data() {
        return {
            cloumns:  [{
                title: '西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312',
                dataIndex: 'name',
                key: 'name',
                fixed: 'left',
                width: 100
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
                width: 1000
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
                width: 1000
            }],
            data: [{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312西湖区湖底公园1号12312312312312312'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }],
            fixedLeftWidth: '',
            tableNodeWidth: ''
        }
    },
    props: {

    },
    methods: {

    },
    computed: {
        isFixedLeft() {
            return this.cloumns.some((column) => {
                return column.fixed == 'left';
            })
        },
        isFixedRight() {
            return this.cloumns.some((column) => {
                return column.fixed == 'right';
            })
        }
    },
    mounted() {
        // 得到每列的宽度
        const thNodeList = Array.apply(null, this.$refs.thead.children[0].children);
        thNodeList.forEach((thElement, index) => {
            const thElementStyles = document.defaultView.getComputedStyle(thElement);
            const width = parseInt(thElementStyles.width) + parseInt(thElementStyles.paddingLeft) + parseInt(thElementStyles.paddingRight);
            this.cloumns[index].width = width;
        });

        let fixedLeftWidth = 0;
        this.cloumns.forEach((cloumn) => {
            if (cloumn.fixed == 'left') {
                fixedLeftWidth = fixedLeftWidth/1 + cloumn.width/1;
            }
        })
        this.fixedLeftWidth = fixedLeftWidth + 'px';
        console.log(this.fixedLeftWidth);

        // 得到表头的高度
        const thNode = this.$refs.thead.children[0]
        const thNodeStyles = document.defaultView.getComputedStyle(thNode);
        const thNodeHeight = parseInt(thNodeStyles.height) + parseInt(thNodeStyles.paddingTop) + parseInt(thNodeStyles.paddingBottom);

        // 得到表格每行的高度
        const tbodyNodeChildrenList = Array.apply(null, this.$refs.tbody.children);
        tbodyNodeChildrenList.forEach((trElement, index) => {
            const trElementStyles = document.defaultView.getComputedStyle(trElement);
            const trHeight = parseInt(trElementStyles.height) + parseInt(trElementStyles.paddingTop) + parseInt(trElementStyles.paddingBottom);
            this.data[index].__height = trHeight;
        })

        const tableNode = this.$refs.table;
        const tableNodeStyle = document.defaultView.getComputedStyle(tableNode);
        this.tableNodeWidth = parseInt(tableNodeStyle.width) + parseInt(tableNodeStyle.paddingLeft) + parseInt(tableNodeStyle.paddingRight);
        this.$forceUpdate();
    }
};
</script>

