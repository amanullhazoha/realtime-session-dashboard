'use client';

import PropTypes from 'prop-types';
import { ThemeMode } from 'config';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Avatar from 'components/ui-component/extended/Avatar';

const avatarImage = '/assets/images/users';

const SessionCard = ({ agentName, roomName, participant, sessionDuration, startTime, avatar }) => {
  const theme = useTheme();
  const avatarProfile = avatar && `${avatarImage}/${avatar}`;

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
              <Avatar alt={agentName} size="lg" src={avatarProfile} />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography variant="h3">{agentName}</Typography>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="caption">Room Name</Typography>
              <Typography variant="h6">{roomName}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Started Time</Typography>
              <Typography variant="h6">{startTime}</Typography>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container spacing={gridSpacing}>
            <Grid item xs={6}>
              <Typography variant="caption">Session Duration</Typography>
              <Typography variant="h6">{sessionDuration}</Typography>
            </Grid>

            <Grid item xs={6}>
              <Typography variant="caption">Participants</Typography>
              <Typography variant="h6">{participant}</Typography>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
};

SessionCard.propTypes = {
  avatar: PropTypes.string,
  roomName: PropTypes.string,
  startTime: PropTypes.string,
  agentName: PropTypes.string,
  participant: PropTypes.string,
  sessionDuration: PropTypes.string
};

export default SessionCard;
