import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import happyMapIcon from '../utils/mapIcons';
import api from '../services/api';

import mapMarkerImg from '../images/map-marker.svg';

import '../styles/pages/orphanagesMap.css';

interface Orphanage {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
};

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]);
    
    async function getOrphanages() {
        const response = await api.get('/orphanages');
        
        setOrphanages(response.data);
    }   

    useEffect(() => {
        getOrphanages();
    }, []);

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
                {orphanages.map(orphanage => {
                    return (
                        <Marker 
                            key={orphanage.id}
                            icon={happyMapIcon}
                            position={[ orphanage.latitude, orphanage.longitude ]}
                        >       
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={20} color="#FFF" />
                                </Link>
                            </Popup>
            
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={32} color="#FFF" />
            </Link>
        </div>
    )
}
