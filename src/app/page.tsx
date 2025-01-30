"use client"

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from './../components/ui/input'
import { Select } from './../components/ui/select'

export default function Home() {
  const [nomeTitular, setNomeTitular] = useState('')
  const [nomeAgr, setNomeAgr] = useState('')
  const [tipoCertificado, setTipoCertificado] = useState('')
  const [telefone, setTelefone] = useState('')
  const [email, setEmail] = useState('')
  const router = useRouter()

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const query = new URLSearchParams({
      nomeTitular,
      nomeAgr,
      tipoCertificado,
      telefone,
      email
    }).toString()
    router.push(`/script?${query}`)
  }

  const formatarTelefone = (value: string) => {
    // Remove tudo que não seja número
    let telefoneFormatado = value.replace(/\D/g, '');
  
    // Se estiver vazio, retorna uma string vazia
    if (!telefoneFormatado) return '';
  
    // Se o número tiver 10 ou 11 caracteres (com ou sem o nono dígito)
    if (telefoneFormatado.length <= 2) {
      telefoneFormatado = `(${telefoneFormatado}`; // Exibe apenas o DDD
    } else if (telefoneFormatado.length <= 6) {
      telefoneFormatado = `(${telefoneFormatado.slice(0, 2)}) ${telefoneFormatado.slice(2)}`; // Formata o DDD
    } else if (telefoneFormatado.length <= 10) {
      // Número com 10 caracteres (sem o nono dígito)
      telefoneFormatado = `(${telefoneFormatado.slice(0, 2)}) ${telefoneFormatado.slice(2, 6)}-${telefoneFormatado.slice(6, 10)}`;
    } else if (telefoneFormatado.length <= 11) {
      // Número com 11 caracteres (com o nono dígito)
      telefoneFormatado = `(${telefoneFormatado.slice(0, 2)}) ${telefoneFormatado.slice(2, 7)}-${telefoneFormatado.slice(7, 11)}`;
    }
  
    return telefoneFormatado;
  };

  const handleTelefoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    // Chama a função de formatação a cada alteração
    setTelefone(formatarTelefone(value));
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-lg shadow-lg space-y-12 w-full max-w-lg">
        <h1 className="text-2xl font-bold bold text-center text-green-800 pb-4">Cadastro do Cliente</h1>

        <div className='mb-6'>
          <label htmlFor="nomeTitular" className="block text-sm font-semibold text-gray-700">Cliente</label>
          <Input
            type="text"
            id="nomeTitular"
            value={nomeTitular}
            onChange={(e) => setNomeTitular(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className='mb-6'>
          <label htmlFor="nomeAgr" className="block text-sm font-semibold text-gray-700">Nome do Agente de Registro</label>
          <Input
            type="text"
            id="nomeAgr"
            value={nomeAgr}
            onChange={(e) => setNomeAgr(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className='mb-6'>
          <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Email</label>
          <Input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className='mb-6'>
          <label htmlFor="telefone" className="block text-sm font-semibold text-gray-700">Telefone</label>
          <Input
            type="tel"
            id="telefone"
            value={telefone}
            onChange={handleTelefoneChange}
            className="mt-1 p-3 w-full border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        <div className='mb-6'>
          <label htmlFor="tipoCertificado" className="block text-sm font-semibold text-gray-700">Tipo de Certificado</label>
          <Select
            value={tipoCertificado}
            onChange={(e) => setTipoCertificado(e.target.value)}
            className="mt-1 p-3 w-full border border-green-300 rounded-md text-sm focus:ring-2 focus:ring-green-500"
            required
          >
            <option value="" disabled>Selecione um tipo de certificado</option>
            <option value="e-CPF Modelo [A1]">e-CPF Modelo [A1]</option>
            <option value="e-CNPJ Modelo [A1]">e-CNPJ Modelo [A1]</option>
            <option value="e-CPF Modelo [A3]">e-CPF Modelo [A3]</option>
            <option value="e-CNPJ Modelo [A3]">e-CNPJ Modelo [A3]</option>
            <option value="e-CPF Modelo [A3] em Nuvem">e-CPF Modelo [A3] em Nuvem</option>
            <option value="e-CNPJ Modelo [A3] em Nuvem">e-CNPJ Modelo [A3] em Nuvem</option>
          </Select>
        </div>

        <button type="submit" className="mt-4 w-full bg-green-500 text-white py-2 rounded-md text-sm hover:bg-green-600 focus:ring-2 focus:ring-green-500">
          Submeter
        </button>
      </form>
    </div>
  )
}
