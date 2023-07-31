import React, { useEffect, useRef } from 'react';
import { Chart as ChartJS, ArcElement, Tooltip, Legend, RadialLinearScale, BarElement, CategoryScale } from 'chart.js/auto';
import {Radar} from 'react-chartjs-2'

interface PentagonProps {
    con: number,
    safety: number,
    res: number,
    tra: number,
    play: number,
}

ChartJS.register(ArcElement, Tooltip, Legend, RadialLinearScale, BarElement, CategoryScale);

const Pentagon = ({con, safety, res, tra, play} : PentagonProps) => {

    return (
        <div className='chartContainer'>
            <Radar
                style={{ width: 320, height: 320 }}
                id='mtChart'
                data={{
                    labels: ['편의', '안전', '먹거리', '교통성', '놀거리'],
                    datasets: [
                        {
                            label: '점수',
                            data: [con, safety, res, tra, play],
                            backgroundColor: 'rgba(168, 100, 255, 0.3)',
                            // borderColor: ['#ff9f40'],
                        }
                    ]
                }}
                options={{
                    maintainAspectRatio: false,
                    scales: {
                        r: {
                            ticks: {
                                stepSize: 1,
                                font: {
                                    size: 16,
                                    family: `'Noto Serif KR', serif`,
                                }
                            },
                            pointLabels: {
                                font: {
                                    size: 15,
                                    family: `'Noto Serif KR', serif`,
                                }
                            }
                        }
                    },
                    plugins: {
                        legend: {
                            position: "center",
                            labels: {
                                color: 'black',
                            }
                        },
                    }
                }}
            />
        </div>
    );
};

export default Pentagon;