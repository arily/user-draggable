<template>
  <b-list-group-item class="d-flex justify-content-between align-items-center slim">
    <b-avatar class="mr-3" :src="avatarSrc"></b-avatar>
    <span class="mr-auto">{{player.name}}</span>
    <b-badge>
      <slot name="badge"></slot>
    </b-badge>
  </b-list-group-item>
</template>

<script>
export default {
  name: "User",
  props: ["player"],
  computed: {
    avatarSrc: function() {
      return `https://a.ppy.sh/${this.player.id}`;
    }
  }
};
</script>

<style scoped>
  .slim{
    padding-top: 0.4rem;
    padding-bottom: 0.4rem;
  }
</style>
