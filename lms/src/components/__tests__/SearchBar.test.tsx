import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SearchBar } from '../SearchBar';
import { ThemeProvider } from '../../context/ThemeContext';

// Wrap component with ThemeProvider for tests
const renderWithTheme = (component: React.ReactElement) => {
    return render(<ThemeProvider>{component}</ThemeProvider>);
};

describe('SearchBar', () => {
    it('renders correctly', () => {
        const mockOnChange = jest.fn();
        const { getByPlaceholderText } = renderWithTheme(
            <SearchBar value="" onChangeText={mockOnChange} />
        );

        expect(getByPlaceholderText('Search activities...')).toBeTruthy();
    });

    it('calls onChangeText when user types', () => {
        const mockOnChange = jest.fn();
        const { getByPlaceholderText } = renderWithTheme(
            <SearchBar value="" onChangeText={mockOnChange} />
        );

        const input = getByPlaceholderText('Search activities...');
        fireEvent.changeText(input, 'Machine Learning');

        expect(mockOnChange).toHaveBeenCalledWith('Machine Learning');
    });

    it('shows clear button when text is present', () => {
        const mockOnChange = jest.fn();
        const { getByLabelText } = renderWithTheme(
            <SearchBar value="test" onChangeText={mockOnChange} />
        );

        expect(getByLabelText('Clear search')).toBeTruthy();
    });

    it('clears text when clear button is pressed', () => {
        const mockOnChange = jest.fn();
        const { getByLabelText } = renderWithTheme(
            <SearchBar value="test" onChangeText={mockOnChange} />
        );

        const clearButton = getByLabelText('Clear search');
        fireEvent.press(clearButton);

        expect(mockOnChange).toHaveBeenCalledWith('');
    });
});
