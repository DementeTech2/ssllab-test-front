<template>
    <b-modal id="modal-details" size="lg" hide-footer>
        <template slot="modal-title">
            {{ revision.Domain }}
        </template>
        <pre>{{revision}}</pre>
    </b-modal>
</template>

<script>
    export default {
        name: 'Modal',
        data() {
            return {
                rawView: false
            }
        },
        computed: {
            revision () {
                let revId = this.$store.state.selectedRevision;
                if (revId === false) return {}
                return this.$store.state.grid.items.find((elem) => elem.ID == revId) || {}
            }
        }
    }
</script>
