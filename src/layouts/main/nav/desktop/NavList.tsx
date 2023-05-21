import { MouseEventHandler, useEffect, useState } from 'react';
// next
import { useRouter } from 'next/router';
// @mui
import { Popover, Stack } from '@mui/material';
// hooks
import useActiveLink from '../../../../hooks/useActiveLink';
//
import { NavItemProps } from '../types';
import { NavItem, NavItemDashboard } from './NavItem';

// ----------------------------------------------------------------------

type NavListProps = {
  item: NavItemProps;
  isOffset: boolean;
};

export default function NavList({ item, isOffset }: NavListProps) {
  const { pathname } = useRouter();

  const { path, children } = item;

  const { active, isExternalLink } = useActiveLink(path, false);

  const [anchorEl, setAnchorEl] = useState<HTMLDivElement | null>(null);

  const handleOpen: MouseEventHandler<HTMLDivElement> = (event) => {
    if (children) setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  useEffect(() => {
    if (open) {
      handleClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  return (
    <>
      <NavItem
        item={item}
        isOffset={isOffset}
        active={active}
        open={open}
        isExternalLink={isExternalLink}
        onMouseEnter={handleOpen}
        // onMouseLeave={handleClose}
        aria-describedby={id}
      />

      {!!children && open && (
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
        >
          {children.map((list) => (
            <NavSubList
              key={list.subheader}
              subheader={list.subheader}
              items={list.items}
              isDashboard={list.subheader === 'Dashboard'}
              onClose={handleClose}
            />
          ))}
        </Popover>
      )}
    </>
  );
}

// ----------------------------------------------------------------------

type NavSubListProps = {
  isDashboard: boolean;
  subheader: string;
  items: NavItemProps[];
  onClose: VoidFunction;
};

function NavSubList({ items, isDashboard, subheader, onClose }: NavSubListProps) {
  const { pathname } = useRouter();

  const isActive = (path: string) => pathname === path;

  return (
    <Stack
      spacing={2.5}
      gridColumn={isDashboard ? 'span 6' : 'span 2'}
      alignItems="flex-start"
      p={2}
    >
      {/* <StyledSubheader disableSticky>{subheader}</StyledSubheader> */}

      {items.map((item) =>
        isDashboard ? (
          <NavItemDashboard key={item.title} item={item} onClick={onClose} />
        ) : (
          <NavItem
            subItem
            key={item.title}
            item={item}
            active={isActive(item.path)}
            onClick={onClose}
          />
        )
      )}
    </Stack>
  );
}
