import { extendTailwindMerge } from 'tailwind-merge';

export const customTwMerge = extendTailwindMerge({
  classGroups: {
    rounded: ['rounded-xsm'],
    shadow: ['shadow-xsm', 'shadow-smd'],
    'font-size': ['text-xxs', 'text-xss'],
  },
});
