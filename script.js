const filtros = document.querySelectorAll(
      '.filtros input[type="checkbox"]'
    );

    const cards = document.querySelectorAll('.card');

    const categorias = document.querySelectorAll('.categoria');

    const mensagemSemResultados =
      document.getElementById('semResultados');


    filtros.forEach(filtro => {

      filtro.addEventListener('change', aplicarFiltros);

    });


    function aplicarFiltros() {

      //obtém todos os filtros selecionados
      const filtrosSelecionados = Array.from(filtros)
        .filter(filtro => filtro.checked)
        .map(filtro => filtro.value);


      let quantidadeVisivel = 0;


      //Percorre todos os cards
      cards.forEach(card => {

        const categoriasCard =
          card.dataset.categorias.split(' ');


        //Se nenhum filtro estiver selecionado mostra todos os cards
        if (filtrosSelecionados.length === 0) {

          card.style.display = '';

          quantidadeVisivel++;

          return;
        }


        //verifica se o card possui alguma das categorias selecionadas
        const corresponde =
          filtrosSelecionados.some(filtro =>
            categoriasCard.includes(filtro)
          );


        if (corresponde) {

          card.style.display = '';

          quantidadeVisivel++;

        } else {

          card.style.display = 'none';

        }

      });


      //esconde títulos de categorias que ficaram vazias
      categorias.forEach(categoria => {

        const cardsVisiveis =
          Array.from(categoria.querySelectorAll('.card'))
            .some(card => card.style.display !== 'none');


        if (cardsVisiveis) {

          categoria.style.display = '';

        } else {

          categoria.style.display = 'none';

        }

      });


      //mostra ou esconde mensagem de nenhum resultado
      if (quantidadeVisivel === 0) {

        mensagemSemResultados.style.display = 'block';

      } else {

        mensagemSemResultados.style.display = 'none';

      }

    }


    //função para limpar todos os filtros
    function limparFiltros() {

      filtros.forEach(filtro => {

        filtro.checked = false;

      });

      aplicarFiltros();

    }
