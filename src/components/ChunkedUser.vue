<template>
    <b-row>
        <b-col v-for="(chunk,index) in chunked" :key="`player-chunk-${index}`">
            <b-list-group>
                <Player v-for="player in chunk" :key="player.id" :player="player" />
            </b-list-group>
        </b-col>
    </b-row>
</template>

<script>
import Player from "../components/player.vue";
import _ from "lodash";
export default {
    name: "User",
    props: {
        list: {
            type: Array,
            default: () => []
        },
        chunk: {
            type: Number,
            default: 3
        }
    },
    computed: {
        chunked() {
            const chunked = _.chunk(
                this.list,
                Math.ceil(this.list.length / this.chunk)
            );
            if (chunked.length > this.chunk) {
                const leftover = chunked.pop();
                leftover.map((player, index) => {
                    index = index % (this.chunk - 1);
                    chunked[index].push(player);
                });
            }
            return chunked;
        }
    },
    components: {
        Player
    }
};
</script>