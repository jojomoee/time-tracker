import { ref, onMounted } from 'vue';
import { gsap } from 'gsap';
import { supabase } from '../supabase';  // Adjust the import path

export function useNavbar() {
  const isNavbarOpen = ref(false);
  const navbar = ref(null);
  const isLoggedIn = ref(false);

  const toggleNavbar = () => {
    isNavbarOpen.value = !isNavbarOpen.value;
    gsap.to(navbar.value, {
      height: isNavbarOpen.value ? 'auto' : 0,
      width: isNavbarOpen.value ? '10rem' : '0rem',
      opacity: isNavbarOpen.value ? 1 : 0,
      visibility: isNavbarOpen.value ? 'visible' : 'hidden',
      pointerEvents: isNavbarOpen.value ? 'auto' : 'none',
      display: isNavbarOpen.value ? 'flex' : 'none',
      duration: 0.5,
      ease: 'power2.' + (isNavbarOpen.value ? 'out' : 'in'),
    });
  };

  const checkLoginStatus = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    isLoggedIn.value = !!session;
  };

  const logout = async () => {
    await supabase.auth.signOut();
    checkLoginStatus();  // Update login status after logout
  };

  onMounted(() => {
    gsap.set(navbar.value, { height: 0, opacity: 0, visibility: 'hidden', pointerEvents: 'none' });
    checkLoginStatus();  // Check login status on mount
  });

  return {
    isNavbarOpen,
    navbar,
    toggleNavbar,
    isLoggedIn,
    logout
  };
}
