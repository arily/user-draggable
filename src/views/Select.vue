<template>
  <b-container fluid>
    <b-row>
      <b-col md="auto" style="min-width: 15rem">
        <b-card no-body>
          <b-button-group>
          <b-button variant="success" @click="() => $copyText(JSON.stringify(exportData()))">export</b-button>
          <b-button variant="info" v-b-modal.modal-prevent-closing>import</b-button>
          </b-button-group>
          <b-modal
            id="modal-prevent-closing"
            ref="modal"
            title="Import"
            @show="resetModal"
            @hidden="resetModal"
            @ok="handleOk"
          >
            <form ref="form" @submit.stop.prevent="handleSubmit">
              <b-form-group
                :state="jsonState"
                label="Name"
                label-for="name-input"
                invalid-feedback="Name is required"
              >
                <b-form-textarea
                  id="name-input"
                  v-model="json"
                  :state="jsonState"
                  required
                ></b-form-textarea>
              </b-form-group>
            </form>
          </b-modal>
          <template v-slot:header>
            <h4>List of player:</h4>
          </template>
          <b-form-input
            v-model="searchUserText"
            placeholder="Find Player..."
            style="
              background-color: var(--light);
              color: var(--input);
              backdrop-filter: blur(10px);
            "
          ></b-form-input>
          <draggable
            tag="b-list-group"
            class="list-group-flush"
            :list="remain"
            group="people"
            style="height: 100%"
          >
            <Player
              v-for="element in remain"
              :key="element.name"
              :player="element"
              :show="hitUserSearch(element)"
            >
              <template v-slot:badges>
                <list-badge :list="generateBadges(element)"></list-badge>
              </template>
            </Player>
          </draggable>
        </b-card>
      </b-col>
      <b-col>
        <b-card-group deck>
          <b-card
            no-body
            style="min-width: 20rem"
            v-for="(list, index) in groups"
            :list="list"
            :key="index"
            class="mb-2"
          >
            <template v-slot:header>
              <h3 id="TeamName">
                <XEditable v-model="list.name" class="clear-line-height" />
              </h3>
            </template>
            <k-v-list :list="{ AvgElo: groupAvgElo[list.name] }"></k-v-list>
            <draggable
              tag="b-list-group"
              class="list-group-flush"
              style="min-height: 3.25rem"
              :list="list.players"
              group="people"
            >
              <Player
                class="list-group-item"
                v-for="(element, index) in list.players"
                :key="element.name"
                :player="element"
              >
                <template v-slot:badges>
                  <list-badge
                    :list="generateBadges(element, index)"
                  ></list-badge>
                </template>
                <!-- <b-badge pill variant="warning">{{getRoleFromArrayIndex(index)}}</b-badge> -->
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
import ListBadge from "../components/ListBadge.vue";

export default {
  name: "two-lists",
  display: "Two Lists",
  order: 1,
  components: {
    draggable,
    XEditable,
    Player,
    KVList,
    ListBadge,
  },
  data() {
    const groupsCount = this.$route.params.groupSize || 8;
    const groups = [];
    for (let i = 0; i < groupsCount; i++) {
      groups.push({ name: `Group${i + 1}`, players: [] });
    }
    const remain = this.$route.params.list ? [...this.$route.params.list] : [];
    return {
      json: '',
      jsonState: false,
      col: 3,
      remain,
      groups,
      tiers: ["Cap", "Vice"],
      searchUserText: "",
    };
  },
  computed: {
    groupAvgElo() {
      let avgElo = {};
      this.groups.map((group) => {
        let total = 0;
        group.players.map((player) => {
          total += player.elo;
        });
        avgElo[group.name] = group.players.length
          ? Math.round(total / group.players.length)
          : 0;
      });
      return avgElo;
    },
  },
  props: ["initPlayers"],
  methods: {
    log(evt) {
      window.console.log(evt);
    },
    getRoleFromArrayIndex(index) {
      return this.tiers[index] || `T${index - 1}`;
    },
    hitUserSearch(user) {
      return user.name
        .toLowerCase()
        .includes(this.searchUserText.toLowerCase());
    },
    roleBadgeVariant(index) {
      //   console.log(index);
      switch (index) {
        case 0:
          return "info";
        case 1:
          return "primary";
        default:
          return "secondary";
      }
    },
    roleBadge(roleIndex) {
      const role = this.getRoleFromArrayIndex(roleIndex);
      return {
        variant: this.roleBadgeVariant(roleIndex),
        content: role,
      };
    },
    generateBadges(player, roleIndex) {
      const badges = [];
      badges.push({ pill: true, content: `${player.elo} elo` });
      if (roleIndex !== undefined) badges.push(this.roleBadge(roleIndex));
      return badges;
    },
    exportData() {
      const { remain, groups, tiers } = this;
      return {
        remain,
        groups,
        tiers,
      };
    },
    importData (data) {
      this.remain = data.remain
      this.groups = data.groups
      this.tiers = data.tiers
    },
    resetModal() {
      this.json = "";
      this.jsonState = null;
    },
    checkFormValidity() {
      try {
        JSON.parse(this.json)
        return true
      } catch (error) {
        return false
      }
      
    },
    handleOk(bvModalEvt) {
      // Prevent modal from closing
      bvModalEvt.preventDefault();
      // Trigger submit handler
      this.handleSubmit();
    },
    handleSubmit() {
      // Exit when the form isn't valid
      if (!this.checkFormValidity()) {
        return;
      }
      const data = JSON.parse(this.json)
      this.importData(data)
      // Hide the modal manually
      this.$nextTick(() => {
        this.$bvModal.hide("modal-prevent-closing");
      });
    },
  },
};
</script>
<style>
.clear-line-height {
  line-height: 2rem;
  color: var(--input);
  text-align: center;
  font-weight: bold;
}
.vue-xeditable:hover {
  color: var(--input-highlight);
}
.vue-xeditable-form-control {
  padding: 0;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  color: var(--input);
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
  background-color: var(--input-bg);
}
</style>
