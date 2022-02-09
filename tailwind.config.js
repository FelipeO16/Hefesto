module.exports = {
    purge: [
      './public/**/*.html',
      './src/**/*.vue',
    ],
    darkMode: false, // or 'media' or 'class'
    theme: {
      extend: {
        colors: {
          'steel-blue': {
              '50': '#f5f8fb', 
              '100': '#ecf2f7', 
              '200': '#cfdeea', 
              '300': '#b2cbde', 
              '400': '#79a3c5', 
              '500': '#3F7CAC', 
              '600': '#39709b', 
              '700': '#2f5d81', 
              '800': '#264a67', 
              '900': '#1f3d54'
          },'gull-gray': {
              '50': '#fafbfc', 
              '100': '#f4f7f8', 
              '200': '#e5ebee', 
              '300': '#d5dfe3', 
              '400': '#b5c7cf', 
              '500': '#95AFBA', 
              '600': '#869ea7', 
              '700': '#70838c', 
              '800': '#596970', 
              '900': '#49565b'
          },'woodsmoke': {
              '50': '#f3f3f3', 
              '100': '#e8e8e8', 
              '200': '#c4c4c4', 
              '300': '#a1a1a1', 
              '400': '#5b5b5b', 
              '500': '#141414', 
              '600': '#121212', 
              '700': '#0f0f0f', 
              '800': '#0c0c0c', 
              '900': '#0a0a0a'
          },'midnight': {
              '50': '#f2f3f5', 
              '100': '#e6e8eb', 
              '200': '#c0c5cd', 
              '300': '#99a2af', 
              '400': '#4d5c74', 
              '500': '#011638', 
              '600': '#011432', 
              '700': '#01112a', 
              '800': '#010d22', 
              '900': '#000b1b'
          },'koromiko': {
              '50': '#fffcf7', 
              '100': '#fff8ef', 
              '200': '#ffeed8', 
              '300': '#fee4c1', 
              '400': '#fed092', 
              '500': '#FDBC63', 
              '600': '#e4a959', 
              '700': '#be8d4a', 
              '800': '#98713b', 
              '900': '#7c5c31'
          }
        }
      },
    },
    variants: {
      extend: {},
    },
    plugins: [],
  }