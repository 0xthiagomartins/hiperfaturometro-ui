'use client';

import { useState } from 'react';
import { usePNCPLicitacoes } from '../hooks/useApi';

export default function PNCPLicitacoes() {
    const [dias, setDias] = useState(90);
    const [visibleCards, setVisibleCards] = useState(6);
    const { licitacoes, total, loading, error, fetchLicitacoes } = usePNCPLicitacoes();

    // Função para formatar valores monetários
    const formatCurrency = (value) => {
        if (!value || isNaN(value) || value === 0) {
            return 'R$ 0,00';
        }
        return new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL'
        }).format(value);
    };

    // Função para calcular a economia (diferença entre estimado e homologado)
    const calcularEconomia = (estimado, homologado) => {
        if (!homologado || homologado === 0) return null;
        const economia = estimado - homologado;
        const percentual = ((economia / estimado) * 100).toFixed(1);
        return { valor: economia, percentual };
    };

    // Função para buscar licitações
    const handleBuscar = () => {
        fetchLicitacoes(dias);
        setVisibleCards(6); // Reset da visualização
    };

    // Função para carregar mais cards
    const handleLoadMore = () => {
        setVisibleCards(prev => prev + 6);
    };

    return (
        <section className="py-16 px-6 bg-white">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center mb-12">
                    <h3 className="text-4xl font-black mb-4 text-gray-900">
                        📋 LICITAÇÕES TECNOLÓGICAS - PNCP
                    </h3>
                    <p className="text-lg text-gray-600 mb-8 max-w-3xl mx-auto">
                        Dados extraídos diretamente do Portal Nacional de Contratações Públicas (PNCP).
                        Nossa IA analisa licitações de tecnologia em todo o Brasil.
                    </p>

                    {/* Controles de Busca */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-6">
                        <div className="flex items-center gap-3">
                            <label className="text-gray-700 font-semibold">
                                Período:
                            </label>
                            <select
                                value={dias}
                                onChange={(e) => setDias(Number(e.target.value))}
                                disabled={loading}
                                className="px-4 py-2 border-2 border-gray-300 rounded-lg font-semibold text-gray-700 bg-white hover:border-blue-500 focus:border-blue-500 focus:outline-none transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <option value="7">Últimos 7 dias</option>
                                <option value="30">Últimos 30 dias</option>
                                <option value="90">Últimos 90 dias</option>
                                <option value="180">Últimos 6 meses</option>
                                <option value="365">Último ano</option>
                            </select>
                        </div>

                        <button
                            onClick={handleBuscar}
                            disabled={loading}
                            className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-2 rounded-lg font-bold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-lg flex items-center gap-2"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    <span>Buscando...</span>
                                </>
                            ) : (
                                <>
                                    <span>🔍</span>
                                    <span>Buscar Licitações</span>
                                </>
                            )}
                        </button>
                    </div>

                    {/* Aviso de tempo */}
                    {loading && (
                        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg max-w-2xl mx-auto">
                            <div className="flex items-center">
                                <div className="flex-shrink-0">
                                    <svg className="h-5 w-5 text-yellow-400 animate-pulse" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                    </svg>
                                </div>
                                <div className="ml-3">
                                    <p className="text-sm text-yellow-700 font-medium">
                                        ⏱️ Aguarde... Este processo pode levar de 30 segundos a 5 minutos dependendo do volume de dados.
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Erro */}
                {error && (
                    <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-8 max-w-2xl mx-auto">
                        <div className="flex">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm text-red-700 font-medium">
                                    ⚠️ {error}
                                </p>
                                <p className="text-xs text-red-600 mt-1">
                                    Verifique se o backend está rodando em http://localhost:8000
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Estatísticas */}
                {!loading && total > 0 && (
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl p-6 mb-8 border border-blue-200">
                        <div className="text-center">
                            <p className="text-3xl font-black text-blue-700 mb-2">
                                {total}
                            </p>
                            <p className="text-gray-700 font-semibold">
                                Licitações de Tecnologia Encontradas
                            </p>
                            <p className="text-sm text-gray-600 mt-2">
                                Exibindo {Math.min(visibleCards, licitacoes.length)} de {licitacoes.length} licitações
                            </p>
                        </div>
                    </div>
                )}

                {/* Grid de Licitações */}
                {!loading && licitacoes.length > 0 && (
                    <>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {licitacoes.slice(0, visibleCards).map((lic, index) => {
                                const economia = calcularEconomia(lic.valorTotalEstimado, lic.valorTotalHomologado);

                                return (
                                    <div
                                        key={index}
                                        className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border-l-4 border-blue-500 flex flex-col"
                                        style={{ animationDelay: `${index * 0.05}s` }}
                                    >
                                        {/* Cabeçalho */}
                                        <div className="mb-4">
                                            <div className="flex items-start justify-between mb-2">
                                                <span className="bg-blue-100 text-blue-800 text-xs font-bold px-3 py-1 rounded-full">
                                                    {lic.modalidadeNome}
                                                </span>
                                                <span className="bg-gray-100 text-gray-700 text-xs font-bold px-2 py-1 rounded">
                                                    {lic.orgaoEntidade.uf}
                                                </span>
                                            </div>

                                            <h4 className="text-sm font-bold text-gray-900 leading-tight mt-3 line-clamp-3">
                                                {lic.objetoCompra}
                                            </h4>
                                        </div>

                                        {/* Informações */}
                                        <div className="space-y-2 mb-4 flex-grow">
                                            <div className="flex justify-between items-start">
                                                <span className="text-gray-600 text-xs font-medium">Órgão:</span>
                                                <span className="text-gray-900 text-xs font-semibold text-right max-w-[65%] leading-tight">
                                                    {lic.orgaoEntidade.razaoSocial}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-xs font-medium">CNPJ:</span>
                                                <span className="text-gray-700 text-xs font-mono">
                                                    {lic.orgaoEntidade.cnpj}
                                                </span>
                                            </div>

                                            <div className="flex justify-between items-center">
                                                <span className="text-gray-600 text-xs font-medium">Controle PNCP:</span>
                                                <span className="text-gray-700 text-xs font-mono">
                                                    {lic.numeroControlePNCP}
                                                </span>
                                            </div>

                                            <div className="border-t pt-2 mt-2">
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-gray-600 text-xs font-medium">Valor Estimado:</span>
                                                    <span className="text-blue-700 text-sm font-bold">
                                                        {formatCurrency(lic.valorTotalEstimado)}
                                                    </span>
                                                </div>

                                                {lic.valorTotalHomologado && (
                                                    <>
                                                        <div className="flex justify-between items-center mb-1">
                                                            <span className="text-gray-600 text-xs font-medium">Valor Homologado:</span>
                                                            <span className="text-green-700 text-sm font-bold">
                                                                {formatCurrency(lic.valorTotalHomologado)}
                                                            </span>
                                                        </div>

                                                        {economia && economia.valor > 0 && (
                                                            <div className="bg-green-50 rounded-lg p-2 mt-2">
                                                                <div className="flex justify-between items-center">
                                                                    <span className="text-green-700 text-xs font-bold">💰 Economia:</span>
                                                                    <div className="text-right">
                                                                        <div className="text-green-700 text-sm font-bold">
                                                                            {formatCurrency(economia.valor)}
                                                                        </div>
                                                                        <div className="text-green-600 text-xs">
                                                                            ({economia.percentual}% menor)
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        )}
                                                    </>
                                                )}
                                            </div>
                                        </div>

                                        {/* Footer */}
                                        <div className="text-xs text-gray-500 pt-3 border-t">
                                            Ano: {lic.anoCompra} • Nº {lic.numeroCompra}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>

                        {/* Botão Ver Mais */}
                        {visibleCards < licitacoes.length && (
                            <div className="text-center mt-8">
                                <button
                                    onClick={handleLoadMore}
                                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-3 rounded-lg font-semibold text-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                                >
                                    📊 Ver Mais ({licitacoes.length - visibleCards} restantes)
                                </button>
                            </div>
                        )}
                    </>
                )}

                {/* Estado vazio */}
                {!loading && !error && licitacoes.length === 0 && total === 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">📋</div>
                        <p className="text-gray-600 text-lg font-medium">
                            Clique em "Buscar Licitações" para ver os dados do PNCP
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            Selecione o período desejado e inicie a busca
                        </p>
                    </div>
                )}

                {/* Nenhum resultado encontrado */}
                {!loading && !error && licitacoes.length === 0 && total !== null && total !== 0 && (
                    <div className="text-center py-12">
                        <div className="text-6xl mb-4">🔍</div>
                        <p className="text-gray-600 text-lg font-medium">
                            Nenhuma licitação de tecnologia encontrada
                        </p>
                        <p className="text-gray-500 text-sm mt-2">
                            Tente aumentar o período de busca
                        </p>
                    </div>
                )}
            </div>
        </section>
    );
}
