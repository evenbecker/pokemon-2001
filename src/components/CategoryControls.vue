<template>
    <div class="container-fluid">
        <div class="row my-2" v-for="c in categories" v-bind:key="c">
            <button class="btn btn-block"
                    v-on:click="setCurrentCategory(c)"
                    v-bind:class="c == currentCategory 
                        ? 'btn-primary' : 'btn-info'">
                {{ c }}
            </button>
        </div> 
        <div class="row my-2 text-white">
            
            <div class = "mymarg">
            <div id="mymargin"> Original 2001 data (Gen II)</div>
            <div id="mymargin2"> Gotta Catch 'Em All</div>   
            </div>        
        </div> 
    </div>
</template>

<script>
    import { mapState, mapGetters, mapMutations} from "vuex";

    export default {
        computed: {
            ...mapState(["currentCategory"]),
            ...mapGetters(["categories"])
        },
        methods: {
            ...mapMutations(["setCurrentCategory"])
        }
    }
</script>
<style> 
.mymarg {
    margin-left: 20px;
    margin-right: 20px;
}
#mymargin {
    margin-top: 80px;
    text-align: center;
}
#mymargin2 {
    margin-top: 34px;
    text-align: center;
}
</style> 