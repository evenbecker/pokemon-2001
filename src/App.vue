<template>
<div class="container-fluid" id="app">
    <div class="row">
            <div class="col bg-secondary text-white text-center">
                <a class="navbar-brand">Pok&eacute;dex</a>
            </div>
        </div>
    <div class="row ">
        <div class="col-8 chiot"><store @toggle-app="receiveEmit"/></div>
   
        <div class="col-4"> 
            <div class="row" id="myheight">     
                <div class="col text-center">    
                <img alt="card" class="logo" src="./assets/pokemon-logo.webp" />
                
                </div>  
            </div>                                
            <div class="row py-2" id="myheight2">   
                <div class="col-2"><span>&nbsp;&nbsp;&nbsp;&nbsp;id:</span></div>
                <div class="col-4">                    
                    <!--<label></label>-->                                        
                    <input v-model="test" class="form-control" />                   
                </div>
                <div class="col-3">
                    <button class="btn btn-primary" @click="showHardCoded(test - 1)">call #{{ test }}</button>
                </div>
                <div class="col-3">
                    
                </div>
            </div> 
    
            <div class="row" v-if="selectedPokemon">
                <div class="col pokeImg">
                    <div class="row">
                        <div class="col text-center py-4">
                        <h5 class="capital">{{ selectedPokemon.name }}</h5>
                        </div>
                    </div>
                                        
                        <div class="row" v-if = "selectedPokemon.id < 152">
                            <div class="col text-center" v-if="gen2 == false">
                                <img :src='selectedPokemon.sprites.versions["generation-i"].yellow.front_default' alt="Poke API not responding">
                            </div>
                            <div class="col text-center" v-else>
                                <img :src='selectedPokemon.sprites.versions["generation-ii"].crystal.front_default' alt="Poke API not responding">
                            </div>
                        </div>
                        <div class="row" v-else>
                            <div class="col text-center">
                            <img :src='selectedPokemon.sprites.versions["generation-ii"].crystal.front_default' alt="Poke API not responding">
                            </div>
                        </div>
                   
                        <div class="row py-2" id="radioHeight" v-show = "selectedPokemon.id < 152">      
                            <div class="col text-center">                                         
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="yellow" v-bind:value="false" v-model="gen2">
                                <label class="form-check-label" for="yellow">
                                    yellow version
                                </label>
                            </div>
                            <div class="form-check">
                                <input class="form-check-input" type="radio" name="flexRadioDefault" id="crystal" checked v-bind:value="true" v-model="gen2">
                                <label class="form-check-label" for="crystal">
                                    crystal version
                                </label>
                            </div>
                            </div>
                        </div>
                        <div class="row py-4">
                <div class="col text-center">
                    <div v-for="(stat, index) in selectedPokemon.stats" :key="index">
                        <p class="mystat">{{ stat.stat.name }}: {{ stat.base_stat }}</p>
                    </div>
                </div>
                    </div>
                </div>
            </div>              
            <div class="row" v-else>
                <div class="col text-center">
                <img alt="select" src="./assets/she.jpg">
                </div>
            </div>
                
            
            <!--<a href="#" @click="showPokemon(pokemonList[2].url)">{{ pokemonList[2].name }}</a>-->
        </div>
    </div>
</div>

</template>

<script>
    import Store from "./components/Store.vue";
    import pokemonData from './assets/pokemonapi.json';

    export default {
        name: 'app',
        components: { Store },
        data() {
            return {
            pokemonList: pokemonData,
            selectedPokemon: null,
            test:7,
            gen2: true,
            }
        },
        /*
        created() {
            // 1. Before the DOM has been set up
            //this.showPokemon(pokemonList[3].url);
            // error: pokemonList is not defined
            console.log("created");
        },*/

        methods: {          
            async showHardCoded(numb) {    
                if (numb < 251 && numb >= 0){            
                    const response = await fetch(pokemonData[numb ].url);
                    if (!response.ok) {
                        console.error(`Error fetching Pokemon: ${response.statusText}`);
                        return;
                    }

                    this.selectedPokemon = await response.json();
                    //console.log(`selected = ${this.selectedPokemon.name}`);
                    console.log(this.selectedPokemon.stats[2].stat.name);//defense
                    //console.log(this.selectedPokemon.past_types[1].types[0].type.name);
                    console.log(this.selectedPokemon.base_experience);
                }else {
                    console.log("numb out of range");
                    this.selectedPokemon = null;
                }
            },
            
            receiveEmit(foodId) {
            console.log( 'You clicked in App: ' + foodId );            
            this.showHardCoded(foodId - 1);
            }
        }
    }
</script>
<style>
#app {
    
    /*position: relative;*/
    font-family: 'Verdana', cursive;
    /*background-color: rgb(253, 234, 180);*/
    /*padding: 0;
    min-width: 925px;*/
  }
  
h5.capital {
    text-transform: capitalize;
}
.pokeImg img {
  width: 90px;
  height: 90px;
  /*margin:18px 0px; */
  
}
p.mystat {
    margin-top: -1em;
}

.logo {
    
  
  width: 210px;
  height: auto;
}
#myheight{
    height: 120px;
    
}
#myheight2{
    height: 70px;    
}

#radioHeight{
    height: 60px;
    /*background-color: beige;*/
}
.chiot{
    margin-left:-15px;
}
</style>  