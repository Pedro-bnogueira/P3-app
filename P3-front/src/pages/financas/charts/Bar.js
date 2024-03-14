import React, { useRef, useEffect } from "react";
import Chart from "chart.js/auto";
import PropTypes from 'prop-types';

function Bar(props) {
  const { values } = props;
  const chartContainer = useRef(null);
  const chartData = {
    labels: [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ],
    datasets: [
      {
        label: "Saldo R$",
        data: values,
        borderWidth: 1,
        backgroundColor: "#b5cf48",
      },
    ],
  };

  useEffect(() => {
    if (chartContainer && chartContainer.current) {
      const newChartInstance = new Chart(chartContainer.current, {
        type: "bar",
        data: chartData,
        options: {
          scales: {
            x: {
              stacked: true,
            },
            y: {
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

Bar.prototypes = {
  values: PropTypes.array.isRequired,
};

export default Bar;
