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
            <div class="col">
                <div id="mymargin"> Original 2001 data (Gen II)</div>
                <img alt="card" class="img-responsive logo2" src="../assets/pokemon-logo.webp" />
                <div id="mymargin2"> Gotta Catch 'Em All </div>   
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

#mymargin {
    margin-top: 60px;
    margin-bottom: 40px;
    padding-left: 10px;
    padding-right: 10px;
    text-align: center;
}
#mymargin2 {
    margin-top: 14px;
    text-align: center;
    padding-left: 10px;
    padding-right: 10px;
}
.logo2 {
    width: 100%;
    object-fit: cover;
   
  }
</style> 