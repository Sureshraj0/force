sap.designstudio.sdk.Component.subclass("com.sap.sample.coloredbox.ColoredBox", function() {

	var that = this;

	this.init = function() {
		
	};

	this.afterUpdate = function(){
		this.result = {"selection":[-1,-1],"tuples":[[0,0],[0,1],[0,2],[0,3],[0,4],[0,5],[0,6],[0,7],[0,8],[0,9],[0,10],[0,11],[0,12],[0,13],[0,14],[0,15],[0,16],[0,17]],"data":[429482,21044,21044,35640,35640,28659,28659,79040,79040,129486,23910,40449,65126,15380,15380,120234,98785,21448],"dimensions":[{"key":"006EI4ZXZALDW64STO8GJZ2OS","text":"Key Figures","axis":"COLUMNS","axis_index":0,"containsMeasures":true,"members":[{"key":"006EI4ZXZALDW64STO8GJZ90C","text":"Oil consumption (Tho","scalingFactor":0,"unitOfMeasure":"BBL","formatString":"#,##0 BBL;'-'#,##0 BBL"}]},{"key":"ZREGION","text":"Region","axis":"ROWS","axis_index":0,"members":[{"key":"HIERARCHY_NODE/0HIER_NODE/WORLD","text":"World","type":"HIERARCHY_NODE","nodeState":"EXPANDED"},{"key":"HIERARCHY_NODE/0HIER_NODE/FORMER SOVIET UNION","text":"Former Soviet Union","type":"HIERARCHY_NODE","nodeState":"EXPANDED","level":1},{"key":"FSU","text":"Former Soviet Union","level":2},{"key":"HIERARCHY_NODE/0HIER_NODE/MIDDLE EAST","text":"Middle East","type":"HIERARCHY_NODE","nodeState":"EXPANDED","level":1},{"key":"ME","text":"Middle East","level":2},{"key":"HIERARCHY_NODE/0HIER_NODE/S AND C AMERICA","text":"S and C America","type":"HIERARCHY_NODE","nodeState":"EXPANDED","level":1},{"key":"SCA","text":"South & Cen America","level":2},{"key":"HIERARCHY_NODE/0HIER_NODE/EUROPE","text":"Europe","type":"HIERARCHY_NODE","nodeState":"EXPANDED","level":1},{"key":"EUR","text":"Europe","level":2},{"key":"HIERARCHY_NODE/0HIER_NODE/ASIA PACIFIC","text":"Asia Pacific","type":"HIERARCHY_NODE","nodeState":"EXPANDED","level":1},{"key":"JP","text":"Japan","level":2},{"key":"CHN","text":"China","level":2},{"key":"AP","text":"Asia Pacific","level":2},{"key":"HIERARCHY_NODE/0HIER_NODE/AFRICA","text":"Africa","type":"HIERARCHY_NODE","nodeState":"EXPANDED","level":1},{"key":"AF","text":"Africa","level":2},{"key":"HIERARCHY_NODE/0HIER_NODE/NORTH AMERICA","text":"North America","type":"HIERARCHY_NODE","nodeState":"EXPANDED","level":1},{"key":"US","text":"United States","level":2},{"key":"NA","text":"North America","level":2}]}],"locale":"en_US","axis_columns":[[0,-1]],"axis_rows":[[-1,0],[-1,1],[-1,2],[-1,3],[-1,4],[-1,5],[-1,6],[-1,7],[-1,8],[-1,9],[-1,10],[-1,11],[-1,12],[-1,13],[-1,14],[-1,15],[-1,16],[-1,17]],"columnCount":1,"rowCount":18} ;
		
		var measures = {nodes:[],edges:[]};
		var measures1 = [];
		that.datadimensions = this.result.dimensions;
		var datatuples = this.result.tuples;
		for(var i=0;i<that.datadimensions.length;i++){
			
			for(var j=0;j<that.datadimensions[i].members.length;j++){
				var node = {name:""};
				node.name = that.datadimensions[i].members[j].text;
				measures1.push(that.datadimensions[i].members[j].text)
				measures.nodes.push(node)
			}
			
		}
//		alert(JSON.stringify(measures))
		for(var i=0;i<datatuples.length;i++){
			var tuplelength = datatuples[i].length;
			for(var j=0;j<tuplelength;j++){
				if(j<tuplelength-1){//alert(j+ " "+tuplelength)
					var link = {source:"",target:""};
					link.source = measures1.indexOf(that.datadimensions[j].members[datatuples[i][j]].text);
					link.target = measures1.indexOf(that.datadimensions[j+1].members[datatuples[i][j+1]].text);
//					link.source = measures.nodes.indexOf();
//					alert(JSON.stringify(link))
					measures.edges.push(link)
					
				}
			}
		}
		alert(JSON.stringify(measures))
//		var data = [];
//		
//		for(var i=0;i<datatuples.length;i++){
////			alert(datatuples.length)
//			var tuplelength = datatuples[i].length;
//			for(var j=0;j<tuplelength;j++){
////				alert(j+" "+tuplelength)
//				if(j==0 && j+1<=tuplelength-1){
//					data.push({source:measures[datatuples[i][0]], target: datadimensions[j+1].members[datatuples[i][j+1]].text});
//				}else if(j+1<=tuplelength-1){
//					data.push({source:datadimensions[j].members[datatuples[i][j]].text, target: datadimensions[j+1].members[datatuples[i][j+1]].text});
//				}
//
//			}
//			
//		}
//		alert(JSON.stringify(data))
	
			  var w = 500,
			      h = 500;
				var svg = d3.select(this.$()[0])
			                  .append("svg")
			                  .attr("width", w)
			                  .attr("height", h)
			                  .attr('preserveAspectRatio', 'xMinYMin slice') 
			                  .append('g');
//				var measures = {
//						nodes: [
//			              {name:"Sara"},
//			            	  {name:"Raul"},
//			            	  {name:"Stefano"},
//			            		  {name:"Stefano1"}
//						],
//						edges: [
//			              { source: 0, target: 1 },
//			              { source: 2, target: 3 }
//						]
//					};
				
					var force = self.force = d3.layout.force()
						.nodes(measures.nodes)
						.links(measures.edges)
						.gravity(0.05)
			            .distance(100)
			            .charge(-100)
						.size([w,h])
						.start();

					var link = svg.selectAll(".link")
						.data(measures.edges)
						.enter().append("line")
						.attr("class", "link")
						.attr("stroke","#cccccc")
						.attr("stroke-width",1)
						.attr("x1", function(d) { return d.source.x; })
						.attr("y1", function(d) { return d.source.y; })
						.attr("x2", function(d) { return d.target.x; })
						.attr("y2", function(d) { return d.target.y; });
			  
					
					var node_drag = d3.behavior.drag()
						.on("dragstart", dragstart)
						.on("drag", dragmove)
						.on("dragend", dragend);

			        var node = svg.selectAll("circle")
						.data(measures.nodes)
						.enter().append("circle")
						.attr("class", "node")
						.attr("fill", "blue")
						.attr("r", 4.5)
						.attr("dx", ".10em")
						.attr("dy", ".10em")
						.text(function(d){ return d.name})
						.call(node_drag);
			  
					function dragstart(d, i) {
						force.stop(); // stops the force auto positioning before you start dragging
					}

					function dragmove(d, i) {
						d.px += d3.event.dx;
						d.py += d3.event.dy;
						d.x += d3.event.dx;
						d.y += d3.event.dy; 
						tick(); 
					}

					function dragend(d, i) {
//						d.fixed = true; // of course set the node to fixed so the force doesn't include the node in its auto positioning stuff
						tick();
						force.resume();
					}
					
			      
					force.on("tick", tick);

					function tick() {
			          link.attr("x1", function(d) { return d.source.x; })
			          .attr("y1", function(d) { return d.source.y; })
			          .attr("x2", function(d) { return d.target.x; })
			          .attr("y2", function(d) { return d.target.y; });
			          
//			          node.append("text")
//			          .attr("dx", ".10em")
//			          .attr("dy", ".10em")
//			          .text(function(d) { return d.name; });

			node.attr("cx", function(d) { return d.x; })
			.attr("cy", function(d) { return d.y; });
					}
			

				

	
		
	
	}
});