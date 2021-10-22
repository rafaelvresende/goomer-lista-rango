# GOOMER LISTA RANGO

Aplicação para cadastro de restaurantes e seus produtos.

# Requisitos

- node.js
- Typescript
- SGBD com MySQL
- yarn

# Procedimento para execução

- Configure suas variáveis de acesso ao banco de dados no arquivo *.env* na raiz do projeto
- Execute o comando *yarn* para instalação das dependências
- Execute o comando *yarn setup* para criação do database
- Execute o comando *yarn test* para verificação dos testes unitários
- Execute o comando *yarn start* para inicializar a aplicação
- Importe o arquivo *docs/requestsForInsomnia.json* no Insomnia para realização das requisições

# Estrutura do projeto

O projeto foi desenvolvido baseando-se em uma estrutura de módulos. Cada módulo agrupa o desenvolvimento de um assunto específico e possui uma estrutura própria organizada da seguinte forma:
- *entities*: contém as classes que representam as entidades do banco no sistema
- *repositories*: fazem o acesso ao banco de dados
- *views*: fazem a formatação dos dados recebidos do banco para as entidades
- *services*: concentram as regras de negócio, fazem o processamento dos dados obtidos dos repositórios e devolvem a informação formatada e tratada
- *controllers*: administram a execução dos serviços adequados para as rotas externalizadas
- *routes*: contém os endpoints da aplicação  
O projeto foi assim dividido em dois módulos, um para desenvolvimento das entidades referentes ao cadastro dos restaurantes e de seus horários de funcionamento, e outro para desenvolvimento das entidades referentes ao cadastro de produtos e de seus horários promocionais.
O banco de dados foi estruturado com quatro tabelas:
- uma para os dados dos restaurantes
- uma para os horários de funcionamento de cada restaurante, com chave estrangeira para a tabela de restaurantes
- uma para os dados dos produtos, com chave estrangeira para a tabela de restaurantes
- uma para os horários promocionais dos produtos, com chave estrangeira para a tabela de produtos

# Funcionalidades

- **Listagem dos restaurantes**  
Endpoint: (GET)"/restaurants"  
Resposta: lista com os dados de todos os restaurantes.  

- **Listagem de dias da semana**  
Endpoint: (GET)"/restaurants/daysOfTheWeek"  
Resposta: lista com os valores formatados dos dias da semana, para preenchimento dos horários de funcionamento dos restaurantes e de promoção dos produtos.  

- **Cadastro de um novo restaurante**  
Endpoint: (POST)"/restaurants/restaurant"  
Requisição: {  
    name: string  
    street: string  
    number: string  
    neighborhood: string  
    city: string  
    state: string  
}  
Obs.: todos os parâmetros são obrigatórios para cadastro de um novo restaurante.  
Resposta: dados do novo restaurante cadastrado.  

- **Exibição dos dados de um restaurante**  
Endpoint: (GET)"/restaurants/restaurant"  
Requisição: {  
    restaurantId: number  
}  
Obs.: parâmetro *restaurantId* obrigatório.  
Resposta: todos os dados do restaurante, inclusive de seus horários de funcionamento.  

- **Atualização dos dados de um restaurante já cadastrado**  
Endpoint: (PUT)"/restaurants/restaurant"  
Requisição: {  
    id: number  
    name: string  
    street: string  
    number: string  
    neighborhood: string  
    city: string  
    state: string  
}  
Obs.: o parâmetro *restaurantId* é obrigatório e os demais são opcionais.  
Resposta: todos os dados do restaurante, já com as atualizações realizadas.  

- **Exclusão do cadastro de um restaurante**  
Endpoint: (DELETE)"/restaurants/restaurant"  
Remove todos os dados de um restaurante, inclusive de seus horários de funcionamento.  
Requisição: {  
    restaurantId: number  
}  
Obs.: parâmetro *restaurantId* obrigatório.  

- **Adição de um novo horário de funcionamento para um restaurante**  
Endpoint: (POST)"/restaurants/restaurant/openingHours"  
É permitido adicionar diversos horários de funcionamento a um restaurante, desde que não possuam intervalos inferiores a 15 minutos e não sobreponham-se uns aos outros. Cada horário de funcionamento é composto por um horário de início do atendimento, um horário de término do atendimento e o(s) dia(s) da semana ao(s) qual(is) se aplica(m) esse horário de funcionamento. Os horários de início e término do atendimento devem ser informados em strings no formato "00:00", e o array de dia(s) da semana ao(s) qual(is) se aplica(m) esse horário de funcionamento deve possuir os valores obtidos na listagem de dias da semana da rota (GET)"/restaurants/daysOfTheWeek".  
Requisição: {  
    days: string[]  
	startTime: string  
	endTime: string  
	restaurantId: number  
}  
Obs.: todos os parâmetros são obrigatórios.  

