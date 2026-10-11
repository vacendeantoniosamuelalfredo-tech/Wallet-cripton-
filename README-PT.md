# CRITON WALLET — Frontend Professional

Frontend web responsivo, com painel Web3, saldo de apresentação de 10.000 USDT, ativos, mercado ilustrativo, atividade, cartão visual, P2P, rede BNB Smart Chain e modais de operações.

## Abrir
Abra `index.html` num navegador moderno. Não precisa de Node.js ou backend para ver a interface.

## Modelo de arquitetura
- `index.html`: interface e interação local.
- `src/services/criton-services.js`: fronteira de serviços/adaptador para substituir durante a integração.
- `docs/API-CONTRACT-PT.md`: contratos de API, estados de interface e critérios de integração.

## Estado real
O saldo, as cotações e os dados de atividade apresentados na interface não são uma leitura on-chain nem confirmação de fundos. O login desta versão é apenas local e não deve ser usado para proteger uma conta real. As operações sensíveis são bloqueadas na interface, mas a regra de produção tem de ser aplicada também no backend.

## Próxima integração
Substituir o adaptador de pré-visualização por implementações dos contratos documentados. O servidor deve ser a autoridade para autenticação, MFA, permissões e histórico off-chain; o provedor de carteira/RPC e a blockchain devem ser usados para endereço, saldo e transações on-chain. Consultar `docs/API-CONTRACT-PT.md`.


## Estado da versão
Esta é uma pré-visualização interativa. Os códigos de verificação são fixos apenas para testes locais; não existe envio de email nem autenticação de servidor. Saldos, histórico e variações do mercado são dados ilustrativos. O endereço configurado não comprova titularidade. Não usar para receber fundos reais antes da integração e auditoria.
