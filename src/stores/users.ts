import { defineStore } from "pinia";
export const useAlertsStore = defineStore('alerts', {
    state:()=>({
        errors:{}

    }),
    getters:{
        getErrors(state){
            return state.errors;
        }
    },
    actions:{

    }
})