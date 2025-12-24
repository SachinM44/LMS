import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from "react";
import { Theme, ThemeColors, ThemeContextType } from "../types";
import AsyncStorage from '@react-native-async-storage/async-storage';

const lightColors: ThemeColors = {
    background: '#F9FAFB',
    card: '#FFFFFF',
    cardBorder: '#E5E7EB',
    text: '#111827',
    textSecondary: '#6B7280',
    border: '#D1D5DB',
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    secondary: '#8B5CF6',
    success: '#10B981',
    warning: '#F59E0B',
    error: '#EF4444',
    shadow: 'rgba(0, 0, 0, 0.1)',
};

const darkColors: ThemeColors = {
    background: '#111827',
    card: '#1F2937',
    cardBorder: '#374151',
    text: '#F9FAFB',
    textSecondary: '#9CA3AF',
    border: '#4B5563',
    primary: '#818CF8',
    primaryHover: '#6366F1',
    secondary: '#A78BFA',
    success: '#34D399',
    warning: '#FBBF24',
    error: '#F87171',
    shadow: 'rgba(0, 0, 0, 0.3)',
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined)
const THEME_KEY = '@lms_theme'


export const ThemeProvider = ({ children }: { children: ReactNode }) => {
    const [isDark, setIsDark] = useState(false) ///false initialy 
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const loadThemePreference = async () => {
            try {
                const savedTheme = await AsyncStorage.getItem(THEME_KEY)
                if (savedTheme !== null) {
                    setIsDark(savedTheme === 'dark')
                }
            } catch (error) {
                console.error('failed to load preferance from async storage')
            }
        }
        loadThemePreference()
    }, [])


    if (loading) {
        return null
    }


    const toggleTheme = async () => {
        try {
            const newTheme = !isDark
            setIsDark(newTheme);
            await AsyncStorage.setItem(THEME_KEY, newTheme ? 'dark' : 'light')
        } catch (error) {
            console.error('failed to save the theme', error)
        } finally {
            setLoading(false)
        }
    }

    const value = useMemo(() => {
        const colors = isDark ? darkColors : lightColors
        const theme: Theme = { isDark, colors }

        return {
            isDark,
            colors,
            theme,
            toggleTheme
        }
    }, [isDark])


    return (
        <ThemeContext.Provider value={value}>
            {children}
        </ThemeContext.Provider>
    )
}


/// theme hook 
export const useTheme = (): ThemeContextType => {
    const context = useContext(ThemeContext)
    if (!context) {
        throw new Error("something going wrong")

    }
    return context
}