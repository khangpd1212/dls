import { useTera } from 'lib';
import { useState } from 'react';
import GaugeComponent from 'react-gauge-component';
import {
  CategoryScale,
  ChartDataset,
  Chart as ChartJS,
  ChartOptions,
  LinearScale,
  Plugin,
} from 'chart.js';
import { GaugeComponentProps } from 'react-gauge-component/dist/lib/GaugeComponent/types/GaugeComponentProps';
import GaugeChartjs, {
  GaugeController,
  GaugeControllerChartOptions,
  ValueLabelOptions,
} from 'chartjs-gauge-v3';
import { Chart, ChartProps } from 'react-chartjs-2';
import { Plugins } from './interface';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { Options } from 'chartjs-plugin-datalabels/types/options';
// const GaugeNeedleChart: Plugin<'doughnut'> = {
//   id: 'gaugeNeedle',
//   afterDatasetDraw(chart) {
//     const {
//       ctx,
//       data,
//       chartArea: { left, right },
//     } = chart;
//     ctx.save();
//     const datasets: ChartDataset<any> = data.datasets[0];
//     let needleValue = datasets.needleValue;
//     const dataTotal = datasets.data.reduce((a, b) => a + b, 0);
//     if (needleValue > dataTotal) needleValue = dataTotal;
//     const angle = Math.PI + (1 / dataTotal) * needleValue * Math.PI;
//     const metasets = chart.getDatasetMeta(0);
//     if (!metasets) return;
//     const cx = metasets.data[0].x;
//     const cy = metasets.data[0].y;
//     const outerRadius = (metasets.data[0] as any).outerRadius;
//     // needle
//     ctx.translate(cx, cy);
//     ctx.rotate(angle);
//     ctx.beginPath();
//     ctx.moveTo(0, -10);
//     ctx.lineTo(outerRadius - 300, 0);
//     ctx.lineTo(0, 10);
//     ctx.fillStyle = '#F05252';
//     ctx.fill();

//     // needle dot outside
//     ctx.translate(-cx, -cy);
//     ctx.beginPath();
//     ctx.arc(cx, cy, 30, 0, 10);
//     ctx.fill();

//     // needle dot inside
//     ctx.fillStyle = 'white';
//     ctx.beginPath();
//     ctx.arc(cx, cy, 20, 0, Math.PI * 2);
//     ctx.fill();

//     // title start and end
//     // ctx.fillRect(cx, cy, 400, 1);
//     ctx.font = 'sans-serif 24px';
//     ctx.fillStyle = 'black';
//     ctx.textAlign = 'center';
//     ctx.fillText('Danger', left, cy + 5);
//     // ctx.fillText('Success', right - 3 * left, x * (3 / 2));

//     ctx.restore();
//   },
// };

// /**
//  * @see https://github.com/antoniolago/react-gauge-component
//  */

// export type ChartGaugeProps = GaugeComponentProps;

// const ChartGauge = ({ ...restProps }: ChartGaugeProps) => {
//   const { is_verify } = useTera();
//   if (!is_verify) return null;
//   const optionsDoughnutChart: any = {
//     responsive: true,
//     aspectRatio: 1.5,
//     rotation: -90,
//     circumference: 180,
//     cutout: '90%',
//     borderRadius: 8,
//   };
//   const data = {
//     labels: ['Red', 'Blue', 'Yellow'],
//     datasets: [
//       {
//         needleValue: 300,
//         label: 'My First Dataset',
//         data: [300, 50, 100],
//         backgroundColor: [
//           'rgb(255, 99, 132)',
//           'rgb(54, 162, 235)',
//           'rgb(255, 205, 86)',
//         ],
//         hoverOffset: 4,
//       },
//     ],
//   };
//   return (
//     <Chart
//       type="doughnut"
//       data={data}
//       options={optionsDoughnutChart}
//       plugins={[GaugeNeedleChart]}
//     />
//   );
// };

// export default ChartGauge;
////////////////////////////////////////////////////////////////
/**
 * @see https://github.com/antoniolago/react-gauge-component
 */
// export type ChartGaugeProps = GaugeComponentProps;

// const ChartGauge = ({ type = 'radial', ...restProps }: ChartGaugeProps) => {
//   // const [forceRender, setForceRender] = useState(false);
//   // useEffect(() => {}, []);
//   const { is_verify } = useTera();
//   if (!is_verify) return null;

//   return <GaugeComponent type={type} {...restProps} />;
// };

// export default ChartGauge;
///////////////////////////////////////////////////////////////
ChartJS.register(GaugeController);
export type ChartGaugeProps = Omit<ChartProps<'gauge'>, 'type' | 'plugins'> & {
  plugins?: Plugins[];
};

const ChartGauge = ({ plugins = [], ...restProps }: ChartGaugeProps) => {
  const listPlugin: Record<Plugins, any> = {
    'data-labels': ChartDataLabels,
  };
  const mappedPlugins: any[] = plugins.map((plugin) => listPlugin[plugin]);
  const { is_verify } = useTera();
  if (!is_verify) return null;

  return <Chart type="gauge" plugins={mappedPlugins} {...restProps} />;
};

export default ChartGauge;
