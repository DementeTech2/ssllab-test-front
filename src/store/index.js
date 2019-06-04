import Vue from 'vue'
import Vuex from 'vuex'
import api from './api'


Vue.use(Vuex)

const state = {
    selectedRevision: false,
    grid: {
        error: false,
        loading: false,
        items: []
    },
    analyze: {
        loading: false,
        result: {}
    }
}


const actions = {
    selectRevision({commit}, selectedId) {
        commit("setRevId", selectedId)
    },
    fetchDomains({commit}) {
        commit("gridLoading", true);
        api.fetchDomains()
            .then(res => {
                if(res.status && res.status == 'error') {
                    commit("setGridError", res);
                } else {
                    commit("setGridError", false);
                    commit("setGrid", res);
                }
            })
            .finally(()=> {
                commit("gridLoading", false);
            });
    },
    analyzeDomain({commit}, domain) {
        commit("analyzeDomainLoading", true);
        commit("analyzeResult", false)
        api.analyzeDomain(domain)
            .then(res => {
                commit("analyzeResult", res);
            })
            .finally(()=> {
                commit("analyzeDomainLoading", false);
            });
    }
}


const mutations = {
    setRevId(state, id) {
        state.selectedRevision = id;
    },
    gridLoading(state, loading) {
        state.grid.loading = loading;
    },
    setGridError(state, err) {
        state.grid.error = err;
    },
    setGrid(state, items) {
        state.grid.items = items;
    },
    analyzeDomainLoading(state, loading) {
        state.analyze.loading = loading;
    },
    analyzeResult(state, result) {
        state.analyze.result = result;
    }
}


export default new Vuex.Store({
    state,
    actions,
    mutations
})
  