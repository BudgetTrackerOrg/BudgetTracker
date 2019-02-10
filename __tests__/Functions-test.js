import functions from '../src/globals/functions'
import Entities from 'html-entities/lib/html5-entities'

const entities = new Entities()
const {
    toTitleCase,
    toSimpleDateString,
    getExpenseResult,
    getTotalAmount,
    formatCurrency,
    focusTextInput
} = functions

// toTitleCase function tests
test('capitalizes first letter of every word', () => {
    expect(toTitleCase('test testing')).toEqual('Test Testing')
})
test('handles fully capitalized word', () => {
    expect(toTitleCase('TESTING')).toEqual('Testing')
})
test('accepts numerical and special character input', () => {
    expect(toTitleCase('!@#$521421')).toEqual('!@#$521421')
})
test('trims excessive spaces', () => {
    expect(toTitleCase(' test ')).toEqual('Test')
})
test('handles no input', () => {
    expect(toTitleCase()).toBeFalsy()
})

// toSimpleDateString function tests
test('formatting date correctly', () => {
    expect(toSimpleDateString(new Date('feb 9 2019'))).toEqual(
        'February 9, 2019'
    )
})
test('handles no date passed through', () => {
    expect(toSimpleDateString()).toBeUndefined()
})

// formatCurrency function tests
test('handles regular input', () => {
    expect(formatCurrency(42.87)).toEqual('$42.87')
})
test('appends decimals to perfect numbers', () => {
    expect(formatCurrency(0)).toEqual('$0.00')
})
test('handles negative number input', () => {
    expect(formatCurrency(-214)).toEqual('-$214.00')
})
test('handles non-dollar ($) currency symbols', () => {
    expect(formatCurrency(10, '&#163;')).toEqual(
        entities.decode('&#163;') + '10.00'
    )
})
test('handles redundant decimals', () => {
    expect(formatCurrency('123.521.421')).toEqual('$123.52')
})
