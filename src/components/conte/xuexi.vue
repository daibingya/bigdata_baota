<template>
	<div class="xuexi bottom_contes">
		<div class="top_Box">
		    <div class="ones">
		    	<div class="hezi_tit">
		    		<h3 class="title_dang2">今日党员登录及学习情况</h3>
		    		<select name="right_top" v-model="jr_data">
	              		<option v-for="vals in jr_select" :value="vals.id">{{vals.name}}</option>
	              	</select>
			    </div>
			    <div id="xx_echarts_1"></div>
		    </div>
		    <div class="twos">
		    	<div class="hezi_tit">
		    		<h3 class="title_dang2">党员学习时长</h3>
		    		<select name="right_top" v-model="dy_data">
	              		<option v-for="vals in jr_select" :value="vals.id">{{vals.name}}</option>
	              	</select>
			    </div>
			    <div id="xx_echarts_2"></div>
		    </div>
		</div>
		<div class="bottom_Box">
		    <div class="hezi_tit">
		    		<h3 class="title_dang2">在线考试数据</h3>
		    		<select name="right_top" v-model="bz_data">
	              		<option v-for="vals in jr_select" :value="vals.id">{{vals.name}}</option>
	              	</select>
			</div>
			<div class="last_box">
				<div class="box_ones">
					<p>{{last_data.all_users}}</p>
					<p>累计答题用户</p>
				</div>
				<div class="box_twos">
					<p>{{last_data.all_question}}</p>
					<p>累计答题数</p>
				</div>
				<div class="box_threes">
					<div class="inner_divs">
						<span class="graden graden1"></span>
						<span class="texts">本周情况</span>
						<span class="graden graden2"></span>
					</div>
					<ul class="inner_ulbox">
						<li>
							<p>{{last_data.week_adduser}}</p>
							<p>新增答题用户</p>
						</li>
						<li>
							<p>{{last_data.week_question}}</p>
							<p>新增答题数</p>
						</li>
					</ul>
				</div>
				<ul class="box_firs">
					<li>
						<p>{{last_data.all_kao}}</p>
						<p>考试人数</p>
					</li>
					<li>
						<p>{{last_data.all_you}}%</p>
						<p>优秀率</p>
					</li>
					<li>
						<p>{{last_data.all_he}}%</p>
						<p>合格率</p>
					</li>
					<li>
						<p>{{last_data.all_max}}</p>
						<p>最高得分</p>
					</li>
					<li>
						<p>{{last_data.all_min}}</p>
						<p>最低得分</p>
					</li>
					<li>
						<p>{{last_data.all_avg}}</p>
						<p>平均分</p>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
	import {Url_api} from "../../../static/js/API_URL.js";
	import api_demo from "../../../static/js/demo_api.js";
	export default{
		name:"xuexi",
		data(){
			return{
				last_data:'',
				jr_select:'',
				jr_data:'610602',
				dy_select:'',
				dy_data:'610602',
				bz_select:'',
				bz_data:'610602'
			}
		},
		created:function(){
			var _this=this;
			//左上角下拉框数据获取
			!function(){
				_this.$http.get(api_demo.apis3+"/queryLoginAndStudyDataSelectContent.action").then(function(data){
					this.jr_select=JSON.parse(data.bodyText);
				},function(){
//					window.location.href="http://113.137.27.18:9000/BaoTaBigData/index.action"
				})
			}()
		},
		watch:{
			jr_data:function(news,old){
				this.jinri_Fun(news)
			},
			dy_data:function(news,old){
				this.dangyuan_Fun(news)
			},
			bz_data:function(news,old){
				this.benzhou_Fun(news)
			}
		},
		mounted:function(){
			this.jinri_Fun();
			this.dangyuan_Fun();
			this.benzhou_Fun();
		},
		methods:{
			//今日党员登录及学习情况数据获取
			jinri_Fun(uid){
				 let uids=uid?uid:610602;
				 if(!uid){
				 //创建数据加载层文字
                 let echart_dom=document.getElementById("xx_echarts_1");
                 let divs=document.createElement("div");
                 divs.innerHTML="正在加载，请等待...";
                 divs.style.width="150px";  
                 divs.style.height="50px";
                 divs.style.lineHeight="50px";
                 divs.style.margin="150px auto 0";
                 echart_dom.appendChild(divs);
//               console.log(Url_api);
                }
				this.$http.get(api_demo.apis3+"/queryLoginAndStudyData.action?regionId="+uids).then(function(data){
					let data_arr=JSON.parse(data.bodyText);
					let study_arr=[],login_arr=[],times_arr=[];
					data_arr.forEach(function(val){
						study_arr.push(val.study);
						login_arr.push(val.login);
						times_arr.push(val.times);
					})
					
					this.echarts_1(study_arr,login_arr,times_arr)
				},function(){})
			},
			
			//党员学习时长数据获取
			dangyuan_Fun(uid){
				let uids=uid?uid:610602;
				if(!uid){
				//创建数据加载层文字
                 let echart_dom=document.getElementById("xx_echarts_2");
                 let divs=document.createElement("div");
                 divs.innerHTML="正在加载，请等待...";
                 divs.style.width="150px";
                 divs.style.height="50px";
                 divs.style.lineHeight="50px";
                 divs.style.margin="150px auto 0";
                 echart_dom.appendChild(divs);
                }
				this.$http.get(api_demo.apis3+"/queryEveryMouthStudyData.action?regionId="+uids).then(function(data){
					let data_arr=JSON.parse(data.bodyText);
					console.log(data_arr)
					let value_arr=[],times_arr=[];
					data_arr.forEach(function(val){
						value_arr.unshift(val.value);
						times_arr.unshift(val.time);
					})
					this.echarts_2(value_arr,times_arr)
				},function(){})
			},
			//本周情况数据获取
			benzhou_Fun(uid){
				let uids=uid?uid:610602;
				this.$http.get(api_demo.apis3+"/queryExamData.action?regionId="+uids).then(function(data){ 
					this.last_data=JSON.parse(data.bodyText)[0];
					console.log(this.last_data)
				},function(){})
			},
			//今日党员登录及学习情况图表
			echarts_1(study,login,times){
				let myChart=this.$echarts.init(document.getElementById("xx_echarts_1"));
			  	let option = {
		  		    tooltip: {
				        trigger: 'axis',
				        axisPointer: {
				            type: 'shadow'
				        }
				    },
				    legend: {
				    	top:"3%",
	    			    x:"center",
	    			    icon:"rect",
	    			    itemGap:30,
				        data:[{
				        	name:'登录用户',
				            textStyle:{color:"rgba(240,21,57,0.7)"}
				        },{
				        	name:'学习统计',
				        	textStyle:{color:"rgba(183,170,54,0.9)"}
				        }],
				        textStyle:{
					        	color:"#fff",
					        	fontSize:12
					    }
					},
				    grid:{
			    			x:60,
			    			y:50,
			    			x2:60,
			    			y2:30
		    		},
				    xAxis: {
				        type: 'category',
				        boundaryGap: false,
				        data:times,
				         // x轴的字体样式
                        axisLabel: {        
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
				         type: 'value',
				         axisLabel: {        
                        	show: true,
                        	textStyle: {
                            	color: '#fff',
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
					    	name:"登录用户",
					        data: login,
					        type: 'line',
					        smooth:true,   //让线条变得圆滑
					        showSymbol:false,  //在鼠标移入时候才显示小圆点点
					        areaStyle:{normal:{}},
					        itemStyle: {
						        normal: {
						            color: new this.$echarts.graphic.LinearGradient(
						                0, 0, 0, 1,
						                [
						                    {offset: 0, color:"rgba(240,21,57,0.7)"},
						                    {offset: 1, color:"rgba(33,50,99,0.5)"}
						                ]
						            ),
						            lineStyle:{
						            	color:"rgba(0,0,0,0)"
						            }
						        }
						    }
				        },{
					    	name:"学习统计",
					        data: study,
					        type: 'line',
					        smooth:true,   //让线条变得圆滑
					        showSymbol:false,
					        areaStyle:{normal:{}},
					        itemStyle: {
						        normal: {
						            color: new this.$echarts.graphic.LinearGradient(
						                0, 0, 0, 1,
						                [
						                    {offset: 0, color:"rgba(183,170,54,0.9)"},
						                    {offset: 1, color:"rgba(54,106,124,0.7)"}
						                ]
						            ),
						            lineStyle:{
						            	color:"rgba(0,0,0,0)"
						            }
						        }
						    }
				    	}
				    ]
				};
	            myChart.setOption(option);
			},
			//党员学习时长图表
			echarts_2(value,times){
		    	let myChart=this.$echarts.init(document.getElementById("xx_echarts_2")); 
		    	let option = {
		    			grid:{
			    			x:60,
			    			y:30,
			    			x2:60,
			    			y2:45
		    			},
		    			tooltip: {
					        trigger: 'axis'
					    },
					    xAxis: {
					    	name:"月份",
					    	nameTextStyle:{color:"#fff"},
					        type: 'category',
					        data: times,
					        axisLabel: {        
	                        	show: true,
	                        	rotate:30,
	                        	textStyle: {
	                            	color: '#fff',
	                            	fontSize:'12'
	                        	}
                        	},splitLine: {
                            	show: true, 
                            	//  改变轴线颜色
                            	lineStyle: {
                                	// 使用深浅的间隔色
                                	color: ['#262C3E']
                            	}                            
                        	}
					    },
					    yAxis: {
					    	name:"小时",
					    	nameTextStyle:{color:"#fff"},
					        type: 'value',
					        axisLabel: {        
	                        	show: true,
	                        	textStyle: {
	                            	color: '#fff',
	                            	fontSize:'12'
	                        	}
                        	},
                            splitLine: {show:false }
					    },
					    series: [
					    	{
					    		name:"学习时长",
						        data: value,
						        type: 'line',
						        symbolSize: 8,
						        itemStyle:{
						        	normal:{
						        		lineStyle:{
						        			color:"#F2746F"
						        		}
						        	}
						        }
					    	}
					    ]
					};
		    	myChart.setOption(option);
		    }
		}
	}
</script>
<style scoped>
	.xuexi{
		color:white
	}
	/*856*423*/
	.top_Box{
		width:100%;
		height:423px;
	}
	.top_Box .ones{
		width:862px;
		height:100%;
	}
	.top_Box .twos{
		width:714px;
		height:100%;
		margin-left:14px;
	}
	.ones,.twos{
		display:inline-block;
		vertical-align:top;
		border:1px solid #262C3E;
		background-color:#0D1428;	
		padding-top:10px;
		box-sizing:border-box;
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
	#xx_echarts_1,#xx_echarts_2{
		width:100%;
		height:372px;
	}
	/*1570*307*/
	.bottom_Box{
		width:100%;
		height:307px;
		border:1px solid #262C3E;
		background-color:#0D1428;
		margin-top:14px;
		padding-top:10px;
		box-sizing:border-box;
	}
	.last_box{
		width:100%;
		height:255px;
		padding:15px 25px;
		box-sizing:border-box;
	}
	/*225*225*/
	.last_box .box_ones,.last_box .box_twos{
		width:237px;
		height:214px;
		background-color:rgba(25,28,52,0.8);
		border:1px solid  #262C3E;
	}
	
	
	
	.last_box .box_ones p,.box_twos p{
		width:100%;
		height:50%;
		text-align:center;
	}
	.last_box .box_ones p:first-child,.box_twos p:first-child{
		color:#FCED10;
		font-size:56px;
		font-weight:bold;
		line-height:137px;
	}
	.last_box .box_ones p:last-child,.box_twos p:last-child{
		color:#1299f5;
		font-size:16px;
		font-weight:bold;
		line-height:100px;
	}
	
	
	.last_box .box_twos{
		margin-left:14px;
	}
	.last_box .box_ones,.last_box .box_twos,.box_threes,.box_firs{
		display:inline-block;
		vertical-align:top;
	}
	.inner_divs{
		width:100%;
		height:60px;
		padding-top:22px;
		box-sizing:border-box;
		font-size: 0;
		position:relative;
	}
	.inner_divs .graden,.inner_divs .texts{
		display:inline-block;
		vertical-align:top;
		box-sizing:border-box;
	}
	.inner_divs .texts{
		color:#1299F5;
		font-size:16px;
		text-align:center;
		font-weight:bold;
		width:100%;
		height:30px;
		line-height:30px;
		text-align:center;
		position:absolute;
		top:0;
		bottom:0;
		margin:auto;
	}
	.inner_divs .graden{
		width:35%;
		height:15px;
		position:absolute;
		top:0;
		bottom:0;
		margin:auto;
	}
	.graden.graden1{
		left:0;
		background-image: linear-gradient(to right,rgba(0,0,0,.2),#2c8ed0)
	}
	.graden.graden2{
		right:0;
		background-image: linear-gradient(to left,rgba(0,0,0,.2),#2c8ed0)
	}
	.inner_ulbox{
		width:100%;
		font-size:0;
	}
	.inner_ulbox li{
		width:50%;
		display:inline-block;
		vertical-align:top;
		font-size:16px;
		height:150px;
	}
	.inner_ulbox li p{
		width:100%;
		height:50%;
		line-height:75px;
	}
    .inner_ulbox li p:first-child{
    	color:#09C123;
    	font-size:46px;
    	line-height:95px;
    	text-align:center;
    	font-weight:bold;
    }
    .inner_ulbox li p:last-child{
    	color:#1299F5;
    	font-size:14px;
    	line-height:55px;
    	text-align:center;
    	font-weight:bold;
    }
	/*363*214*/
	.box_threes{
		width:364px;
		height:214px;
		background-color:rgba(25,28,52,0.8);
		margin-left:14px;
		border:1px solid  #262C3E;
	}
	/*645*214*/
	.box_firs{
		width:645px;
		height:214px;
		margin-left:14px;
	}
	/*204*102*/
	.box_firs li{ 
		width:204px;
		height:102px;
		background-color:rgba(25,28,52,0.8);
		border:1px solid  #262C3E;
		display:inline-block;
		vertical-align:top;
		margin-left:9px;
	}
	.box_firs li:nth-child(4),.box_firs li:nth-child(1){
		margin-left:0;
	}
	.box_firs li:nth-child(n+4){
		margin-top:8px;
	}
	.box_firs li p{
		width:100%;
		height:50%;
		text-align: center;
		line-height:75px;
	}
	.box_firs li p:first-child{
	   color:#DE5459;
	   font-size:40px;
	   font-weight:bold;
	}
	.box_firs li p:last-child{
	   color:#1299F5;
	   font-size:14px;
	   font-weight:bold;	
	   line-height:51px;
	}
</style>