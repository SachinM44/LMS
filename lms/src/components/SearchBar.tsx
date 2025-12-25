import React, { memo } from "react"
import { useTheme } from "../hooks"
import { Pressable, TextInput, View } from "react-native"
import { Search, X } from "lucide-react-native"

interface SearchBarPops {
    placeholder: string,
    onChangeText: (text: string) => void,
    value: string
}

export const SearchBar: React.FC<SearchBarPops> = ({
    value,
    onChangeText,
    placeholder = 'search activity ..'
}) => {

    const { colors } = useTheme()

    return (
        <View
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                backgroundColor: colors.card,
                borderRadius: 8,
                borderColor: colors.border,
                paddingHorizontal: 12,
                paddingVertical: 8
            }} >

            <Search size={20} color={colors.textSecondary} />


            <TextInput
                value={value}
                onChangeText={onChangeText}
                placeholder={placeholder}
                placeholderTextColor={colors.textSecondary}
                style={{
                    flex: 1,
                    marginLeft: 8,
                    fontSize: 16,
                    color: colors.text
                }}
                accessibilityLabel="Search activities"
            />

            {value.length > 0 && (
                <Pressable onPress={() => onChangeText('')} accessibilityLabel="clear search">
                    <X size={20} color={colors.textSecondary} />
                </Pressable>
            )}

        </View>
    )

}