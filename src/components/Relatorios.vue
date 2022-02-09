<template>
   <div class="w-full h-full flex bg-woodsmoke-900">
      <div class="w-1/6 border flex flex-col items-center h-full p-2 border-koromiko-500 relative">
        <div class="text md:text-lg sm:text-md lg:text-xl" :class="{'actived':actived_menu[index]}" v-for="item,index in array_relats" :key="index" @click="changePanelPage(index)"><span>{{item}}</span></div>
        <div class="text md:text-lg sm:text-md lg:text-xl" @click="changePage(0)"><span>Voltar</span></div>
      </div>
     <Bars class="w-5/6 h-full flex justify-center items-center" type="bar" :chartOptions="chartOptions_day" :series="series_day" v-if="panel_page == 0" />
     <Bars class="w-5/6 h-full flex justify-center items-center" type="bar" :chartOptions="chartOptions_week" :series="series_week" v-if="panel_page == 1" />
     <Bars class="w-5/6 h-full flex justify-center items-center" type="bar" :chartOptions="chartOptions_monthly" :series="series_monthly" v-if="panel_page == 2" />
     <div class="w-5/6 h-full flex flex-col justify-between items-center" v-if="panel_page == 3">
      <div class="w-2/6 h-20 flex justify-center gap-4">
        <input class=" h-2/6 bg-woodsmoke-900 border text-white border-koromiko-500" type="date" v-model="custom_date">
      </div>
     <Bars class="w-5/6 h-full flex justify-center items-center" type="bar" :chartOptions="chartOptions_custom" :series="series_custom" v-if="showCustomGraph" />
     </div>
     <div class="w-5/6 h-full" v-if="panel_page == 4"></div>
   </div>
</template>

<script>
import Bars from './Charts/Bars.vue'

