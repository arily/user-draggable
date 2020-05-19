<template>
  <b-container fluid>
    <b-row>
      <b-col sm="auto" >
        <b-nav class="flex-column" >
          <h3 style="width:9em">List of player:</h3>
          <draggable class="list-group" :list="remain" group="people" @change="log">
              <Player v-for="(element) in remain" :key="element.name" :player="element">
                <template v-slot:badge><b-icon-music-note></b-icon-music-note></template>
              </Player>
          </draggable>
        </b-nav>
      </b-col>
      <b-col>
        <b-row>
          <b-col sm="auto" v-for="(list,index) in groups" :list="list" :key="index">
            <h3 style="width:9em; max-width:20em">
              <XEditable v-model="list.name" />
            </h3>
            <draggable class="list-group" :list="list.players" group="people" @change="log">
                <Player class="list-group-item"
                v-for="(element, index) in list.players"
                :key="element.name" :player="element">
                  <template v-slot:badge>t{{ index+1 }}</template>
                </Player>
            </draggable>
          </b-col>
        </b-row>
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
      groups.push({ name: `group${i + 1}`, players: [] });
    }
    const remain = this.$route.params.list
      ? [...this.$route.params.list]
      : [{ name: "arily", id: 1123053 }];
    return {
      col:3,
      remain,
      groups
    };
  },
  props: ["initPlayers"],
  methods: {
    log: function(evt) {
      window.console.log(evt);
    }
  }
};
</script>