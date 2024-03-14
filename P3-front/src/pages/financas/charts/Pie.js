import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import PropTypes from 'prop-types';

function Pie(props) {
  const { values } = props;

  const chartContainer = useRef(null);
  const chartData = {
    labels: ['Receita', 'Despesas', 'Cartão de crédito'],
        datasets: [{
          label: 'R$',
          data: values,
          borderWidth: 1
        }]
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, {
        type: "pie",
        data: chartData,
        options: {
          scales: {
            x: {
              display: false, 
              stacked: true,
            },
            y: {
              display: false, 
              stacked: true,
            },
          },
        },
      });
      return () => {
        newChartInstance.destroy();
      };
    }
  }, [chartContainer, chartData]);

  return (
    <div>
      <canvas ref={chartContainer} />
    </div>
  );
}

Pie.prototypes = {
  values: PropTypes.array.isRequired,
};

export default Pie;