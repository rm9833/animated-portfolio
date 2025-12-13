import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { SkillData } from '../types';

interface SkillsChartProps {
  data: SkillData[];
}

const SkillsChart: React.FC<SkillsChartProps> = ({ data }) => {
  const renderTick = (props: any) => {
    const { x, y, payload } = props;
    const label: string = payload.value || '';

    // Split into up to two lines at a space nearest the middle, fallback to hard split
    if (label.length <= 12) {
      return (
        <text x={x} y={y} textAnchor="middle" fill="#94a3b8" fontSize={12}>
          {label}
        </text>
      );
    }

    const words = label.split(' ');
    if (words.length === 1) {
      const mid = Math.ceil(label.length / 2);
      const first = label.slice(0, mid);
      const second = label.slice(mid);
      return (
        <text x={x} y={y} textAnchor="middle" fill="#94a3b8" fontSize={12}>
          <tspan x={x} dy="0">{first}</tspan>
          <tspan x={x} dy="1.15em">{second}</tspan>
        </text>
      );
    }

    // Try splitting words into two balanced lines
    let firstLine = '';
    let secondLine = '';
    for (let i = 0; i < words.length; i++) {
      const test = (firstLine + ' ' + words[i]).trim();
      if (test.length <= label.length / 2 || firstLine === '') {
        firstLine = test;
      } else {
        secondLine = (secondLine + ' ' + words[i]).trim();
      }
    }

    return (
      <text x={x} y={y} textAnchor="middle" fill="#94a3b8" fontSize={12}>
        <tspan x={x} dy="0">{firstLine}</tspan>
        {secondLine && <tspan x={x} dy="1.15em">{secondLine}</tspan>}
      </text>
    );
  };
  return (
    <div className="h-full w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="70%" data={data}>
          <PolarGrid stroke="#475569" />
          <PolarAngleAxis dataKey="subject" tick={renderTick} />
          <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
          <Radar
            name="Skill Level"
            dataKey="A"
            stroke="#3b82f6"
            strokeWidth={3}
            fill="#3b82f6"
            fillOpacity={0.4}
          />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#fff' }}
            itemStyle={{ color: '#60a5fa' }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SkillsChart;