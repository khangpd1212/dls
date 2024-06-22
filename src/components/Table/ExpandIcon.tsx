import { MinusOutlined, PlusOutlined } from 'icons';
import { RenderExpandIconProps } from 'rc-table/lib/interface';

function renderExpandIcon<RecordType>({
  onExpand,
  record,
  expanded,
  expandable,
}: Omit<RenderExpandIconProps<RecordType>, 'prefixCls'>) {
  const renderIcon = expanded ? (
    <MinusOutlined className="stroke-2" />
  ) : (
    <PlusOutlined className="stroke-2" />
  );
  return (
    expandable && (
      <button
        type="button"
        onClick={(e) => {
          onExpand(record, e!);
          e.stopPropagation();
        }}
        className="relative w-4 h-4 text-blue-500 select-none"
        aria-expanded={expanded}
      >
        {renderIcon}
      </button>
    )
  );
}

export default renderExpandIcon;
