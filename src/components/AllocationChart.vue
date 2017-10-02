<script>
import { HorizontalBar, mixins } from 'vue-chartjs'
const { reactiveProp } = mixins

export default HorizontalBar.extend({
  mixins: [reactiveProp],
  mounted () {
    this.renderChart(this.chartData, {
      legend: {
        display: false
      }
    })
  }
})
</script>
