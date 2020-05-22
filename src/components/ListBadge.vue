<template>
    <span>
        <b-badge
            v-for="(val,index) in list"
            :key="index"
            :pill="val.pill || false"
            class="mr-1"
            :variant="val.variant || 'primary'"
        >{{val.content}}</b-badge>
    </span>
</template>
<script>
// const defaultValue = {
//     type: Object,
//     default: () => ({}),
// }
module.exports = {
    name: "KVBadge",
    props: ["list"]
};
</script>
<!-- <script type="text/javascript">
module.exports = {
    props: ['beatmap'],
    computed: {
        strDiff: function() {
            if (this.beatmap.banchoResultReady) {
                const d = this.beatmap.difficulty
                const stars = {
                    star: d.rating,
                    aim: d.aim,
                    speed: d.speed,
                }

                return Object.entries(stars).map(([k, v]) => `${k}: ${v}`).join(" ")
            } else {
                return '';
            }
        },
        strData: function() {
            if (this.beatmap.banchoResultReady) {
                const d = this.beatmap.difficulty
                const diff = {
                    CS: d.size,
                    OD: d.overall,
                    AR: d.approach,
                    HP: d.drain,
                }
                return Object.entries(diff).map(([k, v]) => `${k}: ${v}`).join(" ")
            } else return ""
        },
    }
}
</script> -->