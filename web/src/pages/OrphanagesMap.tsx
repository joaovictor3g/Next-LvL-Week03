import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import { Map, TileLayer } from 'react-leaflet';

import 'leaflet/dist/leaflet.css';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanagesMap.css';

export default function OrphanagesMap() {
    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={mapMarkerImg} alt="Logo" />
                
                    <h2>Escolha um orfanato noa app</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>Paraipaba</strong>
                    <span>Ceará</span>
                </footer>
            </aside>

            <Map 
                center={[-3.3390592,-39.1806976]}
                zoom={15}
                style={{
                    width: '100%',
                    height: '100%'
                }}
            >
                {/* <TileLayer url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}/> */}
                <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}/>
            </Map>

            <Link to="" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}
