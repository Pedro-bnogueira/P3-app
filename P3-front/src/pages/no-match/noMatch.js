function noMatch() {
    return(
        <div className="container-noMatch">
            <div className="row">
                <div className="col-md-12">
                    <div className="error-template center-element">
                        <h1>
                            OOPS!
                        </h1>
                        <h2 className="noMatch-404">
                            404, Nada foi encontrado
                        </h2>
                        <div className="error-actions center-element">
                            <a href="/" className="btn btn-lg btn-noMatch">
                                <span className="glyphicon glyphicon-home"/>
                                Me leve para o início
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default noMatch;