import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import React from 'react';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Bg from 'assets/bg.svg';
import routes from './routes';

const App: React.FC = function () {
  const router = createBrowserRouter(routes);

  const theme = extendTheme({
    fonts: {
      body: 'Roboto, sans-serif',
    },
    styles: {
      global: {
        body: {
          bgImage: Bg,
          bgSize: 'cover',
          bgPosition: 'center',
        },
      },
    },
    colors: {
      gray: {
        stroke: '#E4E4E4',
        text: '#717579',
        hoverBg: '#F3F3F3',
      },
      blue: {
        brand: '#428BCA',
      },
      yellow: {
        brand: '#FFC107',
      },
    },
    components: {
      Input: {
        variants: {
          custom: {
            field: {
              border: '1px solid',
              borderColor: 'gray.stroke',
              borderRadius: 0,
              _placeholder: {
                color: 'gray.text',
              },
              height: '50px',
              px: '18px',
              fontSize: '14px',
            },
          },
        },
      },
      Button: {
        baseStyle: {
          borderRadius: 0,
        },
        variants: {
          branded: {
            bgColor: 'blue.brand',
            color: 'white',
            _hover: {
              bgColor: '#2779BF',
              _disabled: {
                bgColor: '#5BA0DC',
              },
            },
            _disabled: {
              bgColor: '#5BA0DC',
            },
            fontWeight: '500',
            fontSize: '16px',
          },
        },
      },
    },
  });

  return (
    <ChakraProvider theme={theme}>
      <RouterProvider router={router} />
    </ChakraProvider>
  );
};

export default App;
