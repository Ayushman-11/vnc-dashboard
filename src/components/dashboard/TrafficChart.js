import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, Dropdown } from '../common';

const TrafficChart = ({ data = [], timeRange = '24h', onTimeRangeChange }) => {
  const timeRangeOptions = [
    { value: '1h', label: 'Last Hour' },
    { value: '24h', label: 'Last 24 Hours' },
    { value: '7d', label: 'Last 7 Days' },
    { value: '30d', label: 'Last 30 Days' },
  ];
  
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2a2c44] border border-[#3a3c54] rounded-lg px-3 py-2">
          <p className="text-gray-400 text-xs mb-1">{label}</p>
          <p className="text-white text-sm font-semibold">{payload[0].value} MB</p>
        </div>
      );
    }
    return null;
  };
  
  return (
    <Card 
      title="Open vs Resolved Alerts"
      gradient="teal"
      headerRight={
        <div className="flex items-center gap-2">
          <Dropdown
            value={timeRange}
            onChange={onTimeRangeChange}
            options={timeRangeOptions}
            className="w-40"
          />
          <Dropdown
            value="risk"
            onChange={() => {}}
            options={[{ value: 'risk', label: 'Risk Level' }]}
            className="w-32"
          />
        </div>
      }
      actions
    >
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <defs>
            <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.3}/>
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#2a2c44" vertical={false} />
          <XAxis 
            dataKey="time" 
            stroke="#6B7280"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <YAxis 
            stroke="#6B7280"
            tick={{ fill: '#9CA3AF', fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line 
            type="monotone" 
            dataKey="volume" 
            stroke="#8884d8" 
            strokeWidth={2}
            dot={{ fill: '#8884d8', r: 4 }}
            activeDot={{ r: 6 }}
            fill="url(#lineGradient)"
          />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  );
};

export default TrafficChart;