export default {
    components: {
      Bars
    },
    props: {
      changePage: {type: Function, required: true},
    },
    data() {
      return {
        panel_page: 4,
        custom_date: '',
        showCustomGraph: false,
        actived_menu: [],
        array_relats: ['Dia','Semana','Mês','Outro'],
        orders_products_day: {},
        chartOptions_day: {
          title: { text: 'Saídas do Dia', align: 'center', margin: 10, offsetX: 0,offsetY: 0, floating: false, style: { fontSize:  '18px', fontWeight:  'normal', fontFamily:  undefined, color:  '#FDBC63'}, },
          fill: { colors: ['#FDBC63'] },
          chart: { zoom: {enabled: true }, id: 'Saídas do Dia', background: '#0a0a0a'},
          xaxis: { labels: { style: { colors: ['#FFF'] } }, categories: [] },
          yaxis: { labels: { style: { colors: ['#FFF'] } } }
        },
        series_day: [{ name: 'Saídas do Dia', data: [] }],

        orders_products_week: {},
        chartOptions_week: { 
          export: { svg: { filename: undefined, }, png: { filename: undefined } },
          title: { text: 'Saídas da Semana', align: 'center', margin: 10, offsetX: 0,offsetY: 0, floating: false, style: { fontSize:  '18px', fontWeight:  'normal', fontFamily:  undefined, color:  '#FDBC63'}, },
          fill: { colors: ['#FDBC63'] },
          chart: { id: 'Saídas da Semana', background: '#0a0a0a'},
          xaxis: { labels: { style: { colors: ['#FFF'] } }, categories: [] },
          yaxis: { labels: { style: { colors: ['#FFF'] } } }
        },
        series_week: [{ name: 'Saídas da Semana', data: [] }],

        orders_products_monthly: {},
        chartOptions_monthly: { 
          export: { svg: { filename: undefined, }, png: { filename: undefined } },
          title: { text: 'Saídas do Mês', align: 'center', margin: 10, offsetX: 0,offsetY: 0, floating: false, style: { fontSize:  '18px', fontWeight:  'normal', fontFamily:  undefined, color:  '#FDBC63'}, },
          fill: { colors: ['#FDBC63'] },
          chart: { id: 'Saídas do Mês', background: '#0a0a0a'},
          xaxis: { labels: { style: { colors: ['#FFF'] } }, categories: [] },
          yaxis: { labels: { style: { colors: ['#FFF'] } } }
        },
        series_monthly: [{ name: 'Saídas do Mês', data: [] }],

        orders_products_custom: {},
        chartOptions_custom: { 
          export: { svg: { filename: undefined, }, png: { filename: undefined } },
          title: { text: 'Saídas doDia', align: 'center', margin: 10, offsetX: 0,offsetY: 0, floating: false, style: { fontSize:  '18px', fontWeight:  'normal', fontFamily:  undefined, color:  '#FDBC63'}, },
          fill: { colors: ['#FDBC63'] },
          chart: { id: 'Saídas do Dia', background: '#0a0a0a'},
          xaxis: { labels: { style: { colors: ['#FFF'] } }, categories: [] },
          yaxis: { labels: { style: { colors: ['#FFF'] } } }
        },
        series_custom: [{ name: 'Saídas do Dia', data: [] }]

      }
    },
    methods: {
      changePanelPage(page) {
        this.panel_page = page;
        this.actived_menu = [];
        this.actived_menu[page] = true;
        this.$forceUpdate();
        // console.log(this.chartOptions_day.xaxis.categories)

      },
      dayOrders() {
        fetch('http://localhost:8081/dayorders', {
          method: 'get'
        })
        .then(res => res.json())
        .then(res => {
          this.setDataDay(res);
        });
      },
      weekOrders() {
        fetch('http://localhost:8081/weekorders', {
          method: 'get'
        })
        .then(res => res.json())
        .then(res => {
          this.setDataWeek(res);
        });
      },
      monthlyOrders() {
        fetch('http://localhost:8081/monthlyorders', {
          method: 'get'
        })
        .then(res => res.json())
        .then(res => {
          this.setDataMonthly(res);
        });
      },
      setDataDay(res) {
        let total = 0
        this.orders_products_day = {};
        for (let item of res) {
          if (item.products) {
            for (let product of JSON.parse(item.products)){
              total += (parseInt(product.qtd) * parseInt(product.valor))
              this.orders_products_day[product.nome] = parseInt(this.orders_products_day[product.nome] || 0) + parseInt(product.qtd)
            }
          }
        }
        for (var i = 0; i < Object.keys(this.orders_products_day).length; i++) {
          this.chartOptions_day.xaxis.categories[i] = Object.keys(this.orders_products_day)[i];
          this.chartOptions_day.xaxis.labels.style.colors[i] = '#FFF';
          this.series_day[0].data[i] = Object.values(this.orders_products_day)[i];
        }
        this.chartOptions_day.title.text += ' - ' + new Date().toLocaleDateString() + ' ( Total: R$' + total + ' )'
        // this.chartOptions_day.toolbar.export.png.filename = 'Saidas' +  ' - ' + new Date().toLocaleDateString() 
        // this.chartOptions_day.toolbar.export.svg.filename = 'Saidas' +  ' - ' + new Date().toLocaleDateString() 
        this.$forceUpdate();
      },
      setDataWeek(res) {
        let total = 0
        this.orders_products_week = {};
        for (let item of res) {
          if (item.products) {
            for (let product of JSON.parse(item.products)){
              total += (parseInt(product.qtd) * parseInt(product.valor))
              this.orders_products_week[product.nome] = parseInt(this.orders_products_week[product.nome] || 0) + parseInt(product.qtd)
            }
          }
        }
        for (var i = 0; i < Object.keys(this.orders_products_week).length; i++) {
          this.chartOptions_week.xaxis.categories[i] = Object.keys(this.orders_products_week)[i];
          this.chartOptions_week.xaxis.labels.style.colors[i] = '#FFF';
          this.series_week[0].data[i] = Object.values(this.orders_products_week)[i];
        }
        this.chartOptions_week.title.text += ' - ' + new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-7).toLocaleDateString() + ' à ' + new Date().toLocaleDateString() + ' ( Total: R$' + total + ' )'
        this.$forceUpdate();
      },
      setDataMonthly(res) {
        let total = 0
        this.orders_products_monthly = {};
        for (let item of res) {
          if (item.products) {
            for (let product of JSON.parse(item.products)){
              total += (parseInt(product.qtd) * parseInt(product.valor))
              this.orders_products_monthly[product.nome] = parseInt(this.orders_products_monthly[product.nome] || 0) + parseInt(product.qtd)
            }
          }
        }
        for (var i = 0; i < Object.keys(this.orders_products_monthly).length; i++) {
          this.chartOptions_monthly.xaxis.categories[i] = Object.keys(this.orders_products_monthly)[i];
          this.chartOptions_monthly.xaxis.labels.style.colors[i] = '#FFF';
          this.series_monthly[0].data[i] = Object.values(this.orders_products_monthly)[i];
        }
        this.chartOptions_monthly.title.text += ' - ' + new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate()-30).toLocaleDateString() + ' à ' + new Date().toLocaleDateString() + ' ( Total: R$' + total + ' )'
        this.$forceUpdate();
      },
      setCustomDay(res) {
        let total = 0
        this.orders_products_custom = {};
        if (!res[0]) {
          return
        }
        for (let item of res) {
          if (item.products) {
            for (let product of JSON.parse(item.products)){
              total += (parseInt(product.qtd) * parseInt(product.valor))
              this.orders_products_custom[product.nome] = parseInt(this.orders_products_custom[product.nome] || 0) + parseInt(product.qtd)
            }
          }
        }
        for (var i = 0; i < Object.keys(this.orders_products_custom).length; i++) {
          this.chartOptions_custom.xaxis.categories[i] = Object.keys(this.orders_products_custom)[i];
          this.chartOptions_custom.xaxis.labels.style.colors[i] = '#FFF';
          this.series_custom[0].data[i] = Object.values(this.orders_products_custom)[i];
        }
        this.chartOptions_custom.title.text =  'Saídas do Dia - ' + this.custom_date + ' ( Total: R$' + total + ' )'
        this.showCustomGraph = true
        this.$forceUpdate();
      },
      filterDay(date) {
        fetch('http://localhost:8081/customorders', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({date: date})
      }).then(res => res.json())
        .then(res => {
          this.setCustomDay(res)
        })
      }
    },
    mounted() {
      this.dayOrders();
      this.weekOrders();
      this.monthlyOrders();
    },
    created() {
      this.$forceUpdate()
    },
    watch: {
      custom_date() {
        this.showCustomGraph = false;
        this.filterDay(this.custom_date);
        this.$forceUpdate();
      }
    }
};

</script>

<style scoped>
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

  .actived {
    text-shadow: none;
    @apply bg-koromiko-500 text-woodsmoke-500 font-bold
  }
  ::-webkit-calendar-picker-indicator {
    margin: 0;
      filter: invert(1);
  }
</style>
