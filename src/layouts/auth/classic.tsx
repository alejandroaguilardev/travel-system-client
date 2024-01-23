
import Stack from '@mui/material/Stack';

type Props = {
  children: React.ReactNode;
};

export default function AuthClassicLayout({ children }: Props) {

  const renderContent = (
    <Stack
      sx={{
        width: 1,
        mx: 'auto',
        maxWidth: 480,
        px: { xs: 2, md: 8 }
      }}
    >
      {children}
    </Stack>
  );

  return (
    <Stack
      component="main"
      direction="row"
      justifyContent="center"
      alignItems="center"
      height="100vh"
    >
      {renderContent}
    </Stack>
  );
}
