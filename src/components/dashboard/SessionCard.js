'use client';

import dayjs from 'dayjs';
import PropTypes from 'prop-types';
import { ThemeMode } from 'config';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import { useState, useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

const SessionCard = ({ agentName, roomName, participant, startTime, creationTime }) => {
  const theme = useTheme();
  const [duration, setDuration] = useState('00:00:00');

  // Calculate the session duration based on the creation time and update it every second
  useEffect(() => {
    const interval = setInterval(() => {
      const diff = dayjs().diff(dayjs.unix(creationTime), 'second');

      const hrs = Math.floor(diff / 3600)
        .toString()
        .padStart(2, '0');

      const mins = Math.floor((diff % 3600) / 60)
        .toString()
        .padStart(2, '0');

      const secs = (diff % 60).toString().padStart(2, '0');

      setDuration(`${hrs}:${mins}:${secs}`);
    }, 1000);

    return () => clearInterval(interval);
  }, [creationTime]);

  return (
    <Card
      sx={{
        p: 2,
        border: '1px solid',
        borderColor: 'divider',
        bgcolor: theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.50',
        '&:hover': { borderColor: 'primary.main' }
      }}
    >
      <Grid container spacing={gridSpacing}>
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
              <Typography variant="h6">{duration}</Typography>
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
  roomName: PropTypes.string,
  startTime: PropTypes.string,
  agentName: PropTypes.string,
  participant: PropTypes.string,
  creationTime: PropTypes.string
};

export default SessionCard;
