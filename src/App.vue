<template>
  <div id="app" class="w-screen h-screen flex justify-center items-center flex-col">
    <div class="w-full h-full flex justify-center items-center flex-col" v-if="page == 0">
      <img alt="Vue logo" src="./assets/nome.png" class="w-5/6 md:w-4/6 lg:w-3/6">
      <Home :changePage="changePage" />
    </div>
    <div class="w-full h-full flex justify-center items-center flex-col" v-if="page == 1">
      <Clientes :changePage="changePage" />
    </div>
    <div class="w-full h-full flex justify-center items-center flex-col" v-if="page == 2">
      <Produtos :changePage="changePage" />
    </div>
    <div class="w-full h-full flex justify-center items-center flex-col" v-if="page == 3">
      <Painel :changePage="changePage" />
    </div>
    <div class="w-full h-full bg-white flex justify-center items-center flex-col" v-if="page == 4">
      <Relatorios :changePage="changePage" class="w-3/6 h-3/6" />
    </div>
  </div>
</template>

<script>
import Home from './components/Menu.vue'
import Clientes from './components/Clientes.vue'
import Produtos from './components/Produtos.vue'
import Painel from './components/Painel.vue'
import Relatorios from './components/Relatorios.vue'

export default {
  name: 'App',
  components: {
    Home,
    Clientes,
    Produtos,
    Painel,
    Relatorios
  },
  data() {
    return {
      page: 0,
      clientes: [],
      chartdata: {
      labels: ['January', 'February'],
      datasets: [
        {
          label: 'Data One',
          backgroundColor: '#f87979',
          data: [40, 20]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
    }
  },
  methods: {
    changePage(par) {
      this.page = par;
    },
  },
}
</script>

<style>
@font-face { 
  font-family: "Saudagar";
  src: url("./fonts/Typo_Round_Light_Demo.otf"); 
}
@font-face { 
  font-family: "class";
  src: url("./fonts/ClassA.ttf"); 
}
@import url('https://pro.fontawesome.com/releases/v5.10.0/css/all.css');
@import url('https://fonts.googleapis.com/css2?family=Inconsolata:wght@500&family=Poppins:wght@300;400;700&display=swap');
/* font-family: 'Inconsolata', monospace;
font-family: 'Poppins', sans-serif; */
body,#app {
  @apply bg-woodsmoke-500;
  text-transform: uppercase;
  letter-spacing: 4px;
}
#app {
  font-family: 'Saudagar';
  text-align: center;
  color: #2c3e50;
}
h1 {
  font-family: 'Poppins', sans-serif;
}

.font-num {
  font-family: Verdana, Geneva, Tahoma, sans-serif;
}
</style>