- **Remoção de um horário de funcionamento de um restaurante**  
Endpoint: (DELETE)"/restaurants/restaurant/openingHours"  
Requisição: {  
    openingHoursId: number  
}  
Obs.: parâmetro *openingHoursId* obrigatório.  

- **Listagem dos produtos de um restaurante**  
Endpoint: (GET)"/products"  
Além dos dados de cadastro do produto, é exibida a propriedade *currentValue*, que assume: o valor promocional do produto caso o momento da requisição esteja dentro do intervalo de algum de seus horários promocionais, ou o valor normal do produto caso o mesmo não possua nenhuma promoção cadastrada ou as mesmas não contemplem o horário da requisição.  
Requisição: {  
    restaurantId: number  
}  
Obs.: parâmetro *restaurantId* obrigatório.  
Resposta: lista com todos os produtos do restaurante.  

- **Listagem das possíveis categorias dos produtos**  
Endpoint: (GET)"/products/categories"  
Resposta: lista com os valores formatados das categorias dos produtos, para preenchimento no cadastro de produtos.  

- **Cadastro de um novo produto de um restaurante**  
Endpoint: (POST)"/products/product"  
Requisição: {  
    name: string  
    value: number  
    category: string  
    restaurantId: number  
}  
Obs.: todos os parâmetros são obrigatórios para cadastro de um novo produto. O parâmetro *category* deve possuir um dos valores obtidos na listagem de categorias de produtos da rota (GET)"/products/categories".  
Resposta: dados do novo produto cadastrado.  

- **Exibição dos dados de um produto**  
Endpoint: (GET)"/products/product"  
Requisição: {  
    productId: number  
}  
Obs.: parâmetro *productId* obrigatório.  
Resposta: todos os dados do produto, inclusive de todos os seus horários promocionais (para administração do proprietário do restaurante).  

- **Atualização dos dados de um produto já cadastrado**  
Endpoint: (PUT)"/products/product"  
Requisição: {  
    id: number  
    name: string  
    value: number  
    category: string  
}  
Obs.: o parâmetro *id* é obrigatório e os demais são opcionais.  
Resposta: todos os dados do produto, já com as atualizações realizadas.  

- **Exclusão do cadastro de um produto**  
Endpoint: (DELETE)"/products/product"  
Remove todos os dados de um produto, inclusive de seus horários promocionais.  
Requisição: {  
    productId: number  
}  
Obs.: parâmetro *productId* obrigatório.  

- **Atualização das condições promocionais de um produto**  
Endpoint: (PUT)"/products/product/promotion"  
O cadastro de promoção para um produto é composto por uma descrição da promoção, pelo seu valor promocional e pelos horários que o produto estará em promoção. É permitido adicionar diversos horários de promoção, desde que não possuam intervalos inferiores a 15 minutos e não sobreponham-se uns aos outros. Cada horário promocional é composto por um horário de início, um horário de término e o dia da semana ao qual se aplica esse horário de promoção. Os horários de início e término de cada horário promocional devem ser informados em strings no formato "00:00", e o dia da semana ao qual se aplica essa promoção deve possuir um dos valores obtidos na listagem de dias da semana da rota (GET)"/restaurants/daysOfTheWeek". Cada vez que as condições de promoção de um produto forem atualizadas, deve-se informar todos os horários promocionais da mesma. Os horários promocionais desse produto previamente cadastrados no banco que não forem informados na atualização serão excluídos, e os que forem informados com *id* preenchido serão mantidos com seus parâmetros originais previamente cadastrados e não serão atualizados.  
Requisição: {  
    productId: number  
    promotionDescription: string  
    promotionValue: number  
    promotionHours: {  
        id?: number  
        day: string  
        startTime: string  
        endTime: string  
    }[]  
}  
Obs.: todos os parâmetros são obrigatórios. O parâmetro *id* dos horários promocionais é opcional e indica que aquele horário já fora cadastrado previamento no sistema.  

- **Remoção das condições de promoção de um produto**  
Endpoint: (DELETE)"/products/product/promotion"  
Remove todos os parâmetros promocionais de um produto.  
Requisição: {  
    productId: number  
}  
Obs.: parâmetro *productId* obrigatório.  
