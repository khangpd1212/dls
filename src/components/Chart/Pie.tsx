import {
  ArcElement,
  Chart as ChartJS,
  ChartOptions,
  Legend,
  Tooltip,
} from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import { useTera } from 'components/TeraProvider';

import { ChartProps, Pie } from 'react-chartjs-2';
import { Plugins } from './interface';
import { forwardRef } from 'react';
import { Options } from 'chartjs-plugin-datalabels/types/options';

ChartJS.register(ArcElement, Tooltip, Legend);

export type ChartPieProps = Omit<
  ChartProps<'pie'>,
  'type' | 'plugins' | 'options'
> & {
  plugins?: Plugins[];
  options?: ChartOptions<'pie'> & Options;
};

const ChartPie = forwardRef<ChartJS<'pie'>, ChartPieProps>((props, ref) => {
  const { plugins = [], ...restProps } = props;
  const { is_verify } = useTera();
  const listPlugin: Record<Plugins, any> = {
    'data-labels': ChartDataLabels,
  };
  const mappedPlugins: any[] = plugins.map((plugin) => listPlugin[plugin]);
  if (!is_verify) return null;

  return <Pie plugins={mappedPlugins} ref={ref} {...restProps} />;
});

export default ChartPie;
