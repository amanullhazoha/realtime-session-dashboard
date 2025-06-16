'use client';

import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { useTheme } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

// project imports
import { ThemeMode } from 'config';
import { gridSpacing } from 'store/constant';
import Avatar from 'components/ui-component/extended/Avatar';

// assets
import MoreHorizOutlinedIcon from '@mui/icons-material/MoreHorizOutlined';
import NotInterestedTwoToneIcon from '@mui/icons-material/NotInterestedTwoTone';
import ChatBubbleTwoToneIcon from '@mui/icons-material/ChatBubbleTwoTone';

const avatarImage = '/assets/images/users';

// ==============================|| Session CARD ||============================== //

const SessionCard = ({ about, avatar, contact, email, location, name, role }) => {
  const theme = useTheme();
  const avatarProfile = avatar && `${avatarImage}/${avatar}`;

  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event?.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card
      sx={{
        p: 2,
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
        border: '1px solid',
        borderColor: 'divider',
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      <Grid container spacing={gridSpacing}>
        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs zeroMinWidth>
              <Avatar alt={name} size="lg" src={avatarProfile} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3">Agent Name</Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="caption">Room Name</Typography>
              <Typography variant="h6">Test Room</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Started Time</Typography>
              <Typography variant="h6">09:50:33</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="caption">Session Duration</Typography>
              <Typography variant="h6">01:50:33</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Participant</Typography>
              <Typography variant="h6">10</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

SessionCard.propTypes = {
  about: PropTypes.string,
  avatar: PropTypes.string,
  contact: PropTypes.string,
  email: PropTypes.string,
  location: PropTypes.string,
  name: PropTypes.string,
  role: PropTypes.string
};

export default SessionCard;
