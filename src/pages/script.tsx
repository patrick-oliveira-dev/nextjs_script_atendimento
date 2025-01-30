import { useRouter } from 'next/router';
import { useState } from 'react';
import '../styles/globals.css';


export default function Script() {
    const router = useRouter();
    const { nomeTitular, nomeAgr, tipoCertificado, telefone, email } = router.query;
    const [step, setStep] = useState(1);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalContent, setModalContent] = useState('');

    const handleNext = () => {
        setStep((prevStep) => {
            const nextStep = prevStep + 1;
            console.log(nextStep); // Agora deve logar o próximo número de etapa
            return nextStep;
        });
    };
    
    const handlePrevious = () => setStep(step - 1);
    const openModal = (content: string) => {
        setModalContent(content);
        setIsModalOpen(true);
    };

    // Função para obter a saudação dinâmica
    const getSaudacao = () => {
        const hour = new Date().getHours();
        if (hour < 12) {
            return 'Bom dia';
        }
        return 'Boa tarde';
    };

    // Ajuste para separar a fala do atendente e as informações
    const steps = [
        {
            atendente: `${getSaudacao()}, ${nomeTitular}, eu sou o(a) ${nomeAgr}, agente de Registro da AR REPORT vinculada à AC SAFEWEB. Seja bem-vindo(a) à validação por videoconferência.`,
            info: `Peço por favor, que você se posicione em um local isolado, com boa internet, bem iluminado, preferencialmente com fundo neutro. Peço também que retire seus óculos/boné/toca/chapéu.`,
            title: 'Início da videoconferência'
        },
        {
            atendente: `${nomeTitular}, à partir desse momento, a videoconferência passará a ser gravada e ficará arquivada no dossiê dessa emissão, conforme o senhor(a) autorizou na tela anterior.`,
            info: `Caso o cliente diga que não concorda mesmo depois de ter clicado no aceite da tela inicial, a videoconferência deve ser encerrada e agendada a validação de forma presencial. Caso o cliente questione o motivo da gravação, informe que ela é exigida, conforme a Instrução Normativa No 02, de 20 de março de 2020, publicada pelo Instituto Nacional de Tecnologia da Informação do Brasil.`,
            title: 'Iniciar Gravação da videoconferência'
        },
        {
            atendente: `A validação corresponde a um Certificado Digital ${tipoCertificado}.`,
            info: `Neste momento você deverá certificar-se do modelo e tipo de certificado que o titular adquiriu.`,
            title: 'Tipo de Certificado'
        },
        {
            atendente: `O seu telefone de contato é ${telefone} e o seu e-mail é ${email}, correto?`,
            info: `Pergunte ao titular o número do seu telefone e e-mail e verifique se são os mesmos que estão cadastrados no sistema. Caso não sejam, atualize-os.`,
            title: 'Confirmação de dados'
        },
        {
            atendente: `Agora, faremos um procedimento de segurança para garantir a validade do processo. Peço que posicione uma das mãos na frente do rosto, de forma que a palma da mão fique próxima ao nariz durante 3 segundos.`,
            info: `Neste momento fique atento se não houver alguma alteração na imagem.`,
            title: 'Procedimento de segurança'
        },
        {
            atendente: `Vamos realizar a captura de uma foto biométrica. Por favor, olhe para o centro da câmera e aguarde a captura automática.`,
            info: `Clique em “Iniciar Captura da foto” e após o cliente se posicionar, aguarde o sistema processar, e em seguida verifique se a foto ficou de acordo com a normativa ITI N° 24. O sistema vai realizar o match com o PSBio e aparecerá a imagem se o titular tiver a biometria cadastrada. Caso não aconteça o match biométrico, oriente o titular para a realização da validação presencial.`,
            title: 'Foto biométrica'
        },
        {
            atendente: `Vou realizar a confirmação de alguns dados, por favor, aguarde um momento.`,
            info: `Realize a consulta SAF e verifique se o titular é a mesma pessoa da videoconferência. Caso a foto não seja a mesma que a do titular ou você suspeite de tentativa de fraude, informe ao cliente que houve um problema na videoconferência e que irá entrar em contato em um outro momento para reagendar.`,
            title: 'Consulta SAF'
        },
        {
            atendente: `Agora vou aplicar um questionário com algumas perguntas simples.`,
            info: `Esse questionário é aplicado em todas as videoconferências para fins de segurança. Faça as perguntas que estão sendo exibidas na tela para o cliente responder. Caso você suspeite de tentativa de fraude, informe ao cliente que houve um problema na videoconferência e que irá entrar em contato em outro momento para reagendar.`,
            title: 'Questionário de segurança'
        },
        {
            atendente: `Nesse momento vamos encerrar a gravação. Por favor, permaneça na sala virtual para darmos andamento ao processo.`,
            info: 'Clicar em “Concluir gravação” para que seja interrompida',
            title: 'Encerramento da gravação'
        },
        {
            atendente: `${nomeTitular}, nesse momento será exibida uma tela para você cadastrar a senha de instalação/revogação do seu certificado, que vai ser utilizada na instalação e caso seja necessário revogá-lo. Por favor, cadastre uma senha, de 8 a 15 caracteres, podendo ser letras de A a Z ou números de 0 a 9. Lembramos que caracteres especiais não são aceitos e que sua senha é de uso pessoal e intransferível.`,
            info: 'Clique no botão “Solicitar senha de revogação/instalação”. Quando o cliente preencher e confirmar a senha na tela dele, você receberá uma mensagem de sucesso.',
            title: 'Cadastro de senha de instalação/revogação'
        },
        {
            atendente: `Seu certificado ficará disponível em breve. Você pode fazer o download através do link que será enviado para o seu e-mail. Recomendamos fazer uma Cópia de Segurança (backup) em local externo ao computador, principalmente para os casos de formatação do equipamento, pois caso ocorra a perda do arquivo será necessário realizar uma nova emissão. Em caso de dificuldade ou se precisar de auxílio, você pode ligar para o nosso Suporte Técnico: 0800-728-5900.`,
            info: '',
            title: 'Finalização'
        },
        {
            atendente: `${nomeTitular}, o processo de validação por videoconferência foi concluído com sucesso. Agradecemos a preferência e por escolher a AR REPORT, tenha um ótimo dia!`,
            info: '',
            title: 'Encerramento'
        }
    ];

    console.log(steps.length);

    // Título dinâmico baseado na etapa atual
    const getTitulo = () => {
        const etapa = steps[step - 1];
        return `${etapa.title}`; // Exibe a primeira parte da saudação do atendente
    };

    const handleRedirect = () => {
        console.log('Redirecionando para o formulário inicial');
        router.push('/'); // Ajuste o caminho conforme necessário
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-6">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-2xl">
                <h1 className="text-2xl font-semibold text-center mb-6 text-green-500">{getTitulo()}</h1>
                <p className="text-gray-700 mb-6 items-center justify-center text-center" dangerouslySetInnerHTML={{ __html: steps[step - 1].atendente }}></p>
                {steps[step - 1].info && (
                    <div className="text-xs text-center text-red-600 mt-4">
                        {steps[step - 1].info}
                    </div>
                )}
                <div className="flex justify-between gap-4 mt-6">
                    <button
                        onClick={handlePrevious}
                        disabled={step === 1}
                        className="bg-gray-300 text-gray-700 py-2 px-6 rounded-md disabled:opacity-50 hover:bg-gray-400 transition"
                    >
                        Anterior
                    </button>
                    <button
                        onClick={step === steps.length ? handleRedirect : handleNext} // Verifica se é a última etapa
                        //disabled={step === steps.length}
                        className="bg-green-500 text-white py-2 px-6 rounded-md hover:bg-green-600 transition"
                    >
                        {step === steps.length ? 'Finalizar' : 'Próximo'} {/* Altera o texto do botão */}
                    </button>
                </div>
            </div>
        </div>
    );
}
