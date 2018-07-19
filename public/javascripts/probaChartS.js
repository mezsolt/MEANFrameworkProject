var ng = require('angular');
var Chart = require('chart.js');
var probaChart = ng.module('probaChart', []);

probaChart.controller('probaChartCtrl', ['$scope','$http',
    function($scope,$http){
    var number = 0;
        $scope.chart = function() {
            let myChart = document.getElementById('myChart').getContext('2d');

            // Global Options
            Chart.defaults.global.defaultFontFamily = 'Lato';
            Chart.defaults.global.defaultFontSize = 18;
            Chart.defaults.global.defaultFontColor = '#777';

            let massPopChart = new Chart(myChart, {
                type:'polarArea', // bar, horizontalBar, pie, line, doughnut, radar, polarArea
                data:{
                    labels:['Boston', 'Worcester', 'Springfield', 'Lowell', 'Cambridge', 'New Bedford'],
                    datasets:[{
                        label:'Population',
                        data:[
                            617594,
                            181045,
                            153060,
                            106519,
                            105162,
                            95072
                        ],
                        //backgroundColor:'green',
                        backgroundColor:[
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                            'rgba(255, 99, 132, 0.6)'
                        ],
                        borderWidth:1,
                        borderColor:'#777',
                        hoverBorderWidth:3,
                        hoverBorderColor:'#000'
                    }]
                },
                options:{
                    title:{
                        display:true,
                        text:'Largest Cities In Massachusetts',
                        fontSize:50
                    },
                    legend:{
                        display:true,
                        position:'right',
                        labels:{
                            fontSize:25,
                            fontColor:'#000'
                        }
                    },
                    layout:{
                        padding:{
                            left:50,
                            right:0,
                            bottom:0,
                            top:0
                        }
                    },
                    tooltips:{
                        enabled:true
                    },
                    animation: {
                        duration: 1,
                        onComplete: function done() {
                            console.log('done');
                            if(number == 0) {
                                var image = massPopChart.toBase64Image();
                                $http.post('http://localhost:3000/probachart', {image: image}, {headers: {'Content-Type': 'application/json'}});
                            }
                            number = 1;
                            //this.toBase64Image();
                        }
                    }
                }
            });

/*
            var image = massPopChart.toBase64Image();

            var url_base64 = document.getElementById('myChart').toDataURL('image/png');

            document.getElementById("url").src=image;

            if(number != 0) {
                $http.post('http://localhost:3000/probachart', {image:image},{headers:{'Content-Type':'application/json'}});
            }
            number= 1;*/
        }
    }]);