export default function fillChartData(id, data) {
  return {
    type: 'FILL_CHART_DATA',
    id: id,
    data: data
  };
}
