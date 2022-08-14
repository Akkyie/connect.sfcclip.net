<template>
  <v-container fluid>
    <v-text-field
      v-if="unit.id"
      v-model="unit.id"
      name="id"
      label="ユニットID"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="unit.attributes.name"
      name="name"
      label="ユニット名"
    ></v-text-field>

    <v-text-field
      v-model="unit.attributes.advertizer"
      name="advertizer"
      label="出稿元"
    ></v-text-field>
    <v-text-field
      v-model="unit.attributes.imageURL"
      name="image_url"
      label="画像URL"
    ></v-text-field>
    <v-text-field
      v-model="unit.attributes.targetURL"
      name="target_url"
      label="遷移先URL"
    ></v-text-field>

    <v-text-field
      v-model="unit.attributes.image_count"
      name="image_count"
      label="表示回数"
      disabled
    ></v-text-field>
    <v-text-field
      v-model="unit.attributes.open_count"
      name="open_count"
      label="遷移回数"
      disabled
    ></v-text-field>

    <v-btn outlined primary @click.native.stop="send">登録</v-btn>
    <v-btn v-if="unit.id" outlined error @click.native.stop="remove"
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
      unit: new Unit(),
      menu: {
        startDate: false,
        endDate: false,
      },
    }
  },
  watch: {
    '$route.query'() {
      if (this.$route.query.id) {
        this.reload(this.$route.query.id)
      } else {
        this.unit = new Unit()
      }
    },
  },
  mounted() {
    if (this.$route.query.id) this.reload(this.$route.query.id)
  },
  methods: {
    async reload(id) {
      const res = await api.get(`/units/${id}`)
      this.unit = new Unit(res.data.data)
    },
    async send() {
      if (this.$route.query.id) {
        await api.patch(`/units/${this.$route.query.id}`, {
          data: this.unit.data,
        })
        await this.reload(this.$route.query.id)
      } else {
        const res = await api.post(`/units`, { data: this.unit.data })
        const unit = await new Unit(res.data.data)
        await this.$router.push(`/unit?id=${unit.id}`)
      }
      this.$nuxt.$emit('shouldUpdate')
    },
    async remove() {
      await api.delete(`/units/${this.$route.query.id}`)
      await this.$router.push(`/unit`)
      this.$nuxt.$emit('shouldUpdate')
    },
  },
}
</script>
