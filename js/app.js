const music = new Audio('/Web Project/Web Nghe Nhạc/audios/AnotherChance-MerVietNamKrissNgo.mp3')
// Create Array

const songs = [
    {
        id:'1',
        songName:`Another Chance <br> <div class="subtitle">Mer, Kriss Ngo</div>`,
        poster: "images/1686907265858_500.jpg"
    },
    {
        id:'2',
        songName:`Em <br> <div class="subtitle">Mer, Kriss Ngo</div>`,
        poster: "images/1686907265858_500.jpg"
    },
    {
        id:'3',
        songName:`Tâm <br> <div class="subtitle">Mer, Kriss Ngo</div>`,
        poster: "images/1686907265858_500.jpg"
    }
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i)=> {
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
})

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',()=>{
    if (music.paused || music.currentTime <= 0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');
    }
});

const makeAllPlays = () => {
    Array.from(document.getElementsByClassName('playlist')).forEach((element) => {
        element.target.classList.add('bi-play-circle-fill')
        element.target.classList.remove('bi-pause-circle-fill')
    })
}

const makeAllBackgrounds = () => {
    Array.from(document.getElementsByClassName('songItem')).forEach((element) => {
        element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster-master-play');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playlist')).forEach((element) => {
    element.addEventListener('click', (e) => {
        index = e.target.id;
        makeAllPlays();
        e.target.classList.remove('bi-play-circle-fill')
        e.target.classList.add('bi-pause-circle-fill')
        music.src = `audios/${index}.mp3`;
        poster_master_play.src = `images/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })
        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended', () => {
            masterPlay.classList.remove('bi-pause-fill');
            masterPlay.classList.add('bi-play-fill');
            wave.classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementById('dot');

music.addEventListener('timeupdate', () => {
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec < 10) {
        sec = `0${sec}`;
    }
    currentEnd.innerText = `${min}:${set}`;
    let min1 = Math.floor(music_dur/60);
    let sec1 = Math.floor(music_dur%60);
    if (sec1 < 10) {
        sec1 = `0${sec1}`;
    }
    currentStart.innerText = `${min1}:${set1}`;

    let progressbar = new parseInt((music.currentTime/music.duration)*100);
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style,left = `${seekbar}%`;
})

seek.addEventListener('change', () => {
    music.currentTime = seek.value * music.duration/100;    
})

music.addEventListener('ended', () => {
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
})

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vol_dot = document.getElementById('vol_dot');
let vol_bar = document.getElementById('vol_bar');

vol.addEventListener('change', () => {
    if (vol.value == 0) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.add('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 0) {
        vol_icon.classList.add('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.remove('bi-volume-up-fill');
    }
    if (vol.value > 50) {
        vol_icon.classList.remove('bi-volume-down-fill');
        vol_icon.classList.remove('bi-volume-mute-fill');
        vol_icon.classList.add('bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.left = `${vol_a}%`;
    music.volume = vol_a/100;
})

let back = document.getElementById('back');
let next = document.getElementById('next');

back.addEventListener('click', () => {
    index -= 1;
    if (index < 1) {
        index = Array.from(document.getElementsByClassName('songItem')).length;
    }
    music.src = `audios/${index}.mp3`;
        poster_master_play.src = `images/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })
        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays();
        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})

next.addEventListener('click', () => {
    index -= 0;
    index +=1;
    if (index > Array.from(document.getElementsByClassName('songItem')).length) {
        index = 1;
    }
    music.src = `audios/${index}.mp3`;
        poster_master_play.src = `images/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) => {
            return ele.id == index;
        })
        song_title.forEach(ele => {
            let {songName} = ele;
            title.innerHTML = songName;
        })
        makeAllPlays();
        document.getElementById(`${index}`).classList.remove('bi-play-fill');
        document.getElementById(`${index}`).classList.add('bi-pause-fill');
        makeAllBackground();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)";
})

let s_left_scroll = document.getElementById('s_left_scroll');
let S_right_scroll = document.getElementById('s_right_scroll');
let pop_song = document.getElementById('pop_song')[0];

s_left_scroll.addEventListener('click', () => {
    pop_song.scrollleft -= 330;
})

s_right_scroll.addEventListener('click', () => {
    pop_song.scrollleft += 330;
})

let a_left_scroll = document.getElementById('a_left_scroll');
let a_right_scroll = document.getElementById('a_right_scroll');
let item = document.getElementById('item')[0];

a_left_scroll.addEventListener('click', () => {
    item.scrollleft -= 330;
})

a_right_scroll.addEventListener('click', () => {
    item.scrollleft += 330;
})