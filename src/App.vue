<template>
    <div id="app">
        <!-- 留坑，非常重要 -->
        <router-view></router-view>
    </div>
</template>
<script>
    export default {
        data(){
            return {
            }
        }
    }
</script>
<style>
    body{
        background-image: url("../src/assets/background-min.png");
        background-color: rgba(255, 255, 255, 0.5);

    }
</style>
