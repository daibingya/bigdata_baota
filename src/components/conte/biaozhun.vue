<template>
	<div class="biaozhun bottom_contes">
		<div class="left_box">
		    <div class="hezi_tit">
		    	<h3 class="title_dang2">宝塔区下辖乡街道考评情况</h3>
			</div>
			<div class="img_box">
				<img width="75%" draggable="false" src="../../../static/images/d_img_03.png" border="0" usemap="#planetmap" alt="Planets"  />
			    <map name="planetmap" id="planetmap">
				  <area v-for="(val,key) in myData" @mouseenter="shows(key,$event)" @mouseleave="hidden()" href="#circle" shape="circle" :coords="val" alt="Venus" />				  
				</map>
				<!--移入每个徽章上面显示的提示框-->
				<div class="mask_box">
					<h3 class="mask_titles">{{myDataMasge.name}}</h3>
					<ul class="big_w">
						<li>
							<p>{{myDataMasge.hqc}}</p>
							<p>{{Percentile.hqcPercent}}%</p>
							<p>红旗村</p>
						</li>
						<li>
							<p>{{myDataMasge.sfc}}</p>
							<p>{{Percentile.sfcPercent}}%</p>
							<p>示范村</p>
						</li>
						<li>
							<p>{{myDataMasge.dbc}}</p>
							<p>{{Percentile.dbcPercent}}%</p>
							<p>达标村</p>
						</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="right_box">
			<div class="top">
				<div class="hezi_tit">
		    		<h3 class="title_dang2">标准化党组织考核分数</h3>
				</div>
				<div id="bz_echarts_1"></div>
			</div>
			<div class="bottom new_add">
				<div class="hezi_tit">
		    		<h3 class="title_dang2" @click="ready()">标准化党组织考核扣分分布</h3>
		    		<select name="right_top" style="right:135px;width:100px" v-model="Nian">
	              		<option :value="val" v-for="val in Nian_Array">{{val+"年"}}</option>
	              	</select>
	              	<select name="right_top" style="right:30px;width:100px" v-model='Month'>
	              		<option :value="val" v-for="val in Mouth_Array">{{val+"月"}}</option>
	              	</select>
		    		<v-pagination :total="total" :current-page='current' @pagechange="pagechange"></v-pagination>
				</div>
				<div id="last_echarst1" >
					<div id="echar1"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import api_demo from "../../../static/js/demo_api.js";
	import pagination from './pegaintion/pegaintion'
	export default {
		name:"biaozhun",
		data(){
			return {
				myDataMasge:"",
				allData:'',
				Percentile:'',
				myData:[
					[120, 335, 15] ,//南市街道
					[155, 310, 12] ,//宝塔山街道
					[115, 310, 10],	//凤凰山街道
					
					[75, 275, 15],  //造园街道
					[147, 275, 15], //桥沟街道
					[185, 250, 15], //李渠镇
					
					[198, 310, 12] ,//川口乡
					[140, 180, 15], //冯庄镇
					[48, 343, 15], //万花山乡
					
					[305, 195, 15], //甘谷驿镇
					[165, 138, 15], //青化乏镇
					[180, 65, 15],  //蟠龙镇
					
					[105, 237, 15], //河庄坪镇
					[130, 370, 15] ,//柳林镇
					[210, 487, 18],//南泥湾镇
					
					[300, 447, 18],//麻洞川乡
					[343, 512, 18],//临镇
					[245, 230, 15], //姚店镇
					],
					total: 0,     // 记录总条数
				    display:21,   // 每页显示条数
				    current: 1,   // 当前的页数
				    Nian:'',		//年份
				    Month:'',		//月份
				    Nian_Array:[],
				    Mouth_Array:[]
			}
		},
		created:function(){
			this.nian=new Date().getFullYear();
			this.Month=new Date().getMonth()+1;
		},
		mounted:function(){
			var that=this;
			this.echarts_1();
			var _this=this;
			//年月自动执行
			!function(){
				var Mouth,Nian,datas=new Date();
				_this.Nian=datas.getFullYear();
				_this.Mouth=datas.getMonth()+1;
				//年月份的循环遍历
				for(let i=10;i>=1;i--){
					_this.Nian_Array.push(_this.Nian-i);
					if(i==1){
						_this.Nian_Array.push(_this.Nian);
						for(var s=1;s<=12;s++){
							_this.Mouth_Array.push(s)
						}
					}
				}
			}();
			//宝塔区下辖乡街道考评情况
			!function(){
				that.$http.get(api_demo.apis6+"/queryStreetExamine.action").then(function(data){
					that.allData=data.body;
				},function(error){})
			}()
		},
		watch:{
			Nian:function(news,olds){
				this.current=1;
				this.last_echarts1();
				
			},
			Month:function(news,olds){
				this.current=1;
				this.last_echarts1();
			}
		},
		methods:{
			
			pagechange(currentPage){
				//选择的页数;
		       	this.current=currentPage;
		       	this.last_echarts1();
		       	// ajax请求, 向后台发送 currentPage, 来获取对应的数据
		   	},
		   	//展示地图的弹窗
			shows(keys,e){
				//每一项数据对应的改变
				this.myDataMasge=this.allData[keys];
				let theSum=function(sum){
					let innerNum=sum.dbc+sum.hqc+sum.sfc;
					function hqcPercent(){
						if(sum.hqc==0){
							return 0
						}else{
							return (sum.hqc/innerNum*100).toFixed(2);
						}
					}
					function dbcPercent(){
						if(sum.dbc==0){
							return 0
						}else{
							return (sum.dbc/innerNum*100).toFixed(2);
						}
					}
					function sfcPercent(){
						if(sum.sfc==0){
							return 0
						}else{
							return (sum.sfc/innerNum*100).toFixed(2);
						}
					}
					return {
						zong:innerNum,
						hqcPercent:hqcPercent(),
						dbcPercent:dbcPercent(),
						sfcPercent:sfcPercent()
					};
				}
				
				this.Percentile=theSum(this.myDataMasge);
				
				let mask=document.querySelector('.mask_box');
				let dang_box=document.querySelector(".left_box");
				mask.style.display="block";
				let x=e.offsetX-mask.offsetWidth/2;
				let y=e.offsetY-mask.offsetHeight/2-40;
				mask.style.left=x+"px";
				mask.style.top=y+"px";
			},
			//隐藏地图的弹窗
			hidden(){
				var mask=document.querySelector('.mask_box');
				mask.style.display="none";
			},
			//标准化党组织考核分数图表
			echarts_1(){
				let dates=new Date();
				let times=dates.getFullYear()+'-'+(dates.getMonth()+1);
		    	this.$http.get(api_demo.apis6+"/queryStandardScore.action?time="+times).then(function(data){
		    		var inner_data=JSON.parse(data.bodyText);
		    		var numer_data=[];
					
		    		Array.from(inner_data).forEach(function(value,index){
		    			numer_data.push(value.value);
		    		});
		    		
			    	var myChart=this.$echarts.init(document.getElementById("bz_echarts_1"));
					var canvas = document.createElement('canvas');
					var	option = {
							color:["#F78B27","#213263"],
						    backgroundColor: {
						        type: 'pattern',
						        image: canvas,
						        repeat: 'repeat'
						    },
							//自定义的图例
						    legend: [{
						        right: "6.5%",
						        bottom:"13%",
						        itemWidth:10,
						        itemHeight:10,
						        itemGap:35,
						        data:[{
						        	name:'示范村(95分以上)',
						            icon:"circle",
						            textStyle:{color:'#fff'}
						        },{
						        	name:'红旗村(85-94分)',
						            icon:"circle",
						            textStyle:{color:'#fff'}
						        }]
						    },{
						    	right: "9.5%",
						        bottom:"5%",
						    	itemWidth:10,
						        itemHeight:10,
						        itemGap:50,
						    	data:[{
						        	name:'达标村(80-84分)',
						            icon:"circle",
						            textStyle:{color:'#fff'}
						        },{
						        	name:'80分以下',
						            icon:"circle",
						            textStyle:{color:'#fff'}
						        }]
						    }],
						    grid:{
						        left: '3%',
						        right: '4%',
						        bottom: '3%',
						        width:"60%",
						        containLabel: true
						    },
						    xAxis : [
					        {
					            type : 'category',
					            data : ['示范村', '红旗村', '达标村', '80分以下'],
					            axisTick: {
					                alignWithLabel: true
					            },
					            axisLabel: {        
		                        	show: true,
		                        	textStyle: {
		                            	color: '#fff',
		                            	fontSize:12,
//		                            	fontWeight:"bold"
		                        	}
	                        	}
					        }
						    ],
						    yAxis : [
						        {
						        	show:false,
						            type : 'value',
		                            //Y轴线上的网格
		                            splitLine: {
		                            	show: true, 
		                            	//  改变轴线颜色
		                            	lineStyle: {
		                                	// 使用深浅的间隔色
		                                	color: ['#262C3E']
		                            	}                            
		                        	},
		                        	//设置轴线上的文字
		                        	axisLabel: {
			                        	show: true,
			                        	textStyle: {
			                            	color: '#1299f5'
			                        	}
		                        	}
						        }
						    ],
						    
						    series: [ {
						    	
						    	//左侧--柱状
					            name:'人数',
					            type:'bar',
					            barWidth:55,
					            data:numer_data,
					            itemStyle:{
					            	//设置隔行换色
					            	normal:{
					            		color:function(params){
					            			let colorList=["#1299F5","#EB3569","#1299F5","#EB3569"];
					            			return colorList[params.dataIndex];
					            		}
					            	}
					            },
					            label: {
					                normal: {
					                    show: true,
					                    position: 'top'
					                }
							    }
						        
					        },{
					        	//右侧--圆
						        type: 'pie',
						        radius: [35, '60%'],
						        center: ['81%', '45%'],
						        color:["#DF2C33","#3CC9A9","#20ABEC","#FFA800"],
						        data:inner_data,
						        hoverAnimation: false,
	            				legendHoverLink: false,
						        itemStyle: {
							        normal : {
								        label:{
								            show:false
								        },
								        labelLine:{
								            show:false
								        }
							        }
							    }
						    }]
						}
			    	myChart.setOption(option);
		 		},function(err){
					console.log(err)
		 		})
			},
			//标准化党组织考核扣分分布图表
			last_echarts1(time,currentPage,pageSize){
				//时间
				var times=this.Nian+'-'+this.Month;
				//页码
				var currentPages=this.current;
				//一页显示的条数;
				var pageSizes=this.display;
				this.$http.get(api_demo.apis6+"/queryStandardOrganization.action?time="+times+"&currentPage="+currentPages+"&pageSize="+pageSizes).then(function(data){
					var inner_data=data.body;
				
					var xAixArray=[],
						yAiyArray=[],
						titleTip=[];
					var j_Index=0,
						one_arrInter=[],
						two_arrInter=[],
						therr_arrInter=[];
						
					this.total=inner_data.totalSize;
						if(inner_data.data.length==0){
							return
						}

						while(j_Index<=inner_data.data.length){
							if(inner_data.data.length>=14){
								if(j_Index<7){
									one_arrInter.push(inner_data.data[j_Index]);
								}else if(j_Index>=7&&j_Index<14){
									two_arrInter.push(inner_data.data[j_Index]);
								}else if(j_Index>=14&&j_Index<inner_data.data.length){
									therr_arrInter.push(inner_data.data[j_Index]);
								}
							}else if(inner_data.data.length<=7){
								if(j_Index<7){
									one_arrInter.push(inner_data.data[j_Index]);
								}
							}else if(inner_data.data.length>=7 && inner_data.data.length<14){
								if(j_Index<7){
									one_arrInter.push(inner_data.data[j_Index]);
								}else if(j_Index>=7&&j_Index<14){
									two_arrInter.push(inner_data.data[j_Index]);
								}
							}
							j_Index++;
						}						
						var xAixArray_one=[],  yData_one=[];
						var xAixArray_two=[],  yData_two=[];
						var xAixArray_therr=[],yData_therr=[];
						
						var titleTip_therr=[],
							titleTip_one=[],
							titleTip_two=[];
						for(var i=1;i<=3;i++){
							switch(i){
								case 1:
								one_arrInter.forEach(function(val,index){
									xAixArray_one.push(val.serialNumber);
									yData_one.push(val.villageCount);
									titleTip_one.push(val.content);
								})
								xAixArray=xAixArray_one;
								yAiyArray=yData_one;
								titleTip=titleTip_one;
								break;
								case 2:
								
								two_arrInter.forEach(function(val,index){
									xAixArray_two.push(val.serialNumber);
									yData_two.push(val.villageCount);
									titleTip_two.push(val.content);
								})
								xAixArray=xAixArray_two;
								yAiyArray=yData_two;
								titleTip=titleTip_two;
								
								break;
								case 3:
								
								therr_arrInter.forEach(function(val,index){
									xAixArray_therr.push(val.serialNumber);
									yData_therr.push(val.villageCount);
									titleTip_therr.push(val.content);
								})
								xAixArray=xAixArray_therr;
								yAiyArray=yData_therr;
								titleTip=titleTip_therr;
								
								break
							};
						}
				
						var myChart=this.$echarts.init(document.getElementById("echar1"));
						var	option = {
							    tooltip: {
							        formatter:function(params){
							        	if(params.seriesIndex==1){
							        		return titleTip_one[params.dataIndex];
							        	}else if(params.seriesIndex==3){
							        		return titleTip_two[params.dataIndex];
							        	}else if(params.seriesIndex==5){
							        		return titleTip_therr[params.dataIndex];
							        	}
							        },
									show:true
							    },
							    grid: [{
							        top: 50,
							        width: '30%',
							        bottom:10,
							        left: 10,
							        containLabel: true
							    }, {
							        top: 50,
							        width: '30%',
							        bottom: 10,
							        left: 325,
							        containLabel: true
							    }, {
							        top: 50,
							        width: '30%',
							        bottom:10,
							        left: 650,
							        containLabel: true
							    }
							    ],
							    xAxis: [{
							        show:false,
							        gridIndex: 0,
							        type: 'value',
							        splitLine: {
							            show: false
							        }
							    }, {
							        show:false,
							        type: 'value',
							        gridIndex: 1,
							        splitLine: {
							            show: false
							        }
							    }, {
							        show:false,
							        type: 'value',
							        gridIndex: 2,
							        splitLine: {
							            show: false
							        }
							    }],
							    yAxis: [{
							        type: 'category',
							        inverse:true,
							        data: xAixArray_one,
							        axisLabel: {
							            interval: 0,
							            textStyle:{
							            	color:"#fff"
							            }
							        },
							        splitLine: {
							            show: false
							        }
							    },{
							        gridIndex:1,
							        inverse:true,
							        type: 'category',
							        data: xAixArray_two,
							        axisLabel: {
							            interval: 0,
							            textStyle:{
							            	color:"#fff"
							            }
							        },
							        splitLine: {
							            show: false
							        }
							    },
							    {
							        gridIndex: 2,
							        inverse:true,
							        type: 'category',
							        data: xAixArray_therr,
							        axisLabel: {
							            interval: 0,
							            textStyle:{
							            	color:"#fff"
							            }
							        },
							        splitLine: {
							            show: false
							        }
							    }
							    ],
							    series: [{
								        type: 'bar',
								        stack: 'chart',
								        barWidth:15,
								        z: 3,
								        itemStyle: {
								              normal: {
								                 //颜色渐变
								                  color:"#1299F5",
								                  barBorderRadius:[7.5,7.5,7.5,7.5]
								              }
								        },
								        label: {
								            normal: {
								                position: 'right',
								                show: true
								            }
								        },
								        data:yData_one
								    },
								    {
								        type: 'bar',
								        stack: 'chart',
								        barWidth:15,
								        z: 3,
								        itemStyle: {
								              normal: {
								                 //颜色渐变
								                  color:"rgba(33,38,53,.5)",
								                  barBorderRadius:[7.5,7.5,7.5,7.5]
								              }
								        },
								        label: {
								            normal: {
	//							                position: 'right',
								                show: false
								            }
								        },
								        data:[20,20,20,20,20,20,20]
								    },
								    {
								        type: 'bar',
								        barWidth:15,
								        stack: 'component',
								        xAxisIndex: 1,
								        yAxisIndex: 1,
								        z: 3,
								        itemStyle: {
								              normal: {
								                 //颜色渐变
								                  color:"#1299F5",
								                  barBorderRadius:[7.5,7.5,7.5,7.5]
								              }
								        },
								        label: {
								            normal: {
								                position: 'right',
								                show: true
								            }
								        },
								        data:yData_two
								 
								    },{
								        type: 'bar',
								        barWidth:15,
								        stack: 'component',
								        xAxisIndex: 1,
								        yAxisIndex: 1,
								        z: 3,
								        itemStyle: {
								              normal: {
								                 //颜色渐变
								                  color:"rgba(33,38,53,.5)",
								                  barBorderRadius:[7.5,7.5,7.5,7.5]
								              }
								        },
								        label: {
								            normal: {
	//							                position: 'right',
								                show: false
								            }
								        },
								        data:[20,20,20,20,20,20,20]
								 
								    },{
								        type: 'bar',
								        stack: 'year',
								         barWidth:15,
								        xAxisIndex: 2,
								        yAxisIndex: 2,
								        itemStyle: {
								              normal: {
								                 //颜色渐变
								                  color:"#1299F5",
								                  barBorderRadius:[7.5,7.5,7.5,7.5]
								              }
								        },
								        z:3,
								        label: {
								            normal: {
								                position: 'right',
								                show: true
								            }
								        },
								        data:yData_therr
								 
								    },{
								        type: 'bar',
								        stack: 'year',
								         barWidth:15,
								        xAxisIndex: 2,
								        yAxisIndex: 2,
								        itemStyle: {
								              normal: {
								                 //颜色渐变
								                  color:"rgba(33,38,53,.5)",
								                  barBorderRadius:[7.5,7.5,7.5,7.5]
								              }
								        },
								        z:3,
								        label: {
								            normal: {
	//							                position: 'right',
								                show: false
								            }
								        },
								        data:[20,20,20,20,20,20,20]
							 
							    }]
							}
			            myChart.setOption(option);
					
				},function(err){alert("扣分分布数据获取失败")})
			}
		},
		components: {
	      'v-pagination': pagination,
	    }
	}
