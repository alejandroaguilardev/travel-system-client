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
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { ImpContractProvider } from './components/imp-pdf/imp-contract/imp-contract-context';
import { ImpContractConsumer } from './components/imp-pdf/imp-contract/imp-contract-consumer';

declare global {
  interface Window {
    grecaptcha: {
      ready(callback: () => void): void;
      execute(siteKey: string, options: { action: string }): Promise<string>;
    };
  }
}

export default function App() {
  useScrollToTop();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

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
                  <ImpContractProvider>
                    <AlertModalProvider>
                      <Router />
                    </AlertModalProvider>
                    <ImpContractConsumer />
                  </ImpContractProvider>
                </SnackbarProvider>
              </AuthConsumer>
            </MotionLazy>
          </ThemeProvider>
        </SettingsProvider>
      </AuthProvider>
    </LocalizationProvider>
  );
}
