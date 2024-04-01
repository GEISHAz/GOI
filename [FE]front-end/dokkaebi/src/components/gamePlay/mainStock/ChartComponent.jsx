import React, { useEffect, useRef, useState } from 'react';
import { Chart, LineController, CategoryScale, LinearScale, PointElement, LineElement } from 'chart.js';
import 'chartjs-adapter-date-fns';
import axios from 'axios';
import styles from './StockExchange.module.css';

Chart.register(LineController, CategoryScale, LinearScale, PointElement, LineElement);

export default function ChartComponent(props) {
  const chartRef = useRef();
  const roomId = sessionStorage.getItem('roomId');
  const [responseData, setResponseData] = useState([]);
  const [chartInstance, setChartInstance] = useState(null); // 차트 인스턴스 상태 추가

  useEffect(() => {
    axios
      .get(`https://j10d202.p.ssafy.io/api/stock/chart?id=${roomId}&item=${props.item}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`
        }
      })
      .then((response) => {
        console.log(response);
        console.log('차트 데이터 가져오기 성공');
        setResponseData(response.data);
      })
      .catch((error) => {
        console.log(error);
        console.log('차트 데이터 가져오기 실패');
      });
  }, []);
  
  useEffect(() => {
    if (chartInstance) { // 이전 차트 인스턴스가 있다면 파괴
      chartInstance.destroy();
      setChartInstance(null); // 차트 인스턴스 상태를 null로 설정
    }
  
    if (responseData.length > 0) { // responseData가 존재할 때만 차트 인스턴스를 생성
      const newChartInstance = new Chart(chartRef.current, {
        type: 'line',
        data: {
          labels: responseData.map(row => row.year),
          datasets: [
            {
              label: 'Acquisitions by year',
              data: responseData.map(row => row.cost)
            }
          ]
        }
      });
      setChartInstance(newChartInstance); // 새 차트 인스턴스 저장
    }
  }, [responseData]); // responseData가 변경될 때마다 차트를 다시 생성

  return (
    <div>
      <canvas className={styles.chart} ref={chartRef} id="acquisitions"></canvas>
    </div>
  )
}