<template>
  <b-container fluid>
    <b-row>
      <b-col md="auto" style="min-width: 15rem;">
        <b-card no-body>
          <template v-slot:header>
            <h4>List of player:</h4>
          </template>
          <draggable
            tag="b-list-group"
            class="list-group-flush"
            :list="remain"
            group="people"
            @change="log"
          >
            <Player v-for="(element) in remain" :key="element.name" :player="element"></Player>
          </draggable>
        </b-card>
      </b-col>
      <b-col>
        <b-card-group deck>
            <b-card no-body style="min-width: 15rem;" v-for="(list,index) in groups" :list="list" :key="index" class="mb-2">
              <template v-slot:header>
                <h3 id="TeamName">
                  <XEditable v-model="list.name" class="clear-line-height"/>
                </h3>
                <h6 style="font-weight: lighter; color: indianred">AvgElo: {{groupAvgElo[list.name]}}</h6>
              </template>
                <draggable
                  tag="b-list-group"
                  class="list-group-flush"
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
                    <template v-slot:badge>{{tierGroup[index]}}</template>
                  </Player>
                </draggable>
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

export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
    XEditable,
    Player
  },
  data() {
    const groupsCount = this.$route.params.groupSize || 8;
    const groups = [];
    for (let i = 0; i < groupsCount; i++) {
      groups.push({ name: `Group${i + 1}`, players: []});
    }
    const remain = this.$route.params.list
      ? [...this.$route.params.list]
      : [{ name: "arily", id: 1123053 }];
    return {
      col: 3,
      remain,
      groups,
        tierGroup: ['Cap', 'Vice', 'T1', 'T2', 'T3', 'T4','T5']
    };

  },
    computed:{
      groupAvgElo: function () {
          let avgElo = {};
          this.groups.forEach(group=>{
              let total = 0
              group.players.forEach(player=>{
                  total += player.elo
              })
              avgElo[group.name] = group.players.length ? Math.round(total / group.players.length): 0
          })
          return avgElo
      }
    },
  props: ["initPlayers"],
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>
<style >
  .clear-line-height{
    line-height: 2rem;
    color: gray;
    text-align: center;
    font-weight: bold;

  }
  .vue-xeditable-form-control {
    padding: 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    color: #555;
    background-color: transparent;
    background-image: none;
    border-bottom:1px dotted #999;
    outline: none;
    width: 100%;
    }
</style>
