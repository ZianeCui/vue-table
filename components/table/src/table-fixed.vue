<template>
    <div class="kl-table">
        <!-- table float left -->
        <!-- table float right -->
        <table class="kl-table__main">
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
            <tbody class="kl-table__main__tbody">
                <tr v-for="trItem in data">
                    <td class="kl-table__main__tbody__td"
                        v-for="tdItem in cloumns">{{trItem[tdItem.key]}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
export default {
    name: 'kl-table-fixed',
    props: {

    },
    methods: {

    }
};
</script>

