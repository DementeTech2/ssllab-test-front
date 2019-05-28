<template>
  <b-container>
      <b-row>
          <Item v-for="item in items" v-bind:key="item.ID" :revision="item" />
      </b-row>
  </b-container>
</template>

<script>
    import Item from './Item.vue'
    export default {
        name: 'Grid',
        components: {
            Item
        },
        computed: {
            items () {
                return this.$store.state.grid.items
            }
        }
    }
</script>
