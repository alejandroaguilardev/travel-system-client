import 'simplebar-react/dist/simplebar.min.css';
import 'react-lazy-load-image-component/src/effects/blur.css';

import { SnackbarProvider } from 'notistack';
import Router from './app/routes/sections';
import ThemeProvider from './theme';
import { useScrollToTop } from './hooks/use-scroll-to-top';
import ProgressBar from './components/progress-bar';
import { MotionLazy } from './components/animate/motion-lazy';
import { SettingsProvider, SettingsDrawer } from './components/settings';
import { AuthProvider, AuthConsumer } from './presentation/auth/context';
import { AlertModalProvider } from './components/alert-modal/alert-modal-context';

export default function App() {
  useScrollToTop();

  return (
    <AuthProvider>
      <SettingsProvider
        defaultSettings={{
          themeMode: 'light',
          themeLayout: 'vertical',
          themeColorPresets: 'default',
        }}
      >
        <ThemeProvider>
          <MotionLazy>
            <SettingsDrawer />
            <ProgressBar />
            <AuthConsumer>
              <SnackbarProvider>
                <AlertModalProvider>
                  <Router />
                </AlertModalProvider>
              </SnackbarProvider>
            </AuthConsumer>
          </MotionLazy>
        </ThemeProvider>
      </SettingsProvider>
    </AuthProvider>
  );
}
