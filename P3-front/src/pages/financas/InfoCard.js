import PropTypes from 'prop-types';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';

export const InfoCard = (props) => {
  const { name, value, color } = props;

  return (
    <Card 
      sx={{ 
        height: '100%',
        borderRadius: 5
      }}
      >
      <CardContent>
        <Stack
          alignItems="flex-start"
          direction="row"
          justifyContent="space-between"
          spacing={4}
        >
          <Stack spacing={3}>
            <Typography
              color="#000"
              variant={'h6'}
              fontWeight={'bold'}
            >
              {name}
            </Typography>
            <Typography 
              variant={'h5'}
              color={color}
            >
              {value}
            </Typography>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

InfoCard.prototypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired
};

export default InfoCard;
