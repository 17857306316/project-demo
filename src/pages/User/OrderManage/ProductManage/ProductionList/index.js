import { Button, Tabs } from 'antd';
import React, { useState } from 'react';
import { lib } from 'react-single-app';
import NewTable from '@/common/BaseForm/NewTable';


export default function ProductionList() {
    const columns = [
        {
            title: '交易时间',
            dataIndex: 'changeTime'
        },
        {
            title: '业务单号',
            dataIndex: 'serialNo'
        },
        {
            title: '费用类型',
            dataIndex: 'costType'
        },
        {
            title: '费用金额',
            dataIndex: 'changeNum',
        },
        {
            title: '收支类型',
            dataIndex: 'changeType'
        },
        {
            title: '平台交易流水号',
            dataIndex: 'platformSerialNumber'
        },
        {
            title: '备注',
            dataIndex: 'remarks'
        },
        {
            title: '操作',
            dataIndex: 'getOperation',
        },
    ]
    const [serachList, setSerachList] = useState([
        {
            type: 'Input',
            label: '输入',
            name: 'input',
        },
        {
            type: 'Select',
            label: '下拉',
            name: 'changeType',
            option: [
                { name: "收入", id: "IN" },
                { name: "支出", id: "OUT" }
            ]
        },
        {
            type: 'Select',
            label: '接口下拉',
            name: 'costType',
            option: [],
            request: '/accoun.../../ccountCType',
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
        },
    ])
    function getOptions() {
        serachList.map(item => {
            if (item.request && !item.option.length) {
                lib.request({
                    url: item.request,
                    needMask: false,
                    data: item.data,
                    success: res => {
                        console.log(res);
                        item.option = res || []
                        setSerachList(serachList)
                    }
                })
            }
        })
        return serachList;
    }
    function renderLeftOperation() {
        return (
            <div style={{ margin: '8px'}}>
                <Button type='primary'>新增左边</Button>
            </div>
        )
    }
    // function renderRightOperation() {
    //     return (
    //         <Button type='primary'>新增右边</Button>
    //     )
    // }
    return (
        <div>
            <NewTable columns={columns}
                // dataSource={dataList}
                serachList={getOptions()}
                url='/searchList'
                // renderRightOperation={renderRightOperation()}
                renderLeftOperation={renderLeftOperation()}
            />

        </div>
    )
}


