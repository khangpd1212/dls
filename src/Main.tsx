import { yupResolver } from '@hookform/resolvers/yup';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { DATE_FORMAT } from 'common/const';
import Avatar from 'components/Avatar';
import Badge from 'components/Badge';
import Breadcrumbs, { ItemType } from 'components/Breadcrumbs';
import { MonthCalendar } from 'components/Calendar';
import ChartBar from 'components/Chart/Bar';
import ChartFunnel from 'components/Chart/Funnel';
import ChartGauge from 'components/Chart/Gauge';
import Checkbox from 'components/Checkbox';
import Accordion from 'components/Collapse';
import { Col, Row } from 'components/Grid';
import Image from 'components/Image';
import InputNumberClone from 'components/Input/InputNumberClone';
import InputPassword from 'components/Input/InputPassword';
import ModalWindow from 'components/Modal/ModalWindow';
import notification from 'components/Notification';
import TeraOrgChart from 'components/OrgChart';
import Pagination, { PaginationProps } from 'components/Pagination';
import Popover from 'components/Popover';
import Skeleton from 'components/Skeleton';
import Steps from 'components/Steps';
import Tabs from 'components/Tabs';
import TextArea from 'components/TextArea';
import TimelineTest from 'components/Timeline/index2';
import Tooltip from 'components/Tooltip';
import { isEmpty } from 'lodash';
import moment from 'moment';
import React, { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import 'styles/main.scss';
import { customTwMerge } from 'tailwind-merge.config';
import * as yup from 'yup';
import {
  AnyObject,
  Button,
  CakeOutlined,
  ChartBarProps,
  ChartDoughnut,
  CheckboxOptionType,
  CheckboxValueType,
  ColumnsType,
  DatePicker,
  Description,
  Drawer,
  Dropdown,
  EyeOutlined,
  Form,
  FormItem,
  Icon,
  Input,
  InputNumber,
  Modal,
  OptionProps,
  Progress,
  Radio,
  RangePicker,
  Search,
  Select,
  Spin,
  Table,
  Tag,
  TreeSelect,
  XMarkOutlined,
} from './lib';
import { DataNode } from 'components/TreeSelect/interface';
import Tree from 'components/Tree';

interface MainComponentProps {}
type IForm = {
  example: boolean;
  exampleRequired: string[];
};
type FormTable = {
  age: number;
  name: string;
};
const schema = yup
  .object()
  .shape({
    example1: yup.string(),
    example: yup.number().required('Vui lòng nhập trường này'),
    exampleRequired: yup.array().required('Vui lòng nhập trường này'),
    radio: yup.string(),
  })
  .required();
const MainComponent: React.FC<MainComponentProps> = () => {
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [valueSearch, setValueSearch] = useState(null);
  const [selectedValue, setSelectedValue] = useState<any>([
    {
      label: 'dsadsssssssssssssssssssssssssssssssssssssssssssssssssss',
      value: 'dsad',
    },
  ]);

  const [radio, setRadio] = useState('1');
  const [openDrawer, setOpenDrawer] = useState(false);
  const [activeKey, setActiveKey] = useState(2);

  const {
    handleSubmit,
    control,
    register: registerBasic,
    watch,
    setValue,
    reset: resetBasic,
  } = useForm();
  const {
    getValues,
    formState: { errors },
    register,
    reset,
  } = useForm<FormTable>();

  // useEffect(() => setValue('example', 2), []);

  // useEffect(() => {
  //   resetBasic({ example: true });
  // }, []);
  const onItemClick = (key: string[]) => {
    console.log('itemClickCollapse:', key);
  };

  const [temp2, setTemp2] = useState([]);

  const onChangePagi: PaginationProps['onChange'] = (page, pageSize) => {
    setPagination(page);
  };

  useEffect(() => {
    setTemp2([
      {
        value: 1,
        label: 'đasds',
      },
      {
        value: 2,
        label: 'dasd',
        labelDisplay: <Icon type="archive-box" />,
      },
      {
        value: 3,
        label: 'dasd',
        labelDisplay: <Icon type="archive-box" />,
      },
      {
        value: 4,
        label: 'dasddsaddasdasdadasdasds',
      },
      {
        value: 5,
        label: 'dasddsdsdadasdasdasdadasd',
      },
      {
        value: 6,
        label:
          'dasddsadsadasdasdasdasdadassssssssssssssssssssssssssssssssssssssssssssssssssssssss',
      },
    ]);
  }, []);
  const [pagination, setPagination] = useState(1);

  const instance = axios.create({
    headers: {
      'Content-Type': 'application/json',
      Authorization:
        'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJhdWQiOiIxIiwianRpIjoiYzQxM2EyZTVkNzRmNGExNGZlNjcwODFiMmYyN2VkYzEwMTQ0Y2RiMDBiMjQ1NmY2OWNkOGYyM2FjNjk0NjQyOTIyODllOWUyOGQxZjQ3MmIiLCJpYXQiOjE2OTcwODU5ODgsIm5iZiI6MTY5NzA4NTk4OCwiZXhwIjoxNzEyODk3MTg4LCJzdWIiOiI3NzQiLCJzY29wZXMiOltdfQ.0sZ44ZLooPiMCFbSjqBBLZ3fgFOqeKrNxZ2kZWHcN7m3SbUAn9P6qrDin1h6W8XQpSlnQW6S94fXD3OXuH3Nwprf1NGGfEP4DXLy6bnLfmPYlb-0oHAGi0oNEZPxkU-tTRCZorNIlQntEPC4Qt_pxMxbmhaJzVq51dEAPxXFzRRQ1cVsXSiR22DSLOF94pt0jLNN_-vFsTXlII_23HqtRF1VFLgVEUOCecVvI8_oyKNkc_xV4rfh5jWnHiHZiIBiNaPtWrsUy_dk8NDjklihb0wajmp-bW5O6iqJEVwAIMjFnYEXoJN0WrXQOxGtI66WdcZX8Y6_lQDOjT8Va_rCmOwCwsS-X4MAXrrwL-4gGC9q1XZrfiknbsq8vZApz5pHradFIStWccGCN7BUjqyLkchL96S-nctz8QKxzTcd9MqiAoYefg3cJDp80OZP9JvZPfU0yDNBwmYt7lC67nLOlKfX5OKZJB5eYJzBzoGRlOVnYFKeql-dJXBcP5kKuilAEcQdOrMC-H4NEO58kKxT3IOe5Y_t-6u7X6HKk1QlsPOW5MNsIW-N3kSYwuqduSKdatzRKq14vux-rFEIAQhDpBTkBfZ7IeoEQ9YTwwttqxpwlFIShSpiq7r7TS9noSarpxw2O8lM7XNTlkImjUjmN3mzZP4aiEE4Rq6eTn-VPUk',
    },
  });

  const [currentMonth, setCurrentMonth] = useState(
    moment().format(DATE_FORMAT),
  );
  const currentMoment = moment(currentMonth, DATE_FORMAT);
  const lastMonth = currentMoment.clone().subtract(1, 'months').month() + 1;
  const month = currentMoment.clone().month() + 1;
  const year = currentMoment.clone().year();
  const lastYear =
    month === 1 ? currentMoment.clone().subtract(1, 'years').year() : year;
  const { data: calendarLast } = useQuery<any>(
    ['get-list-calendar-last', lastMonth, lastYear],
    () => {
      return instance
        .get(
          `https://hrm-api.teravn.com/api/device/days-in-month?month=${lastMonth}&year=${lastYear}`,
        )
        .then((response) => response.data?.data);
    },
  );

  const { data: calendarCurrent } = useQuery<any>(
    ['get-list-calendar-current', month, year],
    () => {
      return instance
        .get(
          `https://hrm-api.teravn.com/api/device/days-in-month?month=${month}&year=${year}`,
        )
        .then((response) => response.data?.data);
    },
  );
  const { data: calendarNext } = useQuery<any>(
    ['get-list-calendar-next', month + 1, year],
    () => {
      return instance
        .get(
          `https://hrm-api.teravn.com/api/device/days-in-month?month=${
            month + 1
          }&year=${year}`,
        )
        .then((response) => response.data?.data);
    },
  );

  const items: ItemType[] = [
    {
      title: <a>Home</a>,
      onClick: () => console.log(2),
    },
    {
      title: <a href="#/home/detail">Detail</a>,
    },
    {
      title: <a href="#/home/detail2">Detail2</a>,
      children: [
        {
          title: <a href="#/home/detail4">Detail3</a>,
        },
        {
          title: <a href="#/home/detail3">Detail3</a>,
        },
      ],
    },
    {
      title: 'detail3',
    },
  ];
  const onSubmit = (data) => {
    console.log(data);
  };
  const isEditing = (record: any) => record.id === editingKey;

  const columns: ColumnsType = useMemo(
    () => [
      {
        title: 'title',
        dataIndex: 'title',
        sorter: true,
      },
      {
        title: 'value',
        dataIndex: 'value',
      },
      {
        title: 'a',
        dataIndex: 'a',
      },
      {
        title: 'b',
        dataIndex: 'b',
      },
      {
        title: 'c',
        dataIndex: 'c',
      },
      // {
      //   title: '',
      //   width: 100,
      //   render: (record: any) => {
      //     const editable = isEditing(record);
      //     return editable ? (
      //       <span>
      //         <Button onClick={() => save(record.id)}>Save</Button>
      //         <Button onClick={cancel}>Cancel</Button>
      //       </span>
      //     ) : (
      //       <Button disabled={editingKey !== ''} onClick={() => edit(record)}>
      //         Edit
      //       </Button>
      //     );
      //   },
      // },
    ],
    [isEditing],
  );
  const [data, setData] = useState([]);
  const EditableCell: React.FC<any> = ({
    editing,
    dataIndex,
    title,
    inputType,
    record,
    index,
    children,
    ...restProps
  }) => {
    const inputNode =
      inputType === 'number' ? (
        <Input type="number" {...register(dataIndex)} />
      ) : (
        <Input {...register(dataIndex)} />
      );

    return (
      <td {...restProps}>
        {editing ? (
          <FormItem
            style={{ margin: 0 }}
            isError={errors[dataIndex]}
            messages={`Please Input ${title}!`}
          >
            {inputNode}
          </FormItem>
        ) : (
          children
        )}
      </td>
    );
  };
  const [editingKey, setEditingKey] = useState('');

  const edit = (record: Partial<any> & { key: React.Key }) => {
    reset({ age: null, name: '', ...record });
    setEditingKey(record.id);
  };
  const cancel = () => {
    setEditingKey('');
  };

  const save = async (id: number) => {
    try {
      const row = getValues();

      const newData = [...data];
      const index = newData.findIndex((item) => id === item.id);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey('');
      } else {
        newData.push({ id: id, ...row });
        setData(newData);
        setEditingKey('');
      }
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  };
  const mergedColumns: any = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record: any) => ({
        record,
        inputType: col.dataIndex === 'age' ? 'number' : 'text',
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  async function fetchUserList(page: number, result = 5) {
    return fetch(`https://randomuser.me/api/?results=${result}&page=${page}`)
      .then((response) => response.json())
      .then((body) => {
        return body.results.map((user: any) => ({
          id: user.login.uuid,
          age: user.dob.age,
          name: user.login.username,
        }));
      });
  }
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectedRows, setSelectedRows] = useState([]);

  const onSelectChange = (newSelectedRowKeys: React.Key[], a) => {
    console.log('🚀 ~ file: Main.tsx:367 ~ onSelectChange ~ a:', a);
    setSelectedRowKeys(newSelectedRowKeys);
    setSelectedRows(a);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const labels = [
    'January',
    'January',
    'January',
    'January',
    'January',
    'January',
    'January',
  ];

  const dataChart = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: [120, 423, 351, 145, 256, 321, 564],
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };

  const dataDoughnut = {
    labels: ['Safe', 'Risky', 'High Risk', 'khang'],
    datasets: [
      {
        label: 'Gauge',
        data: [50, 50, 50, 50, 70, 20, 30, 20, 10, 3],
        backgroundColor: [
          'rgba(75, 192, 192, 0.8)',
          'rgba(255, 206, 86, 0.8)',
          'rgba(255, 26, 104, 0.8)',
        ],
        value: 0.5,
        minValue: 0,
      },
    ],
  };

  const optionsDoughnutChart: any = {
    // responsive: true,
    // aspectRatio: 1.5,
    // rotation: -90,
    // circumference: 180,
    // cutout: '90%',
    // borderRadius: 8,
    needle: {
      radiusPercentage: 2,
      widthPercentage: 3.2,
      lengthPercentage: 80,
      color: 'rgba(0, 0, 0, 1)',
    },
    valueLabel: {
      display: true,
      formatter: (value) => {
        return '$' + Math.round(value);
      },
      color: 'rgba(255, 255, 255, 1)',
      backgroundColor: 'rgba(0, 0, 0, 1)',
      borderRadius: 5,
      padding: {
        top: 10,
        bottom: 10,
      },
    },
    // plugins: {
    //   legend: {
    //     display: false,
    //   },
    // },
  };

  const optionsChart: ChartBarProps['options'] = {
    // responsive: true,
    // indexAxis: 'x',
    // scales: {
    //   x: {
    //     min: 0,
    //     max: 1,
    //   },
    // },
    plugins: {
      // scrollBar: { enable: true, scrollType: 'Horizontal' },
      // legend: {
      //   position: 'top' as const,
      // },
      title: {
        display: true,
        text: 'Chart.js Line Chart',
      },
      datalabels: {
        display: true,
        color: 'black',
        formatter: Math.round,
        anchor: 'end',
        offset: -20,
        align: 'start',
      },
    },
  };
  const [listShowField, setListShowField] = useState<CheckboxValueType[]>([
    'code',
    'name',
    'birthday',
  ]);
  const listToggleElement = () => {
    const listOptionShowField: CheckboxOptionType[] = [
      { label: 'Tên nhân viên', value: 'name' },
      { label: 'Mã nhân viên', value: 'code' },
      { label: 'Ngày sinh', value: 'birthday' },
      { label: 'Email', value: 'email' },
      { label: 'SDT', value: 'phone' },
      { label: 'Phòng ban', value: 'departmentName' },
      { label: 'Chức danh', value: 'jobTitleName' },
      { label: 'Vị trí', value: 'positionName' },
      { label: 'Ngày vào làm', value: 'onboard' },
    ];
    return (
      <Checkbox.Group
        value={listShowField}
        options={listOptionShowField}
        className="p-7 grid-cols-2 gap-x-9 gap-y-5 grid"
        containerClassName="flex-row-reverse justify-between"
        labelClassName="w-32"
        onChange={(checkedValue) => setListShowField(checkedValue)}
      />
    );
  };
  const convertTreeData = (originalObject: AnyObject) => {
    if (isEmpty(originalObject)) return;
    const newObject = {
      value: String(originalObject?.id),
      label: originalObject.name,
      children: originalObject.children,
    };
    if (!!originalObject?.children) {
      newObject.children = originalObject.children.map((item) => {
        return convertTreeData(item);
      });
    }
    return newObject;
  };

  const treeData = convertTreeData([]) ? [convertTreeData([])] : undefined;

  const [open, setOpen] = useState(false);

  const [active, setActive] = useState('2');
  const [state1, setState1] = useState(0);
  const [state2, setState2] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setState1(123123);
      setState2(1);
    }, 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setState1(Math.trunc(Math.random() * 999));
      setState2(Math.trunc(Math.random() * 9));
    }, 2000);
  }, [active]);

  const treeData12: DataNode[] = [
    {
      title: '0-0',
      key: '0-0',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0' },
            { title: '0-0-0-1', key: '0-0-0-1' },
            { title: '0-0-0-2', key: '0-0-0-2' },
          ],
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0' },
            { title: '0-0-1-1', key: '0-0-1-1' },
            { title: '0-0-1-2', key: '0-0-1-2' },
          ],
        },
        {
          title: '0-0-2',
          key: '0-0-2',
        },
      ],
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0' },
        { title: '0-1-0-1', key: '0-1-0-1' },
        { title: '0-1-0-2', key: '0-1-0-2' },
      ],
    },
    {
      title: '0-2',
      key: '0-2',
    },
  ];

  const [expandedKeys, setExpandedKeys] = useState<React.Key[]>([
    '0-0-0',
    '0-0-1',
  ]);
  const [checkedKeys, setCheckedKeys] = useState<React.Key[]>(['0-0-0']);
  const [selectedKeys, setSelectedKeys] = useState<React.Key[]>([]);
  const [autoExpandParent, setAutoExpandParent] = useState<boolean>(true);

  const onExpand = (expandedKeysValue: React.Key[]) => {
    console.log('onExpand', expandedKeysValue);
    // if not set autoExpandParent to false, if children expanded, parent can not collapse.
    // or, you can remove all expanded children keys.
    setExpandedKeys(expandedKeysValue);
    setAutoExpandParent(false);
  };

  const onCheck = (checkedKeysValue: React.Key[]) => {
    console.log('onCheck', checkedKeysValue);
    setCheckedKeys(checkedKeysValue);
  };

  const onSelect = (selectedKeysValue: React.Key[], info: any) => {
    console.log('onSelect', info);
    setSelectedKeys(selectedKeysValue);
  };

  const OptionBank = ({ image, title, sub }) => {
    return (
      <div className="flex gap-x-2.5 items-center">
        <div className="w-[30px] h-[30px] rounded p-[2px] flex items-center justify-center overflow-hidden shadow-[0px_2px_2px_0px_rgba(0,0,0,0.06),0px_-2px_2px_0px_rgba(0,0,0,0.02)]">
          <img src={image} alt={title} className="w-full" />
        </div>
        <div>
          <p className="font-semibold text-gray-800">{title}</p>
          <p className="text-gray-500">{sub}</p>
        </div>
      </div>
    );
  };

  const optionsBank: OptionProps[] =
    [
      {
        image_bank:
          'https://portal-api.teravn.com/assets/upload/import/1711446840_image-48.png',
        card_name: 'Vietcombank',
        description: 'Ngoại thương Việt Nam - Vietcombank',
        id: 3,
      },
    ]?.map((bank) => ({
      label: bank?.card_name,
      value: bank?.id,
      labelDisplay: (
        <OptionBank
          image={bank?.image_bank}
          sub={bank?.description}
          title={bank?.card_name}
        />
      ),
    })) ?? [];

  const dataStatistical = useMemo(() => {
    return {
      labels: ['123', '123'],
      datasets: [
        {
          data: [30, 70],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(54, 162, 235)',
            'rgb(255, 205, 86)',
          ],
          hoverOffset: 4,
        },
      ],
    };
  }, []);

  const [number1, setNumber1] = useState(2);

  useEffect(() => {
    setNumber1(10);
    setTimeout(() => {
      setNumber1(111);
    }, 1000);
  }, []);

  const data123 = [
    {
      key: 1,
      title: 'cha 1',
      children: [
        {
          key: 1.1,
          title: 'con 1-1',
        },
      ],
    },
    {
      key: 2,
      title: 'cha 2',
      children: [
        {
          key: 2.1,
          title: 'con 2-1',
        },
        {
          key: 2.2,
          title: 'con 2-2',
        },
      ],
    },
  ];

  const rowSelection1 = {
    onChange: (selectedRowKeys, selectedRows) => {
      console.log(
        `selectedRowKeys: ${selectedRowKeys}`,
        'selectedRows: ',
        selectedRows,
      );
    },
    onSelect: (record, selected, selectedRows) => {
      console.log(record, selected, selectedRows);
    },
    onSelectAll: (selected, selectedRows, changeRows) => {
      console.log(selected, selectedRows, changeRows);
    },
  };

  return (
    <div className="py-10 w-[1200px] mx-auto my-0">
      <RangePicker picker="quarter" />
      <Table
        data={data123}
        columns={[
          {
            title: 'Title',
            dataIndex: 'title',
          },
        ]}
        rowSelection={rowSelection1}
        rowKey={'key'}
      />
      <Icon type="custom-nhanh-vn" />
      <div className="w-[300px] h-[300px]">
        <ChartDoughnut
          labelCenter="123123"
          data={dataStatistical}
          options={{
            plugins: {
              legend: {
                display: true,
                position: 'right',
              },
            },
          }}
        />
      </div>
      <Select options={optionsBank} />
      <DatePicker />
      <InputNumber nocontrol />
      <Tree
        checkable
        onExpand={onExpand}
        expandedKeys={expandedKeys}
        autoExpandParent={autoExpandParent}
        onCheck={onCheck}
        checkedKeys={checkedKeys}
        onSelect={onSelect}
        selectedKeys={selectedKeys}
        treeData={treeData12}
      />
      <Button prefix={<XMarkOutlined />}>textt</Button>
      <Tabs
        items={[
          {
            key: '1',
            label: (
              <div className="flex gap-x-2">
                <span>text tabs</span>
                <Badge showZero count={state1} />
              </div>
            ),
          },
          {
            key: '2',
            label: (
              <div className="flex gap-x-2">
                <span>text tabs</span>
                <Badge showZero count={state2} />
              </div>
            ),
          },
        ]}
        onChange={(key) => {
          setActive(key);
        }}
        activeKey={active}
      />
      <Select
        options={[
          { label: '123', value: '123' },
          { label: '456', value: '456' },
        ]}
        value={'123'}
        showSearch
        searchPlaceholder="binhf"
      />
      <Skeleton
        avatar={{ shape: 'square' }}
        paragraph={{ rows: 4 }}
        active
        round
      />
      <Dropdown menu={{ items: [{ label: 'bình', key: 1 }] }} trigger="click">
        <Button>Button</Button>
      </Dropdown>
      <Tag>Đang làm việc</Tag>
      <Icon type="custom-shopee" />
      <Icon type="custom-ghn" />
      <Form>
        <FormItem label="label">
          <Input />
        </FormItem>
        <FormItem>
          <InputNumber min={0} max={10} value={2} />
        </FormItem>
        <FormItem>
          <InputPassword />
        </FormItem>
        <FormItem>
          <Select options={[]} />
        </FormItem>
      </Form>
      <Table
        columns={[
          {
            title:
              '123 12312 32312 3123 123 2 312312 113 123 23 123 231 323 32 1323 123 232 2 13',
            dataIndex: '123',
            key: '123',
            sorter: true,
          },
          { title: '456', dataIndex: '456', key: '456' },
          { title: '678', dataIndex: '789', key: '789', sorter: true },
          { title: 'abc', dataIndex: 'abc', key: 'abc', sorter: true },
        ]}
        data={[{ id: 123, 123: '1232131223123' }]}
      />
      <Pagination />
      <Modal
        open={open}
        onCancel={() => setOpen(false)}
        title="Đây là title TITLE"
        cancelButtonProps={{ outlined: false }}
        okButtonProps={{ className: 'hidden' }}
      >
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque sequi,
        aliquam facilis beatae voluptates modi dolores incidunt error minima a
        ut debitis porro ab officiis possimus consequuntur! Quaerat, est natus?
      </Modal>
      <Checkbox.Group
        value={[1]}
        onChange={(checkedValue) => console.log(checkedValue)}
      >
        <Checkbox value={1} />
        <Checkbox value={2} />
      </Checkbox.Group>
      <Progress percent={20} />
      <input type="color" />
      <Tag closable>kang</Tag>
      <TreeSelect treeData={treeData} allowClear showSearch />
      <MonthCalendar
        fullScreen={false}
        dataSource={{
          lastMonth: calendarLast,
          currentMonth: calendarCurrent,
          nextMonth: calendarNext,
        }}
        value={currentMonth}
        onSelect={(dayInMonth) => setCurrentMonth(dayInMonth.date)}
        cellRender={(item) => (
          <Badge
            className={customTwMerge(
              'text-[8px] text-center bg-inherit p-0 w-full text-gray-500',
              currentMonth === item.date && item.is_now_month && 'text-white',
            )}
            count={item.is_today ? `(0)` : `(99)`}
          />
        )}
      />
      <TeraOrgChart
        handleDelete={(data, level) => console.log(level)}
        nodeTitle="name"
        nodeContent="description"
        dataSource={{
          id: 'n1',
          name: 'general dsadsadd addsaddasdas dasdasdasdadasdasdasdasdasdasddasgeneralmanagerdsadadad addsads addaddsaddasd asdasdasdasdadasdasdasd asdasdasddas',
          description:
            'general managerdsadadadaddsadsaddaddsaddasdasdasdasdasdadasdasdasdasdasdasddas',
          children: [
            {
              id: 'n2',
              name: 'department manager dsa dsa sd sdas',
              hasDelete: true,
              description: 'department manager dsa dsa sd sdas',
            },
            {
              id: 'n10',
              name: 'Chun Miao',
              description: 'department manager',
              children: [
                {
                  id: 'n11',
                  name: 'Yue Yue',
                  description: 'senior engineer',
                  children: [
                    {
                      id: 'n12',
                      name: 'Yue Yue',
                      description: 'senior engineer',
                    },
                  ],
                },
              ],
            },
          ],
        }}
      />
      {/* <ChartLine data={dataChart} options={optionsChart} /> */}
      <ChartBar
        data={dataChart}
        options={optionsChart}
        plugins={['data-labels']}
      />
      <ChartFunnel
        plugins={['data-labels']}
        options={{ indexAxis: 'y' }}
        data={{
          labels: ['Step 1', 'Step 2', 'Step 3', 'Step 4'],
          datasets: [
            {
              data: [0.7, 0.66, 0.61, 0.01],
            },
          ],
        }}
      />
      {/* <ChartPie data={dataPie} /> */}
      {/* <div className="flex flex-col">
        <ChartDoughnut data={dataDoughnut} options={optionsDoughnutChart} />
        <div>dsad</div>
      </div> */}
      <Button
        onClick={() => {
          setOpen1(true);
        }}
      >
        dsad
      </Button>
      <Button
        onClick={() => {
          setOpen2(true);
        }}
      >
        dsad
      </Button>
      <Button
        type="primary"
        icon={<Icon type="users" />}
        onClick={() => {
          notification.success({
            message: 'Notification Title2',
            description: 'das',
          });
        }}
      >
        khang
      </Button>
      <FormItem>
        <Controller
          name="date"
          control={control}
          render={({ field }) => (
            <DatePicker prefixIcon={<CakeOutlined />} {...field} />
          )}
        />
      </FormItem>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <FormItem
          label="Name"
          help="dsad"
          isError
          messages="das"
          layout="inline"
        >
          <Controller
            control={control}
            name="example1"
            render={({ field }) => (
              <Select
                allowClear
                selectedValue={{ value: 2, label: 'e321' }}
                options={temp2}
                // {...field}
              />
            )}
          />
          {/* <Controller
            control={control}
            name="exampleRequired"
            render={({ field }) => (
              <Select
                labelInValue
                selectedValue={selectedValue}
                onSelect={(value) => {
                  setSelectedValue(value);
                }}
                showSearch
                allowClear
                searchValue={valueSearch}
                onSearch={(value) => {
                  setValueSearch(value);
                }}
                mode="multiple"
                options={temp2}
                {...field}
              />
            )}
          /> */}
        </FormItem>
      </Drawer>
      <Image
        src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
        borderRadius={10}
        width={100}
      />
      {/* <div className="flex items-center">
        <Image.PreviewGroup>
          <Image
            src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
            borderRadius={10}
            width={100}
          />
          <Image
            src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Image_created_with_a_mobile_phone.png"
            borderRadius={10}
            width={100}
          />
        </Image.PreviewGroup>
      </div> */}
      <Popover content={listToggleElement()} trigger="hover">
        <button className="block">
          <EyeOutlined className="w-6 h-6 text-blue-500" />
        </button>
      </Popover>
      <Badge count={'10'}>
        <Avatar>d</Avatar>
      </Badge>
      <Form>
        <Spin spinning={false}>
          <Table
            className="h-[550px]"
            data={[
              {
                id: 1,
                title: 'dsadsadadadasadsadasdadasdsadas',
                value: 'dsadsadadadasadsadasdadasdsadas',
                a: 'dsadsadadadasadsadasdadasdsadas',
                b: 'dsadsadadadasadsadasdadasdsadas',
                c: 'dsadsadadadasadsadasdadasdsadas',
                children: [
                  {
                    id: 2,
                    title: 'dsadsadadadasadsadasdadasdsadas',
                    value: 'dsadsadadadasadsadasdadasdsadas',
                    a: 'dsadsadadadasadsadasdadasdsadas',
                    b: 'dsadsadadadasadsadasdadasdsadas',
                    c: 'dsadsadadadasadsadasdadasdsadas',
                  },
                ],
              },
            ]}
            loading={false}
            // rowSelection={rowSelection}
            expandable={{ fixed: 'left' }}
            columns={mergedColumns}
            onRow={(record) => ({
              onClick: () => {
                console.log(1);
                // if (!selectedRowKeys.includes(record?.id)) {
                //   setSelectedRows((pre) => [...(pre ?? []), record]);
                //   setSelectedRowKeys((pre) => [...pre, record?.id]);
                //   return;
                // }
                // const filterData = selectedRows.filter(
                //   (item) => item?.id !== record?.id,
                // );
                // const filterId = filterData.map((item) => item?.id);
                // setSelectedRows(filterData);
                // setSelectedRowKeys(filterId);
              },
              className:
                selectedRowKeys.includes(record?.id) &&
                'tera-table-cell-row-focused',
            })}
            scroll={{ x: 1500 }}
          />
        </Spin>
        <Pagination onChange={onChangePagi} />
      </Form>
      <Form name="form-basic" onSubmit={handleSubmit(onSubmit)}>
        <FormItem isError>
          <Controller
            control={control}
            name="range-date"
            render={({ field }) => {
              return <RangePicker {...field} />;
            }}
          />
        </FormItem>
        <Input onChange={() => setValue('example', 11)} />
        <FormItem>
          <Controller
            control={control}
            name="example"
            render={({ field }) => {
              return <InputNumberClone max={10} {...field} value={1} />;
            }}
          />
        </FormItem>
        {/* <FormItem
          className="mb-0"
          childrenClassName="w-auto"
          layout="inline"
          label="sd"
        >
          <Controller
            control={control}
            name="example"
            render={({ field }) => {
              return <Select {...field} />;
            }}
          />
        </FormItem> */}
        <FormItem label="Number">
          {/* <Controller
            name="radio"
            control={control}
            render={({ field }) => <Toggle {...field} />}
          /> */}
        </FormItem>

        <FormItem label="Password" name="password">
          <InputPassword
            prefix={
              <svg
                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 16"
              >
                <path d="m10.036 8.278 9.258-7.79A1.979 1.979 0 0 0 18 0H2A1.987 1.987 0 0 0 .641.541l9.395 7.737Z" />
                <path d="M11.241 9.817c-.36.275-.801.425-1.255.427-.428 0-.845-.138-1.187-.395L0 2.6V14a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V2.5l-8.759 7.317Z" />
              </svg>
            }
          />
        </FormItem>

        <FormItem label="TextArea">
          <TextArea />
        </FormItem>
        <Radio.Group
          value={radio}
          onChange={(e) => setRadio(e.target.value)}
          name="radios"
        >
          <Radio value="1" className="dsad">
            dsa
          </Radio>
          <Radio value="2">dssa</Radio>
        </Radio.Group>
        <Controller
          name="radio"
          control={control}
          defaultValue="11"
          render={({ field }) => (
            <Radio.Group {...field}>
              <Radio value="11" className="dsad">
                dsa
              </Radio>
              <Radio value="22">dssa</Radio>
            </Radio.Group>
          )}
        />

        {/* <Controller
          name="example"
          control={control}
          render={({ field }) => <Checkbox {...field}>dsa</Checkbox>}
        ></Controller> */}
        {/* <Controller
          name="radio"
          control={control}
          defaultValue={['Apple']}
          render={({ field }) => (
            <Checkbox.Group
              options={[
                {
                  label: 'Apple',
                  value: 'Apple',
                  containerClassName:
                    'flex-row-reverse justify-end mb-2.5 gap-2.5',
                },
                {
                  label: 'Pear',
                  value: 'Pear',
                  containerClassName:
                    'flex-row-reverse justify-end mb-2.5 gap-2.5',
                },
                {
                  label: 'Orange',
                  value: 'Orange',
                  containerClassName:
                    'flex-row-reverse justify-end mb-2.5 gap-2.5',
                  disabled: true,
                },
              ]}
              {...field}
            />
          )}
        /> */}

        <Button htmlType="submit">Submit</Button>
      </Form>
      <Spin tip="loading...">
        <div className="p-20 bg-slate-100" />
      </Spin>
      <Modal
        title="Basic Modal"
        open={open1}
        onCancel={() => setOpen1(false)}
        width={700}
      >
        <ChartGauge
          options={{
            cutout: '80%',
            rotation: -150,
            circumference: 300,
            aspectRatio: 1,
            needle: {
              // Needle circle radius as the percentage of the chart area width
              radius: '10%',
              // Needle width as the percentage of the chart area width
              width: '10%',
              // Needle length as the percentage of the interval between inner radius (0%) and outer radius (100%) of the arc
              length: '50%',
              // The color of the needle
              color: 'rgba(0, 0, 0, 1)',
            },
            valueLabel: {
              display: false,
            },
          }}
          data={{
            datasets: [
              {
                value: 50,
                minValue: 0,
                data: [50, 70, 90, 100],
                backgroundColor: ['green', 'yellow', 'orange', 'red'],
              },
            ],
          }}
          plugins={['data-labels']}
        />
      </Modal>
      <ModalWindow
        title="Basic Modal"
        open={open2}
        width={400}
        onCancel={() => setOpen2(false)}
        ref={(ref) => console.log(ref)}
      >
        <p>khang...</p>
        <p>khang...</p>
        <p>khang...</p>
      </ModalWindow>
      <Select options={[{ value: 'das', label: 'dasd' }]} allowClear loading />
      <Search onSearch={(value) => console.log(value)} />
      <Row className="justify-center grid-cols-4">
        <Col className="col-span-2 col-start-1 border-b">
          <Accordion
            onChange={(key) => console.log(key)}
            items={[
              {
                key: '1',
                label: '1',
                children: <div>231</div>,
                extra: (
                  <Dropdown
                    trigger="contextMenu"
                    menu={{
                      items: [{ key: 1, label: '231' }],
                    }}
                  >
                    <p
                      className="mr-10"
                      onClick={() => console.log(1)}
                      onContextMenu={() => console.log(1)}
                    >
                      dá
                    </p>
                  </Dropdown>
                ),
              },
              {
                key: '2',
                label: '2',
                children: <div>231</div>,
              },
            ]}
          />
        </Col>
      </Row>
      <Tabs
        tabPosition="top"
        // className="h-[520px]"
        // defaultActiveKey="20"
        items={new Array(30).fill(null).map((_, i) => {
          const id = String(i);
          return {
            label: `Tab-${id}`,
            key: id,
            // disabled: i === 28,
            children: `Content of tab ${id}`,
          };
        })}
      />
      <Description label="dddd">dsadad</Description>
      <Description label="dsaddsadaddssssssssssssssssssssssssssssssssssssssssdasda">
        dsadad
      </Description>
      <Breadcrumbs items={items} />
      <TimelineTest
        mode="right"
        items={[
          {
            label: 'dd/mm/yyyy hh:mm',
            children: (
              <div className="bg-green-50 text-blue-600 p-2 flex justify-between items-center">
                <div>Nguyen van a</div>
                <div className="p-1.5 bg-green-100 text-green-600">
                  Đã duyệt
                </div>
              </div>
            ),
          },
          {
            // label: '2015-09-01',
            children: (
              <div className="bg-green-50 text-blue-600 p-2 flex justify-between items-center">
                <div>Nguyen van a</div>
                <div className="p-1.5 bg-green-100 text-green-600">
                  Đã duyệt
                </div>
              </div>
            ),
          },
          {
            // label: '2015-09-01 09:12:11',
            children: (
              <div className="bg-green-50 text-blue-600 p-2 flex justify-between items-center">
                <div>Nguyen van a</div>
                <div className="p-1.5 bg-green-100 text-green-600">
                  Đã duyệt
                </div>
              </div>
            ),
          },
          {
            // label: '2015-09-01 09:12:11',
            children: (
              <div className="bg-green-50 text-blue-600 p-2 flex justify-between items-center">
                <div>Nguyen van a</div>
                <div className="p-1.5 bg-green-100 text-green-600">
                  Đã duyệt
                </div>
              </div>
            ),
          },
        ]}
      />
      <Steps
        current={1}
        status="finish"
        className="dsa"
        onChange={(current) => setActiveKey(current)}
        items={[
          {
            title: 'Tạo đơn',
            description: 'Tạo đơn hàng trả bán bán thành công',
          },
          {
            title: 'Chờ Duyệt',
            description: 'Đang chờ quản lý duyệt giá',
          },
          {
            title: 'Approve',
            description: 'Chuyển sang bộ phận vận chuyển',
          },
        ]}
      />
      <Tooltip title="khang" trigger="click">
        <span onClick={() => console.log(1)}>
          <span>dsad</span>
          <span>dsad</span>
        </span>
      </Tooltip>
    </div>
  );
};

export default MainComponent;
