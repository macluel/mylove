function atualizarMensagem(){let e=new Date(2025,0,19),t=new Date,n=(t.getFullYear()-e.getFullYear())*12+(t.getMonth()-e.getMonth());19>t.getDate()&&(n-=1);let a=Math.floor(n/12),l=n%12,o=new Date(t.getFullYear(),t.getMonth(),19);19>t.getDate()&&o.setMonth(o.getMonth()-1);let g=Math.floor((t-o)/864e5),$="Feliz ";a>0&&($+=`${a} ano${a>1?"s":""}`),l>0&&($+=`${a>0?" e ":""}${l} m\xeas${l>1?"es":""}`),g>0&&($+=`${a>0||l>0?" e ":""}${g} dia${g>1?"s":""}`),$+=" de namoro!";let _=document.getElementById("mensagem");_&&(_.innerText=$)}window.onload=atualizarMensagem;