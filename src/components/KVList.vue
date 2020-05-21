<template>
    <b-list-group flush>
        <b-list-group-item
            class="d-flex justify-content-between align-items-center"
            v-for="(val,index) in list"
            :key="index"
        >
            {{index}}
            <b-badge variant="primary" pill>{{val}}</b-badge>
        </b-list-group-item>
    </b-list-group>
</template>
<script>
const defaultValue = {
    type: Object,
    default: () => ({})
};
module.exports = {
    name: "KVList",
    props: {
        list: defaultValue
    }
};
</script>