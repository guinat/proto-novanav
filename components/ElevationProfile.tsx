import React from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';
import Svg, { Polyline, Line, Text as SvgText } from 'react-native-svg';
import Colors from '@/constants/Colors';

interface ElevationProfileProps {
  data: number[];
  color: string;
  height?: number;
  width?: number;
}

export function ElevationProfile({ data, color, height = 120, width }: ElevationProfileProps) {
  const screenWidth = width || Dimensions.get('window').width - 48;
  
  // Calculate max elevation for scaling
  const maxElevation = Math.max(...data);
  const minElevation = Math.min(...data);
  const range = maxElevation - minElevation;
  
  // Calculate graph dimensions
  const graphHeight = height - 30; // Leave space for labels
  const graphWidth = screenWidth - 40; // Leave space for y-axis labels
  
  // Calculate points for the polyline
  const points = data.map((elevation, index) => {
    const x = (index / (data.length - 1)) * graphWidth + 30;
    const normalizedElevation = range === 0 ? 0.5 : (elevation - minElevation) / range;
    const y = graphHeight - (normalizedElevation * graphHeight) + 10;
    return `${x},${y}`;
  }).join(' ');
  
  // Generate axis ticks
  const yAxisTicks = [minElevation, minElevation + range / 2, maxElevation];
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Elevation Profile</Text>
      <Svg height={height} width={screenWidth}>
        {/* Y-axis */}
        <Line x1="30" y1="10" x2="30" y2={graphHeight + 10} stroke="#ccc" strokeWidth="1" />
        
        {/* X-axis */}
        <Line x1="30" y1={graphHeight + 10} x2={graphWidth + 30} y2={graphHeight + 10} stroke="#ccc" strokeWidth="1" />
        
        {/* Y-axis ticks and labels */}
        {yAxisTicks.map((tick, index) => {
          const y = graphHeight - (index * graphHeight / 2) + 10;
          return (
            <React.Fragment key={`tick-${index}`}>
              <Line x1="25" y1={y} x2="30" y2={y} stroke="#ccc" strokeWidth="1" />
              <SvgText x="5" y={y + 4} fontSize="10" fill="#666" textAnchor="start">
                {tick}m
              </SvgText>
            </React.Fragment>
          );
        })}
        
        {/* Elevation line */}
        <Polyline
          points={points}
          fill="none"
          stroke={color}
          strokeWidth="2"
        />
      </Svg>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 16,
    padding: 8,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    marginBottom: 8,
    color: '#666',
  },
});