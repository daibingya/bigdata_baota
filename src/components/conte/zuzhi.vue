<template>
	<div class="zuzhi bottom_contes">
	 <!--左侧内容--start-->
	  <div class="left_Box">
		   <div class="leftTop">
              <h3 class="titles_top">
              	<span>党组织类型分布</span>
              	<!--<select name="right_top">
              		<option value="">乡镇</option>
              	</select>-->
              </h3>
              <!--<right-top></right-top>-->
              <RightTop></RightTop>
		   </div>
		   <div class="leftBottom">
               <h3 class="titles_top">
              	<span>党组织数量分布</span>
              	<!--<select name="right_top">
              		<option value="">乡镇</option>
              	</select>-->
              </h3>
              <div id="ech1"></div>
		   </div>
	   </div>
	   <!--左侧内容 ---end-->
	   
	   <!--右侧内容--start-->
	   <div class="right_box">
             <h3 class="dan_wei">各单位党组织分布</h3>
             <div class="echar_Box">
	             <div class="echar_lie" id="echar_lie1">
	             	
	             </div>
	             <div class="echar_lie" id="echar_lie2">
	             	
	             </div>
             </div>
	   </div>
	   <!--右侧内容 end-->
	</div>
</template>
<script>
	//党组织类型分布图表 --- 以import方式引入另一个vue文件(zuzhi_top/top.vue)
	import RightTop from './zuzhi_top/top'
//	import {Url_api} from "../../../static/js/API_URL.js"
	import api_demo from "../../../static/js/demo_api.js"
	
	export default{
		name:"zuzhi",
		components:{
			//组件的使用
			RightTop
		},
		data(){
			//此处的data是以函数的返回形式
			return {
				msg:[],
				data_ar:[]
			}
		},
		
		mounted:function(){
			let _this=this;
			!function(){
				_this.$http.get(api_demo.apis1+"/queryBaoTaOrderOrganizationDistribution.action").then(function(data){
					_this.msg=JSON.parse(data.bodyText);
					var name_arr=[];
					_this.msg.dangwei.forEach(function(val,index){
					    name_arr.push(val.name)
					});
				    for(let arr in _this.msg){
				    	var arrs=new Array();
				    	_this.msg[arr].forEach(function(val,index){
				    		arrs.push(val.num)
				    	})
				    	_this.data_ar.push(arrs);
				    }
					_this.eachars(name_arr,_this.data_ar);
				
				},function(){})
			}();
			
			!function(){
				_this.$http.get(api_demo.apis1+"/queryBaoTaOrderEveryEnterpriseOrganization.action").then(function(data){
					//两个图标的座位名
					let _name1=[],_name2=[],names_arr=[_name1,_name2];
					
					//党支部的数据
					let _dzb1=[],_dzb2=[],dangZhibu=[_dzb1,_dzb2];
					let dangZ_concat=_dzb1.concat(_dzb2);
					
					//党总支的数据
					let _dzz1=[],_dzz2=[],dangZongzhi=[_dzz1,_dzz2];
					//党委的数据
					let _dw1=[],_dw2=[],dangWei=[_dw1,_dw2];
					
					//获取--- 党支部
					var _All=JSON.parse(data.bodyText).enterpriseDZhiBu;
				
					_All.forEach(function(val,index){
			
						if(index>=_All.length/2){
						   _name2.push(val.name);
						   _dzb2.push(val.num)
						}else{
						   _name1.push(val.name);
						   _dzb1.push(val.num)
						}
					})
					//获取--- 党委
					var _All_dw=JSON.parse(data.bodyText).enterpriseDangWei;
					_All_dw.forEach(function(val,index){
						if(index<_All.length/2){
						   _dw1.push(val.num)
						}else{
						   _dw2.push(val.num)
						}
					})
					//获取--- 党总支
					var _All_dw=JSON.parse(data.bodyText).enterpriseZongZhi;
					_All_dw.forEach(function(val,index){
						if(index<_All.length/2){
						   _dzz1.push(val.num)
						}else{
						   _dzz2.push(val.num)
						}
					})

					//总数计算
					let _zn1=[],_zn2=[],zong_num=[_zn1,_zn2];
					for(let i=0;i<_dzb1.length;i++){
						_zn1[i]=_dzb1[i]+_dzz1[i]+_dw1[i];
					}
					for(let i=0;i<_dzb2.length;i++){
						_zn2[i]=_dzb2[i]+_dzz2[i]+_dw2[i];
						
					}
					_this.echarLie(names_arr,dangZhibu,dangZongzhi,dangWei,zong_num);
				},function(){})
			}()
		},
		methods:{
            //党组织数量分布图表
			eachars(name_arr,data_ar){
			    let myChart=this.$echarts.init(document.getElementById("ech1"));
				let option = {					    
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    grid: {
					        left: '3%',
					        right: '4%',
					        bottom: '1%',
					        containLabel: true
					    },
					    xAxis : [
					        {
					            type : 'category',
					            data : name_arr,
					            axisTick: {
					                alignWithLabel: true
					            },
					             // x轴的字体样式
                        		axisLabel: {        
                                	show: true,
                                	rotate:40,
                                	textStyle: {
                                    	color: '#fff',
                                    	fontSize:'12'
                                	}
                            },
					        }
					    ],
					    yAxis : [
					        {
					        	name:"个",
					        	nameTextStyle:{color:"#fff"},
					            type : 'value',
					            axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff'
                                    }
                               }, 
                                splitLine: {
                                	show: true, 
                                	//  改变轴线颜色
                                	lineStyle: {
                                    	// 使用深浅的间隔色
                                    	color: ['#262C3E']
                                	}                            
                        		}
					        }
					    ],
					    series : [
					        {
					            name:'党委数量',
					            type:'bar',
					            barWidth: '40%',
					            stack: '总量',
					            itemStyle:{
									normal:{color:'#f01a43'}
								},
					            data:data_ar[0]
					        },{
					        	name:"党总支数量",
					        	type:'bar',
					        	barWidth:'40%',
					        	stack: '总量',
					        	itemStyle:{
									normal:{color:"#f7a921"}
								},
					            data:data_ar[1]
					        },{
					        	name:"党支部数量",
					        	type:'bar',
					        	barWidth:'40%',
					        	stack: '总量',
					        	itemStyle:{
									normal:{color:"#03accc"}
								},
					            data:data_ar[2]
					        }
					    ]
					};
	                myChart.setOption(option);
			},
			
			//各单位党组织分布图表
			echarLie(name,zhibu,zongzhi,dangwei,zong){
				let dataObj=name;
				for(let i=1;i<=2;i++){
				    let myChart=this.$echarts.init(document.getElementById(`echar_lie${i}`));
					let option = {
						 //控制canvas画布内边距
					    tooltip: {
					        trigger: 'axis',
					        axisPointer: {
					            type: 'shadow'
					        }
					    },
					    grid: {
					        left: '5%',
					        right: '5%',
					        top:"3%",
					        bottom:"3%",
					        containLabel: true
					    },
					    xAxis: {
							show:false,
					        type: 'value',
					        boundaryGap: [0, 0.01]
					    },
					    yAxis: {
					        type: 'category',
					        data:dataObj[i-1],
					        axisLabel: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                },
                                //处理文字过长时候显示省略号
                                formatter: function(value) {
								    if (value.length > 3) {
								      return value.substring(0,3) + "...";
								    } else {
								      return value;
								    }
								}
	                        }
					    },
					    series: [
					        {
					        	name:"总数",
					            type: 'bar',
					            barWidth:20,
					            itemStyle: {
						              normal: {
						                 //颜色渐变
						                  color: new this.$echarts.graphic.LinearGradient(0, 0, 1, 0, [{
						                  offset: 0,
						                  color: '#e16664'
						                }, {
						                  offset: 1,
						                  color: '#ff9d59'
						                }])
						              }
						        },
					            label: {
					                normal: {
					                    show: true,
					                    position: 'right',
					                    color:"#fff"
					                }
					            },
					            data:zong[i-1]
					        },
					        {
					        	name:"党委",
					        	type:"line",
					        	symbolSize: 0,//拐点大小
					        	itemStyle : {
				                    normal : {
				                        lineStyle:{
				                            width:0,//折线宽度
				                            color:"transparent"//折线颜色
				                        }
				                    }
				                },
					            data: dangwei[i-1]
					        },
					        {
					        	name:"党总支",
					        	type:"line",
					        	symbolSize: 0,//拐点大小
					        	itemStyle : {
				                    normal : {
				                        lineStyle:{
				                            width:0,//折线宽度
				                            color:"transparent"//折线颜色
				                        }
				                    }
				                },
					            data: zongzhi[i-1]
					        },
					        {
					        	name:"党支部",
					        	type:"line",
					        	symbolSize: 0,//拐点大小
					        	itemStyle : {
				                    normal : {
				                        lineStyle:{
				                            width:0,//折线宽度
				                            color:"transparent"//折线颜色
				                        }
				                    }
				                },
					            data: zhibu[i-1]
					        }
					    ]
					};
		            myChart.setOption(option);
			}
		  }
		}
	}
