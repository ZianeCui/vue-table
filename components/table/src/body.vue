<template>
    <div :style="styleObject">
        <table :style="styleObject" class="kl-tableBody">
            <colgroup>
                <col v-for="(column, index) in columns" :width="column.width" >
            </colgroup>
            <tbody ref="tbody" class="kl-tableBody__tbody">
                <tr v-for="trItem in data">
                    <td class="kl-tableBody__tbody__td" v-for="tdItem in columns">
                        {{trItem[tdItem.key]}}
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'kl-body',
    data() {
        return {

        };
    },
    props: {
        styleObject: Object,
        data: Object,
        columns: Object
    },
    methods: {

    },
    computed: {

    },
    mounted() {

    }
};
</script>

