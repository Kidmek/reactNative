import { View, Text, Dimensions } from 'react-native'
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from 'react-native-chart-kit'
import React from 'react'
import { COLORS, FONT, SIZES } from '../../constants'
import styles from '../common/styles/common.style'

const DashboardChart = () => {
  const screenWidth = Dimensions.get('window').width
  const pieData = [
    {
      name: 'Managed Warehouse',
      population: 70,
      color: 'rgba(131, 167, 234, 1)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'None Managed Warehouse',
      population: 25,
      color: '#F00',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
    {
      name: 'Storage',
      population: 5,
      color: 'rgb(0, 0, 255)',
      legendFontColor: '#7F7F7F',
      legendFontSize: 15,
    },
  ]

  const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [10, 30, 20, 40, 50, 84],
      },
    ],
  }
  return (
    <View>
      <View style={styles.divider} />

      <View
        style={{
          alignItems: 'center',
          gap: SIZES.small,
        }}
      >
        {pieData.map((data, index) => {
          return (
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: SIZES.small,
              }}
              key={index}
            >
              <View
                style={{
                  paddingHorizontal: SIZES.large,
                  paddingVertical: SIZES.xxSmall,
                  backgroundColor: data.color,
                  alignItems: 'center',
                  justifyContent: 'center',
                  borderRadius: SIZES.small,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.bold,
                    color: 'white',
                  }}
                >
                  {data.population}
                </Text>
              </View>
              <Text
                style={{
                  fontFamily: FONT.medium,
                }}
              >
                {data.name}
              </Text>
            </View>
          )
        })}
      </View>
      <PieChart
        center={[screenWidth / 4, 0]}
        hasLegend={false}
        data={pieData}
        width={screenWidth} // from react-native
        height={250}
        accessor={'population'}
        backgroundColor={'transparent'}
        paddingLeft={'15'}
        chartConfig={{
          color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
          style: {
            borderRadius: 16,
          },
        }}
      />
      <View style={styles.divider} />
      <LineChart
        data={lineData}
        width={screenWidth} // from react-native
        height={220}
        yAxisLabel='$'
        yAxisSuffix='k'
        yAxisInterval={1} // optional, defaults to 1
        chartConfig={{
          backgroundColor: '#ffffff',
          backgroundGradientFrom: '#ffffff',
          backgroundGradientTo: '#ffffff',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          propsForDots: {
            r: '6',
            strokeWidth: '2',
            stroke: COLORS.primary,
          },
        }}
        bezier
        style={{
          borderRadius: 16,
        }}
      />
    </View>
  )
}

export default DashboardChart
