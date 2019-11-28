<template>
	<div class="echart_zu" id="echart_zu">
	     
	</div>
</template>
<script>
	import api_demo from "../../../../static/js/demo_api.js"
	
	//导出模块儿
	export default {
		name:"zuzhi",
		data(){
			return {
				zuzhi:"",
				names:[],
				data_title:[],
				data_all:[]
			}
		},  
		methods:{
			//函数的创建
			echart_zu(data_all,data_title){
			    var myChart=this.$echarts.init(document.getElementById("echart_zu"));
				var radius = [30, 40];
				var option = {
					tooltip : {
				        trigger: 'item',
				        formatter: "{a} <br/>{b} : {c} ({d}%)"
				    },
				    title:data_title,
				    legend: {
				    	show:true,
				        x : 'center',
				        y : '15',
				        textStyle: {
			            	fontSize: 12,
			            	color: '#fff'
			    		},
			    		itemWidth:10,
			    		icon:'circle',
				        data:[
				            '社区党组织','农村党组织','机关党组织','国企党组织','学校党组织','非公党组织',
				            '社会组织党组织', '其他党组织'
				        ]
				    }, 
				    series:data_all
				};
	            myChart.setOption(option);
			    
			},
		},
		mounted:function(){
			var _this=this;
			//用于定位series图形数据的位置
			var center_arr_series=[
					["8%"   , "35%"],
					["18.5%" , "35%"],
					["29%"   , "35%"],
					["39.5%" , "35%"],
					["50%"   , "35%"],
					["60.5%" , "35%"],
					["71%"   , "35%"],
					["81.5%"   , "35%"],
					["92%" , "35%"],
					
					["8%"   , "75%"],
					["18.5%" , "75%"],
					["29%"   , "75%"],
					["39.5%" , "75%"],
					["50%"   , "75%"],
					["60.5%" , "75%"],
					["71%"   , "75%"],
					["81.5%"   , "75%"],
					["92%" , "75%"],
			];
			//用于定位图形中间标题的位置
			var center_arr_legend=[
					["5%"   , "32.5%"],
					["15%" , "32.5%"],
					["25.5%"   , "32.5%"],
					["36.5%" , "32.5%"],
					["47%"   , "32.5%"],
					["58%" , "32.5%"],
					["68.5%"   , "32.5%"],
					["79.5%"   , "32.5%"],
					["89%" , "32.5%"],
					
					["5%"   , "72.5%"],
					["15.5%" , "72.5%"],
					["26.5%"   , "72.5%"],
					["36.5%" , "72.5%"],
					["47.5%"   , "72.5%"],
					["57.5%" , "72.5%"],
					["68%"   , "72.5%"],
					["79%"   , "72.5%"],
					["89.5%" , "72.5%"],
			];
			var title_data=["社区党组织","农村党组织","国企党组织","非公党组织","机关党组织","其他党组织","学校党组织","社会组织党组织"];
			_this.$http.get(api_demo.apis1+"/queryBaoTaOrderOrganizationPartyMenberType.action").then(function(data){
				var dataServis=[];
				var dataTile=[];
                data.body.data.forEach(function(val,keys){
                	var data_servis=[];
                	data_servis.push({
                		value:val.COMMUNITY,
                		name:"社区党组织",
                		itemStyle:{
                			normal:{
                				color:"#fc8f39"
                			}
                		}
                	}
                	,{
                		value:val.COUNTRYSIDE,
                		name:"农村党组织",
                		itemStyle:{
                			normal:{
                				color:"#52d252"
                			}
                		}
                	}
                	,{
                		value:val.ENTERPRISES,
                		name:"国企党组织",
                		itemStyle:{
                			normal:{
                				color:"#ea4444"
                			}
                		}
                	}
                	,{
                		value:val.NONPUBLICOWNERSHIP,
                		name:"非公党组织",
                		itemStyle:{
                			normal:{
                				color:"#3be9df"
                			}
                		}
                	}
                	,{
                		value:val.OFFICE,
                		name:"机关党组织",
                		itemStyle:{
                			normal:{
                				color:"#ffcc52"
                			}
                		}
                	}
                	,{
                		value:val.SCHOOL,
                		name:"学校党组织",
                		itemStyle:{
                			normal:{
                				color:"#32b7f2"
                			}
                		}
                	}
                	,{
                		value:val.SOCIETY,
                		name:"社会组织党组织",
                		itemStyle:{
                			normal:{
                				color:"#af6afd"
                			}
                		}
                	}
                	,{
                		value:val.other,
                		name:"其他党组织",
                		itemStyle:{
                			normal:{
                				color:"#8e837e"
                			}
                		}
                	});
					//每条数据标题
                	dataTile.push({
				    	text:val.name,
				    	left:center_arr_legend[keys][0],
				    	top:center_arr_legend[keys][1],
				    	textStyle:{
				    		color:"#fff",
				    		fontSize:14
				    	}
                	})
                	//每条数据
					dataServis.push({
			            type:'pie',
			            hoverOffset:5,
			            center:center_arr_series[keys],
			            radius: [35, 42],
			            avoidLabelOverlap: false,
			            label: {
			                normal: {
			                    show: false
			                },
			                emphasis: {
			                    show: false
			                }
			            },
			            labelLine: {
			                normal: {
			                    show: false
			                }
			            },
			            data:data_servis
			        })
                });
                _this.echart_zu(dataServis,dataTile);
			},function(error){
				console.log("报错")
			});
		}
	}
</script>
<style scoped>
	.echart_zu{
		width:100%;
		height:315px; 
	}
</style>