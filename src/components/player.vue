<template>
    <b-list-group-item class="d-flex justify-content-between align-items-center slim" v-if="show">
        <slot name="avatar"><b-avatar class="mr-3" :src="avatarSrc"></b-avatar></slot>
        <slot name="username"><span class="mr-auto">{{player.name}}</span></slot>
        <slot name="badges"></slot>
    </b-list-group-item>
</template>

<script>
export default {
    name: "User",
    props: {
      player : {
        type: Object,
        default : () => ({id: -1, name: 'fucked'})
      },
      show: {
        type: Boolean,
        default: true,
      },
    },
    computed: {

        avatarSrc() {
            return `https://a.ppy.sh/${this.player.id}`;
        }
    }
};
</script>

<style scoped>
.slim {
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
}
.list-group-item {
    backdrop-filter: blur(10px);
    background-color: var(--dark);
}
</style>
