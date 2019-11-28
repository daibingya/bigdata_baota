<template>
	<div class="dangjian bottom_contes">
		<ul class="ul_box">
		    <li>
		    	<span class="texts">{{massage.totalorganizationNum}}</span>
		    	<span class="texts">党组织总数</span>
		    </li>
		    <li>
		    	<span class="texts">{{massage.dangWei}}</span>
		    	<span class="texts">党(工)委</span>
		    </li>
		    <li>
		    	<span class="texts">{{massage.zongzhi}}</span>
		    	<span class="texts">党总支</span>
		    </li>
		    <li>
		    	<span class="texts">{{massage.dangzb}}</span>
		    	<span class="texts">党支部</span>
		    </li>
		    <li>
		    	<span class="texts">{{massage.totalPartyNum}}</span>
		    	<span class="texts">党员总数</span>
		    </li>
		    <li>
		    	<span class="texts">{{massage.flowNum}}</span>
		    	<span class="texts">流动党员</span>
		    </li>
		    <li>
		    	<span class="texts">{{massage.poorNum}}</span>
		    	<span class="texts">贫困党员</span>
		    </li>
		</ul>
		<!--左侧盒子--开始-->
		<div class="content">
			<!--左侧的"街道","社区","网格"-->
			<div class="left_box">
				<div class="small_box" v-for="val in street">
					<p class="inner">
						<span>{{val.name}}</span><br>
						<span>总数</span>
					</p>
					<p class="inner">{{val.value}}</p>
				</div>
			</div>
			<!--左侧盒子--结束-->
			
			
			<!--党组织 开始-->
			<div class="dang_box" style="text-align:center">
				<h3 class="h_tit">党组织区域分布</h3>
				<img width="75%" draggable="false" src="../../../static/images/d_img_03.png" border="0" usemap="#planetmap" alt="Planets"  />
				<map name="planetmap" id="planetmap">				  
				  <area v-for="(val,key) in myData" :id="myDataMasg[key]?myDataMasg[key].id:''" :name="myDataMasg[key]?myDataMasg[key].name:''" :type="myDataMasg[key]?myDataMasg[key].LEVEL:''" @mouseenter="shows(key,$event)"  @mouseleave="hidden()"  shape="circle" :coords="val" alt="Venus" />				  
				</map>
				<div class="mask_box" @mouseleave="hidden">
					<h3 class="mask_titles">{{maskData.name}}</h3>
					<ul class="big_w">
						<li>
							<span>党组织数量：</span>
							<span>{{maskData.num}}</span>
						</li>
						<li>
							<span>党委数量：</span>
							<span>{{maskData.dw}}</span>
						</li>
						<li>
							<span>党工委数量：</span>
							<span>{{maskData.dgw}}</span>
						</li>
						<li>
							<span>党总支数量：</span>
							<span>{{maskData.zz}}</span>
						</li>
						<li>
							<span>党支部数量：</span>
							<span>{{maskData.dzb}}</span>
						</li>
						<li>
							<span>党员人数：</span>
							<span>{{maskData.total}}</span>
						</li>
						<li>
							<span>流动党员：</span>
							<span>{{maskData.ld}}</span>
						</li>
						<li>
							<span>贫困党员：</span>
							<span>{{maskData.pk}}</span>
						</li>
					</ul>
				</div>
			</div>
			 <!--党组织--结束-->
			 
			<!--选项列表 --开始-->
			<div class="xuan_box">
				<!--第二部分(党组织领域分布)--开始-->
				<div class="fenbu" id="mountNode">
					<h3 class="titles_dang">各领域党组织分布</h3>
					<div class="echarts_1" id='echarts_1'></div>
				</div>
				<!--第二部分(党组织领域分布)--结束-->
				<!--第三部分(党员发展情况)--开始-->
				<div class="development">
					<h3 class="titles_san">党员发展情况</h3>
					<div class="all_fives">
						<div class="fives">
							<span class="box_map" id="echar1"></span>
							<h3 class="bot_tit">{{partyMember[0]}}</h3>
						</div>
						<div class="fives">
							<span class="box_map" id="echar2"></span>
							<h3 class="bot_tit">{{partyMember[1]}}</h3>
						</div>
						<div class="fives">
							<span class="box_map" id="echar3"></span>
							<h3 class="bot_tit">{{partyMember[2]}}</h3>
						</div>
						<div class="fives">
							<span class="box_map" id="echar4"></span>
							<h3 class="bot_tit">{{partyMember[3]}}</h3>
						</div>
						<div class="fives">
							<span class="box_map" id="echar5"></span>
							<h3 class="bot_tit">{{partyMember[4]}}</h3>
						</div>
					</div>
				</div>
				<!--第三部分(党员发展情况)--结束-->
			</div>
			<!--选项列表-结束-->
		</div>
	</div>
