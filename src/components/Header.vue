<template>
  <div class="container position-static">
      <div class="row">
        <div class="col-sm">
            <b-form inline @submit="onSubmit">
                <label class="sr-only" for="inline-form-input-domain">Domain</label>
                <b-input v-model="domain" id="inline-form-input-name" class="mb-2 mr-sm-2 mb-sm-0" placeholder="google.com" :disabled="disabled"></b-input>
                <b-button variant="primary" type="submit" :disabled="disabled">Analyze</b-button>
            </b-form>
        </div>
        <div v-if="itemsLength" class="col-sm text-right">
          <h1>SSLLab Test <small>by <a href="mailto:oscar.plaza.ceron@gmail.com">Oscar Plaza</a></small> </h1>
        </div>
      </div>
  </div>
</template>

<script>

    import moment from 'moment';

    const validDomainRegex = new RegExp("^(([a-zA-Z]{1})|([a-zA-Z]{1}[a-zA-Z]{1})|([a-zA-Z]{1}[0-9]{1})|([0-9]{1}[a-zA-Z]{1})|([a-zA-Z0-9][a-zA-Z0-9-_]{1,61}[a-zA-Z0-9]))\\.([a-zA-Z]{2,6}|[a-zA-Z0-9-]{2,30}\\.[a-zA-Z]{2,3})$")

    export default {
        name: 'Header',
        data() {
            return {
                domain: ''
            }
        },
        computed: {
            disabled () {
                return this.$store.state.analyze.loading
            },
            itemsLength () {
                return this.$store.state.grid.items.length
            }
        },
        methods: {
            onSubmit(evt) {
                evt.preventDefault()

                if ( validDomainRegex.test(this.domain) ) {
                    this.$store.dispatch('analyzeDomain', this.domain)
                } else {
                    this.$bvToast.toast(`The domain "${this.domain}" is not valid.`, {
                        toaster: "b-toaster-bottom-right",
                        title: "Error",
                        autoHideDelay: 5000,
                        variant: "danger"
                    })
                }
            }
        },
        mounted() {
            this.$store.subscribe((mutation, state) => {
                let res;
                let toast;
                switch(mutation.type) {
                    case 'analyzeResult':
                        res = state.analyze.result;
                        if (res === false) break;
                        if (res.status && res.status == 'error') {
                            toast = {
                                message: res.message,
                                title: "Error",
                                type: "danger"
                            }
                        } else {
                            if(res.Status == 'in_progress') {
                                if( moment().diff(moment(res.StartTime), 'seconds') < 15 ) {
                                    toast = {
                                        message: "Analysis started successfully.  Check for updates in the grid.",
                                        title: "Analize started",
                                        type: "success"
                                    }
                                    this.$store.dispatch('fetchDomains')
                                } else {
                                    toast = {
                                        message: "Analysis is currently running.  Check for updates in the grid.",
                                        title: "Analize is running",
                                        type: "warning"
                                    }                                    
                                }

                            } else {
                                toast = {
                                    message: "The last domain revision is not older that an hour. Should be in the grid",
                                    title: "Not old enought",
                                    type: "info"
                                }
                            }

                            this.domain = ''
                        }

                        this.$bvToast.toast(toast.message, {
                            toaster: "b-toaster-top-center",
                            title: toast.title,
                            autoHideDelay: 5000,
                            variant: toast.type,
                            solid: true
                        })

                        break;
                }
            })
        }
    }
</script>
