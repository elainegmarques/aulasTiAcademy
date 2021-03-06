  
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import { api } from "../../../config";

export const Cliente = (props) => {
    console.log(props.match.params.id);

    const [data, setData] = useState([]);
    const [id, setID] = useState(props.match.params.id);

    useEffect(() => {
        const getCliente = async () => {
            await axios.get(api + "/cliente/" + id)
                .then((response) => {
                    console.log(response.data.cliente);
                    setData(response.data.cliente);
                })
                .catch(() => {
                    console.log("Erro: Não foi possível conectar a API.")
                })
        }
        getCliente();
    }, [id]);

    return (
        <div>
            <Container>
                <div className="d-flex">
                    <div className="mr-auto p-2">
                        <h3>Informações do Cliente</h3>
                    </div>
                    <div className="p-2">
                        <Link to="/visualizarcliente"
                            className="btn btn-outline-primary btn-sm">Listar</Link>
                        <Link to={"/editarcliente/" + data.id}
                            className="btn btn-outline-secondary btn-sm m-1">Editar</Link>
                    </div>
                </div>
                <dl className="row">
                    <dt className="col-sm-3">Nome</dt>
                    <dd className="col-sm-9">{data.nome}</dd>
                </dl>
                <dl className="row">
                    <dt className="col-sm-3">Endereço</dt>
                    <dd className="col-sm-9">{data.endereco}</dd>
                </dl>
                <dl className="row">
                    <dt className="col-sm-3">Cidade</dt>
                    <dd className="col-sm-9">{data.cidade}</dd>
                </dl>
                <dl className="row">
                    <dt className="col-sm-3">UF</dt>
                    <dd className="col-sm-9">{data.uf}</dd>
                </dl>
                <dl className="row">
                    <dt className="col-sm-3">Nascimento</dt>
                    <dd className="col-sm-9">{data.nascimento}</dd>
                </dl>
            </Container>
        </div>
    )
}