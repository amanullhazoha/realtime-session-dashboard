import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';
import SessionCard from 'components/dashboard/SessionCard';
import RevenueCard from 'components/ui-component/cards/RevenueCard';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

const getDuration = (startedAt) => {
  const diff = dayjs().diff(dayjs.unix(startedAt), 'second');

  const hrs = Math.floor(diff / 3600)
    .toString()
    .padStart(2, '0');

  const mins = Math.floor((diff % 3600) / 60)
    .toString()
    .padStart(2, '0');

  const secs = (diff % 60).toString().padStart(2, '0');

  return `${hrs}:${mins}:${secs}`;
};

const getStartTime = (startedTime) => {
  return dayjs.unix(startedTime).format('hh:mm:ss A');
};

export default async function Dashboard() {
  let sessions = { count: 0, rooms: [] };
  let error = null;

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_FRONTEND_BASE_URL}/api/sessions`, {
      cache: 'no-store'
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
        <RevenueCard color="orange.dark" title="Running Sessions" iconPrimary={OndemandVideoOutlinedIcon} count={sessions?.count || 0} />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          {sessions?.rooms?.map((room) => {
            const agentName = JSON.parse(room.metadata)?.task?.name || 'Unknown Agent';

            return (
              <Grid item xs={12} md={4} lg={3} key={room?.sid}>
                <SessionCard
                  agentName={agentName}
                  roomName={room?.name}
                  avatar="avatar-2.png"
                  participant={room?.numParticipants}
                  startTime={getStartTime(room?.creationTime)}
                  sessionDuration={getDuration(room?.creationTime)}
                />
              </Grid>
            );
          })}
        </Grid>
      </Grid>
    </Grid>
  );
}
