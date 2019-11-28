<template>
	<div class="dangyuan bottom_contes">
		<div class="top_box">
		    <div class="left">
		    	<div class="hezi_tit">
		    		<h3 class="title_dang">党员文化程度分布</h3>
				    <!--<select name="right_top" v-model="Street">
		              	<option value="1">乡镇</option>
		              	<option value="2">街道</option>
		            </select>-->
		    	</div>
		       	<div class="dang_echart" id="dang_echart"></div>
		    </div>
		    <div class="right">
		    	<div class="hezi_tit">
		    		<h3 class="title_dang2">各类型组织党员数量分布</h3>
		    		<select name="right_top" v-model="change_lei">
	              		<option v-for="vals in leixing" :value="vals.RegionID">{{vals.RegionName}}</option>
	              	</select>
		    	</div>
		    	<div id="dy_echart_huan"></div>
		    </div>
		</div>
		<div class="bottom_box">
			<div class="left_b">
				<div class="hezi_tit">
		    		<h3 class="title_dang2">发展党员情况</h3>
	              	<select name="right_top" style="right:160px" v-model="f_name">
	              		<option v-for="vals in faZhan" :value="vals.id">{{vals.name}}</option>
	              	</select>
	              	<select name="right_top" style="right:10px" id="" v-model='liu_add'>
	              		<option value="1">年龄</option>
	              		<option value="2">性别</option>
	              		<option value="3">文化</option>
	              		<option value="4">职业</option>
	              	</select>
		    	</div>
		    	<div class="dy_echart_boxs" id="dy_echart_boxs"></div>
			</div>
			<div class="right_b">
				<div class="hezi_tit">
		    		<h3 class="title_dang2">职业统计</h3>
		    		<select name="right_top" v-model="z_name">
	              		<option v-for="vals in leixing" :value="vals.RegionID">{{vals.RegionName}}</option>
	              	</select>
		    	</div>
		    	<div class="dy_right_botx" id="dy_right_botx"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import api_demo from "../../../static/js/demo_api.js"
	export default{
		name:"dangyuan",
		data(){
			return {
				leixing:'',
				liu_add:1,
				change_lei:'610602',
				faZhan:'',
				Street:1,
				f_name:'610602,area',
				z_name:'610602'
			}
		},
		mounted:function(){
			let _this=this;
			_this.$http.get(api_demo.apis2+"/queryBaoTaOrderPartyMemberDistributionSelect.action").then(function(data){
					this.leixing=data.body
			},function(){
				console.log("数据出错");
			})
			//发展党员情况下拉框获取
			_this.$http.get(api_demo.apis2+"/queryBaoTaOrderPartyMemberDevlopSelect.action").then(function(data){
					this.faZhan=data.body
			},function(){})
			
			this.httpsd();
			this.leixingFun();
			this.faZhanFun();
			this.zhiYeFun();
		},
		watch:{
			liu_add:function(news,old){
				this.faZhanFun(this.f_name,news);
			},
			change_lei:function(news,old){
                this.leixingFun(news);
			},
			f_name:function(news,old){
				this.faZhanFun(news,this.liu_add);
			},
			z_name:function(news,old){
				this.zhiYeFun(news);
			},
			Street:function(news,old){
				console.log(news,old)
			}
		},
		methods:{
			//左上角图表  (党员文化程度分布图表)
			get_echart(name_arr,data_arr){
				let myChart=this.$echarts.init(document.getElementById("dang_echart"));
				let option = {
				    //全局的颜色
				    color: ['#3398DB'],
				    //鼠标移入后的提示框设置
				    tooltip : {
				        trigger: 'axis',
				        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
				            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
				        }
				    },
				    //canvas画布的位置调整
				    grid: {
				        left: '3%',
				        right: '4%',
				        bottom: '3%',
				        containLabel: true
				    },
					// 图例的配置
				    legend:{
						//图例的小标题显示
                        icon:"rect",
					    tooltip:{
					        show:true
					    },
					    data:["初中及以下","高中","中专","本科及以上","大专"],
						// 图例文字
					    textStyle: {
					            fontSize: 12,
					            color: '#F1F1F3'
					    },
						// 图例间的间距
					    itemGap: 45
					},
					//x轴设置
				    xAxis : [
				        {
				            type : 'category',
				            data : name_arr,
				            axisTick: {
				                alignWithLabel: true
				            },
				            axisLabel: {
                                    show: true,
                                    textStyle: {
                                        color: '#fff'
                                    }
                            }
				        }
				    ],
				    //y轴设置
				    yAxis : [
				        {
				            type : 'value',
				            name:"人数",
				            nameTextStyle:{
					            color:"#fff" 
					        },
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
				    //具体数据的设置
				    series : data_arr
				};
                //调用echarts图表
	            myChart.setOption(option);
			},
			httpsd(){
				let _this=this;
				//党员文化程度分布数据获取
				!function(){
					_this.$http.get(api_demo.apis2+"/queryBaoTaOrderPartyMemberCulture.action?type=1").then(function(data){
						var obj={
							nr:[], //x轴名称
							a:[], //初中级以下
							b:[], //高中
							c:[], //中专
							d:[], //本科及以上
							e:[]  //大专及以上
						};
						data.body.forEach(function(val,index){
							// x轴名称
							obj.nr.push(val.RegionName);
							// 数据
							obj.a.push(val.chuzhong)
							obj.b.push(val.gaozhong)
							obj.c.push(val.zhuanke)
							obj.d.push(val.overbenke)
							obj.e.push(val.dazhuan)
						})
						var data_arr=[
							{
					            name: '初中及以下',
					            type: 'bar',
					            barGap: 0,
					            itemStyle:{normal:{color:"#3be9df"}},
					            data: obj.a
							},{
					            name: '高中',
					            type: 'bar',
					            barGap: 0,
					            itemStyle:{normal:{color:"#ffa729"}},
					            data: obj.b
							},{
					            name: '中专',
					            type: 'bar',
					            barGap: 0,
					            itemStyle:{normal:{color:"#c6d73d"}},
					            data: obj.c
							},{
					            name: '本科及以上',
					            type: 'bar',
					            barGap: 0,
					            itemStyle:{normal:{color:"#ad7ef4"}},
					            data: obj.d
							},{
					            name: '大专',
					            type: 'bar',
					            barGap: 0,
					            itemStyle:{normal:{color:"#ff6696"}},
					            data: obj.e
							}
						];
						this.get_echart(obj.nr,data_arr);
					},function(error){
						console.log(error)
					})
				}();
			},
			//职业统计获取数据
			zhiYeFun(ids){
				    let url_id=ids?ids:610602;
					this.$http.get(api_demo.apis2+"/queryBaoTaOrderPartyMemberJobCount.action?regionId="+url_id).then(function(data){
						
				 	let data_alls=JSON.parse(data.bodyText)[0];
				 	let name_arr=[],data_arr=[];
				 	for(let vals in data_alls){
				 		switch(vals){
				 			case "nmym":
				 			   name_arr.push("农牧渔民")
				 			break
				 			case "zyjs":
				 			   //职业技术
				 			   name_arr.push("职业技术")
				 			break
							case "ltx":
							   //离退休
				 			   name_arr.push("离退休")
							break
				 			case "qt":
				 			   //其他
				 			   name_arr.push("其他")
				 			break
				 			case "dwgl":
				 			   //单位管理
				 			   name_arr.push("单位管理")
				 			break
				 			case "gr":
				 				//工人
				 			   name_arr.push("工人")
				 			break
				 			case "xs":
				 			    //学生
				 			   name_arr.push("学生")
				 			break
				 			case "dzjg":
				 			    //党政机构
				 			   name_arr.push("党政机构")
				 			break
				 		}
				 		data_arr.push(data_alls[vals]);
				 	}
				 	this.right_bottom(name_arr,data_arr);
				 },function(){})
			},
		    //各类型组织党员数据下获取
			leixingFun(ids){
				let url_id=ids?ids:610602;
				this.$http.get(api_demo.apis2+"/queryBaoTaOrderPartyMemberDistribution.action?regionId="+url_id).then(function(data){
					let datas=data.body[0];
					let data_arrs=[],data_name=[];
					for(let val in datas){
					 	let name_obj={};
					 	switch(val){
					 		case "society":
					 			name_obj.name="社会党组织党员";
					 		break
					 		case "other":
					 			name_obj.name="其他党组织党员";
					 		break
					 		case "nonpublic":
					 			name_obj.name="非公开党组织党员";
					 		break
					 		case "school":
					 			name_obj.name="学校党组织党员";
					 		break
					 		case "countryside":
					 			name_obj.name="农村党组织党员";
					 		break
					 		case "office":
					 			name_obj.name="机关党组织党员";
					 		break
					 		case "community":
					 			name_obj.name="社区党组织党员";
					 		break
					 		case "company":
					 			name_obj.name="企业党组织党员";
					 		break
					 	}
					 	data_name.push(name_obj.name);
					 	name_obj.value=datas[val];
					 	data_arrs.push(name_obj);
					 }
					 this.get_huan(data_name,data_arrs);
				},function(){})
			},	
			
			//发展党员情况获取数据
			faZhanFun(ids,liu_add){ 
				   	let url_id=ids?ids:610602;
				   	let liu_adds=liu_add||1;
				   	let num_arr=[],data_arr=[];
				   	var puAry=[],lastAry=[];
					this.$http.get(api_demo.apis2+"/queryBaoTaOrderPartyMemberDevlop.action?regionId="+url_id+",area&num="+liu_adds).then(function(data){
						let data_all=data.body;
						console.log(data.body)
						let toolName=[],xAxisName=[];
						//取tooltip的名称  start;
						Object.keys(data_all.data[0]).map(function(keys){
							if(keys != "STAGE"){
								toolName.push(keys);
							}
						});
						//tooltip名称 end;
						
						//数据
						Object.keys(data_all.data).map(function(key,index){
								//每次都先清空数组
								num_arr=[];
								for(var j=0;j<toolName.length;j++){
									num_arr.push(data_all.data[key][toolName[j]]);	
								}
								//每循环一次num_arr都给data_arr追加进去
								data_arr.push(num_arr);									
								//取x轴名称;
								xAxisName.push(data_all.data[key].STAGE);
						});
						
						
						//二次处理data_arr的数据
						for(var i=0;i<data_arr[0].length;i++){		
							puAry=[];
							for(var j=0;j<data_arr.length;j++){
								puAry.push(data_arr[j][i])	
							}
							lastAry.push(puAry);
						}
						//返回给自己;
						data_arr=lastAry;
						//调用
						this.left_bottom(data_arr,toolName,xAxisName);
					},function(){})
			},
			
			
			//左下角图表 (发展党员情况图表)
			left_bottom(datas,toolName,xAxisName){
				let myChart=this.$echarts.init(document.getElementById("dy_echart_boxs"));
				var partyMemberColor=['#CF471D',"#E28500","#FFC600","#F0FF00"];
				var sericesData=[];
				function my_obj2(name,data,color){
					return {
						name:name,
						data:data,
						type:'bar',
						stack:'smoe',
						barWidth:'56',
						itemStyle:{
							normal:{
								color:color
							}
						}
					}
				};
		       	for(var i=0;i<datas.length;i++){
		       		sericesData.push(my_obj2(toolName[i],datas[i],partyMemberColor[i]))
		       	};
				let option = {					    
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    //控制canvas画布内边距
					    grid: {
					    	top:"15%",
					        left: '3%',
					        right: '4%',
					        bottom: '5%',
					        containLabel: true
					    },
					    xAxis : [
					        {
					            type : 'category',
					            data : xAxisName,
					            axisTick: {
					                alignWithLabel: true
					            },
					             // x轴的字体样式
                        		axisLabel: {        
                                	show: true,
                                	textStyle: {
                                    	color: '#fff',
                                    	fontSize:'14'
                                    }
                                }
					        }
					    ],
					    yAxis : [
					        {
					            type : 'value',
					            min:0,
					            
					            name:"人数",
					            nameTextStyle:{color:"#fff"},
					            //改变y轴的字体颜色
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
					    series : sericesData
					};
	                myChart.setOption(option,true);
				
			},
			//右上角图表  (各类型组织党员数量分布图表)
			get_huan(data_name,data_arrs){
					//初始化并且拿到需要渲染到的DOM元素
			    	let myChart=this.$echarts.init(document.getElementById("dy_echart_huan"));
					let option = {
							    tooltip : {
							        trigger: 'item',
							        formatter: "{a} <br/>{b} : {c} ({d}%)"
							    },
							    //控制canvas画布内边距
							  
							    legend: {
							        orient : 'vertical',
							        x : '75%',
							        y:"20%",
							        data:data_name,
							        textStyle: {
					            		fontSize: 12,
					            		color: '#F1F1F3'
					    			}
							    },
							    toolbox: {
							        show : true
							    },
							    calculable : true,
							    series : [
							        {
							            name:'党员数量分布',
							            type:'pie',
							            radius : ['30','44%'],
							            center: ['40%', '50%'],
							            data:data_arrs
							        }
							    ]
							};
	            myChart.setOption(option);
			},
		
		  
//		         右下角图表   (职业统计图表)
            right_bottom(name,datas){
            	let myChart=this.$echarts.init(document.getElementById("dy_right_botx"));
				let option = {					    
					    tooltip : {
					        trigger: 'axis',
					        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
					            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
					        }
					    },
					    
					    grid: {
					    	top:"15%",
					        left: '3%',
					        right: '4%',
					        bottom: '5%',
					        containLabel: true
					    },
					    xAxis : [
					        {
					            type : 'category',
					            data : name,
					            axisTick: {
					                alignWithLabel: true
					            },
					             // x轴的字体样式
                        		axisLabel: {        
                                	show: true,
                                	textStyle: {
                                    	color: '#fff',
                                    	fontSize:'14'
                                	}
                            },
					        }
					    ],
					    yAxis : [
					        {   
					        	name:"人数",
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
					            name:'党员数量',
					            type:'bar',
					            barWidth: '27',
					            stack: '总量',
								itemStyle: {
						              normal: {
						                 //颜色渐变
						                  color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [{
						                  offset: 0,
						                  color: '#FF3432'
						                }, {
						                  offset: 1,
						                  color: '#FF9E59'
						                }])
						              }
						        },
					            data:datas
					        }
					    ]
					};
	                myChart.setOption(option);
            }
		}
	}
</script>
<style scoped>
	.dangyuan{
		color:white
	}
	.top_box{
		width:100%;
		height:auto;
	}
	/*1030*436*/
	.top_box .left{
		width:1000px;
		height:436px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		padding-top:10px;
		box-sizing:border-box;
	}
	.title_dang{
		color:#1299f5;
		text-align:center;
		font-size:18px;
		font-weight:bold;
		height:30px;
		line-height:30px;
		margin-bottom:7px;
	}
	.hezi_tit{
		width:100%;
		padding:0 25px;
		box-sizing:border-box;
		position:relative;
	}
	.title_dang2{
		color:#1299f5;
		font-size:18px;
		font-weight:bold;
		height:30px;
		line-height:30px;
		margin-bottom:7px;
	}
	.dang_echart{
		width:100%;
		height:385px;
	}
	/*495*436*/
	.top_box .right{
		width:573px;
		height:436px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		margin-left:13px;
		padding-top:10px;
		box-sizing:border-box;
	}
	.left,.right{
		display:inline-block;
		vertical-align:top;
	}
	/*14*/
	.bottom_box{
		width:100%;
		height:300px;
		margin-top:14px;
	}
	/*871*300*/
	.bottom_box .left_b{
		width:871px;
		height:100%;
		border:1px solid #262C3E;
		background-color:#0D1428;
		padding-top:10px;
		box-sizing:border-box;
		
	}
	/*655*300*/
	.bottom_box .right_b{
		width:701px;
		height:100%;
		border:1px solid #262C3E;
		background-color:#0D1428;
		margin-left:14px;
		padding-top:10px;
		box-sizing:border-box;
	}
	.left_b,.right_b{
		display:inline-block;
		vertical-align:top;
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
		padding:0 30px 0 15px;
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
	select[name="right_top"]#twos_select{
		right:180px;
	}
	#dy_echart_huan{
		width:100%;
		height:380px;
	}
	.dy_echart_boxs{
		width:100%;
		height:248px;
	}
	.dy_right_botx{
		width:100%;
		height:248px;
	}
</style>