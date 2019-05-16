<template>
  <div id="myTableTest">
        <button v-on:click="GetOrderList">Check Orders</button>
        <v-table
                is-horizontal-resize
                style="width:100%"
                :columns="columns"
                :table-data="tableData"
                row-hover-color="#eee"
                row-click-color="#edf7ff"
                @on-custom-comp="customCompFunc"
        ></v-table>
  </div>
</template>

<script>
    import Vue from 'vue'

    let resultData = {
         tableData: [{}
                    ],
           columns:
                    [
                        { 
                            field: 'custome', title:'编号', width: 50, titleAlign: 'center', columnAlign: 'center',
                            formatter: function (rowData,rowIndex,pagingIndex,field) {
                                return rowIndex < 3 ? '<span style="color:red;font-weight: bold;">' + (rowIndex + 1) + '</span>' : rowIndex + 1
                            }, isFrozen: true,isResize:true
                        },                       
                        {field: 'message', title: '申请说明', width: 200, titleAlign: 'center',columnAlign:'center',isResize:true},
                        {field: 'orderstatus', title: '状态', width: 260, titleAlign: 'center',columnAlign:'center',isResize:true},
                        {field: 'creator', title: '申请人',width: 260, titleAlign: 'center',columnAlign:'left',isResize:true},
                        {field: 'processor', title:'审批人', width: 80, titleAlign: 'center',columnAlign:'center',isResize:true},
                        {field: 'custome-adv', title: '操作',width: 200, titleAlign: 'center',columnAlign:'center',componentName:'table-operation',isResize:true}
                    ]            
    }

    export default{
        data() {
            return resultData
        },
        methods:{
            customCompFunc(params){

                console.log(params);

                if (params.type === 'delete'){ // do delete operation

                    this.$delete(this.tableData,params.index);

                }else if (params.type === 'edit'){ // do edit operation

                    alert(`行号：${params.index} 姓名：${params.rowData['name']}`)
                }

            },

            GetOrderList:function(){
             this.$ajxj.get('/applyorder/getAll')
              .then((response) => {
              //this.approvemessage = response.data
              this.tableData = response.data
              }).catch((err) => {
                console.log(err)
              })
            }
        }
    }

  // 自定义列组件
    Vue.component('table-operation',{
        template:`<span>
        <a href="" @click.stop.prevent="update(rowData,index)">批准</a>&nbsp;
        <a href="" @click.stop.prevent="deleteRow(rowData,index)">删除</a>
        </span>`,
        props:{
            rowData:{
                type:Object
            },
            field:{
                type:String
            },
            index:{
                type:Number
            }
        },
        methods:{
            update(){

               // 参数根据业务场景随意构造
               let params = {type:'edit',index:this.index,rowData:this.rowData};
               this.$emit('on-custom-comp',params);
            },

            deleteRow(){

                // 参数根据业务场景随意构造
                let params = {type:'delete',index:this.index};
                this.$emit('on-custom-comp',params);

            }
        }
    })
</script>