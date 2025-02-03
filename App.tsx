import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './src/navigation';
import { ModalView } from './src/screens';
import { store } from './src/store';
import { Provider } from 'react-redux';

function App(): React.JSX.Element {
    return (
        <Provider store={store}>
            <ModalView />
            <NavigationContainer>
                <Navigation />
            </NavigationContainer>
        </Provider>
    );
}

export default App;
