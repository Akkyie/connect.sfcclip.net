<template>
  <v-container fluid>
    <v-text-field
      v-if="group.id"
      v-model="group.id"
      name="id"
      label="グループID"
      readonly
    />
    <v-text-field
      v-model="group.attributes.name"
      name="name"
      label="グループ名"
    />

    <v-card>
      <v-list v-if="group.id" subheader>
        <v-subheader
          >含まれるユニット（クリックすると削除されます）</v-subheader
        >
        <v-list-item
          v-for="unit in relatedUnits"
          :keys="unit.id"
          @click.native.stop="removeUnit(unit)"
        >
          <v-list-item-content>
            <v-list-item-title v-html="unit.id" />
            <v-list-item-subtitle
              v-html="unit.attributes.name"
            ></v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card>

    <v-container fluid>
      <v-layout row wrap>
        <v-flex xs11>
          <v-select
            v-if="group.id"
            v-model="selectedUnit"
            :items="unrelatedUnits"
            label="追加"
            single-line
            return-object
            auto
          ></v-select>
        </v-flex>
        <v-flex xs1>
          <v-btn
            v-if="group.id"
            outlined
            secondary
            @click.native.stop="addSelectedUnit"
            >追加</v-btn
          >
        </v-flex>
      </v-layout>
    </v-container>

    <v-btn outlined primary @click.native.stop="send">登録</v-btn>
    <v-btn v-if="group.id" outlined error @click.native.stop="remove"
      >削除</v-btn
    >
  </v-container>
</template>

<script>
import api from '../api'
import { Group, Unit } from '../models'

export default {
  data() {
    return {
      group: new Group(),
      units: [],
      selectedUnit: null,
    }
  },
  computed: {
    relatedUnits() {
      return this.group.units
        .map((u) => u.id)
        .map((id) => this.units.find((u) => u.id === id))
        .filter((v) => v)
    },
    unrelatedUnits() {
      const unrelatedUnits = this.units.filter(
        (unit) => !this.group.units.map((u) => u.id).includes(unit.id)
      )
      return unrelatedUnits
    },
  },
  watch: {
    '$route.query'() {
      if (this.$route.query.id) {
        this.reload(this.$route.query.id)
      } else {
        this.group = new Group()
      }
    },
  },
  mounted() {
    if (this.$route.query.id) this.reload(this.$route.query.id)
  },
  methods: {
    addSelectedUnit() {
      if (!this.selectedUnit) return
      this.group.addUnit(this.selectedUnit)
      this.selectedUnit = null
    },
    removeUnit(unit) {
      this.group.removeUnit(unit)
    },
    reload(id) {
      api
        .get(`/groups/${id}`)
        .then((res) => (this.group = new Group(res.data.data)))
        .catch((err) => console.error(err))
      api
        .get('/units')
        .then((res) => (this.units = Unit.list(res.data) || []))
        .catch((err) => console.error(err))
    },
    send() {
      if (this.$route.query.id) {
        api
          .patch(`/groups/${this.$route.query.id}`, { data: this.group.data })
          .then(() => this.reload(this.$route.query.id))
          .then(() => this.$emit('update'))
          .catch((err) => console.error(err))
      } else {
        api
          .post(`/groups`, { data: this.group.data })
          .then((res) => new Group(res.data.data))
          .then((group) => this.$router.push(`/group?id=${group.id}`))
          .then(() => this.$emit('update'))
          .catch((err) => console.error(err))
      }
    },
    remove() {
      api
        .delete(`/groups/${this.$route.query.id}`)
        .then(() => this.$router.push(`/group`))
        .then(() => this.$emit('update'))
        .catch((err) => console.error(err))
    },
  },
}
</script>
