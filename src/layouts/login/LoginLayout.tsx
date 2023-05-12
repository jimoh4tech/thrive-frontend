// @mui
import { Stack, Typography } from '@mui/material';
// components
import { SeoIllustration } from 'src/assets/illustrations';
//
import { LogoFull } from 'src/components/logo/Logo';
import { StyledContent, StyledRoot, StyledSection, StyledSectionBg } from './styles';

// ----------------------------------------------------------------------

type Props = {
  title?: string;
  illustration?: string;
  children: React.ReactNode;
};

export default function LoginLayout({ children, illustration, title }: Props) {
  return (
    <StyledRoot>
      <StyledSection>
        <Typography variant="h3" sx={{ mb: 10, maxWidth: 480, textAlign: 'center' }}>
          {title || 'Hi, Welcome back'}
        </Typography>

        <SeoIllustration
          sx={{
            p: 3,
            width: '60%',
            margin: { xs: 'auto', md: 'inherit' },
          }}
        />

        <StyledSectionBg />
      </StyledSection>

      <StyledContent>
        <Stack sx={{ width: 1 }}>
          <LogoFull sx={{ width: '70%', mb: 2 }} /> {children}{' '}
        </Stack>
      </StyledContent>
    </StyledRoot>
  );
}
