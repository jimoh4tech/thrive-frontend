// next
import NextLink from 'next/link';
// @mui
import { Box, Card, CardContent, Link, Stack, Typography } from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
// routes
// hooks
import useResponsive from '../../hooks/useResponsive';
// utils
import { fShortenNumber } from '../../utils/formatNumber';
import { fDate } from '../../utils/formatTime';
// @types
import { IBlogPost } from '../../@types/blog';
// components
import Iconify from '../../components/iconify';
import Image from '../../components/image';
import TextMaxLine from '../../components/text-max-line';

// ----------------------------------------------------------------------

const StyledOverlay = styled('div')(({ theme }) => ({
  top: 0,
  zIndex: 1,
  width: '100%',
  height: '100%',
  position: 'absolute',
  backgroundColor: alpha(theme.palette.grey[900], 0.64),
}));

// ----------------------------------------------------------------------

type Props = {
  post: IBlogPost;
  index?: number;
};

export default function BlogPostCard({ post, index }: Props) {
  const isDesktop = useResponsive('up', 'md');

  const { image, title, like, comment, createdAt } = post;

  const latestPost = index === 0 || index === 1 || index === 2;

  if (isDesktop && latestPost) {
    return (
      <Card>
        <PostContent
          title={title}
          like={like}
          comment={comment}
          createdAt={createdAt}
          index={index}
        />

        <StyledOverlay />

        <Image alt="cover" src={image} sx={{ height: 360 }} />
      </Card>
    );
  }

  return (
    <Card>
      <Box sx={{ position: 'relative' }}>
        <Image alt="image" src={image} ratio="4/3" />
      </Box>

      <PostContent title={title} comment={comment} like={like} createdAt={createdAt} />
    </Card>
  );
}

// ----------------------------------------------------------------------

type PostContentProps = {
  title: string;
  comment: number;
  like: number;
  createdAt: Date | string | number;
  index?: number;
};

export function PostContent({ title, comment, like, createdAt, index }: PostContentProps) {
  const isDesktop = useResponsive('up', 'md');

  const linkTo = 'PATH_DASHBOARD.blog.view(paramCase(title))';

  const latestPostLarge = index === 0;

  const latestPostSmall = index === 1 || index === 2;

  const POST_INFO = [
    { id: 'comment', value: comment, icon: 'eva:message-circle-fill' },
    { id: 'like', value: like, icon: 'solar:like-bold-duotone' },
  ];

  return (
    <CardContent
      sx={{
        pt: 4.5,
        width: 1,
        ...((latestPostLarge || latestPostSmall) && {
          pt: 0,
          zIndex: 9,
          bottom: 0,
          position: 'absolute',
          color: 'common.white',
        }),
      }}
    >
      <Typography
        gutterBottom
        variant="caption"
        component="div"
        sx={{
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {fDate(createdAt)}
      </Typography>

      <Link component={NextLink} href={linkTo} color="inherit">
        <TextMaxLine
          variant={isDesktop && latestPostLarge ? 'h5' : 'subtitle2'}
          line={2}
          persistent
        >
          {title}
        </TextMaxLine>
      </Link>

      <Stack
        flexWrap="wrap"
        direction="row"
        justifyContent="flex-end"
        sx={{
          mt: 3,
          color: 'text.disabled',
          ...((latestPostLarge || latestPostSmall) && {
            opacity: 0.64,
            color: 'common.white',
          }),
        }}
      >
        {POST_INFO.map((info) => (
          <Stack
            key={info.id}
            direction="row"
            alignItems="center"
            sx={{ typography: 'caption', ml: info.id === 'comment' ? 0 : 1.5 }}
          >
            <Iconify icon={info.icon} width={16} sx={{ mr: 0.5 }} />
            {fShortenNumber(info.value)}
          </Stack>
        ))}
      </Stack>
    </CardContent>
  );
}