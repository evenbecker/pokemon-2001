<template>
   
        <div v-for="p in products" v-bind:key="p.id" class="card m-1 p-1 bg-light">
            <h6>            
                <a href="#" @click="toggleWithShow(p.id)">#{{p.id}} &nbsp;&nbsp;&nbsp; {{p.name }}</a>                                
                <span v-if="p.id == this.numero">&nbsp; has type : {{ message }}</span> 
                <!--<span>clicked</span>-->
            </h6>
        </div>               
        <page-controls />        
        
</template>

<script>

import { mapGetters} from "vuex";
import PageControls from "./PageControls.vue";
import pokemonData from '../assets/pokemonapi.json';

export default {
    components: { PageControls },
    data() {
        return {
            numero: 45,
           message: ".",
           internPokemon: null,
        }
    },   
    computed: {
        ...mapGetters({ products: "processedProducts" })
    },
    filters: {
        capitalize(value) {
        return value[0].toUpperCase() + value.slice(1);
        },
    },
    methods: {
        toggleFavorite(numb) {
            this.numero = numb;
            
            console.log(this.numero);
            this.$emit('toggle-favorite', this.numero);
        },
        async toggleWithShow(numb) {    
            this.numero = numb;
            
            console.log(this.numero);
            this.$emit('toggle-favorite', this.numero);  
            //new part here:
            this.message = "";                    
                const response = await fetch(pokemonData[numb -1].url);
                if (!response.ok) {
                    console.error(`Error fetching Pokemon: ${response.statusText}`);
                    return;
                }
                this.internPokemon = await response.json();
                //this.message = this.internPokemon.types[0].slot;
                
                if (this.internPokemon.past_types[0]){
                    this.message = this.internPokemon.past_types[0].types[0].type.name;
                    if (this.internPokemon.past_types[0].types[1]){
                        this.message += " + " + this.internPokemon.past_types[0].types[1].type.name;
                    } 
                    return;
                }
                
                this.message = this.internPokemon.types[0].type.name 
                if (this.internPokemon.types[1]){
                    this.message += " + " + this.internPokemon.types[1].type.name; 
                }
        },
    }

}
</script>
<style>


</style>