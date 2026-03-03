let current_image = 0;

function nextImage(){
    let img = document.getElementById("IMG_Type");
    if (current_image == 0){
    img.src = "https://web-mind.io/aa-media/ps/mobilerobot-691-ps1-800x.jpg";
    img.width = 
    current_image += 1;
    }
    else if (current_image == 1){
    img.src = "https://www.plantengineering.com/wp-content/uploads/2025/02/OGE2103_WEB_IMG_x1_RIA_HMI_Aquanaut-Slider.jpg";
    current_image += 1;
    }
    else if (current_image == 2){
    img.src = "https://devopedia.org/images/article/412/1654.1650900272.jpg";
    current_image += 1;
    }
    else if (current_image == 3){
    img.src = "https://upload.wikimedia.org/wikipedia/commons/c/ca/Autumn_Drone_%28cropped%29.jpg";
    current_image += 1;
    }
    else if (current_image == 4){
    img.src = "https://media.licdn.com/dms/image/v2/D4E12AQFI4P4Ah9v42w/article-inline_image-shrink_1500_2232/B4EZZY2GBEHMAU-/0/1745247303690?e=2147483647&v=beta&t=UaWe9ir-ZyqXQ6rRZBStx-TAIh03n9a8JEVRDbK-SUA";
    current_image = 0;
    }
}

function valentines(){
    let title = document.getElementsByClassName("Header")[0];
    title.style.backgroundColor = "pink";
    title.style.color = "red"
}
