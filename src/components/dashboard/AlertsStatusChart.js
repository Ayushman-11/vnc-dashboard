import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../common';

const AlertsStatusChart = ({ summary = { open: 0, inProgress: 0, dismissed: 0 } }) => {
  const COLORS = ['#8884d8', '#C445C4', '#FF8042'];
  
  const chartData = [
    { name: 'Open', value: summary.open },
    { name: 'InProgress', value: summary.inProgress },
    { name: 'Dismissed', value: summary.dismissed },
  ];
  
  const total = chartData.reduce((sum, item) => sum + item.value, 0);
  
  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2a2c44] border border-[#3a3c54] rounded-lg px-3 py-2">
          <p className="text-white text-sm font-semibold">{payload[0].name}</p>
          <p className="text-gray-400 text-xs">{payload[0].value} alerts</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card title="Alerts" subtitle="By Status" actions gradient="blue">
      <div className="flex items-center justify-between">
        {/* Donut Chart */}
        <div className="relative w-48 h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={chartData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={85}
                paddingAngle={2}
                dataKey="value"
              >
                {chartData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-gray-400 text-xs">Total</div>
            <div className="text-white text-2xl font-bold">{total.toLocaleString()}</div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-col gap-4">
          {chartData.map((item, index) => (
            <div key={item.name} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: COLORS[index] }}
                />
                <span className="text-gray-400 text-sm">{item.name}</span>
              </div>
              <span className="text-white font-semibold">{item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default AlertsStatusChart;
