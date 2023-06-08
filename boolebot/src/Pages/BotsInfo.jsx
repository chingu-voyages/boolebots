import React, { useEffect, useState, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import singleBot from "../assets/bot.png";
import Swal from "sweetalert2"; 
import { Link } from 'react-router-dom';
import generateRandomNumber from '../utils/randomNum';
import BotClass from '../Components/Gameplay/BotClass';
import IconPalette from './IconPalette'
import BotRoaster from '../Components/Gameplay/BotRoaster';
import useAutoFocus from '../Components/hooks/useAutoFocus';

import bot1 from '../assets/bot1.svg'
import bot2 from '../assets/bot2.svg'
import bot3 from '../assets/bot3.svg'
import bot4 from '../assets/bot4.svg' 
import bot5 from '../assets/bot5.svg'
import bot6 from '../assets/bot6.svg'
import bot7 from '../assets/bot7.svg'
import bot8 from '../assets/bot8.svg'

export default function BotsInfo(props) {
  
  const location = useLocation();


  const handleDeleteBot = (index) => {
    setBotsArr((prev) => {
      const newBotsArr = [...prev];
      newBotsArr.splice(index, 1);
      return newBotsArr;
    });
  };

  const [isBotsArrayFull, setIsBotsArrayFull] = useState(false)
  const { botsData, setBotsData, botsArr, arenaData, setBotsArr } = props;
  const tileNum = arenaData.tileNum
  const {direction, setDirection} = useState({
    "1": "North",
    "2": "South",
    "3": "West",
    "4": "East",
    "5": "NE",
    "6": "NW",
    "7": "SE",
    "8": "SW"

  })

  const inputAutoFocus = useAutoFocus(botsArr);

  const [iconPalette, setIconPalette] = useState([
    {
      url: bot1,
      isSelected: false
    },
    
    {
      url: bot2,
      isSelected: false
    },
    {
      url: bot3,
      isSelected: false
    },
    {
      url: bot4,
      isSelected: false
    },
    {
      url: bot5,
      isSelected: false
    },
    {
      url: bot6,
      isSelected: false
    },
    {
      url: bot7,
      isSelected: false
    },
    {
      url: bot8,
      isSelected: false
    },
  ])

  const [iconSelected, setIconSelected] = useState(0);


  const [isValid, setIsValid]= useState({
    name: false
  });
 


// Generic change handler
function handleChange(e){
    const changedField = e.target.name;
    const newValue = e.target.value;


    setIsValid(prev => {
      let isSameName = botsArr.some((bot) => bot.name === newValue)

      if (changedField === "name" ){
        return {
          name: isSameName,
        }
      }
      return prev
    }
    );

    setBotsData((currentData) => {
   
      if (changedField === "name" ) {
        let isSameName = botsArr.some((bot) => bot.name === newValue)
        

        if (isSameName ) {
          // Display an error message or perform necessary actions

          Swal.fire({
            icon: "error",
            title: "Oops...",
            text: `* Each Bots should have unique names`,
            
          });
          
        }
         else {
          let newState = { ...currentData, [changedField]: newValue };
          return newState;
        }

      }
      
      return {...currentData, [changedField]: newValue}

  })
}

  //form event- submit
  const handleSubmit = (event) => {
    console.log("SUBBITING BOTS INFO")
    event.preventDefault();

    setBotsData((prev)=>{
      return {...prev, 
        name: "",
        value: 0,
        wins: 0,
        loses: 0,
        direction: 1,
        botIcon: bot1}
    })
    
    let occupiedPositions = []

    if(botsArr.length){
      botsArr.forEach(bot => {
        if(bot.position){

            if (bot.position > 0 && bot.position <= tileNum * tileNum){
               if (!occupiedPositions.includes(bot.position)){
                occupiedPositions.push(bot.position)
               }
            }

            if (bot.position - tileNum > 0) {
                if (!occupiedPositions.includes(bot.position - tileNum))
                  {
                    occupiedPositions.push(bot.position - tileNum)
                  }
              }

            if(bot.position + tileNum <= tileNum * tileNum){
              if(!occupiedPositions.includes(bot.position + tileNum) ){
                occupiedPositions.push(bot.position + tileNum)
              }
            }

            if((bot.position - 1) % tileNum != 0){
              if(!occupiedPositions.includes(bot.position - 1)){
                occupiedPositions.push(bot.position - 1)
              }
            }

            if((bot.position + 1) % tileNum != 1){
              if(!occupiedPositions.includes(bot.position + 1)){
                occupiedPositions.push(bot.position + 1)
              }
            }

            if(bot.position % tileNum !== 0 && bot.position - (tileNum - 1) > 0){
              if(!occupiedPositions.includes(bot.position - (tileNum - 1))){
                occupiedPositions.push(bot.position - (tileNum - 1) )
              }
            }

            if(bot.position % tileNum !== 1 && bot.position - (tileNum + 1) > 0){
              if(!occupiedPositions.includes(bot.position - (tileNum + 1))){
                occupiedPositions.push(bot.position - (tileNum + 1));

              }
            }

            if(bot.position % tileNum !== 0 && bot.position + (tileNum + 1) < tileNum * tileNum){
              if(!occupiedPositions.includes(bot.position + (tileNum + 1)))
              {
                occupiedPositions.push(bot.position + (tileNum + 1))

              }
            }

            if(bot.position % tileNum !== 1 && bot.position + (tileNum - 1) < tileNum * tileNum){
              if(!occupiedPositions.includes(bot.position + (tileNum - 1))){
                
                occupiedPositions.push(bot.position + (tileNum - 1));
            }

          }
          
        }
      })
    }
    
    const generateUniquePosition = () =>{
      //generate a number between 1 to tileNum** but not any num in the occupiedPosition arr
      let isValid = false
      let position;
    
      
      if(occupiedPositions.length >= tileNum * tileNum){
        return -1
      }
      
      do{
        position = generateRandomNumber(tileNum * tileNum)


        if(!occupiedPositions.includes(position)){
          isValid = true
          occupiedPositions.push(position)
        }
        
      }while(!isValid)
      return position
    }


    let pos = occupiedPositions.length
      ? generateUniquePosition()
      : generateRandomNumber(tileNum * tileNum); 

      console.log("POSITION ", pos)
    
    if(pos === -1){
      setIsBotsArrayFull(true)

      Swal.fire({
        icon: "error",
        title: "Reached full arena capacity ",
        text: `Can't add more bots to the arena`,
      });

    }
    else{
    
    setBotsArr((prev) => {
      const newBot =  new BotClass(pos, Number(botsData.direction), botsData.name, Number(botsData.value), botsData.botIcon )
      console.log("NEW BOT CREATED", newBot)

      const isUniqueBot = prev.some(
        (bot) =>
          bot.name === newBot.name 
      );

      if (!isUniqueBot) {
        setIconPalette(prev => {
          const newIconPallet = [...prev]

          newIconPallet[iconSelected].isSelected = true
          return newIconPallet
        })

        setIconSelected( prev => {
          const newIndex = iconPalette.findIndex( icon => !icon.isSelected )
  
          if(newIndex !== -1){
            setBotsData( prev => {
              return { 
                ...prev,
                botIcon: iconPalette[newIndex].url
              }
            })
          }

          return newIndex
        })

        return [...prev, newBot];
      } 
      else{
        return prev
      }
      
    });  
    }
  };

  const [expandedBots, setExpandedBots] = useState([]);

  const toggleBotExpansion = (index) => {
    setExpandedBots((prevExpandedBots) => {
      const newExpandedBots = [...prevExpandedBots];
      newExpandedBots[index] = !newExpandedBots[index];
      return newExpandedBots;
    });
  };



  return (
    <div className='botInfo_page'>
      <h2>Create Bot</h2>

     <BotRoaster botsArr={botsArr} handleDeleteBot={handleDeleteBot} currentLocation = {location.pathname}  />

      <div className="test">
        <form onSubmit={handleSubmit}>
          <fieldset>
            <label htmlFor="name">
              Name your bot:
              <input
                placeholder=' Name your robot'
                ref={inputAutoFocus}
                type="text"
                id="name"
                name="name"
                value={botsData.name}
                onChange={handleChange}
                required
              />
            </label>
            {isValid.name ? (
              <p style={{ color: "red" }}>
                {" "}
                * Each Bots should have a unique name
              </p>
            ) : (
              ""
            )}

            <div></div>
            <label htmlFor="value">
              Choose a Boolean Value:
              <select
                id="value"
                name="value"
                value={botsData.value}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a Value
                </option>
                <option value="1">1</option>
                <option value="0">0</option>
              </select>
            </label>

            <label htmlFor="icons">Bot Icon</label>
            <IconPalette
              id="icons"
              iconPalette={iconPalette}
              setBotsData={setBotsData}
              iconSelected={iconSelected}
              setIconSelected={setIconSelected}
            />

            <label htmlFor="direction">
              Bot Direction:
              <select
                id="direction"
                name="direction"
                value={botsData.direction}
                onChange={handleChange}
                required
              >
                <option value="" disabled>
                  Select a Direction
                </option>
                <option value="1">↑</option>
                <option value="2">↓</option>
                <option value="3">←</option>
                <option value="4">→</option>
                <option value="5">↗</option>
                <option value="6">↖</option>
                <option value="7">↘</option>
                <option value="8">↙</option>
              </select>
            </label>
            <button disabled={isBotsArrayFull} type="submit">
              Add Bot
            </button>
          </fieldset>
        </form>
        <Link to="/createArena">
        <button>Back</button>
        </Link>
        <Link to="/arena">
          <button disabled={botsArr.length <= 1}>Battle Ground</button>
        </Link>
      </div>
    </div>
  );
}
