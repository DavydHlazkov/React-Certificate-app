import React from "react";
import  "./certificateInfo.css"

function CertificateInfo ({cerInfo}){
 
    const validFrom = cerInfo.validFrom.split(' ')[0]
    const validTill = cerInfo.validTill.split(' ')[0]
    
    return (
        <div className="info">
            <p>Common Name: {cerInfo.commonName}</p>
            <p>Issuer CN: {cerInfo.issuerCN}</p>
            <p>Valid From: {validFrom}</p>
            <p>Valid Till: {validTill}</p>
        </div>
    )
}

export default CertificateInfo