</script>
<style scoped>
	.zuzhi{
		color:white
	}
	.left_Box{
		width:1051px;
	}
	/*1045*378*/
	.leftTop{
		width:100%;
		height:378px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		padding-top:19px;
		box-sizing:border-box
	}
	.echart_zu{
		width:100%;
		height:315px;
	}
	.titles_top{
		width:100%;
		color:#1299f5;
		text-align:center;
		height:30px;
		line-height:30px;
		font-size:18px;
		font-weight:bold;
		position:relative;
	}
	select[name="right_top"]{
		position:absolute;
		width:134px;
		height:28px;
		border:none;
		font-size:12px;
		color:white;
		top:0;
		bottom:0;
		margin:auto;
		padding-left:15px;
		box-sizing:border-box;
		right:17px;
		border-radius:2px;
         /*很关键：将默认的select选择框样式清除*/
	   appearance:none;
	   -moz-appearance:none;
	   -webkit-appearance:none;
	   /*在选择框的最右侧中间显示小箭头图片*/
	   background: url("../../../static/images/x1_03.png") no-repeat right center /auto 110% #2C3C6B;
	   background-position:96% 50%;
	}

	/*1046*366*/
	.leftBottom{
		width:100%;
		height:369px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		padding-top:17px;
		box-sizing:border-box;
		margin-top:15px;
	}
	.right_box{
		width:522px;
		height:761px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		margin-left:15px;
		padding-top:17px;
		box-sizing:border-box;
	}
	/*群选,行内块儿转换,设置文字基线*/
	.right_box,.left_Box{
		display:inline-block; 
		vertical-align:top;
	}
	/*483*761*/
	#ech1{
		width:100%;
		height:303px;
	}
	.dan_wei{
		width:100%;
		color:#1299f5;
		text-align:center;
		height:40px;
		line-height:40px;
		font-size:18px;
		font-weight:bold;
	}
	.echar_lie{
		width:49%;
		height:698px;
		display:inline-block;
		vertical-align:top;
		box-sizing:border-box
	}
	.dis_span{
		width:141px;
		height:141px;
		outline:1px solid white;
		display:inline-block;
		vertical-align:top;
	}
</style>