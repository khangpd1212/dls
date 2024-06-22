export type PresetColors =
  | 'gray01'
  | 'gray02'
  | 'gray03'
  | 'gray04'
  | 'green01'
  | 'green02'
  | 'green03'
  | 'green04'
  | 'green05'
  | 'green06'
  | 'green07'
  | 'green08'
  | 'green09'
  | 'blue01'
  | 'blue02'
  | 'blue03'
  | 'blue03'
  | 'blue04'
  | 'blue05'
  | 'blue06'
  | 'blue07'
  | 'blue08'
  | 'blue09'
  | 'red01'
  | 'red02'
  | 'red03'
  | 'red04'
  | 'red05'
  | 'red06'
  | 'red07'
  | 'red08'
  | 'red09'
  | 'yellow01'
  | 'yellow02'
  | 'yellow03'
  | 'yellow04'
  | 'yellow05'
  | 'yellow06'
  | 'yellow07'
  | 'yellow08'
  | 'yellow09'
  | 'indigo01'
  | 'indigo02'
  | 'indigo03'
  | 'indigo04'
  | 'indigo05'
  | 'indigo06'
  | 'indigo07'
  | 'indigo08'
  | 'indigo09'
  | 'purple01'
  | 'purple02'
  | 'purple03'
  | 'purple04'
  | 'purple05'
  | 'purple06'
  | 'purple07'
  | 'purple08'
  | 'purple09'
  | 'pink01'
  | 'pink02'
  | 'pink03'
  | 'pink04'
  | 'pink05'
  | 'pink06'
  | 'pink07'
  | 'pink08'
  | 'pink09';

