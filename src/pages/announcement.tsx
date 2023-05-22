// @mui
import { Box, Grid } from '@mui/material';
// layouts
import { Container } from '@mui/system';
import SearchBar from 'src/components/search-bar';
import { IQuery } from 'src/@types/query';
import { BlogPostCard } from 'src/sections/blog';
import { sa } from 'src/constants/home';
import { SkeletonPostItem } from 'src/components/skeleton';
import MainLayout from '../layouts/main';
// components

// ----------------------------------------------------------------------

HomePage.getLayout = (page: React.ReactElement) => (
  <MainLayout metaTitle="Announcements" title="Announcements">
    {page}
  </MainLayout>
);

// ----------------------------------------------------------------------

export default function HomePage() {
  return (
    <Box
      sx={{
        overflow: 'hidden',
        position: 'relative',
        bgcolor: 'background.default',
      }}
    >
      <Container sx={{ py: 6 }}>
        <SearchBar
          onChange={(query: IQuery) => {}}
          onClearFilter={() => {}}
          searching={false}
          withDateFilter={false}
          filterOptions={[{ label: 'All Industries', name: 'industries', options: [] }]}
          onChangeOption={(name, value) => {}}
        />

        <Grid container spacing={3}>
          {sa.posts.map((post, index) =>
            post ? (
              <Grid key={post.id} item xs={12} sm={6} md={(index === 0 && 6) || 3}>
                <BlogPostCard post={post} index={index} />
              </Grid>
            ) : (
              <SkeletonPostItem key={index} />
            )
          )}
        </Grid>
      </Container>
    </Box>
  );
}
