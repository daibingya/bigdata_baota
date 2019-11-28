<template>
	<div class="xiangmu bottom_contes">
		<div class="left_Box">
		    <div class="ones">
				<h3 class="all_tit">项目管理总览</h3>
		        <div class="content1">
		        	<div class="sung" v-for="val in projectData">
		        		<p>{{val.value}}</p>
		        		<p>{{val.name}}</p>
		        	</div>
		        </div>
		    </div>
		    <div class="twos">
				<h3 class="all_tit">项目管理占比统计</h3>
		        <div class="content2" id="content2"></div>
		    </div>
		</div>
		<div class="right_Box">
			<div class="tops">
				<!--第一部分（下拉框搜索）开始-->
				<ul class="list_box">
					<li class="list_song">
							<span class="op_img"></span>
							<select name="" v-model="selectoneId">
								<option v-for="val in selectData" :value="val.id">{{val.name}}</option>
							</select>
							<span class="false_hr"></span>
					</li>
					<li class="list_song">
							<span class="op_img"></span>
							<select name="" v-model="selecttwoId">
								<option value="0">-请选择-</option>
								<option v-for="val in selecttwoData" :value="val.id">{{val.name}}</option>
							</select>
							<span class="false_hr"></span>
					</li>
					<li class="list_song">
							<span class="op_img"></span>
							<select name="" v-model="selectthersId">
								<option value="0">-请选择-</option>
								<option v-for="val in selecttherData" :value="val.id">{{val.name}}</option>
							</select>
							<span class="false_hr"></span>
					</li>
					<li class="sou_suo" @click="searchData">
						<img src="../../../static/images/s1_03.png" alt="" />
					</li>
				</ul>
				<!--第一部分(下拉框搜素)结束-->
				
			</div>
			<div class="centers">
				<div class="smalls">
					<h3 class="all_tit">延期项目管理统计</h3>
					<div class="echats_box1" id="ones1"></div>
				</div>
				<div class="smalls">
					<h3 class="all_tit">预警项目管理统计</h3>
					<div class="echats_box1" id="ones2"></div>
				</div>
			</div>
			<div class="centers">
				<div class="smalls">
					<h3 class="all_tit">正常项目管理统计</h3>
					<div class="echats_box1" id="ones3"></div>
				</div>
				<div class="smalls">
					<h3 class="all_tit">结项项目管理统计</h3>
					<div class="echats_box1" id="ones4"></div>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import {Url_api} from "../../../static/js/API_URL.js";
	import api_demo from "../../../static/js/demo_api.js";
	export default{
		name:"xiangmu",
		data(){
			return{
				projectData:'',
				selectData:'',
				selectoneId:'610602',
				selecttwoData:'',
				selecttwoId:'0',
				selecttherData:'',
				selectthersId:'0',
				jilu:'',
				dataIndex:{
					a:'',
					b:'',
					c:''
				}
			}
		},
		mounted:function(){
			this.ones(610602,'','');
			this.twos();
			this.Overview();
			this.selectone_Fun();
		},
		watch:{
			selectoneId:function(news,old){
				console.log(1);
				this.selectone_Fun(news,false)
				this.dataIndex.a=news;
				this.dataIndex.b='';
				this.dataIndex.c='';
			},
			selecttwoId:function(news,old){
				this.selectone_Fun(this.jilu,news);
				this.dataIndex.b=news;
				this.dataIndex.c='';
			},
			selectthersId:function(news,old){
				this.dataIndex.c=news;
			}
		},
		methods:{
			//查询函数
			searchData(){
				var dataIndex=this.dataIndex;
				this.ones(dataIndex.a,dataIndex.b,dataIndex.c);
			},
			selectone_Fun(parmes,second){
				var _that=this;
				//一级
				new Promise(function(resolve,reject){
					_that.$http.get(api_demo.apis4+"/queryStreetSelect.action").then(
						function(data){
							console.log(data);
							_that.selectData=data.body;
							let parentId=parmes?parmes:_that.selectData[0].id;
							_that.jilu=parentId;
							resolve(parentId);
						}
					)
				//二级
				})
				.then(function resolve(id){
					return new Promise(function(resolve,reject){
						_that.$http.get(api_demo.apis4+"/queryCommunitySelect.action?parentId="+id).then(function(data){	
						_that.selecttwoData=data.body;
						resolve(second)
						})
					})
				},function reject(){})
				//三级
				.then(function resolve(id){
					_that.$http.get(api_demo.apis4+"/queryNetSelect.action?parentId="+id).then(function(data){
						_that.selecttherData=data.body;
					})
				})
			},
			Overview(){
				this.$http.get(api_demo.apis4+"/queryProjectManangerPro.action").then(function(data){
						this.projectData=JSON.parse(data.bodyText);
				    },function(error){
						console.log(error)
				})
			},
			//延期项目管理统计,预警项目,正常项目,结项项目--图表
			ones(oneId,twoId,threeId){
				var oneId=oneId?oneId:"";
				var twoId=twoId?twoId:"";
				var threeId=threeId?threeId:"";
				
				let myColor=[{
					color1:"#feba98",
					color3:"#f34f94"
				},{
					color1:"#ff6160",
					color3:"#f7995c"
				},{
					color1:"#945cf0",
					color3:"#dbbafb"
				},{
					color1:"#4f78fa",
					color3:"#91eeff"
				}
				];
				for(let i=0;i<4;i++){
					this.$http.get(api_demo.apis4+"/queryExtensionProject.action?state="+(i+1)+"&street="+oneId+"&community="+twoId+"&grid="+threeId).then(function(data){
						var inner_data=JSON.parse(data.bodyText);
						var namr_arr=[],data_arr=[];
						inner_data.forEach(function(val){
							namr_arr.push(val.month);
							data_arr.push(val.value);
						}) 
					var myChart=this.$echarts.init(document.getElementById(`ones${i+1}`));
				  	var option = {
				  		tooltip:{show:true},
					    xAxis: {
					    	name:"月份",
					    	nameTextStyle:{
					    		color:"#fff"
					    	},
					    	
					        type: 'category',
					        boundaryGap: false,
					        data: namr_arr,
					         // x轴的字体样式
	                        axisLabel: {   
	                        		rotate:45,
	                            	show: true,
	                            	textStyle: {
	                                	color: '#fff',
	                                	fontSize:'12'
	                                }
	                        },
	                        axisTick:{
	                 		   alignWithLabel:true
	                		}
					    },
					    yAxis: {
					         name:"个数",
					         nameTextStyle:{
						            color:"#fff" 
						     },
					         type: 'value',
					         axisLabel: {        
	                                	show: true,
	                                	textStyle: {
	                                    	color: '#1299f5',
	                                    	fontSize:'12'
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
					    },
					    series: [{
					        data:data_arr,
					        type: 'line',
					        smooth:true,   //让线条变得圆滑
					        areaStyle:{normal:{}},
					        symbolSize:6,
					        itemStyle: {
						        normal: {
						            color: new this.$echarts.graphic.LinearGradient(
						                0, 0, 0, 1,
						                [
						                    {offset: 0, color:myColor[i].color1},
						                    {offset: 1, color:myColor[i].color3}
						                ]
						            ),
						            lineStyle:{
						            	color:"rgba(0,0,0,0)"
						            }
						        }
						    }
					    }]
					};
	            	myChart.setOption(option);
				},
				function(err){console.log("延期项目管理统计遍历出错")})
				}
			}
			//项目管理占比统计
		    ,twos(){
		    		this.$http.get(api_demo.apis4+"/queryProjectManangerPro.action").then(function(data){
							var inner_Data=JSON.parse(data.bodyText);
							var myChart=this.$echarts.init(document.getElementById("content2"));
		              		var option = {
				              		color:['#ff6a92','#ffd66a','#68ffdc','#759eff'],
								    tooltip: {
								        trigger: 'item',
								        formatter: "{a} <br/>{b}: {c} ({d}%)"
								    },
								    legend: {
								        orient: 'vertical',
								        x: '75%',
								        y:"25%",
										itemGap:15, 
								        data:['延期','预警','正常','完结'],
								        textStyle:{
								        	color:"#1299f5"
								        }
								    },
								    //原生设置环形图内部文字
								    graphic:{
								    	type:"text",
								    	left:"27.8%",
								    	top:"43.5%",
								    	z:2,
								    	zlevel:100,
								    	style:{
								    		text:"",
								    		x:10,
								    		y:10,
								    		textAlign:"center",
								    		fill:"#fff",
								    		fontSize:16
								    	}
								    },
								    series: [
								        {
								            name:'占比统计',
								            type:'pie',
								            center:["35%","45%"],
								            radius: ['35%', '70%'],
								            selectedMode: 'single',
								            avoidLabelOverlap: false,
								            label: {
								                normal: {
								                    show: false,
								                    position: 'inner',
		                        					formatter : function (params) {                         
		                          						return (params.percent - 0).toFixed(0) + '%'
		                        					},
								                    textStyle:{
								                        color:"#fff",
								                        fontSize:16,
								                        fontWeight:"bold"
								                    }
								                },
								                emphasis: {
								                    show: true,
								                    formatter : "{b}\n{d}%",
								                    textStyle: {
								                        fontSize: '14',
								                        fontWeight: 'bold',
								                        color:"#fff"
								                    }
								                }
								            },
								            labelLine: {
								                normal: {
								                    show: false
								                }
								            },
								            data:inner_Data
								        }
								    ]
						};
			            myChart.setOption(option); 
					   },function(error){
							alert("错误")
					})
                     
		    }
		}
	}
</script>
<style scoped>
	.xiangmu{
		color:white;
	}
	/*463*364*/
	.left_Box{
		width:463px;
		height:auto;
	}
	.left_Box,.right_Box{
		display:inline-block;
		vertical-align: top;
	}
	.left_Box .ones{
		width:100%;
		height:364px;
		border:1px solid  #262C3E;
		background-color:#0D1428;
		padding-top:32px;
		box-sizing:border-box;
	}
	.content1{
		width:403px;
		height:220px;
		margin:30px auto 0;
	}
	.content1 .sung{
		width:193px;
		height:100px;
	    display:inline-block;
	    vertical-align: top;
	    background-color:#162243;
	}
	.content1 .sung:nth-child(2n){
		margin-left:13px;
	}
	.content1 .sung:nth-child(n+3){
		margin-top:13px;
	}
	.content1 .sung p{
		width:100%;
		text-align:center;
	}
	.content1 .sung:nth-child(1) p:first-child{
		color:#ff5757;
	}
	.content1 .sung:nth-child(2) p:first-child{
		color:#ffd66a;
	}
	.content1 .sung:nth-child(3) p:first-child{
		color:#68ffdc;
	}
	.content1 .sung:nth-child(4) p:first-child{
		color:#759eff;
	}
	.content1 .sung p:first-child{
		height:60px;
		font-weight:bold;
		font-size:36px;
		line-height:75px;
	}
	.content1 .sung p:last-child{
		height:40px;
		line-height:25px;
		font-size:14px;
		font-weight:bold;
	}
	.content2{
		width:100%;
		height:275px;
		margin-top:30px;
	}
	.left_Box .twos{
		width:100%;
		height:369px;
		border:1px solid  #262C3E;
		background-color:#0D1428;
		margin-top:14px;
		padding-top:32px;
		box-sizing:border-box;
	}
	/*1109*49*/
	.right_Box{
		width:1109px;
		height:auto;
		margin-left:12px;
	}
	.right_Box .tops{
		width:100%;
		height:49px;
	}
	/*547*335*/
	.right_Box .centers{
		margin-top:14px;
		width:100%;
	}
	.right_Box .centers .smalls{
		width:547px;
		height:335px;
		border:1px solid  #262C3E;
		background-color:#0D1428;	
		display:inline-block;
		vertical-align:top;	
		padding-top:10px;
		box-sizing:border-box
	}
	.all_tit{
		width:100%;
		height:30px;
		line-height:30px;
		font-weight:bold;
		text-align:center;
		font-size:18px;
		color:#1299f5
	}
	.echats_box1{
		width:100%;
		height:288px;
	}
	.right_Box .centers .smalls:last-child{
		margin-left:7px;
	}
	.list_box{
		width:100%;
	}
	.list_box .list_song{
		width:313px;
		height:48px;
		border:1px solid #262C3E;
		font-size:0;
		display:inline-block;
		position:relative;
		border-radius: 4px;
    	overflow: hidden;
	}
	.list_box .list_song select{
		width:100%;
		height:100%;
		background-color:#0D1428;
		color:white;
		font-size: 16px;
		border-left:0;
		padding-left:60px;
		box-sizing:border-box;
	}
	.list_box .list_song select option{
		min-height:2em;
	}
	.pos_relat{
		width:100%;
		height:100%;
		position:relative;
	}
	select {
	  /*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
	  border: solid 1px #000;
	  /*很关键：将默认的select选择框样式清除*/
	  appearance:none;
	  -moz-appearance:none;
	  -webkit-appearance:none;
	  /*在选择框的最右侧中间显示小箭头图片*/
	  background: url("../../../static/images/j1.png") no-repeat right center transparent;
	  background-position:96% 50%;
	  /*为下拉小箭头留出一点位置，避免被文字覆盖*/
	  padding-right: 14px;
	}
	.op_img{
		display:inline-block;
		position:absolute;
		top:0;
		bottom:0;
		left:10px;
		margin:auto;
		background:url("../../../static/images/j2_03.png") no-repeat center center transparent;
		width:50px;
		height:100%;
	}
    .list_box .list_song:nth-child(2) .op_img{
		background:url("../../../static/images/j3_05.png") no-repeat center center transparent;
    }
    .list_box .list_song:nth-child(3) .op_img{
		background:url("../../../static/images/j4_07.png") no-repeat center center transparent;
    }
    .list_box .list_song:nth-child(n+2){
    	margin-left:9px;
    }
    .list_box .list_song .false_hr{
    	width:1px;
    	height:28px;
    	background-color:#262C3E;
    	position:absolute;
    	top:0;
    	bottom:0;
    	right:45px;
    	margin:auto;
    }
    .list_box .sou_suo{
    	width:122px;
    	height:48px;
    	border:1px solid #1176d0;
    	background-color:#1176d0;
    	display:inline-block;
    	vertical-align:top;
    	border-radius: 4px;
    	overflow: hidden;
    	position:relative;
    	cursor:pointer;
    	margin-left:10px;
    }
    /*122*51*/
   .list_box .sou_suo img{
   	 position:absolute;
   	 top:0;
   	 left:0;
   	 right:0;
   	 bottom:0;
   	 margin:auto;
   }
   
</style>