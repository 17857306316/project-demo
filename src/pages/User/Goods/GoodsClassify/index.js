
// import NewTable from '@/common/BaseForm/NewTable';
import React,{ Fragment } from 'react'
import { Card,Button,Modal,message,Space } from 'antd'
import FormCollection from '@/common/BaseForm'
import Etable from '@/common/Etable'
import { updateSelectedItem, getList } from '@/utils'

export default class GoodsClassify extends React.Component{
    
    params = {
        page:1,
        pageSize:5
    }
    data = [
        {
            type:'input',
            initialValue:'',
            label:'货品编码',
            placeholder:'请输入货品编码',
            field:'username',
            width:'120px'
        },
        {
            type:'input',
            initialValue:'',
            label:'货品名称',
            placeholder:'请输入货品名称',
            field:'password',
            width:'120px'
        },
        {
            type:'select',
            initialValue:'',
            label:'订单状态',
            field:'siteName',
            width:'100px',
            list:[{id:0,label:'全部',value:''},{id:1,label:'已发货',value:'1'},{id:2,label:'待发货',value:'2'},{id:3,label:'待审核',value:'3'}]
        },
        {
            type:'chooseTime',
            label:'订单时间'
        }
    ]
   

    state = {
        pagination:true,
        rowSelection:{
            selectedRowKeys:[],
            selectedRows:[]
        }
    }

    componentDidMount(){
        this.requestList()
    }

 
   
    handleSearch = (data)=>{
        console.log(this)
    }
    handleDelete = (item,e)=>{
        console.log(e);
        e.stopPropagation()//阻止冒泡
        Modal.confirm({
            title:'确认',
            content:'您确认要编辑此条数据吗？',
            onOk:()=>{
                message.success('编辑成功');
            }
        })
    }

     requestList = () =>{
        let datas=[]
        for (let i = 0; i < 20; i++) {
          datas.push({
            id: i,
            teacherName: `货品${i}`,
            Seniority: Math.floor(10*Math.random()+1),
            grade: Math.floor(1000*Math.random()+1),
            remark:'备注',
            time:'2021-4-21 15:42'
          });
        }
        return datas
    }
    render(){
        const columns = [
            {
                title:'物品名称',
                dataIndex:'id'
            },
            {
                title:'货品名称',
                dataIndex:'teacherName'
            },
            {
                title:'申购数量',
                dataIndex:'Seniority'
            },
            {
                title:'单价',
                dataIndex:'grade',
            },
            {
                title:'备注',
                dataIndex:'remark'
            },
            {
                title:'采购日期',
                dataIndex:'time',
            },
            {
                title:'操作',
                render:(item,record,index)=>{
                    return <Space>
                        <a size="small" type="primary" onClick={ (e)=>{this.handleDelete(item,e)} }>编辑</a>
                        
                    </Space>
                }
            }
        ];
        return (
            <Fragment>
                <Card style={{margin:'20px 0'}}>
                    <FormCollection data={this.data} handleSearch={this.handleSearch}></FormCollection>
                </Card>
                <Card>
                    <Etable
                        that={this}
                        dataSource={this.requestList()}
                        columns={columns}
                        pagination={this.state.pagination}
                        rowSelection={this.state.rowSelection}
                        updateSelectedItem={updateSelectedItem.bind(this)}
                    />
                </Card>
                
            </Fragment>
            

        )
    }
}


