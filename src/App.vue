<template>
    <div id="app">
        <!-- 留坑，非常重要 -->
        <router-view></router-view>
        <bottom></bottom>
    </div>
</template>
<script>
import bottom from "./components/hideBottom.vue";
export default {
    data() {
        return {};
    },
    components: {
        bottom,
    }
};
</script>
<style>
body {
    background-color: var(--bg-color) !important;
}

body::before {
    content: "";
    /* background-image: url("../src/assets/background-min.png"); */
    background-color: var(--dark) !important;
    /* background-blend-mode: lighten;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed; */

    /* filter: contrast(50%) brightness(200%) blur(10px); */
}
</style>