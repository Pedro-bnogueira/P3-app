import { useState, useEffect } from "react";
import MoneyCards from "./MoneyCards";
import AddValueInput from "./AddValueInput";
import AppHeader from "../../components/Header";
import AppMenu from '../../components/Menu';
import AppFooter from '../../components/Footer';
import AppSetting from '../../components/Settings';
import { Box, Container, Card, Unstable_Grid2 as Grid } from '@mui/material';
import Bar from "./charts/Bar";
import Pie from "./charts/Pie";
import { useAuthContext } from "../../hooks/useAuthContext";
import Spinner from "../../components/Spinner";
import { postAxios } from "../../hooks/useAxios";
import { formatMoneyToFloat } from "../../utils/formatMoneyToFloat";
import { nanoid } from 'nanoid';


function IndexFinancas () {

    const [value, setValue] = useState('');
    const [type, setType] = useState('');
    const [receita, setReceita] = useState(null);
    const [despesas, setDespesas] = useState(null);
    const [cartao, setCartao] = useState(null);
    const [saldo, setSaldo] = useState(null);
    const [annualBalance, setAnnualBalance] = useState(null);
    const [barValues, setBarValues] = useState([])
    const [pieValues, setPieValues] = useState(null)
    const { user, loading } = useAuthContext();
    const [authReady, setAuthReady] = useState(false);
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        setAuthReady(!loading);
    }, [loading]);

    useEffect(() => {
        if(authReady){
            async function getFinancas() {
                const email = user;
                await postAxios('http://localhost:5000/api/get-financas', {email}, null, {withCredentials: true})
                .then((resp) => {
                    console.log(resp)
                    if(resp.data.status === 200) {
                        setReceita(resp.data.receita)
                        setDespesas(resp.data.despesas)
                        setCartao(resp.data.cartao)

                        // define os valores do grafico de pizza
                        // segue a ordem receita - despesas - cartao
                        setPieValues([resp.data.receita, resp.data.despesas, resp.data.cartao])
                        
                        const contaSaldo = resp.data.receita - (resp.data.despesas + resp.data.cartao)
                        setSaldo(contaSaldo)
                    }
                    else if(resp.data.status === 401){
                        alert(resp.data.error)
                        window.location.href('http://localhost:3000/login')
                    }
                })
                .catch((error) => {
                    window.location.href = "http://localhost:3000/bad/request";
                    console.error('Erro na solicitação', error);
                })
            }

            async function getAnnualBalance() {
                const email = user;
                await postAxios('http://localhost:5000/api/get-annual-balance', {email}, null, {withCredentials: true})
                .then((resp) => {
                    console.log(resp)
                    if(resp.data.status === 200) {
                        setAnnualBalance(resp.data.saldoPorMes);

                        const saldos = Object.values(resp.data.saldoPorMes);

                        setBarValues(saldos);
                    }
                    else if(resp.data.status === 401){
                        alert(resp.data.error)
                        window.location.href('http://localhost:3000/login')
                    }
                })
                .catch((error) => {
                    window.location.href = "http://localhost:3000/bad/request";
                    console.error('Erro na solicitação', error);
                })
            }

            getFinancas();
            getAnnualBalance();
        }
        
    },[authReady])

    if (!authReady) {
        // Mostra um spinner ou uma mensagem de carregamento enquanto o contexto está carregando.
        return <Spinner />;
    }

    if (!user) {
        // Se o usuário ainda não estiver autenticado, redirecione para a página de login.
        window.location.href = "http://localhost:3000/login";   
        return null; // Evita que o restante do componente seja renderizado.
    }

    const handleValueChange = (newValue) => {
        setValue(newValue);
    };

    function handleType(e){
        setType(e.target.value);
    }

    const handleSubmit = () => {
        if (isProcessing) return; // Impede cliques adicionais enquanto já está em andamento
        
        setIsProcessing(true);

        const dataAtual = new Date();
        const ano = dataAtual.getFullYear();
        const mes = dataAtual.getMonth() + 1; // +1 porque os meses em JavaScript começam do zero (janeiro é 0)
        const dia = dataAtual.getDate();
        
        const idtransacao = nanoid();
        const email = user;
        const tipo = type;
        const valor = formatMoneyToFloat(value);
        const data = `${ano}-${mes < 10 ? '0' + mes : mes}-${dia < 10 ? '0' + dia : dia}`;

        postAxios('http://localhost:5000/api/create-transaction', { idtransacao, email, tipo, valor, data}, null, {withCredentials: true})
        .then((resp) => {
            if(resp.data.status === 200){
                window.location.reload();
            }
        })
        .catch((error) => {
            window.location.href = "http://localhost:3000/bad/request";
            console.error('Erro na solicitação', error);
        })
        .finally(() => {
            setIsProcessing(false); // Habilita o botão novamente após a conclusão ou erro
        })

        setValue('');
    };

    return(
        <>
            <AppHeader/>
            <AppMenu/>
            <div className="content-wrapper" style={{minHeight: 675}}>
                <div className="content">
                    <div className="container-fluid">
                        <div className="row mb-2 center-element">
                            <div className="col-12 dashboard" style={{marginTop: "15px"}}>
                                <h3 className="title">
                                    Dashboard
                                </h3>
                                <MoneyCards saldo={saldo} receita={receita} despesas={despesas} cartao={cartao}/>
                                <h5 className="subtitle" style={{marginLeft: '30px'}}>
                                    Adicionar
                                </h5>
                                <div className="left-element" style={{marginLeft: '25px'}}>
                                    <AddValueInput onChange={handleValueChange} value={value} setValue={setValue}/>
                                    <form className="bullet-form">
                                        <label>
                                            <input type="radio" name="option" value="receita" className="input-bullet" onChange={handleType}/>
                                            Receita
                                        </label>
                                        <label>
                                            <input type="radio" name="option" value="despesa" className="input-bullet" onChange={handleType}/>
                                            Gasto
                                        </label>
                                        <label >
                                            <input type="radio" name="option" value="cartao" className="input-bullet" onChange={handleType}/>
                                            Crédito
                                        </label>
                                    </form>
                                    <button onClick={handleSubmit} className="btn btn-submit" style={{marginLeft: 30}}>Confirmar</button>
                                </div>
                               <div className="chart-container">

                                        <Grid
                                        container
                                        spacing={3}
                                        >  
                                            <Grid
                                                xs={12}
                                                sm={6}
                                                lg={6}
                                                >
                                                <Card 
                                                    sx={{
                                                        marginLeft:'25px',
                                                        marginTop: '1vh',
                                                        width: '560px', 
                                                        height: '550px',
                                                        borderRadius: 5
                                                    }}
                                                    
                                                    >
                                                    <div style={{marginTop: '15vh'}}>
                                                        <Bar values={barValues}/> 
                                                    </div>
                                                </Card>
                                            </Grid>
                                            <Grid
                                                xs={12}
                                                sm={6}
                                                lg={6}
                                                >
                                                <Card 
                                                    sx={{ 
                                                        flexGrow: 1,
                                                        marginLeft:'25px',
                                                        marginTop: '1vh',
                                                        width: '540px', 
                                                        height: '550px',
                                                        borderRadius: 5
                                                    }}
                                                    >
                                                    {pieValues && <Pie values={pieValues}/>}
                                                </Card>
                                            </Grid>
                                        </Grid>
                                               
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AppFooter/>
            <AppSetting/>
        </>
    );
}

export default IndexFinancas;
