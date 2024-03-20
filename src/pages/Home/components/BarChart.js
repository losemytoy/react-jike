//柱状图组件
import * as echarts from 'echarts';
import {useEffect, useRef} from "react";


const BarChart = ({title}) => {
  const chartRef = useRef(null)

  useEffect(() => {
    //保证dom可用
    const chartDom = chartRef.current;
    const myChart = echarts.init(chartDom);

    const option = {
      title:{
        text: title
      },
      xAxis: {
        type: 'category',
        data: ['Vue', 'React', 'Angular']
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          data: [10, 40, 70],
          type: 'bar'
        }
      ]
    };

    option && myChart.setOption(option);
  }, []);

  return <div ref={chartRef} style={{width: '500px', height: '400px'}}></div>
}

export default BarChart