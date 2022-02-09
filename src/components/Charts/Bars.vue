<template>
   <div class="w-full h-full ">
    <!-- <p>
        <label><b class="text-white"></b> </label> &nbsp;
        <select @change="updateTheme" class="bg-black text-white">
            <option value="palette1">palette1</option>
            <option value="palette2">palette2</option>
            <option value="palette3">palette3</option>
            <option value="palette4">palette4</option>
            <option value="palette5">palette5</option>
            <option value="palette6">palette6</option>
            <option value="palette7">palette7</option>
            <option value="palette8">palette8</option>
            <option value="palette9">palette9</option>
            <option value="palette10">palette10</option>
        </select>
    </p> -->
     <apexchart class="w-5/6" type="bar" :options="chartOptions_value" :series="series"></apexchart>
   </div>
</template>

<script>

export default {
    props: {
        chartOptions: {
            Type: Object,
            required: true
        },
        series: {
            Type: Object,
            required: true
        }
    },
    data() {
        return {
            chartOptions_value: {
                theme: {
                    palette: 'palette1'
                }
            }
        }
    },
    methods: {
        updateTheme(e) {
            this.chartOptions_value = {
                theme: {
                palette: e.target.value
                }
            }
        }
    },
    mounted() {
        this.chartOptions_value = this.chartOptions
    },
    watch: {
        chartOptions() {
            this.chartOptions_value = this.chartOptions
            this.$forceUpdate()
        }
        // chartOptions() {
        //     this.chartOptions_value = this.chartOptions
        //     this.$forceUpdate()
        // }
    }
};
  
</script>
