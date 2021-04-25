/*
 * @Author: ticktack 
 * @Date: 2021-03-10 10:45:15 
 * @Last Modified by: ticktack
 * @Last Modified time: 2021-04-25 17:12:59
 */
/**
 * 详细示例见 https://www.jianshu.com/p/6f20ed46d774
 * @param columns 列描述数据对象
 * @param serachList [{ type: 'Input', label: '输入', name: 'input', }, {  type: 'Select', label: '下拉', name: 'changeType', option: [{ name: "收入", id: "IN" },{ name: "支出", id: "OUT" } ] },
        {
            type: 'Select',
            label: '接口下拉',
            name: 'costType',
            option: [],
            request: '/acco.t-we...tCo.Type',  接口下拉的接口
            data: []
        },
        {
            type: 'Date',
            label: '时间1',
            name: 'getStart,getEnd', 
        },
        {
            type: 'Date',
            label: '时间2',
            name: 'startTime,endTime',
        }]
 * @param url 分页查询的url
 * @param urlParam 分页查询的需要的默认参数
 * @param renderLeftOperation 在Table 与搜索框之间的需要添加的操作
 * @param renderRightOperation
 * 
 */
import React, { useEffect, useRef, useState } from "react";
import { Button, Space, Table, Input, Form, Select, DatePicker, Pagination } from "antd";
import { lib } from "react-single-app";
import './NewTable.less'
export default function MyTable({ columns, serachList, url, urlParam, renderLeftOperation, renderRightOperation }) {
    const [form] = Form.useForm();
    const { RangePicker } = DatePicker;
    const { Option } = Select;
    const [dataList, setDataList] = useState([])
    const [values, setValues] = useState(null)
    const [page, setPage] = useState({ currentPage: 1, pageSize: 20, total: 0, })

    useEffect(() => { requestTable() }, [])

    function requestTable(currentPage, pageSize, param) {
        lib.request({
            url,
            needMask: true,
            data: { ...urlParam, currentPage, pageSize, ...param },
            success: res => {
                setDataList(res.dataList)
                setPage({
                    currentPage: res.page.currentPage,
                    pageSize: res.page.pageSize,
                    total: res.page.totalCount
                })
            }
        })
    }

    function changePageSize(currentPage, pageSize) {
        requestTable(currentPage, pageSize, values)
    }
    const onFinish = (values) => {
        for (let [key, value] of Object.entries(values)) {
            value == undefined && delete values[key]
            if (Object.prototype.toString.call(value) == '[object Array]') {
                delete values[key]
                values[key.split(',')[0]] = value[0].valueOf()
                values[key.split(',')[1]] = value[1].valueOf()
            }
        }
        console.log(values);
        requestTable(page.currentPage, page.pageSize, values)
        setValues(values)
    };

    function reset() {
        form.resetFields();
        requestTable(1, page.pageSize)
    }

    function renderSearchList() {
        return serachList.map(item => {
            switch (item.type) {
                case 'Input':
                    return (
                        <Form.Item label={item.label} name={item.name} colon={false}  >
                            <Input style={{ width: 250, float: 'left', marginRight: '30px' }}></Input>
                        </Form.Item>
                    )
                case 'Select':
                    return (
                        <Form.Item label={item.label} name={item.name} colon={false}>
                            <Select style={{ width: 250, float: 'left', marginRight: '30px' }}
                                optionFilterProp="children"
                                showSearch
                                allowClear>
                                {item.option.map(items => {
                                    return <Option key={items.id} value={items.id}>{items.name}</Option>
                                })}
                            </Select>
                        </Form.Item>
                    )
                case 'Date':
                    return <Form.Item label={item.label} name={item.name} colon={false}>
                        <RangePicker />
                    </Form.Item>
                default:
                    return null;
            }
        })
    }
    return (
        <div style={{ padding: '0px 24px' }}>
            <Form form={form} layout="inline" onFinish={onFinish}>
                {renderSearchList()}
                <Space style={{ margin: '8px 8px 8px 80px' }}>
                    <Button type='primary' htmlType='submit'>查询</Button>
                    <Button onClick={() => { reset() }}>重置</Button>
                </Space>
            </Form>
            {(renderLeftOperation || renderRightOperation) ? <div style={{ height: '100px', display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
                {renderRightOperation}

                {renderLeftOperation}
            </div> : <div style={{ height: '30px' }}></div>}
            <Table
                columns={columns}
                dataSource={dataList}
                rowKey={columns.dataIndex}
                pagination={false}
            />
            <Pagination
                showSizeChanger
                showQuickJumper
                pageSize={Number(page.pageSize)}
                pageSizeOptions={['10', '20', '30', '40', '50', '100', '200']}
                total={page.total}
                current={page.currentPage}
                showTotal={() => `总共 ${page.total || 0} 条`}
                onChange={changePageSize}
                style={{ marginLeft: '33%', marginTop: '16px' }}
            />
        </div>
    )
}