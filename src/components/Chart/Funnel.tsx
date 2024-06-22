import { FunnelController, TrapezoidElement } from 'chartjs-chart-funnel';
import { CategoryScale, Chart as ChartJS, LinearScale } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTera } from 'lib';
import { Chart, ChartProps } from 'react-chartjs-2';
import { Plugins } from './interface';
/**
 * @see https://github.com/sgratzl/chartjs-chart-funnel
 */

ChartJS.register(
  FunnelController,
  TrapezoidElement,
  LinearScale,
  CategoryScale,
);
export type ChartFunnelProps = Omit<
  ChartProps<'funnel'>,
  'type' | 'plugins'
> & {
  plugins?: Plugins[];
};
const ChartFunnel = (props: ChartFunnelProps) => {
  const { plugins = [], ...restProps } = props;
  const { is_verify } = useTera();
  const listPlugin: Record<Plugins, any> = {
    'data-labels': ChartDataLabels,
  };

  const mappedPlugins: any[] = plugins.map((plugin) => listPlugin[plugin]);
  if (!is_verify) return null;
  return <Chart type="funnel" plugins={mappedPlugins} {...restProps} />;
};

export default ChartFunnel;
