import React, { useState } from 'react';

const PersonPaymentCard = ({ person }) => {
    const [showModal, setShowModal] = useState(false);

    const copyPix = (key) => {
        navigator.clipboard.writeText(key);
        alert("Chave Pix copiada!");
    };

    return (
        <div className="card-person" onClick={() => setShowModal(true)}>
            <h3>{person.name}</h3>
            <p>Total Devido: <span className="highlight">R$ {person.totalDebt.toFixed(2)}</span></p>
            
            {showModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <h2>Detalhes de {person.name}</h2>
                        <div className="debt-split">
                            <div className="bank-card nubank">
                                <h4>Nubank</h4>
                                <p>R$ {person.nubankTotal}</p>
                                <button onClick={() => copyPix(person.pixNubank)}>Copiar Pix Nubank</button>
                            </div>
                            <div className="bank-card mercadopago">
                                <h4>Mercado Pago</h4>
                                <p>R$ {person.mpTotal}</p>
                                <button onClick={() => copyPix(person.pixMercado)}>Copiar Pix MP</button>
                            </div>
                        </div>
                        <button onClick={() => setShowModal(false)}>Fechar</button>
                    </div>
                </div>
            )}
        </div>
    );
};
