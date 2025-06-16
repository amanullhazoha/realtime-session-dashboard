import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';
import SessionCard from 'components/dashboard/SessionCard';
import RevenueCard from 'components/ui-component/cards/RevenueCard';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

export default async function Dashboard() {
  let sessions = { count: 0, rooms: [] };
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/sessions`, {
      cache: 'force-cache'
    });
    if (!res.ok) {
      error = `Failed to fetch: ${res.statusText}`;
    } else {
      const { data } = await res.json();
      sessions = data;
    }
  } catch (err) {
    error = err.message;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={4} lg={3}>
        <RevenueCard
          color="orange.dark"
          primary="Running Sessions"
          secondary={sessions?.count || 0}
          iconPrimary={OndemandVideoOutlinedIcon}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {sessions?.rooms?.map((room) => (
            <Grid item xs={12} md={4} lg={3} key={room?.sid}>
              <SessionCard
                agentName=""
                roomName={room?.name}
                avatar="avatar-2.png"
                sessionDuration="01:05:33"
                startTime={room?.creationTime}
                participant={room?.maxParticipants}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
}
