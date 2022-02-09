<template>
  <div class="w-full h-full flex ">
    <div class="w-1/6 border flex flex-col items-center h-full p-2">
      <div class="text md:text-lg sm:text-md lg:text-xl" :class="{'actived':!actived_product}" @click="changeProductPage(1)"><span>Cadastrar Produto</span></div>
      <div class="text md:text-lg sm:text-md lg:text-xl" :class="{'actived':actived_product}" @click="changeProductPage(2)"><span>Alterar Produto</span></div>
      <div class="text md:text-lg sm:text-md lg:text-xl" @click="changePage(0)"><span>Voltar</span></div>
    </div>
    <div class="w-5/6 flex flex-col justify-center items-center p-8" v-if="product_page == 1">
      <div class="text-4xl h-1/6 flex justify-center items-center">
        <span class="text-green-300">Cadastro de Produto</span>
      </div>
      <form class="w-3/6 border-2 border-green-300 rounded-xl h-5/6 flex flex-col items-center justify-center">
        <div class="item">
          <div class="w-1/4 h-1/5 flex justify-end items-center">
          <span class="text-right">Nome:</span>
          </div>
          <input class="w-1/4 h-1/5 bg-transparent border-b border-green-300 text-blue-500 pl-1" type="text" v-model="newproducte_name">
        </div>
        <div class="item">
          <div class="w-1/4 h-1/5 flex justify-end items-center">
          <span class=" text-right">Valor:</span>
          </div>
          <input class="w-1/4 h-1/5 bg-transparent border-b border-green-300 text-blue-500 pl-1" type="number" v-model="newproduct_lastname">
        </div>
        <div class="item">
          <button class="cursor-pointer animate-pulse bg-transparent hover:bg-gray-900 p-2 rounded-lg border border-blue-500 text-blue-500" @click.prevent="insertUsers()">Cadastrar</button>
        </div>
      </form>
    </div>
    <div class="w-5/6 flex flex-col items-center" v-if="product_page == 2">
      <form class="w-full flex justify-center items-center p-4 border bg-gray-900">
        <span class="text-green-300 pr-2">Buscar:</span>
        <input type="text" class="w-2/6 text-koromiko-500 bg-gray-800 border-b bg-opacity-30" v-model="search_products">
        <button class="search text-gray-300 h-full bg-gray-800 border-b bg-opacity-30" @click.prevent="findProducts()"><i class="fal fa-search"></i></button>
      </form>
      <div class="products w-full overflow-auto">
        <div class="product" v-for="product,index in products" :key="index">
          <div class="product_id w-1/12">{{product.id}}</div>
          <div class="product_name pr-2 w-4/12">{{product.nome}}</div>
          <div class="product_name pr-2 w-4/12"> R$ <span class="font-num">{{product.valor}}</span></div>
          <div class="product_options w-28 flex">
            <div class="text-gray-500 hover:text-gray-300" @click="selectUpdateItem(product.id,product.nome,product.valor)"><i class="fas fa-cog"></i></div>
            <div class="text-red-500 hover:text-red-400" @click="delItem(product.id)"><i class="far fa-trash-alt"></i></div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-5/6 flex flex-col items-center" v-if="product_page == 3">
      <form class="w-full flex justify-center items-center p-4 border bg-gray-900">
        <span class="text-green-300 pr-2">Buscar:</span>
        <input type="text" class="w-2/6 text-koromiko-500 bg-gray-800 border-b bg-opacity-30" v-model="search_products">
        <button class="search text-gray-300 h-full bg-gray-800 border-b bg-opacity-30" @click.prevent="findProducts()"><i class="fal fa-search"></i></button>
      </form>
      <div class="products w-full overflow-auto">
        <div class="product" v-for="product,index in search_result" :key="index">
          <div class="product_id w-1/12">{{product.id}}</div>
          <div class="product_name pr-2 w-4/12">{{product.nome}}</div>
          <div class="product_name pr-2 w-4/12">R$ {{product.valor}}</div>
          <div class="product_options w-28 flex">
            <div class="text-gray-500 hover:text-gray-300" @click="selectUpdateItem(product.id,product.nome,product.valor)"><i class="fas fa-cog"></i></div>
            <div class="text-red-500 hover:text-red-400" @click="delItem(product.id)"><i class="far fa-trash-alt"></i></div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-5/6 flex flex-col justify-center items-center p-8" v-if="product_page == 4">
      <div class="text-4xl h-1/6 flex justify-center items-center">
        <span class="text-green-300">Alteração de Produto</span>
      </div>
      <form class="w-3/6 border-2 border-green-300 rounded-xl h-5/6 flex flex-col items-center justify-center">
        <div class="item">
          <div class="w-1/4 h-1/5 flex justify-end items-center">
          <span class="text-right">Novo Nome:</span>
          </div>
          <input class="w-1/4 h-1/5 bg-transparent border-b border-green-300 text-blue-500 pl-1" type="text" v-model="updateproduct_name">
        </div>
        <div class="item">
          <div class="w-1/4 h-1/5 flex justify-end items-center">
          <span class=" text-right">Novo Valor:</span>
          </div>
          <input class="w-1/4 h-1/5 bg-transparent border-b border-green-300 text-blue-500 pl-1" type="text" v-model="updateproduct_value">
        </div>
        <div class="item">
          <button class="cursor-pointer animate-pulse bg-transparent hover:bg-gray-900 p-2 rounded-lg border border-blue-500 text-blue-500" @click.prevent="updateItem()">Salvar Alteração</button>
        </div>
      </form>
    </div>

    <div class="w-5/6 flex flex-col justify-center items-center" v-if="product_page == 5">
      <div class="text-green-300 my-2" v-if="insert_status">Produto Cadastrado com sucesso.</div>
      <div class="text-red-300 my-2" v-else>Todos os campos são obrigatórios.</div>
      <button class="back w-16 h-8 text-gray-400 border border-transparent hover:border-gray-300 rounded-lg" @click="backProduct()">Voltar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Produtos',
  props: {
    changePage: {type: Function, required: true},
  },
  data() {
    return {
      search_products: '',
      product_page: 1,
      newproducte_name: '',
      newproduct_lastname: '',
      products: null,
      search_result: {},
      insert_status: false,
      actived_product: false,
      update_id: null,
      updateproduct_name: '',
      updateproduct_value: ''
    }
  },
  methods: {
    backProduct() {
      this.product_page = 1
      this.newproducte_name = '';
      this.newproduct_lastname = '';
    },
    async insertUsers() {
      await fetch('http://localhost:8081/product', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: this.newproducte_name, sobrenome: parseInt(this.newproduct_lastname)})
      }).then(res => res.json())
        .then(res => {
          this.insert_status = res.msg
          this.product_page = 5;
        });
    },
    async listUsers() {
      await fetch('http://localhost:8081/products', {
        method: 'get'
      }).then(res => res.json())
        .then(res => {
          this.products = res;
        });
    },
    async findProducts() {
      await fetch('http://localhost:8081/searchp', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: this.search_products})
      }).then(res => res.json())
        .then(res => {
          this.search_result = res;
          this.product_page = 3
        });
    },
    async delItem(id) {
      await fetch('http://localhost:8081/deletep', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
      }).then(res => res.json())
        .then(res => {
          this.search_result = res;
          this.product_page = 3;
        });
    },
    selectUpdateItem(id,nome,valor) {
      this.update_id = id;
      this.product_page = 4;
      this.updateproduct_name = nome;
      this.updateproduct_value = valor;
    },
    async updateItem() {
      await fetch('http://localhost:8081/updatep', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.update_id, nome: this.updateproduct_name, valor: this.updateproduct_value})
      }).then(res => res.json())
        .then(res => {
          this.search_result = res;
          this.product_page = 3;
        });
    },
    changeProductPage(par) {
      this.actived_product = false;
      if (par == 2) {
        this.actived_product = true;
        this.listUsers();
      }
      this.product_page = par;
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .text {
    @apply border-2 w-full border-gray-900 p-6 shadow-xl rounded-lg mb-2 hover:bg-steel-blue-700 flex justify-center items-center;
    color: #FDBC63;
    user-select: none;
    cursor: pointer;
    text-shadow: 3px 3px 3px #000;
  }

  .item {
    color: #FDBC63;
    font-family: 'Poppins', sans-serif;
    @apply w-full h-1/6 flex justify-center items-center;
  }

  .product {
    @apply w-full h-16 flex items-center justify-between bg-gray-800 border-2 shadow-lg text-white hover:bg-gray-900;
  }

  .product_options div {
    @apply w-2/6 cursor-pointer ml-2
  }

  .actived {
    @apply bg-steel-blue-700
  }

  input:focus {
    outline: none;
  }
</style>
