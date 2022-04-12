import { addComment } from "../api/coments.js";

export function createElementsComents(comment) {
    let i_stars = [];
    let div_content = crearElement('div');
    let div_stars = crearElement('div');
    for (let n = 0; n < comment.stars; n++) { i_stars.push(crearElement('i')); i_stars[n].setAttribute('class', 'fas fa-star') }
    for (let n = comment.stars; n < 5; n++) { i_stars.push(crearElement('i')); i_stars[n].setAttribute('class', 'far fa-star') }
    let h3_name = crearElement('h3');
    let p_comment = crearElement('p');
    let div_likes = crearElement('div');
    let i_like = crearElement('i')
    let span_like = crearElement('span')
    let i_dislike = crearElement('i');
    let span_dislike = crearElement('span')
    //add attributes
    div_stars.setAttribute('class', 'stars');
    div_likes.setAttribute('class', 'likes');
    i_like.setAttribute('class', 'far fa-thumbs-up');
    i_dislike.setAttribute('class', 'far fa-thumbs-down');
    //add values
    h3_name.innerText = comment.name_client
    p_comment.innerText = comment.coment;
    span_like.innerText = comment.all_likes
    span_dislike.innerText = comment.all_dislikes
    //add children
    i_stars.forEach(i => div_stars.appendChild(i))
    div_content.appendChild(div_stars);
    div_content.appendChild(h3_name)
    div_content.appendChild(p_comment)
    //verify if exist other imgs
    if (comment.img1 != null) {
        let img1 = crearElement('img');
        img1.src = comment.img1
        div_content.appendChild(img1);
        if (comment.img2 != null) {
            let img2 = crearElement('img');
            img2.src = comment.img2
            div_content.appendChild(img2);
            if (comment.img3 != null) {
                let img3 = crearElement('img')
                img3.src = comment.img3;
                div_content.appendChild(img3);
            };
        }
    }
    div_likes.appendChild(i_like)
    div_likes.appendChild(span_like)
    div_likes.appendChild(i_dislike)
    div_likes.appendChild(span_dislike)
    div_content.appendChild(div_likes);
    //fast create of element
    function crearElement(el) {
        return document.createElement(el)
    }

    return div_content
}

export async function createComment(infoComment, imgs) {
    var comment = {
        id_product: infoComment.id_product,
        stars: infoComment.stars,
        name_client: infoComment.name_client,
        coment: infoComment.comment,
        all_likes: 0,
        all_dislikes: 0
    };
    if (imgs.length != 0) imgs.forEach((e, i) => {
        if (i == 0) comment.img1 = e.value
        if (i == 1) comment.img2 = e.value
        if (i == 2) comment.img3 = e.value
    });
    await addComment(comment)
}