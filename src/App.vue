<template>
<div id="app">
    <div  class="split left"><store @toggle-app="receiveEmit"/>

    </div>
    <div class="split right">
        <div id="ketchup">
            <img alt="card" class="logo" src="./assets/pokemon-logo.webp" />
        </div>   
        <div id="spacer"></div>
        <div class="container-fluid">
            <div class="row py-2">   
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
        </div>
                <div class="pokemon-details" v-if="selectedPokemon">
                    <h5 class="capital">{{ selectedPokemon.name }}</h5>
                    <div v-show = "selectedPokemon.id < 152">                                               
                        <input type="radio" id="yellow" v-bind:value="false" v-model="gen2">
                        <label for="yellow">&nbsp;yellow version</label><br>
                        <input type="radio" id="crystal" v-bind:value="true" v-model="gen2">
                        <label for="crystal">&nbsp;crystal version</label><br>
                    </div>                    
                    <div v-if = "selectedPokemon.id < 152">
                        <div v-if="gen2 == false">
                            <img :src='selectedPokemon.sprites.versions["generation-i"].yellow.front_default' alt="Poke API not responding">
                        </div>
                        <div v-else>
                            <img :src='selectedPokemon.sprites.versions["generation-ii"].crystal.front_default' alt="Poke API not responding">
                        </div>
                    </div>
                    <div v-else>
                        <img :src='selectedPokemon.sprites.versions["generation-ii"].crystal.front_default' alt="Poke API not responding">
                    </div>


                    <div v-for="(stat, index) in selectedPokemon.stats" :key="index">
                        <p class="mystat">{{ stat.stat.name }}: {{ stat.base_stat }}</p>
                    </div>
                </div>
                <div class="ondine" v-else>
                    <img alt="select" src="./assets/she.jpg">
                </div>
            
         
        <!--<a href="#" @click="showPokemon(pokemonList[2].url)">{{ pokemonList[2].name }}</a>-->
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
    margin: 0 auto;
    height: 600px;
    /*position: relative;*/
    font-family: 'Verdana', cursive;
    /*background-color: rgb(253, 234, 180);*/
    /*padding: 0;
    min-width: 925px;*/
  }
  .split {
  height: 100%;
  width: 50%;
  position: fixed;
  z-index:1;
  top: 0;
  overflow-x: hidden;
  padding-top: 0px;
 
}

.left {
  left: 0;
  width: 65%;
  
  /*max-width:280px;*/
  
  
}

.right {
  right: 0;
  float:left;
  /*width:fit-content;*/
  width: 35%;
  
  
}    

.ondine {
    display: flex;
    /*background-color: rgb(227, 247, 250);*/
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.ondine img {
    margin-top: 14px;
}
.pokemon-details {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin: 20px auto;/*20*/
  padding: 10px;/*10*/
  border: 2px solid #c4c5cd77;
  border-radius: 12px;
  color: #000;
  background-color: #F8F9FA;
  
}
h5.capital {
    text-transform: capitalize;
}
.pokemon-details img {
  width: 90px;
  height: 90px;
  margin:18px 0px; /*40px 0px*/
  
}
p.mystat {
    margin-top: -1em;
}
#ketchup{
    width: 100%;
    height: 40px;
    background-color: #6C757D;
    display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.logo {
    
  margin: 3rem 2rem 0 0; /*0 2rem 0 0; */
  width: 210px;
  height: auto;
}
#spacer{
    height: 40px;
    /*background-color: beige;*/
}
input[type="radio"] {
            transform: scale(1.5);
            margin: 2px;
        }
</style>  