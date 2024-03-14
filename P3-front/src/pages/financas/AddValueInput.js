import PropTypes from 'prop-types';
import { useState } from 'react';
import { Card, CardContent, TextField } from '@mui/material';
import { formatMoney } from '../../utils/FormatMoneyInput';

export const AddValueInput = (props) => {
    const { onChange, value, setValue } = props;
    // const [value, setValue] = useState('');

    const handleChange = (event) => {
        formatMoney(event); 
        setValue(event.target.value);
        onChange(event.target.value); // Chama a função de retorno de chamada com o novo valor
    };

    return (
        <Card 
            sx={{ 
                height: '100%',
                borderRadius: 5
            }}
        >
            <CardContent>
                <TextField
                    variant="standard"
                    value={value}
                    onChange={handleChange}
                    fullWidth
                    InputProps={{
                        style: {
                            textAlign: 'center', // Centraliza o texto
                            display: 'block', // Força o elemento a ser um bloco
                            color: "#808080"
                        }
                    }}
                />
            </CardContent>
        </Card>
    );
};

AddValueInput.propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
    setValue: PropTypes.func.isRequired
};

export default AddValueInput;
