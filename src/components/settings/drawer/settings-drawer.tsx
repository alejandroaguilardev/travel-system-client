import { useTheme } from '@mui/material/styles';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Drawer, { drawerClasses } from '@mui/material/Drawer';
import { paper } from 'src/theme/css';
import Iconify from '../../iconify';
import Scrollbar from '../../scrollbar';
import { useSettingsContext } from '../context';
import BaseOptions from './base-option';
import LayoutOptions from './layout-options';
import PresetsOptions from './presets-options';
import FullScreenOption from './fullscreen-option';
import { useAuthContext } from '../../../presentation/auth/hooks/use-auth-context';


export default function SettingsDrawer() {
  const theme = useTheme();

  const settings = useSettingsContext();
  const { user } = useAuthContext();

  const labelStyles = {
    mb: 1.5,
    color: 'text.disabled',
    fontWeight: 'fontWeightSemiBold',
  };

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="space-between"
      sx={{ py: 2, pr: 1, pl: 2.5 }}
    >
      <Typography variant="h6" sx={{ flexGrow: 1 }}>
        Preferencias
      </Typography>

      <Tooltip title="Reset">
        <IconButton onClick={settings.onReset}>
          <Iconify icon="solar:restart-bold" />
        </IconButton>
      </Tooltip>

      <IconButton onClick={settings.onClose}>
        <Iconify icon="mingcute:close-line" />
      </IconButton>
    </Stack>
  );

  const renderMode = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Modo
      </Typography>

      <BaseOptions
        value={settings.themeMode}
        onChange={(newValue: string) => settings.onUpdate('themeMode', newValue)}
        options={['light', 'dark']}
        icons={['sun', 'moon']}
      />
    </div>
  );

  const renderLayout = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Diseño de la pantalla
      </Typography>

      <LayoutOptions
        value={settings.themeLayout}
        onChange={(newValue: string) => settings.onUpdate('themeLayout', newValue)}
        options={['vertical', 'horizontal', 'mini']}
      />
    </div>
  );



  const renderPresets = (
    <div>
      <Typography variant="caption" component="div" sx={{ ...labelStyles }}>
        Paleta de colores
      </Typography>

      <PresetsOptions
        value={settings.themeColorPresets}
        onChange={(newValue: string) => settings.onUpdate('themeColorPresets', newValue)}
      />
    </div>
  );

  return (
    <Drawer
      anchor="right"
      open={settings.open}
      onClose={settings.onClose}
      slotProps={{
        backdrop: { invisible: true },
      }}
      sx={{
        [`& .${drawerClasses.paper}`]: {
          ...paper({ theme, bgcolor: theme.palette.background.default }),
          width: 280,
        },
      }}
    >
      {renderHead}

      <Divider sx={{ borderStyle: 'dashed' }} />

      <Scrollbar>
        <Stack spacing={3} sx={{ p: 3 }}>
          {renderMode}

          {user && user?.roles?.length > 0 && renderLayout}
          {renderPresets}
        </Stack>
      </Scrollbar>

      <FullScreenOption />
    </Drawer>
  );
}
