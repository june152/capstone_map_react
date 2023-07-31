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
        <div className='graph_area'>
            <Radar
                style={{ width: 250, height: 250 }}
                data={{
                    labels: ['편의', '안전', '먹거리', '교통성', '놀거리'],
                    datasets: [
                        {
                            data: [con, safety, res, tra, play],
                            // backgroundColor: ['#ff6384','#ff9f40','#ffcd56','#4bc0c0', '#36a2eb'],
                            // backgroundColor: '#ff9f40',
                            borderColor: ['#ff9f40']
                        }
                    ]
                }}
                options={{
                    maintainAspectRatio: false,
                    plugins: {
                        legend: {
                            position: "center",
                            labels: {
                                color: 'black',
                            }
                        }
                    }
                }}
            />
        </div>
    );
};

export default Pentagon;