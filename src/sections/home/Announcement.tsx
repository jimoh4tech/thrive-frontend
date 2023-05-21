import { ChevronLeft, ChevronRight } from '@mui/icons-material';
import { Button, Grid } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/system';
import { useRef } from 'react';
import { IBlogPost } from 'src/@types/blog';
import Carousel, { CarouselDots } from 'src/components/carousel';
import { BlogPostCard } from '../blog';

interface Props {
  posts: IBlogPost[];
}

const Announcement = ({ posts }: Props) => {
  const theme = useTheme();

  const carouselRef = useRef<Carousel | null>(null);

  const carouselSettings = {
    // dots: false,
    arrows: false,
    dots: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    ...CarouselDots({
      // sx: {
      //   right: 24,
      //   bottom: 24,
      //   position: 'absolute',
      // },
    }),
    responsive: [
      {
        breakpoint: theme.breakpoints.values.md,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: theme.breakpoints.values.sm,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const handlePrev = () => {
    carouselRef.current?.slickPrev();
  };

  const handleNext = () => {
    carouselRef.current?.slickNext();
  };
  return (
    <Grid container direction="row" alignItems="center">
      <Grid item sm={1}>
        <Button
          onClick={handlePrev}
          variant="soft"
          sx={{ bgcolor: '#fff', display: { xs: 'none', md: 'block' } }}
          children={<ChevronLeft fontSize="large" />}
        />
      </Grid>

      <Grid item xs={12} md={10}>
        <Carousel ref={carouselRef} {...carouselSettings}>
          {posts.map((item, i) => (
            <Box p={1} key={i}>
              <BlogPostCard key={item.id} post={item} />
            </Box>
          ))}
        </Carousel>
      </Grid>

      <Grid item sm={1} textAlign="right">
        <Button
          onClick={handleNext}
          variant="soft"
          sx={{ bgcolor: '#fff', display: { xs: 'none', md: 'block' } }}
          children={<ChevronRight fontSize="large" />}
        />
      </Grid>
      {/* <CarouselArrows onNext={handleNext} onPrevious={handlePrev} /> */}
    </Grid>
  );
};

export default Announcement;
