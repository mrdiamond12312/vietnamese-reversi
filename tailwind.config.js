/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/pages/**/*.tsx', './src/components/**/*.tsx', './src/layouts/**/*.tsx', './index.html'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Nunito', 'ui-sans-serif'],
        serif: ['ui-serif'],
      },

      colors: {
        transparent: 'transparent',
        
        'neutral-1': '#FFFFFF',
        'neutral-2': '#F5F6FA',
        'neutral-3': '#EBECF0',
        'neutral-4': '#D4D5D9',
        'neutral-5': '#BBBCBF',
        'neutral-6': '#8A8B8C',
        'neutral-7': '#575859',
        'neutral-8': '#414142',
        'neutral-9': '#2A2A2B',
        'neutral-10': '#000D0B',
      },

      fontSize: {
        'heading-1': ['40px', { lineHeight: '48px', fontWeight: '800' }],
        'heading-2': ['36px', { lineHeight: '40px', fontWeight: '800' }],
        'heading-3': ['32px', { lineHeight: '36px', fontWeight: '800' }],
        'heading-4': ['28px', { lineHeight: '32px', fontWeight: '700' }],
        'heading-5': ['24px', { lineHeight: '28px', fontWeight: '700' }],
  
        'body-1-semibold': ['20px', { lineHeight: '24px', fontWeight: '700' }],
        'body-1-medium': ['20px', { lineHeight: '24px', fontWeight: '500' }],
        'body-1-regular': ['20px', { lineHeight: '24px', fontWeight: '400' }],
  
        'body-2-semibold': ['18px', { lineHeight: '22px', fontWeight: '700' }],
        'body-2-medium': ['18px', { lineHeight: '22px', fontWeight: '500' }],
        'body-2-regular': ['18px', { lineHeight: '22px', fontWeight: '400' }],
  
        'body-3-semibold': ['16px', { lineHeight: '20px', fontWeight: '700' }],
        'body-3-medium': ['16px', { lineHeight: '20px', fontWeight: '500' }],
        'body-3-regular': ['16px', { lineHeight: '20px', fontWeight: '400' }],
  
        borderRadius: {
          default: '4px',
        },
      },

    },
  },
  plugins: [],
}

