<template>
    <div class="container-fluid mybackg">
        <div class="row">
            <div class="col bg-secondary text-white text-center">
                <a class="navbar-brand">Pok&eacute;mon store</a>
            </div>
        </div>
        <div class="row">
            <div class="col-3 bg-secondary p-2">
                <CategoryControls />
            </div>
            <div class="col-9 p-2">
                <ProductList @toggle-favorite="receiveEmit"/>
            </div>
        </div>
    </div>
</template>

<script>

    import ProductList from "./ProductList.vue";
    import CategoryControls from "./CategoryControls.vue";

    export default {
        components: { ProductList, CategoryControls },
        data(){
            return {
                storenum: 50,
            }
        },
        methods: {
            /*toggleApp(fromPList) {
                this.storenum = fromPList;
                console.log(this.storenum);
                this.$emit('toggle-app', this.storenum);
            },*/
            receiveEmit(foodId) {
            //alert( 'You clicked: ' + foodId );            
            //this.toggleApp(foodId); 
            this.storenum = foodId;
            console.log(this.storenum);
            this.$emit('toggle-app', this.storenum);
            }
        
 
        }
    }
</script>
<style>
.mybackg{
    background-color: white;
}
</style>
