<template>
  <b-container>
        <b-row v-if="fetchDomainError !== false">
            <b-col>
                <b-alert show variant="danger" style="margin-top:15px">Can't reach backend ( {{ fetchDomainError.message }} )</b-alert>
            </b-col>
        </b-row>
        <b-row v-if="items.length">
            <Item v-for="item in items" v-bind:key="item.ID" :revision="item" />
        </b-row>
        <b-row v-else>
            <b-col>
                <b-jumbotron header="SSlLab Test" lead="SslLab domain analyzer wrapper"  bg-variant="info" text-variant="white" border-variant="dark">
                    <p>Build by <a style="color:white; text-decoration:underline;" href="mailto:oscar.plaza.ceron@gmail.com">Oscar Plaza</a> </p>
                </b-jumbotron>
            </b-col>
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
            },
            fetchDomainError () {
                return this.$store.state.grid.error
            }
        }
    }
</script>
