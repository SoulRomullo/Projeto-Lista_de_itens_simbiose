class Produto {

    constructor() {
      
        this.id = 1;
        this.arrayItem = [];
        this.editId = null;
        this.api();
    }

    api(){
        const url = fetch('https://randomuser.me/api/').then(resp => resp.json());
            
        url.then(data =>{
            this.nome = data.results[0].name.first;
            this.email = data.results[0].email;
        });
    }
    
    lerDados(){
        let item = {}

        item.id = this.id;
        item.nome = this.nome;
        item.email = this.email;
        item.nomeItem =  document.getElementById('item').value;

        return item;
    }

    adicionar(item) {
        this.arrayItem.push(item);
        this.id++;
      
    }

    validaCampos(item){
        let msg = '';

        if(item.nomeItem == '') {
            msg += '- Informe o Nome do Item! \n';
        }
        
        if(msg != '') {
            alert(msg);
            return false
        }

        return true;
    }

    salvar(){
        let item = this.lerDados();
          
        if(this.validaCampos(item)) {
            if(this.editId == null){
                this.adicionar(item);
                alert('Dados inseridos com sucesso!');
            }
            else{
                this.atualizar(this.editId, item);
                alert('Dados atualizado com sucesso!');
            }
        }
        this.listaTabela();
        this.cancelar();
        
    }
    
    listaTabela() {
    
        let tbody = document.getElementById('tbody');
        tbody.innerText = '';

        for(let i = 0; i < this.arrayItem.length; i++) {
            this.api();

            let tr = tbody.insertRow();

            let td_id = tr.insertCell();
            let td_item = tr.insertCell(); 
            let td_nome = tr.insertCell();
            let td_email = tr.insertCell();
            let td_acoes = tr.insertCell();
            
            td_id.innerText = this.arrayItem[i].id;
            td_item.innerText = this.arrayItem[i].nomeItem;
            td_nome.innerText = this.arrayItem[i].nome;
            td_email.innerText = this.arrayItem[i].email;
                  
            td_id.classList.add('center');

            let imgEdit = document.createElement('img');
            imgEdit.src = 'img/editar.png';
            imgEdit.setAttribute('onclick', "produto.preparaEdicao("+ JSON.stringify(this.arrayItem[i]) +")");

            let imgDelete = document.createElement('img');
            imgDelete.src = 'img/excluir.png';
            imgDelete.setAttribute('onclick' , "produto.deletar("+ this.arrayItem[i].id +")");

            td_acoes.appendChild(imgEdit);
            td_acoes.appendChild(imgDelete);
           
        }
        console.log(this.arrayItem);
    }

    atualizar(id, item) {
        for(let i = 0; i < this.arrayItem.length; i++) {
            if(this.arrayItem[i].id == id){
                this.arrayItem[i].nomeItem = item.nomeItem;
            }
        }
    }

    preparaEdicao(dados){

        this.editId = dados.id;

        document.getElementById('item').value = dados.nomeItem;
            
        document.getElementById('btn1').innerText = 'Atualizar';
    }
    
    mostrarTabela(){
        let openTable = document.getElementById('openTable');
        openTable.setAttribute('style', 'display: block');   
    }

    ocultarTabela(){
        let closeTable = document.getElementById('openTable');
        closeTable.setAttribute('style' , 'display: none');

    }

    cancelar() {
        document.getElementById('item').value = '';
        
        document.getElementById('btn1').innerText = 'Salvar';
 
        this.editId = null;
    }

    deletar(id) {
        
        if(confirm('Deseja realmente excluir o ID ' + id )){
            let tbody = document.getElementById('tbody');
                
                for(let i = 0; i < this.arrayItem.length; i++){
                    if(this.arrayItem[i].id == id){
                        this.arrayItem.splice(i , 1);
                        tbody.deleteRow(i);
                    }
                }
        }
    
        console.log(this.arrayItem);
    }

    excluirTudo(){
        
            if(this.arrayItem.length == 0) {
                alert('Não existe dados para ser excluído!')
            }
            if(this.arrayItem.length > 0){
                if(confirm('Deseja realmente excluir tudo?')){
                    let tbody = document.querySelector('#tbody');
             
                    for(let i = 0; i < this.arrayItem.length;){
                        if(this.arrayItem[i].id > i){
                            this.arrayItem.splice(i , 1);
                            tbody.deleteRow(i);
                        }
                    }    
                }
            }
            
        document.getElementById('item').value = '';

        document.getElementById('btn1').innerText = 'Salvar';

        this.editId = null;
        
        
        console.log(this.arrayItem);
    }

}

let produto = new Produto();