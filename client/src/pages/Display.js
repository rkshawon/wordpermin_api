import React from 'react'
import uuid from 'react-uuid'

function Display({display,indexController,redcolorTrigger,greencolorTrigger,wordBackcolor,classes}) {  
  return (
    <div>
        {display.map((word, index)=>{
            let wordColorHolder = ''
            if(greencolorTrigger){
                if(indexController -1 === index){
                    wordColorHolder = 'greenword'
                }else{
                    if(classes[index]){
                        if(classes[index] === 'greenword'){
                            wordColorHolder = 'greenword'
                        }
                        if(classes[index] === 'redword'){
                            wordColorHolder = 'redword'
                        }
                    }else{
                        wordColorHolder = 'singleWord'
                    }     
            }
        }else if(redcolorTrigger){
            if(indexController -1 === index){
                wordColorHolder = 'redword'
            }else{
                if(classes[index]){
                    if(classes[index] === 'greenword'){
                        wordColorHolder = 'greenword'
                    }
                    if(classes[index] === 'redword'){
                        wordColorHolder = 'redword'
                    }
                }else{
                    wordColorHolder = ''
                }
            }
        }
        else{
            wordColorHolder = ''
        }
        if(wordBackcolor){
            if(indexController === index){
                wordColorHolder = 'redbackground'
            }
        }else{
            if(indexController === index){
                wordColorHolder = 'wordbackground'
            }
        }
        return (<span  key={uuid()} className = {`singleWord ${wordColorHolder}`}>{word}</span>)
    })}
    </div>
  )
}

export default Display