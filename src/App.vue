<template>
    <div id="app" class="themedark">
        <!-- 留坑，非常重要 -->
        <router-view></router-view>
    </div>
</template>
<script>
// import bottom from "./components/bottom";
export default {
    data() {
        return {};
    },
    components: {
        // bottom,
    }
};
</script>
<style>
body::before {
    content: "";
    background: black;
    background-image: url("../src/assets/background-min.png");
    background-blend-mode: lighten;
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;

    filter: contrast(70%) brightness(20%) blur(10px);
}
</style>