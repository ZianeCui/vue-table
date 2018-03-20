<template>
    <div class="kl-table">
        <!-- table fixed left -->
        <div class="kl-table__fixed"
            ref="tableFixedLeft"
            :style="{width: fixedLeftWidth, height: 500 - scrollbarWidth + 'px'}">
            <table v-if="isFixedLeft == true"
                :style="{width: tableNodeWidth + 'px'}"
                class="kl-table__main">
                <colgroup>
                    <col v-for="(column, index) in columns"
                        :width="column.width" >
                </colgroup>
                <thead class="kl-table__main__thead">
                    <tr>
                        <th class="kl-table__main__thead__th"
                            v-for="thItem in columns">{{thItem.title}}</th>
                    </tr>
                </thead>
                <tbody class="kl-table__main__tbody">
                    <tr v-for="trItem in data">
                        <td class="kl-table__main__tbody__td"
                            v-for="tdItem in columns">{{trItem[tdItem.key]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- table fixed right -->
        <div class="kl-table__fixedRight"
            ref="tableFixedRight"
            :style="{width: fixedRightWidth + 'px',  height: 500 - scrollbarWidth + 'px', right: scrollbarWidth + 'px'}">
            <table v-if="isFixedRight == true"
                :style="{width: tableNodeWidth + 'px', marginLeft: - (tableNodeWidth - fixedRightWidth) + 'px'}"
                class="kl-table__main">
                <colgroup>
                    <col v-for="(column, index) in columns"
                        :width="column.width" >
                </colgroup>
                <thead class="kl-table__main__thead">
                    <tr>
                        <th class="kl-table__main__thead__th"
                            v-for="thItem in columns">{{thItem.title}}</th>
                    </tr>
                </thead>
                <tbody class="kl-table__main__tbody">
                    <tr v-for="trItem in data">
                        <td class="kl-table__main__tbody__td"
                            v-for="tdItem in columns">{{trItem[tdItem.key]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>


        <div :style="{overflow: 'auto', height: '500px'}" @scroll="handleBodyScroll" ref="mainTable">
            <table :style="{width: '2000px'}" class="kl-table__main" ref="table">
                <colgroup>
                    <col v-for="(column, index) in columns"
                        :width="column.width" >
                </colgroup>
                <thead ref="thead" class="kl-table__main__thead">
                    <tr>
                        <th class="kl-table__main__thead__th"
                            v-for="thItem in columns">{{thItem.title}}</th>
                    </tr>
                </thead>
                <tbody ref="tbody" class="kl-table__main__tbody">
                    <tr v-for="trItem in data">
                        <td class="kl-table__main__tbody__td"
                            v-for="tdItem in columns">{{trItem[tdItem.key]}}</td>
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
            scrollbarWidth: 0,
            fixedLeftWidth: '',
            fixedRightWidth: '',
            tableNodeWidth: ''
        };
    },
    props: {
        columns: '',
        data: ''
    },
    methods: {
        handleBodyScroll(event) {
            this.$refs.tableFixedLeft.scrollTop = event.target.scrollTop;
            this.$refs.tableFixedRight.scrollTop = event.target.scrollTop;
        },
        judgeScrollBar() {
            this.hasHeightScroll = this.$refs.mainTable.scrollHeight > this.$refs.mainTable.clientHeight;
            this.hasWidthScroll = this.$refs.mainTable.scrollWidth > this.$refs.mainTable.clientWidth;
        },
        getScrollbarWidth() {
            let oP = document.createElement('p'),
                styles = {
                    width: '100px',
                    height: '100px',
                    overflowY: 'scroll'
                }, i, scrollbarWidth;
            for (i in styles) {
                oP.style[i] = styles[i];
            }
            document.body.appendChild(oP);
            scrollbarWidth = oP.offsetWidth - oP.clientWidth;
            oP.remove();
            return scrollbarWidth;
        }
    },
    computed: {
        isFixedLeft() {
            return this.columns.some(column => column.fixed == 'left');
        },
        isFixedRight() {
            return this.columns.some(column => column.fixed == 'right');
        }
    },
    mounted() {
        // 得到每列的宽度
        const thNodeList = Array(...this.$refs.thead.children[0].children);
        thNodeList.forEach((thElement, index) => {
            const thElementStyles = document.defaultView.getComputedStyle(thElement);
            const width = parseInt(thElementStyles.width) + parseInt(thElementStyles.paddingLeft) + parseInt(thElementStyles.paddingRight);
            this.columns[index].width = width;
        });

        let fixedLeftWidth = 0;
        let fixedRightWidth = 0;
        this.columns.forEach((column) => {
            if (column.fixed == 'left') {
                fixedLeftWidth = fixedLeftWidth/1 + column.width/1;
            }
            if (column.fixed == 'right') {
                fixedRightWidth = fixedRightWidth/1 + column.width/1;
            }
        });
        this.fixedLeftWidth = `${fixedLeftWidth}px`;
        this.fixedRightWidth = fixedRightWidth;

        // 得到表头的高度
        const thNode = this.$refs.thead.children[0];
        const thNodeStyles = document.defaultView.getComputedStyle(thNode);
        const thNodeHeight = parseInt(thNodeStyles.height) + parseInt(thNodeStyles.paddingTop) + parseInt(thNodeStyles.paddingBottom);

        // 得到表格每行的高度
        const tbodyNodeChildrenList = Array(...this.$refs.tbody.children);
        tbodyNodeChildrenList.forEach((trElement, index) => {
            const trElementStyles = document.defaultView.getComputedStyle(trElement);
            const trHeight = parseInt(trElementStyles.height) + parseInt(trElementStyles.paddingTop) + parseInt(trElementStyles.paddingBottom);
            this.data[index].__height = trHeight;
        });

        const tableNode = this.$refs.table;
        const tableNodeStyle = document.defaultView.getComputedStyle(tableNode);
        this.tableNodeWidth = parseInt(tableNodeStyle.width) + parseInt(tableNodeStyle.paddingLeft) + parseInt(tableNodeStyle.paddingRight);
        window.onload = this.judgeScrollBar;
        this.scrollbarWidth = this.getScrollbarWidth();
        this.$forceUpdate();
    }
};
</script>