</template>
<script>
	import api_demo from "../../../static/js/demo_api.js"
	export default{
		name:'dangjian',
		data(){
			return{
				maskData:'',
				myDataMasg:[],
				myData:[
					[165, 230, 15],  //李渠镇
					[178, 280, 12] , //川口乡
					[130, 160, 15],  //冯庄镇
					
					[45, 313, 15],   //万花山乡
					[275, 175, 15],  //甘谷驿镇
					[145, 118, 15],  //青化乏镇
					
					[160, 55, 15],   //盘龙镇
					[95, 217, 15],   //河庄坪镇
					[118, 340, 15] , //柳林镇
					
					[190, 447, 18], //南泥湾镇
					[275, 407, 18], //马铜川乡
					[313, 455, 18],  //临镇
					
					[220, 210, 15],  //姚店镇	
					[100, 305, 15] , //南市街道
					[135, 280, 12] , //宝塔山街道
					
					[105, 280, 10],  //凤凰山街道
					[75, 255, 15],   //枣园街道
					[127, 255, 15]  //桥沟街道
				],
				massage:'',
				street:'',
				partyMember:[]
			}
		},
		created:function(){
			var _this=this;
			//左侧列表;
			this.$http.get(api_demo.apis1+"/queryEveryLevelNumber.action").then(function(data){
					this.massage=JSON.parse(data.bodyText);
			   },function(error){
			   		console.log("数据请求失败")
			})
//			//坐标点的信息;
		    !function(){
		    	_this.$http.get(api_demo.apis1+"/OrganizationArea.action").then(function(data){
					this.myDataMasg=data.body;
				},function(error){
					console.log(error)
				})
		    }();
			//街道网格总数
			!function(){
				_this.$http.get(api_demo.apis1+"/queryGridData.action").then(function(data){
						this.street=JSON.parse(data.bodyText);
				   },function(error){
						console.log(error)
				})
			}();
		},
		mounted:function(){
			this.echarones();
			this.echarts_1();
		},
		methods:{
			//党组织区域分布地图的移入效果
			shows(keys,e){
				var id=e.target.getAttribute("id");
				var type=e.target.getAttribute("type");
				this.$http.get(api_demo.apis1+"/queryOrgionDistribution.action?str="+id+"&type="+type).then(function(data){
					this.maskData=data.body[0];
					let mask=document.querySelector('.mask_box');
					let dang_box=document.querySelector(".dang_box");
					mask.style.display="block";
					let x=e.offsetX-mask.offsetWidth/2-120;
					let y=e.offsetY-mask.offsetHeight/2-50;
					mask.style.left=x+"px";
					mask.style.top=y+"px";
				},function(error){console.log(error)})
				
			},
			//党组织区域分布地图的移出效果
			hidden(){
				var mask=document.querySelector('.mask_box');
				mask.style.display="none";
			},
			
			//各领域党组织分布图表
			echarts_1(){
				this.$http.get(api_demo.apis1+"/queryEveryOrganizationDistribution.action").then(function(data){
					var inner_Data=JSON.parse(data.bodyText);
					var name_aRy=['社会党组织','其他','非公党组织','学校党组织','农村党组织','机关党组织','社区党组织','企业党组织'],
					val_aRy=[];
					
					Object.keys(inner_Data[0]).map(function(index,val){
						val_aRy.push(inner_Data[0][index]);
						
					})
				let myChart=this.$echarts.init(document.getElementById("echarts_1"));
				//配置
				let option = { 
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
				    //x轴
				    xAxis : [
				        {
				            type : 'category',
				            data :name_aRy,
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
				    //y轴
				    yAxis : [
				        {
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
				    //具体数据配置
				    series : [
				        {
				            name:'党员',
				            type:'bar',
				            barWidth:37,
				            data:val_aRy,
				            itemStyle:{
				            	//设置隔行换色
				            	normal:{
				            		color:function(params){
				            			let colorList=["#1176D0","#D82471","#1176D0","#D82471","#1176D0","#D82471","#1176D0","#D82471"];
				            			return colorList[params.dataIndex];
				            		}
				            	}
				            }
				        }
				        
				    ]
				};
	            myChart.setOption(option);
	            },function(){console.log("请求出错")})
			},
			
			//党员发展情况图表
			echarones(){
				let texts=[
					{
						color:"#4c9755"
					},{
						
						color:'#ed5294'
					},{
						
						color:"#f6b82a"
					},{
						
						color:"#0d9ceb"
					},{
						
						color:"#a086d5"
					}
				];
				this.$http.get(api_demo.apis1+"/queryPartyMemberDevelopInfo.action").then(function(data){

						var data_partyMember=[],plus=0;
						
						var _that=this;
						
						//求总人数
						Object.values(data.body).map(function(val){
							plus+=val.value;
						});
					
						Array.from(data.body).forEach(function(vals,index){
							data_partyMember.push(vals.name);
							var myChart=_that.$echarts.init(document.getElementById("echar"+(index+1)));
							var math_vals=(vals.value/plus*100).toFixed(2);
							var option = {
	                            color: [texts[index].color, '#2D406D'],
	                            //标题
	                            title:{
	                                text: data.body[index].value+"人",
	                                textStyle: {
	                                    color: '#ffffff', 
	                                    fontSize: 16
	                                },
	                                subtext:math_vals+"%",
	                                subtextStyle: {
	                                    color: '#0D84C9',
	                                    fontSize: 16
	                                },
	                                x: 'center',
	                                y: 'center',
	                            },
	                            series: [
	                                {
	                                   
	                                    type: 'pie',
	                                    radius: ['60%', '80%'],
	                                    labelLine: {
	                                        normal: {
	                                            show: false
	                                        }
	                                    },
	                                    data: [
	                                        { value:vals.value, name: '' },
	                                        { value:plus-vals.value, name: '' }
	                                    ]
	                                }
	                            ]
	                        };
			                    myChart.setOption(option);  
						});
						this.partyMember=data_partyMember;
				    },function(error){
						console.log(error)
				});
			}
		}
	}
	
</script>

<style scoped>
	.g2-tooltip{
		background-color:#050D23 !important;
		border:1px solid #262C3E !important;
	}
	.ul_box{
		width:100%;
		height:77px;
	}
	.ul_box li{
		width:218.5px;
		height:100%;
		display:inline-block;
		background-color:#0D1428;
		margin-left:7px;
		border:1px solid #262C3E;
		box-sizing:border-box;
		vertical-align:top;
		text-align:center;
		font-size:0;
		font-weight:bold;
		color:white;
	}
	.ul_box li .texts{
		display:block;
	}
	.ul_box li .texts:first-child{
		font-size:40px;
		height:60%;
		line-height:55px;
	}
	.ul_box li .texts:last-child{
		font-size:16px;
		height:35%;
		color:#1299F5;
	}
	.ul_box li:first-child{
		margin-left:0;
		background-color:#F14249;
	}
	.ul_box li:nth-child(5){
		background-color:#DB9A0F;
	}
	.ul_box li:first-child .texts:last-child{
		color:white
	}
	.ul_box li:nth-child(5) .texts:last-child{
	   color:white;
	}
	.content{
		margin-top:14px;
		width:100%;
	}
	.content .left_box{
		width:124px;
		height:678px;
		display:inline-block;
		vertical-align:top;
	}
	.content .left_box .small_box{
		width:100%;
		height:216px;
		border:1px solid #262C3E;
		background-color:#0D1428;
	}
	.content .left_box .small_box:nth-child(n+2){
		margin-top:13px;
	}
	.content .left_box .small_box .inner{
		width:100%;
		height:50%;
		text-align:center;
		font-size:26px;
		letter-spacing:2px;
		font-weight:bold;
	}
	.content .left_box .small_box .inner:first-child{
		padding:13px 0;
		box-sizing:border-box;
		color:#1299F5;
	}
	.content .left_box .small_box .inner:last-child{
		line-height:108px;
		font-size:40px;
		color:white;
	}
	.content .left_box .small_box .inner:first-child{
		background-color:#1C2439;
	}
	.dang_box{
		/*536*680*/
		width:536px;
		height:680px;
		border:1px solid #262C3E;
		display:inline-block;
		vertical-align:top;
		margin-left:13px;
   		background-color:#0D1428;
   		position:relative;
	}
	.dang_box .h_tit{
		font-size:20px;
		height:95px;
		line-height:95px;
		font-weight:bold;
		color:#1299F5;
		text-align:center;
	}
	
	.echarts_1{
		width:100%;
		height:290px;
	}
	/*选项列表*/
	.xuan_box{
		width:897px;
		height:680px;
		display:inline-block;
		vertical-align:top;
		margin-left:13px;
	}
	.list_box{
		width:100%;
	}
	.list_box .list_song{
		width:244px;
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
		padding-left:49px;
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
		background:url("../../../static/images/j2_03.png") no-repeat left center transparent;
		width:50px;
		height:100%;
	}
    .list_box .list_song:nth-child(2) .op_img{
		background:url("../../../static/images/j3_05.png") no-repeat left center transparent;
    }
    .list_box .list_song:nth-child(3) .op_img{
		background:url("../../../static/images/j4_07.png") no-repeat left center transparent;
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
    	margin-left:6.5px;
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
   /*896*323*/
   .fenbu{
   	width:896px;
   	height:375px;
   	padding-top:15px;
   	box-sizing:border-box;
   	outline:1px solid #262C3E;
   	background-color:#0D1428;
   }
   /*896*280*/
  .development{
  	width:896px;
  	height:293px;
  	padding-top:15px;
   	box-sizing:border-box;
  	outline:1px solid #262C3E;
   	background-color:#0D1428;
  	margin-top:12px;
  }
  .titles_dang,.development .titles_san{
  	font-size:18px;
  	color:#1299F5;
  	text-align:center;
  	font-weight:bold;
  	background-color:#0D1428;
  	height:40px;
  	line-height: 40px;
  }
  .mask_box{
  	width:200px;
  	height:126px;
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
  	color:#99C0F9;
  	line-height:40px;
  	font-size:18px;
  	font-weight:bolder;
  	background-color:rgba(41,50,78,0.8);
  }
  .big_w{
  	width:100%;
  	background-color:rgba(0,0,0,.8);
  	font-size:0;
  	padding-top:10px;
  	box-sizing:border-box;
  }
  .big_w li{
  	width:100%;
  	height:80%;
  	padding:10px;
  	font-size:16px;
    text-align:left;
  	border-left:1px solid #262C3E;
  	box-sizing:border-box;
  }
   .big_w li:first-child{
    	border:0
   }
  .big_w li span:first-child{
  	 color:#fff
  }
   .big_w li span:last-child{
  	 color:#1176d0
  }
  /*#FF343C  #FEEB1C  #5DC366 #A0A0A0*/

  .development .all_fives{
  	width:100%;
  	height:215px;
  	font-size:0;
  	padding:0 20px;
  	box-sizing:border-box;
  }
  .development .all_fives .fives{
  	width:20%;
  	height:100%;
  	display:inline-block;
  	vertical-align:top;
  }
  .development .all_fives .fives .box_map{
  	display:inline-block;
  	vertical-align: top;
  	width:100%;
  	height:80%;
  }
  .development .all_fives .fives .bot_tit{
  	width:100%;
  	height:20%;
  	color:white;
  	font-size:16px;
  	text-align:center;
  	line-height:40px;
  	font-weight:bold;
  }
</style>