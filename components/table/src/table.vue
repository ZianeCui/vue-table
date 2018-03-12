<template>
    <div class="kl-table">
        <!-- table float left -->
        <!-- <table class="kl-table-body kl-table-body-float" :style="{ width: foatLeftWidth }">
            <colgroup>
                <template v-for="(column, index) in cloumns">
                    <col v-if="column.float == 'left'" :width="column.width + 'px'" >
                </template>
            </colgroup>
            <thead ref="thead" class="kl-table-body-thead">
                <tr>
                    <th class="kl-table-body-th" v-if="thItem.float == 'left'" v-for="thItem in cloumns">{{thItem.title}}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="kl-table-body-tbody" v-for="trItem in data">
                    <td class="kl-table-body-td"  v-if="tdItem.float == 'left'" v-for="tdItem in cloumns">{{trItem[tdItem.key]}}</td>
                </tr>
            </tbody>
        </table> -->
        <!-- table float right -->
        <table class="table">
            <colgroup>
                <col v-for="(column, index) in cloumns" :width="column.width + 'px'" >
            </colgroup>
            <thead ref="thead" class="kl-table-body-thead">
                <tr>
                    <th class="kl-table-body-th" v-for="thItem in cloumns">{{thItem.title}}</th>
                </tr>
            </thead>
            <tbody>
                <tr class="kl-table-body-tbody" v-for="trItem in data">
                    <td class="kl-table-body-td" v-for="tdItem in cloumns">{{trItem[tdItem.key]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'kl-table',
    data() {
        return {
            cloumns:  [{
                title: 'Name',
                dataIndex: 'name',
                key: 'name',
                float: 'left'
            }, {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            }, {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            }],
            data: [{
                key: '1',
                name: '胡彦斌',
                age: 32,
                address: '西湖区湖底公园1号'
            }, {
                key: '2',
                name: '胡彦祖',
                age: 42,
                address: '西湖区湖底公园1号'
            }],
            foatLeftWidth: ''
        }
    },
    props: {

    },
    methods: {

    },
    mounted() {
        const thNodeList = Array.apply(null, this.$refs.thead.children[0].children);
        thNodeList.forEach((thElement, index) => {
            const thElementStyle = document.defaultView.getComputedStyle(thElement);
            const width = parseInt(thElementStyle.width) + parseInt(thElementStyle.paddingLeft) + parseInt(thElementStyle.paddingRight);
            this.cloumns[index].width = width;
        });

        let foatLeftWidth = 0;
        this.cloumns.forEach((cloumn) => {
            if (cloumn.float == 'left') {
                foatLeftWidth = foatLeftWidth/1 + cloumn.width/1;
            }
        })
        this.foatLeftWidth = foatLeftWidth + 'px';
        this.$forceUpdate();
    }
};
</script>

