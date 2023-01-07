const vue = new Vue({
  el:"#app",
  data:{
    produtos:{},
    carrinho:[],
    produto:0,
    precoTotal:0,
    qtdProdutos:0,
    carrinhoModalAtivo:false,
    alertaAtivo: false,
    modal:'modal',
    carrinho_modal: 'carrinho_modal',
    modal_btn: 'modal_btn',
    modal_btn_disabled: 'modal_btn_disabled',
    mensagemAlerta:'',
  },
  methods:{
    removerItemCarrinho(index, produto){
      this.carrinho.splice(index,1)
      this.qtdProdutos--;
      this.precoTotal -= produto.preco
      //this.produto.estoque++
    },
    mostrarAlerta(mensagem){
      this.alertaAtivo = false
      this.mensagemAlerta = mensagem
      this.alertaAtivo = true;
      setTimeout(() => {
        this.mensagemAlerta = ''
        this.alertaAtivo = false
      }, 1000);
    },
    addCarrinho(produto){
      this.carrinho.push(produto);
      this.qtdProdutos++;
      this.precoTotal += produto.preco
      this.produto.estoque--;
      this.mostrarAlerta(`${produto.id.toUpperCase()} adicionado ao carrinho`)
    },
    currencyFormatter(preco, format){
      const real = new Intl.NumberFormat('pt-BR', {
        currency:format,
        style:'currency'
      }).format(preco)
      return real
    },
    async abrirModal(produto){
      await fetch(`./api/produtos/${produto.id}/dados.json`)
        .then(response => response.json())
        .then(response => this.produto = response)
        .catch(error => console.log(error))
        window.scrollTo(0,0)
    },
    fecharModal(event){
      const produtoModal = ['produtoModalSection', 'fecharModalBtn']
      const carrinhoModal = ['carrinhoModalSection', 'fecharCarrinhoModalBtn']
      if(produtoModal.includes(event.target.id)){
        this.produto = 0
      }
      else if(carrinhoModal.includes(event.target.id)){
        this.carrinhoModalAtivo = false
      }
    }
  },
  created: async function(){
    await fetch('./api/produtos.json')
      .then(result => result.json())
      .then(result => this.produtos = result)
      .catch(error => console.log(error))
      .finally('Fetch finalizado com sucesso')
  }
});