import {
  CategoryScale,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  LineElement,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  TimeScale,
} from 'chart.js';
import { useTera } from 'components/TeraProvider';

import ChartDataLabels from 'chartjs-plugin-datalabels';
import { ChartProps, Line } from 'react-chartjs-2';
import { Plugins } from './interface';
import { forwardRef } from 'react';
import { Options } from 'chartjs-plugin-datalabels/types/options';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
);

export type ChartLineProps = Omit<
  ChartProps<'line'>,
  'type' | 'plugins' | 'options'
> & {
  plugins?: Plugins[];
  options?: ChartOptions<'line'> & Options;
};

const ChartLine = forwardRef<ChartJS<'line'>, ChartLineProps>(
  (props: ChartLineProps, ref) => {
    const { plugins = [], ...restProps } = props;
    const { is_verify } = useTera();
    const listPlugin: Record<Plugins, any> = {
      'data-labels': ChartDataLabels,
    };
    const mappedPlugins = plugins.map((plugin) => listPlugin[plugin]);
    if (!is_verify) return null;

    return <Line plugins={mappedPlugins} ref={ref} {...restProps} />;
  },
);

export default ChartLine;
