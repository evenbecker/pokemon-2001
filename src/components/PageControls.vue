<template>
    <div class="row py-2 mt-2 mytrick">
        <div class="col form-group">
            <select class="form-control" v-on:change="changePageSize">
                <option value="12">12 per page</option>
                <option value="16">16 per page</option>
                <option value="24">24 per page</option>
            </select>
        </div>
        <div class="text-right col myoverflow">
            <div class="btn-group mx-2">
                <button v-for="i in pageNumbers" v-bind:key="i"
                        class="btn btn-secpmdary"
                        v-bind:class="{ 'btn-primary': i == currentPage }"
                        v-on:click="setCurrentPage(i)">
                    {{ i }}
                </button>
            </div>
        </div>
    </div>
</template>

<script>

    import { mapState, mapGetters, mapMutations } from "vuex";

    export default {
        computed: {
            ...mapState(["currentPage"]),
            ...mapGetters(["pageCount"]),
            pageNumbers() {
                return [...Array(this.pageCount + 1).keys()].slice(1);
            }
        },
        methods: {
            ...mapMutations(["setCurrentPage", "setPageSize"]),
            changePageSize($event) {
                this.setPageSize(Number($event.target.value));
            }
        }
    }
</script>
<style>
.mytrick{
    overflow: hidden;
    width: 100%;
}
    .myoverflow {
        max-width: 100%;
        overflow-x: scroll;
    }
</style>