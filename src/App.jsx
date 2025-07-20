import styles from './App.module.css';
import { useState } from 'react';

export default function App() {
  const lock = new Audio('/sound.mp3');
  const [name,setname]=useState('');
  const [len,setlen]=useState(14);
  const generator =('R>7MWrP/QDUec|f#s0jBymIv(;E:ZYoV{A.qX~wCdN&"-aH=@1OTKl[]$2g_>u`J9kbn5F+x3Lh8iS%!zt64^G}*?C');
  const [password,setpassword]=useState('');
  const [tasks,settasks]=useState([]);
 
  
/*functions*/
const show=(i)=>{
  settasks( tasks.map((task,index)=>{
  return  index===i ? {...task,visible:!task.visible}:task;
  }))
}

const create=()=>{
  if(len<14 || len>28 || isNaN(len)){return}
  else{
    let temp='';
    for (let i = 0; i < len; i++) {
      let j=0
      j=Math.floor((Math.random()*generator.length));
      temp+=generator[j];
    }
    setpassword(temp);
    
    lock.currentTime = 0;
    lock.play();

settasks(s=>[...s,{title:name,pass:temp,visible:false}]);
setname('');
  }
}



  return (
    <div className={styles.container}>  <h1>Password Generator</h1>
                                                      <i className={styles.dropdown}></i>
      <div className={styles.box}>
        <div className={styles.vue}>
          <label htmlFor="name" className={styles.text}>Name Your Password :</label>
          <input type="text" value={name} onChange={(e)=>setname(e.target.value)} required maxLength={30} min={3} />
          <label htmlFor="size" className={styles.text}>Size of Password :</label>
          <input type="number" value={len} onChange={(e)=>setlen(e.target.value)} required min={14} max={28} />
          <label htmlFor="password" className={styles.text}>Last Password :</label>
          <input type="text" value={password} disabled/>
          <button className={styles.genbtn} onClick={create}>Generate</button>
        </div>
      </div>
      <div className={styles.tasks}>
          {tasks.map((t,i)=> <div className={styles.task} key={i}>

                                <div className={styles.title}>{t.title}</div>
                                <div className={styles.generatedpassords}> <h3 className={t.visible==false ? styles.hide:styles.none}> {t.pass} </h3> <button className={styles.unhide} onClick={()=>show(i)}>{t.visible==false ? '🙈' : '👁️'}</button>  
                                 <button className={styles.copy}onClick={() => navigator.clipboard.writeText(t.pass)}>📋</button>
                                 <button className={styles.deletebtn} onClick={()=>
                                  { settasks(tasks.filter((_,j)=>j!==i) )}
                                }>🗑️</button>
                                 </div>
                                                              </div> )}
      </div>
    </div>
  );
}
