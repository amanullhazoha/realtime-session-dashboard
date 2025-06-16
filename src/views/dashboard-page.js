'use client';

import dayjs from 'dayjs';
import { useState, useEffect } from 'react';
import { gridSpacing } from 'store/constant';
import SessionCard from 'components/dashboard/SessionCard';
import RevenueCard from 'components/ui-component/cards/RevenueCard';
import { Card, Box, CardContent, Divider, Grid, Typography } from '@mui/material';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

// Function to format the start time from Unix timestamp
const getStartTime = (startedTime) => {
  return dayjs.unix(startedTime).format('hh:mm:ss A');
};

export default function Dashboard() {
  const [error, setError] = useState(null);
  const [sessions, setSessions] = useState({ count: 0, rooms: [] });

  // Fetch sessions from the API
  const fetchSessions = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/sessions`, {
        cache: 'no-store'
      });

      if (!res.ok) {
        setError(`Failed to fetch: ${res.statusText}`);
        return;
      }

      const { data } = await res.json();

      setSessions(data);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  };

  // Fetch sessions on component mount and set an interval to refresh every 10 seconds
  useEffect(() => {
    fetchSessions();
    const interval = setInterval(fetchSessions, 10000);

    return () => clearInterval(interval);
  }, []);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={4} lg={3}>
        <RevenueCard color="primary.dark" title="Running Sessions" iconPrimary={OndemandVideoOutlinedIcon} count={sessions?.count || 0} />
      </Grid>

      <Grid item xs={12}>
        <Card
          variant="outlined"
          sx={{
            height: '100%',
            '&:hover': {
              boxShadow: 'rgba(32, 40, 45, 0.08) 0px 2px 14px 0px'
            }
          }}
        >
          <Box p={2}>
            <Typography variant="h5">Live Sessions</Typography>
          </Box>
          <Divider />

          <CardContent sx={{ p: 2, paddingBottom: '16px !important' }}>
            {sessions?.count > 0 ? (
              <Grid container spacing={gridSpacing}>
                {sessions?.rooms?.map((room) => {
                  const agentName = JSON.parse(room.metadata)?.task?.name || 'Unknown Agent';

                  return (
                    <Grid item xs={12} md={4} lg={3} key={room?.sid}>
                      <SessionCard
                        agentName={agentName}
                        roomName={room?.name}
                        creationTime={room?.creationTime}
                        participant={room?.numParticipants}
                        startTime={getStartTime(room?.creationTime)}
                      />
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Typography color="color.secondary">No live sessions available.</Typography>
            )}
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
}
