<template>
    <div id="app" class= "themedark">
        <!-- 留坑，非常重要 -->
        <router-view></router-view>
    </div>
</template>
<script>
export default {
    data() {
        return {};
    }
};
</script>
<style>
body::before {
    content: "";
    background-image: linear-gradient( rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5) ), url("../src/assets/background-min.png");
    position: fixed;
    width: 100vw;
    height: 100vh;
    z-index: -1;
    /* opacity: 0.3; */
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    background-attachment: fixed;

    filter: blur(3px);
}
</style>
