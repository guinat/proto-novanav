import { useEffect } from 'react';
import { useRouter } from 'expo-router';

export default function MapButton() {
  const router = useRouter();

  useEffect(() => {
    // Immediately navigate to the map screen when this tab is pressed
    router.push('/map');
  }, []);

  // This screen is never actually shown, as we navigate away immediately
  return null;
}