export const bgVariants: Record<PresetColors, string> = {
  gray01: 'bg-gray-100 text-gray-600',
  gray02: 'bg-gray-200 text-gray-800',
  gray03: 'bg-gray-500 text-gray-50',
  gray04: 'bg-gray-400 text-gray-800',
  green01: 'bg-green-100 text-green-900',
  green02: 'bg-green-300 text-green-900',
  green03: 'bg-green-100 text-green-600',
  green04: 'bg-green-100 text-green-400',
  green05: 'bg-green-200 text-green-700',
  green06: 'bg-green-500 text-green-50',
  green07: 'bg-green-500 text-green-300',
  green08: 'bg-green-500 text-green-800',
  green09: 'bg-green-800 text-green-300',
  blue01: 'bg-blue-100 text-blue-900',
  blue02: 'bg-blue-300 text-blue-900',
  blue03: 'bg-blue-100 text-blue-600',
  blue04: 'bg-blue-100 text-blue-400',
  blue05: 'bg-blue-200 text-blue-700',
  blue06: 'bg-blue-500 text-blue-50',
  blue07: 'bg-blue-500 text-blue-300',
  blue08: 'bg-blue-500 text-blue-800',
  blue09: 'bg-blue-800 text-blue-300',
  red01: 'bg-red-100 text-red-900',
  red02: 'bg-red-300 text-red-900',
  red03: 'bg-red-100 text-red-600',
  red04: 'bg-red-100 text-red-400',
  red05: 'bg-red-200 text-red-700',
  red06: 'bg-red-500 text-red-50',
  red07: 'bg-red-500 text-red-300',
  red08: 'bg-red-500 text-red-800',
  red09: 'bg-red-800 text-red-300',
  yellow01: 'bg-yellow-100 text-yellow-900',
  yellow02: 'bg-yellow-300 text-yellow-900',
  yellow03: 'bg-yellow-100 text-yellow-600',
  yellow04: 'bg-yellow-100 text-yellow-400',
  yellow05: 'bg-yellow-200 text-yellow-700',
  yellow06: 'bg-yellow-500 text-yellow-50',
  yellow07: 'bg-yellow-500 text-yellow-300',
  yellow08: 'bg-yellow-500 text-yellow-800',
  yellow09: 'bg-yellow-800 text-yellow-300',
  indigo01: 'bg-indigo-100 text-indigo-900',
  indigo02: 'bg-indigo-300 text-indigo-900',
  indigo03: 'bg-indigo-100 text-indigo-600',
  indigo04: 'bg-indigo-100 text-indigo-400',
  indigo05: 'bg-indigo-200 text-indigo-700',
  indigo06: 'bg-indigo-500 text-indigo-50',
  indigo07: 'bg-indigo-500 text-indigo-300',
  indigo08: 'bg-indigo-500 text-indigo-800',
  indigo09: 'bg-indigo-800 text-indigo-300',
  purple01: 'bg-purple-100 text-purple-900',
  purple02: 'bg-purple-100 text-purple-900',
  purple03: 'bg-purple-100 text-purple-900',
  purple04: 'bg-purple-100 text-purple-900',
  purple05: 'bg-purple-100 text-purple-900',
  purple06: 'bg-purple-100 text-purple-900',
  purple07: 'bg-purple-500 text-purple-300',
  purple08: 'bg-purple-500 text-purple-800',
  purple09: 'bg-purple-800 text-purple-300',
  pink01: 'bg-pink-100 text-pink-900',
  pink02: 'bg-pink-300 text-pink-900',
  pink03: 'bg-pink-100 text-pink-600',
  pink04: 'bg-pink-100 text-pink-400',
  pink05: 'bg-pink-200 text-pink-700',
  pink06: 'bg-pink-500 text-pink-50',
  pink07: 'bg-pink-500 text-pink-300',
  pink08: 'bg-pink-500 text-pink-800',
  pink09: 'bg-pink-800 text-pink-300',
};
export const borderVariants: Record<PresetColors, string> = {
  gray01: 'border-gray-600',
  gray02: 'border-gray-800',
  gray03: 'border-gray-800',
  gray04: 'border-gray-800',
  green01: 'border-green-900',
  green02: 'border-green-900',
  green03: 'border-green-600',
  green04: 'border-green-400',
  green05: 'border-green-700',
  green06: 'border-green-500',
  green07: 'border-green-300',
  green08: 'border-green-800',
  green09: 'border-green-300',
  blue01: 'border-blue-900',
  blue02: 'border-blue-900',
  blue03: 'border-blue-600',
  blue04: 'border-blue-400',
  blue05: 'border-blue-700',
  blue06: 'border-blue-50',
  blue07: 'border-blue-300',
  blue08: 'border-blue-800',
  blue09: 'border-blue-300',
  red01: 'border-red-900',
  red02: 'border-red-900',
  red03: 'border-red-600',
  red04: 'border-red-400',
  red05: 'border-red-700',
  red06: 'border-red-50',
  red07: 'border-red-300',
  red08: 'border-red-800',
  red09: 'border-red-300',
  yellow01: 'border-yellow-900',
  yellow02: 'border-yellow-900',
  yellow03: 'border-yellow-600',
  yellow04: 'border-yellow-400',
  yellow05: 'border-yellow-700',
  yellow06: 'border-yellow-50',
  yellow07: 'border-yellow-300',
  yellow08: 'border-yellow-800',
  yellow09: 'border-yellow-300',
  indigo01: 'border-indigo-900',
  indigo02: 'border-indigo-900',
  indigo03: 'border-indigo-600',
  indigo04: 'border-indigo-400',
  indigo05: 'border-indigo-700',
  indigo06: 'border-indigo-50',
  indigo07: 'border-indigo-300',
  indigo08: 'border-indigo-800',
  indigo09: 'border-indigo-300',
  purple01: 'border-purple-900',
  purple02: 'border-purple-900',
  purple03: 'border-purple-600',
  purple04: 'border-purple-400',
  purple05: 'border-purple-700',
  purple06: 'border-purple-50',
  purple07: 'border-purple-300',
  purple08: 'border-purple-800',
  purple09: 'border-purple-300',
  pink01: 'border-pink-900',
  pink02: 'border-pink-900',
  pink03: 'border-pink-600',
  pink04: 'border-pink-400',
  pink05: 'border-pink-700',
  pink06: 'border-pink-50',
  pink07: 'border-pink-300',
  pink08: 'border-pink-800',
  pink09: 'border-pink-300',
};
