<template>
  <div class="w-full h-full flex ">
    <div class="w-1/6 border flex flex-col items-center h-full p-2 border-koromiko-500 p-1">
      <div class="text md:text-lg sm:text-md lg:text-xl" :class="{'actived':actived_menu}" @click="changePanelPage(0)"><span>Comandas</span></div>
      <div class="text md:text-lg sm:text-md lg:text-xl" :class="{'actived':!actived_menu}" @click="changePanelPage(1)"><span>Nova Comanda</span></div>
      <div class="text md:text-lg sm:text-md lg:text-xl" @click="changePage(0)"><span>Voltar</span></div>
    </div>

    <div class="w-5/6 flex p-8 flex-wrap gap-x-20 gap-y-4" v-if="panel_page == 0">
      <div class="overflow-auto comanda border w-3/12 h-3/6 flex bg-gray-600 flex-col justify-between" v-for="(item,index) in order_list" :key="index">
          <div class="name w-full h-6 text-center text-white flex justify-center items-center"><span>{{item.id}} - {{getNameById(item.id_client)}}</span></div>
          <div class="product flex flex-col border overflow-auto h-full">
            <div class="w-full flex bg-black text-white text-center h-8 items-center">
              <div class="w-3/5 flex">
                <div class="w-4/5">Produto</div>
                <div class="w-1/5"></div>
              </div>
              <div class="w-1/5 border-l border-r">Qtd</div>
              <div class="w-1/5">Valor</div>
            </div>
            <div class="w-full flex border-b text-gray-100" v-for="(produto,testes) in orders[index]" :key="testes">
              <div class="product-name w-3/5 text-center flex">
                <div class="w-4/5 h-full">{{produto.nome}}</div>
                <div class="product-value w-1/5 h-full"><button @click="removeItem(item.id,index,produto.id)" class="w-full h-full flex justify-center items-center text-red-400"><i class="fas fa-times"></i></button></div>
              </div>
              <div class="product-qtd w-1/5 text-center border-l border-r">{{produto.qtd}}</div>
              <div class="product-value w-1/5 text-center border-r">{{produto.valor}}</div>
              
            </div>
            
          </div>
          <div class="add-product w-full flex">
              <select required class="w-3/5" name="produto" v-model="product_selected">
                <option value="" disabled selected>Produto</option>
                <option :value="select" v-for="(select,key) in product_list" :key="key">{{select.nome}}</option>
              </select>
              <input required class="w-1/5" type="number" name="qtd" v-model="product_amount" placeholder="QTD">
              <button class="w-1/5 bg-green-500 text-white" @click="insertItem(index,item.id,product_selected,product_amount)">Add</button>
            </div>
          <button class="w-full bg-green-600 text-white shadow-lg self-end h-6" @click="finish(index,item.id)">Finalizar</button>
      </div>
    </div>

    <div class="w-5/6 flex flex-col justify-center items-center p-8" v-if="panel_page == 1">
      <div class="text-4xl h-1/6 flex justify-center items-end p-4">
        <span class="text-koromiko-500">Nova Comanda</span>
      </div>
      <form class="w-3/6 border border-koromiko-500  rounded h-5/6 flex flex-col items-center justify-center">
        <div class="item flex flex-col justify-center">
          <!-- <div class="w-1/4 h-1/5 flex justify-end items-center">
            <span class="text-right">Nome:</span>
          </div> -->
          <div class="w-2/6 flex flex-col justify-center">
            <label for="nome"  class="text-left text-xs opacity normal-case text-koromiko-500 pb-1">Nome:</label>
            <select id="nome" name="Nome" class="bg-transparent border-b border-opacity-30 border-koromiko-500" v-model="order_num">
              <option class="bg-steel-blue-500 hover:bg-steel-blue-500 border-b">Sem Cadastro</option>
              <option class="bg-steel-blue-700 hover:bg-steel-blue-600" :value="item.id" v-for="(item,index) in name_list" :key="index">{{item.nome}} {{item.sobrenome}}</option>
            </select>
          </div>
        </div>
        <div class="item">
          <button class="cursor-pointer bg-transparent hover:bg-gray-900 p-2 rounded-lg border border-koromiko-500 text-koromiko-500" @click.prevent="insertCommand()">Criar Comanda</button>
        </div>
      </form>
    </div>

    <div class="w-5/6 flex flex-col justify-center items-center" v-if="panel_page == 4">
      <div class="text-green-300 my-2" v-if="insert_status">Comanda Finalizada com sucesso.</div>
      <div class="text-green-300 my-2">Total a pagar: <span class="text-red-300 font-num">{{order_total.toFixed(2)}}</span></div>
      <button class="back w-16 h-8 text-gray-400 border border-transparent hover:border-gray-300 rounded-lg" @click="backPanel()">Voltar</button>
    </div>

    <div class="w-5/6 flex flex-col justify-center items-center" v-if="panel_page == 5">
      <div class="text-green-300 my-2" v-if="insert_status">Comanda Registrada com sucesso.</div>
      <div class="text-red-300 my-2" v-else>Todos os campos são obrigatórios.</div>
      <button class="back w-16 h-8 text-gray-400 border border-transparent hover:border-gray-300 rounded-lg" @click="backPanel()">Voltar</button>
    </div>

  </div>
