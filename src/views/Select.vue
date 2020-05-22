<template>
    <b-container fluid>
        <b-row>
            <b-col md="auto" style="min-width: 15rem;">
                <b-card no-body>
                    <template v-slot:header>
                        <h4>List of player:</h4>
                    </template>
                    <b-form-input
                        v-model="searchUserText"
                        placeholder="Find Player..."
                        style="background-color: var(--light); color: var(--input); backdrop-filter: blur(10px);"
                    ></b-form-input>
                    <draggable
                        tag="b-list-group"
                        class="list-group-flush"
                        :list="remain"
                        group="people"
                        style="height:100%"
                        @change="log"
                    >
                        <Player
                            v-for="(element) in remain"
                            :key="element.name"
                            :player="element"
                            :show="hitUserSearch(element)"
                        ></Player>
                    </draggable>
                </b-card>
            </b-col>
            <b-col>
                <b-card-group deck>
                    <b-card
                        no-body
                        style="min-width: 15rem;"
                        v-for="(list,index) in groups"
                        :list="list"
                        :key="index"
                        class="mb-2"
                    >
                        <template v-slot:header>
                            <h3 id="TeamName">
                                <XEditable v-model="list.name" class="clear-line-height" />
                            </h3>
                        </template>
                        <k-v-list :list="{AvgElo:groupAvgElo[list.name] }"></k-v-list>
                        <draggable
                            tag="b-list-group"
                            class="list-group-flush"
                            style="min-height:3.25rem;"
                            :list="list.players"
                            group="people"
                            @change="log"
                        >
                            <Player
                                class="list-group-item"
                                v-for="(element, index) in list.players"
                                :key="element.name"
                                :player="element"
                            >
                                <template v-slot:badge>{{getRoleFromArrayIndex(index)}}</template>
                            </Player>
                        </draggable>
                        <!-- <h6
                                style="font-weight: lighter; color: indianred"
                        >AvgElo: {{groupAvgElo[list.name]}}</h6>-->
                    </b-card>
                </b-card-group>
            </b-col>
        </b-row>
    </b-container>
</template>
<script>
import draggable from "vuedraggable";
import { XEditable } from "@onekiloparsec/vue-xeditable";
import Player from "../components/player.vue";
import KVList from "../components/KVList.vue";

export default {
    name: "two-lists",
    display: "Two Lists",
    order: 1,
    components: {
        draggable,
        XEditable,
        Player,
        KVList
    },
    data() {
        const groupsCount = this.$route.params.groupSize || 8;
        const groups = [];
        for (let i = 0; i < groupsCount; i++) {
            groups.push({ name: `Group${i + 1}`, players: [] });
        }
        const remain = this.$route.params.list
            ? [...this.$route.params.list]
            : [{ name: "arily", id: 1123053 }];
        return {
            col: 3,
            remain,
            groups,
            tierGroup: ["Cap", "Vice"],
            searchUserText: ""
        };
    },
    computed: {
        groupAvgElo() {
            let avgElo = {};
            this.groups.map(group => {
                let total = 0;
                group.players.map(player => {
                    total += player.elo;
                });
                avgElo[group.name] = group.players.length
                    ? Math.round(total / group.players.length)
                    : 0;
            });
            return avgElo;
        }
    },
    props: ["initPlayers"],
    methods: {
        log(evt) {
            window.console.log(evt);
        },
        getRoleFromArrayIndex(index) {
            return this.tierGroup[index] || `T${index - 1}`;
        },
        hitUserSearch(user){
          return user.name.toLowerCase().includes(this.searchUserText.toLowerCase())
        }
    }
};
</script>
<style >
.clear-line-height {
    line-height: 2rem;
    color: lightgray;
    text-align: center;
    font-weight: bold;
}
.vue-xeditable:hover {
    color: white;
}
.vue-xeditable-form-control {
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: white;
    background-color: transparent;
    background-image: none;
    border-bottom: 1px dotted #999;
    outline: none;
    width: 100%;
}
.card {
    backdrop-filter: blur(10px);
    background-color: var(--dark);
}
.card-header {
    background-color: var(--light);
}
</style>
