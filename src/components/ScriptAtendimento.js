const ScriptAtendimento = ({ nomeTitular, nomeAgr, tipoCertificado, telefone, email }) => {
    return (
      <div className="space-y-4">
        <p>1. Bom dia/boa tarde, <strong>{nomeTitular}</strong>, eu sou o(a) <strong>{nomeAgr}</strong>, agente de Registro da AR NOME DA AR vinculada à AC SAFEWEB...</p>
        <p>2. <strong>{nomeTitular}</strong>, à partir desse momento, a videoconferência passará a ser gravada...</p>
        <p>3. A validação corresponde a um Certificado Digital <strong>{tipoCertificado}</strong>...</p>
        <p>4. O seu telefone de contato é <strong>{telefone}</strong> e o seu e-mail é <strong>{email}</strong>, correto?</p>
        {/* Continue com os outros passos */}
      </div>
    )
}
  
export default ScriptAtendimento
  