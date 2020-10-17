import React, { FormEvent, useState } from "react";
import { Map, Marker, TileLayer } from 'react-leaflet';
import SideBar from "../components/SideBar";
import { FiPlus } from "react-icons/fi";
import { LeafletMouseEvent } from 'leaflet';

import happyMapIcon from '../utils/mapIcons';
import '../styles/pages/create-orphanage.css';

export default function CreateOrphanage() {
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [name, setName] = useState('');
  const [about, setAbout] = useState('');
  const [instructions, setInstructions] = useState('');
  const [opening_hours, setOpeningHours] = useState('');
  const [open_on_weekends, setopen_on_weekends] = useState(true);
  
  function handleClick(event: LeafletMouseEvent) {
    const { lat, lng } = event.latlng;
  
    setPosition({
      latitude: lat,
      longitude: lng
    })
  }


  function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const { latitude, longitude } = position;

    console.log({
      name, 
      position,
      about, 
      instructions, 
      latitude,
      longitude,
      open_on_weekends
    })
  }

  
  return (
    <div id="page-create-orphanage">
      <SideBar />

      <main>
        <form className="create-orphanage-form" onSubmit={handleSubmit}>
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-27.2092052,-49.6401092]} 
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onclick={handleClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />
              { position.latitude != 0 && (
                <Marker 
                  interactive={false} 
                  icon={happyMapIcon} 
                  position={[position.latitude,position.longitude]} 
                />
              )}
              
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input id="name" value={name} onChange={e => setName(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea id="name" maxLength={300} value={about} onChange={e => setAbout(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                <button type="button" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </button>
              </div>

              
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea id="instructions" value={instructions} onChange={e => setInstructions(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input id="opening_hours" value={opening_hours} onChange={e => setOpeningHours(e.target.value)}/>
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button type="button" className={open_on_weekends ? 'active': ' '} onClick={() => setopen_on_weekends(true)}>Sim</button>
                <button type="button" className={open_on_weekends ? '': 'active'} onClick={() => setopen_on_weekends(false)}>Não</button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
