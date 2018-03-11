import React, {Component} from "react"
import "./LineChart.css"

class LineChart extends Component {

    //Returns first element in array
   getMinX() {
     const {data} = this.props;
     return data[0].x;
    }

  //Returns last element in the array
   getMaxX() {
     const {data} = this.props;
     return data[data.length - 1].x;
   }

   // GET MAX & MIN Y
   getMinY() {
   const {data} = this.props;
   return data.reduce((min, p) => p.y < min ? p.y : min, data[0].y);      //Reduce is a built in
  }

   getMaxY() {
   const {data} = this.props;
   return data.reduce((max, p) => p.y > max ? p.y : max, data[0].y);
  }

   //The following two functions allow the graph to be proportionate depending on number of variables
   getSvgX(x) {
     const {svgWidth} = this.props;
     return (x / this.getMaxX() * svgWidth);
   }

   getSvgY(y) {
     const {svgHeight} = this.props;
     return svgHeight - (y / this.getMaxY() * svgHeight);
   }

   makePath() {
     const {data, color} = this.props;

      //Creates pathD which tells SVG to move to first x and y
     let pathD = "M " + this.getSvgX(data[0].x) + " " + this.getSvgY(data[0].y) + " ";

     //For each value in our data array, return a Line to the next x and y coordinate in the array.
     pathD += data.map((point, i) => {
       return "L " + this.getSvgX(point.x) + " " + this.getSvgY(point.y) + " ";
     });

    return (
      //return a path element with d equal to our pathD variable.
      //ClassName and Style are to make things look nice
      <path className="linechart_path" d={pathD} style={{stroke: color}} />
    );
   }

   makeAxis() {
    const minX = this.getMinX(), maxX = this.getMaxX();
    const minY = this.getMinY(), maxY = this.getMaxY();

    return (
      <g className="linechart_axis">
        <line
          x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
          x2={this.getSvgX(maxX)} y2={this.getSvgY(minY)} />
        <line
          x1={this.getSvgX(minX)} y1={this.getSvgY(minY)}
          x2={this.getSvgX(minX)} y2={this.getSvgY(maxY)} />
      </g>
  );
  }

   render() {

     const {svgHeight, svgWidth} = this.props;

     //Returns vector of the Path of the line chart and the two axis
     return (
       <svg viewBox={`0 0 ${svgWidth} ${svgHeight}`}>
         {this.makePath()}
         {this.makeAxis()}
       </svg>

     );
   }

}


LineChart.defaultProps = {
  data: [], //Defaults to empty array, no line chart will be produced if no data is passed in
  color: '#2196F3', //Defaults to blue
  svgHeight: 300,
  svgWidth: 700
}


export default LineChart;
