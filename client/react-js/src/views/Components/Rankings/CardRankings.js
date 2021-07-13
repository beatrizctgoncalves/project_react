import React from 'react'
import { Bar } from 'react-chartjs-2';
import { Box, Card, CardContent, useTheme, Divider, colors, Grid, CardHeader } from '@material-ui/core';
import { useEffect, useState } from 'react';


function CardRankings(props) {
    const { sprint } = props
    const data = {
        datasets: [
            {
                backgroundColor: colors.indigo[500],
                data: [],
                label: 'Scores'
            }
        ],
        labels: []
    };

    useEffect(() => {
        if (sprint.Scores && sprint.Scores.length) {
            sprint.Scores.map(score => {
                data.datasets[0].data.push(score.Points);
                data.labels.push(score.AppUsername);
                return null
            })
        }
    }, [sprint])


    const theme = useTheme();



    const options = {
        animation: true,
        cornerRadius: 20,
        layout: { padding: 0 },
        legend: { display: false },
        maintainAspectRatio: false,
        responsive: true,
        scales: {
            xAxes: [
                {
                    barThickness: 12,
                    maxBarThickness: 10,
                    barPercentage: 0.5,
                    categoryPercentage: 0.5,
                    ticks: {
                        fontColor: theme.palette.text.secondary
                    },
                    gridLines: {
                        display: false,
                        drawBorder: false
                    }
                }
            ],
            yAxes: [
                {
                    ticks: {
                        fontColor: theme.palette.text.secondary,
                        beginAtZero: true,
                        min: 0
                    },
                    gridLines: {
                        borderDash: [2],
                        borderDashOffset: [2],
                        color: theme.palette.divider,
                        drawBorder: false,
                        zeroLineBorderDash: [2],
                        zeroLineBorderDashOffset: [2],
                        zeroLineColor: theme.palette.divider
                    }
                }
            ]
        },
        tooltips: {
            backgroundColor: theme.palette.background.paper,
            bodyFontColor: theme.palette.text.secondary,
            borderColor: theme.palette.divider,
            borderWidth: 1,
            enabled: true,
            footerFontColor: theme.palette.text.secondary,
            intersect: false,
            mode: 'index',
            titleFontColor: theme.palette.text.primary
        }
    };


    return (
        <Grid item xs={6}>
            <Card {...props}>
                <CardHeader
                    title={sprint.SprintTitle}
                />
                <Divider />
                <CardContent>
                    <Box
                        sx={{
                            height: 400,
                            position: 'relative'
                        }}
                    >
                        <Bar
                            data={data}
                            options={options}
                        />
                    </Box>
                </CardContent>
                <Divider />
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'flex-end',
                        p: 2
                    }}
                >
                </Box>
            </Card>
        </Grid>
    );
}

export default CardRankings






