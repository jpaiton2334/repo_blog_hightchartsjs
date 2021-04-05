
        var dataPrev = {
            2021: [
                ['Erling Haaland', 10],
                ['Robert Lewandowski', 0],
                ['Lionel Andrés Messi', 5],
                ['Cristiano Ronaldo', 4]
            ],
            2020: [
            ['Erling Haaland', 8],
                ['Robert Lewandowski', 5],
                ['Lionel Andrés Messi', 3],
                ['Cristiano Ronaldo', 4]
            ],
            2019: [
            ['Erling Haaland', 8],
                ['Robert Lewandowski', 15],
                ['Lionel Andrés Messi', 3],
                ['Cristiano Ronaldo', 6]
            ],
            2018: [
            ['Erling Haaland', 0],
                ['Robert Lewandowski', 8],
                ['Lionel Andrés Messi', 12],
                ['Cristiano Ronaldo', 15]
            ],
            2017: [
              ['Erling Haaland', 0],
                ['Robert Lewandowski', 5],
                ['Lionel Andrés Messi', 6],
                ['Cristiano Ronaldo', 12]
            ]
        };

        var data = {
            2021: [
                ['Erling Haaland', 10],
                ['Robert Lewandowski', 5],
                ['Lionel Andrés Messi', 5],
                ['Cristiano Ronaldo', 4]
            ],
            2020: [
            ['Erling Haaland', 8],
                ['Robert Lewandowski', 5],
                ['Lionel Andrés Messi', 3],
                ['Cristiano Ronaldo', 4]
            ],
            2019: [
            ['Erling Haaland', 8],
                ['Robert Lewandowski', 15],
                ['Lionel Andrés Messi', 3],
                ['Cristiano Ronaldo', 6]
            ],
            2018: [
                ['Erling Haaland', 0],
                ['Robert Lewandowski', 8],
                ['Lionel Andrés Messi', 12],
                ['Cristiano Ronaldo', 15]
            ],
            2017: [
                 ['Erling Haaland', 0],
                ['Robert Lewandowski', 5],
                ['Lionel Andrés Messi', 6],
                ['Cristiano Ronaldo', 12]
              
            ]
        };

        var countries = [
            
        { name: 'Erling Haaland',
            flag: 197579,
            color: 'rgb(255, 0, 0 )'

        },{  name: 'Robert Lewandowski',
            flag: 197529,
            color: 'rgb(237, 242, 239)'
        }, {
            name: 'Lionel Andrés Messi',
            flag: 197573,
            color: 'rgb(14, 221, 248)'
        }, {
            name: 'Cristiano Ronaldo',
            flag: 197463,
            color: 'rgb(8, 236, 7)'
        }];


        function getData(data) {
            return data.map(function (country, i) {
                return {
                    name: country[0],
                    y: country[1],
                    color: countries[i].color
                };
            });
        }

        var chart = Highcharts.chart('container', {
            chart: {
                type: 'column'
            },
            title: {
                text: 'Anotaciones'
            },
            subtitle: {
                text: 'UEFA Champions League'
            },
            plotOptions: {
                series: {
                    grouping: false,
                    borderWidth: 0
                }
            },
            legend: {
                enabled: false
            },
            tooltip: {
                shared: true,
                headerFormat: '<span style="font-size: 15px">{point.point.name}</span><br/>',
                pointFormat: '<span style="color:{point.color}">\u25CF</span> {series.name}: <b>{point.y} goles</b><br/>'
            },
            xAxis: {
                type: 'category',
                //maximo de paises mostrados
                max: 3,
                labels: {
                    useHTML: true,
                    animate: true,
                    formatter: function () {
                        var value = this.value,
                            output;

                        countries.forEach(function (country) {
                            if (country.name === value) {

                                //aqui estan las banderas
                                output = country.flag;
                            }
                        });
                      

                        return '<span><img src="https://image.flaticon.com/icons/svg/197/' + output + '.svg" style="width: 40px; height: 40px;"/><br></span>';
                    }
                }
            },
            yAxis: [{
                title: {
                    text: 'Goles'
                },
                showFirstLabel: false
            }],
            series: [{
                color: 'rgb(158, 159, 163)',
                pointPlacement: -0.2,
                linkedTo: 'main',
                data: dataPrev[2021].slice(),
                name: '2020'
            }, {
                name: '2021',
                id: 'main',
                dataSorting: {
                    enabled: true,
                    matchByName: true
                },
                dataLabels: [{
                    enabled: true,
                    inside: true,
                    style: {
                        fontSize: '16px'
                    }
                }],
                data: getData(data[2021]).slice()
            }],
            exporting: {
                allowHTML: true
            }
        });

        var years = [2021, 2020, 2019, 2018, 2017];

        years.forEach(function (year) {
            var btn = document.getElementById(year);

            btn.addEventListener('click', function () {

                document.querySelectorAll('.buttons button.active').forEach(function (active) {
                    active.className = '';
                });
                btn.className = 'active';

                chart.update({
                    title: {
                        text: 'Jugadores ' + year + ' - Estadisticas'
                    },
                    subtitle: {
                        text: 'revisa los maximos goleadores durante estos 5 años'
                    },
                    series: [{
                        name: year - 4,
                        data: dataPrev[year].slice()
                    }, {
                        name: year,
                        data: getData(data[year]).slice()
                    }]
                }, true, false, {
                    duration: 800
                });
            });
        });

