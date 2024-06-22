import {
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from 'chart.js';
import { useTera } from 'components/TeraProvider';
import { forwardRef } from 'react';
import { Bar, ChartProps } from 'react-chartjs-2';
import { Plugins } from './interface';
import { Options } from 'chartjs-plugin-datalabels/types/options';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

export type ChartBarProps = Omit<
  ChartProps<'bar'>,
  'type' | 'plugins' | 'options'
> & {
  plugins?: Plugins[];
  options?: ChartOptions<'bar'> & Options;
};

const ChartBar = forwardRef<ChartJS<'bar'>, ChartBarProps>((props, ref) => {
  const { plugins = [], ...restProps } = props;
  const { is_verify } = useTera();
  const listPlugin: Record<Plugins, any> = {
    'data-labels': ChartDataLabels,
  };

  const mappedPlugins = plugins.map((plugin) => listPlugin[plugin]);
  if (!is_verify) return null;

  return <Bar ref={ref} plugins={mappedPlugins} {...restProps} />;
});

export default ChartBar;
