<template>
    <b-col sm="12" lg="4" class="domain-item">
        <div class="item-header" v-bind:style="{ backgroundImage: bgLogo() }">
            <h3>{{domain}}</h3>
            <h6>{{title}}</h6>
        </div>
        <b-row class="item-body">
            <b-col sm="9" class="item-details">
                <span> {{ servers.length }} servers. </span> <br />
                <span class="small">{{startDate | fromNow }}</span>
            </b-col>
            <b-col sm="3" class="grade">
                <b-spinner v-if="sslGrade == ''" type="grow" variant="secondary" style="width: 1.5rem; height: 1.5rem;" small></b-spinner>
                <span v-else>{{sslGrade}}</span>
            </b-col>
        </b-row>
        <b-progress height="5px" :value="calcProg()" :max="100" animated></b-progress>
    </b-col>
</template>

<script>
    import moment from 'moment'
    export default {
        name: 'Item',
        data() {
            return {
                domain: "alkosto.com.co",
                title: "La tiende del barrio",
                logo: "https://media.aws.alkosto.com/media/ALKOSTO/contenido/logo-alkosto-rwd-Pro201709.png",
                startDate: 1558909341000,
                sslGrade: "B",
                servers: [
                    {progress: 100},
                    {progress: 100},
                    {progress: 50},
                    {progress: 0},
                    {progress: 0},
                    {progress: 0}
                ]
            }
        },
        methods: {
            clicked() {
                this.counter = Math.random() * this.max;
            },
            bgLogo(){
                if (this.logo == '') {
                    return '';
                }
                return 'linear-gradient(to left, rgba(255, 255, 255, 0) 0%, rgb(255, 255, 255) 40%), url("'+this.logo+'")'
            },
            calcProg(){
                return this.servers.reduce((acc, elem) => acc + elem.progress, 0) / this.servers.length
            }
        },
        filters: {
            fromNow: function (date) {
                return moment(date).fromNow();
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