</template>

<script>
export default {
  name: 'Painel',
  props: {
    changePage: {type: Function, required: true},
  },
  data() {
    return {
      product_list: {},
      name_list: [],
      order_list: {},
      orders: [],
      order_name: '',
      order_num: null,
      panel_page: 0,
      actived_menu: true,
      insert_status: false,
      product_selected: '',
      product_amount: '',
      order_total: 0,
      orders_products: {}
    }
  },
  methods: {
    async insertCommand() {
      await fetch('http://localhost:8081/insertc', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({client_id: this.order_num})
      }).then( () => {
          this.getOrders();
          this.insert_status = true;
          this.panel_page = 5;
        });
    },
    async insertPList(id,list) {
      await fetch('http://localhost:8081/insertplist', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id:id, list: list})
      }).then(res => res.json())
        .then(res => {
          console.log(res.msg)
        })
    },
    async getOrders() {
      await fetch('http://localhost:8081/orders', {
        method: 'get'
      }).then(res => res.json())
        .then(res => {
          this.order_list = res;
          this.$forceUpdate()
          for (var i = 0; i < this.order_list.length; i++) {
            // console.log(eval(this.order_list[i].products))
            this.orders[i] = JSON.parse(this.order_list[i].products)
          }
        });
    },
    changePanelPage(par) {
      this.panel_page = par;
      this.actived_menu = true;
      if (par == 0) {
        this.getOrders();
      } else if (par == 1) {
        this.actived_menu = false;
      } else if (par == 2) {
        this.dayOrders();
        this.$forceUpdate();
      }
    },
    backPanel() {
      this.changePanelPage(0)
      this.order_name = '';
      this.order_num = null;
    },
    getNameById(id) {
      for(let item of this.name_list) {
        if (item.id == id) {
          return item.nome +' '+ item.sobrenome
        }
      }
    },
    insertItem(index,id,product,amount) {
      let temp_array = [];
      if (this.orders[index]) {
        temp_array = this.orders[index];
      }

      for (var i = 0; i < temp_array.length; i++) {
        if (temp_array[i].id == product.id) {
          console.log('igual')
          temp_array[i].qtd = parseInt(temp_array[i].qtd) + parseInt(amount);
          this.orders[index] = temp_array;
          this.insertPList(id,this.orders[index])
          .then(this.$forceUpdate())
          this.product_selected = null;
          this.product_amount = null;
          return
        }
      }
      
      temp_array.push({
        id: product.id,
        nome: product.nome,
        qtd: amount,
        valor: product.valor
      })
      this.orders[index] = temp_array;
      this.insertPList(id,this.orders[index])
      .then(this.$forceUpdate())
      this.product_selected = null;
      this.product_amount = null;
    },
    removeItem(comanda,index,id) {
      let temp_array = [];
      if (this.orders[index]) {
        temp_array = this.orders[index];
      }
      
      for (var i = 0; i < temp_array.length; i++) {
        if (temp_array[i].id == id) {
          temp_array.splice(i, 1);
        }
      }
      this.orders[index] = temp_array;
      this.insertPList(comanda,this.orders[index])
      .then(this.$forceUpdate())
    },
    async finish(index,id) {
      this.order_total = 0
      console.log(index)
      const sleep = ms => {
        return new Promise(resolve => setTimeout(resolve, ms))
      }
      const getTimer = i => {
        return sleep(1000).then(() => this.insertPList(JSON.parse(this.order_list[i]).id,this.orders[i]))
      }
      for (var i = 0; i < this.order_list.length; i++) {
        getTimer(i)
      }
      this.insertPList(id,this.orders[index])
      await fetch('http://localhost:8081/finishc', {
       method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
      })
      .then(res =>  res.json())
      .then(res => {
        for(let item of this.orders[index]) {
          this.order_total += (item.valor*item.qtd)
        }
        this.orders[index] = null;
        this.$forceUpdate()
        this.order_list = res;
        this.product_selected = null;
        this.product_amount = null;
        this.panel_page = 4;
      });
    },
    dayOrders() {
      fetch('http://localhost:8081/dayorders', {
        method: 'get'
      })
      .then(res => res.json())
      .then(res => {
        this.orders_products = {};
        for (let item of res) {
          if (item.products) {
            for (let product of JSON.parse(item.products)){
              this.orders_products[product.nome] = parseInt(this.orders_products[product.nome] || 0) + parseInt(product.qtd)
            }
          }
        }
      });
    }
  },
  mounted() {
    fetch('http://localhost:8081/users', {
      method: 'get'
    })
    .then(res => res.json())
    .then(res => {
      this.name_list = res;
    });
    fetch('http://localhost:8081/products', {
      method: 'get'
    })
    .then(res => res.json())
    .then(res => {
      this.product_list = res;
    });
    this.getOrders();
    this.dayOrders();
  },
  // async created() {
  //   await this.getOrders();
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

  *{
    letter-spacing: initial;
  }

    .client {
    @apply w-full h-16 flex items-center justify-between bg-gray-800 border-2 shadow-lg text-white hover:bg-gray-900;
  }

  .client_options div {
    @apply w-2/6 cursor-pointer ml-2
  }


  .text {
    @apply bg-woodsmoke-700 border-2 w-full border-koromiko-900 p-6 shadow-xl rounded-lg mb-2 hover:bg-koromiko-500 hover:text-woodsmoke-500 flex justify-center items-center;
    color: #FDBC63;
    user-select: none;
    cursor: pointer;
    text-shadow: 3px 3px 3px #000;
  }

  .text:hover {
    font-weight: 700;
    text-shadow: none;
  }

  .item {
    color: #FDBC63;
    font-family: 'Poppins', sans-serif;
    @apply w-full h-1/6 flex justify-center items-center;
  }

  .comandas {
    background: #FDBC63;
    font-family: 'Poppins', sans-serif;
    text-shadow: 2px 2px 2px rgba(78, 78, 78, 0.5);
    @apply border-2 border-black hover:text-white w-full cursor-pointer p-6 rounded-lg mb-2 hover:bg-gray-900 text-black shadow-lg;
  }

  /* width */
  ::-webkit-scrollbar {
    width: 8px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #5a4b36;
  }
  
  .product {
    @apply w-full text-black font-mono;
  }

  .product_options div {
    @apply w-2/6 cursor-pointer ml-2
  }

  .actived {
    text-shadow: none;
    @apply bg-koromiko-500 text-woodsmoke-500 font-bold
  }

  input:focus {
    outline: none;
  }
</style>
