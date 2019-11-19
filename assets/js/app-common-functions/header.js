//movie header
export function header(){
    var headerLink = document.querySelector("#primary-header").import;
    const template = headerLink.getElementById("header");
    const headerMenu = template.content.querySelector(".menu");
    const movieAppHeader = document.querySelector(".movieapp__header");
    const headerNode = document.importNode(headerMenu, true);
    movieAppHeader.append(headerNode);
}
