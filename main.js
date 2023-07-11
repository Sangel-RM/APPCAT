const API = "https://api.thecatapi.com/v1/images/search?limit=30&mime_types=jpg";
const API_ID = "https://api.thecatapi.com/v1/images";
const API_UPLOADING = "https://api.thecatapi.com/v1/images/upload";
const API_BREEDS = "https://api.thecatapi.com/v1/breeds?";
const API_FAVOURITE = "https://api.thecatapi.com/v1/favourites"
const KEY_API = 'live_qJuqPeLU4zGeA4lTDlKYKfKFclM2u5ste0Pivap2aIObrhUI3Q9iNPaQiHWpHuqr';
async function razaCats(){
    const SlideRazas = document.querySelector(".Slide");
    const res = await fetch(`${API_BREEDS}limit=60`,{
        headers: {
            "Content-Type": "application/json",
            "x-api-key": KEY_API,
        }
    });
    const data = await res.json();
    console.log(data);
    let view = `${data.map(item => `<aside class="ContentCard">
                                    <div class="CardsDataRaza">
                                    <h1 class="Raza"><a href="${item.wikipedia_url}" target="_blank">${item.name}</a></h1>
                                    <p>Origen: ${item.origin}</p>
                                    <p>adatabilidad: ${item.adaptability}</p>
                                    <p>afecto nivel: ${item.affection_level}</p>
                                    <p>inteligencia: ${item.intelligence}</p>
                                    <p>energía: ${item.energy_level}</p>
                                    </div>
                                    </aside>`).join("")}`;
    SlideRazas.innerHTML = view;
};
razaCats();

async function ImagesCats(){
    const sectionImages = document.querySelector(".sectionImages");
    const res = await fetch(`${API_FAVOURITE}?limit=250`,{
        headers:{
            "Content-Type": "application/json",
            "x-api-key": KEY_API,
        }
    })
    const data = await res.json();
    console.log(data);
    let view = `${data.map((item, index)=> `<div>
                                    <div class="nameAndLikes"><h1>ID: ${item.image.id}</h1><div class="span"><span class="heart-counter">❤</span></div></div>
                                    <aside class="ContentCard"><div class="CardImage">
                                    <figure><i class="fa-sharp fa-solid fa-heart"></i><img class="imgCat"src="${item.image.url}"></figure>
                                    <button class="Like_Image">Like ❤</button>
                                    </div></aside>
                                    </div>`).join("")}`
    sectionImages.innerHTML = view;
    const imgs = document.querySelectorAll(".imgCat");
    const heart = document.querySelectorAll(".fa-heart");
    const botones = document.querySelectorAll(".Like_Image");
    console.log({botones,imgs});
    imgs.forEach((item , i) => {
        item.addEventListener("dblclick", () => {
            heart[i].classList.add("like");
            setTimeout(() => {
            heart[i].classList.remove("like");
            },1000)
        });
    })
    botones.forEach((item , i) => {
        item.addEventListener("click", () => {
            heart[i].classList.add("like");
            setTimeout(() => {
            heart[i].classList.remove("like");
            },1000)
        });
    })

}
ImagesCats();
async function destacados(){
    const section_Destacados = document.querySelector(".destacados")
    const destacados = [];
    const res1 = await fetch(`${API_ID}/Bfn`,{
        headers: {
            "Content_Type": "application/json",
            "x-api-key": KEY_API,
        }
    });
    const res2 = await fetch(`${API_ID}/B10`,{
        headers: {
            "Content_Type": "application/json",
            "x-api-key": KEY_API,
        }
    });
    const res3 = await fetch(`${API_ID}/9r8`,{
        headers: {
            "Content_Type": "application/json",
            "x-api-key": KEY_API,
        }
    });
    const data1 = await res1.json();
    const data2 = await res2.json();
    const data3 = await res3.json();
    destacados.push(data1);
    destacados.push(data2);
    destacados.push(data3);
    console.log(destacados);
    let view = `${destacados.map(item => `<div class="content_card"><div class="sliderCards"><figure><img src="${item.url}"></figure></div></div>`).join("")}`
    section_Destacados.innerHTML = view;
}
destacados()

async function SaveFavory (id) {
    const res = await fetch(API_FAVOURITE,{
        method: "POST",
        headers: {
            'Content-Type': "application/json",
            "x-api-key": KEY_API,
        },
        body: JSON.stringify({
            "image_id": id,
        }),
    });
    const data = await res.text();
    if(res.status !== 200){
        console.log(`error ${data.message}`);
    }else{
        console.log("Save");
        ImagesCats();
    }
}

const guardarMichis = document.querySelector(".Submit");
guardarMichis.addEventListener("click", uploadIMG);
async function uploadIMG (){
    const form = document.querySelector("#Form");
    const formData = new FormData(form);
    console.log(formData.get("file"));
    const res = await fetch(API_UPLOADING,{
        method: "POST",
        headers: {
            // 'Content-Type': "multipart/form-data",
            'x-api-key': KEY_API,
        },
        body: formData,
    });
    const data = await res.json();
    if(res.status !== 201){ 
        console.log(`error ${data.message}`);
    }else{
        console.log(data);
        console.log(data.url);
        SaveFavory(data.id);
    }
}