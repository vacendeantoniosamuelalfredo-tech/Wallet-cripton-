# CRITON WALLET — contratos para integração

Este documento define a fronteira entre a interface e os serviços futuros. Não significa que os serviços estejam ligados.

## Princípios
- A interface apresenta estados; o servidor é a autoridade para autenticação, permissões e regras de negócio.
- A carteira/provedor e a blockchain são a fonte de verdade para endereço, saldos on-chain e transações confirmadas.
- Nunca guardar segredos, palavras-semente, chaves privadas, códigos MFA ou tokens de sessão permanentes no frontend.
- Os adaptadores devem devolver erros normalizados e estados de carregamento previsíveis.

## Operações previstas

| Método de serviço | Endpoint sugerido | Resultado esperado |
|---|---|---|
| `login(credentials)` | `POST /api/v1/auth/login` | Desafio de autenticação; não iniciar sessão antes da validação |
| `verifySecondFactor(challenge, code)` | `POST /api/v1/auth/mfa/verify` | Sessão válida e expiração |
| `getPortfolio()` | `GET /api/v1/wallet/portfolio` | Ativos, quantidades, valores, origem e timestamp |
| `getActivity(cursor)` | `GET /api/v1/wallet/activity` | Movimentos paginados e respetivo estado |
| `getMarketQuotes(symbols)` | `GET /api/v1/market/quotes` | Preço, moeda, fonte e timestamp |
| `getWalletAddress()` | Provedor de carteira / `GET /api/v1/wallet/address` | Endereço verificado e `chainId` |
| `requestOperation(payload)` | `POST /api/v1/operations` | Decisão de autorização e, se permitida, fluxo de confirmação |
| `getPreferences()` | `GET /api/v1/profile/preferences` | Idioma, moeda e preferências |
| `savePreferences(prefs)` | `PUT /api/v1/profile/preferences` | Preferências guardadas |

## Formato de erro recomendado

```json
{
  "error": {
    "code": "OPERATION_NOT_AUTHORIZED",
    "message": "Esta operação não está autorizada.",
    "requestId": "identificador-de-suporte"
  }
}
```

Não confiar em bloqueios implementados apenas no navegador. A API tem de aplicar a autorização no servidor. Para ativos não-custodiais, um bloqueio da aplicação só controla operações iniciadas através da própria aplicação; não impede o titular de usar outra carteira.

## Estados que cada ecrã deve suportar
- `loading`: pedido em curso;
- `ready`: resposta validada;
- `empty`: sem registos;
- `error`: falha recuperável com ação clara;
- `unauthorized`: acesso ou operação recusada;
- `stale`: dados antigos, com hora da última atualização.

## Critérios antes de produção
1. Autenticação e MFA validados no servidor; limitar tentativas e aplicar expiração.
2. Autorização server-side e testes para cada operação sensível.
3. Consultar rede, endereço, contratos de token e saldos reais; não inferir a partir do texto do frontend.
4. Mostrar preço com fonte e hora; não apresentar cotações de exemplo como atuais.
5. Testes unitários, de contrato e end-to-end, revisão de segurança e monitorização.
