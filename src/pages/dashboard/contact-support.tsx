import { Accordion, AccordionDetails, AccordionSummary, Grid, Typography } from '@mui/material';
import { Container } from '@mui/system';
import Head from 'next/head';
import { SyntheticEvent, useState } from 'react';
import CustomBreadcrumbs from 'src/components/custom-breadcrumbs/CustomBreadcrumbs';
import Iconify from 'src/components/iconify/Iconify';
import { faq } from 'src/constants/faq';
import { PATH_DASHBOARD } from 'src/routes/paths';
import ContactForm from 'src/sections/contact/ContactForm';
import DashboardLayout from '../../layouts/dashboard';
// @types
// components
// sections

// ----------------------------------------------------------------------

Support.getLayout = (page: React.ReactElement) => <DashboardLayout>{page}</DashboardLayout>;

// ----------------------------------------------------------------------

export default function Support() {
  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (event: SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <Head>
        <title> Contact Support | ICSS Thrive</title>
      </Head>

      <Container maxWidth="xl">
        <CustomBreadcrumbs
          heading="Contact Support"
          links={[
            {
              name: 'Dashboard',
              href: PATH_DASHBOARD.root,
            },
            { name: 'Contact Support' },
          ]}
        />
        <Grid spacing={6} container>
          <Grid item md={4}>
            <ContactForm />
          </Grid>
          <Grid item md={8}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              Frequently asked questions
            </Typography>

            {faq.map((fq, i) => (
              <Accordion
                key={i}
                expanded={expanded === `panel${i}`}
                onChange={handleChange(`panel${i}`)}
              >
                <AccordionSummary expandIcon={<Iconify icon="eva:arrow-ios-downward-fill" />}>
                  <Typography variant="subtitle1">{fq.titile}</Typography>
                </AccordionSummary>

                <AccordionDetails>
                  <Typography component="div" dangerouslySetInnerHTML={{ __html: fq.ans }} />
                </AccordionDetails>
              </Accordion>
            ))}
          </Grid>
        </Grid>
      </Container>
    </>
  );
}
// ----------------------------------------------------------------------
