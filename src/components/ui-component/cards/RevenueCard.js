import PropTypes from 'prop-types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

const RevenueCard = ({ title, count, content, iconPrimary, color }) => {
  const IconPrimary = iconPrimary;
  const primaryIcon = iconPrimary ? <IconPrimary fontSize="large" /> : null;

  return (
    <Card sx={{ bgcolor: color, position: 'relative', color: 'background.default' }}>
      <CardContent>
        <Typography
          variant="body2"
          sx={{
            position: 'absolute',
            right: 13,
            top: { xs: 22, md: 14 },
            color: 'background.default',
            '&> svg': { width: { xs: 80, md: 100 }, height: { xs: 80, md: 100 }, opacity: '0.5', pb: 2 }
          }}
        >
          {primaryIcon}
        </Typography>

        <Grid container spacing={1}>
          <Grid item xs={12}>
            <Typography variant="h5" color="inherit">
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="h3" color="inherit">
              {count}
            </Typography>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="subtitle2" color="inherit">
              {content}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

RevenueCard.propTypes = {
  title: PropTypes.string,
  count: PropTypes.number,
  color: PropTypes.string,
  content: PropTypes.string
};

export default RevenueCard;
