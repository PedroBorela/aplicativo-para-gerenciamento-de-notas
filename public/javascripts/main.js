const modalExclusao = document.getElementById('ModalExclusao')
modalExclusao.addEventListener('show.bs.modal', event => {

  const button = event.relatedTarget

  const chave = button.getAttribute('data-bs-id')
  const titulo = button.getAttribute('data-bs-titulo')

  const conteudoModal = modalExclusao.querySelector('.modal-body p')
  const linkModal = modalExclusao.querySelector('.modal-footer a')

  conteudoModal.textContent = `Tem certeza que deseja excluir a anotação:  ${titulo}`
  linkModal.href = `/nota/deleta/${chave}`
})