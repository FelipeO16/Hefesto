<template>
  <div class="w-full h-full flex ">
    <div class="w-1/6 border flex flex-col items-center h-full p-2">
      <div class="text md:text-lg sm:text-md lg:text-xl" :class="{'actived':!actived_client}" @click="changeClientPage(1)"><span>Cadastrar Cliente</span></div>
      <div class="text md:text-lg sm:text-md lg:text-xl" :class="{'actived':actived_client}" @click="changeClientPage(2)"><span>Alterar Cliente</span></div>
      <div class="text md:text-lg sm:text-md lg:text-xl" @click="changePage(0)"><span>Voltar</span></div>
    </div>
    <div class="w-5/6 flex flex-col justify-center items-center p-8" v-if="client_page == 1">
      <div class="text-4xl h-1/6 flex justify-center items-center">
        <span class="text-green-300">Cadastro de Cliente</span>
      </div>
      <form class="w-3/6 border-2 border-green-300 rounded-xl h-5/6 flex flex-col items-start justify-center">
        <div class="item">
          <!-- <div class="w-1/4 h-1/5 flex justify-end items-center">
          <span class="text-right">Nome:</span>
          </div> -->
          <label for="nome">Nome:</label>
          <input id="nome" class="w-1/4 h-1/5 bg-transparent border-b border-green-300 text-blue-500 pl-1" type="text" v-model="newcliente_name">
        </div>
        <div class="item">
          <!-- <div class="w-1/4 h-1/5 flex justify-end items-center">
          <span class=" text-right">Sobrenome:</span>
          </div> -->
          <label for="sobrenome">Sobrenome:</label>
          <input id="sobrenome" class="w-1/4 h-1/5 bg-transparent border-b border-green-300 text-blue-500 pl-1" type="text" v-model="newclient_lastname">
        </div>
        <div class="item">
          <button class="cursor-pointer animate-pulse bg-transparent hover:bg-gray-900 p-2 rounded-lg border border-blue-500 text-blue-500" @click.prevent="insertUsers()">Cadastrar</button>
        </div>
      </form>
    </div>
    <div class="w-5/6 flex flex-col items-center" v-if="client_page == 2">
      <form class="w-full flex justify-center items-center p-4 border bg-gray-900">
        <span class="text-green-300 pr-2">Buscar</span>
        <input type="text" class="w-2/6 bg-gray-800 border-b bg-opacity-30 text-koromiko-500" v-model="search_clients">
        <button class="search text-gray-300 h-full bg-gray-800 border-b bg-opacity-30" @click.prevent="findClients()"><i class="fal fa-search"></i></button>
      </form>
      <div class="clients w-full overflow-auto">
        <div class="client" v-for="client,index in clients" :key="index">
          <div class="client_id w-1/12">{{client.id}}</div>
          <div class="client_name pr-2">{{client.nome}} {{client.sobrenome}}</div>
          <div class="client_options w-28 flex">
            <div class="text-gray-500 hover:text-gray-300" @click="selectUpdateItem(client.id,client.nome,client.sobrenome)"><i class="fas fa-user-cog"></i></div>
            <div class="text-red-500 hover:text-red-300" @click="delItem(client.id)"><i class="fas fa-user-times"></i></div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="w-5/6 flex flex-col items-center" v-if="client_page == 3">
      <form class="w-full flex justify-center items-center p-4 border bg-gray-900">
        <span class="text-green-300 pr-2">Buscar:</span>
        <input type="text" class="w-2/6 bg-gray-800 border-b bg-opacity-30 text-koromiko-500" v-model="search_clients">
        <button class="search text-gray-300 h-full bg-gray-800 border-b bg-opacity-30" @click.prevent="findClients()"><i class="fal fa-search"></i></button>
      </form>
      <div class="clients w-full overflow-auto">
        <div class="client" v-for="client,index in search_result" :key="index">
          <div class="client_id w-1/12">{{client.id}}</div>
          <div class="client_name pr-2">{{client.nome}} {{client.sobrenome}}</div>
          <div class="client_options w-28 flex">
            <div class="text-gray-500 hover:text-gray-300" @click="selectUpdateItem(client.id,client.nome,client.sobrenome)"><i class="fas fa-user-cog"></i></div>
            <div class="text-red-500 hover:text-red-300" @click="delItem(client.id)"><i class="fas fa-user-times"></i></div>
          </div>
        </div>
      </div>
    </div>

    <div class="w-5/6 flex flex-col justify-center items-center p-8" v-if="client_page == 4">
      <div class="text-4xl h-1/6 flex justify-center items-center">
        <span class="text-green-300">Alteração de Cliente</span>
      </div>
      <form class="w-3/6 border-2 border-green-300 rounded-xl h-5/6 flex flex-col items-center justify-center">
        <div class="item">
          <div class="w-1/4 h-1/5 flex justify-end items-center">
          <span class="text-right">Novo Nome:</span>
          </div>
          <input class="w-1/4 h-1/5 bg-transparent border-b border-green-300 text-blue-500 pl-1" type="text" v-model="updateclient_name">
        </div>
        <div class="item">
          <div class="w-1/4 h-1/5 flex justify-end items-center">
          <span class=" text-right">Novo Sobrenome:</span>
          </div>
          <input class="w-1/4 h-1/5 bg-transparent border-b border-green-300 text-blue-500 pl-1" type="text" v-model="updateclient_lastname">
        </div>
        <div class="item">
          <button class="cursor-pointer animate-pulse bg-transparent hover:bg-gray-900 p-2 rounded-lg border border-blue-500 text-blue-500" @click.prevent="updateItem()">Salvar Alteração</button>
        </div>
      </form>
    </div>

    <div class="w-5/6 flex flex-col justify-center items-center" v-if="client_page == 5">
      <div class="text-green-300 my-2" v-if="insert_status">Cliente Cadastrado com sucesso.</div>
      <div class="text-red-300 my-2" v-else>Todos os campos são obrigatórios.</div>
      <button class="back w-16 h-8 text-gray-400 border border-transparent hover:border-gray-300 rounded-lg" @click="backClient()">Voltar</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Clientes',
  props: {
    changePage: {type: Function, required: true},
  },
  data() {
    return {
      search_clients: '',
      client_page: 1,
      newcliente_name: '',
      newclient_lastname: '',
      clients: null,
      search_result: {},
      insert_status: false,
      actived_client: false,
      update_id: null,
      updateclient_name: '',
      updateclient_lastname: ''
    }
  },
  methods: {
    backClient() {
      this.client_page = 1
      this.newcliente_name = '';
      this.newclient_lastname = '';
    },
    async insertUsers() {
      await fetch('http://localhost:8081/user', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({nome: this.newcliente_name, sobrenome: this.newclient_lastname})
      }).then(res => res.json())
        .then(res => {
          this.insert_status = res.msg
          this.client_page = 5;
        });
    },
    async listUsers() {
      await fetch('http://localhost:8081/users', {
        method: 'get'
      }).then(res => res.json())
        .then(res => {
          this.clients = res;
        });
    },
    async findClients() {
      await fetch('http://localhost:8081/search', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({text: this.search_clients})
      }).then(res => res.json())
        .then(res => {
          this.search_result = res;
          console.log(JSON.stringify(res))
          this.client_page = 3
        });
    },
    async delItem(id) {
      await fetch('http://localhost:8081/deletec', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: id})
      }).then(res => res.json())
        .then(res => {
          this.search_result = res;
          this.client_page = 3
        });
    },
    selectUpdateItem(id,nome,sobrenome) {
      this.update_id = id;
      this.client_page = 4;
      this.updateclient_name = nome;
      this.updateclient_lastname = sobrenome;
    },
    async updateItem() {
      await fetch('http://localhost:8081/updatec', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({id: this.update_id, nome: this.updateclient_name, sobrenome: this.updateclient_lastname})
      }).then(res => res.json())
        .then(res => {
          this.search_result = res;
          this.client_page = 3
        });
    },
    changeClientPage(par) {
      this.actived_client = false;
      if (par == 2) {
        this.actived_client = true;
        this.listUsers();
      }
      this.client_page = par;
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

  .client {
    @apply w-full h-16 flex items-center justify-between bg-gray-800 border-2 shadow-lg text-white hover:bg-gray-900;
  }

  .client_options div {
    @apply w-2/6 cursor-pointer ml-2
  }

  .actived {
    @apply bg-steel-blue-700
  }

  input:focus {
    outline: none;
  }
  
</style>
