// assign the variables

const { PeerServer } = require("peer");

const socket=io("/");
const videoGrid=document.getElementById("video-grid");
const myVideo=document.createElement("video");
const showChat=document.querySelector("#showChat");
const backBtn=document.querySelector(".header__back");

myVideo=true;

//adding event listners
backBtn.addEventListener("click",()=>{
    document.querySelector(".main__right").style.dissplay="none";
    document.querySelector(".header__back").style.dissplay="none";
    document.querySelector(".main__left").style.dissplay="flex";
    document.querySelector(".main__left").style.dissplay="1";
})

showChat.addEventListener("click",()=>{
    document.querySelector(".main__right").style.dissplay="flex";
    document.querySelector(".main__right").style.dissplay="1";
    document.querySelector(".main__left").style.dissplay="none";
    document.querySelector(".header__back").style.dissplay="block";
})

const user=prompt("Enter Your Name");

var peer=new PeerServer(undefined,{
    path:"/peerjs",
    host:"/",
    port:"443"
});

let myVideoStream;

navigator.mediaDevices.getUserMedia({
    audio:true,
    video:true
})
.then((stream)=>{
    myVideoStream=stream;
    addVideoStream(myVideo,stream);


    //adding connection to peer

    peer.on("call",(call)=>{
        call.answer(stream);
        document.createElement("video")
        call.on("stream",(userVideoStream)=>{
            addVideoStream(video,userVideoStream)

        })
    }) 
    //taking unique user and establishing connection
    socket.on("üser-connected",(userId)=>{
        connectToNewUser(userId,stream)
    })
})

const connectToNewUser=(userId,stream)=> {
    const call=peer.call(userId,stream);
    const video=document.createElement("video");
    call.on("stream",(userVideoStream)=>{
        addVideoStream(video,userVideoStream);
    })
};