</script>
<style scoped>
	.biaozhun{
		color:white;
	}
	.left_box,.right_box{
		display:inline-block;
		vertical-align:top;
	}
	/*595*750*/
	.left_box{
		width:595px;
		height:750px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		padding-top:10px;
		box-sizing:border-box;
		position:relative;
	}
	.new_add .hezi_tit{
		height:30px;
	}
	.new_add .hezi_tit .title_dang2{
		display:inline-block;
	}
	.new_add .hezi_tit .ulBox{
		float:right;
	}
	.new_add .hezi_tit .ulBox li{
		list-style:none;
		display:inline-block;
		width:20px;
		height:20px;
		border-radius:50%;
		line-height:20px;
		color:white;
		text-align:center;
		margin-left:10px;
		cursor:pointer;
	}
	.li_acrive{
		background-color:#1299F5;
	}
	.hezi_tit{
		width:100%;
		padding:0 25px;
		box-sizing:border-box;
		position:relative;
	}
	.hezi_tit .title_dang2{
		color:#1299f5;
		font-size:18px;
		font-weight:bold;
		height:30px;
		line-height:30px;
		margin-bottom:7px;
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
		right:25px;
		border-radius:2px;
         /*很关键：将默认的select选择框样式清除*/
	   	appearance:none;
	   -moz-appearance:none;
	   -webkit-appearance:none;
	   /*在选择框的最右侧中间显示小箭头图片*/
	   background: url("../../../static/images/x1_03.png") no-repeat right center /auto 110% #2C3C6B;
	   background-position:96% 50%;
	}
	input[type="submit"]{
		width:80px;
		right:25px;
		height:28px;
		border:none;
		font-size:12px;
		color:white;
	   	background:#2C3C6B;
		border-radius:2px;
		position:absolute;
		top:0;
		bottom:0;
		margin:auto;
	}
	/*959*750*/
	.right_box{
		width:978px;
		height:750px;
		margin-left:15px;
	}
	#bz_echarts_1{
		width:100%;
		height:333px;
		font-size:0;
	}
	#last_echarst1 #echar1{
		width:100%;
		height:100%;
		display:inline-block;
		vertical-align:top;
		font-size:14px;
	}
	.img_box{
		width:100%;
		height:700px;
		padding-top:30px;
		box-sizing:border-box;
		text-align:center;
	}
	.right_box .top{
		width:100%;
		height:384px;
		border:1px solid #262C3E;
		background-color:#0D1428;
	}
	.right_box .bottom{
		width:100%;
		height:347px;
		border:1px solid #262C3E;		
		background-color:#0D1428;
		margin-top:18px;
	}
	.right_box .top,.right_box .bottom{
	    padding-top:10px;
		box-sizing:border-box;
	}
	#last_echarst1{
		width:100%;
		height:296px;
		padding:0 10px;
		box-sizing:border-box;
	}
.mask_box{
  	width:330px;
  	height:140px;
  	position:absolute;
  	border:1px solid #262C3E;
  	top:0;
  	left:0;
  	display:none;
  }
  .mask_titles{
  	width:100%;
  	height:40px;
  	text-align:center;
  	font-size:18px;
  	color:#1299F5;
  	line-height:40px;
  	font-size:18px;
  	font-weight:bolder;
  	background-color:rgba(41,50,78,0.8);
  }
  .big_w{
  	width:100%;
  	height:100px;
  	background-color:rgba(0,0,0,.8);
  	font-size:0;
  	padding-top:10px;
  	box-sizing:border-box;
  }
  .big_w li{
  	width:33%;
  	display:inline-block;
  	vertical-align:top;
  	height:80%;
  	font-size:16px;
  	border-left:1px solid #262C3E;
  	box-sizing:border-box;
  	text-align:center;
  }
  .big_w li p:first-child{
  	color:white;
  	font-weight:bold;
  	font-size:24px;
  }
  .big_w li p:nth-child(2){
  	color:#1299F5;
  	font-size:14px;
  }
  .big_w li p:last-child{
    font-size:14px;
    color:white;
  }
</style>