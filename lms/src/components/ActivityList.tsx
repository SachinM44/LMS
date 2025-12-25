import React from 'react';
import { FlatList, View, Text, Image } from 'react-native';
import { Activity } from '../types';
import { ActivityCard } from './ActivityCard';
import { useTheme, useResponsive } from '../hooks';

interface ActivityListProps {
    activities: Activity[];
}

const ITEM_HEIGHT = 280; ///approx height

export const ActivityList: React.FC<ActivityListProps> = ({ activities }) => {
    const { colors } = useTheme();
    const { numColumns } = useResponsive();

    const renderItem = ({ item }: { item: Activity }) => (
        <View
            style={{
                flex: 1,
                padding: 8,
                maxWidth: numColumns > 1 ? `${100 / numColumns}%` : '100%',
            }}
        >
            <ActivityCard activity={item} />
        </View>
    );

    const renderEmpty = () => (
        <View
            style={{
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center',
                paddingVertical: 60,
            }}
        >
            <Text
                style={{
                    fontSize: 18,
                    color: colors.textSecondary,
                    textAlign: 'center',
                }}
            >
                No activities found
            </Text>

            <Text
                style={{
                    fontSize: 14,
                    color: colors.textSecondary,
                    textAlign: 'center',
                    marginTop: 8,
                }}
            >
                Try adjusting your search or filters
            </Text>

            <Image
                source={require('../../assets/no-activity-cta.svg')} // Change to .png
                style={{
                    width: 200,
                    height: 200,
                    marginVertical: 16,
                    opacity: 0.6,
                }}
                resizeMode="contain"
            />

        </View>
    );

    return (
        <FlatList
            data={activities}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
            numColumns={numColumns}
            key={numColumns} ////im doing forcing here 
            contentContainerStyle={{
                padding: 8,
                flexGrow: 1,
            }}
            ListEmptyComponent={renderEmpty}
            getItemLayout={(data, index) => ({
                length: ITEM_HEIGHT,
                offset: ITEM_HEIGHT * index,
                index,
            })}
            style={{ backgroundColor: colors.background }}
        />
    );
};
