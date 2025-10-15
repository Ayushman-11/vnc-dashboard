import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { Card } from '../common';

const AlertsSeverityChart = ({ data = [] }) => {
  const COLORS = {
    High: '#EF4444',
    Medium: '#F59E0B', 
    Low: '#3B82F6',
  };
  
  const chartData = [
    { name: 'High', value: data.filter(a => a.severity === 'High').length, color: COLORS.High },
    { name: 'Medium', value: data.filter(a => a.severity === 'Medium').length, color: COLORS.Medium },
    { name: 'Low', value: data.filter(a => a.severity === 'Low').length, color: COLORS.Low },
  ].filter(item => item.value > 0);
  
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
    <Card title="Alerts" subtitle="By Severity" actions gradient="orange">
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
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip content={<CustomTooltip />} />
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <div className="text-gray-400 text-xs">Total</div>
            <div className="text-white text-2xl font-bold">{total}</div>
          </div>
        </div>
        
        {/* Legend */}
        <div className="flex flex-col gap-4">
          {chartData.map((item) => (
            <div key={item.name} className="flex items-center justify-between gap-8">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
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

export default AlertsSeverityChart;
