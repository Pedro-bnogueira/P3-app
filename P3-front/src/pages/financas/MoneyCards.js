import InfoCard from "./InfoCard";
import PropTypes from 'prop-types';
import { Box, Container, Unstable_Grid2 as Grid } from '@mui/material';
import { formatFloatToMoney } from "../../utils/FormatFloatToMoney";

export default function MoneyCards (props) {
    const { saldo, receita, despesas, cartao } = props;

    return (
        <Box
            component="main"
            sx={{
                flexGrow: 1,
                py: 2
            }}
        >
            <Container maxWidth="xl">
                <Grid
                container
                spacing={3}
                >  
                    <Grid
                        xs={12}
                        sm={3}
                        lg={3}
                    >
                        <InfoCard
                            name="Saldo Atual"
                            value={formatFloatToMoney(saldo)}
                            color="#000000"
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        sm={3}
                        lg={3}
                    >
                        <InfoCard
                            name="Receita"
                            value={formatFloatToMoney(receita)}
                            color="#54be53"
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        sm={3}
                        lg={3}
                    >
                        <InfoCard
                            name="Despesas"
                            value={formatFloatToMoney(despesas)}
                            color="#ff0000"
                        />
                    </Grid>
                    <Grid
                        xs={12}
                        sm={3}
                        lg={3}
                    >
                        <InfoCard
                            name="Cartão de Crédito"
                            value={formatFloatToMoney(cartao)}
                            color="#000000"
                        />
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

MoneyCards.prototypes = {
    saldo: PropTypes.string.isRequired,
    receita: PropTypes.string.isRequired,
    despesas: PropTypes.string.isRequired,
    cartao: PropTypes.string.isRequired
  };