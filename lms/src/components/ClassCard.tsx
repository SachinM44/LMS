import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { Video, User, Clock } from 'lucide-react-native';
import { Activity, ActivityType } from '../types';
import { useTheme } from '../hooks';

interface ClassCardProps {
    activity: Activity & { type: ActivityType.CLASS };
}

export const ClassCard: React.FC<ClassCardProps> = ({ activity }) => {
    const { colors } = useTheme();

    return (
        <View
            style={{
                backgroundColor: colors.card,
                borderRadius: 12,
                borderWidth: 1,
                borderColor: colors.cardBorder,
                padding: 16,
                shadowColor: colors.shadow,
                shadowOffset: { width: 0, height: 2 },
                shadowOpacity: 0.1,
                shadowRadius: 4,
                elevation: 2,
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View
                    style={{
                        backgroundColor: colors.primary + '20',
                        padding: 8,
                        borderRadius: 8,
                        marginRight: 12,
                    }}
                >
                    <Video size={20} color={colors.primary} />
                </View>
                <View style={{ flex: 1 }}>
                    <Text
                        style={{
                            fontSize: 12,
                            color: colors.textSecondary,
                            marginBottom: 4,
                        }}
                    >
                        {activity.category}
                    </Text>
                    <Text
                        style={{
                            fontSize: 16,
                            fontWeight: '600',
                            color: colors.text,
                        }}
                        numberOfLines={2}
                    >
                        {activity.title}
                    </Text>
                </View>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <User size={16} color={colors.textSecondary} />
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginLeft: 6,
                    }}
                >
                    {activity.instructor}
                </Text>
            </View>

      //Progress Bar
            <View style={{ marginBottom: 8 }}>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        marginBottom: 6,
                    }}
                >
                    <Text style={{ fontSize: 12, color: colors.textSecondary }}>Progress</Text>
                    <Text style={{ fontSize: 12, fontWeight: '600', color: colors.primary }}>
                        {activity.progress}%
                    </Text>
                </View>
                <View
                    style={{
                        height: 6,
                        backgroundColor: colors.border,
                        borderRadius: 3,
                        overflow: 'hidden',
                    }}
                >
                    <View
                        style={{
                            height: '100%',
                            width: `${activity.progress}%`,
                            backgroundColor: colors.primary,
                        }}
                    />
                </View>
            </View>

            ///time left
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
                <Clock size={16} color={colors.textSecondary} />
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginLeft: 6,
                    }}
                >
                    {activity.durationLeft}
                </Text>
            </View>

            /// button to resume
            <Pressable
                style={{
                    backgroundColor: colors.primary,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                }}
                accessibilityLabel={`Resume ${activity.title}`}
            >
                <Text style={{ color: '#FFFFFF', fontWeight: '600', fontSize: 14 }}>
                    Resume Class
                </Text>
            </Pressable>
        </View>
    );
};
