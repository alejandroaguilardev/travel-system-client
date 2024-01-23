import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Header from './header'


type Props = {
  children: React.ReactNode;
};

export default function ClientLayout({ children }: Props) {
  return (
    <>
      <Header />
      <Container component="main">
        <Stack
          sx={{
            py: 12,
          }}
        >
          {children}
        </Stack>
      </Container>
    </>
  );
}
