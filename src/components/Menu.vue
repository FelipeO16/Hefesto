<template>
  <div class="hello flex w-full lg:w-4/6 h-1/5 justify-around items-center">
    <div class="menu_btn w-1/6 md:text-lg sm:text-md lg:text-sm flex justify-center items-center" @click="changePage(1)"><span>Clientes</span></div>
    <div class="menu_btn w-1/6 md:text-lg sm:text-md lg:text-sm flex justify-center items-center" @click="changePage(2)"><span>Produtos</span></div>
    <div class="menu_btn w-1/6 md:text-lg sm:text-md lg:text-sm flex justify-center items-center" @click="changePage(3)"><span>Painel</span></div>
    <div class="menu_btn w-1/6 md:text-lg sm:text-md lg:text-sm flex justify-center items-center" @click="changePage(4)"><span>Relatórios</span></div>
  </div>
</template>

<script>
export default {
  name: 'Menu',
  props: {
    changePage: {type: Function, required: true},
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .menu_btn {
    @apply shadow-xl text-koromiko-500 hover:bg-woodsmoke-900 border border-koromiko-500 hover:border-koromiko-800 hover:text-koromiko-600 lg:p-6 p-4 ;
    user-select: none;
    cursor: pointer;
  }
</style>
