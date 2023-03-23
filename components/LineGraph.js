import { useEffect, useState } from "react";
import Script from "next/script";

export default function Line(props) {
  const [loadState, setLoadState] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        await google.charts.load("current", { packages: ["corechart"] });
        await google.charts.setOnLoadCallback(drawChart);
      } catch {
        setLoadState(!loadState);
      }
    };
    load();
  }, [loadState]);

  function drawChart() {
    let drawData = [["Year", "금 값"]];
    props.priceDatas.map((item) => {
      drawData.push([item.date, item.price]);
    });
    var data = google.visualization.arrayToDataTable(drawData);

    var options = {
      title: "금 시세 동향",
      curveType: "function",
      legend: { position: "bottom" },
    };

    var chart = new google.visualization.LineChart(
      document.getElementById("curve_chart")
    );

    chart.draw(data, options);
  }

  return (
    <div>
      <div id="curve_chart" style={{ width: "100%", height: "100%" }}></div>
      <Script
        src="https://www.gstatic.com/charts/loader.js"
        strategy="beforeInteractive"
      />
    </div>
  );
}
