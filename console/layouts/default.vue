<template>
  <v-app>
    <v-system-bar color="amber darken-3" app />
    <v-app-bar dark color="amber accent-4" app>
      <v-app-bar-nav-icon
        @click.native.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary color="grey lighten-5" light>
      <v-list subheader>
        <v-subheader>ユニット</v-subheader>
        <v-list-item v-for="unit in units" :key="`unit${unit.id}`">
          <v-list-item @click.native.stop="$router.push(`/unit?id=${unit.id}`)">
            <v-list-item-avatar>
              <v-icon>list</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="unit.id"></v-list-item-title>
              <v-list-item-subtitle
                v-html="unit.attributes.name"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>

        <v-list-item>
          <v-list-item @click.native.stop="$router.push('/unit')">
            <v-list-item-avatar>
              <v-icon>add</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>新規追加</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>

        <v-divider />

        <v-subheader>グループ</v-subheader>
        <v-list-item v-for="group in groups" :key="`group${group.id}`">
          <v-list-item @click.native.stop="$router.push(`/group?id=${group.id}`)">
            <v-list-item-avatar>
              <v-icon>list</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title v-text="group.id"></v-list-item-title>
              <v-list-item-subtitle
                v-html="group.attributes.name"
              ></v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>

        <v-list-item>
          <v-list-item @click.native.stop="$router.push('/group')">
            <v-list-item-avatar>
              <v-icon>add</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>新規追加</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>

        <v-divider />

        <v-subheader>レコード</v-subheader>
        <v-list-item>
          <v-list-item @click.native.stop="$router.push('/record')">
            <v-list-item-avatar>
              <v-icon>list</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>レコード一覧</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>

        <v-divider />

        <v-subheader>メニュー</v-subheader>
        <v-list-item>
          <v-list-item @click.native.stop="drawer = !drawer">
            <v-list-item-avatar>
              <v-icon>close</v-icon>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>閉じる</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main color="grey lighten-5" light>
      <v-container fluid>
        <nuxt @update="reload" />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import api from '../api'
import { Group, Unit } from '../models'

export default {
  data() {
    return {
      drawer: true,
      title: 'connect.sfcclip.net',
      units: [],
      groups: [],
    }
  },
  created() {
    this.reload()
  },
  methods: {
    reload() {
      api
        .get('/units')
        .then((res) => (this.units = Unit.list(res.data) || []))
        .catch((err) => console.error(err))

      api
        .get('/groups')
        .then((res) => (this.groups = Group.list(res.data) || []))
        .catch((err) => console.error(err))
    },
  },
  events: {
    updated() {
      this.reload()
    },
  },
}
</script>
