'use client';

import Grid from '@mui/material/Grid';
import { gridSpacing } from 'store/constant';
import SessionCard from 'components/dashboard/SessionCard';
import RevenueCard from 'components/ui-component/cards/RevenueCard';
import OndemandVideoOutlinedIcon from '@mui/icons-material/OndemandVideoOutlined';

const userDetails = {
  name: 'Gaetano',
  id: '#1Card_Phoebe',
  avatar: 'avatar-2.png',
  contact: '253-418-5940',
  location: 'Herminahaven',
  email: 'alia_shields25@yahoo.com',
  role: 'Investor Division Strategist',
  about: 'Try to connect the SAS transmitter, maybe it will index the optical hard drive!'
};

const Dashboard = () => {
  return (
    <Grid container spacing={gridSpacing}>
      <Grid item xs={12} md={4} lg={3}>
        <RevenueCard
          secondary="10"
          color="orange.dark"
          content="52 Last Month"
          primary="Running Sessions"
          iconPrimary={OndemandVideoOutlinedIcon}
        />
      </Grid>

      <Grid item xs={12}>
        <Grid container spacing={gridSpacing}>
          <Grid item xs={12} md={4} lg={3}>
            <SessionCard {...userDetails} />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default Dashboard;
