<template>
  <v-app>
    <v-system-bar color="amber darken-3" app />
    <v-app-bar dark color="amber accent-4" app>
      <v-app-bar-nav-icon
        @click.native.stop="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-toolbar-title v-text="title"></v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      app
      temporary
      color="grey lighten-5"
      light
    >
      <v-list>
        <v-subheader>ユニット</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="(unit, key) in units" :key="key">
            <v-list-item
              @click.native.stop="$router.push(`/unit?id=${unit.id}`)"
            >
              <v-list-item-icon>
                <v-icon>list</v-icon>
              </v-list-item-icon>
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
              <v-list-item-icon>
                <v-icon>add</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>新規追加</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list-item-group>

        <v-subheader>グループ</v-subheader>
        <v-list-item-group>
          <v-list-item v-for="(group, key) in groups" :key="key">
            <v-list-item
              @click.native.stop="$router.push(`/group?id=${group.id}`)"
            >
              <v-list-item-icon>
                <v-icon>list</v-icon>
              </v-list-item-icon>
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
              <v-list-item-icon>
                <v-icon>add</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>新規追加</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list-item-group>

        <v-subheader>レコード</v-subheader>

        <v-list-item-group>
          <v-list-item>
            <v-list-item @click.native.stop="$router.push('/record')">
              <v-list-item-icon>
                <v-icon>list</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>レコード一覧</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list-item-group>

        <v-subheader>メニュー</v-subheader>
        <v-list-item-group>
          <v-list-item>
            <v-list-item @click.native.stop="drawer = !drawer">
              <v-list-item-icon>
                <v-icon>close</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>閉じる</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main color="grey lighten-5" light>
      <v-container fluid>
        <nuxt />
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
    this.$nuxt.$on('shouldUpdate', this.reload)
  },
  methods: {
    async reload() {
      const resUnit = await api.get('/units')
      this.units = Unit.list(resUnit.data) || []

      const resGroup = await api.get('/groups')
      this.groups = Group.list(resGroup.data) || []
    },
  },
}
</script>
