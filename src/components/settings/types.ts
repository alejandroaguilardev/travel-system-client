// ----------------------------------------------------------------------

export type SettingsValueProps = {
  themeMode: 'light' | 'dark';
  themeLayout: 'vertical' | 'horizontal' | 'mini';
  themeColorPresets: 'default' | 'cyan' | 'purple' | 'blue' | 'orange' | 'red';
};

export type SettingsContextProps = SettingsValueProps & {
  onUpdate: (name: string, value: string | boolean) => void;
  onChangeDirectionByLang: (lang: string) => void;
  canReset: boolean;
  onReset: VoidFunction;
  open: boolean;
  onToggle: VoidFunction;
  onClose: VoidFunction;
};
