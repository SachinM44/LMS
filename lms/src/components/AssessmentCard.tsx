import React from 'react';
import { View, Text, Pressable } from 'react-native';
import { FileText, Calendar } from 'lucide-react-native';
import { Activity, ActivityType } from '../types';
import { useTheme } from '../hooks';

interface AssessmentCardProps {
    activity: Activity & { type: ActivityType.QUIZ | ActivityType.ASSIGNMENT };
}

export const AssessmentCard: React.FC<AssessmentCardProps> = ({ activity }) => {
    const { colors } = useTheme();
    const isPending = activity.status === 'PENDING';

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
                height: 250
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 8 }}>
                <View
                    style={{
                        backgroundColor: colors.secondary + '20',
                        padding: 8,
                        borderRadius: 8,
                        marginRight: 12,
                    }}
                >
                    <FileText size={20} color={colors.secondary} />
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

            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12, paddingTop:15 }}>
                <Calendar size={16} color={colors.textSecondary} />
                <Text
                    style={{
                        fontSize: 14,
                        color: colors.textSecondary,
                        marginLeft: 6,
                    }}
                >
                    {activity.dueDate}
                </Text>
            </View>

            <View
                style={{
                    alignSelf: 'flex-start',
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: 12,
                    marginTop:5,
                    backgroundColor: isPending ? colors.warning + '20' : colors.success + '20',
                    marginBottom: 12,
                }}
            >
                <Text
                    style={{
                        fontSize: 12,
                        fontWeight: '600',
                        color: isPending ? colors.warning : colors.success,
                    }}
                >
                    {activity.status}
                </Text>
            </View>

           <View style={{
            marginTop:10
           }}>
             <Pressable
                style={{
                    backgroundColor: isPending ? colors.secondary : colors.border,
                    paddingVertical: 12,
                    borderRadius: 8,
                    alignItems: 'center',
                }}
                accessibilityLabel={`${isPending ? 'Start' : 'View'} ${activity.title}`}
            >

                <Text
                    style={{
                        color: isPending ? '#FFFFFF' : colors.text,
                        fontWeight: '600',
                        fontSize: 14,
                    }}
                >
                    {isPending ? 'Start' : 'View'}
                </Text>
            </Pressable>
           </View>
        </View>
    );
};
