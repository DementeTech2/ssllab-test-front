<template>
    <b-col sm="12" lg="4" class="domain-item">
        <div class="item-header" v-bind:style="{ backgroundImage: bgLogo }" @click="openModal">
            <h3>{{revision.Domain}}</h3>
            <h6>{{revision.Title || "&nbsp;"}}</h6>
        </div>
        <b-row class="item-body" @click="openModal">
            <b-col sm="9" class="item-details">
                <span> {{ revision.Servers ? revision.Servers.length : 0 }} servers. </span> <br />
                <span class="small">{{ revision.EndTime | fromNow }}</span>
            </b-col>
            <b-col sm="3" class="grade">
                <b-spinner v-if="serverProgress < '100'" type="grow" variant="secondary" style="width: 1.5rem; height: 1.5rem;" small></b-spinner>
                <span v-else-if="revision.SslGrade != ''">{{revision.SslGrade}}</span>
                <span v-else title="Not determined">n.d.</span>
            </b-col>
        </b-row>
        <b-progress :variant="variantProg" :animated="serverProgress < 100" height="5px" :value="serverProgress" :max="100" ></b-progress>
    </b-col>
</template>

<script>
    import moment from 'moment'
    export default {
        name: 'Item',
        props: ["revision"],
        methods: {
            openModal() {
                this.$store.dispatch("selectRevision", this.revision.ID)
                this.$bvModal.show("modal-details")
            }
        },
        computed: {
            serverProgress () {
                if ( this.revision.Status == 'dns')
                    return 0
                if (this.revision.Status == 'error') 
                    return 100
                if (this.revision.Servers && this.revision.Servers.length > 0){
                    let total = this.revision.Servers.map(el => el.Progress).reduce((acc, elem) => acc + elem, 0)
                    return total / this.revision.Servers.length
                }
                if (this.revision.Status == 'in_progress') 
                    return 0
                return 100
            },
            variantProg() {

                if (this.revision.Status == 'error') 
                    return 'danger'

                if (this.revision.Status == 'ready') {
                    if (this.revision.SslGrade == '')
                        return 'warning'
                    else
                        return 'success'
                }

                return 'info'
            },
            bgLogo(){
                if (this.revision.Logo == '' || this.revision.Logo == 'NOT FOUND') {
                    return '';
                }
                return 'linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 40%), url("'+this.revision.Logo+'")'
            }
        },
        filters: {
            fromNow: function (date) {
                let theDate = moment(date);
                if (theDate.unix() < 1000) {
                    return "In progress..."
                }
                return theDate.fromNow();
            }
        }
    }
</script>

<style>

    .domain-item {
        padding-bottom: 10px;
    }

    .domain-item .item-header{
        background-color: #fff;
        white-space: nowrap;
        padding: 10px 50px 10px 10px;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
        box-shadow: 2px 12px 15px gray;
        background-repeat: no-repeat;
        background-position: right;
        background-size: auto 100%;

        cursor: pointer;
    }

    .domain-item .item-header h3,
    .domain-item .item-header h6{
        margin: 0;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
    }

    .domain-item .item-body {
        background-color: #fff;
        padding:  10px;
        padding-top: 0px;
        margin:0;
        box-shadow: 2px 12px 15px gray;

        cursor: pointer;
    }

    .domain-item .item-body .item-details {
        line-height: 1.3em;
        padding-top: 5px;    
    }

    .domain-item .item-body .grade{
        text-align: center;
        vertical-align: middle;
        font-size: 32px;
    }

</style>
