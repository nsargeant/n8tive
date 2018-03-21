const parseTemplate = (template) => {
  const container = document.createElement('div');
  container.innerHTML = template;
  return document.importNode(container.lastChild.content, true);
}

export default parseTemplate;