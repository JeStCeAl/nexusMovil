import { useEffect } from 'react';
import { Linking } from 'react-native';
import AppNavigator from "./src/Navegation/AppNavigator";

export default function App() {
  // Configuración del deep linking
  useEffect(() => {
    const handleDeepLink = ({ url }) => {
      if (url && url.includes('/reset-password/')) {
        const parts = url.split('/');
        const token = parts[parts.length - 2];
        const email = decodeURIComponent(parts[parts.length - 1]);
        
        // Aquí necesitamos acceder a la navegación
        // Veremos cómo en el siguiente paso
      }
    };

    // Maneja el caso cuando la app se abre desde cerrada
    Linking.getInitialURL().then(url => {
      if (url) handleDeepLink({ url });
    });

    // Maneja el caso cuando la app ya está abierta
    const subscription = Linking.addEventListener('url', handleDeepLink);

    return () => {
      subscription.remove(); // Limpieza
    };
  }, []);

  return <AppNavigator />;
}