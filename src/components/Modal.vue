<template>
    <b-modal id="modal-details" size="lg" hide-footer :header-bg-variant="headerBgVariant" :header-text-variant="'light'">
        <template slot="modal-title">
            {{ revision.Domain }}
        </template> 
        <div class="float-right" style="z-index:10000">
            <switches v-model="rawView" theme="bootstrap" color="info" label="Raw View"></switches> 
        </div>
        <div v-if="!rawView" class="big-item-view clearfix" v-bind:style="{ backgroundImage: bgLogo }">
            <h1>{{revision.Domain}}</h1>
            <h3>{{revision.Title}}</h3>

            <h5 v-if="revision.SslGrade != ''">SSL Grade: {{ revision.PreviousSslGrade ? "From: " + revision.PreviousSslGrade +" to ": "" }} {{ revision.SslGrade}}</h5>
            <h5 v-else-if="isCompleted()">SSL Grade: Could not be determined</h5>
            
            <p>
                <strong>Logo: </strong> 
                    <a v-if="revision.Logo != 'NOT FOUND'" :href="revision.Logo" target="_blank"> Open logo in new tab </a>
                    <span v-else> Not logo found </span>  
                    <br/>
                <strong>Is Down: </strong> {{ revision.IsDown ? "Seems down": "Looks fine" }} <br/>
                <strong>Servers change: </strong> {{ revision.ServerChanged | str }} <br/>
                <span v-if="isCompleted()">Analysis started at {{ revision.StartTime | format1 }} and {{ endTimeStr }}</span>
                <span v-else>Analysis started {{ revision.StartTime | fromNow }}</span>
            </p>

            <b-table striped hover :items="revision.Servers" :fields="fields">
                <template slot="Grade" slot-scope="data">
                    <b-spinner v-if="data.item.Progress < 100" type="grow" variant="secondary" small></b-spinner>
                    <span v-else>{{data.item.SslGrade}}</span>
                </template>
            </b-table>
            
        </div>
        <pre v-if="rawView" class="clearfix">{{revision}}</pre>
    </b-modal>
</template>

<script>
    import Switches from 'vue-switches';
    import moment from 'moment'

    export default {
        name: 'Modal',
        components: {
            Switches
        },
        data() {
            return {
                rawView: false,
                fields: ["IP", "Country", "Owner", 'Grade']
            }
        },
        filters: {
            fromNow: function (date) {
                let theDate = moment(date);
                if (theDate.unix() < 1000) {
                    return "In progress..."
                }
                return theDate.fromNow();
            },
            format1: function (date) {
                if (date) {
                    return moment(date).format('MMMM Do YYYY, h:mm:ss a');
                }
            }
        },
        methods: {
            isCompleted: function() {
                return ["ready", "error"].indexOf(this.revision.Status) >= 0
            }
        },
        computed: {
            revision () {
                let revId = this.$store.state.selectedRevision;
                if (revId === false) return {}
                return this.$store.state.grid.items.find((elem) => elem.ID == revId) || {}
            },
            endTimeStr: function () {
                let endDate = moment(this.revision.EndTime);
                if (endDate.unix() < 1000) {
                    return " is in progress..."
                }

                let startDate = moment(this.revision.StartTime);
                return " took " + moment(endDate.diff(startDate)).utc().format('HH:mm:ss')
            },
            headerBgVariant: function(){
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
        }
    }
</script>

<style>
    .big-item-view{
        background-color: #fff;
        background-repeat: no-repeat;
        background-position: top right;
        background-size: auto 170px;
    }

</style>
