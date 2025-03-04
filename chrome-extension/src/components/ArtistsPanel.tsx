import { useEffect, useState } from "react";
import ProfileAPI from "../services/ProfileAPI";

interface Artist {
    uri: string;
    name: string;
}

const ArtistsPanel = () => {
    const [topArtists, setTopArtistsData] = useState<Artist[]>([]);

    useEffect(() => {
        const getTopArtists = async () => {
            try{
                const data = await ProfileAPI.getTopArtists();
                setTopArtistsData(data);
            } catch (err){
                console.error('Error fetching top artists');
            }
        };
        getTopArtists();
    }, []);

    return (
    <>
        {
            topArtists.map(artist => (
                <div key={artist.uri}>                    
                    <p>{artist.name}</p>
                </div>
            ))
        }
    </>)
}

export default ArtistsPanel;